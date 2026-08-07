import React from "react";
import { motion } from "framer-motion";
import { Users, Award, Briefcase, ArrowRight } from "lucide-react";
import Reveal, { WordReveal } from "../components/Reveal";
import MagneticButton from "../components/MagneticButton";
import { INTERNSHIP_STEPS } from "../lib/data";

const PERKS = [
  { icon: Users, label: "1:1 Mentors" },
  { icon: Briefcase, label: "Live Projects" },
  { icon: Award, label: "Verified Certificate" },
];

export default function Internships() {
  return (
    <section id="internships" className="relative py-24 sm:py-32 scroll-mt-24 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
          <div>
            <div className="label text-accent mb-5">// Internships</div>
            <h2 className="display-lg max-w-2xl">
              <WordReveal text="From learner to" /><br />
              <WordReveal className="text-gradient" text="shipping engineer." delay={0.15} />
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {PERKS.map((p) => (
              <div key={p.label} className="glass rounded-full px-4 py-2.5 inline-flex items-center gap-2 text-sm">
                <p.icon size={16} className="text-accent" />
                {p.label}
              </div>
            ))}
          </div>
        </div>

        <div className="relative grid md:grid-cols-4 gap-4" data-testid="internship-timeline">
          {INTERNSHIP_STEPS.map((s, i) => (
            <Reveal key={s.step} delay={i * 0.1}>
              <div className="relative glass rounded-3xl p-7 h-full hover:-translate-y-1.5 transition-transform" data-testid={`internship-step-${s.step}`}>
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.2, type: "spring" }}
                  className="h-14 w-14 rounded-2xl bg-accent text-white grid place-items-center font-display font-black text-lg mb-6"
                >
                  {s.step}
                </motion.div>
                <div className="font-display font-bold text-xl">{s.title}</div>
                <p className="text-muted text-sm mt-2 leading-relaxed">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 glass rounded-3xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 glow-accent">
          <div>
            <div className="display-md font-display font-bold">Placement assistance included</div>
            <p className="text-muted mt-2">Access our network of 120+ hiring partners after you graduate.</p>
          </div>
          <MagneticButton
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            data-testid="internship-apply"
            className="group inline-flex items-center gap-2 rounded-full bg-[var(--text-primary)] text-[var(--bg)] px-7 py-3.5 font-medium shrink-0"
          >
            Apply for Internship
            <ArrowRight size={17} className="group-hover:translate-x-1 transition-transform" />
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
