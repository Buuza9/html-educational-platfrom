import type { Lesson } from "@/lib/content/types";
import { Block, Bullet, CodeBlock, TagGrid, TagCard } from "@/components/lesson-content";

function Body() {
  return (
    <>
      <Block title="ما هو الرابط؟">
        <p>
          <strong>الرابط (Hyperlink)</strong> هو نص أو صورة يمكن النقر عليها للانتقال إلى صفحة
          أخرى، أو إلى ملف، أو إلى موقع آخر على الإنترنت. نستخدم له تاج <code>&lt;a&gt;</code>{" "}
          (اختصاراً لكلمة <em>anchor</em>).
        </p>
        <CodeBlock>{`<a href="https://google.com">اذهب إلى Google</a>`}</CodeBlock>
      </Block>

      <Block title="الخصائص (Attributes) المهمة">
        <TagGrid>
          <TagCard
            name="href"
            desc={
              <>
                تحدد <strong>وجهة الرابط</strong> (إلى أين سننتقل عند الضغط).
              </>
            }
            example={<code>href=&quot;page.html&quot;</code>}
          />
          <TagCard
            name="target"
            desc={
              <>
                تحدد <strong>طريقة فتح الرابط</strong>: نفس النافذة أم نافذة جديدة.
              </>
            }
            example={<code>target=&quot;_blank&quot;</code>}
          />
          <TagCard
            name="title"
            desc="نص يظهر عند تمرير الفأرة فوق الرابط (Tooltip)."
            example={<code>title=&quot;موقع جوجل&quot;</code>}
          />
        </TagGrid>
        <p>
          قيم خاصية <code>target</code> الشائعة:
        </p>
        <Bullet
          items={[
            <>
              <code>_self</code> — يفتح الرابط في <strong>نفس النافذة</strong> (الافتراضي).
            </>,
            <>
              <code>_blank</code> — يفتح الرابط في <strong>نافذة/تبويب جديد</strong>.
            </>,
          ]}
        />
      </Block>

      <Block title="أنواع الروابط">
        <TagGrid>
          <TagCard
            name="رابط خارجي"
            desc={
              <>
                ينقلك إلى موقع آخر على الإنترنت. يبدأ بـ <code>http://</code> أو{" "}
                <code>https://</code>.
              </>
            }
            example={<CodeBlock small>{`<a href="https://youtube.com">
  يوتيوب
</a>`}</CodeBlock>}
          />
          <TagCard
            name="رابط داخلي"
            desc={
              <>
                ينقلك إلى <strong>صفحة أخرى داخل نفس الموقع</strong>. تكتب اسم الملف فقط.
              </>
            }
            example={<CodeBlock small>{`<a href="about.html">
  من نحن
</a>`}</CodeBlock>}
          />
          <TagCard
            name="رابط لملف"
            desc={
              <>
                ينزّل ملفاً عند الضغط (مثل PDF أو صورة). يكفي وضع مسار الملف في{" "}
                <code>href</code>.
              </>
            }
            example={<CodeBlock small>{`<a href="cv.pdf">
  تحميل السيرة الذاتية
</a>`}</CodeBlock>}
          />
          <TagCard
            name="رابط داخل نفس الصفحة"
            desc={
              <>
                ينقلك إلى قسم محدد من الصفحة عبر <code>id</code>.
              </>
            }
            example={<CodeBlock small>{`<a href="#contact">
  اتصل بنا
</a>`}</CodeBlock>}
          />
          <TagCard
            name="رابط بريد إلكتروني"
            desc={
              <>
                يفتح برنامج البريد. نستخدم <code>mailto:</code>.
              </>
            }
            example={<CodeBlock small>{`<a href="mailto:a@b.com">
  راسلني
</a>`}</CodeBlock>}
          />
        </TagGrid>
      </Block>
    </>
  );
}

const lesson: Lesson = {
  slug: "links",
  number: 4,
  title: "الروابط (Hyperlinks)",
  lead: (
    <>
      شرح كامل لتاج <code>&lt;a&gt;</code> وأنواع الروابط وخصائصها.
    </>
  ),
  Body,
  editor: {
    title: "محرر تجريبي — أنواع الروابط",
    defaultCode: `<h2>أنواع الروابط</h2>

<p>
  <a href="https://google.com" target="_blank">
    رابط خارجي إلى Google (نافذة جديدة)
  </a>
</p>

<p>
  <a href="contact.html">رابط داخلي إلى صفحة اتصل بنا</a>
</p>

<p>
  <a href="cv.pdf">رابط لتحميل ملف PDF</a>
</p>

<p>
  <a href="mailto:hello@site.com">راسلنا</a>
</p>`,
  },
  tips: [
    <>
      تاج الرابط هو <code>&lt;a&gt;</code> — أي وجهة دون <code>href</code> لن تعمل.
    </>,
    <>
      <code>target=&quot;_blank&quot;</code> يفتح <strong>نافذة جديدة</strong>.
    </>,
    <>
      الفرق بين الرابط الداخلي والخارجي: الخارجي يبدأ بـ <code>http://</code>، الداخلي يستخدم
      اسم الملف فقط.
    </>,
    <>
      أخطاء شائعة: نسيان وضع علامتي التنصيص حول قيمة <code>href</code>، أو نسيان إغلاق التاج{" "}
      <code>&lt;/a&gt;</code>.
    </>,
  ],
  quiz: {
    mcq: [
      {
        q: "ما هي الخاصية التي تحدد وجهة الرابط؟",
        opts: ["src", "link", "href", "target"],
        correct: 2,
        ok: "ممتاز! href تحدد وجهة الرابط.",
        ko: "الإجابة الصحيحة: href.",
      },
      {
        q: "أي قيمة لـ target تفتح رابطاً في نافذة جديدة؟",
        opts: ["_self", "_blank", "_new", "_window"],
        correct: 1,
        ok: "صحيح! _blank يفتح في نافذة جديدة.",
        ko: "الإجابة الصحيحة: _blank.",
      },
      {
        q: "أي تاج نستخدمه للروابط؟",
        opts: ["<link>", "<href>", "<a>", "<url>"],
        correct: 2,
        ok: "تمام! <a> هو تاج الروابط.",
        ko: "الإجابة الصحيحة: <a>.",
      },
      {
        q: 'الرابط <a href="page.html"> هو رابط...',
        opts: ["خارجي", "داخلي", "بريدي", "صورة"],
        correct: 1,
        ok: "صح! اسم ملف فقط = رابط داخلي.",
        ko: "الإجابة الصحيحة: داخلي.",
      },
    ],
    coding: [
      {
        prompt: 'اكتب رابطاً يفتح موقع google.com في نافذة جديدة، ونصّه "اذهب إلى Google".',
        hint: 'استخدم href و target="_blank".',
        starter: "",
        solution: '<a href="https://google.com" target="_blank">اذهب إلى Google</a>',
        check: (c) =>
          /<a\b[^>]*href\s*=\s*["'][^"']*google\.com[^"']*["'][^>]*>[\s\S]*?<\/a>/i.test(c) &&
          /target\s*=\s*["']_blank["']/i.test(c),
      },
    ],
  },
};

export default lesson;
