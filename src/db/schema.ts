import {
  boolean,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

/**
 * Per-user lesson completion. Identity is owned by Clerk, so we store the
 * Clerk user id as text (no local users table).
 */
export const lessonProgress = pgTable(
  "lesson_progress",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id").notNull(),
    courseSlug: text("course_slug").notNull(),
    lessonSlug: text("lesson_slug").notNull(),
    completed: boolean("completed").notNull().default(true),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [
    uniqueIndex("lesson_progress_user_lesson_uniq").on(
      t.userId,
      t.courseSlug,
      t.lessonSlug,
    ),
  ],
);

/** Per-user comprehensive exam results (latest attempt per course). */
export const examResult = pgTable(
  "exam_result",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id").notNull(),
    courseSlug: text("course_slug").notNull(),
    score: integer("score").notNull(),
    total: integer("total").notNull(),
    takenAt: timestamp("taken_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [
    uniqueIndex("exam_result_user_course_uniq").on(t.userId, t.courseSlug),
  ],
);

export type LessonProgress = typeof lessonProgress.$inferSelect;
export type ExamResult = typeof examResult.$inferSelect;
