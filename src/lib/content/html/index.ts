import type { Course } from "@/lib/content/types";
import lesson01 from "./lessons/01-intro";
import lesson02 from "./lessons/02-structure";
import lesson03 from "./lessons/03-text";
import lesson04 from "./lessons/04-links";
import lesson05 from "./lessons/05-lists";
import lesson06 from "./lessons/06-tables";
import lesson07 from "./lessons/07-forms";
import lesson08 from "./lessons/08-media";
import lesson09 from "./lessons/09-semantic";
import lesson10 from "./lessons/10-best";
import { htmlExam } from "./exam";

export const htmlCourse: Course = {
  slug: "html",
  title: "HTML — بناء صفحات الويب",
  description:
    "تعلّم لغة توصيف الويب من الصفر: العناوين، النصوص، الروابط، القوائم، الجداول، النماذج، الوسائط، والعناصر الدلالية.",
  icon: "</>",
  accent: "#31304d",
  lessons: [
    lesson01,
    lesson02,
    lesson03,
    lesson04,
    lesson05,
    lesson06,
    lesson07,
    lesson08,
    lesson09,
    lesson10,
  ],
  exam: htmlExam,
};
