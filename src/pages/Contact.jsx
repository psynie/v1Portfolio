import React, { useState } from "react";
import "./Contact.css";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to a backend or email service
    console.log("Form submitted:", formData);
    setSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({ name: "", email: "", subject: "", message: "" });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <section id="contact">
      <h2>Let's Connect</h2>
      <p style={{ maxWidth: "600px", margin: "0 auto 4rem", fontSize: "1rem", color: "var(--text-secondary)", lineHeight: "1.7" }}>
        I'm always interested in hearing about new projects and opportunities. 
        Feel free to reach out if you have any questions or just want to say hi!
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", maxWidth: "1000px", margin: "0 auto" }}>
        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="subject">Subject</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Project inquiry"
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell me about your project..."
              rows="5"
              required
            ></textarea>
          </div>

          <button type="submit" className="submit-btn">
            {submitted ? "Message Sent! ✓" : "Send Message"}
          </button>
          {submitted && <p style={{ color: "var(--success)", marginTop: "1rem", textAlign: "center" }}>Thank you! I'll get back to you soon.</p>}
        </form>

        {/* Contact Info */}
        <div className="contact-info">
          <div className="contact-item">
            <h3>Email</h3>
            <a href="mailto:shaikabbuabbasali@gmail.com">shaikabbuabbasali@gmail.com</a>
          </div>

          <div className="contact-item">
            <h3>LinkedIn</h3>
            <a href="https://www.linkedin.com/in/abbas00" target="_blank" rel="noopener noreferrer">Connect with me</a>
          </div>

          <div className="contact-item">
            <h3>GitHub</h3>
            <a href="https://github.com/psynie" target="_blank" rel="noopener noreferrer">View my work</a>
          </div>

        
        </div>
      </div>
    </section>
  );
}

export default Contact;