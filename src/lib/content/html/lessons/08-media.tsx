import type { Lesson } from "@/lib/content/types";
import { TagGrid, TagCard, CodeBlock } from "@/components/lesson-content";

function Body() {
  return (
    <>
      <TagGrid>
        <TagCard
          name={<>&lt;img&gt;</>}
          desc={
            <>
              يُستخدم لعرض <strong>الصور</strong>. تاج مفرد. أهم خاصياته: <code>src</code> (مسار
              الصورة)، <code>alt</code> (نص بديل)، <code>width</code> و<code>height</code>.
            </>
          }
          example={
            <CodeBlock small>{`<img src="cat.jpg"
     alt="قطة"
     width="200">`}</CodeBlock>
          }
        />

        <TagCard
          name={<>&lt;audio&gt;</>}
          desc={
            <>
              يضيف <strong>ملف صوتي</strong> مع أزرار التشغيل. استخدم <code>controls</code> لإظهار
              الأدوات.
            </>
          }
          example={
            <CodeBlock small>{`<audio src="song.mp3"
       controls>
</audio>`}</CodeBlock>
          }
        />

        <TagCard
          name={<>&lt;video&gt;</>}
          desc={
            <>
              يضيف <strong>مقطع فيديو</strong>. خصائص شبيهة بالصوت + <code>width</code> و
              <code>height</code>.
            </>
          }
          example={
            <CodeBlock small>{`<video src="film.mp4"
       controls
       width="320">
</video>`}</CodeBlock>
          }
        />

        <TagCard
          name={<>&lt;iframe&gt;</>}
          desc={
            <>
              يُضمّن <strong>صفحة أخرى</strong> داخل صفحتك (مثل خرائط Google أو فيديو يوتيوب).
            </>
          }
          example={
            <CodeBlock small>{`<iframe
  src="https://example.com">
</iframe>`}</CodeBlock>
          }
        />
      </TagGrid>
    </>
  );
}

const lesson: Lesson = {
  slug: "media",
  number: 8,
  title: "الوسائط (Media)",
  lead: (
    <>
      إضافة الصور <code>&lt;img&gt;</code>، الصوت <code>&lt;audio&gt;</code>، والفيديو{" "}
      <code>&lt;video&gt;</code>.
    </>
  ),
  Body,
  editor: {
    title: "محرر تجريبي — الصور والفيديو والصوت",
    defaultCode: `<h3>صورة:</h3>
<img src="https://picsum.photos/300/180" alt="صورة عشوائية" width="300">

<h3>فيديو:</h3>
<video width="320" controls>
  <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">
  متصفحك لا يدعم الفيديو.
</video>

<h3>صوت:</h3>
<audio controls>
  <source src="https://www.w3schools.com/html/horse.mp3" type="audio/mpeg">
  متصفحك لا يدعم الصوت.
</audio>`,
  },
  tips: [
    <>
      <code>&lt;img&gt;</code> تاج <strong>مفرد</strong> ولا يحتاج إغلاق.
    </>,
    <>
      <code>alt</code> مهم للوصولية ولظهور النص إذا فشل تحميل الصورة.
    </>,
    <>
      أضف <code>controls</code> ليظهر زر التشغيل في الصوت والفيديو.
    </>,
  ],
  quiz: {
    mcq: [
      { q: 'أي خاصية تحدد مسار الصورة في تاج <img>؟', opts: ['href', 'src', 'link', 'path'], correct: 1, ok: 'صحيح! src = source.', ko: 'الإجابة الصحيحة: src.' },
      { q: 'لماذا نستخدم خاصية alt في الصورة؟', opts: ['لتغيير حجم الصورة', 'لإظهار نص بديل ولأغراض الوصولية', 'لتغيير لون الصورة', 'ليست مهمة'], correct: 1, ok: 'ممتاز! alt = نص بديل + وصولية.', ko: 'الإجابة الصحيحة: نص بديل + وصولية.' },
      { q: 'كيف نُظهر أزرار التشغيل في الفيديو؟', opts: ['إضافة play="true"', 'إضافة controls', 'إضافة show="yes"', 'تظهر تلقائياً'], correct: 1, ok: 'صح! controls = تظهر الأدوات.', ko: 'الإجابة الصحيحة: controls.' }
    ],
    coding: [
      {
        prompt: 'أدرج صورة من المسار "logo.png" مع نص بديل "شعار الموقع".',
        hint: 'تاج <img> ذاتي الإغلاق، يحتاج src و alt.',
        starter: '',
        solution: '<img src="logo.png" alt="شعار الموقع">',
        check: (c) => /<img\b[^>]*src\s*=\s*["']logo\.png["'][^>]*alt\s*=\s*["']شعار\s*الموقع["']/i.test(c)
          || /<img\b[^>]*alt\s*=\s*["']شعار\s*الموقع["'][^>]*src\s*=\s*["']logo\.png["']/i.test(c)
      }
    ]
  },
};

export default lesson;
