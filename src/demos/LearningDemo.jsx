import { useEffect, useRef, useState } from "react";

const TOPICS = {
  Recursion: [
    "Recursion is when a function solves a problem by calling itself on a smaller version of that problem.",
    "A recursive function needs a base case (when to stop) and a recursive case (how to shrink the problem).\n`factorial(n) = n * factorial(n-1)`, with `factorial(0) = 1`.",
    "Each call adds a stack frame, so depth matters. Many recursions can be optimized with memoization (O(2ⁿ) → O(n) for Fibonacci) or converted to iteration / tail calls to avoid stack overflow.",
  ],
  "Big-O": [
    "Big-O describes how the running time of an algorithm grows as the input gets bigger.",
    "Common classes: O(1) constant, O(log n) binary search, O(n) loop, O(n log n) good sorts, O(n²) nested loops. Drop constants and lower-order terms.",
    "Big-O is an upper bound on growth; pair it with Ω (lower) and Θ (tight). Amortized analysis explains why dynamic-array append is O(1) on average despite occasional O(n) resizes.",
  ],
  "REST APIs": [
    "A REST API lets programs talk over HTTP using URLs, like asking a server for data.",
    "Resources have URLs (`/users/42`) and HTTP verbs describe actions: GET reads, POST creates, PUT/PATCH updates, DELETE removes. Responses use status codes like 200, 404.",
    "Good REST design: statelessness, idempotent PUT/DELETE, pagination, versioning, caching with ETags, and auth via tokens. Consider rate-limiting and consistent error schemas.",
  ],
  Overfitting: [
    "Overfitting is when a model memorizes training data and then does badly on new data.",
    "Signs: training accuracy high, validation accuracy low. Fixes: more data, simpler model, regularization, early stopping, cross-validation.",
    "It's the high-variance side of the bias–variance tradeoff. Use L1/L2 penalties, dropout, data augmentation, and nested CV for honest model selection.",
  ],
};
const LEVELS = ["Beginner", "Intermediate", "Advanced"];

export default function LearningDemo() {
  const [level, setLevel] = useState(0);
  const [log, setLog] = useState([{ who: "bot", text: "Hi! I'm your learning assistant. Pick a topic or ask about one — then tell me if my answer was too easy or too hard and I'll adapt." }]);
  const [input, setInput] = useState("");
  const [last, setLast] = useState(null);
  const end = useRef(null);
  useEffect(() => { end.current?.scrollTo({ top: end.current.scrollHeight, behavior: "smooth" }); }, [log]);

  const explain = (topic, lv) => {
    setLast(topic);
    setLog((l) => [...l, { who: "bot", text: `${topic} — ${LEVELS[lv]} level\n\n${TOPICS[topic][lv]}`, fb: true }]);
  };
  const ask = (q) => {
    if (!q.trim()) return;
    setLog((l) => [...l, { who: "me", text: q }]);
    const t = Object.keys(TOPICS).find((k) => q.toLowerCase().includes(k.toLowerCase().replace(" apis", "")) || q.toLowerCase().includes(k.toLowerCase()));
    if (t) explain(t, level);
    else setLog((l) => [...l, { who: "bot", text: `I can explain: ${Object.keys(TOPICS).join(", ")}. Try one of those!` }]);
    setInput("");
  };
  const feedback = (dir) => {
    const nl = Math.max(0, Math.min(2, level + dir));
    setLevel(nl);
    setLog((l) => [...l.map((m) => ({ ...m, fb: false })), { who: "me", text: dir > 0 ? "Too easy" : "Too hard" }]);
    if (last && nl !== level) explain(last, nl);
    else setLog((l) => [...l, { who: "bot", text: `You're already at the ${LEVELS[nl]} level — I'll keep it there.` }]);
  };

  return (
    <>
      <div className="presets">{Object.keys(TOPICS).map((t) => <button key={t} className="chip" onClick={() => { setLog((l) => [...l, { who: "me", text: `Explain ${t}` }]); explain(t, level); }}>{t}</button>)}</div>
      <div className="level-meter"><span>Adaptive level:</span><div className="bar"><i style={{ "--w": `${(level + 1) * 33.3}%`, "--c": "var(--accent)" }} /></div><b>{LEVELS[level]}</b></div>
      <div className="chat">
        <div className="chat-log" ref={end} aria-live="polite">
          {log.map((m, i) => (
            <div key={i} className={`bubble ${m.who}`}>
              {m.text.split(/(`[^`]+`)/).map((s, j) => s.startsWith("`") ? <code key={j}>{s.slice(1, -1)}</code> : s)}
              {m.fb && <div className="fb"><button className="btn btn-ghost btn-sm" onClick={() => feedback(1)}>Too easy</button><button className="btn btn-ghost btn-sm" onClick={() => feedback(-1)}>Too hard</button></div>}
            </div>
          ))}
        </div>
        <form className="chat-input" onSubmit={(e) => { e.preventDefault(); ask(input); }}>
          <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask about recursion, Big-O, REST APIs…" aria-label="Message" />
          <button className="btn btn-primary btn-sm" type="submit">Send</button>
        </form>
      </div>
      <p className="notice">Demo note: canned explanations with feedback-driven difficulty adaptation. The real project uses NLP-driven feedback analysis on a Flask + MongoDB backend.</p>
    </>
  );
}
