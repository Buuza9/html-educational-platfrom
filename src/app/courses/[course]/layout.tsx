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
    <>
      <TopBar />
      <div className="layout">
        <CourseSidebar courseSlug={course} className="hidden lg:flex" />
        <main className="content">
          <div className="mb-6 lg:hidden">
            <MobileCourseNav>
              <CourseSidebar courseSlug={course} />
            </MobileCourseNav>
          </div>
          {children}
        </main>
      </div>
    </>
  );
}
