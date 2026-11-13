import { useEffect, useRef, useState } from "react";

export default function Reveal({ children, delay = 0, className = "", style, ...rest }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(() => !("IntersectionObserver" in window));

  useEffect(() => {
    const el = ref.current;
    if (!el || shown) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setShown(true); io.disconnect(); }
    }, { threshold: 0.12 });
    io.observe(el);
    return () => io.disconnect();
  }, [shown]);

  return (
    <div ref={ref} className={`reveal ${shown ? "in" : ""} ${className}`} style={{ "--d": `${delay}s`, ...style }} {...rest}>
      {children}
    </div>
  );
}
