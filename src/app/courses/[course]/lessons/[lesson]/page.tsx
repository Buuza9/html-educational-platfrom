import Link from "next/link";
import { notFound } from "next/navigation";
import { courses, getCourse, getLesson } from "@/lib/content/courses";
import { Tips } from "@/components/lesson-content";
import Editor from "@/components/Editor";
import LessonQuiz from "@/components/LessonQuiz";
import LessonCompleteButton from "@/components/LessonCompleteButton";
import { getCompletedLessons } from "@/lib/progress";

export function generateStaticParams() {
  return courses.flatMap((c) =>
    c.lessons.map((l) => ({ course: c.slug, lesson: l.slug })),
  );
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ course: string; lesson: string }>;
}) {
  const { course: courseSlug, lesson: lessonSlug } = await params;

  const course = getCourse(courseSlug);
  const lesson = getLesson(courseSlug, lessonSlug);
  if (!course || !lesson) notFound();

  const index = course.lessons.findIndex((l) => l.slug === lesson.slug);
  const prev = index > 0 ? course.lessons[index - 1] : undefined;
  const next =
    index < course.lessons.length - 1 ? course.lessons[index + 1] : undefined;

  const completed = await getCompletedLessons(course.slug);
  const initialCompleted = completed.includes(lesson.slug);

  return (
    <section className="lesson">
      <header className="lesson-head">
        <div className="lesson-num">الدرس {lesson.number}</div>
        <h2>{lesson.title}</h2>
        <p className="lesson-lead">{lesson.lead}</p>
      </header>

      <lesson.Body />

      {lesson.editor && (
        <Editor
          title={lesson.editor.title}
          defaultCode={lesson.editor.defaultCode}
        />
      )}

      {lesson.tips && <Tips items={lesson.tips} />}

      <LessonQuiz courseSlug={course.slug} lessonSlug={lesson.slug} />

      <div className="mt-8">
        <LessonCompleteButton
          courseSlug={course.slug}
          lessonSlug={lesson.slug}
          initialCompleted={initialCompleted}
        />
      </div>

      <nav className="lesson-nav mt-6 flex flex-col gap-4 border-t border-ink-mute/20 pt-6 sm:flex-row sm:items-start sm:justify-between">
        {prev ? (
          <Link
            href={`/courses/${course.slug}/lessons/${prev.slug}`}
            className="lesson-nav-link prev flex min-w-0 flex-col items-start text-start"
          >
            <span className="lesson-nav-label text-xs text-ink-mute">الدرس السابق</span>
            <span className="lesson-nav-title font-medium break-words">→ {prev.title}</span>
          </Link>
        ) : (
          <span />
        )}

        {next ? (
          <Link
            href={`/courses/${course.slug}/lessons/${next.slug}`}
            className="lesson-nav-link next flex min-w-0 flex-col items-start text-start sm:items-end sm:text-end"
          >
            <span className="lesson-nav-label text-xs text-ink-mute">الدرس التالي</span>
            <span className="lesson-nav-title font-medium break-words">{next.title} ←</span>
          </Link>
        ) : (
          <Link
            href={`/courses/${course.slug}/exam`}
            className="lesson-nav-link next flex min-w-0 flex-col items-start text-start sm:items-end sm:text-end"
          >
            <span className="lesson-nav-label text-xs text-ink-mute">الخطوة التالية</span>
            <span className="lesson-nav-title font-medium break-words">الامتحان النهائي ←</span>
          </Link>
        )}
      </nav>
    </section>
  );
}
