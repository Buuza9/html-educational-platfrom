import type { Lesson } from "@/lib/content/types";
import { Block, Bullet, CodeBlock, TagGrid, TagCard } from "@/components/lesson-content";

function Body() {
  return (
    <>
      <Block title="ما هو وسم الرأس <head>؟">
        <p>
          عنصر <code>&lt;head&gt;</code> يأتي في أعلى الصفحة قبل <code>&lt;body&gt;</code>، وهو
          يحوي <strong>معلومات عن الصفحة</strong> وليس محتوى مرئياً. أي أن ما بداخله{" "}
          <strong>لا يظهر</strong> للزائر مباشرة، لكنه مهم جداً للمتصفح ولمحركات البحث.
        </p>
        <CodeBlock>{`<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>صفحتي الأولى</title>
  <meta name="description" content="وصف مختصر عن الصفحة" />
  <link rel="stylesheet" href="style.css" />
</head>`}</CodeBlock>
      </Block>

      <Block title="أهم عناصر الرأس">
        <TagGrid>
          <TagCard
            name="<title>"
            desc={
              <>
                عنوان الصفحة. يظهر في <strong>تبويب المتصفح (Tab)</strong> وكعنوان رئيسي في{" "}
                <strong>نتائج البحث</strong>.
              </>
            }
            example={<CodeBlock small>{`<title>صفحتي الأولى</title>`}</CodeBlock>}
          />
          <TagCard
            name='<meta charset="UTF-8">'
            desc={
              <>
                يحدّد <strong>ترميز المحارف</strong>. القيمة <code>UTF-8</code> تدعم العربية وكل
                اللغات والرموز فلا تظهر الحروف مشوّهة.
              </>
            }
            example={<CodeBlock small>{`<meta charset="UTF-8" />`}</CodeBlock>}
          />
          <TagCard
            name='<meta name="viewport">'
            desc={
              <>
                يجعل الصفحة <strong>متجاوبة</strong> (Responsive) فتتكيّف مع عرض شاشة الهاتف
                بدل أن تظهر مصغّرة.
              </>
            }
            example={
              <CodeBlock small>{`<meta name="viewport"
  content="width=device-width,
  initial-scale=1.0" />`}</CodeBlock>
            }
          />
          <TagCard
            name='<meta name="description">'
            desc={
              <>
                وصف مختصر للصفحة تستخدمه <strong>محركات البحث</strong> لعرض المقتطف (Snippet) أسفل
                العنوان في النتائج.
              </>
            }
            example={
              <CodeBlock small>{`<meta name="description"
  content="وصف الصفحة" />`}</CodeBlock>
            }
          />
        </TagGrid>
      </Block>

      <Block title="الـ viewport والتجاوب">
        <p>
          الوسم <code>&lt;meta name=&quot;viewport&quot;&gt;</code> أساسي لأي صفحة حديثة.
          القيمتان المهمّتان:
        </p>
        <Bullet
          items={[
            <>
              <code>width=device-width</code> — يجعل عرض الصفحة مساوياً لعرض جهاز الزائر.
            </>,
            <>
              <code>initial-scale=1.0</code> — يضبط مستوى التكبير المبدئي على 1 (بلا تصغير).
            </>,
          ]}
        />
        <CodeBlock>{`<meta name="viewport" content="width=device-width, initial-scale=1.0" />`}</CodeBlock>
      </Block>

      <Block title="ربط ملف CSS عبر <link>">
        <p>
          نستخدم عنصر <code>&lt;link&gt;</code> داخل <code>&lt;head&gt;</code> لربط ملف تنسيق
          خارجي. الواصفة <code>rel=&quot;stylesheet&quot;</code> تحدّد نوع العلاقة،{" "}
          و<code>href</code> تحدّد مسار الملف.
        </p>
        <CodeBlock>{`<link rel="stylesheet" href="style.css" />`}</CodeBlock>
      </Block>
    </>
  );
}

const lesson: Lesson = {
  slug: "meta",
  number: 14,
  title: "وسوم الرأس و SEO",
  lead: "تعرّف على عناصر <head> غير المرئية وأساسيات تحسين الظهور في محركات البحث (SEO).",
  Body,
  editor: {
    title: "محرر تجريبي — رأس صفحة سليم",
    defaultCode: `<!DOCTYPE html>
<html lang="ar" dir="rtl">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>صفحتي الأولى</title>
    <meta name="description" content="صفحة تجريبية لتعلّم وسوم الرأس و SEO" />
  </head>
  <body>
    <h1>مرحباً</h1>
    <p>افتح تبويب المتصفح لترى نص الـ title يظهر هناك.</p>
  </body>
</html>`,
  },
  tips: [
    <>
      ما بداخل <code>&lt;head&gt;</code> لا يظهر للزائر لكنه مهم للمتصفح ومحركات البحث.
    </>,
    <>
      <code>charset=&quot;UTF-8&quot;</code> للترميز، و<code>viewport</code> للتجاوب، و
      <code>description</code> لمقتطف نتائج البحث.
    </>,
    <>
      <code>&lt;title&gt;</code> يظهر في تبويب المتصفح وكعنوان في نتائج البحث.
    </>,
  ],
  quiz: {
    mcq: [
      {
        q: "أي وسم meta يحدّد ترميز المحارف (character encoding)؟",
        opts: [
          '<meta charset="UTF-8">',
          '<meta name="viewport">',
          '<meta name="description">',
          '<meta name="charset">',
        ],
        correct: 0,
        ok: 'صحيح! <meta charset="UTF-8"> يحدّد الترميز.',
        ko: 'الإجابة الصحيحة: <meta charset="UTF-8">.',
      },
      {
        q: "أي وسم meta يجعل الصفحة متجاوبة مع شاشات الهواتف؟",
        opts: [
          '<meta name="description">',
          '<meta charset="UTF-8">',
          '<meta name="viewport">',
          '<meta name="responsive">',
        ],
        correct: 2,
        ok: "ممتاز! وسم viewport يفعّل التجاوب.",
        ko: 'الإجابة الصحيحة: <meta name="viewport">.',
      },
      {
        q: "فيمَ يُستخدم <meta name=\"description\">؟",
        opts: [
          "لتحديد لون الصفحة",
          "لعرض مقتطف عن الصفحة في محركات البحث",
          "لتحديد ترميز المحارف",
          "لربط ملف CSS",
        ],
        correct: 1,
        ok: "تمام! الوصف يظهر كمقتطف في نتائج البحث.",
        ko: "الإجابة الصحيحة: لعرض مقتطف عن الصفحة في محركات البحث.",
      },
    ],
    coding: [
      {
        prompt:
          "اكتب وسم <meta> الخاص بالـ viewport مع width=device-width و initial-scale=1.0.",
        hint: 'استخدم <meta name="viewport" content="..."> وضع القيمتين داخل content.',
        starter: "",
        solution:
          '<meta name="viewport" content="width=device-width, initial-scale=1.0" />',
        check: (c) =>
          /<meta\s+[^>]*name\s*=\s*["']viewport["'][^>]*content\s*=\s*["'][^"']*width\s*=\s*device-width[^"']*initial-scale\s*=\s*1(\.0)?[^"']*["'][^>]*>/i.test(
            c
          ),
      },
    ],
  },
};

export default lesson;
