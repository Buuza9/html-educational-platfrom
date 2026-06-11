"use client";

import { getCourse } from "@/lib/content/courses";
import Exam from "@/components/Exam";

/**
 * Client wrapper: looks up the course's exam from the registry on the client,
 * so the exam's check() functions never have to cross the server→client
 * boundary as props.
 */
export default function CourseExam({ courseSlug }: { courseSlug: string }) {
  const course = getCourse(courseSlug);
  if (!course) return null;
  return <Exam data={course.exam} courseSlug={courseSlug} />;
}
