import { useState } from "react";

const SAMPLE = `Quarterly report — CONFIDENTIAL.
Revenue grew 18% year over year, driven by the enterprise tier. Churn fell to 2.1%.
Action items: finalize the vendor contract, rotate the signing keys, and brief the board before Friday.
Appendix: customer list, pricing exceptions, and the unreleased roadmap for the next two quarters.`;

const enc = new TextEncoder();
const dec = new TextDecoder();
const hex = (u8, n = 12) => [...u8.slice(0, n)].map((b) => b.toString(16).padStart(2, "0")).join("");
const sha = async (d) => new Uint8Array(await crypto.subtle.digest("SHA-256", d));
const cat = (...a) => { const o = new Uint8Array(a.reduce((n, x) => n + x.length, 0)); let p = 0; a.forEach((x) => { o.set(x, p); p += x.length; }); return o; };

// ---- content-defined chunking (gear hash; sizes scaled down for the demo) ----
const GEAR = (() => { let x = 2463534242; return Array.from({ length: 256 }, () => { x ^= x << 13; x ^= x >>> 17; x ^= x << 5; return x >>> 0; }); })();
function chunk(bytes, min = 24, mask = 0x3f, max = 160) {
  const out = []; let start = 0, h = 0;
  for (let i = 0; i < bytes.length; i++) {
    h = ((h << 1) + GEAR[bytes[i]]) >>> 0;
    const len = i - start + 1;
    if ((len >= min && (h & mask) === 0) || len >= max) { out.push(bytes.slice(start, i + 1)); start = i + 1; h = 0; }
  }
  if (start < bytes.length) out.push(bytes.slice(start));
  return out;
}

// ---- Shamir 2-of-3 over GF(256) ----
const gmul = (a, b) => { let p = 0; while (b) { if (b & 1) p ^= a; a = (a << 1) ^ (a & 0x80 ? 0x11b : 0); a &= 0xff; b >>= 1; } return p; };
const ginv = (a) => { let r = 1; for (let i = 0; i < 254; i++) r = gmul(r, a); return r; };
function split(secret) {
  const coef = crypto.getRandomValues(new Uint8Array(secret.length));
  return [1, 2, 3].map((x) => ({ x, y: secret.map((s, i) => s ^ gmul(coef[i], x)) }));
}
function combine(a, b) {
  const d = ginv(a.x ^ b.x);
  return a.y.map((ya, i) => gmul(gmul(b.x, ya) ^ gmul(a.x, b.y[i]), d));
}
const aes = (k, u) => crypto.subtle.importKey("raw", k, "AES-GCM", false, u);
async function seal(key, data) { const iv = crypto.getRandomValues(new Uint8Array(12)); return cat(iv, new Uint8Array(await crypto.subtle.encrypt({ name: "AES-GCM", iv }, await aes(key, ["encrypt"]), data))); }
async function open(key, blob) { return new Uint8Array(await crypto.subtle.decrypt({ name: "AES-GCM", iv: blob.slice(0, 12) }, await aes(key, ["decrypt"]), blob.slice(12))); }

const HOLDERS = { A: "Server (needs emailed code)", B: "Owner password", C: "Recovery code" };

export default function ShatterBoxDemo() {
  const [text, setText] = useState(SAMPLE);
  const [vault, setVault] = useState(null);
  const [changed, setChanged] = useState(null);
  const [have, setHave] = useState({ A: true, B: true, C: false });
  const [result, setResult] = useState(null);
  const [busy, setBusy] = useState(false);

  const protect = async () => {
    setBusy(true); setResult(null);
    const bytes = enc.encode(text);
    const userSecret = vault?.userSecret || crypto.getRandomValues(new Uint8Array(32));
    const master = crypto.getRandomValues(new Uint8Array(32));
    const chunks = [];
    for (const c of chunk(bytes)) {
      const key = await sha(cat(userSecret, c)); // per-user convergent key
      const id = hex(await sha(cat(key, c)), 6);
      chunks.push({ id, key, size: c.length, ct: await seal(key, c) });
    }
    const manifest = await seal(master, enc.encode(JSON.stringify(chunks.map((c) => ({ id: c.id, key: hex(c.key, 32) })))));
    setChanged(vault ? { same: chunks.filter((c) => vault.chunks.some((o) => o.id === c.id)).length, total: chunks.length } : null);
    setVault({ chunks, manifest, shares: split(master), userSecret, size: bytes.length });
    setBusy(false);
  };

  const flip = () => {
    const chunks = vault.chunks.map((c, i) => { if (i !== 0) return c; const ct = c.ct.slice(); ct[ct.length - 1] ^= 1; return { ...c, ct, tampered: true }; });
    setVault({ ...vault, chunks }); setResult(null);
  };

  const unlock = async () => {
    const got = ["A", "B", "C"].filter((k) => have[k]);
    if (got.length < 2) return setResult({ ok: false, msg: `Only ${got.length} share${got.length === 1 ? "" : "s"} available — 2 of 3 are required. The key cannot be rebuilt.` });
    const s = { A: vault.shares[0], B: vault.shares[1], C: vault.shares[2] };
    const master = new Uint8Array(combine(s[got[0]], s[got[1]]));
    try {
      const keys = JSON.parse(dec.decode(await open(master, vault.manifest)));
      const parts = [];
      for (let i = 0; i < vault.chunks.length; i++) {
        const k = new Uint8Array(keys[i].key.match(/../g).map((h) => parseInt(h, 16)));
        parts.push(await open(k, vault.chunks[i].ct));
      }
      setResult({ ok: true, msg: `Shares ${got.join(" + ")} rebuilt the key. All ${parts.length} chunks verified.`, text: dec.decode(cat(...parts)) });
    } catch {
      setResult({ ok: false, msg: "Authentication failed: AES-GCM rejected modified data. The file will not open." });
    }
  };

  return (
    <>
      <div className="demo-grid">
        <div>
          <h4>1 · Your file (text)</h4>
          <textarea value={text} onChange={(e) => setText(e.target.value)} rows={8} aria-label="File contents" style={{ fontFamily: "var(--mono)", fontSize: "0.8rem" }} />
          <button className="btn btn-primary btn-sm" style={{ marginTop: 12 }} onClick={protect} disabled={busy || !text}>{vault ? "Re-protect edited file" : "Protect file"}</button>
          {changed && <p className="notice">Content-defined chunking: after your edit, <b>{changed.same} of {changed.total}</b> chunks were identical and deduplicated — only {changed.total - changed.same} changed.</p>}
        </div>
        <div>
          <h4>2 · Encrypted chunks</h4>
          {!vault ? <p style={{ color: "var(--muted)" }}>Press “Protect file” — chunking, AES-256-GCM and Shamir splitting run for real in your browser (Web Crypto).</p> : (
            <div className="table-wrap" style={{ maxHeight: 220, overflowY: "auto" }}>
              <table className="tbl">
                <thead><tr><th>#</th><th>Chunk id</th><th>Bytes</th><th>Ciphertext</th></tr></thead>
                <tbody>{vault.chunks.map((c, i) => <tr key={i}><td>{i + 1}</td><td style={{ fontFamily: "var(--mono)" }}>{c.id}</td><td>{c.size}</td><td style={{ fontFamily: "var(--mono)", color: c.tampered ? "var(--bad)" : "var(--muted)" }}>{hex(c.ct.slice(12), 8)}…{c.tampered && " ⚠"}</td></tr>)}</tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {vault && (
        <div className="demo-grid" style={{ marginTop: 24 }}>
          <div>
            <h4>3 · Key shares (Shamir 2-of-3)</h4>
            {["A", "B", "C"].map((k, i) => (
              <label key={k} className="flight" style={{ marginBottom: 8, cursor: "pointer", fontWeight: 500 }}>
                <span><input type="checkbox" style={{ width: "auto", marginRight: 10 }} checked={have[k]} onChange={(e) => setHave({ ...have, [k]: e.target.checked })} />Share {k} · {HOLDERS[k]}</span>
                <span style={{ fontFamily: "var(--mono)", fontSize: "0.75rem", color: "var(--muted)" }}>{hex(vault.shares[i].y, 5)}…</span>
              </label>
            ))}
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 12 }}>
              <button className="btn btn-primary btn-sm" onClick={unlock}>Unlock file</button>
              <button className="btn btn-ghost btn-sm" onClick={flip}>Flip one bit in chunk 1</button>
            </div>
          </div>
          <div>
            <h4>4 · Result</h4>
            {result ? (
              <div className={`msg ${result.ok ? "ok" : "err"}`} style={{ marginTop: 0 }}>
                <b>{result.ok ? "Unlocked ✓" : "Denied ✗"}</b><br />{result.msg}
                {result.text && <pre style={{ whiteSpace: "pre-wrap", marginTop: 10, fontFamily: "var(--mono)", fontSize: "0.75rem", color: "var(--text)" }}>{result.text}</pre>}
              </div>
            ) : <p style={{ color: "var(--muted)" }}>Try unlocking with one share, then two. Then tamper with a chunk and unlock again.</p>}
          </div>
        </div>
      )}
      <p className="notice">Demo note: real AES-256-GCM and Shamir 2-of-3 on a small in-browser sample. The full app (Flask) adds FastCDC at 1 MiB average, LZMA2, RSA-2048 + ML-KEM-768 hybrid wrapping, emailed one-time codes, guest links with expiry / one-time / password / location limits, and a hash-chained audit log.</p>
    </>
  );
}
