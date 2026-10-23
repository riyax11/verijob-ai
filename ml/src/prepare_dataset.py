"""
prepare_dataset.py
===================
Applies the preprocessing pipeline (preprocessing.py) to the full
fake_job_postings.csv dataset and writes out a clean, ready-to-vectorize
version for the feature-extraction / model-training step.

Usage:
    python prepare_dataset.py

Input:
    ml/data/fake_job_postings.csv   (raw Kaggle dataset)

Output:
    ml/data/processed_job_postings.csv
        columns: job_id, combined_text_raw, combined_text_clean,
                 telecommuting, has_company_logo, has_questions,
                 fraudulent
"""

import time
from pathlib import Path

import pandas as pd

from preprocessing import build_combined_text, preprocess_text

DATA_DIR = Path(__file__).resolve().parent.parent / "data"
RAW_PATH = DATA_DIR / "fake_job_postings.csv"
OUT_PATH = DATA_DIR / "processed_job_postings.csv"


def main():
    print(f"Loading raw dataset from {RAW_PATH} ...")
    df = pd.read_csv(RAW_PATH)
    print(f"  {df.shape[0]} rows, {df.shape[1]} columns")

    # ── Stage 1: Collect text ───────────────────────────────────────────
    print("Combining title + company_profile + description + requirements ...")
    df["combined_text_raw"] = df.apply(
        lambda row: build_combined_text(row), axis=1
    )

    # Drop rows with truly empty text (can't be modeled)
    before = len(df)
    df = df[df["combined_text_raw"].str.strip() != ""].reset_index(drop=True)
    dropped = before - len(df)
    if dropped:
        print(f"  Dropped {dropped} rows with no usable text at all.")

    # ── Stages 2-5: Clean, tokenize, remove stopwords, lemmatize ───────
    print("Running clean -> tokenize -> stopword removal -> lemmatize "
          "on all rows (this takes a minute)...")
    start = time.time()
    df["combined_text_clean"] = df["combined_text_raw"].apply(preprocess_text)
    elapsed = time.time() - start
    print(f"  Done in {elapsed:.1f}s")

    # Drop rows that became empty after cleaning (e.g. pure junk/HTML)
    before = len(df)
    df = df[df["combined_text_clean"].str.strip() != ""].reset_index(drop=True)
    dropped = before - len(df)
    if dropped:
        print(f"  Dropped {dropped} more rows that were empty after cleaning.")

    # ── Non-text signals worth carrying forward (found in Step 1 EDA) ──
    keep_cols = [
        "job_id",
        "combined_text_raw",
        "combined_text_clean",
        "telecommuting",
        "has_company_logo",
        "has_questions",
        "fraudulent",
    ]
    out = df[keep_cols].copy()

    # ── Sanity checks ───────────────────────────────────────────────────
    print("\nFinal class balance:")
    print(out["fraudulent"].value_counts())
    print(out["fraudulent"].value_counts(normalize=True).round(4) * 100)

    avg_len_before = df["combined_text_raw"].str.split().apply(len).mean()
    avg_len_after = out["combined_text_clean"].str.split().apply(len).mean()
    print(f"\nAvg word count before cleaning: {avg_len_before:.1f}")
    print(f"Avg word count after cleaning:  {avg_len_after:.1f}")

    out.to_csv(OUT_PATH, index=False)
    print(f"\nSaved cleaned dataset -> {OUT_PATH} ({out.shape[0]} rows)")

    # Show a couple of before/after examples
    print("\n--- Sample before/after ---")
    for i in [0, len(out) // 2]:
        print(f"\n[{i}] RAW  : {out.iloc[i]['combined_text_raw'][:200]}")
        print(f"[{i}] CLEAN: {out.iloc[i]['combined_text_clean'][:200]}")


if __name__ == "__main__":
    main()