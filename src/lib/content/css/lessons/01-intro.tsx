import type { Lesson } from "@/lib/content/types";
import { Block, Bullet } from "@/components/lesson-content";

function Body() {
  return (
    <>
      <Block title="ما هي CSS؟">
        <p>
          <strong>CSS</strong> اختصار لـ <em>Cascading Style Sheets</em> (أوراق الأنماط
          الانسيابيَّة). فبينما تهتم <strong>HTML</strong> بوصف <strong>عناصر</strong> الصفحة
          (هذا عنوان، هذه فقرة، هذه صورة)، تهتم <strong>CSS</strong> بوصف{" "}
          <strong>شكل ومظهر</strong> هذه العناصر (لونها، حجمها، محاذاتها، خلفيتها...).
        </p>
        <p>باختصار: HTML تبني الهيكل، و CSS تُلبِسه وتُجمِّله.</p>
      </Block>

      <Block title="المشكلة قبل CSS">
        <p>
          عند تصميم HTML كان التركيز على <strong>وصف المحتوى فقط</strong>، وتُركت مهمة المظهر
          للمتصفحات. لاحقاً أُضيفت وسوم تنسيق مثل <code>&lt;font&gt;</code> لتحديد نوع الخط
          وحجمه ولونه داخل كل صفحة، لكن هذا تحوّل إلى <strong>كارثة</strong>: موقع فيه مئات
          الصفحات يحتاج تنسيق كل صفحة على حدة، مع صعوبة الحصول على مظهر موحَّد.
        </p>
        <p>
          جاءت CSS لتحلّ المشكلة: تكتب وصف مظهر العنصر <strong>في مكان واحد ومرة واحدة</strong>،
          ثم يُطبَّق على جميع الصفحات المرتبطة بنفس ملف CSS.
        </p>
      </Block>

      <Block title="لماذا نتعلّم CSS؟">
        <Bullet
          items={[
            <>
              لفصل <strong>المحتوى</strong> (HTML) عن <strong>المظهر</strong> (CSS).
            </>,
            "لتوحيد تنسيق الموقع بالكامل من ملف واحد.",
            "لتقليل التكرار وتسهيل الصيانة والتعديل.",
            "لأنها المهارة التالية الطبيعية بعد تعلّم HTML.",
          ]}
        />
      </Block>
    </>
  );
}

const lesson: Lesson = {
  slug: "intro",
  number: 1,
  title: "مقدمة عن CSS",
  lead: "ما هي أوراق الأنماط الانسيابيَّة CSS؟ ولماذا غيّرت طريقة تنسيق صفحات الويب؟",
  Body,
  tips: [
    <>
      CSS = <strong>Cascading Style Sheets</strong>.
    </>,
    <>
      HTML تصف <strong>العناصر</strong>، و CSS تصف <strong>المظهر</strong>.
    </>,
    <>
      أكبر ميزة في CSS: اكتب التنسيق <strong>مرة واحدة</strong> وطبّقه على كل الصفحات.
    </>,
  ],
  quiz: {
    mcq: [
      {
        q: "ماذا يعني اختصار CSS؟",
        opts: [
          "Cascading Style Sheets",
          "Computer Style System",
          "Creative Styling Syntax",
          "Colorful Style Sheets",
        ],
        correct: 0,
        ok: "ممتاز! CSS = Cascading Style Sheets.",
        ko: "الإجابة الصحيحة: Cascading Style Sheets.",
      },
      {
        q: "ما الفرق بين HTML و CSS؟",
        opts: [
          "لا فرق بينهما",
          "HTML تصف العناصر و CSS تصف المظهر",
          "CSS تصف العناصر و HTML تصف المظهر",
          "كلاهما للبرمجة",
        ],
        correct: 1,
        ok: "صحيح! HTML للهيكل و CSS للمظهر.",
        ko: "الإجابة الصحيحة: HTML تصف العناصر و CSS تصف المظهر.",
      },
      {
        q: "ما أكبر ميزة جاءت بها CSS؟",
        opts: [
          "تسريع الإنترنت",
          "كتابة التنسيق مرة واحدة وتطبيقه على عدة صفحات",
          "إنشاء قواعد بيانات",
          "تشغيل الفيديو",
        ],
        correct: 1,
        ok: "تمام! تكتب التنسيق مرة واحدة وتطبّقه على الكل.",
        ko: "الإجابة الصحيحة: كتابة التنسيق مرة واحدة وتطبيقه على عدة صفحات.",
      },
    ],
    coding: [],
  },
};

export default lesson;
