import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Github, Linkedin, Twitter, Instagram, ArrowUpRight, Send } from "lucide-react";
import { NAV, WHATSAPP } from "../lib/data";
import ParticleField from "./ParticleField";
import axiosLess from "../lib/api";

const COLS = [
  {
    title: "Company",
    links: [
      { label: "About", to: "/#about" },
      { label: "Services", to: "/#services" },
      { label: "Why Us", to: "/#why" },
      { label: "Contact", to: "/#contact" },
    ],
  },
  {
    title: "Learning",
    links: [
      { label: "All Courses", to: "/learning" },
      { label: "Career Tracks", to: "/learning" },
      { label: "Internships", to: "/#internships" },
      { label: "LMS Preview", to: "/learning" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "AI Solutions", to: "/#services" },
      { label: "Cloud", to: "/#services" },
      { label: "Web & Mobile", to: "/#services" },
      { label: "Design", to: "/#services" },
    ],
  },
];

export default function Footer() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const go = (to) => {
    if (to.startsWith("/#")) {
      const id = to.slice(2);
      navigate("/");
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 300);
    } else {
      navigate(to);
      window.scrollTo({ top: 0 });
    }
  };

  const subscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setMsg("");
    try {
      const r = await axiosLess.post("/api/newsletter", { email });
      setMsg(r.message || "Subscribed!");
      setEmail("");
    } catch (err) {
      setMsg("Please enter a valid email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="relative overflow-hidden border-t border-line mt-20">
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <ParticleField density={40} />
      </div>
      <div className="blob w-[400px] h-[400px] -bottom-40 -left-20" style={{ background: "var(--accent)" }} />

      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <img
              src="/logo.png"
              alt="3CapsTech — We Design Future Technology"
              className="h-10 w-auto object-contain dark:[filter:drop-shadow(0_0_1px_rgba(255,255,255,0.9))_drop-shadow(0_0_10px_rgba(255,255,255,0.25))]"
            />
            <p className="mt-4 text-muted max-w-xs leading-relaxed">
              Engineering intelligent software while empowering the next generation of technology professionals.
            </p>
            <form onSubmit={subscribe} className="mt-6 max-w-sm" data-testid="newsletter-form">
              <div className="label text-muted mb-2">Join the newsletter</div>
              <div className="flex items-center glass rounded-full p-1.5 pl-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  data-testid="newsletter-email"
                  className="flex-1 bg-transparent outline-none text-sm text-ink placeholder:text-muted min-w-0"
                />
                <button
                  type="submit"
                  disabled={loading}
                  data-testid="newsletter-submit"
                  className="h-9 w-9 grid place-items-center rounded-full bg-[var(--text-primary)] text-[var(--bg)] shrink-0 disabled:opacity-60"
                  aria-label="Subscribe"
                >
                  <Send size={15} />
                </button>
              </div>
              {msg && <div className="mt-2 text-xs text-accent" data-testid="newsletter-msg">{msg}</div>}
            </form>
          </div>

          {COLS.map((col) => (
            <div key={col.title}>
              <div className="label text-muted mb-4">{col.title}</div>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <button
                      onClick={() => go(l.to)}
                      className="group inline-flex items-center gap-1 text-sm text-muted hover:text-ink transition-colors"
                    >
                      {l.label}
                      <ArrowUpRight size={13} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 pt-8 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-xs text-muted">© {new Date().getFullYear()} 3CAPSTECH Software Private Limited. All rights reserved.</div>
          <div className="flex items-center gap-3">
            {[Github, Linkedin, Twitter, Instagram].map((Icon, i) => (
              <a
                key={i}
                href={i === 3 ? WHATSAPP : "#"}
                target="_blank"
                rel="noreferrer"
                className="h-10 w-10 grid place-items-center rounded-full glass hover:text-accent hover:-translate-y-0.5 transition-all"
                aria-label="social"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
