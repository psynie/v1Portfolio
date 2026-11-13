import { useState } from "react";

const FIELDS = [
  { k: "glucose", label: "Fasting glucose (mg/dL)", min: 60, max: 300, step: 1 },
  { k: "hba1c", label: "HbA1c (%)", min: 4, max: 12, step: 0.1 },
  { k: "chol", label: "Total cholesterol (mg/dL)", min: 120, max: 320, step: 1 },
  { k: "creat", label: "Creatinine (mg/dL)", min: 0.4, max: 4, step: 0.1 },
  { k: "alt", label: "ALT (U/L)", min: 10, max: 200, step: 1 },
  { k: "hb", label: "Hemoglobin (g/dL)", min: 6, max: 18, step: 0.1 },
];
const PRESETS = {
  Healthy: { glucose: 88, hba1c: 5.1, chol: 165, creat: 0.9, alt: 24, hb: 14.5 },
  "Pre-diabetic": { glucose: 118, hba1c: 6.0, chol: 205, creat: 1.0, alt: 38, hb: 13.8 },
  "High cardiac risk": { glucose: 105, hba1c: 5.8, chol: 285, creat: 1.1, alt: 42, hb: 14.0 },
  "Anemic": { glucose: 92, hba1c: 5.2, chol: 170, creat: 0.8, alt: 22, hb: 8.9 },
};
const clamp = (x) => Math.max(0, Math.min(1, x));
const ramp = (v, lo, hi) => clamp((v - lo) / (hi - lo));

function score(v) {
  return [
    { name: "Diabetes", p: clamp(0.6 * ramp(v.hba1c, 5.4, 7.5) + 0.4 * ramp(v.glucose, 95, 150)) },
    { name: "Heart disease", p: clamp(0.8 * ramp(v.chol, 190, 290) + 0.2 * ramp(v.glucose, 100, 160)) },
    { name: "Kidney disease", p: ramp(v.creat, 1.0, 2.2) },
    { name: "Liver disease", p: ramp(v.alt, 35, 120) },
    { name: "Anemia", p: ramp(13 - v.hb, 0, 5) },
  ];
}
const level = (p) => (p < 0.3 ? ["Low", "var(--good)"] : p < 0.6 ? ["Moderate", "var(--warn)"] : ["High", "var(--bad)"]);

export default function HealthDemo() {
  const [v, setV] = useState(PRESETS.Healthy);
  const res = score(v);
  return (
    <>
      <div className="presets">
        {Object.entries(PRESETS).map(([n, p]) => <button key={n} className="chip" onClick={() => setV(p)}>{n}</button>)}
      </div>
      <div className="demo-grid">
        <div>
          <h4>Blood test inputs</h4>
          {FIELDS.map((f) => (
            <div className="field" key={f.k}>
              <label htmlFor={f.k}>{f.label}<span>{v[f.k]}</span></label>
              <input id={f.k} type="range" min={f.min} max={f.max} step={f.step} value={v[f.k]} onChange={(e) => setV({ ...v, [f.k]: +e.target.value })} />
            </div>
          ))}
        </div>
        <div>
          <h4>Predicted risk</h4>
          {res.map((r) => {
            const [l, c] = level(r.p);
            return (
              <div className="risk" key={r.name}>
                <div className="risk-top"><span>{r.name}</span><span className="lvl" style={{ color: c }}>{l} · {Math.round(r.p * 100)}%</span></div>
                <div className="bar"><i style={{ "--w": `${Math.max(3, r.p * 100)}%`, "--c": c }} /></div>
              </div>
            );
          })}
        </div>
      </div>
      <p className="notice">Demo note: this uses simple threshold-based scoring to illustrate the UX. The real project uses trained XGBoost / Scikit-learn ensemble models. Not medical advice.</p>
    </>
  );
}
