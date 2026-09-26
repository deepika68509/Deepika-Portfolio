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
    title: "Opti-Blink",
    category: "ASSISTIVE COMPUTER VISION",
    stack: "MEDIAPIPE · OPENCV · NLP · PYTHON",
    description: "A hands-free communication system that transforms intentional eye blinks into Morse-code text, speech, and emergency signals.",
    github: "https://github.com/ameen90913/OptiBlink",
    demo: "https://optiblink.vercel.app/",
},

{
    number: "02",
    title: "DocuQuery AI",
    category: "DOCUMENT INTELLIGENCE",
    stack: "RAG · LLM · EMBEDDINGS · CHROMADB",
    description: "A grounded question-answering system that turns dense documents into an explorable knowledge surface.",
    github: "https://github.com/deepika68509/Smart-document-analyzer-RAG-",
    demo: "https://example.com/",
  },
  {
    number: "03",
    title: "AI Data Scientist",
    category: "AGENTIC DATA SCIENCE",
    stack: "LANGCHAIN · MCP · FASTAPI · XGBOOST",
    description: "An autonomous data science workspace that turns raw datasets into models, evaluations, visual insights, and natural-language analysis.",
    github: "https://github.com/deepika68509/AI-Data-Scientist",
    demo: "YOUR_DEMO_URL"
},
{
    number: "04",
    title: "Cold-Email Generator",
    category: "LLM · AUTOMATION",
    stack: "LANGCHAIN · VECTOR DB · WEB SCRAPING · STREAMLIT",
    description: "An AI outreach engine that understands job requirements, retrieves relevant portfolio context, and generates personalized cold emails.",
    github: "https://github.com/deepika68509/Cold-Email-Generator",
    demo: "YOUR_DEMO_URL"
},

  
  
];
