import type { Lesson } from "@/lib/content/types";
import { Block, TagGrid, TagCard } from "@/components/lesson-content";

function Body() {
  return (
    <>
      <Block title="ما معنى Semantic؟">
        <p>
          Semantic = <strong>دلالي</strong>. التاجات الدلالية هي تاجات اسمها يصف وظيفتها. بدل
          استخدام <code>&lt;div&gt;</code> لكل شيء، نستخدم تاجات أوضح مثل{" "}
          <code>&lt;header&gt;</code> و<code>&lt;footer&gt;</code> و<code>&lt;article&gt;</code>.
        </p>
      </Block>

      <TagGrid>
        <TagCard
          name="<header>"
          desc={
            <>
              <strong>رأس الصفحة</strong> — يحتوي عادة على الشعار والقائمة العلوية.
            </>
          }
        />
        <TagCard
          name="<nav>"
          desc={
            <>
              <strong>قائمة التنقل</strong> — مجموعة الروابط الرئيسية في الموقع.
            </>
          }
        />
        <TagCard
          name="<main>"
          desc={
            <>
              <strong>المحتوى الأساسي</strong> للصفحة. مرة واحدة فقط لكل صفحة.
            </>
          }
        />
        <TagCard
          name="<section>"
          desc={
            <>
              <strong>قسم</strong> له موضوع واحد، مثل قسم المنتجات أو قسم الفريق.
            </>
          }
        />
        <TagCard
          name="<article>"
          desc={
            <>
              <strong>محتوى مستقل</strong>، مثل مقال أو منشور — يمكن قراءته بمفرده.
            </>
          }
        />
        <TagCard
          name="<footer>"
          desc={
            <>
              <strong>أسفل الصفحة</strong> — يحتوي عادة على حقوق الملكية والروابط الجانبية.
            </>
          }
        />
      </TagGrid>
    </>
  );
}

const lesson: Lesson = {
  slug: "semantic",
  number: 9,
  title: "Semantic HTML",
  lead: (
    <>
      تاجات ذات <strong>معنى</strong> تساعد المتصفحات ومحركات البحث على فهم بنية الصفحة.
    </>
  ),
  Body,
  editor: {
    title: "محرر تجريبي — هيكل دلالي",
    defaultCode: `<header style="background:#eef;padding:10px">
  <h1>اسم الموقع</h1>
  <nav>الرئيسية | عنا | اتصل</nav>
</header>

<main>
  <article>
    <h2>عنوان المقال</h2>
    <p>محتوى المقال هنا...</p>
  </article>
</main>

<footer style="background:#eef;padding:10px;margin-top:10px">
  <p>© 2025 جميع الحقوق محفوظة</p>
</footer>`,
  },
  tips: [
    <>
      استخدام التاجات الدلالية يحسّن <strong>SEO</strong> والوصولية.
    </>,
    <>
      <code>&lt;main&gt;</code> يجب أن يكون <strong>مرة واحدة فقط</strong> لكل صفحة.
    </>,
    <>
      الفرق بين <code>&lt;section&gt;</code> و<code>&lt;article&gt;</code>: المقال مستقل بذاته.
    </>,
  ],
  quiz: {
    mcq: [
      {
        q: "أي تاج دلالي يستخدم لرأس الصفحة؟",
        opts: ["<top>", "<header>", "<head>", "<main>"],
        correct: 1,
        ok: "تمام! <header> = رأس الصفحة.",
        ko: "الإجابة الصحيحة: <header>.",
      },
      {
        q: "أي تاج لقائمة التنقل؟",
        opts: ["<menu>", "<nav>", "<links>", "<bar>"],
        correct: 1,
        ok: "صحيح! <nav> = navigation.",
        ko: "الإجابة الصحيحة: <nav>.",
      },
      {
        q: "أي تاج للمحتوى الأساسي للصفحة؟",
        opts: ["<body>", "<content>", "<main>", "<section>"],
        correct: 2,
        ok: "ممتاز! <main> = المحتوى الأساسي.",
        ko: "الإجابة الصحيحة: <main>.",
      },
    ],
    coding: [
      {
        prompt: "اكتب هيكلاً دلالياً بسيطاً: <header> ثم <nav> ثم <main> ثم <footer>.",
        hint: "استخدم العناصر الدلالية الأربعة بالترتيب.",
        starter: "",
        solution: "<header>الرأس</header>\n<nav>التنقل</nav>\n<main>المحتوى</main>\n<footer>الذيل</footer>",
        check: (c) => /<header\b[\s\S]*<\/header>/i.test(c)
          && /<nav\b[\s\S]*<\/nav>/i.test(c)
          && /<main\b[\s\S]*<\/main>/i.test(c)
          && /<footer\b[\s\S]*<\/footer>/i.test(c),
      },
    ],
  },
};

export default lesson;
