import type { Lesson } from "@/lib/content/types";
import { Block, Bullet, CodeBlock, TagGrid, TagCard } from "@/components/lesson-content";

function Body() {
  return (
    <>
      <Block title="ما هي الانتقالات (Transitions)؟">
        <p>
          خاصية <code>transition</code> تجعل تغيُّر قيمة خاصية ما يحدث{" "}
          <strong>بشكل تدريجي وناعم عبر زمن محدّد</strong>، بدلاً من القفز المفاجئ من الحالة
          القديمة إلى الجديدة. تُستخدم كثيراً مع الحالة <code>:hover</code> (عند مرور الفأرة).
        </p>
        <p>
          صيغتها المختصرة: <code>transition: property duration timing</code> — أي{" "}
          <strong>أي خاصية</strong> نريد تحريكها، و<strong>المدة</strong> الزمنية،
          و<strong>نمط السرعة</strong>.
        </p>
        <CodeBlock>{`.box {
  background: #cf1a11;
  transition: all 0.3s ease;
}

.box:hover {
  background: #1a73e8;
}`}</CodeBlock>
        <p>
          هنا <code>all</code> تعني &quot;كل الخصائص التي تتغيّر&quot;، و<code>0.3s</code> هي
          المدة (ثلاثة أعشار الثانية)، و<code>ease</code> نمط حركة يبدأ ويتباطأ بسلاسة.
        </p>
      </Block>

      <Block title="ما هي التحويلات (Transforms)؟">
        <p>
          خاصية <code>transform</code> تتيح لنا <strong>تحريك العنصر أو تدويره أو تكبيره</strong>{" "}
          دون التأثير على ترتيب باقي العناصر. أشهر دوالها:
        </p>
        <TagGrid>
          <TagCard
            name="translate()"
            desc="تحريك العنصر أفقياً وعمودياً عن مكانه الأصلي."
            when={<>عند تحريك عنصر دون تغيير مكانه في التخطيط.</>}
            example={<CodeBlock small>{`transform: translate(20px, 10px);`}</CodeBlock>}
          />
          <TagCard
            name="rotate()"
            desc={
              <>
                <strong>تدوير</strong> العنصر بزاوية مُقاسة بالدرجات <code>deg</code>.
              </>
            }
            when={<>لإمالة أو دوران عنصر مثل أيقونة أو بطاقة.</>}
            example={<CodeBlock small>{`transform: rotate(45deg);`}</CodeBlock>}
          />
          <TagCard
            name="scale()"
            desc={
              <>
                <strong>تكبير أو تصغير</strong> حجم العنصر (1 = الحجم الأصلي).
              </>
            }
            when={<>لتكبير عنصر عند مرور الفأرة فوقه.</>}
            example={<CodeBlock small>{`transform: scale(1.2);`}</CodeBlock>}
          />
        </TagGrid>
      </Block>

      <Block title="الانتقالات والتحويلات معاً">
        <p>
          القوة الحقيقية تظهر عند دمجهما: نضع <code>transform</code> في الحالة{" "}
          <code>:hover</code>، ونضع <code>transition</code> على العنصر نفسه ليصبح التغيير ناعماً.
        </p>
        <CodeBlock>{`.card {
  transition: all 0.3s ease;
}

.card:hover {
  transform: scale(1.1) rotate(5deg);
}`}</CodeBlock>
        <Bullet
          items={[
            <>
              <code>transition</code> تُكتب على <strong>الحالة العادية</strong> للعنصر لا داخل
              <code>:hover</code>.
            </>,
            <>
              يمكن دمج أكثر من دالة في <code>transform</code> واحد بفصلها بمسافة.
            </>,
            <>
              المدة تُكتب بالثواني <code>0.3s</code> أو الملي ثانية <code>300ms</code>.
            </>,
          ]}
        />
      </Block>
    </>
  );
}

const lesson: Lesson = {
  slug: "transitions",
  number: 15,
  title: "الانتقالات والتحويلات",
  lead: "تحريك تغيّرات الخصائص بسلاسة عبر transition، وتدوير وتكبير العناصر عبر transform.",
  Body,
  editor: {
    title: "محرر تجريبي — صندوق يتحرّك عند المرور",
    defaultCode: `<style>
  .box {
    width: 150px;
    height: 150px;
    margin: 60px auto;
    background: #cf1a11;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 12px;
    transition: all 0.3s ease;
  }
  .box:hover {
    transform: scale(1.2) rotate(10deg);
    background: #1a73e8;
  }
</style>

<div class="box">مرّر الفأرة فوقي</div>`,
  },
  tips: [
    <>
      <code>transition</code> تجعل تغيُّر الخصائص يحدث بسلاسة عبر زمن بدل القفز المفاجئ.
    </>,
    <>
      <code>rotate()</code> تُدوّر العنصر، و<code>scale()</code> تُكبّره أو تُصغّره،
      و<code>translate()</code> تُحرّكه.
    </>,
    <>
      نكتب <code>transition</code> على الحالة العادية و<code>transform</code> داخل
      <code>:hover</code>.
    </>,
  ],
  quiz: {
    mcq: [
      {
        q: "ما الذي تفعله خاصية transition؟",
        opts: [
          "تجعل تغيُّر الخصائص يحدث بسلاسة عبر زمن محدّد",
          "تخفي العنصر تماماً",
          "تغيّر لون النص فقط",
          "تضيف حدوداً للعنصر",
        ],
        correct: 0,
        ok: "صحيح! transition تُنعّم التغييرات عبر الزمن.",
        ko: "الإجابة الصحيحة: تجعل التغييرات تحدث بسلاسة عبر زمن محدّد.",
      },
      {
        q: "أي دالة في transform تُدوّر العنصر؟",
        opts: ["scale()", "translate()", "rotate()", "skew-color()"],
        correct: 2,
        ok: "ممتاز! rotate() تُدوّر العنصر.",
        ko: "الإجابة الصحيحة: rotate().",
      },
      {
        q: "أي دالة في transform تُكبّر أو تُصغّر حجم العنصر؟",
        opts: ["rotate()", "scale()", "translate()", "opacity()"],
        correct: 1,
        ok: "تمام! scale() للتكبير والتصغير.",
        ko: "الإجابة الصحيحة: scale().",
      },
    ],
    coding: [
      {
        prompt:
          "أضف خاصية الانتقال transition: all 0.3s; داخل قاعدة الفئة .box لتصبح تغييراتها ناعمة.",
        hint: "اكتب transition: all 0.3s; داخل قاعدة .box في <style>.",
        starter: "<style>\n  .box {\n    background: red;\n\n  }\n</style>",
        solution:
          "<style>\n  .box {\n    background: red;\n    transition: all 0.3s;\n  }\n</style>",
        check: (c) =>
          /\.box\s*\{[^}]*transition\s*:\s*all\s+0?\.3s/i.test(c),
      },
    ],
  },
};

export default lesson;
