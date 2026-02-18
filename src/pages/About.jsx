import React from "react";

function About() {
  return (
    <section id="about">
      <h2>About Me</h2>
      
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <div style={{ 
          background: "var(--bg-secondary)",
          border: "1px solid var(--border-color)",
          borderRadius: "6px",
          padding: "2rem",
          marginBottom: "2rem"
        }}>
          <p style={{ marginBottom: "1.5rem", fontSize: "1rem", lineHeight: "1.8" }}>
            I'm Abbas, a passionate computer science student from Bangalore with a deep interest in full-stack development, Machine Learning and AI integration. 
            I love creating beautiful, functional web applications that solve real-world problems.
          </p>
          
          <p style={{ marginBottom: "1.5rem", fontSize: "1rem", lineHeight: "1.8" }}>
            With experience in React, Node.js, Machine Learning, and various databases, I've worked on projects ranging from 
            AI-powered health diagnostic systems to legal document management platforms. I'm particularly interested in the intersection 
            of web development and artificial intelligence.
          </p>

          <p style={{ fontSize: "1rem", lineHeight: "1.8" }}>
            When I'm not coding, you can find me participating in hackathons, mentoring other developers, or exploring the latest trends in technology.
            I'm always eager to learn new technologies and collaborate with talented individuals.
          </p>
        </div>

        <h3 style={{ marginBottom: "2rem", textAlign: "left" }}>Key Achievements</h3>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1.5rem"
        }}>
          <div style={{
            padding: "1.5rem",
            background: "var(--bg-secondary)",
            border: "1px solid var(--border-color)",
            borderRadius: "6px",
            textAlign: "center",
            transition: "all 0.3s ease"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "var(--accent-color)";
            e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "var(--border-color)";
            e.currentTarget.style.boxShadow = "none";
          }}>
            <h4 style={{ color: "var(--accent-color)", marginBottom: "0.5rem" }}>2x Hackathon Winner</h4>
            <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>National level competitions</p>
          </div>

          <div style={{
            padding: "1.5rem",
            background: "var(--bg-secondary)",
            border: "1px solid var(--border-color)",
            borderRadius: "6px",
            textAlign: "center",
            transition: "all 0.3s ease"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "var(--accent-color)";
            e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "var(--border-color)";
            e.currentTarget.style.boxShadow = "none";
          }}>
            <h4 style={{ color: "var(--accent-color)", marginBottom: "0.5rem" }}>10+ Projects</h4>
            <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>Full-stack applications deployed</p>
          </div>

          <div style={{
            padding: "1.5rem",
            background: "var(--bg-secondary)",
            border: "1px solid var(--border-color)",
            borderRadius: "6px",
            textAlign: "center",
            transition: "all 0.3s ease"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "var(--accent-color)";
            e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "var(--border-color)";
            e.currentTarget.style.boxShadow = "none";
          }}>
            <h4 style={{ color: "var(--accent-color)", marginBottom: "0.5rem" }}>Active Mentor</h4>
            <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>Guiding next generation devs</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;