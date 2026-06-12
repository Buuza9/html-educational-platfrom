import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import TopBar from "@/components/TopBar";
import CourseSidebar from "@/components/CourseSidebar";
import MobileCourseNav from "@/components/MobileCourseNav";
import { getCourse } from "@/lib/content/courses";

export default async function CourseLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ course: string }>;
}) {
  const { course } = await params;
  if (!getCourse(course)) notFound();

  return (
    <div className="min-h-screen bg-bg font-body text-ink">
      <TopBar />
      <div className="mx-auto flex max-w-[1400px] gap-0">
        <aside className="hidden w-[290px] shrink-0 border-s border-line lg:block">
          <div className="sticky top-[71px] max-h-[calc(100vh-71px)] overflow-y-auto px-5 pb-6 pt-8">
            <CourseSidebar courseSlug={course} />
          </div>
        </aside>
        <main className="min-w-0 flex-1 px-4 pb-20 pt-6 sm:px-6 lg:px-12 lg:pt-10">
          <div className="mb-6 lg:hidden">
            <MobileCourseNav>
              <CourseSidebar courseSlug={course} />
            </MobileCourseNav>
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}
