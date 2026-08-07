import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Hero from "../sections/Hero";
import About from "../sections/About";
import Services from "../sections/Services";
import TechOrbit from "../sections/TechOrbit";
import WhyChooseUs from "../sections/WhyChooseUs";
import Testimonials from "../sections/Testimonials";
import Internships from "../sections/Internships";
import Contact from "../sections/Contact";
import CourseCard from "../sections/CourseCard";
import { WordReveal } from "../components/Reveal";
import MagneticButton from "../components/MagneticButton";
import { COURSES } from "../lib/data";

function LearningTeaser() {
  const navigate = useNavigate();
  const featured = COURSES.filter((c) => c.trending).slice(0, 4);
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      <div className="blob w-[480px] h-[480px] top-0 right-[-160px]" style={{ background: "var(--accent2)", opacity: 0.22 }} />
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <div className="label text-accent mb-5">// Learning Platform</div>
            <h2 className="display-lg max-w-xl">
              <WordReveal text="Not just a company." /><br />
              <WordReveal className="text-gradient" text="A university." delay={0.15} />
            </h2>
          </div>
          <MagneticButton
            onClick={() => navigate("/learning")}
            data-testid="home-explore-learning"
            className="group inline-flex items-center gap-2 rounded-full bg-[var(--text-primary)] text-[var(--bg)] px-7 py-3.5 font-medium shrink-0"
          >
            Explore the Learning Hub
            <ArrowRight size={17} className="group-hover:translate-x-1 transition-transform" />
          </MagneticButton>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featured.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.06 }}
            >
              <CourseCard course={c} index={i} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <TechOrbit />
      <LearningTeaser />
      <WhyChooseUs />
      <Internships />
      <Testimonials />
      <Contact />
    </>
  );
}
