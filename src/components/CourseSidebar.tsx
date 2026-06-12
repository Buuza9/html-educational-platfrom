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
  className,
}: {
  courseSlug: string;
  className?: string;
}) {
  const course = getCourse(courseSlug);
  if (!course) return null;

  const completed = await getCompletedLessons(courseSlug);
  const completedSet = new Set(completed);

  return (
    <aside className={className ? `sidebar ${className}` : "sidebar"}>
      <div className="sidebar-head">
        <span className="sidebar-label">المحتوى</span>
        <span className="sidebar-count">
          {course.lessons.length} درساً + امتحان
        </span>
      </div>

      <nav className="sidebar-nav">
        {course.lessons.map((lesson) => (
          <SidebarLink
            key={lesson.slug}
            href={`/courses/${courseSlug}/lessons/${lesson.slug}`}
            number={lesson.number}
            title={lesson.title}
            isDone={completedSet.has(lesson.slug)}
          />
        ))}

        <Link href={`/courses/${courseSlug}/exam`} className="nav-link nav-exam">
          <span className="nav-num">★</span>
          <span>الامتحان الشامل</span>
        </Link>

        <Link href="/" className="nav-link">
          <span>كل الدورات</span>
          <span aria-hidden="true">&larr;</span>
        </Link>
      </nav>
    </aside>
  );
}
