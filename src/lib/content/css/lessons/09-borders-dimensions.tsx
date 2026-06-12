import type { Lesson } from "@/lib/content/types";
import { Block, Bullet, CodeBlock, TagGrid, TagCard } from "@/components/lesson-content";

function Body() {
  return (
    <>
      <Block title="الحدود (Borders)">
        <p>
          الحدّ هو الخطّ المرسوم حول العنصر. لرسمه نحتاج ثلاث خصائص: <strong>عرض الخطّ</strong>{" "}
          عبر <code>border-width</code>، و<strong>شكل الخطّ</strong> عبر <code>border-style</code>،
          و<strong>لونه</strong> عبر <code>border-color</code>.
        </p>
      </Block>

      <TagGrid>
        <TagCard
          name="border-width"
          desc={
            <>
              سماكة الخطّ، مثل <code>1px</code> أو <code>3px</code>.
            </>
          }
          example={<CodeBlock small>{`border-width: 3px;`}</CodeBlock>}
        />
        <TagCard
          name="border-style"
          desc={
            <>
              شكل الخطّ: <code>solid</code> متّصل، <code>dashed</code> متقطّع، <code>dotted</code>{" "}
              منقّط، <code>double</code> مزدوج.
            </>
          }
          example={<CodeBlock small>{`border-style: dashed;`}</CodeBlock>}
        />
        <TagCard
          name="border-color"
          desc="لون الخطّ، بأي صيغة لون مثل اسم أو رمز ست عشري."
          example={<CodeBlock small>{`border-color: #333;`}</CodeBlock>}
        />
        <TagCard
          name="border (اختصار)"
          desc={
            <>
              يجمع الثلاث خصائص في سطر واحد بالترتيب: <strong>العرض ثم الشكل ثم اللون</strong>.
            </>
          }
          example={<CodeBlock small>{`border: 2px solid #333;`}</CodeBlock>}
        />
        <TagCard
          name="border-radius"
          desc={
            <>
              يدوّر الزوايا. القيمة الأكبر تعطي تدويراً أوضح، و<code>50%</code> تحوّل المربّع إلى
              دائرة.
            </>
          }
          example={<CodeBlock small>{`border-radius: 12px;`}</CodeBlock>}
        />
      </TagGrid>

      <Block title="الاختصار border">
        <p>
          بدل كتابة ثلاث خصائص منفصلة، نكتب الحدّ كاملاً في سطر واحد على هذا الترتيب:{" "}
          <strong>العرض</strong> فـ<strong>الشكل</strong> فـ<strong>اللون</strong>.
        </p>
        <CodeBlock>{`/* طويل */
border-width: 2px;
border-style: solid;
border-color: #333;

/* مختصر — نفس النتيجة */
border: 2px solid #333;`}</CodeBlock>
      </Block>

      <Block title="تدوير الزوايا border-radius">
        <p>
          <code>border-radius</code> يجعل زوايا العنصر دائرية. كلما زادت القيمة زاد التدويـر، وإذا
          جعلنا القيمة <code>50%</code> على عنصر مربّع تحوّل إلى دائرة كاملة.
        </p>
        <CodeBlock>{`border-radius: 12px;   /* زوايا مدوّرة قليلاً */
border-radius: 50%;    /* دائرة (إذا كان مربّعاً) */`}</CodeBlock>
      </Block>

      <Block title="الأبعاد: العرض والارتفاع">
        <p>
          نتحكّم في حجم العنصر بـ <code>width</code> (العرض) و<code>height</code> (الارتفاع). يمكن
          أن تكون القيمة بالبكسل مثل <code>200px</code> أو بنسبة مئوية مثل <code>50%</code> (نسبةً
          إلى العنصر الأب).
        </p>
        <CodeBlock>{`width: 200px;
height: 100px;
width: 50%;     /* نصف عرض العنصر الأب */`}</CodeBlock>
      </Block>

      <Block title="الحدود الدنيا والقصوى للأبعاد">
        <p>
          أحياناً نريد ألّا يصغر العنصر أو يكبر عن حدٍّ معيّن، خصوصاً مع العروض المئوية. لذلك
          نستخدم:
        </p>
        <Bullet
          items={[
            <>
              <code>min-width</code> / <code>min-height</code>: أقلّ حجم مسموح، فلا ينزل العنصر دونه.
            </>,
            <>
              <code>max-width</code>: أقصى عرض مسموح، فلا يتجاوزه العنصر مهما اتّسعت الشاشة (مفيد جداً
              للتجاوب).
            </>,
            <>
              <code>max-height</code>: أقصى ارتفاع مسموح للعنصر.
            </>,
          ]}
        />
        <CodeBlock>{`width: 100%;
max-width: 600px;   /* يتمدّد حتى 600px فقط ثم يتوقّف */
min-height: 80px;`}</CodeBlock>
      </Block>
    </>
  );
}

const lesson: Lesson = {
  slug: "borders",
  number: 9,
  title: "الحدود والأبعاد (Borders & Dimensions)",
  lead: "رسم حدود حول العناصر وتدوير زواياها، والتحكّم في العرض والارتفاع وحدودهما الدنيا والقصوى.",
  Body,
  editor: {
    title: "محرر تجريبي — الحدود والأبعاد",
    defaultCode: `<style>
  .box {
    width: 220px;
    height: 120px;
    border: 3px solid #333;
    border-radius: 16px;
    background-color: #fde;
    padding: 12px;
  }
  .circle {
    width: 100px;
    height: 100px;
    border: 4px dashed #cf1a11;
    border-radius: 50%;
    background-color: #ffe;
  }
</style>

<div class="box">صندوق بحدّ متّصل وزوايا مدوّرة وأبعاد محدّدة.</div>
<br>
<div class="circle"></div>`,
  },
  tips: [
    <>
      الاختصار <code>border</code> ترتيبه: العرض ثم الشكل ثم اللون، مثل{" "}
      <code>border: 2px solid #333</code>.
    </>,
    <>
      <code>border-radius</code> يدوّر الزوايا، و<code>50%</code> تصنع دائرة من المربّع.
    </>,
    <>
      <code>max-width</code> أقصى عرض، و<code>min-width</code> أقلّ عرض، وهي مهمّة مع العروض المئوية.
    </>,
  ],
  quiz: {
    mcq: [
      {
        q: "أي خاصّية تُستخدم لتدوير زوايا العنصر؟",
        opts: ["corner-radius", "border-radius", "round-corner", "border-curve"],
        correct: 1,
        ok: "صحيح! border-radius هي المسؤولة عن تدوير الزوايا.",
        ko: "الإجابة الصحيحة: border-radius.",
      },
      {
        q: "ما الترتيب الصحيح لقيم الاختصار border؟",
        opts: [
          "border: solid 2px #333",
          "border: #333 2px solid",
          "border: 2px solid #333",
          "border: solid #333 2px",
        ],
        correct: 2,
        ok: "تمام! الترتيب هو العرض ثم الشكل ثم اللون.",
        ko: "الإجابة الصحيحة: border: 2px solid #333 (العرض ثم الشكل ثم اللون).",
      },
      {
        q: "ماذا تعني max-width؟",
        opts: [
          "العرض الثابت للعنصر دائماً",
          "أقلّ عرض مسموح للعنصر",
          "أقصى عرض لا يتجاوزه العنصر",
          "عرض العنصر الأب",
        ],
        correct: 2,
        ok: "ممتاز! max-width هي أقصى عرض لا يتجاوزه العنصر.",
        ko: "الإجابة الصحيحة: أقصى عرض لا يتجاوزه العنصر.",
      },
    ],
    coding: [
      {
        prompt:
          "اكتب قاعدة CSS لعنصر <div> (عبر الفئة .card) تعطيه حدّاً متقطّعاً (dashed) بسماكة 3px ولون أحمر (red)، مع تدوير للزوايا بمقدار 12px.",
        hint: "استخدم border: 3px dashed red; مع border-radius: 12px;",
        starter: "<style>\n  .card {\n\n  }\n</style>\n\n<div class=\"card\">بطاقة</div>",
        solution:
          "<style>\n  .card {\n    border: 3px dashed red;\n    border-radius: 12px;\n  }\n</style>\n\n<div class=\"card\">بطاقة</div>",
        check: (c) =>
          /3px\s+dashed\s+red|dashed[^;]*red[^;]*3px|3px[^;]*red[^;]*dashed/i.test(c) &&
          /border-radius\s*:\s*12px/i.test(c),
      },
    ],
  },
};

export default lesson;
