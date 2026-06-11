import Link from "next/link";
import { getCourse } from "@/lib/content/courses";
import { getCompletedLessons } from "@/lib/progress";
import SidebarLink from "@/components/SidebarLink";

/**
 * In-course navigation: course title, numbered lesson list (with a ✓ for
 * completed lessons), a link to the comprehensive exam, and a link back to the
 * full course list. Server component — no active-link highlight.
 */
export default async function CourseSidebar({
  courseSlug,
}: {
  courseSlug: string;
}) {
  const course = getCourse(courseSlug);
  if (!course) return null;

  const completed = await getCompletedLessons(courseSlug);
  const completedSet = new Set(completed);

  return (
    <nav className="flex flex-col gap-5">
      <div className="flex items-center justify-between px-2">
        <span className="text-[0.72rem] font-bold uppercase tracking-[0.12em] text-ink-mute">
          المحتوى
        </span>
        <span className="rounded-full bg-[var(--accent-soft)] px-2.5 py-[3px] text-[0.72rem] font-semibold text-accent">
          {course.lessons.length} درساً + امتحان
        </span>
      </div>

      <ol className="flex flex-col gap-0.5">
        {course.lessons.map((lesson) => {
          const isDone = completedSet.has(lesson.slug);
          return (
            <li key={lesson.slug}>
              <SidebarLink
                href={`/courses/${courseSlug}/lessons/${lesson.slug}`}
                number={lesson.number}
                title={lesson.title}
                isDone={isDone}
              />
            </li>
          );
        })}

        <li>
          <Link
            href={`/courses/${courseSlug}/exam`}
            className="mt-2.5 flex items-center gap-3 rounded-[10px] border border-[var(--c-second)] bg-[linear-gradient(135deg,var(--c-main),var(--c-second))] px-3.5 py-2.5 text-[0.92rem] font-bold text-white no-underline shadow-[var(--shadow-sm)] transition-all duration-150 hover:bg-[linear-gradient(135deg,var(--c-second),var(--c-main))] hover:text-white"
          >
            <span className="min-w-[22px] shrink-0 font-mono text-[0.9rem] font-semibold text-white/70">
              ★
            </span>
            <span className="flex-1">الامتحان الشامل</span>
          </Link>
        </li>
      </ol>

      <div className="border-t border-line pt-3">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-[10px] px-3.5 py-2.5 text-[0.92rem] font-medium text-ink-mute no-underline transition-all duration-150 hover:bg-surface hover:text-ink"
        >
          <span>كل الدورات</span>
          <span aria-hidden="true">&larr;</span>
        </Link>
      </div>
    </nav>
  );
}
