import type { Lesson } from "@/lib/content/types";
import { Block, Bullet, CodeBlock, TagGrid, TagCard } from "@/components/lesson-content";

function Body() {
  return (
    <>
      <Block title="ما هو الكاسكيد (Cascade)؟">
        <p>
          عندما تطبَّق على عنصرٍ واحد <strong>أكثر من قاعدة CSS</strong> تتعارض في نفس
          الخاصيَّة (مثل <code>color</code>)، يحتاج المتصفِّح لطريقةٍ يقرِّر بها أيُّ قيمةٍ
          تفوز. هذه الآليَّة تُسمَّى <strong>الكاسكيد (Cascade)</strong>، أي
          &quot;التتالي&quot;. تعتمد على ثلاثة عوامل بالترتيب: <strong>المصدر/الترتيب</strong>،
          ثمَّ <strong>الأولويَّة (Specificity)</strong>، ثمَّ <strong>!important</strong>.
        </p>
      </Block>

      <Block title="الترتيب والمصدر (Order)">
        <p>
          إذا تساوت قاعدتان في كل شيء، فإنَّ <strong>الأخيرة تفوز</strong>. القاعدة المكتوبة
          لاحقاً في الملف تتغلَّب على السابقة.
        </p>
        <CodeBlock>{`<style>
  p { color: red; }
  p { color: green; }   /* هذه تفوز لأنها الأخيرة */
</style>

<p>سأظهر باللون الأخضر</p>`}</CodeBlock>
      </Block>

      <Block title="الأولويَّة (Specificity)">
        <p>
          ليست كل المُحدِّدات (Selectors) متساوية. كلَّما كان المُحدِّد
          <strong> أكثر تحديداً</strong> كانت أولويَّته أعلى، حتى لو جاء قبل غيره. الترتيب من
          الأقوى إلى الأضعف:
        </p>
        <Bullet
          items={[
            <>
              <strong>inline</strong> (التنسيق المباشر عبر <code>style=&quot;...&quot;</code>) —
              الأقوى.
            </>,
            <>
              <strong>id</strong> (المُحدَّد بـ <code>#name</code>) — أقوى من الفئة.
            </>,
            <>
              <strong>class</strong> (الفئة <code>.name</code>) — أقوى من العنصر.
            </>,
            <>
              <strong>element</strong> (اسم العنصر مثل <code>p</code>) — الأضعف.
            </>,
          ]}
        />
        <CodeBlock>{`<style>
  p { color: red; }          /* عنصر  — الأضعف */
  .box { color: green; }      /* فئة   — أقوى */
  #main { color: blue; }      /* id    — الأقوى هنا */
</style>

<p id="main" class="box">سأظهر باللون الأزرق (id يفوز)</p>`}</CodeBlock>
      </Block>

      <TagGrid>
        <TagCard
          name="element"
          desc="تحديد بحسب اسم العنصر. أضعف أولويَّة."
          example={<CodeBlock small>{`p { color: red; }`}</CodeBlock>}
        />
        <TagCard
          name=".class"
          desc="تحديد بالفئة. أقوى من العنصر."
          example={<CodeBlock small>{`.box { color: green; }`}</CodeBlock>}
        />
        <TagCard
          name="#id"
          desc="تحديد بالمعرِّف. أقوى من الفئة والعنصر."
          example={<CodeBlock small>{`#main { color: blue; }`}</CodeBlock>}
        />
        <TagCard
          name="style=&quot;...&quot;"
          desc="التنسيق المباشر (inline). الأقوى."
          example={<CodeBlock small>{`<p style="color:orange">`}</CodeBlock>}
        />
      </TagGrid>

      <Block title="!important — الملاذ الأخير">
        <p>
          إضافة <code>!important</code> إلى قيمة خاصِّيَّة تجعلها <strong>تتغلَّب على الجميع</strong>،
          حتى على المُحدِّدات الأعلى أولويَّة. لكنَّها تُصعِّب صيانة الكود، لذا نستخدمها
          <strong> كحلٍّ أخير</strong> فقط.
        </p>
        <CodeBlock>{`<style>
  #main { color: blue; }
  p { color: red !important; }   /* يفوز رغم أنَّ p أضعف */
</style>

<p id="main">سأظهر باللون الأحمر بسبب !important</p>`}</CodeBlock>
      </Block>

      <Block title="الوراثة (Inheritance)">
        <p>
          بعض الخصائص <strong>تُورَث</strong> تلقائيّاً من العنصر الأب إلى أبنائه، مثل
          <code> color</code> و<code>font-family</code> و<code>font-size</code>. وبعضها
          <strong> لا يُورَث</strong>، مثل <code>border</code> و<code>margin</code>
          و<code>padding</code> و<code>background</code>.
        </p>
        <CodeBlock>{`<style>
  div { color: purple; }   /* تُورَث للأبناء */
</style>

<div>
  <p>سأرث اللون البنفسجي من الأب div</p>
</div>`}</CodeBlock>
      </Block>
    </>
  );
}

const lesson: Lesson = {
  slug: "cascade",
  number: 14,
  title: "الكاسكيد والأولويَّة والوراثة",
  lead: "عندما تتعارض عدَّة قواعد على عنصرٍ واحد: من يفوز؟ الترتيب، والأولويَّة (Specificity)، و!important، والوراثة.",
  Body,
  editor: {
    title: "محرر تجريبي — أيُّ قاعدةٍ تفوز؟",
    defaultCode: `<style>
  p {
    color: red;
    padding: 10px;
  }
  .box {
    color: green;
  }
  #main {
    color: blue;
  }
</style>

<p id="main" class="box">
  أنا عنصر p، ولديَّ فئة box ومعرِّف main.
  الثلاث قواعد تتعارض على اللون، لكنَّ #main يفوز فأظهر باللون الأزرق.
</p>`,
  },
  tips: [
    <>
      ترتيب الأولويَّة: <strong>inline</strong> &gt; <code>#id</code> &gt; <code>.class</code>{" "}
      &gt; <code>element</code>.
    </>,
    <>
      <code>!important</code> يتغلَّب على الجميع، ويُستخدم كملاذٍ أخير فقط.
    </>,
    <>
      <code>color</code> و<code>font</code> تُورَث للأبناء، بينما <code>border</code> و
      <code>margin</code> لا تُورَث.
    </>,
  ],
  quiz: {
    mcq: [
      {
        q: "أيُّهما أعلى أولويَّةً (Specificity)؟",
        opts: ["المُحدِّد بالفئة .class", "المُحدِّد بالمعرِّف #id", "اسم العنصر p", "كلها متساوية"],
        correct: 1,
        ok: "صحيح! #id أعلى أولويَّةً من .class ومن العنصر.",
        ko: "الإجابة الصحيحة: #id أعلى أولويَّةً من .class.",
      },
      {
        q: "ماذا تفعل !important؟",
        opts: [
          "تجعل القيمة تتغلَّب على بقيَّة القواعد",
          "تلغي القاعدة تماماً",
          "تجعل القاعدة تُطبَّق على كل العناصر",
          "تزيد سرعة الصفحة",
        ],
        correct: 0,
        ok: "تمام! !important تتغلَّب على بقيَّة القواعد حتى الأعلى أولويَّة.",
        ko: "الإجابة الصحيحة: !important تجعل القيمة تتغلَّب على البقيَّة.",
      },
      {
        q: "أيُّ خاصِّيَّةٍ تُورَث تلقائيّاً من العنصر الأب إلى أبنائه؟",
        opts: ["margin", "border", "color", "padding"],
        correct: 2,
        ok: "ممتاز! color من الخصائص التي تُورَث.",
        ko: "الإجابة الصحيحة: color تُورَث، بينما margin وborder وpadding لا تُورَث.",
      },
    ],
    coding: [
      {
        prompt:
          "اكتب قاعدة CSS باستخدام المُحدِّد #title تجعل لون النص أزرق (blue)، لتوضيح أنَّ الـ id أعلى أولويَّة.",
        hint: "استخدم #title { color: blue; } داخل <style>.",
        starter: "<style>\n  #title {\n\n  }\n</style>",
        solution: "<style>\n  #title {\n    color: blue;\n  }\n</style>",
        check: (c) => /#title\s*\{[^}]*color\s*:\s*blue\b/i.test(c),
      },
    ],
  },
};

export default lesson;
