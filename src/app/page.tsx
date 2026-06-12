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
    <>
      <TopBar />

      <main className="content mx-auto max-w-[1100px]">
        <section className="hero">
          <div className="hero-tag">دليل عربي شامل</div>
          <h2 className="hero-title">
            تعلّم تطوير <span className="accent">الويب</span> من الصفر
          </h2>
          <p className="hero-sub">
            دروس عربية مبسّطة وتمارين تفاعلية تأخذك من أساسيات HTML إلى تنسيق
            الصفحات باستخدام CSS خطوة بخطوة.
          </p>

          <div className="hero-stats">
            {[
              { value: `${courseCount}`, label: "مساقات" },
              { value: `${lessonCount}`, label: "درساً" },
              { value: "100%", label: "مجاني" },
              { value: "تفاعلي", label: "محرر مباشر" },
            ].map((s) => (
              <div key={s.label} className="stat">
                <strong>{s.value}</strong>
                <span>{s.label}</span>
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
    </>
  );
}
