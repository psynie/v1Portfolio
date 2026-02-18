import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <section id="hero">
        <h1>Hi, I'm <span className="highlight">Abbas</span></h1>
        
        <p style={{ maxWidth: "700px", marginBottom: "2.5rem", fontSize: "1.05rem" }}>
          A Full-stack developer passionate about Machine Learning and Data Analytics, building scalable applications with React and Python/FastAPI while embedding AI-driven, data-centric intelligence into real-world systems.
        </p>

        <div className="hero-buttons">
          <Link to="/projects" className="btn-primary">View My Work</Link>
          <Link to="/contact" className="btn-secondary">Get In Touch</Link>
        </div>
      </section>

      <section id="experience">
        <h2>Experience</h2>
        <div className="experience-grid">
          <div className="experience-card">
            <div className="experience-header">
              <h3>National Level Hackathon Winner</h3>
              <span className="year">2025</span>
            </div>
            <p>
              Designed a multi-output machine learning model to predict health risks 
              (Diabetes, Heart, Kidney, Liver, BMI, CBC panels) from blood test parameters. 
              Achieved high accuracy across multiple medical panels using feature selection 
              and ensemble modelling.
            </p>
            <div className="tech-stack">
              <span>React</span>
              <span>Python</span>
              <span>NLP</span>
              <span>Flask</span>
              <span>Machine Learning</span>
            </div>
          </div>

          <div className="experience-card">
            <div className="experience-header">
              <h3>Hackathon Runner-Up</h3>
              <span className="year">2025</span>
            </div>
            <p>
              Developed a full-stack legal case management system enabling keyword-based 
              search and retrieval of case files.
            </p>
            <div className="tech-stack">
              <span>React</span>
              <span>Python</span>
              <span>Flask</span>
              <span>MongoDB</span>
            </div>
          </div>
        </div>
      </section>

      <section id="skills">
        <h2>Skills</h2>
        <div className="skills-grid">
          <div className="skill-category">
            <h3>Frontend</h3>
            <div className="skill-tags">
              <span>React</span>
              <span>JavaScript</span>
              <span>HTML</span>
              <span>CSS</span>
              <span>Tailwind CSS</span>
              <span>Vite</span>
            </div>
          </div>

          <div className="skill-category">
            <h3>Backend & Databases</h3>
            <div className="skill-tags">
              <span>Node.js</span>
              <span>Flask</span>
              <span>MongoDB</span>
              <span>MySQL</span>
            </div>
          </div>

          <div className="skill-category">
            <h3>AI & Machine Learning</h3>
            <div className="skill-tags">
              <span>Python</span>
              <span>Scikit-learn</span>
              <span>XGBoost</span>
              <span>NLP</span>
              <span>TensorFlow</span>
            </div>
          </div>
        </div>
      </section>

      <section id="projects">
        <h2>Featured Projects</h2>
        <div className="projects-grid">
          <div className="project-card">
            <div className="project-header">
              <h3>Diagnosis of Health Risk using Blood Tests</h3>
            </div>
            <p>
              A machine learning–powered web application that predicts multiple health risks 
              from blood test parameters using ensemble models.
            </p>
            <div className="project-tech">
              <span>React</span>
              <span>Python</span>
              <span>XGBoost</span>
              <span>Scikit-learn</span>
              <span>Node.js</span>
            </div>
            <div className="project-links">
              <a href="https://github.com/psynie/Diagnosis-of-blood-diseases-through-lab-test" className="project-link">Source Code</a>
              <a href="#" className="project-link">Live Demo</a>
            </div>
          </div>

          <div className="project-card">
            <div className="project-header">
              <h3>AI Assistant for Learning Environments</h3>
            </div>
            <p>
              An AI-based adaptive learning assistant that personalizes educational 
              content using NLP-driven feedback analysis.
            </p>
            <div className="project-tech">
              <span>Python</span>
              <span>Flask</span>
              <span>MongoDB</span>
            </div>
            <div className="project-links">
              <a href="https://github.com/psynie/learning-assistant" className="project-link">Source Code</a>
              <a href="#" className="project-link">Live Demo</a>
            </div>
          </div>

          <div className="project-card">
            <div className="project-header">
              <h3>Case File Manager – Legal Document System</h3>
            </div>
            <p>
              A full-stack legal case management system with keyword-based search 
              and cloud-backed data storage.
            </p>
            <div className="project-tech">
              <span>Python</span>
              <span>Flask</span>
              <span>MongoDB</span>
              <span>NLP</span>
            </div>
            <div className="project-links">
              <a href="https://github.com/psynie/case_file-manager" className="project-link">Source Code</a>
              <a href="#" className="project-link">Live Demo</a>
            </div>
          </div>
        </div>
      </section>

<section id="contact">
  <h2>Let's Connect</h2>
  <p style={{ maxWidth: "600px", margin: "0 auto 3rem", fontSize: "1.05rem", color: "var(--text-secondary)", lineHeight: "1.7" }}>
    I'm currently open to internships, collaborations, and interesting project discussions.
    Feel free to reach out.
  </p>

  <div className="contact-links">
    <a href="mailto:shaikabbuabbasali@gmail.com" className="contact-link">
      <span><img src="/gmail.png" alt="Email icon" /></span>
      <div>
        <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "0.25rem" }}>Email</div>
        <div style={{ fontWeight: "600" }}>shaikabbuabbasali@gmail.com</div>
      </div>
    </a>

    <a 
      href="https://github.com/psynie" 
      className="contact-link"
      target="_blank"
      rel="noopener noreferrer"
    >
      <span><img src="/github.png" alt="GitHub profile" /></span>
      <div>
        <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "0.25rem" }}>GitHub</div>
        <div style={{ fontWeight: "600" }}>github.com/psynie</div>
      </div>
    </a>

    <a 
      href="https://www.linkedin.com/in/abbas00" 
      className="contact-link"
      target="_blank"
      rel="noopener noreferrer"
    >
      <span><img src="/linkedIn.png" alt="LinkedIn profile" /></span>
      <div>
        <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "0.25rem" }}>LinkedIn</div>
        <div style={{ fontWeight: "600" }}>Abbas Ali</div>
      </div>
    </a>
  </div>
</section>

    </>
  );
}

export default Home;
