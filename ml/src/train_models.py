"""
train_models.py
================
Step 3: Feature extraction (TF-IDF) + model training for the VERIJOB AI
fake job posting detector.

Trains three models on the cleaned dataset produced by prepare_dataset.py:
    - Logistic Regression   (baseline, interpretable)
    - Multinomial Naive Bayes (fast, classic text classifier)
    - Random Forest          (non-linear, handles mixed feature types well)

Each model is trained on:
    - TF-IDF vectors of `combined_text_clean`  (the NLP signal)
    - plus 3 engineered numeric features found in Step 1's EDA:
        telecommuting, has_company_logo, has_questions
      (has_company_logo in particular was a strong predictor: ~82% of
      real postings have one vs ~33% of fake postings)

Because the dataset is heavily imbalanced (~95% real / ~5% fake), this
script:
    - uses a stratified train/test split
    - uses class_weight='balanced' (LogReg, RandomForest) so the
      minority "fraudulent" class isn't ignored
    - reports precision / recall / F1 / confusion matrix per class,
      NOT just accuracy, since accuracy is misleading here (a model
      that predicts "real" for everything would already score ~95%)

Usage:
    python train_models.py

Input:
    ml/data/processed_job_postings.csv   (from prepare_dataset.py)

Output:
    ml/models/tfidf_vectorizer.joblib
    ml/models/logistic_regression.joblib
    ml/models/naive_bayes.joblib
    ml/models/random_forest.joblib
    ml/models/model_comparison.csv       (metrics side-by-side)
    ml/models/best_model.txt             (name of the winning model)
"""

from pathlib import Path

import joblib
import numpy as np
import pandas as pd
from scipy.sparse import hstack, csr_matrix
from sklearn.ensemble import RandomForestClassifier
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import (
    classification_report,
    confusion_matrix,
    f1_score,
    precision_score,
    recall_score,
)
from sklearn.model_selection import train_test_split
from sklearn.naive_bayes import MultinomialNB

BASE_DIR = Path(__file__).resolve().parent.parent
DATA_PATH = BASE_DIR / "data" / "processed_job_postings.csv"
MODELS_DIR = BASE_DIR / "models"
MODELS_DIR.mkdir(exist_ok=True)

RANDOM_STATE = 42
NUMERIC_FEATURES = ["telecommuting", "has_company_logo", "has_questions"]


def load_data():
    print(f"Loading {DATA_PATH} ...")
    df = pd.read_csv(DATA_PATH)
    df["combined_text_clean"] = df["combined_text_clean"].fillna("")
    print(f"  {df.shape[0]} rows")
    return df


def build_features(df, vectorizer=None, fit=True):
    """
    Combine TF-IDF text features with the 3 numeric engagement/trust
    signals into one sparse feature matrix.
    """
    if fit:
        vectorizer = TfidfVectorizer(
            max_features=8000,
            ngram_range=(1, 2),   # unigrams + bigrams (e.g. "wire transfer")
            min_df=3,             # ignore ultra-rare terms
            max_df=0.9,           # ignore near-universal terms
            sublinear_tf=True,
        )
        text_features = vectorizer.fit_transform(df["combined_text_clean"])
    else:
        text_features = vectorizer.transform(df["combined_text_clean"])

    numeric_features = csr_matrix(df[NUMERIC_FEATURES].values.astype(float))
    X = hstack([text_features, numeric_features]).tocsr()
    return X, vectorizer


def evaluate(name, model, X_test, y_test):
    y_pred = model.predict(X_test)
    precision = precision_score(y_test, y_pred, pos_label=1)
    recall = recall_score(y_test, y_pred, pos_label=1)
    f1 = f1_score(y_test, y_pred, pos_label=1)
    cm = confusion_matrix(y_test, y_pred)

    print(f"\n{'='*60}")
    print(f"  {name}")
    print(f"{'='*60}")
    print(classification_report(
        y_test, y_pred, target_names=["GENUINE (0)", "FAKE (1)"], digits=3
    ))
    print("Confusion matrix (rows=actual, cols=predicted):")
    print("                pred_genuine  pred_fake")
    print(f"  actual_genuine   {cm[0][0]:>8}   {cm[0][1]:>8}")
    print(f"  actual_fake      {cm[1][0]:>8}   {cm[1][1]:>8}")

    return {
        "model": name,
        "precision_fake": round(precision, 4),
        "recall_fake": round(recall, 4),
        "f1_fake": round(f1, 4),
        "true_positives": int(cm[1][1]),
        "false_negatives": int(cm[1][0]),  # missed fraud - the costly error
        "false_positives": int(cm[0][1]),
    }


def main():
    df = load_data()

    X_all = df[["combined_text_clean"] + NUMERIC_FEATURES]
    y_all = df["fraudulent"]

    # Stratified split preserves the ~95/5 class ratio in both sets
    X_train_df, X_test_df, y_train, y_test = train_test_split(
        X_all, y_all, test_size=0.2, random_state=RANDOM_STATE, stratify=y_all
    )
    print(f"\nTrain: {X_train_df.shape[0]} rows | Test: {X_test_df.shape[0]} rows")
    print(f"Train fraud rate: {y_train.mean()*100:.2f}% | "
          f"Test fraud rate: {y_test.mean()*100:.2f}%")

    print("\nFitting TF-IDF vectorizer on training text...")
    X_train, vectorizer = build_features(X_train_df, fit=True)
    X_test, _ = build_features(X_test_df, vectorizer=vectorizer, fit=False)
    print(f"  Feature matrix shape: {X_train.shape} "
          f"({len(vectorizer.get_feature_names_out())} TF-IDF terms + "
          f"{len(NUMERIC_FEATURES)} numeric features)")

    models = {
        "Logistic Regression": LogisticRegression(
            max_iter=1000,
            class_weight="balanced",
            random_state=RANDOM_STATE,
        ),
        "Naive Bayes": MultinomialNB(),
        "Random Forest": RandomForestClassifier(
            n_estimators=300,
            max_depth=None,
            class_weight="balanced",
            random_state=RANDOM_STATE,
            n_jobs=-1,
        ),
    }

    results = []
    trained_models = {}
    for name, model in models.items():
        print(f"\nTraining {name} ...")
        model.fit(X_train, y_train)
        trained_models[name] = model
        results.append(evaluate(name, model, X_test, y_test))

    results_df = pd.DataFrame(results).sort_values("f1_fake", ascending=False)
    print(f"\n{'='*60}")
    print("  MODEL COMPARISON (sorted by F1 on the FAKE class)")
    print(f"{'='*60}")
    print(results_df.to_string(index=False))

    best_name = results_df.iloc[0]["model"]
    print(f"\nBest model by F1 on FAKE class: {best_name}")

    # ── Save everything ─────────────────────────────────────────────
    joblib.dump(vectorizer, MODELS_DIR / "tfidf_vectorizer.joblib")
    for name, model in trained_models.items():
        fname = name.lower().replace(" ", "_") + ".joblib"
        joblib.dump(model, MODELS_DIR / fname)
    results_df.to_csv(MODELS_DIR / "model_comparison.csv", index=False)
    (MODELS_DIR / "best_model.txt").write_text(best_name)

    print(f"\nSaved vectorizer + 3 models + comparison table -> {MODELS_DIR}")


if __name__ == "__main__":
    main()