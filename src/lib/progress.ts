"use server";

import { revalidatePath } from "next/cache";
import { and, eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";
import { getDb, isDbConfigured } from "@/db";
import { examResult, lessonProgress } from "@/db/schema";

/** Returns the signed-in user's id, or null when signed out / DB not set up. */
async function currentUserId(): Promise<string | null> {
  if (!isDbConfigured()) return null;
  const { userId } = await auth();
  return userId ?? null;
}

/** Mark a lesson complete for the current user (idempotent upsert). */
export async function markLessonComplete(
  courseSlug: string,
  lessonSlug: string,
): Promise<{ ok: boolean }> {
  const userId = await currentUserId();
  if (!userId) return { ok: false };

  await getDb()
    .insert(lessonProgress)
    .values({ userId, courseSlug, lessonSlug, completed: true })
    .onConflictDoUpdate({
      target: [
        lessonProgress.userId,
        lessonProgress.courseSlug,
        lessonProgress.lessonSlug,
      ],
      set: { completed: true, updatedAt: new Date() },
    });

  revalidatePath(`/courses/${courseSlug}`);
  revalidatePath(`/courses/${courseSlug}/lessons/${lessonSlug}`);
  revalidatePath("/");
  return { ok: true };
}

/** Slugs of lessons the current user has completed in a course. */
export async function getCompletedLessons(
  courseSlug: string,
): Promise<string[]> {
  const userId = await currentUserId();
  if (!userId) return [];

  const rows = await getDb()
    .select({ lessonSlug: lessonProgress.lessonSlug })
    .from(lessonProgress)
    .where(
      and(
        eq(lessonProgress.userId, userId),
        eq(lessonProgress.courseSlug, courseSlug),
        eq(lessonProgress.completed, true),
      ),
    );
  return rows.map((r) => r.lessonSlug);
}

/** Count of completed lessons per course for the current user. */
export async function getCompletedCountByCourse(): Promise<
  Record<string, number>
> {
  const userId = await currentUserId();
  if (!userId) return {};

  const rows = await getDb()
    .select({ courseSlug: lessonProgress.courseSlug })
    .from(lessonProgress)
    .where(
      and(
        eq(lessonProgress.userId, userId),
        eq(lessonProgress.completed, true),
      ),
    );

  const counts: Record<string, number> = {};
  for (const r of rows) counts[r.courseSlug] = (counts[r.courseSlug] ?? 0) + 1;
  return counts;
}

/** Save (or update) the current user's exam result for a course. */
export async function saveExamResult(
  courseSlug: string,
  score: number,
  total: number,
): Promise<{ ok: boolean }> {
  const userId = await currentUserId();
  if (!userId) return { ok: false };

  await getDb()
    .insert(examResult)
    .values({ userId, courseSlug, score, total })
    .onConflictDoUpdate({
      target: [examResult.userId, examResult.courseSlug],
      set: { score, total, takenAt: new Date() },
    });

  revalidatePath(`/courses/${courseSlug}`);
  return { ok: true };
}

/** The current user's latest exam result for a course, or null. */
export async function getExamResult(
  courseSlug: string,
): Promise<{ score: number; total: number } | null> {
  const userId = await currentUserId();
  if (!userId) return null;

  const rows = await getDb()
    .select({ score: examResult.score, total: examResult.total })
    .from(examResult)
    .where(
      and(
        eq(examResult.userId, userId),
        eq(examResult.courseSlug, courseSlug),
      ),
    )
    .limit(1);
  return rows[0] ?? null;
}
