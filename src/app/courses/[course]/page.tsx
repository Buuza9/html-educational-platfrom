import Link from "next/link";
import { notFound } from "next/navigation";
import { courses, getCourse } from "@/lib/content/courses";
import { getCompletedLessons, getExamResult } from "@/lib/progress";

export async function generateStaticParams() {
  return courses.map((c) => ({ course: c.slug }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ course: string }>;
}) {
  const { course } = await params;
  const data = getCourse(course);

  if (!data) {
    notFound();
  }

  const [completed, examResult] = await Promise.all([
    getCompletedLessons(course),
    getExamResult(course),
  ]);
  const completedSet = new Set(completed);

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-8 sm:gap-10">
      <header className="flex flex-col gap-4 border-b border-dashed border-line pb-6 sm:pb-8">
        <span className="inline-block w-fit rounded-full bg-[var(--accent-soft)] px-3.5 py-1.5 text-[0.78rem] font-semibold tracking-wide text-accent">
          دورة تعليمية
        </span>
        <h1 className="font-display text-2xl font-bold leading-[1.18] tracking-tight text-ink sm:text-3xl md:text-5xl">
          {data.title}
        </h1>
        <p className="max-w-2xl text-[0.95rem] leading-[1.85] text-ink-soft sm:text-[1.05rem]">
          {data.description}
        </p>
      </header>

      <ol className="flex flex-col gap-2.5">
        {data.lessons.map((lesson) => {
          const isDone = completedSet.has(lesson.slug);
          return (
            <li key={lesson.slug}>
              <Link
                href={`/courses/${course}/lessons/${lesson.slug}`}
                className="flex items-center gap-3 rounded-[var(--radius)] border border-line bg-surface px-4 py-3.5 no-underline transition-all duration-200 hover:-translate-y-[2px] hover:border-accent hover:shadow-[var(--shadow-md)] sm:gap-4 sm:px-5 sm:py-4"
              >
                <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[var(--accent-soft)] font-mono text-sm font-bold text-accent">
                  {lesson.number}
                </span>
                <span className="min-w-0 break-words text-[0.95rem] font-semibold text-ink sm:text-base">
                  {lesson.title}
                </span>
                {isDone ? (
                  <span
                    aria-label="مكتمل"
                    title="مكتمل"
                    className="ms-auto text-base font-semibold text-ok"
                  >
                    ✓
                  </span>
                ) : (
                  <span
                    aria-hidden="true"
                    className="ms-auto text-base text-ink-mute"
                  >
                    •
                  </span>
                )}
              </Link>
            </li>
          );
        })}
      </ol>

      <div className="flex flex-col gap-3">
        <Link
          href={`/courses/${course}/exam`}
          className="flex items-center justify-center rounded-[var(--radius)] border border-[var(--c-second)] bg-[linear-gradient(135deg,var(--c-main),var(--c-second))] px-5 py-3.5 text-[0.95rem] font-bold text-[var(--c-fourth)] no-underline shadow-[var(--shadow-sm)] sm:px-6 sm:py-4 sm:text-base transition-all duration-200 hover:-translate-y-[1px] hover:bg-[linear-gradient(135deg,var(--c-second),var(--c-main))] hover:shadow-[var(--shadow-md)]"
        >
          الامتحان الشامل
        </Link>
        {examResult && (
          <p className="text-center text-sm font-medium text-ink-mute">
            نتيجتك السابقة:{" "}
            <span className="font-mono font-semibold text-accent">
              {examResult.score}/{examResult.total}
            </span>
          </p>
        )}
      </div>
    </div>
  );
}
