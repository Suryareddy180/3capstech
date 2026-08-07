import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import ParticleField from "../components/ParticleField";
import MagneticButton from "../components/MagneticButton";
import { STATS } from "../lib/data";

const FLOATERS = [
  { label: "Enterprise", x: "8%", y: "24%", d: 0 },
  { label: "AI Solutions", x: "82%", y: "20%", d: 0.4 },
  { label: "Cloud", x: "88%", y: "62%", d: 0.8 },
  { label: "Learning", x: "6%", y: "66%", d: 1.2 },
];

const line = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};
const word = {
  hidden: { y: "115%" },
  show: { y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
};

export default function Hero() {
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 600], [0, 140]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden pt-28 pb-16">
      <div className="absolute inset-0 grid-bg opacity-70" />
      <div className="absolute inset-0">
        <ParticleField density={90} />
      </div>
      <div className="blob w-[520px] h-[520px] -top-40 -right-20 animate-floaty" style={{ background: "var(--accent)" }} />
      <div className="blob w-[420px] h-[420px] bottom-0 left-[-120px]" style={{ background: "var(--accent2)", opacity: 0.35 }} />

      {FLOATERS.map((f) => (
        <motion.div
          key={f.label}
          className="hidden md:flex absolute glass rounded-2xl px-4 py-3 items-center gap-2 animate-floaty"
          style={{ left: f.x, top: f.y, animationDelay: `${f.d}s` }}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 + f.d, duration: 0.6 }}
        >
          <span className="h-2 w-2 rounded-full bg-accent" />
          <span className="font-mono text-xs tracking-wide">{f.label}</span>
        </motion.div>
      ))}

      <motion.div style={{ y: y1, opacity }} className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 glass rounded-full pl-2 pr-4 py-1.5 mb-8"
          data-testid="hero-badge"
        >
          <span className="inline-flex items-center gap-1 rounded-full bg-accent/15 text-accent px-2.5 py-1 label text-[10px]">
            <Sparkles size={11} /> New
          </span>
          <span className="text-sm text-muted">AI-first software & a world-class learning platform</span>
        </motion.div>

        <h1 className="display-xl">
          <motion.span variants={line} initial="hidden" animate="show" className="block">
            {["BUILD.", "LEARN.", "INNOVATE."].map((w, i) => (
              <span key={w} className="block overflow-hidden">
                <motion.span
                  variants={word}
                  className={`inline-block ${i === 1 ? "text-gradient" : ""}`}
                >
                  {w}
                </motion.span>
              </span>
            ))}
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mt-8 max-w-xl text-lg sm:text-xl text-muted leading-relaxed"
          data-testid="hero-subtitle"
        >
          Engineering intelligent software solutions while empowering the next
          generation of technology professionals.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05 }}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <MagneticButton
            onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
            data-testid="hero-cta-solutions"
            className="group inline-flex items-center gap-2 rounded-full bg-[var(--text-primary)] text-[var(--bg)] px-7 py-3.5 font-medium"
          >
            Explore Solutions
            <ArrowRight size={17} className="group-hover:translate-x-1 transition-transform" />
          </MagneticButton>
          <MagneticButton
            onClick={() => navigate("/learning")}
            data-testid="hero-cta-learning"
            className="inline-flex items-center gap-2 rounded-full glass px-7 py-3.5 font-medium hover:text-accent transition-colors"
          >
            Start Learning
          </MagneticButton>
          <button
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            data-testid="hero-cta-consult"
            className="inline-flex items-center gap-2 px-4 py-3.5 font-medium text-muted hover:text-ink transition-colors"
          >
            <span className="h-9 w-9 grid place-items-center rounded-full glass"><Play size={13} /></span>
            Book Consultation
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl border-t border-line pt-8"
        >
          {STATS.map((s) => (
            <div key={s.label}>
              <div className="display-md font-display font-black">
                {s.value.toLocaleString()}
                {s.suffix}
              </div>
              <div className="label text-muted mt-1 text-[10px]">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
