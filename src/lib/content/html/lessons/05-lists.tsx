import type { Lesson } from "@/lib/content/types";
import { Block, Bullet, CodeBlock, TagGrid, TagCard } from "@/components/lesson-content";

function Body() {
  return (
    <>
      <Block title="أنواع القوائم في HTML">
        <p>القوائم تساعدنا في تنظيم المعلومات على شكل بنود. لدينا نوعان أساسيان:</p>
        <Bullet
          items={[
            <>
              <strong>قائمة غير مرتبة</strong> (Unordered List) — بنود بنقاط <code>•</code>.
            </>,
            <>
              <strong>قائمة مرتبة</strong> (Ordered List) — بنود مرقمة 1, 2, 3...
            </>,
          ]}
        />
      </Block>

      <TagGrid>
        <TagCard
          name={<>&lt;ul&gt;</>}
          desc={
            <>
              قائمة <strong>غير مرتبة</strong> (Unordered) — كل بند يبدأ بنقطة.
            </>
          }
          when="عندما لا يهم ترتيب البنود (مثل قائمة هوايات)."
          example={
            <CodeBlock small>{`<ul>
  <li>تفاح</li>
  <li>موز</li>
</ul>`}</CodeBlock>
          }
        />
        <TagCard
          name={<>&lt;ol&gt;</>}
          desc={
            <>
              قائمة <strong>مرتبة</strong> (Ordered) — كل بند يأخذ رقماً تلقائياً.
            </>
          }
          when="عندما يهم الترتيب (مثل خطوات وصفة طبخ)."
          example={
            <CodeBlock small>{`<ol>
  <li>اغسل التفاح</li>
  <li>قطّعه</li>
</ol>`}</CodeBlock>
          }
        />
        <TagCard
          name={<>&lt;li&gt;</>}
          desc={
            <>
              يمثّل <strong>عنصراً واحداً (List Item)</strong> داخل القائمة. يُستخدم داخل{" "}
              <code>&lt;ul&gt;</code> أو <code>&lt;ol&gt;</code>.
            </>
          }
          when="لكل بند داخل أي قائمة."
          example={<CodeBlock small>{`<li>بند واحد</li>`}</CodeBlock>}
        />
      </TagGrid>

      <Block
        title={
          <>
            الفرق بين <code>&lt;ul&gt;</code> و <code>&lt;ol&gt;</code>
          </>
        }
      >
        <p>
          <strong>&lt;ul&gt; — غير مرتبة</strong> (قهوة، شاي، عصير): البنود تظهر بنقاط •
        </p>
        <p>
          <strong>&lt;ol&gt; — مرتبة</strong> (قهوة، شاي، عصير): البنود تظهر بأرقام 1, 2, 3
        </p>
      </Block>
    </>
  );
}

const lesson: Lesson = {
  slug: "lists",
  number: 5,
  title: "القوائم (Lists)",
  lead: (
    <>
      القوائم المرتبة وغير المرتبة: <code>&lt;ul&gt;</code>, <code>&lt;ol&gt;</code>,{" "}
      <code>&lt;li&gt;</code>.
    </>
  ),
  Body,
  editor: {
    title: "محرر تجريبي — القوائم",
    defaultCode: `<h3>قائمة هواياتي:</h3>
<ul>
  <li>القراءة</li>
  <li>البرمجة</li>
  <li>السباحة</li>
</ul>

<h3>خطوات تعلّم HTML:</h3>
<ol>
  <li>افهم الهيكل الأساسي</li>
  <li>تعلّم النصوص والروابط</li>
  <li>طبّق على الجداول والنماذج</li>
</ol>`,
  },
  tips: [
    <>
      كل بند في القائمة يجب أن يكون داخل <code>&lt;li&gt;</code>.
    </>,
    <>
      يمكنك وضع قائمة <strong>داخل قائمة</strong> أخرى (Nested Lists).
    </>,
    <>
      <code>ul</code> = unordered (نقاط)، <code>ol</code> = ordered (أرقام)، <code>li</code> = list
      item.
    </>,
    <>
      خطأ شائع: نسيان <code>&lt;li&gt;</code> ووضع النص مباشرة داخل <code>&lt;ul&gt;</code>.
    </>,
  ],
  quiz: {
    mcq: [
      { q: 'أي تاج يصنع قائمة مرقّمة؟', opts: ['<ul>', '<ol>', '<li>', '<list>'], correct: 1, ok: 'صحيح! <ol> = ordered.', ko: 'الإجابة الصحيحة: <ol>.' },
      { q: 'أي تاج يصنع قائمة بنقاط (غير مرقّمة)؟', opts: ['<ul>', '<ol>', '<dl>', '<menu>'], correct: 0, ok: 'تمام! <ul> = unordered.', ko: 'الإجابة الصحيحة: <ul>.' },
      { q: 'ما تاج العنصر داخل القائمة؟', opts: ['<item>', '<li>', '<list>', '<el>'], correct: 1, ok: 'صحيح! <li> = list item.', ko: 'الإجابة الصحيحة: <li>.' },
    ],
    coding: [
      {
        prompt: 'اكتب قائمة غير مرقّمة (ul) فيها 3 عناصر: تفاحة، موزة، برتقال.',
        hint: '<ul> ثم <li> لكل عنصر.',
        starter: '',
        solution: '<ul>\n  <li>تفاحة</li>\n  <li>موزة</li>\n  <li>برتقال</li>\n</ul>',
        check: (c) => {
          const ul = /<ul\b[\s\S]*?<\/ul>/i.exec(c);
          if (!ul) return false;
          return (ul[0].match(/<li\b[\s\S]*?<\/li>/gi) || []).length >= 3;
        },
      },
    ],
  },
};

export default lesson;
