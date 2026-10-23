"""
preprocessing.py
=================
Text preprocessing pipeline for the VERIJOB AI fake job posting detector.

Mirrors the pipeline stages already advertised in the frontend
(src/services/api.js -> getPipelineStages / src/pages/Detector.jsx):

    1. Collect text        -> combine relevant raw columns
    2. Clean text           -> strip HTML, URLs, emails, special chars
    3. Tokenize              -> split into word tokens
    4. Remove stop words     -> filter uninformative common words
    5. Lemmatize             -> reduce words to base form
    (Feature extraction / classification happen in later scripts)

This module is meant to be imported both by the training script and
later by the FastAPI backend, so the exact same cleaning logic is used
at train time and at inference time.
"""

import re
import string

import pandas as pd
import nltk
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
from nltk.tokenize import word_tokenize

# ── One-time NLTK data check ────────────────────────────────────────────────
_REQUIRED_NLTK_DATA = [
    ("corpora/stopwords", "stopwords"),
    ("corpora/wordnet", "wordnet"),
    ("corpora/omw-1.4", "omw-1.4"),
    ("tokenizers/punkt_tab", "punkt_tab"),
]
for _path, _pkg in _REQUIRED_NLTK_DATA:
    try:
        nltk.data.find(_path)
    except LookupError:
        nltk.download(_pkg, quiet=True)

STOP_WORDS = set(stopwords.words("english"))
LEMMATIZER = WordNetLemmatizer()

# Keep a few negation / risk-relevant words that generic stopword lists
# would otherwise strip out — they can carry signal in fraud detection
# (e.g. "no experience required", "not a scam").
KEEP_WORDS = {"no", "not", "nor", "none", "never"}
STOP_WORDS = STOP_WORDS - KEEP_WORDS

URL_RE = re.compile(r"http\S+|www\.\S+")
HASH_URL_PLACEHOLDER_RE = re.compile(r"#url_[a-f0-9]+#", re.IGNORECASE)
EMAIL_RE = re.compile(r"\S+@\S+")
HTML_TAG_RE = re.compile(r"<.*?>")
NON_ALPHA_RE = re.compile(r"[^a-z\s]")
MULTI_SPACE_RE = re.compile(r"\s+")


def clean_text(text: str) -> str:
    """
    Stage 2: Clean & preprocess raw text.
    Lowercases, strips HTML tags, URLs, emails, punctuation/digits,
    and collapses whitespace.
    """
    if not isinstance(text, str) or not text.strip():
        return ""

    text = text.lower()
    text = HTML_TAG_RE.sub(" ", text)
    text = HASH_URL_PLACEHOLDER_RE.sub(" ", text)  # this dataset uses #URL_xxx# placeholders
    text = URL_RE.sub(" ", text)
    text = EMAIL_RE.sub(" ", text)
    text = text.translate(str.maketrans("", "", string.digits))
    text = NON_ALPHA_RE.sub(" ", text)
    text = MULTI_SPACE_RE.sub(" ", text).strip()
    return text


def tokenize(text: str) -> list[str]:
    """Stage 3: Tokenization — split cleaned text into word tokens."""
    if not text:
        return []
    return word_tokenize(text)


_JUNK_TOKENS = {"nan", "none", "null", "na"} - KEEP_WORDS  # keep "none" out on purpose


def remove_stopwords(tokens: list[str]) -> list[str]:
    """Stage 4: Stop word removal — filter common uninformative words."""
    return [
        t for t in tokens
        if t not in STOP_WORDS and t not in _JUNK_TOKENS and len(t) > 1
    ]


def lemmatize(tokens: list[str]) -> list[str]:
    """Stage 5: Lemmatization — reduce words to their base/dictionary form."""
    return [LEMMATIZER.lemmatize(t) for t in tokens]


def preprocess_text(raw_text: str) -> str:
    """
    Full pipeline: clean -> tokenize -> remove stopwords -> lemmatize.
    Returns a single space-joined string, ready for TF-IDF vectorization.
    """
    cleaned = clean_text(raw_text)
    tokens = tokenize(cleaned)
    tokens = remove_stopwords(tokens)
    tokens = lemmatize(tokens)
    return " ".join(tokens)


def build_combined_text(row: dict) -> str:
    """
    Combine the most informative raw text columns into a single field
    before cleaning. Matches the frontend's fields (title, description,
    plus dataset-only fields requirements / company_profile that carry
    strong signal but aren't in the current demo form).

    `row` should have keys: title, company_profile, description, requirements
    (missing/NaN values are treated as empty strings).
    """
    def _clean_field(v):
        # pandas gives NaN (a float) for missing values; guard against
        # that becoming the literal string "nan" once cast to str.
        if v is None or (isinstance(v, float) and pd.isna(v)):
            return ""
        return str(v)

    parts = [
        _clean_field(row.get("title", "")),
        _clean_field(row.get("company_profile", "")),
        _clean_field(row.get("description", "")),
        _clean_field(row.get("requirements", "")),
    ]
    return " ".join(p for p in parts if p)


if __name__ == "__main__":
    # Quick self-test
    sample = (
        "URGENT HIRING!!! Work from home, earn $5000/week. "
        "No experience required. Contact us on WhatsApp only. "
        "Visit http://example.com or email us at jobs@example.com. "
        "<b>Apply now</b>!"
    )
    print("RAW:      ", sample)
    print("CLEANED:  ", clean_text(sample))
    print("PROCESSED:", preprocess_text(sample))