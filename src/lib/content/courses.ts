import type { Course } from "./types";
import { htmlCourse } from "./html";
import { cssCourse } from "./css";

export const courses: Course[] = [htmlCourse, cssCourse];

export function getCourse(slug: string): Course | undefined {
  return courses.find((c) => c.slug === slug);
}

export function getLesson(courseSlug: string, lessonSlug: string) {
  const c = getCourse(courseSlug);
  return c?.lessons.find((l) => l.slug === lessonSlug);
}
