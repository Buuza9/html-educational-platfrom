import { courses } from "@/lib/content/courses";
import CourseCard from "@/components/CourseCard";
import TopBar from "@/components/TopBar";
import LessonSearch from "@/components/LessonSearch";
import { getCompletedCountByCourse } from "@/lib/progress";

export default async function Home() {
  const counts = await getCompletedCountByCourse();

  const courseCount = courses.length;
  const lessonCount = courses.reduce((n, c) => n + c.lessons.length, 0);

  return (
    <div className="min-h-screen bg-bg text-ink">
      <TopBar />

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
        <section className="mb-8 border-b border-dashed border-line pb-8 text-start sm:mb-12 sm:pb-12">
          <span className="mb-5 inline-block rounded-full bg-[var(--accent-soft)] px-[14px] py-1.5 text-[0.78rem] font-semibold tracking-[0.04em] text-accent">
            دليل عربي شامل
          </span>
          <h1 className="mb-4 font-display text-2xl font-bold leading-[1.18] tracking-[-0.015em] text-ink sm:text-3xl md:text-5xl">
            تعلّم تطوير{" "}
            <span className="relative inline-block text-accent after:absolute after:bottom-[0.05em] after:-start-[2%] after:-z-10 after:h-[0.18em] after:w-[104%] after:rounded after:bg-[var(--accent-warm)] after:content-['']">
              الويب
            </span>{" "}
            من الصفر
          </h1>
          <p className="max-w-[680px] text-[0.95rem] leading-[1.85] text-ink-soft sm:text-[1.05rem]">
            دروس عربية مبسّطة وتمارين تفاعلية تأخذك من أساسيات HTML إلى تنسيق
            الصفحات باستخدام CSS خطوة بخطوة.
          </p>

          <div className="mt-8 grid w-full max-w-[640px] grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {[
              { value: `${courseCount}`, label: "مساقات" },
              { value: `${lessonCount}`, label: "درساً" },
              { value: "100%", label: "مجاني" },
              { value: "تفاعلي", label: "محرر مباشر" },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-[var(--radius)] border border-line bg-surface p-[1.1rem_1rem] text-center transition-transform hover:-translate-y-0.5 hover:border-accent"
              >
                <strong className="block font-display text-[1.4rem] font-bold leading-none text-accent sm:text-[1.7rem]">
                  {s.value}
                </strong>
                <span className="mt-1.5 inline-block text-[0.82rem] text-ink-mute">
                  {s.label}
                </span>
              </div>
            ))}
          </div>

          <LessonSearch />
        </section>

        <section>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((c) => (
              <CourseCard
                key={c.slug}
                course={c}
                completedCount={counts[c.slug] ?? 0}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
