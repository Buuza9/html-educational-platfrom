import type { Lesson } from "@/lib/content/types";
import { Block, Bullet, CodeBlock } from "@/components/lesson-content";

function Body() {
  return (
    <>
      <Block title="تعريف بسيط">
        <p>
          <strong>HTML</strong> اختصار لـ <em>HyperText Markup Language</em>، وهي لغة{" "}
          <strong>توصيف</strong> (وليست لغة برمجة) تُستخدم لبناء هيكل صفحات الويب. بمعنى آخر:
          نستخدم HTML لنقول للمتصفح &quot;هذا عنوان&quot;، &quot;هذه فقرة&quot;، &quot;هذه
          صورة&quot;، &quot;هذا رابط&quot;.
        </p>
        <p>
          كل صفحة تفتحها على الإنترنت — مثل Google أو YouTube — مبنيّة باستخدام HTML كأساس.
        </p>
      </Block>

      <Block title="لماذا نستخدم HTML؟">
        <Bullet
          items={[
            "لبناء هيكل الصفحة وتنظيم محتواها (نصوص، صور، روابط، جداول...).",
            <>
              لأنها <strong>اللغة الأساسية</strong> للويب، وكل المتصفحات تفهمها مباشرة.
            </>,
            "سهلة التعلم وتُعتبر أول خطوة في طريق تعلم تطوير الويب.",
            <>
              تعمل مع <strong>CSS</strong> (للتنسيق) و<strong>JavaScript</strong> (للتفاعل).
            </>,
          ]}
        />
      </Block>

      <Block title='ما هو "التاج" (Tag)؟'>
        <p>
          عناصر HTML تُكتب على شكل <strong>تاجات (Tags)</strong> محاطة بعلامتي أصغر وأكبر{" "}
          <code>&lt; &gt;</code>. معظم التاجات تأتي بشكل زوجي: تاج فتح وتاج إغلاق.
        </p>
        <CodeBlock>{`<p>هذه فقرة نصية</p>`}</CodeBlock>
        <p>
          هنا <code>&lt;p&gt;</code> هو تاج الفتح، و<code>&lt;/p&gt;</code> هو تاج الإغلاق،
          والنص بينهما هو محتوى العنصر.
        </p>
      </Block>
    </>
  );
}

const lesson: Lesson = {
  slug: "intro",
  number: 1,
  title: "مقدمة عن HTML",
  lead: "ما هي لغة HTML؟ ولماذا نستخدمها لبناء صفحات الويب؟",
  Body,
  editor: {
    title: "محرر تجريبي — جرّب بنفسك",
    defaultCode: `<h1>مرحباً بالعالم</h1>
<p>هذه أول صفحة HTML أكتبها.</p>`,
  },
  tips: [
    <>
      HTML ليست لغة برمجة، بل لغة <strong>توصيف</strong> (Markup).
    </>,
    <>
      كل ملف HTML يبدأ غالباً بـ <code>&lt;!DOCTYPE html&gt;</code>.
    </>,
    "تكتب التاجات بأحرف صغيرة (مع أنها لا تفرّق بين الحالتين).",
  ],
  quiz: {
    mcq: [
      {
        q: "ماذا تعني HTML؟",
        opts: [
          "HyperText Markup Language",
          "Home Tool Markup Language",
          "High Text Modern Language",
          "Hyperlinks Text Main Language",
        ],
        correct: 0,
        ok: "ممتاز! HTML = HyperText Markup Language.",
        ko: "الإجابة الصحيحة: HyperText Markup Language.",
      },
      {
        q: "هل HTML لغة برمجة؟",
        opts: [
          "نعم، لغة برمجة كاملة",
          "لا، هي لغة توصيف (Markup)",
          "نعم، مثل JavaScript",
          "هي لغة قواعد بيانات",
        ],
        correct: 1,
        ok: "صحيح! HTML لغة توصيف وليست لغة برمجة.",
        ko: "الإجابة الصحيحة: HTML هي لغة توصيف (Markup).",
      },
    ],
    coding: [
      {
        prompt: 'اكتب فقرة (paragraph) تحتوي على النص: "أهلاً بالعالم".',
        hint: "استخدم تاج <p> ... </p>.",
        starter: "",
        solution: "<p>أهلاً بالعالم</p>",
        check: (c) => /<p\b[^>]*>\s*أهلاً\s*بالعالم\s*<\/p>/.test(c),
      },
    ],
  },
};

export default lesson;
