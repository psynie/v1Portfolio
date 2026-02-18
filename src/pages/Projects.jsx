import React from "react";

function Projects() {
  const projectsData = [
    {
      id: 1,
      title: "Health Risk Diagnosis System",
      description: "An AI-powered machine learning application that predicts multiple health risks from blood test parameters using ensemble models.",
      tech: ["React", "Python", "XGBoost", "Scikit-learn", "Flask"],
      links: [
        { label: "GitHub", url: "https://github.com/psynie/Diagnosis-of-blood-diseases-through-lab-test" },
        { label: "Live Demo", url: "#" }
      ]
    },
    {
      id: 2,
      title: "AI Learning Assistant",
      description: "An adaptive learning platform powered by NLP that personalizes educational content based on student feedback and interaction patterns.",
      tech: ["Python", "Flask", "MongoDB", "NLP", "TensorFlow"],
      links: [
        { label: "GitHub", url: "https://github.com/psynie/learning-assistant" },
        { label: "Live Demo", url: "#" }
      ]
    },
    {
      id: 3,
      title: "Legal Case Manager",
      description: "A full-stack legal document management system with keyword-based search and cloud-backed storage for case files.",
      tech: ["React", "Python", "Flask", "MongoDB", "NLP"],
      links: [
        { label: "GitHub", url: "https://github.com/psynie/case_file-manager" },
        { label: "Live Demo", url: "#" }
      ]
    },
    {
      id: 4,
      title: "Advanced Airlines booking system",
      description: "A full-stack web application for managing airline bookings with real-time seat availability and dynamic pricing.",
      tech: ["React", "Tailwind CSS", "Node.js", "TypeScript", "MongoDB"],
      links: [
        { label: "GitHub", url: "https://github.com/psynie/Airlines_sim" },
        { label: "Live Demo", url: "#" }
      ]
    },
    
  ];

  return (
    <section id="projects">
      <h2>Featured Projects</h2>
      <div className="projects-grid">
        {projectsData.map(project => (
          <div key={project.id} className="project-card">
            <div className="project-header">
              <h3>{project.title}</h3>
            </div>
            <p>{project.description}</p>
            <div className="project-tech">
              {project.tech.map((tech, index) => (
                <span key={index}>{tech}</span>
              ))}
            </div>
            <div className="project-links">
              {project.links.map((link, index) => (
                <a key={index} href={link.url} className="project-link" target="_blank" rel="noopener noreferrer">
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects;