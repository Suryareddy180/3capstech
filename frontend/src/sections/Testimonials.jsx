import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { WordReveal } from "../components/Reveal";
import TiltCard from "../components/TiltCard";
import { TESTIMONIALS } from "../lib/data";

export default function Testimonials() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI((p) => (p + 1) % TESTIMONIALS.length), 4500);
    return () => clearInterval(t);
  }, [paused]);

  const t = TESTIMONIALS[i];

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      <div className="blob w-[460px] h-[460px] bottom-0 right-[-140px]" style={{ background: "var(--accent)", opacity: 0.22 }} />
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <div className="label text-accent mb-5">// Loved By Teams</div>
            <h2 className="display-lg">
              <WordReveal text="Trusted by builders" /> <WordReveal className="text-gradient" text="& learners alike." delay={0.15} />
            </h2>
            <p className="mt-6 text-muted text-lg max-w-md leading-relaxed">
              From fast-moving startups to global enterprises and thousands of
              graduates — here's what people say.
            </p>

            <div className="mt-8 flex items-center gap-3" data-testid="testimonial-controls">
              <button
                onClick={() => setI((p) => (p - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
                data-testid="testimonial-prev"
                className="h-11 w-11 grid place-items-center rounded-full glass hover:text-accent transition-colors"
                aria-label="Previous"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => setI((p) => (p + 1) % TESTIMONIALS.length)}
                data-testid="testimonial-next"
                className="h-11 w-11 grid place-items-center rounded-full glass hover:text-accent transition-colors"
                aria-label="Next"
              >
                <ChevronRight size={18} />
              </button>
              <div className="flex gap-1.5 ml-2">
                {TESTIMONIALS.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setI(idx)}
                    className={`h-1.5 rounded-full transition-all ${idx === i ? "w-8 bg-accent" : "w-1.5 bg-line"}`}
                    aria-label={`Go to ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
            <TiltCard max={8}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
                  transition={{ duration: 0.5 }}
                  className="glass rounded-3xl p-8 sm:p-10 glow-accent"
                  data-testid="testimonial-card"
                >
                  <Quote className="text-accent" size={34} />
                  <p className="mt-5 text-xl sm:text-2xl font-display font-medium leading-snug">
                    "{t.text}"
                  </p>
                  <div className="mt-8 flex items-center gap-4">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      loading="lazy"
                      className="h-14 w-14 rounded-full object-cover ring-2 ring-accent/30"
                    />
                    <div>
                      <div className="font-display font-bold">{t.name}</div>
                      <div className="text-sm text-muted">{t.role}</div>
                    </div>
                    <div className="ml-auto flex gap-0.5">
                      {[...Array(5)].map((_, s) => (
                        <Star key={s} size={15} className="fill-accent text-accent" />
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </TiltCard>
          </div>
        </div>
      </div>
    </section>
  );
}
