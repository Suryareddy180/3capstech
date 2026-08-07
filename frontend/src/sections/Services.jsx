import React, { useState } from "react";
import * as Icons from "lucide-react";
import { motion } from "framer-motion";
import Reveal, { WordReveal } from "../components/Reveal";
import { SERVICES } from "../lib/data";

export default function Services() {
  const [active, setActive] = useState(0);

  return (
    <section id="services" className="relative py-24 sm:py-32 scroll-mt-24 overflow-hidden">
      <div className="blob w-[500px] h-[500px] top-20 right-[-160px]" style={{ background: "var(--accent2)", opacity: 0.25 }} />
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <div>
            <div className="label text-accent mb-5">// What We Do</div>
            <h2 className="display-lg max-w-2xl">
              <WordReveal text="Eight disciplines," /><br />
              <WordReveal className="text-gradient" text="one obsessive standard." delay={0.15} />
            </h2>
          </div>
          <p className="text-muted max-w-sm">
            Hover or tap a panel to expand. Every engagement is engineered end-to-end by senior specialists.
          </p>
        </div>

        {/* Desktop expanding panels */}
        <div className="hidden lg:flex gap-4 h-[460px]" data-testid="services-panels">
          {SERVICES.map((s, i) => {
            const Icon = Icons[s.icon] || Icons.Circle;
            const isActive = active === i;
            return (
              <motion.div
                key={s.id}
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
                data-testid={`service-panel-${s.id}`}
                className="relative rounded-3xl overflow-hidden cursor-pointer glass"
                animate={{ flex: isActive ? 5 : 1 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                <div
                  className="absolute inset-0 opacity-0 transition-opacity duration-500"
                  style={{ opacity: isActive ? 1 : 0, background: "radial-gradient(120% 120% at 0% 100%, var(--accent-glow), transparent 60%)" }}
                />
                <div className="relative h-full p-6 flex flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <div className={`h-12 w-12 grid place-items-center rounded-2xl transition-colors ${isActive ? "bg-accent text-white" : "glass"}`}>
                      <Icon size={22} />
                    </div>
                    <span className="font-mono text-xs text-muted">0{i + 1}</span>
                  </div>

                  {!isActive && (
                    <div className="font-display font-bold text-lg [writing-mode:vertical-rl] rotate-180 self-center flex-1 flex items-center justify-center">
                      {s.title}
                    </div>
                  )}

                  <motion.div
                    animate={{ opacity: isActive ? 1 : 0 }}
                    transition={{ duration: 0.3, delay: isActive ? 0.2 : 0 }}
                    className="max-w-md"
                  >
                    <h3 className="display-md font-display font-bold">{s.title}</h3>
                    <p className="text-muted mt-3 leading-relaxed">{s.desc}</p>
                    <div className="flex flex-wrap gap-2 mt-5">
                      {s.tags.map((t) => (
                        <span key={t} className="rounded-full bg-accent/10 text-accent border border-accent/20 px-3 py-1 label text-[10px]">{t}</span>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile / tablet grid */}
        <div className="grid sm:grid-cols-2 gap-4 lg:hidden">
          {SERVICES.map((s, i) => {
            const Icon = Icons[s.icon] || Icons.Circle;
            return (
              <Reveal key={s.id} delay={i * 0.05}>
                <div className="glass rounded-2xl p-6 h-full" data-testid={`service-card-${s.id}`}>
                  <div className="h-12 w-12 grid place-items-center rounded-2xl bg-accent text-white mb-4">
                    <Icon size={22} />
                  </div>
                  <h3 className="font-display font-bold text-xl">{s.title}</h3>
                  <p className="text-muted mt-2 leading-relaxed text-sm">{s.desc}</p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {s.tags.map((t) => (
                      <span key={t} className="rounded-full bg-accent/10 text-accent border border-accent/20 px-2.5 py-1 label text-[9px]">{t}</span>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
