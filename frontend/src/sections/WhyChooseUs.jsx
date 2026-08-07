import React, { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import * as Icons from "lucide-react";
import { WordReveal } from "../components/Reveal";
import { STATS } from "../lib/data";

function Counter({ value, suffix }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf;
    const start = performance.now();
    const dur = 1600;
    const tick = (t) => {
      const p = Math.min((t - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.floor(eased * value));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setN(value);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {n.toLocaleString()}
      {suffix}
    </span>
  );
}

const REASONS = [
  { icon: "Zap", title: "Senior-only teams", text: "Every project is led by engineers with 8+ years of production experience." },
  { icon: "Layers", title: "Design + Engineering", text: "One team owns the pixel and the pipeline — no handoff gaps." },
  { icon: "GraduationCap", title: "Learn while we build", text: "Clients get upskilled teams through our embedded academy model." },
  { icon: "ShieldCheck", title: "Enterprise-grade", text: "Security, compliance and observability baked in from day one." },
];

export default function WhyChooseUs() {
  return (
    <section id="why" className="relative py-24 sm:py-32 scroll-mt-24">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="label text-accent mb-5">// Why 3CAPSTECH</div>
          <h2 className="display-lg">
            <WordReveal text="Numbers we're" /> <WordReveal className="text-gradient" text="proud of." delay={0.15} />
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6" data-testid="why-counters">
          {STATS.map((s) => (
            <div key={s.label} className="glass rounded-3xl p-8 text-center hover:-translate-y-1 transition-transform">
              <div className="display-md font-display font-black text-gradient">
                <Counter value={s.value} suffix={s.suffix} />
              </div>
              <div className="label text-muted mt-2 text-[10px]">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {REASONS.map((r, i) => {
            const Icon = Icons[r.icon] || Icons.Circle;
            return (
              <div key={r.title} className="glass rounded-3xl p-7 hover:border-accent/40 transition-colors group" data-testid={`why-reason-${i}`}>
                <div className="h-12 w-12 grid place-items-center rounded-2xl glass group-hover:bg-accent group-hover:text-white transition-colors mb-5">
                  <Icon size={22} />
                </div>
                <div className="font-display font-bold text-lg">{r.title}</div>
                <p className="text-muted text-sm mt-2 leading-relaxed">{r.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
