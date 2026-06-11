import type { ComponentType, ReactNode } from "react";

/** A multiple-choice question. `correct` is the 0-based index into `opts`. */
export interface MCQ {
  q: string;
  opts: string[];
  correct: number;
  /** feedback shown on a correct / wrong answer */
  ok?: string;
  ko?: string;
}

/**
 * A coding question. The learner writes code; `check(code)` returns true when
 * the answer is acceptable. `check` runs in the browser against the raw editor
 * value, so keep it pure (regex tests, no DOM access).
 */
export interface CodingQuestion {
  prompt: string;
  hint?: string;
  starter?: string;
  solution: string;
  check: (code: string) => boolean;
}

export interface Quiz {
  mcq: MCQ[];
  coding: CodingQuestion[];
}

/** Exam questions carry a topic label for the per-question chip. */
export type ExamMCQ = MCQ & { topic: string };
export type ExamCoding = CodingQuestion & { topic: string };

export interface Exam {
  mcq: ExamMCQ[];
  coding: ExamCoding[];
}

/** The live "try it yourself" editor seeded on a lesson page. */
export interface LessonEditor {
  /** label shown in the editor header */
  title: string;
  /** initial code (decoded, real `<` `>` — NOT HTML-entity encoded) */
  defaultCode: string;
}

export interface Lesson {
  /** URL slug, unique within its course, e.g. "intro" or "css-text" */
  slug: string;
  /** display number, e.g. 1..N */
  number: number;
  title: string;
  /** one-line lead under the title (may contain inline JSX like <code>) */
  lead: ReactNode;
  /** the rendered lesson prose (blocks, tag-cards, code samples, tips) */
  Body: ComponentType;
  /** optional live editor for this lesson */
  editor?: LessonEditor;
  /** "ملاحظات للامتحان" bullet points (may contain inline JSX) */
  tips?: ReactNode[];
  /** this lesson's own quiz */
  quiz: Quiz;
}

export interface Course {
  /** URL slug, e.g. "html" or "css" */
  slug: string;
  title: string;
  description: string;
  /** short emoji/glyph for the course card */
  icon: string;
  /** course accent used on cards (any CSS color) */
  accent?: string;
  lessons: Lesson[];
  exam: Exam;
}
