"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { courses } from "@/lib/content/courses";

interface IndexEntry {
  courseSlug: string;
  courseTitle: string;
  lessonSlug: string;
  number: number;
  title: string;
  href: string;
}

/** Flat index of every lesson across all courses, built once at module load. */
const INDEX: IndexEntry[] = courses.flatMap((course) =>
  course.lessons.map((lesson) => ({
    courseSlug: course.slug,
    courseTitle: course.title,
    lessonSlug: lesson.slug,
    number: lesson.number,
    title: lesson.title,
    href: `/courses/${course.slug}/lessons/${lesson.slug}`,
  })),
);

/**
 * Client-side search box that filters lessons across all courses by lesson
 * title or course title. Shows a dropdown of matching <Link>s.
 */
export default function LessonSearch() {
  const [query, setQuery] = useState("");

  const trimmed = query.trim().toLowerCase();

  const results = useMemo(() => {
    if (!trimmed) return [];
    return INDEX.filter(
      (e) =>
        e.title.toLowerCase().includes(trimmed) ||
        e.courseTitle.toLowerCase().includes(trimmed),
    );
  }, [trimmed]);

  const open = trimmed.length > 0;

  return (
    <div className="relative mx-auto mt-8 w-full max-w-xl text-start">
      <div className="relative">
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 start-3 flex items-center text-ink-mute"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </span>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Escape") setQuery("");
          }}
          placeholder="ابحث في كل الدروس..."
          className="w-full rounded-full border border-line bg-surface py-3 ps-10 pe-4 text-[0.95rem] text-ink transition-[border-color,box-shadow] placeholder:text-ink-mute focus:border-accent focus:shadow-[0_0_0_4px_var(--accent-soft)] focus:outline-none"
        />
      </div>

      {open && (
        <div className="absolute inset-x-0 top-full z-20 mt-2 max-h-80 overflow-y-auto rounded-xl border border-line bg-surface shadow-lg">
          {results.length === 0 ? (
            <p className="px-4 py-3 text-sm text-ink-mute">لا نتائج</p>
          ) : (
            <ul>
              {results.map((e) => (
                <li key={e.href}>
                  <Link
                    href={e.href}
                    onClick={() => setQuery("")}
                    className="flex flex-col gap-0.5 border-b border-line px-4 py-3 no-underline last:border-b-0 hover:bg-soft hover:no-underline"
                  >
                    <span className="text-xs text-ink-mute">
                      {e.courseTitle}
                    </span>
                    <span className="text-sm text-ink">{e.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
