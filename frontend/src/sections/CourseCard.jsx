import React, { useState } from "react";
import { Star, Clock, Users, Play } from "lucide-react";
import TiltCard from "../components/TiltCard";
import api from "../lib/api";

export default function CourseCard({ course, index = 0 }) {
  const [enrolled, setEnrolled] = useState(false);
  const [loading, setLoading] = useState(false);

  const enroll = async (e) => {
    e.stopPropagation();
    setLoading(true);
    try {
      await api.post("/api/enroll", { course_id: course.id, email: "learner@3capstech.com", name: "Guest Learner" });
      setEnrolled(true);
    } catch (err) {
      setEnrolled(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TiltCard max={7} className="h-full">
      <div
        className="group relative glass rounded-3xl overflow-hidden h-full flex flex-col hover:-translate-y-2 transition-transform duration-300"
        data-testid={`course-card-${course.id}`}
      >
        <div className="relative h-44 overflow-hidden">
          <img
            src={course.thumb}
            alt={course.title}
            loading="lazy"
            className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          <span className="absolute top-3 left-3 rounded-full bg-black/40 backdrop-blur-md text-white border border-white/20 px-3 py-1 label text-[9px]">
            {course.level}
          </span>
          {course.trending && (
            <span className="absolute top-3 right-3 rounded-full bg-accent text-white px-3 py-1 label text-[9px]">
              Trending
            </span>
          )}
          <button
            className="absolute inset-0 grid place-items-center opacity-0 group-hover:opacity-100 transition-opacity"
            data-testid={`course-preview-${course.id}`}
            aria-label="Preview"
          >
            <span className="h-14 w-14 rounded-full bg-white/90 text-black grid place-items-center shadow-xl">
              <Play size={20} className="ml-1" />
            </span>
          </button>
        </div>

        <div className="p-5 flex flex-col flex-1">
          <div className="label text-accent text-[9px] mb-2">{course.category}</div>
          <h3 className="font-display font-bold text-lg leading-snug">{course.title}</h3>
          <div className="text-sm text-muted mt-1">by {course.instructor}</div>

          <div className="flex items-center gap-4 mt-4 text-xs text-muted">
            <span className="inline-flex items-center gap-1 text-ink font-medium">
              <Star size={13} className="fill-accent text-accent" /> {course.rating}
            </span>
            <span className="inline-flex items-center gap-1">
              <Users size={13} /> {(course.students / 1000).toFixed(1)}k
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock size={13} /> {course.duration}
            </span>
          </div>

          <div className="mt-auto pt-5 flex items-center justify-between">
            <div className="font-display font-black text-xl">{course.price}</div>
            <button
              onClick={enroll}
              disabled={loading || enrolled}
              data-testid={`course-enroll-${course.id}`}
              className={`rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
                enrolled ? "bg-accent/15 text-accent" : "bg-[var(--text-primary)] text-[var(--bg)] hover:opacity-90"
              }`}
            >
              {enrolled ? "Enrolled ✓" : loading ? "..." : "Enroll"}
            </button>
          </div>
        </div>
      </div>
    </TiltCard>
  );
}
