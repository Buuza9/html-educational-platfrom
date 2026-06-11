import type { Lesson } from "@/lib/content/types";
import { Block, Bullet, CodeBlock } from "@/components/lesson-content";

function Body() {
  return (
    <>
      <Block title="الشكل العام للقاعدة (Rule)">
        <p>
          تتكوّن شيفرة CSS من مجموعة <strong>قواعد (Rules)</strong>، تصف كل قاعدة مظهر عنصر أو
          مجموعة عناصر. الشكل العام:
        </p>
        <CodeBlock>{`selector {
    property: value;
    property: value;
}`}</CodeBlock>
        <p>
          يُطبَّق كل ما بين القوسين <code>{`{`}</code> و <code>{`}`}</code> على كل عناصر الصفحة
          التي يطابقها المُحدِّد <code>selector</code>.
        </p>
      </Block>

      <Block title="المُحدِّدات (Selectors)">
        <p>
          المُحدِّد يختار العنصر/العناصر التي ستُطبَّق عليها القاعدة. أشهر ثلاثة أنواع:
        </p>
        <Bullet
          items={[
            <>
              <strong>محدِّد الوسم:</strong> اسم وسم HTML مثل <code>h1</code> أو <code>p</code> أو{" "}
              <code>a</code> — يختار كل عناصر هذا النوع.
            </>,
            <>
              <strong>محدِّد المعرّف (id):</strong> اسم مسبوق بـ <code>#</code> مثل{" "}
              <code>#main</code> — يختار العنصر صاحب <code>id=&quot;main&quot;</code> (فريد).
            </>,
            <>
              <strong>محدِّد الفئة (class):</strong> اسم مسبوق بنقطة مثل <code>.note</code> — يختار
              كل العناصر التي تحمل <code>class=&quot;note&quot;</code>.
            </>,
          ]}
        />
      </Block>

      <Block title="زوج الخاصية / القيمة">
        <p>
          تُذكر كل خاصية على شكل <code>property: value;</code> حيث <code>property</code> اسم الخاصية
          و <code>value</code> قيمتها، وينتهي التعريف بفاصلة منقوطة <code>;</code>. كـ HTML، لا تعطي
          CSS أي قيمة للفراغات الزائدة — هي فقط لتسهيل القراءة.
        </p>
      </Block>
    </>
  );
}

const lesson: Lesson = {
  slug: "rules",
  number: 3,
  title: "بنية قاعدة CSS والمحدِّدات",
  lead: (
    <>
      كيف تُكتب قاعدة CSS؟ وما هو <code>selector</code> وزوج <code>property : value</code>؟
    </>
  ),
  Body,
  editor: {
    title: "محرر تجريبي — أنواع المحدِّدات",
    defaultCode: `<style>
  h1 { color: crimson; }
  #main { text-align: center; }
  .note { background: #fff3cd; padding: 8px; }
</style>

<h1>عنوان (محدِّد وسم)</h1>
<p id="main">فقرة موسّطة (محدِّد id)</p>
<p class="note">فقرة بخلفية (محدِّد فئة)</p>`,
  },
  tips: [
    <>
      بنية القاعدة: <code>selector {`{ property: value; }`}</code>.
    </>,
    <>
      <code>#</code> للمعرّف (id الفريد)، <code>.</code> للفئة (class المتكرِّرة).
    </>,
    <>
      كل خاصية تنتهي بفاصلة منقوطة <code>;</code>.
    </>,
  ],
  quiz: {
    mcq: [
      {
        q: "ما الرمز الذي يسبق محدِّد الفئة (class)؟",
        opts: ["#", ".", "@", "*"],
        correct: 1,
        ok: "صحيح! النقطة (.) للفئة.",
        ko: "الإجابة الصحيحة: النقطة (.).",
      },
      {
        q: "ما الرمز الذي يسبق محدِّد المعرّف (id)؟",
        opts: [".", "#", "&", "%"],
        correct: 1,
        ok: "تمام! (#) للمعرّف id.",
        ko: "الإجابة الصحيحة: (#).",
      },
      {
        q: "بماذا تنتهي كل خاصية داخل قاعدة CSS؟",
        opts: ["نقطة .", "فاصلة منقوطة ;", "فاصلة ,", "لا شيء"],
        correct: 1,
        ok: "ممتاز! كل خاصية تنتهي بـ ;",
        ko: "الإجابة الصحيحة: فاصلة منقوطة ;",
      },
    ],
    coding: [
      {
        prompt: "اكتب قاعدة CSS (داخل <style>) تجعل كل عناصر <h1> لونها أزرق (blue).",
        hint: "الشكل: h1 { color: blue; }",
        starter: "<style>\n\n</style>",
        solution: "<style>\n  h1 { color: blue; }\n</style>",
        check: (c) => /h1\s*\{[^}]*color\s*:\s*blue/i.test(c),
      },
    ],
  },
};

export default lesson;
