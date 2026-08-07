import React from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard, PlayCircle, Award, ClipboardCheck, CalendarDays,
  Trophy, TrendingUp, Flame, CheckCircle2,
} from "lucide-react";
import { WordReveal } from "../components/Reveal";

const CONTINUE = [
  { title: "AI & Machine Learning", pct: 68, ch: "Ch 7 · Deep Learning" },
  { title: "Frontend Engineering", pct: 42, ch: "Ch 4 · Interactions" },
  { title: "Cloud & DevOps", pct: 91, ch: "Ch 9 · Scaling" },
];
const LEADERS = [
  { n: "Aisha K.", xp: "9,840", you: false },
  { n: "You", xp: "8,120", you: true },
  { n: "Rahul V.", xp: "7,560", you: false },
];
const BARS = [40, 65, 52, 80, 72, 95, 60];

export default function LMSPreview() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="label text-accent mb-5">// LMS Dashboard</div>
          <h2 className="display-lg">
            <WordReveal text="Your learning," /> <WordReveal className="text-gradient" text="beautifully tracked." delay={0.15} />
          </h2>
          <p className="mt-5 text-muted text-lg">A live preview of the 3CAPSTECH student dashboard.</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40, rotateX: 8 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{ perspective: 1200 }}
          data-testid="lms-preview"
        >
          {/* Forced dark dashboard */}
          <div className="rounded-[28px] overflow-hidden border border-white/10 shadow-2xl" style={{ background: "#050A14", color: "#F4F7FF" }}>
            {/* window chrome */}
            <div className="flex items-center gap-2 px-5 py-4 border-b border-white/10">
              <span className="h-3 w-3 rounded-full bg-red-500/80" />
              <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
              <span className="h-3 w-3 rounded-full bg-green-500/80" />
              <div className="mx-auto text-xs text-white/40 font-mono">app.3capstech.com/dashboard</div>
            </div>

            <div className="grid lg:grid-cols-[220px_1fr] min-h-[560px]">
              {/* sidebar */}
              <aside className="hidden lg:flex flex-col gap-1 p-5 border-r border-white/10">
                <div className="font-display font-black text-lg mb-6">3CAPSTECH</div>
                {[
                  { i: LayoutDashboard, l: "Overview", active: true },
                  { i: PlayCircle, l: "My Courses" },
                  { i: ClipboardCheck, l: "Assignments" },
                  { i: Award, l: "Certificates" },
                  { i: CalendarDays, l: "Calendar" },
                  { i: Trophy, l: "Leaderboard" },
                ].map((m) => (
                  <div key={m.l} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm ${m.active ? "bg-[#4F8CFF]/15 text-[#8DB4FF]" : "text-white/50"}`}>
                    <m.i size={17} /> {m.l}
                  </div>
                ))}
              </aside>

              {/* main */}
              <div className="p-5 sm:p-7 space-y-5">
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div>
                    <div className="text-white/50 text-sm">Welcome back,</div>
                    <div className="font-display font-bold text-2xl">Aditya 👋</div>
                  </div>
                  <div className="flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-4 py-2 text-sm">
                    <Flame size={16} className="text-orange-400" /> 24-day streak
                  </div>
                </div>

                {/* stat cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { l: "Courses", v: "7", i: PlayCircle },
                    { l: "Certificates", v: "3", i: Award },
                    { l: "Hours", v: "128", i: TrendingUp },
                    { l: "Rank", v: "#2", i: Trophy },
                  ].map((s) => (
                    <div key={s.l} className="rounded-2xl bg-white/[0.04] border border-white/10 p-4">
                      <s.i size={18} className="text-[#8DB4FF] mb-3" />
                      <div className="font-display font-black text-2xl">{s.v}</div>
                      <div className="text-white/40 text-xs mt-0.5">{s.l}</div>
                    </div>
                  ))}
                </div>

                <div className="grid lg:grid-cols-[1.5fr_1fr] gap-5">
                  {/* continue learning */}
                  <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
                    <div className="font-display font-bold mb-4">Continue Learning</div>
                    <div className="space-y-4">
                      {CONTINUE.map((c) => (
                        <div key={c.title}>
                          <div className="flex justify-between text-sm mb-1.5">
                            <span className="font-medium">{c.title}</span>
                            <span className="text-white/40">{c.pct}%</span>
                          </div>
                          <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${c.pct}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 1, delay: 0.3 }}
                              className="h-full rounded-full bg-gradient-to-r from-[#4F8CFF] to-[#A78BFA]"
                            />
                          </div>
                          <div className="text-xs text-white/35 mt-1">{c.ch}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* analytics + leaderboard */}
                  <div className="space-y-5">
                    <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
                      <div className="font-display font-bold mb-4 text-sm">Weekly Activity</div>
                      <div className="flex items-end gap-2 h-24">
                        {BARS.map((b, i) => (
                          <motion.div
                            key={i}
                            initial={{ height: 0 }}
                            whileInView={{ height: `${b}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: i * 0.06 }}
                            className="flex-1 rounded-t-md bg-gradient-to-t from-[#4F8CFF]/40 to-[#4F8CFF]"
                          />
                        ))}
                      </div>
                    </div>
                    <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
                      <div className="font-display font-bold mb-3 text-sm">Leaderboard</div>
                      {LEADERS.map((l, i) => (
                        <div key={l.n} className={`flex items-center justify-between py-1.5 text-sm ${l.you ? "text-[#8DB4FF] font-semibold" : "text-white/60"}`}>
                          <span className="flex items-center gap-2">
                            <span className="w-4 text-white/30">{i + 1}</span> {l.n}
                          </span>
                          <span className="font-mono text-xs">{l.xp} XP</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* assignments row */}
                <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
                  <div className="font-display font-bold mb-3 text-sm">Upcoming Assignments</div>
                  <div className="grid sm:grid-cols-3 gap-3">
                    {["AI Model Project", "Responsive Portfolio", "Cloud Deployment"].map((a, i) => (
                      <div key={a} className="flex items-center gap-2 rounded-xl bg-white/[0.03] border border-white/10 px-3 py-2.5 text-sm">
                        <CheckCircle2 size={16} className={i === 0 ? "text-green-400" : "text-white/30"} />
                        <span className="truncate">{a}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
