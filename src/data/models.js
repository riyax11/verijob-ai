export const mlModels = [
  {
    id: 'lr',
    name: 'Logistic Regression',
    icon: '📈',
    color: '#00d4ff',
    badge: 'Baseline Model',
    description:
      'A linear classification algorithm that models the probability of a binary outcome using a logistic function.',
    strengths: [
      'Highly interpretable output',
      'Fast training and inference',
      'Good baseline for text classification',
      'Works well with sparse TF-IDF features',
    ],
    role: 'Provides a strong, interpretable baseline classifier for binary fake/genuine prediction.',
    metrics: ['Accuracy', 'Precision', 'Recall', 'F1-Score'],
  },
  {
    id: 'nb',
    name: 'Naïve Bayes',
    icon: '🎲',
    color: '#a855f7',
    badge: 'Probabilistic',
    description:
      'A probabilistic classifier based on Bayes theorem, assuming feature independence. Particularly effective for text data.',
    strengths: [
      'Excellent with bag-of-words features',
      'Very fast and lightweight',
      'Handles high-dimensional data well',
      'Naturally outputs probabilities',
    ],
    role: 'Efficient probabilistic classification that performs well on text-based fraud detection tasks.',
    metrics: ['Accuracy', 'Precision', 'Recall', 'F1-Score'],
  },
  {
    id: 'rf',
    name: 'Random Forest',
    icon: '🌲',
    color: '#10b981',
    badge: 'Ensemble Method',
    description:
      'An ensemble of decision trees that averages predictions to improve accuracy and reduce overfitting.',
    strengths: [
      'Robust to noise and outliers',
      'Handles non-linear relationships',
      'Built-in feature importance',
      'Strong generalization ability',
    ],
    role: 'Ensemble approach that captures complex interaction patterns between features extracted from job text.',
    metrics: ['Accuracy', 'Precision', 'Recall', 'F1-Score'],
  },
  {
    id: 'svm',
    name: 'Support Vector Machine',
    icon: '⚡',
    color: '#f59e0b',
    badge: 'Kernel-Based',
    description:
      'Finds the optimal hyperplane that maximizes the margin between classes in high-dimensional feature space.',
    strengths: [
      'Effective in high-dimensional spaces',
      'Works well with TF-IDF features',
      'Robust with small training sets',
      'Strong theoretical foundation',
    ],
    role: 'Powerful classifier for sparse, high-dimensional TF-IDF feature vectors from job descriptions.',
    metrics: ['Accuracy', 'Precision', 'Recall', 'F1-Score'],
  },
];

export const evaluationMetrics = [
  {
    name: 'Accuracy',
    formula: '(TP + TN) / (TP + TN + FP + FN)',
    description: 'Overall proportion of correct predictions',
    icon: '🎯',
  },
  {
    name: 'Precision',
    formula: 'TP / (TP + FP)',
    description: 'Of all "Fake" predictions, how many were truly fake',
    icon: '📐',
  },
  {
    name: 'Recall',
    formula: 'TP / (TP + FN)',
    description: 'Of all actual fake postings, how many were correctly detected',
    icon: '🔍',
  },
  {
    name: 'F1-Score',
    formula: '2 × (P × R) / (P + R)',
    description: 'Harmonic mean of Precision and Recall',
    icon: '⚖️',
  },
];
