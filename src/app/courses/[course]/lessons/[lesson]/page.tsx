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
    <article className="mx-auto w-full max-w-3xl py-2">
      <header className="relative mb-8 border-b-2 border-line pb-6 after:absolute after:-bottom-0.5 after:end-0 after:h-0.5 after:w-20 after:bg-accent after:content-['']">
        <p className="mb-2.5 font-mono text-[0.78rem] font-semibold uppercase tracking-[0.15em] text-accent">
          الدرس {lesson.number}
        </p>
        <h1 className="mb-2 font-display text-[clamp(1.8rem,3vw,2.4rem)] font-bold leading-[1.2] tracking-tight text-ink">
          {lesson.title}
        </h1>
        <p className="text-[1.02rem] leading-[1.8] text-ink-soft">{lesson.lead}</p>
      </header>

      <div className="mt-8">
        <lesson.Body />
      </div>

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

      <nav className="mt-12 flex items-center justify-between gap-4 border-t border-line pt-6">
        {prev ? (
          <Link
            href={`/courses/${course.slug}/lessons/${prev.slug}`}
            className="group flex flex-col items-start text-start"
          >
            <span className="text-xs text-ink-mute">الدرس السابق</span>
            <span className="font-medium text-ink transition group-hover:text-accent">
              → {prev.title}
            </span>
          </Link>
        ) : (
          <span />
        )}

        {next ? (
          <Link
            href={`/courses/${course.slug}/lessons/${next.slug}`}
            className="group flex flex-col items-end text-end"
          >
            <span className="text-xs text-ink-mute">الدرس التالي</span>
            <span className="font-medium text-ink transition group-hover:text-accent">
              {next.title} ←
            </span>
          </Link>
        ) : (
          <Link
            href={`/courses/${course.slug}/exam`}
            className="group flex flex-col items-end text-end"
          >
            <span className="text-xs text-ink-mute">الخطوة التالية</span>
            <span className="font-medium text-accent transition group-hover:opacity-80">
              الامتحان النهائي ←
            </span>
          </Link>
        )}
      </nav>
    </article>
  );
}
