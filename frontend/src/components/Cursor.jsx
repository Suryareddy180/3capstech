import React, { useEffect, useRef, useState } from "react";

// Custom animated cursor: dot + trailing ring, expands over interactive elements.
export default function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    let rx = 0, ry = 0, mx = 0, my = 0;
    let raf;

    const move = (e) => {
      mx = e.clientX;
      my = e.clientY;
      if (dot.current) {
        dot.current.style.transform = `translate(${mx - 3.5}px, ${my - 3.5}px)`;
      }
      setHidden(false);
    };
    const loop = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      if (ring.current) {
        ring.current.style.transform = `translate(${rx - 19}px, ${ry - 19}px) scale(${scale.current})`;
      }
      raf = requestAnimationFrame(loop);
    };
    const scale = { current: 1 };
    const over = (e) => {
      if (e.target.closest("a,button,[data-cursor='hover'],input,textarea,select")) scale.current = 1.9;
    };
    const out = () => (scale.current = 1);

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    window.addEventListener("mouseout", out);
    window.addEventListener("mouseleave", () => setHidden(true));
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      window.removeEventListener("mouseout", out);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={dot} className="cursor-dot" style={{ opacity: hidden ? 0 : 1 }} />
      <div ref={ring} className="cursor-ring" style={{ opacity: hidden ? 0 : 0.8, transition: "opacity .3s" }} />
    </>
  );
}
