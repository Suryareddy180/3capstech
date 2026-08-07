import React, { useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Search, ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import CourseCard from "./CourseCard";
import Reveal, { WordReveal } from "../components/Reveal";
import { COURSES, CATEGORIES, TRACKS } from "../lib/data";

function Row({ title, courses }) {
  const ref = useRef(null);
  const scroll = (dir) => {
    ref.current?.scrollBy({ left: dir * 340, behavior: "smooth" });
  };
  return (
    <div className="mb-14">
      <div className="flex items-center justify-between mb-5 px-1">
        <h3 className="display-md font-display font-bold">{title}</h3>
        <div className="hidden sm:flex gap-2">
          <button onClick={() => scroll(-1)} className="h-10 w-10 grid place-items-center rounded-full glass hover:text-accent transition-colors" aria-label="scroll left">
            <ChevronLeft size={18} />
          </button>
          <button onClick={() => scroll(1)} className="h-10 w-10 grid place-items-center rounded-full glass hover:text-accent transition-colors" aria-label="scroll right">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
      <div ref={ref} className="flex gap-5 overflow-x-auto no-scrollbar pb-4 -mx-1 px-1 snap-x">
        {courses.map((c, i) => (
          <div key={c.id} className="min-w-[280px] max-w-[280px] snap-start">
            <CourseCard course={c} index={i} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function LearningHub() {
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    return COURSES.filter((c) => {
      const okCat = cat === "All" || c.category === cat;
      const okQ = !q || (c.title + c.instructor + c.category).toLowerCase().includes(q.toLowerCase());
      return okCat && okQ;
    });
  }, [cat, q]);

  const trending = COURSES.filter((c) => c.trending);
  const popular = [...COURSES].sort((a, b) => b.students - a.students);

  return (
    <section className="relative pt-32 pb-24 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="blob w-[520px] h-[520px] -top-40 right-[-160px]" style={{ background: "var(--accent)", opacity: 0.25 }} />

      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6">
        <div className="max-w-3xl">
          <div className="label text-accent mb-5">// The Learning Hub</div>
          <h1 className="display-lg">
            <WordReveal text="Master tomorrow's" immediate /><br />
            <WordReveal className="text-gradient" text="technology, today." delay={0.15} immediate />
          </h1>
          <p className="mt-6 text-muted text-lg leading-relaxed">
            A Netflix-grade education experience — curated tracks, world-class instructors
            and hands-on projects across web, AI, cloud, mobile and design.
          </p>
        </div>

        {/* Search + filters */}
        <div className="mt-10 flex flex-col md:flex-row gap-4 md:items-center">
          <div className="flex items-center glass rounded-full px-4 py-3 flex-1 max-w-md" data-testid="learning-search">
            <Search size={18} className="text-muted" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search courses, instructors, topics..."
              data-testid="learning-search-input"
              className="flex-1 bg-transparent outline-none px-3 text-sm text-ink placeholder:text-muted min-w-0"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto no-scrollbar" data-testid="learning-categories">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                data-testid={`category-${c.toLowerCase().replace(/[^a-z]/g, "")}`}
                className={`rounded-full px-4 py-2.5 text-sm whitespace-nowrap transition-colors border ${
                  cat === c ? "bg-accent text-white border-accent" : "glass border-line hover:text-accent"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Career Tracks */}
      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 mt-16">
        <h3 className="display-md font-display font-bold mb-6">Career Tracks</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4" data-testid="career-tracks">
          {TRACKS.map((t, i) => (
            <Reveal key={t.title} delay={i * 0.07}>
              <div className="group glass rounded-3xl p-6 h-full hover:-translate-y-1.5 transition-transform relative overflow-hidden" data-testid={`track-${i}`}>
                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full blur-2xl opacity-40" style={{ background: t.color }} />
                <div className="h-2 w-12 rounded-full mb-5" style={{ background: t.color }} />
                <div className="font-display font-bold text-xl">{t.title}</div>
                <div className="text-sm text-muted mt-2">{t.courses} courses · {t.months}</div>
                <div className="mt-6 inline-flex items-center gap-1 text-sm text-accent">
                  Start track <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Carousels */}
      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 mt-16">
        <Row title="Trending Now" courses={trending} />
        <Row title="Most Popular" courses={popular} />
      </div>

      {/* Full grid (filtered) */}
      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 mt-4">
        <div className="flex items-center justify-between mb-6">
          <h3 className="display-md font-display font-bold">
            {cat === "All" ? "All Courses" : cat} <span className="text-muted text-base font-sans">({filtered.length})</span>
          </h3>
        </div>
        {filtered.length === 0 ? (
          <div className="glass rounded-3xl p-16 text-center text-muted" data-testid="learning-empty">No courses match your search.</div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5" data-testid="course-grid">
            {filtered.map((c, i) => (
              <Reveal key={c.id} delay={(i % 4) * 0.05}>
                <CourseCard course={c} index={i} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
