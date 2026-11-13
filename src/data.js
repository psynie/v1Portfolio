export const profile = {
  name: "Abu Abbas Ali",
  short: "Abbas",
  email: "shaikabbuabbasali@gmail.com",
  github: "https://github.com/psynie",
  linkedin: "https://www.linkedin.com/in/abbas00",
  resume: "/Resume.pdf",
  location: "Bengaluru, India",
  roles: ["Full-stack Developer", "AI / RAG Engineer", "Machine Learning Builder"],
  summary:
    "Computer Science Engineering student building AI-powered applications, predictive models and scalable web products with Python, FastAPI, React and LLM APIs.",
};

export const experience = [
  {
    role: "Software Development Engineer Intern",
    company: "Bridgeway Technologies",
    period: "Apr 2026 – Jul 2026",
    points: [
      "Architected, developed and deployed a full-stack web app with 15+ responsive UI components and 8+ RESTful APIs.",
      "Built automation workflows that cut manual effort and improved operational efficiency.",
      "Modernized 10+ web pages for better performance, maintainability and UX.",
    ],
    tags: ["React", "REST APIs", "Automation"],
  },
  {
    role: "AI Engineer Intern",
    company: "Novum Clarium Investments and Ventures",
    period: "Oct 2025 – Mar 2026",
    points: [
      "Built end-to-end RAG solutions with Claude and OpenAI APIs for document understanding, semantic retrieval and grounded answers.",
      "Developed Playwright data pipelines that use LLMs to turn unstructured web content into structured, searchable datasets.",
      "Orchestrated multiple LLM APIs to automate business workflows in production-ready apps.",
    ],
    tags: ["RAG", "Claude API", "OpenAI", "Playwright", "Pinecone"],
  },
];

export const skills = [
  { title: "Languages", items: ["Python", "JavaScript", "Java", "C", "C++", "HTML/CSS"] },
  { title: "Web & APIs", items: ["React.js", "Node.js", "Express.js", "FastAPI", "Flask", "Vite", "REST"] },
  { title: "ML & AI", items: ["TensorFlow", "Scikit-learn", "Keras", "XGBoost", "Pandas", "RAG", "NLP"] },
  { title: "Data & Tools", items: ["MongoDB", "MySQL", "Pinecone", "Git", "GCP", "Google Colab", "Ubuntu"] },
];

export const education = {
  school: "ACS College of Engineering",
  degree: "B.E. in Computer Science",
  period: "Oct 2023 – Aug 2027",
  place: "Bengaluru, India",
  gpa: "8.8 / 10",
};

export const achievements = [
  {
    title: "Winner — National Level Hackathon",
    year: "2025",
    text: "Built an AI-driven adaptive learning assistant (Python, NLP, React, Flask); recognized for innovation and real-world impact.",
  },
  {
    title: "Runner-Up — College Hackathon",
    year: "2025",
    text: "Developed a data-driven educational support system focused on personalization and user experience.",
  },
];

// `demo` matches a key in src/demos/index.js. Add `live: "https://..."` once you deploy a project.
export const projects = [
  {
    id: "shatterbox",
    title: "ShatterBox",
    kind: "Security",
    featured: true,
    description:
      "Cryptographically enforced secure file storage and sharing. Files are content-chunked (FastCDC), compressed, sealed with AES-256-GCM, and the master key is hybrid-wrapped (RSA-2048 + ML-KEM-768) and split with Shamir 2-of-3. Guest links support expiry, one-time download, passwords and location zones, with a hash-chained audit log. Backed by 960 automated tests.",
    tech: ["Python", "Flask", "AES-256-GCM", "ML-KEM-768", "Shamir SSS", "Numba", "SQLite", "S3 / B2"],
    github: "https://github.com/psynie/ShatterBox",
    demo: "shatterbox",
  },
  {
    id: "health",
    title: "Health Risk Diagnosis",
    kind: "AI / ML",
    featured: true,
    description:
      "ML system that predicts multiple health risks from blood-test parameters using XGBoost and Scikit-learn, with a full-stack platform for report analysis and risk visualization.",
    tech: ["Python", "XGBoost", "Scikit-learn", "Pandas", "React", "Node.js", "Vite"],
    github: "https://github.com/psynie/Diagnosis-of-blood-diseases-through-lab-test",
    demo: "health",
  },
  {
    id: "learning",
    title: "AI Learning Assistant",
    kind: "AI / ML",
    featured: true,
    description:
      "Hackathon-winning assistant that personalizes educational content through NLP-driven feedback analysis, with a chatbot interface for learner support.",
    tech: ["Python", "NLP", "Flask", "React", "MongoDB"],
    github: "https://github.com/psynie/learning-assistant",
    demo: "learning",
  },
  {
    id: "alumni",
    title: "LinkedIn Alumni Platform",
    kind: "Full-stack",
    featured: true,
    description:
      "Automated platform that collects, processes and analyzes professional profile data with browser automation, plus REST APIs and an interactive search & analytics dashboard.",
    tech: ["Python", "Playwright", "FastAPI", "MongoDB", "React"],
    github: "https://github.com/psynie/scraper",
    demo: "alumni",
  },
  {
    id: "legal",
    title: "Legal Case Manager",
    kind: "Full-stack",
    description:
      "Full-stack legal case management system with keyword-based search and retrieval of case files, backed by cloud storage. Hackathon runner-up.",
    tech: ["React", "Python", "Flask", "MongoDB", "NLP"],
    github: "https://github.com/psynie/case_file-manager",
    demo: "legal",
  },
  {
    id: "airline",
    title: "Advanced Airlines Booking",
    kind: "Full-stack",
    description:
      "Airline booking web app with real-time seat availability and dynamic pricing.",
    tech: ["React", "TypeScript", "Tailwind CSS", "Node.js", "MongoDB"],
    github: "https://github.com/psynie/Airlines_sim",
    demo: "airline",
  },
];
