import type { Lesson } from "@/lib/content/types";
import { Block, CodeBlock, TagGrid, TagCard } from "@/components/lesson-content";

function Body() {
  return (
    <>
      <TagGrid>
        <TagCard
          name="background-color"
          desc="خلفية لونيَّة للعنصر."
          example={<CodeBlock small>{`background-color: #cf1a11;`}</CodeBlock>}
        />
        <TagCard
          name="background-image"
          desc={
            <>
              تعيين صورة كخلفية عبر <code>url()</code>.
            </>
          }
          example={
            <CodeBlock small>{`background-image:
  url("image.jpg");`}</CodeBlock>
          }
        />
        <TagCard
          name="background-repeat"
          desc={
            <>
              تكرار الصورة: <code>repeat-x</code>، <code>repeat-y</code>،{" "}
              <code>repeat</code>، <code>no-repeat</code>.
            </>
          }
          example={<CodeBlock small>{`background-repeat: no-repeat;`}</CodeBlock>}
        />
        <TagCard
          name="background-position"
          desc={
            <>
              موضع الصورة، مثل <code>center center</code> أو <code>left top</code>.
            </>
          }
          example={
            <CodeBlock small>{`background-position:
  center center;`}</CodeBlock>
          }
        />
      </TagGrid>

      <Block title="التحديد بالفئات (Classes)">
        <p>
          طريقة خاصّة لتحديد العناصر: نعرّف <strong>فئة</strong> باسم مسبوق بنقطة في CSS، ثم
          نُسند اسمها (بدون نقطة) إلى الواصفة <code>class</code> للعناصر المطلوبة، فيُطبَّق
          التنسيق على كل عنصر يحمل تلك الفئة.
        </p>
        <CodeBlock>{`<style>
  .firstP { background-color: black; color: white; }
</style>

<p class="firstP">فقرة بخلفية سوداء</p>`}</CodeBlock>
      </Block>
    </>
  );
}

const lesson: Lesson = {
  slug: "backgrounds",
  number: 7,
  title: "خصائص الخلفيات Backgrounds",
  lead: "تلوين الخلفيات ووضع الصور فيها، مع التعرّف على التحديد بالفئات (classes).",
  Body,
  editor: {
    title: "محرر تجريبي — الخلفيات والفئات",
    defaultCode: `<style>
  .firstP {
    background-color: black;
    color: white;
    padding: 10px;
  }
  .secondP {
    background-color: #cf1a11;
    color: white;
    padding: 10px;
  }
</style>

<p class="firstP">عنصر بخلفية سوداء ونص أبيض.</p>
<p class="secondP">عنصر بخلفية حمراء.</p>`,
  },
  tips: [
    <>
      <code>background-color</code> للون، <code>background-image: url(...)</code> للصورة.
    </>,
    <>
      <code>no-repeat</code> تمنع تكرار الصورة.
    </>,
    <>
      الفئة تُعرَّف بنقطة <code>.name</code> وتُستدعى عبر <code>class=&quot;name&quot;</code>.
    </>,
  ],
  quiz: {
    mcq: [
      {
        q: "أي قيمة لـ background-repeat تمنع تكرار الصورة؟",
        opts: ["repeat", "repeat-x", "no-repeat", "once"],
        correct: 2,
        ok: "صحيح! no-repeat تمنع التكرار.",
        ko: "الإجابة الصحيحة: no-repeat.",
      },
      {
        q: "كيف نعيّن صورة كخلفية لعنصر؟",
        opts: [
          "background-color: url(...)",
          "background-image: url(...)",
          "image: src(...)",
          "background: image(...)",
        ],
        correct: 1,
        ok: "تمام! background-image: url(...).",
        ko: "الإجابة الصحيحة: background-image: url(...).",
      },
      {
        q: "كيف تُعرَّف الفئة (class) في CSS؟",
        opts: [
          "باسم مسبوق بـ #",
          "باسم مسبوق بنقطة .",
          "باسم مسبوق بـ @",
          "باسم بين قوسين",
        ],
        correct: 1,
        ok: "ممتاز! الفئة تُعرَّف بنقطة .",
        ko: "الإجابة الصحيحة: باسم مسبوق بنقطة.",
      },
    ],
    coding: [
      {
        prompt: "اكتب قاعدة CSS تعطي العنصر <body> خلفية لونها أحمر (red).",
        hint: "استخدم background-color: red; داخل قاعدة body.",
        starter: "<style>\n  body {\n\n  }\n</style>",
        solution: "<style>\n  body {\n    background-color: red;\n  }\n</style>",
        check: (c) => /body\s*\{[^}]*background(-color)?\s*:\s*red\b/i.test(c),
      },
    ],
  },
};

export default lesson;
