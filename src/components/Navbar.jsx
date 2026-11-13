import { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from "./Icons";

const links = [
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || "dark");
  const [active, setActive] = useState("");

  useEffect(() => {
    const els = links.map((l) => document.getElementById(l.id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-30% 0px -60% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch { /* ignore */ }
  };

  return (
    <div className="pill-wrap">
      <nav className="pill" aria-label="Main">
        {links.map((l) => (
          <a key={l.id} href={`#${l.id}`} className={`nav-link ${active === l.id ? "active" : ""}`}>{l.label}</a>
        ))}
        <span className="sep" />
        <button className="icon-btn" onClick={toggle} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}>
          {theme === "dark" ? <SunIcon /> : <MoonIcon />}
        </button>
      </nav>
    </div>
  );
}
