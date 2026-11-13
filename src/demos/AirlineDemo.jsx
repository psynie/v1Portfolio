import { useMemo, useState } from "react";

const FLIGHTS = [
  { id: "AB101", from: "BLR", to: "DEL", dep: "06:15", dur: "2h 45m", base: 4200, seed: 7 },
  { id: "AB214", from: "BLR", to: "BOM", dep: "09:40", dur: "1h 55m", base: 3100, seed: 3 },
  { id: "AB330", from: "BLR", to: "DXB", dep: "22:10", dur: "4h 05m", base: 11800, seed: 11 },
];
const ROWS = 8, COLS = ["A", "B", "C", "D", "E", "F"];
const takenSeats = (seed) => {
  const s = new Set(); let x = seed * 9301;
  for (let i = 0; i < 22; i++) { x = (x * 49297 + 233280) % 233280; s.add(`${1 + (x % ROWS)}${COLS[(x >> 3) % 6]}`); }
  return s;
};

export default function AirlineDemo() {
  const [flight, setFlight] = useState(FLIGHTS[0]);
  const [seat, setSeat] = useState(null);
  const [booked, setBooked] = useState(false);
  const taken = useMemo(() => takenSeats(flight.seed), [flight]);
  const total = ROWS * 6;
  const occ = taken.size / total;
  const mult = 1 + occ * 0.8 + (seat && +seat.slice(0, -1) <= 2 ? 0.25 : 0);
  const price = Math.round((flight.base * mult) / 10) * 10;
  const pick = (f) => { setFlight(f); setSeat(null); setBooked(false); };

  return (
    <div className="demo-grid">
      <div style={{ display: "grid", gap: 10, alignContent: "start" }}>
        <h4>Select flight</h4>
        {FLIGHTS.map((f) => (
          <button key={f.id} className={`flight ${flight.id === f.id ? "sel" : ""}`} onClick={() => pick(f)}>
            <span><b>{f.from} → {f.to}</b><br /><small style={{ color: "var(--muted)" }}>{f.id} · {f.dep} · {f.dur}</small></span>
            <span>from ₹{f.base.toLocaleString()}</span>
          </button>
        ))}
        <p className="notice">Dynamic pricing: fare rises with seat occupancy ({Math.round(occ * 100)}% full) and for front rows.</p>
      </div>
      <div>
        <h4>Choose seat</h4>
        <div className="seatmap">
          {Array.from({ length: ROWS }).flatMap((_, r) => [0, 1, 2, "gap", 3, 4, 5].map((c) => {
            if (c === "gap") return <span key={`${r}g`} />;
            const id = `${r + 1}${COLS[c]}`;
            const isTaken = taken.has(id);
            return <button key={id} disabled={isTaken || booked} className={`seat ${isTaken ? "taken" : ""} ${seat === id ? "mine" : ""}`} onClick={() => setSeat(id)} aria-label={`Seat ${id}${isTaken ? " taken" : ""}`}>{id}</button>;
          }))}
        </div>
        <div className="legend"><span><i />Available</span><span><i style={{ background: "var(--border)" }} />Taken</span><span><i style={{ background: "var(--accent)" }} />Yours</span></div>
        <div style={{ marginTop: 18, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
          <div><small style={{ color: "var(--muted)" }}>Total fare</small><div className="price">₹{price.toLocaleString()}</div></div>
          <button className="btn btn-primary" disabled={!seat || booked} onClick={() => setBooked(true)}>{booked ? "Booked ✓" : "Book seat"}</button>
        </div>
        {booked && <div className="ticket" style={{ marginTop: 16 }}><b>Booking confirmed</b><br />{flight.from} → {flight.to} · {flight.id} · Seat {seat} · ₹{price.toLocaleString()}</div>}
      </div>
    </div>
  );
}
