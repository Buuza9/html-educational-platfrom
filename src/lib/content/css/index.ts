import type { Course } from "@/lib/content/types";
import lesson01 from "./lessons/01-intro";
import lesson02 from "./lessons/02-methods";
import lesson03 from "./lessons/03-rules";
import lesson04 from "./lessons/04-text";
import lesson05 from "./lessons/05-fonts";
import lesson06 from "./lessons/06-links";
import lesson07 from "./lessons/07-backgrounds";
import lesson08 from "./lessons/08-box-model";
import lesson09 from "./lessons/09-borders-dimensions";
import lesson10 from "./lessons/10-display-positioning";
import lesson11 from "./lessons/11-flexbox";
import lesson12 from "./lessons/12-colors-units";
import lesson13 from "./lessons/13-advanced-selectors";
import lesson14 from "./lessons/14-cascade";
import lesson15 from "./lessons/15-transitions-transforms";
import lesson16 from "./lessons/16-grid";
import lesson17 from "./lessons/17-responsive";
import { cssExam } from "./exam";

export const cssCourse: Course = {
  slug: "css",
  title: "CSS — تنسيق صفحات الويب",
  description:
    "أوراق الأنماط الانسيابية من الصفر: المحدِّدات، النصوص والخطوط، النموذج الصندوقي، التموضع، Flexbox و Grid، الألوان والوحدات، الكاسكيد، الانتقالات، والتصميم المتجاوب.",
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
    lesson08,
    lesson09,
    lesson10,
    lesson11,
    lesson12,
    lesson13,
    lesson14,
    lesson15,
    lesson16,
    lesson17,
  ],
  exam: cssExam,
};
