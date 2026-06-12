import type { Lesson } from "@/lib/content/types";
import { Block, Bullet, CodeBlock, TagGrid, TagCard } from "@/components/lesson-content";

function Body() {
  return (
    <>
      <Block title="ما هي التعليقات (Comments)؟">
        <p>
          <strong>التعليق</strong> هو نص نكتبه داخل ملف HTML لكن المتصفح{" "}
          <strong>يتجاهله</strong> ولا يعرضه على الصفحة. نستخدمه لكتابة ملاحظات لأنفسنا أو
          لشرح أجزاء الكود أو لإيقاف جزء من الكود مؤقتاً.
        </p>
        <p>
          يُكتب التعليق بين <code>&lt;!--</code> و <code>--&gt;</code>، وكل ما بينهما لا يظهر
          في الصفحة.
        </p>
        <CodeBlock>{`<!-- هذا تعليق لن يظهر في الصفحة -->
<p>هذه فقرة ستظهر للزائر</p>

<!-- يمكن أن يمتد التعليق
على أكثر من سطر -->`}</CodeBlock>
      </Block>

      <Block title="لماذا نستخدم التعليقات؟">
        <Bullet
          items={[
            "لكتابة ملاحظات تشرح الكود لنا أو لمن يقرأه بعدنا.",
            <>
              لتقسيم الصفحة إلى أقسام واضحة، مثل{" "}
              <code>&lt;!-- بداية القائمة --&gt;</code>.
            </>,
            "لإخفاء جزء من الكود مؤقتاً دون حذفه (نضعه داخل تعليق).",
          ]}
        />
      </Block>

      <Block title="الرموز الخاصة (HTML Entities)">
        <p>
          بعض الرموز لها معنى خاص في HTML، مثل <code>&lt;</code> و <code>&gt;</code> اللذين
          يُستخدمان لكتابة التاجات. لو أردنا{" "}
          <strong>عرض هذه الرموز كنص عادي</strong> على الصفحة، نستخدم{" "}
          <strong>الرموز الخاصة (Entities)</strong>. يبدأ كل رمز بعلامة <code>&amp;</code>{" "}
          وينتهي بفاصلة منقوطة <code>;</code>.
        </p>
        <TagGrid>
          <TagCard
            name="&lt;"
            desc={
              <>
                يعرض علامة أصغر من <strong>&lt;</strong>.
              </>
            }
            example={<CodeBlock small>{`5 &lt; 10`}</CodeBlock>}
          />
          <TagCard
            name="&gt;"
            desc={
              <>
                يعرض علامة أكبر من <strong>&gt;</strong>.
              </>
            }
            example={<CodeBlock small>{`10 &gt; 5`}</CodeBlock>}
          />
          <TagCard
            name="&amp;"
            desc={
              <>
                يعرض علامة <strong>&amp;</strong> (Ampersand).
              </>
            }
            example={<CodeBlock small>{`HTML &amp; CSS`}</CodeBlock>}
          />
          <TagCard
            name="&quot;"
            desc={
              <>
                يعرض علامة الاقتباس المزدوجة <strong>&quot;</strong>.
              </>
            }
            example={<CodeBlock small>{`&quot;مرحباً&quot;`}</CodeBlock>}
          />
          <TagCard
            name="&nbsp;"
            desc="مسافة غير قابلة للكسر؛ تضيف فراغاً ثابتاً يبقى ولا يُدمَج مع غيره، ويمنع نزول الكلمتين على سطرين."
            example={<CodeBlock small>{`أحمد&nbsp;علي`}</CodeBlock>}
          />
          <TagCard
            name="&copy;"
            desc={
              <>
                يعرض رمز حقوق النشر <strong>&copy;</strong> (Copyright).
              </>
            }
            example={<CodeBlock small>{`&copy; 2026`}</CodeBlock>}
          />
        </TagGrid>
      </Block>

      <Block title="مثال عملي">
        <p>
          لو أردنا أن نُظهر للزائر نص التاج <code>&lt;p&gt;</code> كما هو دون أن يفهمه المتصفح
          كتاج، نكتبه بالرموز الخاصة:
        </p>
        <CodeBlock>{`<p>لكتابة فقرة نستخدم &lt;p&gt; ... &lt;/p&gt;</p>
<p>&copy; 2026 جميع الحقوق محفوظة</p>`}</CodeBlock>
      </Block>
    </>
  );
}

const lesson: Lesson = {
  slug: "comments",
  number: 11,
  title: "التعليقات والرموز الخاصة",
  lead: "كيف نكتب تعليقات يتجاهلها المتصفح، ونعرض الرموز الخاصة مثل < و > و © على الصفحة.",
  Body,
  editor: {
    title: "محرر تجريبي — التعليقات والرموز الخاصة",
    defaultCode: `<!-- هذا تعليق لن يظهر في الصفحة -->
<h1>صفحتي الأولى</h1>

<p>لكتابة فقرة نستخدم &lt;p&gt; ... &lt;/p&gt;</p>
<p>HTML &amp; CSS معاً</p>
<p>&quot;مرحباً بالعالم&quot;</p>
<p>أحمد&nbsp;علي</p>
<p>&copy; 2026 جميع الحقوق محفوظة</p>`,
  },
  tips: [
    <>
      التعليق يُكتب بين <code>&lt;!--</code> و <code>--&gt;</code> ولا يظهر للزائر.
    </>,
    <>
      <code>&amp;lt;</code> تعرض <code>&lt;</code> و<code>&amp;gt;</code> تعرض{" "}
      <code>&gt;</code>.
    </>,
    <>
      <code>&amp;nbsp;</code> مسافة غير قابلة للكسر تمنع نزول الكلمتين على سطرين.
    </>,
  ],
  quiz: {
    mcq: [
      {
        q: "كيف نكتب تعليقاً (comment) في HTML؟",
        opts: [
          "// تعليق",
          "<!-- تعليق -->",
          "/* تعليق */",
          "<comment> تعليق </comment>",
        ],
        correct: 1,
        ok: "صحيح! التعليق يُكتب بين <!-- و -->.",
        ko: "الإجابة الصحيحة: <!-- تعليق -->.",
      },
      {
        q: "أي رمز خاص يعرض علامة أصغر من ( < ) على الصفحة؟",
        opts: ["&gt;", "&amp;", "&lt;", "&nbsp;"],
        correct: 2,
        ok: "ممتاز! &lt; تعرض علامة أصغر من <.",
        ko: "الإجابة الصحيحة: &lt;.",
      },
      {
        q: "ما فائدة الرمز الخاص &nbsp;؟",
        opts: [
          "يضيف سطراً جديداً",
          "يضيف مسافة غير قابلة للكسر تمنع نزول الكلمتين على سطرين",
          "يعرض علامة &",
          "يكتب تعليقاً مخفياً",
        ],
        correct: 1,
        ok: "تمام! &nbsp; مسافة ثابتة لا تنكسر.",
        ko: "الإجابة الصحيحة: مسافة غير قابلة للكسر.",
      },
    ],
    coding: [
      {
        prompt: 'اكتب تعليق HTML يحتوي على النص: "ملاحظة".',
        hint: "ضع النص بين <!-- و -->.",
        starter: "",
        solution: "<!-- ملاحظة -->",
        check: (c) => /<!--[\s\S]*ملاحظة[\s\S]*-->/.test(c),
      },
    ],
  },
};

export default lesson;
