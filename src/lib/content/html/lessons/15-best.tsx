import type { Lesson } from "@/lib/content/types";
import { Block, Bullet } from "@/components/lesson-content";

function Body() {
  return (
    <>
      <Block title="الخصائص (Attributes) — مهم جداً">
        <p>
          <strong>الخاصية</strong> هي معلومة إضافية نضيفها للتاج لتغيير سلوكه أو شكله. تُكتب داخل
          تاج الفتح بصيغة <code>اسم=&quot;قيمة&quot;</code>.
        </p>
        <Bullet
          items={[
            <>
              <code>id</code>: يعطي العنصر <strong>معرّف فريد</strong> داخل الصفحة. لا يمكن أن
              يتكرر. يُستخدم للتنسيق بـ CSS، أو للروابط الداخلية، أو للوصول من JS. مثال:{" "}
              <code>&lt;p id=&quot;intro&quot;&gt;</code>
            </>,
            <>
              <code>class</code>: تعطي العنصر <strong>اسم فئة</strong> يمكن أن يتكرر على عدة عناصر.
              تستخدم للتنسيق بـ CSS بشكل جماعي. مثال:{" "}
              <code>&lt;p class=&quot;note&quot;&gt;</code>
            </>,
            <>
              <code>href</code>: تُستخدم مع <code>&lt;a&gt;</code> فقط — تُحدّد{" "}
              <strong>وجهة الرابط</strong>. مثال: <code>&lt;a href=&quot;page.html&quot;&gt;</code>
            </>,
            <>
              <code>align</code>: تُحدّد <strong>محاذاة المحتوى</strong>: <code>left</code>,{" "}
              <code>center</code>, <code>right</code>.{" "}
              <em>(قديمة، يُفضّل استخدام CSS بدلاً منها لكنها قد تأتي في الامتحان.)</em> مثال:{" "}
              <code>&lt;p align=&quot;center&quot;&gt;</code>
            </>,
            <>
              <code>src</code>: تُستخدم مع الصور والفيديو لتحديد <strong>مصدر الملف</strong>. مثال:{" "}
              <code>&lt;img src=&quot;cat.png&quot;&gt;</code>
            </>,
            <>
              <code>alt</code>: نص بديل يظهر إذا لم تُحمّل الصورة (وللوصولية). مثال:{" "}
              <code>&lt;img alt=&quot;قطة&quot;&gt;</code>
            </>,
            <>
              <code>target</code>: تُحدّد طريقة فتح الرابط: <code>_blank</code> = نافذة جديدة،{" "}
              <code>_self</code> = نفس النافذة. مثال:{" "}
              <code>&lt;a target=&quot;_blank&quot;&gt;</code>
            </>,
          ]}
        />
      </Block>

      <Block
        title={
          <>
            الفرق بين <code>id</code> و <code>class</code>
          </>
        }
      >
        <p>
          <strong>id (معرّف)</strong>
        </p>
        <Bullet
          items={[
            "فريد — مرة واحدة في الصفحة.",
            <>
              يستخدم للروابط الداخلية <code>#id</code>.
            </>,
            <>
              في CSS: <code>#myId {"{ ... }"}</code>
            </>,
          ]}
        />
        <p>
          <strong>class (فئة)</strong>
        </p>
        <Bullet
          items={[
            "يتكرر — يمكن استخدامه على عدة عناصر.",
            "للتنسيق المتشابه لمجموعة عناصر.",
            <>
              في CSS: <code>.myClass {"{ ... }"}</code>
            </>,
          ]}
        />
      </Block>

      <Block title="أفضل الممارسات (Best Practices)">
        <Bullet
          items={[
            <>
              استخدم <strong>تاجات صغيرة</strong> دائماً (<code>&lt;p&gt;</code> بدل{" "}
              <code>&lt;P&gt;</code>).
            </>,
            "أغلق كل التاجات حتى لو سمح المتصفح بترك بعضها.",
            <>
              استخدم <code>alt</code> لكل صورة.
            </>,
            <>
              اعتمد على <strong>التاجات الدلالية</strong> بدل <code>&lt;div&gt;</code> للجميع.
            </>,
            <>
              استخدم CSS للتنسيق وليس خصائص HTML القديمة (مثل <code>align</code>,{" "}
              <code>bgcolor</code>).
            </>,
            <>
              أعطِ صفحتك <code>&lt;title&gt;</code> واضحاً ومفيداً.
            </>,
            "أبقِ الكود مرتباً ومنسّقاً (Indentation).",
          ]}
        />
      </Block>
    </>
  );
}

const lesson: Lesson = {
  slug: "best",
  number: 15,
  title: "Best Practices + الخصائص (Attributes)",
  lead: (
    <>
      شرح <code>id</code>, <code>class</code>, <code>align</code>, <code>href</code> + أفضل
      الممارسات.
    </>
  ),
  Body,
  editor: {
    title: "محرر تجريبي — id, class, href, align",
    defaultCode: `<p id="intro" class="note">
  هذه فقرة بمعرّف وفئة.
</p>

<p class="note">
  هذه فقرة بنفس الفئة.
</p>

<a href="#intro">
  انتقل إلى الفقرة الأولى
</a>

<p align="center">
  هذا النص في المنتصف باستخدام align (طريقة قديمة).
</p>`,
  },
  tips: [
    <>
      <code>id</code> فريد، <code>class</code> يتكرر — هذه قاعدة ثابتة.
    </>,
    <>
      <code>href</code> هي الخاصية الأساسية لتاج <code>&lt;a&gt;</code>.
    </>,
    <>
      <code>align</code> خاصية <strong>قديمة</strong>، يُفضّل CSS — لكن لازم تعرفها.
    </>,
    "راجع كل تاج: متى نستخدمه؟ ما هي خصائصه؟ مثال عليه؟",
  ],
  quiz: {
    mcq: [
      {
        q: "ما الفرق بين id و class؟",
        opts: ["لا يوجد فرق", "id فريد، class يتكرر", "class فريد، id يتكرر", "كلاهما يتكرر"],
        correct: 1,
        ok: "ممتاز! id فريد، class يتكرر.",
        ko: "الإجابة الصحيحة: id فريد، class يتكرر.",
      },
      {
        q: "لتنسيق صفحة احترافياً، الأفضل أن نستخدم...",
        opts: ["خصائص HTML قديمة مثل align و bgcolor", "CSS منفصل", "JavaScript فقط", "Word"],
        correct: 1,
        ok: "صحيح! CSS هو الحل الصحيح.",
        ko: "الإجابة الصحيحة: CSS منفصل.",
      },
      {
        q: "أي خاصية تستخدم لتحديد محاذاة المحتوى (طريقة قديمة)؟",
        opts: ["position", "align", "center", "place"],
        correct: 1,
        ok: "صح! align (لكنها قديمة، استخدم CSS).",
        ko: "الإجابة الصحيحة: align.",
      },
    ],
    coding: [
      {
        prompt: 'اكتب فقرة لها id باسم "main-note" وكلاس "highlight".',
        hint: '<p id="..." class="...">.',
        starter: "",
        solution: '<p id="main-note" class="highlight">ملاحظة مهمة</p>',
        check: (c) =>
          /<p\b[^>]*id\s*=\s*["']main-note["'][^>]*class\s*=\s*["'][^"']*\bhighlight\b[^"']*["']/i.test(c) ||
          /<p\b[^>]*class\s*=\s*["'][^"']*\bhighlight\b[^"']*["'][^>]*id\s*=\s*["']main-note["']/i.test(c),
      },
    ],
  },
};

export default lesson;
