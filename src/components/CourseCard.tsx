import Link from "next/link";
import type { Course } from "@/lib/content/types";

export default function CourseCard({
  course,
  completedCount,
}: {
  course: Course;
  completedCount?: number;
}) {
  const total = course.lessons.length;
  const completed = completedCount ?? 0;
  const showProgress = completed > 0;
  const percent = total > 0 ? Math.min(100, (completed / total) * 100) : 0;

  return (
    <Link
      href={`/courses/${course.slug}`}
      className="group flex flex-col rounded-[var(--radius)] border border-[var(--line)] bg-[var(--bg-alt)] p-6 text-start text-[var(--ink)] no-underline shadow-[var(--shadow-sm)] transition-[transform,border-color,box-shadow] duration-200 hover:-translate-y-[3px] hover:border-[var(--accent)] hover:no-underline hover:shadow-[var(--shadow-md)]"
    >
      <span className="text-5xl leading-none" aria-hidden>
        {course.icon}
      </span>
      <h3 className="mt-4 font-display text-xl font-bold text-[var(--ink)]">
        {course.title}
      </h3>
      <p className="mt-2 text-[var(--ink-mute)]">{course.description}</p>
      <p className="mt-auto pt-4 text-sm text-[var(--ink-mute)]">
        {`${total} دروس + امتحان`}
      </p>
      {showProgress && (
        <div className="mt-3">
          <div
            className="h-1.5 w-full overflow-hidden rounded-full bg-[var(--bg-soft)]"
            role="progressbar"
            aria-valuenow={completed}
            aria-valuemin={0}
            aria-valuemax={total}
          >
            <div
              className="h-full rounded-full bg-gradient-to-l from-[var(--accent)] to-[var(--accent-2)] transition-[width] duration-300"
              style={{ width: `${percent}%` }}
            />
          </div>
          <p className="mt-1.5 text-xs font-medium text-[var(--ok)]">
            {`${completed}/${total} دروس مكتملة`}
          </p>
        </div>
      )}
    </Link>
  );
}
