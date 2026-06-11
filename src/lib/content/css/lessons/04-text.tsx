import type { Lesson } from "@/lib/content/types";
import { Block, Bullet, CodeBlock, TagGrid, TagCard } from "@/components/lesson-content";

function Body() {
  return (
    <>
      <TagGrid>
        <TagCard
          name="text-align"
          desc={
            <>
              محاذاة النص. القيم: <code>right</code>، <code>left</code>، <code>center</code>،{" "}
              <code>justify</code> (تساوي عرض الأسطر).
            </>
          }
          example={<CodeBlock small>{`h1 { text-align: center; }`}</CodeBlock>}
        />

        <TagCard
          name="text-decoration"
          desc={
            <>
              تزيين النص. القيم: <code>none</code>، <code>underline</code>، <code>overline</code>،{" "}
              <code>line-through</code>.
            </>
          }
          example={<CodeBlock small>{`a { text-decoration: none; }`}</CodeBlock>}
        />

        <TagCard
          name="direction"
          desc={
            <>
              اتجاه القراءة: <code>rtl</code> (يمين ليسار) أو <code>ltr</code> (يسار ليمين).
            </>
          }
          example={<CodeBlock small>{`p { direction: rtl; }`}</CodeBlock>}
        />

        <TagCard
          name="text-transform"
          desc={
            <>
              حالة الأحرف الإنجليزيَّة: <code>uppercase</code>، <code>lowercase</code>،{" "}
              <code>capitalize</code>.
            </>
          }
          example={<CodeBlock small>{`p { text-transform: uppercase; }`}</CodeBlock>}
        />

        <TagCard
          name="text-indent"
          desc="إزاحة أول سطر من الفقرة بمقدار محدَّد (غالباً للفقرات الإنجليزيَّة)."
          example={<CodeBlock small>{`p { text-indent: 20px; }`}</CodeBlock>}
        />

        <TagCard
          name="color"
          desc={
            <>
              لون النص: بالاسم (<code>red</code>)، أو ست عشري (<code>#FF0000</code>)، أو{" "}
              <code>rgb(255,0,0)</code>.
            </>
          }
          example={<CodeBlock small>{`p { color: #1565c0; }`}</CodeBlock>}
        />
      </TagGrid>

      <Block title="طرق كتابة اللون">
        <p>
          يتشكّل كل لون من مزج <strong>الأحمر والأخضر والأزرق</strong>. هناك ثلاث طرق لكتابته:
        </p>
        <Bullet
          items={[
            <>
              <strong>بالاسم:</strong> <code>red</code>، <code>green</code>، <code>white</code>...
            </>,
            <>
              <strong>ست عشري (Hexadecimal):</strong> <code>#RRGGBB</code> — كل خانتين تتدرّجان بين{" "}
              <code>00</code> و <code>FF</code> (مثل <code>#FF00FF</code> للبنفسجي).
            </>,
            <>
              <strong>عبر rgb():</strong> <code>rgb(255, 0, 0)</code> — كل قيمة بين <code>0</code> و{" "}
              <code>255</code>.
            </>,
          ]}
        />
      </Block>
    </>
  );
}

const lesson: Lesson = {
  slug: "text",
  number: 4,
  title: "خصائص مظهر النصوص",
  lead: "المحاذاة، التزيين، الاتجاه, حالة الأحرف، الإزاحة، واللون.",
  Body,
  editor: {
    title: "محرر تجريبي — خصائص النصوص",
    defaultCode: `<style>
  p {
    text-align: justify;
    color: #1565c0;
    text-decoration: underline;
    text-transform: uppercase;
    direction: rtl;
  }
</style>

<p>This is a CSS text demo — جرّب تغيير القيم بالأعلى وشاهد النتيجة مباشرة.</p>`,
  },
  tips: [
    <>
      <code>text-align: justify</code> تجعل الأسطر متساوية العرض.
    </>,
    <>
      <code>text-decoration: none</code> تُزيل الخط عن الروابط.
    </>,
    <>
      اللون يُكتب بالاسم أو <code>#RRGGBB</code> أو <code>rgb()</code>.
    </>,
  ],
  quiz: {
    mcq: [
      {
        q: "أي قيمة لـ text-align تجعل أسطر الفقرة متساوية العرض؟",
        opts: ["center", "justify", "right", "left"],
        correct: 1,
        ok: "صحيح! justify يساوي عرض الأسطر.",
        ko: "الإجابة الصحيحة: justify.",
      },
      {
        q: "أي خاصية تُستخدم لإزالة الخط من تحت الروابط؟",
        opts: ["text-style", "text-decoration", "text-line", "font-style"],
        correct: 1,
        ok: "تمام! text-decoration: none.",
        ko: "الإجابة الصحيحة: text-decoration.",
      },
      {
        q: "كيف نكتب اللون الأحمر بالنظام الست عشري؟",
        opts: ["#00FF00", "#0000FF", "#FF0000", "#FFFFFF"],
        correct: 2,
        ok: "ممتاز! #FF0000 = أحمر.",
        ko: "الإجابة الصحيحة: #FF0000.",
      },
      {
        q: "أي خاصية تتحكّم في اتجاه القراءة (يمين/يسار)؟",
        opts: ["align", "direction", "rtl", "float"],
        correct: 1,
        ok: "صح! direction: rtl أو ltr.",
        ko: "الإجابة الصحيحة: direction.",
      },
    ],
    coding: [
      {
        prompt: "اكتب قاعدة CSS تجعل الفقرات <p> موسّطة (center) ولون نصّها أحمر (red).",
        hint: "استخدم text-align: center و color: red داخل قاعدة p.",
        starter: "<style>\n  p {\n\n  }\n</style>",
        solution: "<style>\n  p {\n    text-align: center;\n    color: red;\n  }\n</style>",
        check: (c) => /text-align\s*:\s*center/i.test(c) && /color\s*:\s*red\b/i.test(c),
      },
    ],
  },
};

export default lesson;
