// Small illustrated previews (decorative) standing in for screenshots.
const rnd = (n, seed) => ((Math.sin(n * 12.9898 + seed * 78.233) * 43758.5453) % 1 + 1) % 1;

function Shatter() {
  return (
    <div className="art art-shatter">
      {Array.from({ length: 24 }).map((_, i) => <i key={i} style={{ "--o": 0.25 + rnd(i, 1) * 0.75, "--d": `${(i % 8) * 0.12}s` }} />)}
      <b>AES-256-GCM · 2-of-3</b>
    </div>
  );
}
function Health() {
  const rows = [["Diabetes", 28], ["Heart", 62], ["Kidney", 15], ["Liver", 41], ["Anemia", 8]];
  return <div className="art art-health">{rows.map(([n, v]) => <div key={n}><span>{n}</span><u><i style={{ "--w": `${v}%` }} /></u></div>)}</div>;
}
function Chat() {
  return (
    <div className="art art-chat">
      <p className="l">Explain recursion</p>
      <p className="r">A function that calls itself on a smaller problem…</p>
      <p className="l">Too easy</p>
      <p className="r">Level up: stack frames, memoization…</p>
    </div>
  );
}
function Alumni() {
  return (
    <div className="art art-alumni">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i}><em /><span style={{ width: `${40 + rnd(i, 2) * 40}%` }} /><span style={{ width: "18%" }} /></div>
      ))}
    </div>
  );
}
function Legal() {
  return (
    <div className="art art-legal">
      {Array.from({ length: 7 }).map((_, i) => <span key={i} className={i === 2 || i === 5 ? "hl" : ""} style={{ width: `${55 + rnd(i, 3) * 45}%` }} />)}
    </div>
  );
}
function Airline() {
  return (
    <div className="art art-airline">
      {Array.from({ length: 28 }).map((_, i) => <i key={i} className={i % 7 === 3 ? "gap" : rnd(i, 4) > 0.6 ? "taken" : i === 10 ? "mine" : ""} />)}
    </div>
  );
}

const map = { shatterbox: Shatter, health: Health, learning: Chat, alumni: Alumni, legal: Legal, airline: Airline };
export default function ProjectArt({ id }) {
  const A = map[id];
  return <div className="art-wrap" aria-hidden="true">{A ? <A /> : null}</div>;
}
