import type { Lesson } from "@/lib/content/types";
import { Block, CodeBlock, TagGrid, TagCard } from "@/components/lesson-content";

function Body() {
  return (
    <>
      <Block title="الهيكل العام لأي صفحة HTML">
        <p>أي صفحة HTML احترافية تتكوّن من نفس الهيكل العام التالي:</p>
        <CodeBlock>{`<!DOCTYPE html>
<html>
  <head>
    <title>عنوان الصفحة</title>
  </head>
  <body>
    <!-- محتوى الصفحة هنا -->
  </body>
</html>`}</CodeBlock>
      </Block>

      <TagGrid>
        <TagCard
          name="<head>"
          desc={
            <>
              يحتوي على <strong>معلومات عن الصفحة</strong> ولا تظهر للمستخدم مباشرة، مثل العنوان
              والروابط الخارجية وملفات التنسيق.
            </>
          }
          when={
            <>
              دائماً — في كل صفحة HTML، يأتي قبل <code>&lt;body&gt;</code>.
            </>
          }
          example={
            <CodeBlock small>{`<head>
  <title>صفحتي</title>
</head>`}</CodeBlock>
          }
        />

        <TagCard
          name="<title>"
          desc={
            <>
              يحدّد <strong>عنوان الصفحة</strong> الذي يظهر في تبويب المتصفح وفي نتائج البحث في
              Google.
            </>
          }
          when={
            <>
              داخل <code>&lt;head&gt;</code>، مرة واحدة لكل صفحة.
            </>
          }
          example={<CodeBlock small>{`<title>متجر الكتب</title>`}</CodeBlock>}
        />

        <TagCard
          name="<body>"
          desc={
            <>
              يحتوي على <strong>المحتوى الظاهر</strong> للمستخدم: النصوص، الصور، الأزرار، الروابط،
              وكل ما تراه في الصفحة.
            </>
          }
          when={
            <>
              في كل صفحة، يأتي بعد <code>&lt;head&gt;</code>.
            </>
          }
          example={
            <CodeBlock small>{`<body>
  <h1>مرحباً</h1>
</body>`}</CodeBlock>
          }
        />

        <TagCard
          name="<html>"
          desc={
            <>
              العنصر <strong>الجذري</strong> الذي يحتوي كل عناصر الصفحة. يأتي بعد{" "}
              <code>&lt;!DOCTYPE html&gt;</code> مباشرة.
            </>
          }
          when="دائماً، مرة واحدة كحاوية أساسية للصفحة."
          example={
            <CodeBlock small>{`<html>
  <head>...</head>
  <body>...</body>
</html>`}</CodeBlock>
          }
        />
      </TagGrid>
    </>
  );
}

const lesson: Lesson = {
  slug: "structure",
  number: 2,
  title: "هيكل الصفحة الأساسي",
  lead: (
    <>
      التعرّف على التاجات الأساسية: <code>&lt;html&gt;</code>, <code>&lt;head&gt;</code>,{" "}
      <code>&lt;title&gt;</code>, <code>&lt;body&gt;</code>.
    </>
  ),
  Body,
  editor: {
    title: "محرر تجريبي — هيكل صفحة كامل",
    defaultCode: `<!DOCTYPE html>
<html>
  <head>
    <title>صفحتي الأولى</title>
  </head>
  <body>
    <h1>أهلاً وسهلاً</h1>
    <p>انظر إلى تبويب المتصفح بالأعلى لترى عنوان الصفحة.</p>
  </body>
</html>`,
  },
  tips: [
    <>
      <code>&lt;head&gt;</code> لا يظهر للمستخدم، بينما <code>&lt;body&gt;</code> يظهر.
    </>,
    <>
      <code>&lt;title&gt;</code> يجب أن يكون داخل <code>&lt;head&gt;</code>.
    </>,
    <>
      كل صفحة لها <code>&lt;body&gt;</code> واحد فقط.
    </>,
  ],
  quiz: {
    mcq: [
      {
        q: 'أي تاج يحتوي على المحتوى الظاهر للمستخدم؟',
        opts: ['<head>', '<title>', '<body>', '<html>'],
        correct: 2,
        ok: 'صحيح! <body> يحتوي المحتوى الظاهر.',
        ko: 'الإجابة الصحيحة: <body>.'
      },
      {
        q: 'أين يجب أن نضع تاج <title>؟',
        opts: ['داخل <body>', 'خارج <html>', 'داخل <head>', 'في أي مكان'],
        correct: 2,
        ok: 'تمام! <title> يكون داخل <head>.',
        ko: 'الإجابة الصحيحة: داخل <head>.'
      },
      {
        q: 'ما هو أول تاج عادة في صفحة HTML؟',
        opts: ['<html>', '<!DOCTYPE html>', '<body>', '<head>'],
        correct: 1,
        ok: 'صح! <!DOCTYPE html> يأتي في الأول.',
        ko: 'الإجابة الصحيحة: <!DOCTYPE html>.'
      }
    ],
    coding: [
      {
        prompt: 'اكتب هيكل صفحة HTML كامل (DOCTYPE، html، head فيها title، body).',
        hint: 'تذكّر <!DOCTYPE html> ثم <html> يحتوي <head> و <body>.',
        starter: '',
        solution: '<!DOCTYPE html>\n<html>\n  <head>\n    <title>صفحتي</title>\n  </head>\n  <body>\n    <h1>مرحباً</h1>\n  </body>\n</html>',
        check: (c) => /<!doctype\s+html>/i.test(c)
          && /<html\b[\s\S]*<\/html>/i.test(c)
          && /<head\b[\s\S]*<title\b[\s\S]*<\/title>[\s\S]*<\/head>/i.test(c)
          && /<body\b[\s\S]*<\/body>/i.test(c)
      }
    ]
  },
};

export default lesson;
