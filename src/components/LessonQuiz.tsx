"use client";

import { getLesson } from "@/lib/content/courses";
import Quiz from "@/components/Quiz";

/**
 * Client wrapper: looks up the lesson's quiz from the registry on the client,
 * so the quiz's check() functions never have to cross the server→client
 * boundary as props.
 */
export default function LessonQuiz({
  courseSlug,
  lessonSlug,
}: {
  courseSlug: string;
  lessonSlug: string;
}) {
  const lesson = getLesson(courseSlug, lessonSlug);
  if (!lesson) return null;
  return <Quiz data={lesson.quiz} />;
}
