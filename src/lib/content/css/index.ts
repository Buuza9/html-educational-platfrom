import type { Course } from "@/lib/content/types";
import lesson01 from "./lessons/01-intro";
import lesson02 from "./lessons/02-methods";
import lesson03 from "./lessons/03-rules";
import lesson04 from "./lessons/04-text";
import lesson05 from "./lessons/05-fonts";
import lesson06 from "./lessons/06-links";
import lesson07 from "./lessons/07-backgrounds";
import { cssExam } from "./exam";

export const cssCourse: Course = {
  slug: "css",
  title: "CSS — تنسيق صفحات الويب",
  description:
    "أوراق الأنماط الانسيابية: طرق إضافة CSS، المحدِّدات، تنسيق النصوص والخطوط والروابط والخلفيات.",
  icon: "🎨",
  accent: "#2da27c",
  lessons: [
    lesson01,
    lesson02,
    lesson03,
    lesson04,
    lesson05,
    lesson06,
    lesson07,
  ],
  exam: cssExam,
};
