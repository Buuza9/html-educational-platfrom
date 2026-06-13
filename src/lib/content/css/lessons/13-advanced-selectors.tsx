import type { Lesson } from "@/lib/content/types";
import { Block, Bullet, CodeBlock, TagGrid, TagCard } from "@/components/lesson-content";

function Body() {
  return (
    <>
      <Block title="ما هي المحدِّدات المتقدمة؟">
        <p>
          تعلّمنا سابقاً التحديد بالاسم (مثل <code>p</code>) وبالفئة (مثل{" "}
          <code>.box</code>). لكن CSS تتيح طرقاً أقوى لاستهداف عناصر بدقّة حسب{" "}
          <strong>موقعها</strong> أو <strong>علاقتها</strong> بعناصر أخرى أو{" "}
          <strong>حالتها</strong>. هذه هي المحدِّدات المتقدمة، وهي أساس كتابة CSS
          نظيف بدون فئات كثيرة.
        </p>
      </Block>

      <Block title="التحديد المجمَّع والعلاقات بين العناصر">
        <TagGrid>
          <TagCard
            name="h1, h2"
            desc="تجميع: تطبيق نفس التنسيق على أكثر من محدِّد، نفصل بينها بفاصلة."
            example={<CodeBlock small>{`h1, h2 {
  color: navy;
}`}</CodeBlock>}
          />
          <TagCard
            name="div p"
            desc={
              <>
                الأحفاد (descendant): كل <code>p</code> داخل <code>div</code> مهما
                كان عمق التداخل.
              </>
            }
            example={<CodeBlock small>{`div p {
  color: gray;
}`}</CodeBlock>}
          />
          <TagCard
            name="ul > li"
            desc={
              <>
                الأبناء المباشرون (child): فقط <code>li</code> التي هي ابن مباشر لـ{" "}
                <code>ul</code>، وليس الأحفاد الأعمق.
              </>
            }
            example={<CodeBlock small>{`ul > li {
  font-weight: bold;
}`}</CodeBlock>}
          />
          <TagCard
            name="h2 + p"
            desc={
              <>
                الشقيق المجاور (adjacent sibling): فقرة <code>p</code> الأولى التي
                تأتي <strong>مباشرة بعد</strong> <code>h2</code>.
              </>
            }
            example={<CodeBlock small>{`h2 + p {
  margin-top: 0;
}`}</CodeBlock>}
          />
        </TagGrid>
      </Block>

      <Block title="التحديد حسب الواصفة (Attribute selectors)">
        <p>
          يمكننا استهداف العناصر حسب قيمة واصفة معيّنة باستخدام أقواس مربّعة. مفيد
          جداً مع حقول الإدخال:
        </p>
        <CodeBlock>{`input[type="text"] {
  border: 1px solid #ccc;
}

input[type="password"] {
  background: #fff8e1;
}`}</CodeBlock>
        <p>
          هنا أوّل قاعدة تطبَّق فقط على <code>&lt;input type=&quot;text&quot;&gt;</code>،
          والثانية على حقول كلمة المرور فقط.
        </p>
      </Block>

      <Block title="الفئات الزائفة (Pseudo-classes)">
        <p>
          تستهدف <strong>حالة</strong> العنصر أو <strong>موقعه</strong> بين أشقائه،
          وتُكتب بنقطة واحدة <code>:</code>.
        </p>
        <Bullet
          items={[
            <>
              <code>:hover</code> — عند مرور مؤشّر الفأرة فوق العنصر.
            </>,
            <>
              <code>:first-child</code> — العنصر إن كان الابن الأوّل لأبيه.
            </>,
            <>
              <code>:last-child</code> — العنصر إن كان الابن الأخير لأبيه.
            </>,
            <>
              <code>:nth-child(n)</code> — العنصر رقم <code>n</code> بين أشقائه (مثل{" "}
              <code>:nth-child(2)</code>، أو <code>:nth-child(odd)</code> للفردية،{" "}
              <code>:nth-child(even)</code> للزوجية).
            </>,
          ]}
        />
        <CodeBlock>{`a:hover { color: red; }
li:first-child { color: green; }
li:nth-child(2) { background: #eee; }`}</CodeBlock>
      </Block>

      <Block title="العناصر الزائفة (Pseudo-elements)">
        <p>
          تنشئ جزءاً <strong>افتراضياً</strong> داخل العنصر، وتُكتب بنقطتين{" "}
          <code>::</code>. أشهرها <code>::before</code> و<code>::after</code>،
          ويجب أن تحملا الخاصّية <code>content</code>:
        </p>
        <CodeBlock>{`li::before {
  content: "✔ ";
  color: green;
}`}</CodeBlock>
        <p>
          هذا يُدرج العلامة <code>✔</code> قبل محتوى كل <code>li</code> دون كتابتها
          في HTML. و<code>::after</code> يُدرج بعد المحتوى بنفس الطريقة.
        </p>
      </Block>
    </>
  );
}

const lesson: Lesson = {
  slug: "advanced-selectors",
  number: 13,
  title: "المحدِّدات المتقدمة",
  lead: "استهداف العناصر بدقّة حسب علاقتها وموقعها وحالتها: التجميع، الأبناء، الأشقاء، الفئات والعناصر الزائفة.",
  Body,
  editor: {
    title: "محرر تجريبي — المحدِّدات المتقدمة",
    defaultCode: `<style>
  ul > li {
    padding: 6px;
    font-size: 18px;
  }
  li:first-child {
    color: green;
    font-weight: bold;
  }
  li:nth-child(even) {
    background: #eee;
  }
  li::before {
    content: "★ ";
    color: orange;
  }
</style>

<ul>
  <li>العنصر الأول</li>
  <li>العنصر الثاني</li>
  <li>العنصر الثالث</li>
  <li>العنصر الرابع</li>
</ul>`,
  },
  tips: [
    <>
      <code>div &gt; p</code> تستهدف الأبناء المباشرين فقط، أمّا <code>div p</code>{" "}
      فتستهدف كل الأحفاد.
    </>,
    <>
      <code>:hover</code> تُفعَّل عند مرور الفأرة، و<code>:nth-child(n)</code> تحدّد
      حسب الترتيب.
    </>,
    <>
      <code>::before</code> و<code>::after</code> لا تعملان بدون الخاصّية{" "}
      <code>content</code>.
    </>,
  ],
  quiz: {
    mcq: [
      {
        q: "ماذا يحدّد المحدِّد div > p ؟",
        opts: [
          "كل عنصر p داخل div مهما كان عمقه",
          "فقط عناصر p التي هي ابن مباشر لـ div",
          "العنصر p الذي يأتي بعد div",
          "كل عنصر div داخل p",
        ],
        correct: 1,
        ok: "صحيح! العلامة > تعني الأبناء المباشرين فقط.",
        ko: "الإجابة الصحيحة: فقط عناصر p التي هي ابن مباشر لـ div.",
      },
      {
        q: "أي فئة زائفة تُطبَّق عند مرور مؤشّر الفأرة فوق العنصر؟",
        opts: [":first-child", ":hover", ":nth-child(1)", "::before"],
        correct: 1,
        ok: "تمام! :hover تعمل عند مرور الفأرة.",
        ko: "الإجابة الصحيحة: :hover.",
      },
      {
        q: "ماذا يفعل العنصر الزائف ::before ؟",
        opts: [
          "يحذف محتوى العنصر",
          "يُدرج محتوى افتراضياً قبل محتوى العنصر",
          "يلوّن أوّل ابن للعنصر",
          "يخفي العنصر عند تحميل الصفحة",
        ],
        correct: 1,
        ok: "ممتاز! ::before يُدرج محتوى (content) قبل محتوى العنصر.",
        ko: "الإجابة الصحيحة: يُدرج محتوى افتراضياً قبل محتوى العنصر.",
      },
    ],
    coding: [
      {
        prompt:
          "اكتب قاعدة CSS تستهدف عناصر li التي هي أبناء مباشرون لـ ul، وتجعل لون نصّها أزرق (blue). استخدم المحدِّد ul > li.",
        hint: "الشكل: ul > li { color: blue; }",
        starter: "<style>\n  \n</style>",
        solution: "<style>\n  ul > li {\n    color: blue;\n  }\n</style>",
        check: (c) => /ul\s*>\s*li\s*\{[^}]*color\s*:\s*blue\b/i.test(c),
      },
    ],
  },
};

export default lesson;
