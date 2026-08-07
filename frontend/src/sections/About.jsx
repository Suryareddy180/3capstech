import React from "react";
import * as Icons from "lucide-react";
import { Target, Eye } from "lucide-react";
import Reveal, { WordReveal } from "../components/Reveal";
import { MISSION, VISION, PILLARS, VALUES } from "../lib/data";

export default function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32 scroll-mt-24">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="label text-accent mb-5" data-testid="about-eyebrow">// Our Story</div>
            <h2 className="display-lg">
              <WordReveal text="We build software" /> <br className="hidden sm:block" />
              <WordReveal className="text-gradient" text="that teaches back." delay={0.2} />
            </h2>
            <p className="mt-6 text-muted text-lg leading-relaxed max-w-md">
              3CAPSTECH is a dual-engine company — a premium software studio and a
              modern learning platform. We ship products for enterprises while
              training the engineers who build the future.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-4">
              {VALUES.map((v, i) => {
                const Icon = Icons[v.icon] || Icons.Circle;
                return (
                  <Reveal key={v.title} delay={i * 0.08}>
                    <div className="glass rounded-2xl p-5 h-full hover:-translate-y-1 transition-transform" data-testid={`value-${v.title.toLowerCase()}`}>
                      <Icon className="text-accent mb-3" size={22} />
                      <div className="font-display font-bold text-lg">{v.title}</div>
                      <div className="text-sm text-muted mt-1 leading-relaxed">{v.text}</div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4">
            <Reveal>
              <div className="glass rounded-3xl p-8 relative overflow-hidden" data-testid="about-mission">
                <div className="blob w-56 h-56 -top-16 -right-10" style={{ background: "var(--accent)", opacity: 0.25 }} />
                <div className="relative flex items-start gap-4">
                  <div className="h-12 w-12 shrink-0 grid place-items-center rounded-2xl bg-accent text-white">
                    <Target size={22} />
                  </div>
                  <div>
                    <div className="label text-muted">Mission</div>
                    <p className="mt-2 display-md font-display font-bold leading-tight">{MISSION}</p>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="glass rounded-3xl p-8 relative overflow-hidden" data-testid="about-vision">
                <div className="blob w-56 h-56 -bottom-20 -left-10" style={{ background: "var(--accent2)", opacity: 0.22 }} />
                <div className="relative flex items-start gap-4">
                  <div className="h-12 w-12 shrink-0 grid place-items-center rounded-2xl glass text-accent">
                    <Eye size={22} />
                  </div>
                  <div>
                    <div className="label text-muted">Vision</div>
                    <p className="mt-2 text-xl sm:text-2xl font-display font-semibold leading-snug text-muted">{VISION}</p>
                  </div>
                </div>
              </div>
            </Reveal>

            <div className="grid sm:grid-cols-3 gap-4">
              {PILLARS.map((p, i) => (
                <Reveal key={p.k} delay={0.12 + i * 0.06}>
                  <div className="glass rounded-2xl p-6 h-full hover:border-accent/40 transition-colors" data-testid={`pillar-${i}`}>
                    <div className="font-mono text-accent text-sm mb-2">0{i + 1}</div>
                    <div className="font-display font-bold text-lg">{p.k}</div>
                    <p className="text-sm text-muted mt-1.5 leading-relaxed">{p.v}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
