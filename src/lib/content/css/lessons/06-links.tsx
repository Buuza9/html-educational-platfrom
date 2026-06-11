import type { Lesson } from "@/lib/content/types";
import { Block, Bullet } from "@/components/lesson-content";

function Body() {
  return (
    <>
      <Block title="محدِّدات حالات الرابط">
        <p>
          لا توجد خصائص خاصّة بالروابط، بل <strong>محدِّدات</strong> لتنسيق الرابط حسب حالته:
        </p>
        <Bullet
          items={[
            <>
              <code>a:link</code> — الرابط في حالته العاديَّة (مكافئ لـ <code>a</code> وحده).
            </>,
            <>
              <code>a:visited</code> — رابط سبقت زيارته.
            </>,
            <>
              <code>a:hover</code> — عند مرور مؤشِّر الفأرة فوقه.
            </>,
            <>
              <code>a:active</code> — لحظة النقر عليه.
            </>,
          ]}
        />
      </Block>
    </>
  );
}

const lesson: Lesson = {
  slug: "links",
  number: 6,
  title: "خصائص مظهر الروابط",
  lead: (
    <>
      تنسيق الرابط في حالاته المختلفة عبر المحدِّدات: <code>:link</code>، <code>:visited</code>،{" "}
      <code>:hover</code>، <code>:active</code>.
    </>
  ),
  Body,
  editor: {
    title: "محرر تجريبي — حالات الرابط",
    defaultCode: `<style>
  a:link { color: blue; text-decoration: none; }
  a:visited { color: green; }
  a:hover { text-decoration: underline; }
  a:active { font-size: 120%; }
</style>

<a href="#">رابط عادي</a><br><br>
<a href="#">مرِّر الفأرة فوقي أو انقر</a>`,
  },
  tips: [
    <>
      الترتيب مهم: يُذكر <code>a:hover</code> بعد <code>a:link</code> و<code>a:visited</code>.
    </>,
    <>
      ويُذكر <code>a:active</code> بعد <code>a:hover</code>.
    </>,
    <>
      <code>text-decoration: none</code> تُزيل خط الرابط الافتراضي.
    </>,
  ],
  quiz: {
    mcq: [
      {
        q: "أي محدِّد يُنسّق الرابط عند مرور الفأرة فوقه؟",
        opts: ["a:link", "a:visited", "a:hover", "a:active"],
        correct: 2,
        ok: "صحيح! a:hover عند المرور بالفأرة.",
        ko: "الإجابة الصحيحة: a:hover.",
      },
      {
        q: "أي محدِّد يُنسّق الرابط الذي سبقت زيارته؟",
        opts: ["a:active", "a:visited", "a:hover", "a:link"],
        correct: 1,
        ok: "تمام! a:visited للرابط المُزار.",
        ko: "الإجابة الصحيحة: a:visited.",
      },
      {
        q: "متى يجب ذكر القاعدة a:hover؟",
        opts: ["قبل a:link", "بعد a:link و a:visited", "قبل كل شيء", "لا يهم الترتيب"],
        correct: 1,
        ok: "ممتاز! a:hover بعد a:link و a:visited.",
        ko: "الإجابة الصحيحة: بعد a:link و a:visited.",
      },
    ],
    coding: [
      {
        prompt: "اكتب قاعدة تجعل الروابط في حالتها العادية (a:link) بلا خط (text-decoration: none).",
        hint: "الشكل: a:link { text-decoration: none; }",
        starter: "<style>\n\n</style>",
        solution: "<style>\n  a:link { text-decoration: none; }\n</style>",
        check: (c) => /a\s*:\s*link\s*\{[^}]*text-decoration\s*:\s*none/i.test(c),
      },
    ],
  },
};

export default lesson;
