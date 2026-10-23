"""
main.py
=======
Step 5: FastAPI backend for the VERIJOB AI fake job posting detector.

Loads the trained TF-IDF vectorizer + Logistic Regression model (from
train_models.py) and exposes POST /api/analyze with the exact request/
response shape already documented in the frontend's
src/services/api.js, so the React app can be pointed at this backend
with a minimal change (just uncommenting the fetch() block there).

Run locally:
    cd ml/backend
    pip install fastapi uvicorn joblib scikit-learn scipy pandas nltk
    uvicorn main:app --reload --port 8000

Then test:
    http://localhost:8000/docs   (interactive Swagger UI)
"""

import sys
import time
from pathlib import Path

import joblib
import numpy as np
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from scipy.sparse import hstack, csr_matrix

# ── Import the SAME preprocessing used at training time ────────────────
# so text is cleaned identically at inference as it was during training.
SRC_DIR = Path(__file__).resolve().parent.parent / "src"
sys.path.insert(0, str(SRC_DIR))
from preprocessing import preprocess_text  # noqa: E402

BASE_DIR = Path(__file__).resolve().parent.parent
MODELS_DIR = BASE_DIR / "models"

app = FastAPI(title="VERIJOB AI - Fake Job Posting Detector")

# Allow the Vite dev server (and any frontend) to call this API locally.
# Tighten allow_origins to your real deployed frontend URL in production.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Load model artifacts once at startup ────────────────────────────────
VECTORIZER = None
MODEL = None
MODEL_NAME = "Logistic Regression"


@app.on_event("startup")
def load_artifacts():
    global VECTORIZER, MODEL, MODEL_NAME
    try:
        best_model_path = MODELS_DIR / "best_model.txt"
        if best_model_path.exists():
            MODEL_NAME = best_model_path.read_text().strip()
    except Exception:
        pass

    model_filename = MODEL_NAME.lower().replace(" ", "_") + ".joblib"
    VECTORIZER = joblib.load(MODELS_DIR / "tfidf_vectorizer.joblib")
    MODEL = joblib.load(MODELS_DIR / model_filename)
    print(f"Loaded model: {MODEL_NAME} ({model_filename})")


# ── Request / response schema ───────────────────────────────────────────
class AnalyzeRequest(BaseModel):
    text: str = Field(..., min_length=1, description="Full job description")
    title: str = ""
    company: str = ""
    location: str = ""
    salary: str = ""


PIPELINE_STAGES = [
    {"id": "collect", "label": "Collecting text", "duration": 400},
    {"id": "clean", "label": "Cleaning & preprocessing", "duration": 600},
    {"id": "tokenize", "label": "Tokenizing text", "duration": 500},
    {"id": "extract", "label": "Extracting features (TF-IDF)", "duration": 700},
    {"id": "classify", "label": "Running ML classifier", "duration": 800},
    {"id": "predict", "label": "Generating prediction", "duration": 400},
]

# Words the classifier weighs heavily — used to build human-readable
# "reasons" without re-deriving global coefficients on every request.
# Loaded once at startup from the model's own learned weights, so this
# stays in sync with whatever the model actually learned (not a
# hand-written keyword list).
TOP_FRAUD_TERMS = []


@app.on_event("startup")
def load_top_terms():
    global TOP_FRAUD_TERMS
    try:
        if hasattr(MODEL, "coef_"):
            feature_names = VECTORIZER.get_feature_names_out()
            coefs = MODEL.coef_[0][: len(feature_names)]  # exclude numeric feats
            top_idx = np.argsort(coefs)[-40:][::-1]
            TOP_FRAUD_TERMS = [feature_names[i] for i in top_idx]
    except Exception as e:
        print(f"Could not extract top terms: {e}")
        TOP_FRAUD_TERMS = []


def build_reasons(raw_text_lower: str, missing_company: bool,
                   short_description: bool, risk_score: float,
                   found_terms: list[str]) -> list[str]:
    reasons = []
    if found_terms:
        shown = found_terms[:3]
        reasons.append(
            f"Language patterns associated with fraudulent postings detected "
            f"({', '.join(shown)}{'...' if len(found_terms) > 3 else ''})"
        )
    if short_description:
        reasons.append("Job description is unusually brief")
    if missing_company:
        reasons.append("Employer information is missing")
    if "whatsapp" in raw_text_lower or "telegram" in raw_text_lower:
        reasons.append("Non-professional contact channel indicated")
    if "fee" in raw_text_lower or "deposit" in raw_text_lower or "wire transfer" in raw_text_lower:
        reasons.append("Possible request for upfront payment")
    if not reasons:
        reasons.append("No significant fraud signals detected")
    return reasons


@app.post("/api/analyze")
def analyze_job_posting(req: AnalyzeRequest):
    if MODEL is None or VECTORIZER is None:
        raise HTTPException(status_code=503, detail="Model not loaded yet")

    if not req.text.strip():
        raise HTTPException(status_code=400, detail="`text` must not be empty")

    # ── Stage 1: Collect ────────────────────────────────────────────
    combined_raw = " ".join(
        p for p in [req.title, req.company, req.text] if p
    )

    # ── Stages 2-5: Clean, tokenize, remove stopwords, lemmatize ─────
    cleaned_text = preprocess_text(combined_raw)

    # ── Feature extraction: TF-IDF + numeric flags ──────────────────
    # NOTE: telecommuting/has_company_logo/has_questions aren't
    # collected by the current frontend form, so we default them to 0
    # (unknown). If you add those fields to the form later, wire them
    # through here for a real accuracy boost.
    text_vec = VECTORIZER.transform([cleaned_text])
    numeric_vec = csr_matrix(np.array([[0.0, 0.0, 0.0]]))
    X = hstack([text_vec, numeric_vec]).tocsr()

    # ── Classification ───────────────────────────────────────────────
    proba = MODEL.predict_proba(X)[0]
    fake_proba = float(proba[1])  # P(fraudulent == 1)
    risk_score = int(round(fake_proba * 100))
    classification = "FAKE" if fake_proba >= 0.5 else "GENUINE"
    risk_level = "HIGH" if risk_score >= 70 else "MEDIUM" if risk_score >= 40 else "LOW"
    confidence = "High" if abs(fake_proba - 0.5) > 0.35 else \
                 "Moderate" if abs(fake_proba - 0.5) > 0.15 else "Low"

    # ── Explainability signals for the UI ────────────────────────────
    text_lower = combined_raw.lower()
    cleaned_tokens = set(cleaned_text.split())
    found_terms = [t for t in TOP_FRAUD_TERMS if t in cleaned_tokens][:6]

    missing_company = not req.company.strip()
    short_description = len(req.text.strip()) < 150
    unrealistic_salary = _looks_unrealistic_salary(req.salary)

    reasons = build_reasons(
        text_lower, missing_company, short_description, risk_score, found_terms
    )

    features = [
        {
            "name": "Language Patterns",
            "score": min(len(found_terms) * 15 + 20, 95),
            "suspicious": len(found_terms) > 1,
        },
        {
            "name": "Employer Info",
            "score": 75 if missing_company else 15,
            "suspicious": missing_company,
        },
        {
            "name": "Compensation",
            "score": 80 if unrealistic_salary else 20,
            "suspicious": unrealistic_salary,
        },
        {
            "name": "Contact Method",
            "score": 70 if ("whatsapp" in text_lower or "telegram" in text_lower) else 10,
            "suspicious": "whatsapp" in text_lower or "telegram" in text_lower,
        },
        {
            "name": "Description Length",
            "score": 65 if short_description else 20,
            "suspicious": short_description,
        },
    ]

    return {
        "classification": classification,
        "risk_level": risk_level,
        "risk_score": risk_score,
        "confidence": confidence,
        "reasons": reasons,
        "features": features,
        "stages": PIPELINE_STAGES,
        "found_keywords": found_terms,
        "word_count": len(req.text.strip().split()),
        "model_used": MODEL_NAME,
        "analyzed_at": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
        "disclaimer": (
            "AI predictions are informational and should not replace "
            "independent verification."
        ),
    }


def _extract_number(s: str):
    digits = "".join(ch for ch in s if ch.isdigit())
    return int(digits) if digits else None


def _looks_unrealistic_salary(salary: str) -> bool:
    """
    Flag salary strings that look like classic scam patterns:
    - a bare small number with no currency symbol and a time unit
      implying "per day/week" (e.g. "5000 per week", "50 per hour"
      with no context) is a common fraud pattern in this dataset
    - "lakh" claims paired with very high magnitude are sometimes
      inflated in scam postings

    Deliberately does NOT flag ordinary large annual salaries like
    "$130,000 - $160,000" -- a bare 5-6 digit number with a $ sign
    and no "per day/week" phrasing is normal for annual pay.
    """
    if not salary or not salary.strip():
        return False
    s = salary.lower()

    has_per_day_or_week = any(
        phrase in s for phrase in ["per day", "per week", "/day", "/week", "daily"]
    )
    has_currency_symbol = any(sym in salary for sym in ["$", "€", "£", "₹"])
    number = _extract_number(salary)

    if "lakh" in s and number and number > 20:
        return True
    if has_per_day_or_week and number and number > 200 and not has_currency_symbol:
        # e.g. "5000 per week" with no currency context is a common
        # scam pattern in this dataset; a *normal* posting would say
        # "$1,200/week" or similar with an explicit currency symbol.
        return True
    if has_per_day_or_week and number and number > 1000:
        # even with a currency symbol, "$5000/week" ($260k/yr) etc. is
        # still a rare and suspicious claim for this kind of role
        return True
    return False


@app.get("/api/health")
def health():
    return {"status": "ok", "model_loaded": MODEL is not None, "model_name": MODEL_NAME}


@app.get("/")
def root():
    return {"message": "VERIJOB AI backend is running. See /docs for API docs."}