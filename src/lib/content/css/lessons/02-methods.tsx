import type { Lesson } from "@/lib/content/types";
import { Block, CodeBlock, TagGrid, TagCard } from "@/components/lesson-content";

function Body() {
  return (
    <>
      <TagGrid>
        <TagCard
          name="Inline"
          desc={
            <>
              CSS <strong>السطريَّة</strong>: تُكتب داخل الواصفة <code>style</code> لعنصر واحد فقط.
            </>
          }
          when="نادراً — غير مفضَّلة لأنها تعيدنا لمشاكل ما قبل CSS."
          example={<CodeBlock small>{`<p style="color:red;">فقرة</p>`}</CodeBlock>}
        />
        <TagCard
          name="Internal"
          desc={
            <>
              CSS <strong>الداخليَّة</strong>: تُكتب بين وسمي <code>&lt;style&gt;</code> داخل{" "}
              <code>&lt;head&gt;</code>.
            </>
          }
          when="للمواقع ذات العدد المحدود من الصفحات."
          example={
            <CodeBlock small>{`<head>
  <style>
    p { color: red; }
  </style>
</head>`}</CodeBlock>
          }
        />
        <TagCard
          name="External"
          desc={
            <>
              CSS <strong>الخارجيَّة</strong>: تُكتب في ملف مستقل بامتداد <code>.css</code> ويُربط
              بالصفحة عبر <code>&lt;link&gt;</code>.
            </>
          }
          when="الطريقة المثاليّة — خاصة للمواقع المتوسطة والكبيرة."
          example={
            <CodeBlock small>{`<link rel="stylesheet"
      href="style.css" />`}</CodeBlock>
          }
        />
      </TagGrid>

      <Block title="الطريقة الخارجيَّة بالتفصيل">
        <p>
          نكتب كامل شيفرة CSS في ملف مثل <code>style.css</code>، ثم نربطه في رأس الصفحة عبر الوسم{" "}
          <code>&lt;link&gt;</code> بتمرير مسار الملف إلى <code>href</code> وتحديد العلاقة بـ{" "}
          <code>stylesheet</code>:
        </p>
        <CodeBlock>{`<html>
  <head>
    <link rel="stylesheet" type="text/css" href="style.css" />
  </head>
  <body>
    محتوى الصفحة هنا
  </body>
</html>`}</CodeBlock>
      </Block>
    </>
  );
}

const lesson: Lesson = {
  slug: "methods",
  number: 2,
  title: "طرق إضافة CSS إلى الصفحة",
  lead: "هناك ثلاث طرق لاستخدام CSS: السطريَّة (Inline)، الداخليَّة (Internal)، والخارجيَّة (External).",
  Body,
  editor: {
    title: "محرر تجريبي — CSS داخليّة",
    defaultCode: `<style>
  p { color: teal; text-align: center; }
</style>

<p>فقرة منسّقة باستخدام CSS الداخليّة.</p>`,
  },
  tips: [
    <>
      السطريَّة (Inline): عبر الواصفة <code>style</code> — غير مفضَّلة.
    </>,
    <>
      الداخليَّة (Internal): داخل <code>&lt;style&gt;</code> في <code>&lt;head&gt;</code>.
    </>,
    <>
      الخارجيَّة (External): ملف <code>.css</code> مربوط بـ{" "}
      <code>&lt;link rel=&quot;stylesheet&quot;&gt;</code> — الأفضل.
    </>,
  ],
  quiz: {
    mcq: [
      {
        q: "أي طريقة تُكتب فيها CSS في ملف .css منفصل؟",
        opts: ["السطريَّة (Inline)", "الداخليَّة (Internal)", "الخارجيَّة (External)", "لا توجد"],
        correct: 2,
        ok: "صحيح! الخارجيَّة في ملف مستقل.",
        ko: "الإجابة الصحيحة: الخارجيَّة (External).",
      },
      {
        q: "أين تُكتب CSS الداخليَّة؟",
        opts: ["داخل <body>", "داخل <style> في <head>", "في ملف منفصل", "داخل الواصفة style"],
        correct: 1,
        ok: "تمام! داخل <style> في <head>.",
        ko: "الإجابة الصحيحة: داخل <style> في <head>.",
      },
      {
        q: "أي وسم يربط ملف CSS خارجي بالصفحة؟",
        opts: ["<style>", "<css>", "<link>", "<script>"],
        correct: 2,
        ok: "ممتاز! <link> يربط الملف الخارجي.",
        ko: "الإجابة الصحيحة: <link>.",
      },
    ],
    coding: [
      {
        prompt: "اكتب وسم <link> لربط ملف CSS خارجي اسمه style.css.",
        hint: 'استخدم rel="stylesheet" و href="style.css".',
        starter: "",
        solution: '<link rel="stylesheet" type="text/css" href="style.css" />',
        check: (c) =>
          /<link\b[^>]*rel\s*=\s*["']stylesheet["'][^>]*href\s*=\s*["']style\.css["']/i.test(c) ||
          /<link\b[^>]*href\s*=\s*["']style\.css["'][^>]*rel\s*=\s*["']stylesheet["']/i.test(c),
      },
    ],
  },
};

export default lesson;
