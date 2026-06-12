import type { Lesson } from "@/lib/content/types";
import { Block, Bullet, CodeBlock, TagGrid, TagCard } from "@/components/lesson-content";

function Body() {
  return (
    <>
      <Block title="ما هي شبكة Grid؟">
        <p>
          <strong>Grid</strong> هي نظام تخطيط (Layout) في CSS يقسّم العنصر الحاوي إلى{" "}
          <strong>صفوف وأعمدة</strong>، فنحصل على شبكة ثنائية الأبعاد نرتّب داخلها العناصر. نفعّلها
          بكتابة <code>display: grid</code> على العنصر <strong>الحاوي (Container)</strong>، فتتحوّل
          أبناؤه المباشرون إلى <strong>عناصر شبكية</strong> تتوزّع تلقائياً في خلايا الشبكة.
        </p>
        <CodeBlock>{`.container {
  display: grid;
}`}</CodeBlock>
      </Block>

      <Block title="Grid مقابل Flexbox">
        <p>
          الفرق الأساسي بسيط:
        </p>
        <Bullet
          items={[
            <>
              <strong>Flexbox</strong> أحادي البعد (1D): يرتّب العناصر في{" "}
              <strong>اتجاه واحد</strong> — صف أو عمود.
            </>,
            <>
              <strong>Grid</strong> ثنائي البعد (2D): يتحكّم في{" "}
              <strong>الصفوف والأعمدة معاً</strong> في الوقت نفسه.
            </>,
          ]}
        />
        <p>
          لذلك نختار Grid عندما نريد تخطيطاً كاملاً للصفحة بصفوف وأعمدة، ونختار Flexbox لترتيب عناصر
          على خط واحد.
        </p>
      </Block>

      <Block title="تحديد الأعمدة بـ grid-template-columns">
        <p>
          نحدّد عدد الأعمدة وعرضها عبر الخاصية <code>grid-template-columns</code>. نكتب قيمة لكل
          عمود، والوحدة الأشهر هنا هي <strong>fr</strong> (اختصار <em>fraction</em>) التي تعني{" "}
          <strong>جزءاً من المساحة المتاحة</strong>.
        </p>
        <CodeBlock>{`.container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}`}</CodeBlock>
        <p>
          المثال أعلاه ينشئ <strong>ثلاثة أعمدة متساوية</strong>؛ كل عمود يأخذ جزءاً (<code>1fr</code>
          ) من المساحة الفارغة. وبدل تكرار <code>1fr</code> ثلاث مرّات نستخدم{" "}
          <code>repeat()</code>:
        </p>
        <CodeBlock>{`.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}`}</CodeBlock>
      </Block>

      <Block title="الوحدة fr والمسافات">
        <p>
          وحدة <code>fr</code> توزّع المساحة المتبقية بالنسبة بين الأعمدة. مثلاً{" "}
          <code>grid-template-columns: 2fr 1fr</code> يجعل العمود الأول ضِعف عرض الثاني. ولإضافة
          مسافة بين الخلايا نستخدم <code>gap</code>:
        </p>
        <TagGrid>
          <TagCard
            name="display: grid"
            desc="يفعّل نظام الشبكة على العنصر الحاوي."
            example={<CodeBlock small>{`display: grid;`}</CodeBlock>}
          />
          <TagCard
            name="grid-template-columns"
            desc={
              <>
                يحدّد عدد الأعمدة وعرضها، غالباً بوحدة <code>fr</code>.
              </>
            }
            example={
              <CodeBlock small>{`grid-template-columns:
  repeat(3, 1fr);`}</CodeBlock>
            }
          />
          <TagCard
            name="fr"
            desc="وحدة تمثّل جزءاً من المساحة المتاحة، فتقسم العرض بالنسبة."
            example={<CodeBlock small>{`1fr 1fr 1fr;`}</CodeBlock>}
          />
          <TagCard
            name="gap"
            desc="المسافة بين الصفوف والأعمدة داخل الشبكة."
            example={<CodeBlock small>{`gap: 10px;`}</CodeBlock>}
          />
        </TagGrid>
      </Block>
    </>
  );
}

const lesson: Lesson = {
  slug: "grid",
  number: 16,
  title: "شبكة Grid",
  lead: "ترتيب العناصر في صفوف وأعمدة بنظام التخطيط ثنائي الأبعاد Grid.",
  Body,
  editor: {
    title: "محرر تجريبي — شبكة من ثلاثة أعمدة",
    defaultCode: `<style>
  .grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
  }
  .grid div {
    background-color: #cf1a11;
    color: white;
    padding: 20px;
    text-align: center;
  }
</style>

<div class="grid">
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
  <div>5</div>
  <div>6</div>
</div>`,
  },
  tips: [
    <>
      <code>display: grid</code> يُكتب على <strong>الحاوي</strong> لا على الأبناء.
    </>,
    <>
      وحدة <code>fr</code> = جزء من المساحة المتاحة؛ <code>repeat(3, 1fr)</code> = ثلاثة أعمدة
      متساوية.
    </>,
    <>
      Grid ثنائي الأبعاد (صفوف وأعمدة) بينما Flexbox أحادي البعد.
    </>,
  ],
  quiz: {
    mcq: [
      {
        q: "ماذا تفعل القاعدة display: grid؟",
        opts: [
          "تخفي العنصر",
          "تفعّل نظام الشبكة على العنصر الحاوي فتتوزّع أبناؤه في صفوف وأعمدة",
          "تجعل العنصر يطفو لليمين",
          "تحوّل النص إلى أعمدة فقط",
        ],
        correct: 1,
        ok: "صحيح! display: grid يفعّل الشبكة على الحاوي.",
        ko: "الإجابة الصحيحة: تفعّل نظام الشبكة على العنصر الحاوي.",
      },
      {
        q: "ماذا تعني الوحدة fr في Grid؟",
        opts: [
          "حجم الخط بالبكسل",
          "جزء (fraction) من المساحة المتاحة",
          "إطار حول الخلية",
          "عدد الصفوف",
        ],
        correct: 1,
        ok: "ممتاز! fr = جزء من المساحة المتاحة.",
        ko: "الإجابة الصحيحة: جزء (fraction) من المساحة المتاحة.",
      },
      {
        q: "أي خاصية تحدّد عدد أعمدة الشبكة وعرضها؟",
        opts: [
          "grid-columns",
          "grid-template-columns",
          "column-count",
          "template-columns",
        ],
        correct: 1,
        ok: "تمام! grid-template-columns تحدّد الأعمدة.",
        ko: "الإجابة الصحيحة: grid-template-columns.",
      },
    ],
    coding: [
      {
        prompt:
          "اكتب قاعدة CSS للعنصر .container تجعله شبكة (grid) من ثلاثة أعمدة متساوية باستخدام repeat(3, 1fr).",
        hint: "استخدم display: grid; مع grid-template-columns: repeat(3, 1fr);",
        starter: "<style>\n  .container {\n\n  }\n</style>",
        solution:
          "<style>\n  .container {\n    display: grid;\n    grid-template-columns: repeat(3, 1fr);\n  }\n</style>",
        check: (c) =>
          /display\s*:\s*grid/i.test(c) &&
          /grid-template-columns\s*:\s*repeat\(\s*3\s*,\s*1fr\s*\)/i.test(c),
      },
    ],
  },
};

export default lesson;
