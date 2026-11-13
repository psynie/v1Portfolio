import { useState } from "react";
import { profile, experience, skills, education, achievements } from "../data";
import Reveal from "../components/Reveal";
import ProjectShowcase from "../components/ProjectShowcase";
import DemoModal from "../components/DemoModal";
import ContactForm from "../components/ContactForm";
import { GithubIcon, LinkedinIcon, MailIcon, DownloadIcon } from "../components/Icons";

function Head({ title, sub }) {
  return (
    <Reveal className="head">
      <h2>{title}</h2>
      <p className="sub">{sub}</p>
    </Reveal>
  );
}

export default function Home() {
  const [demo, setDemo] = useState(null);

  return (
    <>
      <header className="hero">
        <div className="container">
          <span className="status rise" style={{ "--i": 0 }}><i className="dot" /> Open to internships and collaborations</span>
          <h1 aria-label="Hello, I'm Abbas. A full-stack and AI engineer.">
            {["Hello,", "I'm", profile.short + ".", "A", "full-stack", "and", "AI", "engineer."].map((w, i) => (
              <span className="word" aria-hidden="true" key={i}><span style={{ "--i": i }}>{w}</span></span>
            ))}
          </h1>
          <p className="lead rise" style={{ "--i": 9 }}>{profile.summary}</p>
          <div className="hero-cta rise" style={{ "--i": 11 }}>
            <a href="#contact" className="btn btn-primary">Contact me</a>
            <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="btn"><DownloadIcon /> Resume</a>
          </div>
          <div className="socials rise" style={{ "--i": 12 }}>
            <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><GithubIcon /></a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><LinkedinIcon /></a>
            <a href={`mailto:${profile.email}`} aria-label="Email"><MailIcon /></a>
          </div>
        </div>
      </header>

      <section className="section" id="experience">
        <div className="container">
          <Head title="Experience & education" sub="Where I’ve worked and what I shipped." />
          {experience.map((e) => (
            <Reveal className="job" key={e.company}>
              <h3>{e.company}</h3>
              <div className="meta">{e.role} · {e.period}</div>
              <ul>{e.points.map((p) => <li key={p}>{p}</li>)}</ul>
              <div className="tags">{e.tags.map((t) => <span className="tag" key={t}>{t}</span>)}</div>
            </Reveal>
          ))}
          <Reveal className="job">
            <h3>{education.school}</h3>
            <div className="meta">{education.degree} · {education.period} · GPA {education.gpa}</div>
          </Reveal>
        </div>
      </section>

      <section className="section" id="skills">
        <div className="container">
          <Head title="Skills" sub="The tools I reach for day to day." />
        {[[...skills[0].items, ...skills[1].items], [...skills[2].items, ...skills[3].items]].map((row, r) => (
          <div className="marquee" key={r}>
            <div className={`marquee-track ${r ? "rev" : ""}`}>
              {[...row, ...row].map((t, i) => <span className="chip-lg" key={i} aria-hidden={i >= row.length}>{t}</span>)}
            </div>
          </div>
        ))}
        </div>
      </section>

      <ProjectShowcase onDemo={setDemo} />

      <section className="section" id="achievements">
        <div className="container">
          <Head title="Achievements" sub="Hackathons and recognition." />
          {achievements.map((a) => (
            <Reveal className="job" key={a.title}>
              <h3>{a.title}</h3>
              <div className="meta">{a.year}</div>
              <p className="muted">{a.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section" id="contact">
        <div className="container">
          <Head title="Contact me" sub="Have a project or an opportunity in mind? Let’s talk." />
          <ContactForm />
          <p className="direct">Or contact me directly at <a href={`mailto:${profile.email}`}>{profile.email}</a></p>
        </div>
      </section>
      {demo && <DemoModal project={demo} onClose={() => setDemo(null)} />}
    </>
  );
}
