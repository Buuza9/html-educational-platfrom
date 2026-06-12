import type { Lesson } from "@/lib/content/types";
import { Block, Bullet, CodeBlock, TagGrid, TagCard } from "@/components/lesson-content";

function Body() {
  return (
    <>
      <Block title="ما هو الإطار (iframe)؟">
        <p>
          <strong>iframe</strong> اختصار لـ <em>inline frame</em>، وهو عنصر يسمح لك بـ{" "}
          <strong>تضمين صفحة أو مَورد آخر داخل صفحتك</strong>. بكلمات أخرى: هو &quot;نافذة&quot;
          صغيرة داخل صفحتك تعرض صفحة ويب أخرى أو فيديو أو خريطة.
        </p>
        <p>
          نكتب العنصر باستخدام التاج <code>&lt;iframe&gt;</code>، ونحدّد عنوان المَورد المراد
          عرضه عبر الواصفة <code>src</code>:
        </p>
        <CodeBlock>{`<iframe src="https://example.com"></iframe>`}</CodeBlock>
      </Block>

      <Block title="الواصفات الأساسية">
        <TagGrid>
          <TagCard
            name="src"
            desc={
              <>
                عنوان (URL) الصفحة أو المَورد الذي سيُعرَض داخل الإطار. هي{" "}
                <strong>أهم واصفة</strong>.
              </>
            }
            example={<CodeBlock small>{`src="https://example.com"`}</CodeBlock>}
          />
          <TagCard
            name="width"
            desc="عرض الإطار (بالبكسل)."
            example={<CodeBlock small>{`width="400"`}</CodeBlock>}
          />
          <TagCard
            name="height"
            desc="ارتفاع الإطار (بالبكسل)."
            example={<CodeBlock small>{`height="300"`}</CodeBlock>}
          />
          <TagCard
            name="title"
            desc={
              <>
                وصف نصّي للإطار، مهم لـ <strong>إمكانية الوصول</strong> (accessibility) ولقارئات
                الشاشة.
              </>
            }
            example={<CodeBlock small>{`title="موقع مثال"`}</CodeBlock>}
          />
        </TagGrid>
      </Block>

      <Block title="مثال كامل">
        <CodeBlock>{`<iframe
  src="https://example.com"
  width="400"
  height="300"
  title="موقع مثال">
</iframe>`}</CodeBlock>
      </Block>

      <Block title="استخدامات شائعة">
        <Bullet
          items={[
            <>
              تضمين <strong>فيديوهات يوتيوب</strong> داخل صفحتك مباشرة.
            </>,
            <>
              تضمين <strong>خرائط Google Maps</strong>.
            </>,
            "عرض صفحة خارجية أو مستند داخل صفحتك دون مغادرتها.",
          ]}
        />
        <p>مثال على تضمين فيديو يوتيوب:</p>
        <CodeBlock>{`<iframe
  src="https://www.youtube.com/embed/xxxxx"
  width="560"
  height="315"
  title="فيديو تعليمي">
</iframe>`}</CodeBlock>
      </Block>

      <Block title="لماذا الواصفة title مهمّة؟">
        <p>
          الواصفة <code>title</code> تصف محتوى الإطار للمستخدمين الذين يعتمدون على{" "}
          <strong>قارئات الشاشة</strong>، فيعرفون ما الذي يحتويه هذا الإطار. لذلك يُنصح دائماً
          بإضافتها لكل <code>&lt;iframe&gt;</code>.
        </p>
      </Block>
    </>
  );
}

const lesson: Lesson = {
  slug: "iframes",
  number: 13,
  title: "الإطارات (iframes)",
  lead: "كيف نضمّن صفحة أو فيديو أو خريطة داخل صفحتنا باستخدام عنصر <iframe>.",
  Body,
  editor: {
    title: "محرر تجريبي — تضمين صفحة عبر iframe",
    defaultCode: `<h2>صفحة مضمّنة داخل صفحتي</h2>

<iframe
  src="https://example.com"
  width="400"
  height="300"
  title="موقع مثال">
</iframe>`,
  },
  tips: [
    <>
      الواصفة <code>src</code> تحدّد عنوان المَورد المُراد عرضه داخل الإطار.
    </>,
    <>
      نضبط حجم الإطار عبر <code>width</code> و<code>height</code>.
    </>,
    <>
      أضِف دائماً <code>title</code> لتحسين إمكانية الوصول (accessibility).
    </>,
  ],
  quiz: {
    mcq: [
      {
        q: "ما الذي يفعله عنصر <iframe>؟",
        opts: [
          "يضمّن صفحة أو مَورداً آخر داخل صفحتك",
          "ينشئ فقرة نصية",
          "يضيف نمطاً (CSS) للصفحة",
          "يُنشئ رابطاً خارجياً",
        ],
        correct: 0,
        ok: "صحيح! الـ iframe يضمّن صفحة/مَورداً آخر داخل صفحتك.",
        ko: "الإجابة الصحيحة: يضمّن صفحة أو مَورداً آخر داخل صفحتك.",
      },
      {
        q: "أي واصفة تحدّد عنوان (URL) المَورد المُضمَّن داخل الإطار؟",
        opts: ["href", "src", "link", "url"],
        correct: 1,
        ok: "ممتاز! الواصفة src هي التي تحدّد عنوان المَورد.",
        ko: "الإجابة الصحيحة: src.",
      },
      {
        q: "لماذا تُعتبر الواصفة title مهمّة في الـ iframe؟",
        opts: [
          "لتغيير لون الإطار",
          "لتكبير الفيديو",
          "لتحسين إمكانية الوصول ووصف الإطار لقارئات الشاشة",
          "لتسريع تحميل الصفحة",
        ],
        correct: 2,
        ok: "صحيح! title تصف الإطار لقارئات الشاشة (accessibility).",
        ko: "الإجابة الصحيحة: لتحسين إمكانية الوصول ووصف الإطار لقارئات الشاشة.",
      },
    ],
    coding: [
      {
        prompt:
          'اكتب عنصر <iframe> يعرض الموقع "https://example.com" مع إضافة واصفة title مناسبة.',
        hint: 'استخدم <iframe src="https://example.com" title="...">.',
        starter: "<iframe\n\n></iframe>",
        solution:
          '<iframe src="https://example.com" title="موقع مثال"></iframe>',
        check: (c) =>
          /<iframe\b[^>]*\bsrc\s*=\s*["']https:\/\/example\.com["'][^>]*\btitle\s*=\s*["'][^"']+["']/i.test(c) ||
          /<iframe\b[^>]*\btitle\s*=\s*["'][^"']+["'][^>]*\bsrc\s*=\s*["']https:\/\/example\.com["']/i.test(c),
      },
    ],
  },
};

export default lesson;
