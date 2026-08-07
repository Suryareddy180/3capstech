import React from "react";
import { motion } from "framer-motion";

// Scroll-triggered reveal wrapper.
export default function Reveal({ children, delay = 0, y = 28, className = "", once = true }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Staggered word-by-word reveal for headings.
// `immediate` plays on mount (use for above-the-fold page headings).
export function WordReveal({ text, className = "", delay = 0, immediate = false }) {
  const words = text.split(" ");
  const anim = immediate
    ? { animate: { y: 0 } }
    : { whileInView: { y: 0 }, viewport: { once: true, amount: 0 } };
  return (
    <span style={{ display: "inline-block" }}>
      {words.map((word, i) => (
        <span key={i} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top" }}>
          <motion.span
            className={className}
            style={{ display: "inline-block", paddingRight: "0.28em" }}
            initial={{ y: "110%" }}
            {...anim}
            transition={{ duration: 0.7, delay: delay + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
