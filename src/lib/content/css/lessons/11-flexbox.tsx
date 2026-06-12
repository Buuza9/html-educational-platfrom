import type { Lesson } from "@/lib/content/types";
import { Block, Bullet, CodeBlock, TagGrid, TagCard } from "@/components/lesson-content";

function Body() {
  return (
    <>
      <Block title="ما هو فليكس بوكس؟">
        <p>
          <strong>فليكس بوكس (Flexbox)</strong> نظام تخطيط في CSS يسهّل ترتيب العناصر داخل
          حاوية في صفّ أو عمود، وتوزيع المسافات بينها ومحاذاتها. نُفعّله بكتابة{" "}
          <code>display: flex</code> على عنصر الحاوية (الأب)، فيتحوّل أبناؤه المباشرون
          تلقائيًا إلى <strong>عناصر فليكس (flex items)</strong> تُرتَّب جنبًا إلى جنب.
        </p>
        <CodeBlock>{`.container {
  display: flex;
}`}</CodeBlock>
        <p>
          لكل تخطيط فليكس محوران: <strong>المحور الرئيسي (main axis)</strong> الذي تترتب عليه
          العناصر، و<strong>المحور المتقاطع (cross axis)</strong> العمودي عليه. نستعمل
          خصائص مختلفة للتحكّم في كلٍّ منهما.
        </p>
      </Block>

      <TagGrid>
        <TagCard
          name="display: flex"
          desc="يُطبَّق على الحاوية ويجعل أبناءها عناصر فليكس مرتّبة في صفّ."
          example={<CodeBlock small>{`.box {
  display: flex;
}`}</CodeBlock>}
        />
        <TagCard
          name="flex-direction"
          desc={
            <>
              اتجاه المحور الرئيسي: <code>row</code> (صفّ، الافتراضي) أو <code>column</code>{" "}
              (عمود).
            </>
          }
          example={<CodeBlock small>{`flex-direction: column;`}</CodeBlock>}
        />
        <TagCard
          name="justify-content"
          desc={
            <>
              المحاذاة على <strong>المحور الرئيسي</strong>: <code>flex-start</code>،{" "}
              <code>center</code>، <code>space-between</code>، <code>space-around</code>.
            </>
          }
          example={
            <CodeBlock small>{`justify-content:
  space-between;`}</CodeBlock>
          }
        />
        <TagCard
          name="align-items"
          desc={
            <>
              المحاذاة على <strong>المحور المتقاطع</strong>: <code>stretch</code> (الافتراضي)،{" "}
              <code>center</code>، <code>flex-start</code>، <code>flex-end</code>.
            </>
          }
          example={<CodeBlock small>{`align-items: center;`}</CodeBlock>}
        />
        <TagCard
          name="gap"
          desc="مسافة ثابتة بين العناصر دون الحاجة إلى margin."
          example={<CodeBlock small>{`gap: 16px;`}</CodeBlock>}
        />
        <TagCard
          name="flex-wrap"
          desc={
            <>
              السماح للعناصر بالنزول إلى سطر جديد عند ضيق المساحة عبر <code>wrap</code> بدل{" "}
              <code>nowrap</code>.
            </>
          }
          example={<CodeBlock small>{`flex-wrap: wrap;`}</CodeBlock>}
        />
      </TagGrid>

      <Block title="المحور الرئيسي مقابل المتقاطع">
        <p>
          الفرق بين الخاصّتين الأهمّ بسيط: <code>justify-content</code> تتحكّم في التوزيع على
          المحور الذي تسير عليه العناصر، و<code>align-items</code> تتحكّم في المحاذاة عموديًا
          على ذلك المحور.
        </p>
        <Bullet
          items={[
            <>
              <code>justify-content</code>: توزيع أفقي في الصفّ (المحور الرئيسي).
            </>,
            <>
              <code>align-items</code>: محاذاة رأسية في الصفّ (المحور المتقاطع).
            </>,
            <>
              لتوسيط عنصر تمامًا داخل حاويته نجمع بينهما: <code>justify-content: center</code>{" "}
              مع <code>align-items: center</code>.
            </>,
          ]}
        />
        <CodeBlock>{`.center {
  display: flex;
  justify-content: center;
  align-items: center;
}`}</CodeBlock>
      </Block>

      <Block title="ملاحظة عن الاتجاه (RTL)">
        <p>
          لأن صفحتنا تُكتب من اليمين إلى اليسار، فإن بداية المحور الرئيسي في الصفّ تكون على{" "}
          <strong>اليمين</strong>. لذلك <code>justify-content: flex-start</code> تبدأ من جهة
          اليمين، و<code>flex-end</code> من جهة اليسار، خلافًا لما اعتدته في الصفحات
          الإنجليزية.
        </p>
      </Block>
    </>
  );
}

const lesson: Lesson = {
  slug: "flexbox",
  number: 11,
  title: "تخطيط فليكس بوكس (Flexbox)",
  lead: "ترتيب العناصر في صفّ أو عمود وتوزيعها ومحاذاتها بسهولة عبر display: flex وخصائصه.",
  Body,
  editor: {
    title: "محرر تجريبي — فليكس بوكس",
    defaultCode: `<style>
  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    height: 140px;
    padding: 16px;
    background: #f1f5f9;
    border-radius: 10px;
  }
  .box {
    color: white;
    padding: 22px;
    border-radius: 8px;
    font-family: sans-serif;
  }
  .a { background: #cf1a11; }
  .b { background: #1d7a46; }
  .c { background: #1f5fbf; }
</style>

<div class="container">
  <div class="box a">صندوق 1</div>
  <div class="box b">صندوق 2</div>
  <div class="box c">صندوق 3</div>
</div>`,
  },
  tips: [
    <>
      <code>display: flex</code> على الحاوية يجعل أبناءها المباشرين عناصر فليكس.
    </>,
    <>
      <code>justify-content</code> للمحور الرئيسي، و<code>align-items</code> للمحور المتقاطع.
    </>,
    <>
      في RTL تبدأ <code>flex-start</code> من جهة اليمين.
    </>,
  ],
  quiz: {
    mcq: [
      {
        q: "ماذا يفعل display: flex عند تطبيقه على عنصر؟",
        opts: [
          "يخفي العنصر من الصفحة",
          "يجعل أبناءه المباشرين عناصر فليكس مرتّبة في صفّ",
          "يحوّل النص إلى أحرف كبيرة",
          "يضيف حدودًا للعنصر",
        ],
        correct: 1,
        ok: "صحيح! الحاوية تصبح حاوية فليكس وأبناؤها عناصر فليكس.",
        ko: "الإجابة الصحيحة: يجعل أبناءه المباشرين عناصر فليكس مرتّبة في صفّ.",
      },
      {
        q: "أي خاصّية تتحكّم في المحاذاة على المحور الرئيسي (main axis)؟",
        opts: ["align-items", "justify-content", "flex-wrap", "gap"],
        correct: 1,
        ok: "تمام! justify-content للمحور الرئيسي.",
        ko: "الإجابة الصحيحة: justify-content.",
      },
      {
        q: "أي خاصّية تتحكّم في المحاذاة على المحور المتقاطع (cross axis)؟",
        opts: ["justify-content", "flex-direction", "align-items", "gap"],
        correct: 2,
        ok: "ممتاز! align-items للمحور المتقاطع.",
        ko: "الإجابة الصحيحة: align-items.",
      },
    ],
    coding: [
      {
        prompt:
          "اجعل العنصر <div class=\"box\"> حاوية فليكس ووسّط عناصره أفقيًا ورأسيًا (في المنتصف تمامًا).",
        hint: "استخدم display: flex مع justify-content: center و align-items: center داخل قاعدة .box.",
        starter: "<style>\n  .box {\n\n  }\n</style>",
        solution:
          "<style>\n  .box {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n  }\n</style>",
        check: (c) =>
          /display\s*:\s*flex/i.test(c) &&
          /justify-content\s*:\s*center/i.test(c) &&
          /align-items\s*:\s*center/i.test(c),
      },
    ],
  },
};

export default lesson;
