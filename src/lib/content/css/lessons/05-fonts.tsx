import type { Lesson } from "@/lib/content/types";
import { Block, Bullet, CodeBlock, TagGrid, TagCard } from "@/components/lesson-content";

function Body() {
  return (
    <>
      <Block
        title={
          <>
            عائلة الخطوط <code>font-family</code>
          </>
        }
      >
        <p>
          نُسند خطاً واحداً أو عدّة خطوط مفصولة بفواصل، فيكون الأول هو الافتراضي، وإن تعذّر على
          المتصفح إيجاده انتقل للذي يليه وهكذا. توفّر CSS ثلاث عوائل افتراضيَّة:
        </p>
        <Bullet
          items={[
            <>
              <strong>Serif</strong> — خطوط ذات زوائد.
            </>,
            <>
              <strong>Sans-serif</strong> — بلا زوائد (يُنصح بها للإنجليزيَّة).
            </>,
            <>
              <strong>Monospace</strong> — عرض ثابت لكل حرف (مناسبة لعرض شيفرات البرمجة).
            </>,
          ]}
        />
      </Block>

      <TagGrid>
        <TagCard
          name="font-family"
          desc="قائمة الخطوط بالأولويَّة. آخر قيمة عادةً عائلة افتراضيَّة بلا علامتي اقتباس."
          example={<CodeBlock small>{`font-family:\n  "Tahoma", sans-serif;`}</CodeBlock>}
        />
        <TagCard
          name="font-style"
          desc={
            <>
              نمط الخط: <code>italic</code> (مائل) أو <code>normal</code> (عادي).
            </>
          }
          example={<CodeBlock small>{`font-style: italic;`}</CodeBlock>}
        />
        <TagCard
          name="font-size"
          desc={
            <>
              حجم النص بالبكسل (<code>px</code>) أو بالواحدة <code>em</code> (كل{" "}
              <code>1em = 16px</code>).
            </>
          }
          example={<CodeBlock small>{`font-size: 1.5em;`}</CodeBlock>}
        />
      </TagGrid>
    </>
  );
}

const lesson: Lesson = {
  slug: "fonts",
  number: 5,
  title: "خصائص الخطوط Fonts",
  lead: (
    <>
      <code>font-family</code>، <code>font-style</code>، <code>font-size</code>.
    </>
  ),
  Body,
  editor: {
    title: "محرر تجريبي — الخطوط",
    defaultCode: `<style>
  p {
    font-family: "Tahoma", "Simplified Arabic", sans-serif;
    font-size: 1.5em;
    font-style: italic;
  }
</style>

<p>صفحة اختبار لخصائص الخطوط في CSS.</p>`,
  },
  tips: [
    <>
      أول خط في <code>font-family</code> هو الافتراضي، والباقي بدائل احتياطيَّة.
    </>,
    <>
      العائلة الافتراضيَّة (مثل <code>sans-serif</code>) تُكتب <strong>بلا</strong> علامتي اقتباس.
    </>,
    <>
      <code>1em = 16px</code>.
    </>,
  ],
  quiz: {
    mcq: [
      {
        q: "كم يساوي 1em بالبكسل افتراضياً؟",
        opts: ["10px", "12px", "16px", "20px"],
        correct: 2,
        ok: "ممتاز! 1em = 16px.",
        ko: "الإجابة الصحيحة: 16px.",
      },
      {
        q: "أي قيمة لـ font-style تجعل الخط مائلاً؟",
        opts: ["bold", "italic", "oblique-normal", "slant"],
        correct: 1,
        ok: "صحيح! italic = مائل.",
        ko: "الإجابة الصحيحة: italic.",
      },
      {
        q: "أي عائلة خطوط يُنصح بها لعرض شيفرات البرمجة؟",
        opts: ["Serif", "Sans-serif", "Monospace", "Cursive"],
        correct: 2,
        ok: "تمام! Monospace ذات عرض ثابت.",
        ko: "الإجابة الصحيحة: Monospace.",
      },
    ],
    coding: [
      {
        prompt: "اكتب قاعدة CSS تجعل حجم خط الفقرات <p> يساوي 1.5em ونمطه مائلاً (italic).",
        hint: "استخدم font-size: 1.5em و font-style: italic.",
        starter: "<style>\n  p {\n\n  }\n</style>",
        solution: "<style>\n  p {\n    font-size: 1.5em;\n    font-style: italic;\n  }\n</style>",
        check: (c) => /font-size\s*:\s*1\.5em/i.test(c) && /font-style\s*:\s*italic/i.test(c),
      },
    ],
  },
};

export default lesson;
