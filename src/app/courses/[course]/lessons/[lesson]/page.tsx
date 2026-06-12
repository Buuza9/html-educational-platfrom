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

      <LessonCompleteButton
        courseSlug={course.slug}
        lessonSlug={lesson.slug}
        initialCompleted={initialCompleted}
      />

      <nav className="lesson-nav">
        {prev ? (
          <Link
            href={`/courses/${course.slug}/lessons/${prev.slug}`}
            className="lesson-nav-link prev"
          >
            <span className="lesson-nav-label">الدرس السابق</span>
            <span className="lesson-nav-title">→ {prev.title}</span>
          </Link>
        ) : (
          <span />
        )}

        {next ? (
          <Link
            href={`/courses/${course.slug}/lessons/${next.slug}`}
            className="lesson-nav-link next"
          >
            <span className="lesson-nav-label">الدرس التالي</span>
            <span className="lesson-nav-title">{next.title} ←</span>
          </Link>
        ) : (
          <Link
            href={`/courses/${course.slug}/exam`}
            className="lesson-nav-link next"
          >
            <span className="lesson-nav-label">الخطوة التالية</span>
            <span className="lesson-nav-title">الامتحان النهائي ←</span>
          </Link>
        )}
      </nav>
    </section>
  );
}
