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
import lesson10 from "./lessons/10-attributes";
import lesson11 from "./lessons/11-comments";
import lesson12 from "./lessons/12-block-inline";
import lesson13 from "./lessons/13-iframes";
import lesson14 from "./lessons/14-meta-seo";
import lesson15 from "./lessons/15-best";
import { htmlExam } from "./exam";

export const htmlCourse: Course = {
  slug: "html",
  title: "HTML — بناء صفحات الويب",
  description:
    "تعلّم لغة توصيف الويب من الصفر: العناوين، النصوص، الروابط، القوائم، الجداول، النماذج، الوسائط، العناصر الدلالية، السمات، الإطارات، ووسوم الرأس و SEO.",
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
    lesson11,
    lesson12,
    lesson13,
    lesson14,
    lesson15,
  ],
  exam: htmlExam,
};
