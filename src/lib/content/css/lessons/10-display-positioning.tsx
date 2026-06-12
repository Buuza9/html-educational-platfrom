import type { Lesson } from "@/lib/content/types";
import { Block, Bullet, CodeBlock, TagGrid, TagCard } from "@/components/lesson-content";

function Body() {
  return (
    <>
      <Block title="خاصيّة العرض (display)">
        <p>
          تتحكّم خاصيّة <code>display</code> في طريقة ظهور العنصر داخل الصفحة: هل يأخذ سطرًا
          كاملًا، أم يقف بجانب غيره، أم يختفي تمامًا.
        </p>
      </Block>

      <TagGrid>
        <TagCard
          name="display: block"
          desc={
            <>
              يأخذ العنصر سطرًا كاملًا بعرض الحاوية، ويبدأ غيره في سطر جديد. مثل{" "}
              <code>&lt;div&gt;</code> و<code>&lt;p&gt;</code>.
            </>
          }
          example={<CodeBlock small>{`display: block;`}</CodeBlock>}
        />
        <TagCard
          name="display: inline"
          desc={
            <>
              يقف العنصر ضمن السطر بجانب غيره ويأخذ عرض محتواه فقط، ولا يقبل{" "}
              <code>width</code> و<code>height</code>. مثل <code>&lt;span&gt;</code>.
            </>
          }
          example={<CodeBlock small>{`display: inline;`}</CodeBlock>}
        />
        <TagCard
          name="display: inline-block"
          desc={
            <>
              يقف بجانب غيره مثل <code>inline</code>، لكنه يقبل <code>width</code> و
              <code>height</code> والهوامش مثل <code>block</code>.
            </>
          }
          example={<CodeBlock small>{`display: inline-block;`}</CodeBlock>}
        />
        <TagCard
          name="display: none"
          desc={
            <>
              يُخفي العنصر تمامًا ويُزيله من تدفّق الصفحة، فلا يأخذ أي مساحة وكأنه غير موجود.
            </>
          }
          example={<CodeBlock small>{`display: none;`}</CodeBlock>}
        />
      </TagGrid>

      <Block title="الفرق بين display: none و visibility: hidden">
        <Bullet
          items={[
            <>
              <code>display: none</code> يُزيل العنصر تمامًا فلا يشغل أي مساحة في الصفحة.
            </>,
            <>
              <code>visibility: hidden</code> يُخفي العنصر بصريًّا لكنه{" "}
              <strong>يبقى محجوزًا لمساحته</strong> الفارغة.
            </>,
          ]}
        />
      </Block>

      <Block title="خاصيّة التموضع (position)">
        <p>
          تحدّد خاصيّة <code>position</code> كيفيّة تموضع العنصر، وتُستخدَم معها خصائص الإزاحة{" "}
          <code>top</code> و<code>right</code> و<code>bottom</code> و<code>left</code> لتحريك
          العنصر عن موقعه الأصلي.
        </p>
      </Block>

      <TagGrid>
        <TagCard
          name="position: static"
          desc={
            <>
              القيمة الافتراضيّة. يتبع العنصر التدفّق الطبيعي للصفحة، ولا تؤثّر فيه خصائص
              الإزاحة.
            </>
          }
          example={<CodeBlock small>{`position: static;`}</CodeBlock>}
        />
        <TagCard
          name="position: relative"
          desc={
            <>
              يُزاح العنصر عن موقعه الأصلي عبر <code>top/left...</code> مع بقاء مكانه الأصلي
              محجوزًا. ويصلح كمرجع للأبناء بـ <code>absolute</code>.
            </>
          }
          example={
            <CodeBlock small>{`position: relative;
top: 10px;`}</CodeBlock>
          }
        />
        <TagCard
          name="position: absolute"
          desc={
            <>
              يخرج العنصر من التدفّق ويتموضع بالنسبة لأقرب أب موضعه ليس <code>static</code>،
              وإلا فبالنسبة للصفحة.
            </>
          }
          example={
            <CodeBlock small>{`position: absolute;
top: 0;
right: 0;`}</CodeBlock>
          }
        />
        <TagCard
          name="position: fixed"
          desc={
            <>
              يُثبّت العنصر بالنسبة لنافذة العرض (viewport)، فيبقى ثابتًا في مكانه حتى عند
              تمرير (scroll) الصفحة.
            </>
          }
          example={
            <CodeBlock small>{`position: fixed;
bottom: 20px;
left: 20px;`}</CodeBlock>
          }
        />
        <TagCard
          name="position: sticky"
          desc={
            <>
              يتصرّف كـ <code>relative</code> حتى يصل لحدّ معيّن أثناء التمرير، فيلتصق مكانه
              مثل <code>fixed</code>.
            </>
          }
          example={
            <CodeBlock small>{`position: sticky;
top: 0;`}</CodeBlock>
          }
        />
        <TagCard
          name="z-index"
          desc={
            <>
              يتحكّم في <strong>ترتيب التراكب</strong>: العنصر ذو القيمة الأكبر يظهر فوق غيره.
              يعمل مع العناصر المُموضَعة (غير <code>static</code>).
            </>
          }
          example={<CodeBlock small>{`z-index: 10;`}</CodeBlock>}
        />
      </TagGrid>

      <Block title="مثال: أب relative وابن absolute">
        <p>
          الحيلة الشائعة: نجعل الحاوية <code>relative</code> ليصبح الابن <code>absolute</code>{" "}
          متموضعًا بالنسبة إليها.
        </p>
        <CodeBlock>{`<style>
  .box {
    position: relative;
    width: 200px;
    height: 120px;
    background: #eee;
  }
  .badge {
    position: absolute;
    top: 8px;
    right: 8px;
    background: #cf1a11;
    color: white;
    padding: 4px 8px;
  }
</style>

<div class="box">
  <span class="badge">جديد</span>
</div>`}</CodeBlock>
      </Block>

      <Block title="ملاحظة سريعة: float و clear">
        <Bullet
          items={[
            <>
              <code>float: left</code> أو <code>float: right</code> تُطفّي العنصر إلى أحد
              الجانبين ليلتفّ النص حوله.
            </>,
            <>
              <code>clear: both</code> تمنع العنصر من الالتفاف بجانب عناصر مُطفّاة قبله.
            </>,
          ]}
        />
      </Block>
    </>
  );
}

const lesson: Lesson = {
  slug: "positioning",
  number: 10,
  title: "العرض والتموضع (Display & Positioning)",
  lead: "كيف تظهر العناصر عبر display، وكيف نحرّكها ونثبّتها عبر position وخصائص الإزاحة وz-index.",
  Body,
  editor: {
    title: "محرر تجريبي — relative و absolute",
    defaultCode: `<style>
  .card {
    position: relative;
    width: 240px;
    height: 140px;
    background: #f1f1f1;
    border: 1px solid #ccc;
    margin: 30px auto;
  }
  .label {
    position: absolute;
    top: 10px;
    left: 10px;
    background: #cf1a11;
    color: white;
    padding: 5px 10px;
    border-radius: 6px;
  }
  .pill {
    display: inline-block;
    background: #222;
    color: white;
    padding: 6px 12px;
    margin: 4px;
  }
</style>

<div class="card">
  <span class="label">شارة</span>
</div>

<span class="pill">صندوق ١</span>
<span class="pill">صندوق ٢</span>
<span class="pill">صندوق ٣</span>`,
  },
  tips: [
    <>
      <code>display: none</code> يُزيل العنصر ومساحته، أمّا <code>visibility: hidden</code>{" "}
      فيُخفيه مع بقاء مساحته.
    </>,
    <>
      <code>position: fixed</code> يثبّت العنصر بالنسبة لنافذة العرض، و<code>absolute</code>{" "}
      بالنسبة لأقرب أب موضعه <code>relative</code>.
    </>,
    <>
      <code>z-index</code> يحدّد من يظهر فوق من عند التراكب، ويعمل فقط مع العناصر المُموضَعة.
    </>,
  ],
  quiz: {
    mcq: [
      {
        q: "أي قيمة لـ display تُزيل العنصر تمامًا من الصفحة بحيث لا يأخذ أي مساحة؟",
        opts: ["hidden", "none", "block", "invisible"],
        correct: 1,
        ok: "صحيح! display: none يُزيل العنصر ومساحته.",
        ko: "الإجابة الصحيحة: none.",
      },
      {
        q: "أي قيمة لـ position تُثبّت العنصر بالنسبة لنافذة العرض (viewport) عند التمرير؟",
        opts: ["relative", "absolute", "fixed", "static"],
        correct: 2,
        ok: "تمام! fixed يثبّت العنصر بالنسبة لنافذة العرض.",
        ko: "الإجابة الصحيحة: fixed.",
      },
      {
        q: "ما الذي تتحكّم فيه خاصيّة z-index؟",
        opts: [
          "حجم العنصر",
          "ترتيب تراكب العناصر فوق بعضها",
          "لون الخلفية",
          "المسافة من الأعلى",
        ],
        correct: 1,
        ok: "ممتاز! z-index يحدّد ترتيب التراكب.",
        ko: "الإجابة الصحيحة: ترتيب تراكب العناصر.",
      },
    ],
    coding: [
      {
        prompt:
          "اكتب قاعدة CSS تجعل العنصر ذا الفئة .box متموضعًا بشكل relative ومُزاحًا 10px من الأعلى (top).",
        hint: "استخدم position: relative; مع top: 10px; داخل قاعدة .box.",
        starter: "<style>\n  .box {\n\n  }\n</style>",
        solution:
          "<style>\n  .box {\n    position: relative;\n    top: 10px;\n  }\n</style>",
        check: (c) =>
          /\.box\s*\{[^}]*position\s*:\s*relative[^}]*top\s*:\s*10px/i.test(c) ||
          /\.box\s*\{[^}]*top\s*:\s*10px[^}]*position\s*:\s*relative/i.test(c),
      },
    ],
  },
};

export default lesson;
