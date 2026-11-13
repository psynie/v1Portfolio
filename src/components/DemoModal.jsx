import { Suspense, useEffect } from "react";
import { demos } from "../demos";
import { CloseIcon } from "./Icons";

export default function DemoModal({ project, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [onClose]);

  const Demo = demos[project.demo];

  return (
    <div className="modal-back" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal" role="dialog" aria-modal="true" aria-label={`${project.title} demo`}>
        <div className="modal-head">
          <h3>{project.title}<small>Concept demo · simplified, runs in your browser</small></h3>
          <button className="icon-btn" onClick={onClose} aria-label="Close demo" autoFocus><CloseIcon /></button>
        </div>
        <div className="modal-body">
          <div className="disclaimer" role="note">
            <div>
              <b>This is only a demo, not the real {project.title}.</b>
              <p>It's a simplified simulation that introduces the idea. It is not the project's actual UI or how it really works. The real application has its own interface and backend{project.github ? " — see the source code on GitHub" : ""}.</p>
            </div>
          </div>
          <Suspense fallback={<p style={{ color: "var(--muted)" }}>Loading demo…</p>}>
            {Demo && <Demo />}
          </Suspense>
        </div>
      </div>
    </div>
  );
}
