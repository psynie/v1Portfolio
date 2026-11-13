import { useEffect, useRef } from "react";
import { projects } from "../data";
import ProjectArt from "./ProjectArt";
import { GithubIcon, PlayIcon, ExternalIcon } from "./Icons";

const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));

function Tile({ project, onDemo }) {
  return (
    <div className="tile" tabIndex={0} onClick={(e) => { if (!e.target.closest("a,button")) onDemo(project); }} onKeyDown={(e) => e.key === "Enter" && e.target === e.currentTarget && onDemo(project)}>
      <ProjectArt id={project.id} />
      <span className="tile-kind">{project.kind}</span>
      <div className="tile-over">
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="tags">{project.tech.slice(0, 5).map((t) => <span className="tag" key={t}>{t}</span>)}</div>
        <div className="project-actions">
          <button className="btn btn-primary btn-sm" onClick={() => onDemo(project)}><PlayIcon /> Try concept demo</button>
          {project.live && <a className="btn btn-sm" href={project.live} target="_blank" rel="noopener noreferrer"><ExternalIcon /> Live</a>}
          {project.github && <a className="btn btn-sm" href={project.github} target="_blank" rel="noopener noreferrer"><GithubIcon /> Source</a>}
        </div>
      </div>
    </div>
  );
}

export default function ProjectShowcase({ onDemo }) {
  const section = useRef(null);
  const tilt = useRef(null);
  const r1 = useRef(null);
  const r2 = useRef(null);
  const half = Math.ceil(projects.length / 2);
  const rows = [projects.slice(0, half), projects.slice(half)];

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 861px) and (hover: hover) and (prefers-reduced-motion: no-preference)");
    let raf = 0;
    const apply = () => {
      raf = 0;
      const [s, t, a, b] = [section.current, tilt.current, r1.current, r2.current];
      if (!s) return;
      if (!mq.matches) { [t, a, b].forEach((el) => (el.style.transform = el.style.opacity = "")); return; }
      const r = s.getBoundingClientRect();
      const p = clamp(-r.top / Math.max(1, r.height - window.innerHeight));
      const k = clamp((p + 0.12) / 0.38);
      const e = 1 - Math.pow(1 - k, 3);
      t.style.transform = `rotateX(${15 * (1 - e)}deg) rotateZ(${12 * (1 - e)}deg) translateY(${-110 * (1 - e)}px)`;
      t.style.opacity = 0.25 + 0.75 * e;
      a.style.transform = `translateX(${(0.5 - p) * 380}px)`;
      b.style.transform = `translateX(${(p - 0.5) * 380}px)`;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(apply); };
    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    mq.addEventListener("change", onScroll);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); mq.removeEventListener("change", onScroll); };
  }, []);

  return (
    <section className="showcase" id="projects" ref={section}>
      <div className="stage">
        <div className="container showcase-head">
          <h2>Projects</h2>
          <p className="sub">Things I’ve built, with a small concept demo for each.</p>
          <p className="page-note"><b>About the demos:</b> press “Try concept demo” on a project (hover it on desktop). It opens a small, simplified simulation that introduces the idea. It is <b>not</b> the real interface or how the app actually works, which is larger and runs on its own backend. See the source code for the real thing.</p>
        </div>
        <div className="tilt" ref={tilt}>
          <div className="row" ref={r1}>{rows[0].map((p) => <Tile key={p.id} project={p} onDemo={onDemo} />)}</div>
          <div className="row" ref={r2}>{rows[1].map((p) => <Tile key={p.id} project={p} onDemo={onDemo} />)}</div>
        </div>
      </div>
    </section>
  );
}
