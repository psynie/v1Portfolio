import { useState } from "react";

const CASES = [
  { id: "CF-1042", title: "Rao v. Meridian Builders", type: "Property", year: 2023, text: "Dispute over delayed possession of a residential apartment. Buyer seeks refund with interest and compensation for delay under the real estate regulation act." },
  { id: "CF-1187", title: "State v. Kulkarni", type: "Criminal", year: 2022, text: "Charges of cheque dishonour and breach of trust. Evidence includes bank statements and witness testimony regarding the loan agreement." },
  { id: "CF-1230", title: "Nair Textiles v. Sundar Exports", type: "Contract", year: 2024, text: "Breach of supply contract for cotton fabric. Claimant alleges non-payment of invoices and seeks damages and recovery of the outstanding amount." },
  { id: "CF-1315", title: "Sharma v. Sharma", type: "Family", year: 2023, text: "Petition for custody and maintenance following separation. Court considers the welfare of the child and financial affidavits of both parties." },
  { id: "CF-1402", title: "Iyer v. Horizon Insurance", type: "Insurance", year: 2024, text: "Claim repudiation after hospitalisation. Insurer cited non-disclosure of pre-existing conditions; petitioner argues the claim was wrongly denied." },
  { id: "CF-1466", title: "Patel Realty v. City Corporation", type: "Property", year: 2021, text: "Challenge to demolition notice and land acquisition. Petitioner claims inadequate compensation and violation of due process." },
];
const tokenize = (s) => s.toLowerCase().split(/\W+/).filter((w) => w.length > 2);

export default function LegalDemo() {
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(null);
  const terms = tokenize(q);

  const results = (() => {
    if (!terms.length) return CASES.map((c) => ({ ...c, score: 0 }));
    return CASES.map((c) => {
      const words = tokenize(`${c.title} ${c.type} ${c.text}`);
      const score = terms.reduce((s, t) => s + words.filter((w) => w.includes(t)).length, 0);
      return { ...c, score };
    }).filter((c) => c.score > 0).sort((a, b) => b.score - a.score);
  })();

  const hl = (text) => {
    if (!terms.length) return text;
    const re = new RegExp(`(${terms.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "gi");
    return text.split(re).map((p, i) => (i % 2 ? <mark key={i}>{p}</mark> : p));
  };
  const open = CASES.find((c) => c.id === sel);

  return (
    <>
      <input value={q} onChange={(e) => setQ(e.target.value)} placeholder='Search case files — try "compensation", "contract", "custody"…' aria-label="Search cases" />
      <div className="presets" style={{ marginTop: 12 }}>{["compensation", "breach contract", "custody", "insurance claim"].map((s) => <button key={s} className="chip" onClick={() => setQ(s)}>{s}</button>)}</div>
      <div className="demo-grid" style={{ marginTop: 8 }}>
        <div className="results" style={{ marginTop: 0 }}>
          {results.length === 0 && <p style={{ color: "var(--muted)" }}>No matching cases.</p>}
          {results.map((c) => (
            <button key={c.id} className={`result ${sel === c.id ? "sel" : ""}`} onClick={() => setSel(c.id)}>
              <h5><span>{hl(c.title)}</span>{c.score > 0 && <span className="score">rel {c.score}</span>}</h5>
              <p>{c.id} · {c.type} · {c.year}</p>
            </button>
          ))}
        </div>
        <div className="panel" style={{ alignSelf: "start" }}>
          {open ? (<><h3>{open.title}</h3><p className="period">{open.id} · {open.type} · {open.year}</p><p style={{ marginTop: 12 }}>{hl(open.text)}</p></>) : <p>Select a case to view its file summary.</p>}
        </div>
      </div>
      <p className="notice">Demo note: sample fictional cases with in-browser keyword ranking. The real app searches case files stored in MongoDB via a Flask API.</p>
    </>
  );
}
