import { useMemo, useState } from "react";

const PEOPLE = [
  { name: "Aarav Mehta", role: "Software Engineer", company: "Finlytics", batch: 2019, skills: ["Python", "FastAPI"] },
  { name: "Diya Nair", role: "Data Scientist", company: "Cartwheel", batch: 2020, skills: ["Python", "TensorFlow"] },
  { name: "Rohan Gupta", role: "Frontend Engineer", company: "Pixelforge", batch: 2021, skills: ["React", "TypeScript"] },
  { name: "Sana Khan", role: "ML Engineer", company: "Finlytics", batch: 2020, skills: ["Python", "PyTorch"] },
  { name: "Karthik Rao", role: "Backend Engineer", company: "Orbitly", batch: 2019, skills: ["Node.js", "MongoDB"] },
  { name: "Meera Iyer", role: "Product Analyst", company: "Cartwheel", batch: 2022, skills: ["SQL", "Tableau"] },
  { name: "Vikram Shah", role: "Full-stack Engineer", company: "Orbitly", batch: 2021, skills: ["React", "FastAPI"] },
  { name: "Ananya Das", role: "Software Engineer", company: "Pixelforge", batch: 2022, skills: ["Java", "React"] },
];

export default function AlumniDemo() {
  const [q, setQ] = useState("");
  const [company, setCompany] = useState("All");
  const companies = ["All", ...new Set(PEOPLE.map((p) => p.company))];
  const rows = useMemo(() => PEOPLE.filter((p) =>
    (company === "All" || p.company === company) &&
    `${p.name} ${p.role} ${p.company} ${p.skills.join(" ")}`.toLowerCase().includes(q.toLowerCase())), [q, company]);
  const byCompany = Object.entries(rows.reduce((a, p) => ({ ...a, [p.company]: (a[p.company] || 0) + 1 }), {}));

  return (
    <>
      <div className="form-row">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search name, role, skill…" aria-label="Search alumni" />
        <select value={company} onChange={(e) => setCompany(e.target.value)} aria-label="Company">{companies.map((c) => <option key={c}>{c}</option>)}</select>
      </div>
      <div className="demo-grid" style={{ marginTop: 20 }}>
        <div className="table-wrap">
          <table className="tbl">
            <thead><tr><th>Name</th><th>Role</th><th>Company</th><th>Batch</th></tr></thead>
            <tbody>{rows.map((p) => <tr key={p.name}><td><b>{p.name}</b></td><td>{p.role}</td><td>{p.company}</td><td>{p.batch}</td></tr>)}</tbody>
          </table>
          {!rows.length && <p style={{ color: "var(--muted)", padding: 12 }}>No alumni match.</p>}
        </div>
        <div>
          <h4>Alumni by company</h4>
          <div className="mini-bars">
            {byCompany.map(([c, n]) => <div key={c}><span>{c}</span><div className="bar"><i style={{ "--w": `${(n / Math.max(1, rows.length)) * 100}%`, "--c": "var(--accent)" }} /></div><b>{n}</b></div>)}
          </div>
          <p className="notice">Demo note: fictional sample profiles. The real platform scrapes and structures public profile data with Playwright, serves it via FastAPI and stores it in MongoDB.</p>
        </div>
      </div>
    </>
  );
}
