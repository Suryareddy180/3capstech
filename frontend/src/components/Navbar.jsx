import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { NAV } from "../lib/data";
import { useTheme } from "../context/ThemeContext";
import MagneticButton from "./MagneticButton";

function Logo({ testId = "brand-logo" }) {
  return (
    <img
      src="/logo.png"
      alt="3CapsTech — We Design Future Technology"
      data-testid={testId}
      className="h-8 sm:h-9 w-auto object-contain dark:[filter:drop-shadow(0_0_1px_rgba(255,255,255,0.9))_drop-shadow(0_0_10px_rgba(255,255,255,0.25))]"
    />
  );
}

function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      data-testid="theme-toggle"
      aria-label="Toggle theme"
      className="relative h-10 w-10 grid place-items-center rounded-full glass hover:text-accent transition-colors"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.3 }}
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (to) => {
    setOpen(false);
    if (to.startsWith("/#")) {
      const id = to.slice(2);
      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 350);
      } else {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate(to);
      window.scrollTo({ top: 0 });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-[900] transition-all duration-500 ${
          scrolled ? "py-3" : "py-5"
        }`}
      >
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
          <div
            className={`flex items-center justify-between rounded-2xl px-4 sm:px-5 h-16 transition-all duration-500 ${
              scrolled ? "glass" : "bg-transparent"
            }`}
          >
            <button onClick={() => go("/")} data-testid="nav-home-logo" className="cursor-pointer">
              <Logo />
            </button>

            <nav className="hidden lg:flex items-center gap-1">
              {NAV.map((n) => (
                <button
                  key={n.label}
                  onClick={() => go(n.to)}
                  data-testid={`nav-link-${n.label.toLowerCase()}`}
                  className="relative px-4 py-2 text-sm text-muted hover:text-ink transition-colors rounded-full hover:bg-[var(--border)]"
                >
                  {n.label}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-2.5">
              <ThemeToggle />
              <MagneticButton
                onClick={() => go("/#contact")}
                data-testid="nav-cta-consult"
                className="hidden sm:inline-flex items-center rounded-full bg-[var(--text-primary)] text-[var(--bg)] px-5 py-2.5 text-sm font-medium"
              >
                Book Consultation
              </MagneticButton>
              <button
                className="lg:hidden h-10 w-10 grid place-items-center rounded-full glass"
                onClick={() => setOpen(true)}
                data-testid="nav-mobile-open"
                aria-label="Open menu"
              >
                <Menu size={18} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[1000] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-[var(--bg)]/80 backdrop-blur-xl" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 28 }}
              className="absolute right-0 top-0 h-full w-[82%] max-w-sm glass p-6 flex flex-col"
              data-testid="nav-mobile-panel"
            >
              <div className="flex items-center justify-between mb-10">
                <Logo testId="brand-logo-mobile" />
                <button onClick={() => setOpen(false)} data-testid="nav-mobile-close" className="h-10 w-10 grid place-items-center rounded-full glass">
                  <X size={18} />
                </button>
              </div>
              <nav className="flex flex-col gap-1">
                {NAV.map((n, i) => (
                  <motion.button
                    key={n.label}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.06 }}
                    onClick={() => go(n.to)}
                    data-testid={`nav-mobile-link-${n.label.toLowerCase()}`}
                    className="text-left display-md py-3 border-b border-line"
                  >
                    {n.label}
                  </motion.button>
                ))}
              </nav>
              <button
                onClick={() => go("/#contact")}
                className="mt-auto rounded-full bg-[var(--text-primary)] text-[var(--bg)] px-6 py-4 font-medium text-center"
              >
                Book Consultation
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
