import type { Lesson } from "@/lib/content/types";
import { Block, CodeBlock, TagGrid, TagCard } from "@/components/lesson-content";

function Body() {
  return (
    <>
      <Block title="العناوين (Headings)">
        <p>
          في HTML لدينا <strong>ستة مستويات</strong> من العناوين، من{" "}
          <code>&lt;h1&gt;</code> (الأكبر والأهم) إلى <code>&lt;h6&gt;</code>{" "}
          (الأصغر).
        </p>
        <CodeBlock>{`<h1>عنوان رئيسي</h1>
<h2>عنوان فرعي</h2>
<h3>عنوان أصغر</h3>`}</CodeBlock>
      </Block>

      <TagGrid>
        <TagCard
          name={<>&lt;p&gt;</>}
          desc={
            <>
              يُستخدم لكتابة <strong>فقرة نصية</strong>. كل <code>&lt;p&gt;</code>{" "}
              يأتي في سطر جديد ويترك مسافة قبله وبعده.
            </>
          }
          when="لأي نص عادي على شكل فقرة."
          example={<CodeBlock small>{`<p>أحب تعلّم البرمجة.</p>`}</CodeBlock>}
        />

        <TagCard
          name={<>&lt;br&gt;</>}
          desc={
            <>
              يُستخدم <strong>للنزول إلى سطر جديد</strong> داخل النص. تاج{" "}
              <em>مفرد</em> (لا يحتاج إغلاق).
            </>
          }
          when="عند الحاجة إلى كسر السطر داخل فقرة (مثل العناوين البريدية أو الشعر)."
          example={<CodeBlock small>{`السطر الأول<br>السطر الثاني`}</CodeBlock>}
        />

        <TagCard
          name={<>&lt;i&gt;</>}
          desc={
            <>
              يجعل النص <strong>مائلاً (Italic)</strong>. غالباً يُستخدم لإبراز
              كلمة أجنبية أو مصطلح.
            </>
          }
          when="للتمييز البصري للنص دون تغيير معناه."
          example={<CodeBlock small>{`كلمة <i>مائلة</i> هنا`}</CodeBlock>}
        />

        <TagCard
          name={<>&lt;u&gt;</>}
          desc={
            <>
              يضع <strong>خطاً تحت النص (Underline)</strong>.
            </>
          }
          when="لإبراز كلمة بالخط السفلي. (تجنّب استخدامه على نصوص ليست روابط لتفادي التشويش.)"
          example={<CodeBlock small>{`كلمة <u>مهمة</u> جداً`}</CodeBlock>}
        />

        <TagCard
          name={
            <>
              &lt;b&gt; / &lt;strong&gt;
            </>
          }
          desc={
            <>
              يجعل النص <strong>غامقاً (Bold)</strong>. الفرق:{" "}
              <code>&lt;strong&gt;</code> يدل على أهمية النص دلالياً.
            </>
          }
          when="لتمييز كلمة مهمة في الجملة."
          example={<CodeBlock small>{`هذا <b>مهم</b> جداً`}</CodeBlock>}
        />

        <TagCard
          name={<>&lt;hr&gt;</>}
          desc={
            <>
              يرسم <strong>خطاً أفقياً</strong> فاصلاً. تاج مفرد بدون إغلاق.
            </>
          }
          when="للفصل بين أقسام مختلفة في الصفحة."
          example={<CodeBlock small>{`قسم 1<hr>قسم 2`}</CodeBlock>}
        />
      </TagGrid>
    </>
  );
}

const lesson: Lesson = {
  slug: "text",
  number: 3,
  title: "التعامل مع النصوص",
  lead: (
    <>
      تاجات النصوص الأساسية: <code>&lt;p&gt;</code>, <code>&lt;br&gt;</code>,{" "}
      <code>&lt;i&gt;</code>, <code>&lt;u&gt;</code>, والعناوين{" "}
      <code>&lt;h1&gt;</code> إلى <code>&lt;h6&gt;</code>.
    </>
  ),
  Body,
  editor: {
    title: "محرر تجريبي — تنسيق النصوص",
    defaultCode: `<h1>عنوان رئيسي</h1>
<h2>عنوان فرعي</h2>

<p>هذه فقرة عادية فيها كلمة <b>غامقة</b>،
وكلمة <i>مائلة</i>، وكلمة <u>تحتها خط</u>.</p>

<p>السطر الأول<br>السطر الثاني بعد كسر السطر</p>

<hr>

<p>فقرة جديدة بعد الفاصل.</p>`,
  },
  tips: [
    <>
      <code>&lt;br&gt;</code> تاج <strong>مفرد</strong> ولا يحتاج إغلاق.
    </>,
    <>
      لا يجوز استخدام أكثر من <code>&lt;h1&gt;</code> واحد للصفحة بشكل عام.
    </>,
    <>
      <code>&lt;i&gt;</code> = مائل، <code>&lt;u&gt;</code> = تحته خط،{" "}
      <code>&lt;b&gt;</code> = غامق.
    </>,
    <>
      المسافات الزائدة وأسطر الفراغ في الكود لا تظهر في المتصفح — استخدم{" "}
      <code>&lt;br&gt;</code> أو <code>&lt;p&gt;</code>.
    </>,
  ],
  quiz: {
    mcq: [
      {
        q: "أي تاج يجعل النص مائلاً؟",
        opts: ["<b>", "<i>", "<u>", "<em>"],
        correct: 1,
        ok: "ممتاز! <i> = italic.",
        ko: "الإجابة الصحيحة: <i>.",
      },
      {
        q: "أي تاج يضع خطاً تحت النص؟",
        opts: ["<u>", "<i>", "<s>", "<line>"],
        correct: 0,
        ok: "صحيح! <u> = underline.",
        ko: "الإجابة الصحيحة: <u>.",
      },
      {
        q: "كيف ننزل سطراً جديداً داخل فقرة؟",
        opts: ["<newline>", "<br>", "<break>", "<lb>"],
        correct: 1,
        ok: "صح! <br> = break line.",
        ko: "الإجابة الصحيحة: <br>.",
      },
      {
        q: "أي عنوان هو الأكبر حجماً؟",
        opts: ["<h6>", "<h3>", "<h1>", "<head>"],
        correct: 2,
        ok: "تمام! <h1> هو الأكبر والأهم.",
        ko: "الإجابة الصحيحة: <h1>.",
      },
    ],
    coding: [
      {
        prompt: 'اكتب عنواناً رئيسياً بالنص "موقعي" ثم فقرة فيها كلمة مائلة باستخدام <i>.',
        hint: "استخدم <h1> للعنوان و<i> للجزء المائل.",
        starter: "",
        solution: "<h1>موقعي</h1>\n<p>هذه <i>كلمة</i> مائلة.</p>",
        check: (c) => /<h1\b[^>]*>\s*موقعي\s*<\/h1>/.test(c) && /<i\b[^>]*>[\s\S]*?<\/i>/.test(c),
      },
      {
        prompt: "اكتب فقرة تحتوي على سطرين منفصلين باستخدام <br>.",
        hint: "<br> ذاتي الإغلاق ولا يحتاج لإغلاق.",
        starter: "",
        solution: "<p>السطر الأول<br>السطر الثاني</p>",
        check: (c) => /<p\b[^>]*>[\s\S]*<br\s*\/?>[\s\S]*<\/p>/i.test(c),
      },
    ],
  },
};

export default lesson;
