import type { Lesson } from "@/lib/content/types";
import { Block, Bullet, CodeBlock, TagGrid, TagCard } from "@/components/lesson-content";

function Body() {
  return (
    <>
      <Block title="نوعان من العناصر">
        <p>
          تنقسم عناصر HTML من حيث طريقة عرضها في الصفحة إلى نوعين: عناصر{" "}
          <strong>كتلية (Block)</strong> وعناصر <strong>سطرية (Inline)</strong>. فهم الفرق
          بينهما مهم جداً، لأنه يحدد كيف تترتّب العناصر بجانب بعضها أو تحت بعضها على الصفحة.
        </p>
      </Block>

      <Block title="العناصر الكتلية (Block)">
        <p>
          العنصر الكتلي يبدأ دائماً في <strong>سطر جديد</strong>، ويأخذ{" "}
          <strong>كامل عرض</strong> السطر المتاح له (من الحافة إلى الحافة)، فيدفع العنصر الذي
          بعده إلى الأسفل. من أشهر العناصر الكتلية:
        </p>
        <Bullet
          items={[
            <>
              <code>&lt;p&gt;</code> الفقرة.
            </>,
            <>
              <code>&lt;div&gt;</code> الحاوية العامة.
            </>,
            <>
              العناوين <code>&lt;h1&gt;</code> حتى <code>&lt;h6&gt;</code>.
            </>,
            <>
              القوائم <code>&lt;ul&gt;</code> وعناصرها <code>&lt;li&gt;</code>.
            </>,
          ]}
        />
        <CodeBlock>{`<p>فقرة أولى</p>
<p>فقرة ثانية</p>`}</CodeBlock>
        <p>
          هاتان الفقرتان تظهران كلٌّ منهما في سطر مستقل، حتى لو كان فيهما متّسع لتكونا بجانب
          بعضهما.
        </p>
      </Block>

      <Block title="العناصر السطرية (Inline)">
        <p>
          العنصر السطري <strong>لا يبدأ</strong> في سطر جديد، ويأخذ فقط{" "}
          <strong>العرض الذي يحتاجه محتواه</strong>، فيتدفّق ضمن السطر بجانب النص والعناصر
          السطرية الأخرى. من أشهرها:
        </p>
        <Bullet
          items={[
            <>
              <code>&lt;span&gt;</code> الحاوية السطرية العامة.
            </>,
            <>
              <code>&lt;a&gt;</code> الرابط.
            </>,
            <>
              <code>&lt;strong&gt;</code> و<code>&lt;em&gt;</code> لتمييز النص.
            </>,
            <>
              <code>&lt;img&gt;</code> الصورة.
            </>,
          ]}
        />
        <CodeBlock>{`<p>هذه فقرة فيها <strong>كلمة مهمة</strong> داخل السطر.</p>`}</CodeBlock>
        <p>
          هنا <code>&lt;strong&gt;</code> سطري، فلا يكسر السطر بل يبقى ضمن الفقرة.
        </p>
      </Block>

      <Block title="‎<div>‎ مقابل ‎<span>‎">
        <p>
          العنصران <code>&lt;div&gt;</code> و<code>&lt;span&gt;</code> ليس لهما أي معنى أو
          تنسيق خاص بذاتهما؛ هما مجرّد <strong>حاويتين عامّتين</strong> نستخدمهما لتجميع المحتوى
          وربطه بتنسيقات CSS أو تنظيم بنية الصفحة.
        </p>
        <TagGrid>
          <TagCard
            name="<div>"
            desc={
              <>
                حاوية <strong>كتلية</strong> عامّة. نضع داخلها مجموعة عناصر لنتعامل معها ككتلة
                واحدة.
              </>
            }
            when={
              <>
                لتقسيم الصفحة إلى أقسام كبيرة (رأس، محتوى، تذييل) وربطها بـ CSS.
              </>
            }
            example={<CodeBlock small>{`<div class="card">
  ...
</div>`}</CodeBlock>}
          />
          <TagCard
            name="<span>"
            desc={
              <>
                حاوية <strong>سطرية</strong> عامّة. نلفّ بها جزءاً صغيراً من النص داخل السطر.
              </>
            }
            when={
              <>
                لتمييز <strong>كلمة أو جزء</strong> من نص (مثل تلوينها) دون كسر السطر.
              </>
            }
            example={<CodeBlock small>{`النص <span class="hi">مميّز</span> هنا`}</CodeBlock>}
          />
        </TagGrid>
      </Block>
    </>
  );
}

const lesson: Lesson = {
  slug: "block-inline",
  number: 12,
  title: "العناصر الكتلية والسطرية",
  lead: "الفرق بين العناصر الكتلية (Block) والسطرية (Inline)، واستخدام <div> و<span> كحاويتين عامّتين.",
  Body,
  editor: {
    title: "محرر تجريبي — Block مقابل Inline",
    defaultCode: `<style>
  .box {
    background-color: #e8f0fe;
    padding: 10px;
  }
  .hi {
    background-color: #cf1a11;
    color: white;
    padding: 2px 6px;
  }
</style>

<div class="box">
  هذا <span class="hi">span سطري</span> يبقى داخل السطر،
  بينما الـ div حوله كتلي يأخذ كامل العرض.
</div>
<div class="box">div ثانٍ يبدأ في سطر جديد.</div>`,
  },
  tips: [
    <>
      العنصر <strong>الكتلي</strong> يبدأ سطراً جديداً ويأخذ كامل العرض (مثل{" "}
      <code>&lt;p&gt;</code> و<code>&lt;div&gt;</code>).
    </>,
    <>
      العنصر <strong>السطري</strong> يتدفّق ضمن السطر بعرض محتواه (مثل{" "}
      <code>&lt;span&gt;</code> و<code>&lt;a&gt;</code>).
    </>,
    <>
      <code>&lt;div&gt;</code> حاوية كتلية عامّة و<code>&lt;span&gt;</code> حاوية سطرية عامّة،
      كلاهما لربط CSS وتنظيم البنية.
    </>,
  ],
  quiz: {
    mcq: [
      {
        q: "أيٌّ من العناصر التالية عنصر كتلي (Block)؟",
        opts: ["<span>", "<a>", "<div>", "<strong>"],
        correct: 2,
        ok: "صحيح! <div> عنصر كتلي يبدأ في سطر جديد.",
        ko: "الإجابة الصحيحة: <div> عنصر كتلي.",
      },
      {
        q: "أيٌّ من العناصر التالية عنصر سطري (Inline)؟",
        opts: ["<p>", "<span>", "<div>", "<h1>"],
        correct: 1,
        ok: "تمام! <span> عنصر سطري يتدفّق ضمن السطر.",
        ko: "الإجابة الصحيحة: <span> عنصر سطري.",
      },
      {
        q: "ما الفرق بين <div> و<span>؟",
        opts: [
          "<div> حاوية كتلية و<span> حاوية سطرية",
          "<div> سطري و<span> كتلي",
          "كلاهما يبدأ سطراً جديداً",
          "لا فرق بينهما إطلاقاً",
        ],
        correct: 0,
        ok: "ممتاز! <div> كتلية و<span> سطرية، وكلاهما حاوية عامّة.",
        ko: "الإجابة الصحيحة: <div> حاوية كتلية و<span> حاوية سطرية.",
      },
    ],
    coding: [
      {
        prompt: 'اكتب فقرة فيها النص "أهلاً يا عالم" بحيث تكون كلمة "عالم" ملفوفة داخل <span>.',
        hint: "ضع <span> ... </span> حول كلمة عالم داخل تاج <p>.",
        starter: "<p>أهلاً يا </p>",
        solution: "<p>أهلاً يا <span>عالم</span></p>",
        check: (c) => /<p\b[^>]*>[^<]*<span\b[^>]*>\s*عالم\s*<\/span>[^<]*<\/p>/i.test(c),
      },
    ],
  },
};

export default lesson;
