import type { Lesson } from "@/lib/content/types";
import { Block, Bullet, CodeBlock, TagGrid, TagCard } from "@/components/lesson-content";

function Body() {
  return (
    <>
      <Block title="صيغ الألوان في CSS">
        <p>
          هناك أكثر من طريقة لكتابة اللون في CSS. كلها تؤدي نفس الغرض، لكن بعضها يتيح لنا
          التحكم في <strong>الشفافية</strong> (مدى وضوح اللون). إليك أهم الصيغ:
        </p>
      </Block>

      <TagGrid>
        <TagCard
          name="اسم اللون"
          desc={
            <>
              أسماء جاهزة مثل <code>red</code> و<code>blue</code> و<code>black</code>. سهلة لكن
              محدودة.
            </>
          }
          example={<CodeBlock small>{`color: red;`}</CodeBlock>}
        />
        <TagCard
          name="#RRGGBB (Hex)"
          desc={
            <>
              قيمة ست عشرية: علامة <code>#</code> ثم ستة رموز (أحمر، أخضر، أزرق). يوجد اختصار من
              ثلاثة رموز <code>#RGB</code>.
            </>
          }
          example={
            <CodeBlock small>{`color: #ff0000;
color: #f00;`}</CodeBlock>
          }
        />
        <TagCard
          name="rgb() / rgba()"
          desc={
            <>
              ثلاث قيم (0–255) للأحمر والأخضر والأزرق. <code>rgba()</code> تضيف قيمة رابعة
              للشفافية (alpha) بين 0 و1.
            </>
          }
          example={
            <CodeBlock small>{`color: rgb(255, 0, 0);
color: rgba(255, 0, 0, 0.5);`}</CodeBlock>
          }
        />
        <TagCard
          name="hsl() / hsla()"
          desc={
            <>
              صبغة (0–360) ثم تشبّع ثم إضاءة. <code>hsla()</code> تضيف قيمة الشفافية مثل
              <code> rgba()</code>.
            </>
          }
          example={
            <CodeBlock small>{`color: hsl(0, 100%, 50%);
color: hsla(0, 100%, 50%, 0.5);`}</CodeBlock>
          }
        />
      </TagGrid>

      <Block title="الشفافية (Alpha)">
        <p>
          الصيغتان <code>rgba()</code> و<code>hsla()</code> تأخذان قيمة رابعة هي{" "}
          <strong>الشفافية</strong>: حيث <code>1</code> تعني لوناً معتماً تماماً، و<code>0</code>{" "}
          تعني شفافاً بالكامل (غير مرئي)، و<code>0.5</code> تعني نصف شفاف.
        </p>
        <CodeBlock>{`background-color: rgba(0, 0, 255, 0.3);`}</CodeBlock>
      </Block>

      <Block title="الوحدات: مطلقة ونسبية">
        <p>
          عند تحديد الأحجام (العرض، الارتفاع، حجم الخط...) نستخدم <strong>وحدات</strong>. بعضها
          ثابت (مطلق)، وبعضها يتغيّر حسب قيمة أخرى (نسبي).
        </p>
        <Bullet
          items={[
            <>
              <code>px</code> (مطلقة): بكسل ثابت لا يتأثر بأي شيء آخر.
            </>,
            <>
              <code>%</code> (نسبية): نسبة مئوية من قيمة العنصر الأب.
            </>,
            <>
              <code>em</code> (نسبية): نسبة إلى حجم خط العنصر نفسه.
            </>,
            <>
              <code>rem</code> (نسبية): نسبة إلى حجم خط العنصر <strong>الجذر</strong>{" "}
              <code>&lt;html&gt;</code> (root font-size، عادةً 16px).
            </>,
            <>
              <code>vw</code> / <code>vh</code> (نسبية): نسبة من عرض/ارتفاع نافذة العرض
              (viewport)؛ <code>1vw</code> = 1% من العرض.
            </>,
          ]}
        />
        <CodeBlock>{`h1   { font-size: 32px; }   /* ثابت */
p    { font-size: 1.5rem; } /* 1.5 × 16 = 24px */
.box { width: 50%; }        /* نصف عرض الأب */`}</CodeBlock>
      </Block>
    </>
  );
}

const lesson: Lesson = {
  slug: "colors-units",
  number: 12,
  title: "الألوان والوحدات",
  lead: "صيغ الألوان في CSS (الأسماء، Hex، rgb/rgba، hsl) والوحدات المطلقة والنسبية (px، %، em، rem، vw/vh).",
  Body,
  editor: {
    title: "محرر تجريبي — الألوان والوحدات",
    defaultCode: `<style>
  .solid {
    background-color: rgb(0, 0, 255);
    color: white;
    padding: 16px;
  }
  .transparent {
    background-color: rgba(0, 0, 255, 0.4);
    padding: 16px;
  }
  .big {
    font-size: 2rem;   /* 2 × 16 = 32px */
  }
  .small {
    font-size: 14px;   /* ثابت */
  }
</style>

<div class="solid">خلفية زرقاء معتمة (rgb)</div>
<div class="transparent">خلفية زرقاء نصف شفافة (rgba 0.4)</div>
<p class="big">نص بحجم 2rem</p>
<p class="small">نص بحجم 14px</p>`,
  },
  tips: [
    <>
      <code>rgba()</code> و<code>hsla()</code> فقط تتيح <strong>الشفافية</strong> عبر القيمة
      الرابعة (alpha) بين 0 و1.
    </>,
    <>
      <code>rem</code> نسبة إلى حجم خط العنصر الجذر <code>&lt;html&gt;</code>، بينما{" "}
      <code>em</code> نسبة إلى خط العنصر نفسه.
    </>,
    <>
      لون Hex صحيح يبدأ بـ <code>#</code> ويتكوّن من 6 رموز (أو 3 اختصاراً)، مثل{" "}
      <code>#ff0000</code>.
    </>,
  ],
  quiz: {
    mcq: [
      {
        q: "أي صيغة لون تتيح إضافة شفافية (transparency)؟",
        opts: ["rgb()", "hex #RRGGBB", "rgba()", "اسم اللون مثل red"],
        correct: 2,
        ok: "صحيح! rgba() (و hsla()) تضيف قيمة الشفافية alpha.",
        ko: "الإجابة الصحيحة: rgba() لأنها تضيف قيمة الشفافية.",
      },
      {
        q: "وحدة rem نسبية إلى ماذا؟",
        opts: [
          "حجم خط العنصر الجذر (root font-size)",
          "عرض نافذة العرض",
          "حجم خط العنصر نفسه",
          "عرض العنصر الأب",
        ],
        correct: 0,
        ok: "ممتاز! rem نسبة إلى حجم خط العنصر الجذر <html>.",
        ko: "الإجابة الصحيحة: rem نسبة إلى حجم خط العنصر الجذر (root font-size).",
      },
      {
        q: "أيٌّ مما يلي قيمة لون Hex صحيحة؟",
        opts: ["#ff0000", "ff0000#", "#xyz123", "rgb#ff0000"],
        correct: 0,
        ok: "صحيح! #ff0000 لون أحمر بصيغة Hex سليمة.",
        ko: "الإجابة الصحيحة: #ff0000 (تبدأ بـ # وتتكوّن من رموز ست عشرية).",
      },
    ],
    coding: [
      {
        prompt:
          "اكتب قاعدة CSS تعطي العنصر <div> خلفية حمراء نصف شفافة باستخدام rgba(255, 0, 0, 0.5).",
        hint: "استخدم background-color: rgba(255, 0, 0, 0.5); داخل قاعدة div.",
        starter: "<style>\n  div {\n\n  }\n</style>",
        solution:
          "<style>\n  div {\n    background-color: rgba(255, 0, 0, 0.5);\n  }\n</style>",
        check: (c) =>
          /div\s*\{[^}]*background(-color)?\s*:\s*rgba\(\s*255\s*,\s*0\s*,\s*0\s*,\s*0?\.5\s*\)/i.test(
            c
          ),
      },
    ],
  },
};

export default lesson;
