import type { Lesson } from "@/lib/content/types";
import { Block, Bullet, CodeBlock } from "@/components/lesson-content";

function Body() {
  return (
    <>
      <Block title="ما هو التصميم المتجاوب؟">
        <p>
          <strong>التصميم المتجاوب</strong> (Responsive Design) يعني أن تتكيّف صفحتك تلقائياً مع
          حجم الشاشة: تبدو مرتّبة على شاشة الحاسوب الكبيرة، وتظل مقروءة ومنظّمة على شاشة الهاتف
          الصغيرة. فبدلاً من تصميم منفصل لكل جهاز، نكتب CSS واحدة &quot;تتجاوب&quot; مع عرض الشاشة.
        </p>
        <p>
          الأداة الأساسية لذلك في CSS هي <strong>استعلامات الوسائط</strong> (Media Queries)، وهي
          قواعد نُطبّقها فقط عندما يتحقّق شرط معيّن في الشاشة — مثل أن يكون عرضها أصغر من قيمة محدّدة.
        </p>
      </Block>

      <Block title="تذكير: واصفة viewport">
        <p>
          حتى يعمل التصميم المتجاوب على الهواتف بشكل صحيح، يجب وضع هذه الواصفة داخل{" "}
          <code>&lt;head&gt;</code>. فهي تخبر المتصفح أن يستخدم عرض الجهاز الحقيقي بدل تصغير الصفحة.
        </p>
        <CodeBlock>{`<meta name="viewport" content="width=device-width, initial-scale=1.0">`}</CodeBlock>
        <p>
          بدون هذه الواصفة قد يعرض الهاتف الصفحة وكأنها على شاشة عريضة ثم يصغّرها، فلا تظهر استعلامات
          الوسائط بشكل صحيح.
        </p>
      </Block>

      <Block title="صياغة Media Query">
        <p>
          نكتب القاعدة بكلمة <code>@media</code> متبوعة بالشرط بين قوسين، ثم نضع داخل الأقواس
          المعقوفة قواعد CSS التي تُطبَّق فقط عند تحقّق الشرط:
        </p>
        <CodeBlock>{`@media (max-width: 600px) {
  body {
    background-color: lightblue;
  }
}`}</CodeBlock>
        <p>
          هنا تُطبَّق القاعدة <strong>فقط</strong> عندما يكون عرض الشاشة <code>600px</code> أو أقل.
          القيمة الافتراضية (خارج الاستعلام) هي ما يظهر على الشاشات الأكبر.
        </p>
        <Bullet
          items={[
            <>
              <code>max-width</code>: تُطبَّق عندما يكون العرض <strong>أصغر من أو يساوي</strong>{" "}
              القيمة (مفيدة لاستهداف الشاشات الصغيرة).
            </>,
            <>
              <code>min-width</code>: تُطبَّق عندما يكون العرض <strong>أكبر من أو يساوي</strong>{" "}
              القيمة (مفيدة لاستهداف الشاشات الكبيرة).
            </>,
          ]}
        />
      </Block>

      <Block title="مبدأ Mobile-First">
        <p>
          أسلوب <strong>الهاتف أولاً</strong> (Mobile-First) يعني أن نكتب التنسيق الأساسي للشاشات
          الصغيرة أولاً (بدون استعلام)، ثم نُضيف تحسينات للشاشات الأكبر باستخدام{" "}
          <code>min-width</code>. هذا يجعل الصفحة خفيفة وسريعة على الهواتف، ويبني فوقها للأجهزة
          الأكبر.
        </p>
        <CodeBlock>{`/* الأساس: للهواتف */
.row { display: flex; flex-direction: column; }

/* تحسين للشاشات الأكبر */
@media (min-width: 600px) {
  .row { flex-direction: row; }
}`}</CodeBlock>
      </Block>

      <Block title="مثال: تكديس الأعمدة على الشاشات الصغيرة">
        <p>
          الاستخدام الأشهر للتصميم المتجاوب: على الشاشة الكبيرة نضع الأعمدة جنباً إلى جنب
          (<code>flex-direction: row</code>)، وعلى الشاشة الصغيرة نُكدّسها فوق بعضها
          (<code>flex-direction: column</code>) لتبقى مقروءة.
        </p>
        <CodeBlock>{`.row { display: flex; flex-direction: row; }

@media (max-width: 600px) {
  .row { flex-direction: column; }
}`}</CodeBlock>
      </Block>
    </>
  );
}

const lesson: Lesson = {
  slug: "responsive",
  number: 17,
  title: "التصميم المتجاوب (Media Queries)",
  lead: "كيف نجعل الصفحة تتكيّف مع حجم الشاشة باستخدام استعلامات الوسائط @media.",
  Body,
  editor: {
    title: "محرر تجريبي — صغّر نافذة المعاينة لترى التغيّر",
    defaultCode: `<style>
  .box {
    background-color: lightgreen;
    color: #111;
    padding: 20px;
    text-align: center;
    font-size: 20px;
  }

  /* تُطبَّق فقط عندما يصبح عرض المعاينة 600px أو أقل */
  @media (max-width: 600px) {
    .box {
      background-color: lightblue;
    }
  }
</style>

<div class="box">
  صغّر عرض نافذة المعاينة: سيتحوّل اللون من الأخضر إلى الأزرق.
</div>`,
  },
  tips: [
    <>
      <code>@media (max-width: 600px)</code> تستهدف الشاشات الصغيرة،{" "}
      <code>min-width</code> تستهدف الكبيرة.
    </>,
    <>
      لا يعمل التصميم المتجاوب على الهاتف جيداً بدون واصفة <code>viewport</code>.
    </>,
    <>
      <strong>Mobile-First</strong> = نبدأ بالشاشات الصغيرة ثم نُضيف للأكبر بـ{" "}
      <code>min-width</code>.
    </>,
  ],
  quiz: {
    mcq: [
      {
        q: "ما الغرض من استعلام الوسائط (Media Query)؟",
        opts: [
          "تطبيق قواعد CSS بناءً على حجم الشاشة أو خصائصها",
          "تحميل الصور بشكل أسرع",
          "تحويل HTML إلى JavaScript",
          "إضافة قاعدة بيانات للصفحة",
        ],
        correct: 0,
        ok: "صحيح! نستخدمه لتكييف التنسيق مع الشاشة.",
        ko: "الإجابة الصحيحة: تطبيق قواعد CSS بناءً على حجم الشاشة.",
      },
      {
        q: "أي صياغة صحيحة لاستهداف شاشة عرضها 600px أو أقل؟",
        opts: [
          "@media (max-width: 600px) { ... }",
          "@screen max 600px { ... }",
          "@if (width < 600px) { ... }",
          "media-query: 600px { ... }",
        ],
        correct: 0,
        ok: "تمام! @media (max-width: 600px) { ... }.",
        ko: "الإجابة الصحيحة: @media (max-width: 600px) { ... }.",
      },
      {
        q: "ماذا يعني مبدأ Mobile-First؟",
        opts: [
          "نصمّم للشاشات الكبيرة أولاً ثم نصغّر",
          "نكتب التنسيق للشاشات الصغيرة أولاً ثم نُضيف للأكبر",
          "نستخدم الهاتف فقط لاختبار الموقع",
          "نمنع فتح الموقع على الحاسوب",
        ],
        correct: 1,
        ok: "ممتاز! نبدأ بالصغيرة ثم نبني للأكبر.",
        ko: "الإجابة الصحيحة: نكتب للشاشات الصغيرة أولاً ثم نُضيف للأكبر.",
      },
    ],
    coding: [
      {
        prompt:
          "اكتب استعلام وسائط @media للشاشات التي عرضها 600px أو أقل، يجعل خلفية <body> بلون lightblue.",
        hint: "استخدم @media (max-width: 600px) { body { background-color: lightblue; } }.",
        starter: "<style>\n\n</style>",
        solution:
          "<style>\n  @media (max-width: 600px) {\n    body {\n      background-color: lightblue;\n    }\n  }\n</style>",
        check: (c) =>
          /@media[^{]*max-width\s*:\s*600px[^{]*\{[^@]*body[^{]*\{[^}]*background(-color)?\s*:\s*lightblue\b/i.test(
            c
          ),
      },
    ],
  },
};

export default lesson;
