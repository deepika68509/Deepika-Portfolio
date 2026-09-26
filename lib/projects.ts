export type Project = {
  number: string;
  title: string;
  category: string;
  stack: string;
  description: string;
  github: string;
  demo: string;
};

export const projects: Project[] = [
  {
    number: "01",
    title: "DocuQuery AI",
    category: "DOCUMENT INTELLIGENCE",
    stack: "RAG · LLM · EMBEDDINGS · CHROMADB",
    description: "A grounded question-answering system that turns dense documents into an explorable knowledge surface.",
    github: "https://github.com/",
    demo: "https://example.com/",
  },
  {
    number: "02",
    title: "Customer Churn Prediction",
    category: "PREDICTIVE ANALYTICS",
    stack: "CLASSIFICATION · FEATURE ENGINEERING · SCIKIT-LEARN",
    description: "An interpretable pipeline for finding the signals behind customer retention and risk.",
    github: "https://github.com/",
    demo: "https://example.com/",
  },
  {
    number: "03",
    title: "cXpify",
    category: "MACHINE LEARNING",
    stack: "LIGHTGBM · PURCHASE PREDICTION · DATA PIPELINE",
    description: "A purchase prediction workflow designed to make behavioral data actionable for teams.",
    github: "https://github.com/",
    demo: "https://example.com/",
  },
  {
    number: "04",
    title: "TRAVELIT",
    category: "PRODUCT EXPERIENCE",
    stack: "REACT · APIS · TRIP PLANNING · AR",
    description: "A considered travel companion bringing planning, expenses and place discovery together.",
    github: "https://github.com/",
    demo: "https://example.com/",
  },
];
