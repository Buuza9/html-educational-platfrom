import type { Lesson } from "@/lib/content/types";
import { Block, Bullet, CodeBlock, TagGrid, TagCard } from "@/components/lesson-content";

function Body() {
  return (
    <>
      <Block title="ما هي السمات (Attributes)؟">
        <p>
          <strong>السمات (Attributes)</strong> هي معلومات إضافية نضيفها للعنصر لتغيير سلوكه أو
          إعطائه إعدادات وخصائص. تُكتب دائماً <strong>داخل تاج الفتح فقط</strong> (وليس في تاج
          الإغلاق)، على شكل <code>name=&quot;value&quot;</code> أي{" "}
          <strong>اسم السمة</strong> ثم علامة <code>=</code> ثم{" "}
          <strong>قيمتها</strong> بين علامتي اقتباس.
        </p>
        <CodeBlock>{`<p id="intro" class="note" title="تلميح">هذه فقرة</p>`}</CodeBlock>
        <p>
          هنا أضفنا ثلاث سمات لنفس الفقرة: <code>id</code> و<code>class</code> و
          <code>title</code>، وكلها مكتوبة داخل تاج الفتح <code>&lt;p&gt;</code>.
        </p>
      </Block>

      <Block title="قواعد كتابة السمات">
        <Bullet
          items={[
            <>
              تُكتب داخل <strong>تاج الفتح</strong> فقط، بعد اسم التاج.
            </>,
            <>
              الصيغة هي <code>name=&quot;value&quot;</code> مع وضع القيمة بين علامتي اقتباس.
            </>,
            <>
              يمكن إضافة <strong>أكثر من سمة</strong> للعنصر الواحد، ونفصل بينها بمسافة.
            </>,
            "أسماء السمات تُكتب بأحرف صغيرة (lowercase) عادةً.",
          ]}
        />
      </Block>

      <Block title="السمات العامة (Global Attributes)">
        <p>
          بعض السمات تُسمّى <strong>عامة</strong> لأنها تعمل مع <strong>أي عنصر</strong> في HTML.
          هذه أشهرها:
        </p>
        <TagGrid>
          <TagCard
            name="id"
            desc={
              <>
                مُعرّف <strong>فريد</strong> للعنصر، لا يجوز تكراره في الصفحة. يُستخدم للوصول
                للعنصر من CSS و JavaScript.
              </>
            }
            example={<CodeBlock small>{`<div id="header">...</div>`}</CodeBlock>}
          />
          <TagCard
            name="class"
            desc={
              <>
                اسم فئة يمكن <strong>تكراره</strong> على عدة عناصر، لتطبيق نفس التنسيق عليها.
              </>
            }
            example={<CodeBlock small>{`<p class="note">...</p>`}</CodeBlock>}
          />
          <TagCard
            name="title"
            desc={
              <>
                نص يظهر كـ <strong>تلميح (tooltip)</strong> عند وقوف مؤشر الفأرة فوق العنصر.
              </>
            }
            example={<CodeBlock small>{`<p title="شرح إضافي">نص</p>`}</CodeBlock>}
          />
          <TagCard
            name="style"
            desc={
              <>
                كتابة تنسيق CSS مباشرةً داخل العنصر (تنسيق مضمّن inline).
              </>
            }
            example={<CodeBlock small>{`<p style="color: red;">نص</p>`}</CodeBlock>}
          />
          <TagCard
            name="lang"
            desc="تحديد لغة محتوى العنصر، مثل ar للعربية أو en للإنجليزية."
            example={<CodeBlock small>{`<p lang="ar">مرحباً</p>`}</CodeBlock>}
          />
          <TagCard
            name="dir"
            desc={
              <>
                اتجاه النص: <code>rtl</code> من اليمين لليسار، <code>ltr</code> من اليسار لليمين.
              </>
            }
            example={<CodeBlock small>{`<p dir="rtl">نص عربي</p>`}</CodeBlock>}
          />
          <TagCard
            name="hidden"
            desc="سمة منطقية تُخفي العنصر من الصفحة عند وضعها (لا تحتاج قيمة)."
            example={<CodeBlock small>{`<p hidden>مخفي</p>`}</CodeBlock>}
          />
        </TagGrid>
      </Block>

      <Block title="الفرق بين id و class">
        <p>
          هذا فرق مهم جداً للامتحان: <code>id</code> يجب أن يكون{" "}
          <strong>فريداً</strong> (يُستخدم مرة واحدة فقط في الصفحة)، بينما{" "}
          <code>class</code> <strong>يمكن تكراره</strong> على أكثر من عنصر.
        </p>
        <CodeBlock>{`<p id="main">عنصر فريد (id لا يتكرر)</p>

<p class="lead">نفس الفئة</p>
<p class="lead">يمكن تكرارها على عدة عناصر</p>`}</CodeBlock>
      </Block>
    </>
  );
}

const lesson: Lesson = {
  slug: "attributes",
  number: 10,
  title: "السمات (Attributes)",
  lead: "كيف نضيف معلومات وإعدادات إضافية للعناصر باستخدام السمات داخل تاج الفتح.",
  Body,
  editor: {
    title: "محرر تجريبي — السمات",
    defaultCode: `<div id="box" class="card" title="مرّر الفأرة فوقي لتظهر هذه الرسالة">
  مرّر مؤشر الفأرة فوق هذا الصندوق لترى سمة title تعمل.
</div>

<input type="text" placeholder="اكتب اسمك هنا">`,
  },
  tips: [
    <>
      تُكتب السمات داخل <strong>تاج الفتح</strong> فقط بصيغة{" "}
      <code>name=&quot;value&quot;</code>.
    </>,
    <>
      <code>id</code> فريد لا يتكرر، أما <code>class</code> فيمكن تكراره على عدة عناصر.
    </>,
    <>
      سمة <code>title</code> تُظهر تلميحاً (tooltip) عند الوقوف فوق العنصر.
    </>,
  ],
  quiz: {
    mcq: [
      {
        q: "أين تُكتب سمات العنصر (attributes)؟",
        opts: [
          "داخل تاج الفتح",
          "داخل تاج الإغلاق",
          "بين تاج الفتح والإغلاق كنص",
          "في ملف منفصل دائماً",
        ],
        correct: 0,
        ok: "صحيح! السمات تُكتب داخل تاج الفتح.",
        ko: "الإجابة الصحيحة: تُكتب داخل تاج الفتح.",
      },
      {
        q: "ما الفرق بين id و class؟",
        opts: [
          "كلاهما يمكن تكراره بحرية",
          "id فريد لا يتكرر، و class يمكن تكراره",
          "class فريد لا يتكرر، و id يمكن تكراره",
          "لا يوجد أي فرق بينهما",
        ],
        correct: 1,
        ok: "ممتاز! id فريد، و class يمكن تكراره.",
        ko: "الإجابة الصحيحة: id فريد لا يتكرر، و class يمكن تكراره.",
      },
      {
        q: "ماذا تفعل سمة title؟",
        opts: [
          "تغيّر عنوان الصفحة في التبويب",
          "تُظهر تلميحاً (tooltip) عند الوقوف فوق العنصر",
          "تحدّد لون النص",
          "تُخفي العنصر من الصفحة",
        ],
        correct: 1,
        ok: "تمام! title تُظهر تلميحاً عند الوقوف فوق العنصر.",
        ko: "الإجابة الصحيحة: تُظهر تلميحاً (tooltip).",
      },
    ],
    coding: [
      {
        prompt: 'اكتب فقرة <p> لها id="main" و class="lead" تحتوي على أي نص.',
        hint: 'أضف السمتين داخل تاج الفتح: <p id="main" class="lead">.',
        starter: "",
        solution: '<p id="main" class="lead">نص</p>',
        check: (c) =>
          /<p\b[^>]*\bid\s*=\s*["']main["'][^>]*>/i.test(c) &&
          /<p\b[^>]*\bclass\s*=\s*["']lead["'][^>]*>/i.test(c),
      },
    ],
  },
};

export default lesson;
