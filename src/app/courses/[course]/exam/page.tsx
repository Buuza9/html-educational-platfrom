import { notFound } from "next/navigation";
import { courses, getCourse } from "@/lib/content/courses";
import CourseExam from "@/components/CourseExam";

export function generateStaticParams() {
  return courses.map((c) => ({ course: c.slug }));
}

export default async function ExamPage({
  params,
}: {
  params: Promise<{ course: string }>;
}) {
  const { course } = await params;
  const data = getCourse(course);
  if (!data) notFound();

  const mcqCount = data.exam.mcq.length;
  const codingCount = data.exam.coding.length;
  const total = mcqCount + codingCount;

  return (
    <div className="mx-auto w-full max-w-4xl">
      <header className="relative mb-6 overflow-hidden rounded-[var(--radius-lg)] bg-[linear-gradient(135deg,var(--c-main)_0%,var(--c-second)_100%)] px-4 py-7 sm:mb-8 sm:px-8 sm:py-10">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-[40%] end-[-10%] h-[360px] w-[360px] bg-[radial-gradient(circle,rgba(182,187,196,0.18),transparent_65%)]"
        />
        <div className="relative">
          <span className="mb-4 inline-block rounded-full bg-[rgba(240,236,229,0.16)] px-3.5 py-[5px] text-[0.76rem] font-bold uppercase tracking-[0.12em] text-[var(--c-fourth)]">
            الامتحان الشامل
          </span>
          <h1 className="mb-2.5 font-display text-2xl font-bold tracking-tight text-[var(--c-fourth)] sm:text-3xl">
            الامتحان الشامل في {data.title}
          </h1>
          <p className="max-w-2xl text-[0.95rem] leading-[1.85] text-[var(--c-third)] sm:text-base">
            هذا الامتحان يجمع كل ما تعلمته في هذه الدورة. أجب عن الأسئلة بتركيز،
            فلكل سؤال نتيجة تُحتسب في درجتك النهائية. خذ وقتك، وبعد الانتهاء اضغط
            «إنهاء وعرض النتيجة» لتقييم مستواك.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="flex items-center gap-2 rounded-[10px] border border-[rgba(240,236,229,0.18)] bg-[rgba(240,236,229,0.10)] px-3 py-2 sm:px-4 sm:py-2.5 text-[0.85rem] font-semibold text-[var(--c-fourth)]">
              <strong className="font-mono">{total}</strong> سؤال
            </span>
            <span className="flex items-center gap-2 rounded-[10px] border border-[rgba(240,236,229,0.18)] bg-[rgba(240,236,229,0.10)] px-3 py-2 sm:px-4 sm:py-2.5 text-[0.85rem] font-semibold text-[var(--c-fourth)]">
              <strong className="font-mono">{mcqCount}</strong> اختيار من متعدد
            </span>
            <span className="flex items-center gap-2 rounded-[10px] border border-[rgba(240,236,229,0.18)] bg-[rgba(240,236,229,0.10)] px-3 py-2 sm:px-4 sm:py-2.5 text-[0.85rem] font-semibold text-[var(--c-fourth)]">
              <strong className="font-mono">{codingCount}</strong> سؤال برمجي
            </span>
          </div>
        </div>
      </header>

      <CourseExam courseSlug={data.slug} />
    </div>
  );
}
