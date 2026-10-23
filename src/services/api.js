/**
 * Detection service
 * Calls the real Python/ML backend (see ml/backend/main.py).
 *
 * Backend endpoint: POST http://localhost:8000/api/analyze
 * Request body: { text, title?, company?, location?, salary? }
 * Response: { classification, risk_level, risk_score, confidence,
 *             reasons, features, stages, found_keywords, word_count,
 *             model_used, analyzed_at, disclaimer }
 *
 * The API base URL is read from VITE_API_BASE_URL (see .env / .env.example)
 * so it's easy to point at a different host in production without
 * touching code.
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

/**
 * Analyze a job posting for fraud signals
 * @param {Object} params
 * @param {string} params.text - Full job description
 * @param {string} [params.title] - Job title
 * @param {string} [params.company] - Company name
 * @param {string} [params.location] - Job location
 * @param {string} [params.salary] - Salary info
 * @returns {Promise<AnalysisResult>}
 */
export async function analyzeJobPosting({ text, title = '', company = '', location = '', salary = '' }) {
  let response;
  try {
    response = await fetch(`${API_BASE_URL}/api/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, title, company, location, salary }),
    });
  } catch (networkErr) {
    // Backend unreachable (not running, wrong port, CORS, etc.)
    throw new Error(
      `Could not reach the detection API at ${API_BASE_URL}. ` +
      `Make sure the backend is running (uvicorn main:app --port 8000). ` +
      `Original error: ${networkErr.message}`
    );
  }

  if (!response.ok) {
    let detail = '';
    try {
      const errBody = await response.json();
      detail = errBody.detail ? ` - ${errBody.detail}` : '';
    } catch {
      /* response wasn't JSON, ignore */
    }
    throw new Error(`API error: ${response.status}${detail}`);
  }

  return await response.json();
}

/**
 * Get analysis pipeline stages for animation
 * @returns {Array} pipeline stages
 */
export function getPipelineStages() {
  return [
    { id: 'input', label: 'Input', desc: 'Raw job advertisement text', color: '#00d4ff' },
    { id: 'clean', label: 'Text Cleaning', desc: 'Remove noise, HTML, special chars', color: '#7c3aed' },
    { id: 'tokenize', label: 'Tokenization', desc: 'Split into individual tokens', color: '#a855f7' },
    { id: 'stopwords', label: 'Stop Word Removal', desc: 'Filter common uninformative words', color: '#3b82f6' },
    { id: 'lemma', label: 'Lemmatization', desc: 'Reduce words to base form', color: '#06b6d4' },
    { id: 'features', label: 'Feature Extraction', desc: 'TF-IDF / Bag of Words vectors', color: '#8b5cf6' },
    { id: 'classify', label: 'ML Classification', desc: 'Logistic Regression / SVM / RF', color: '#a855f7' },
    { id: 'result', label: 'Risk Result', desc: 'Genuine or Fake classification', color: '#10b981' },
  ];
}