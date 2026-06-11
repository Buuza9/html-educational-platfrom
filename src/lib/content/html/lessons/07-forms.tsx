import type { Lesson } from "@/lib/content/types";
import { Block, TagGrid, TagCard } from "@/components/lesson-content";

function Body() {
  return (
    <>
      <Block title="ما هو النموذج؟">
        <p>
          النموذج (Form) هو وسيلة لجمع البيانات من المستخدم — مثل صفحات تسجيل الدخول، التسجيل في
          موقع، أو ترك تعليق. نستخدم تاج <code>&lt;form&gt;</code> كحاوية، وتحته نضع{" "}
          <strong>حقول الإدخال</strong> (<code>&lt;input&gt;</code>).
        </p>
      </Block>

      <TagGrid>
        <TagCard
          name={<>&lt;form&gt;</>}
          desc="حاوية النموذج. تجمع كل حقول الإدخال معاً."
          when="عند الحاجة لجمع بيانات من المستخدم."
        />
        <TagCard
          name={<>&lt;input&gt;</>}
          desc={
            <>
              حقل إدخال — يتغيّر نوعه حسب <code>type</code>: <code>text</code>,{" "}
              <code>password</code>, <code>email</code>, <code>checkbox</code>, <code>radio</code>,{" "}
              <code>submit</code>...
            </>
          }
          when="لكل حقل بيانات (اسم، إيميل، كلمة سر، إلخ)."
        />
        <TagCard
          name={<>&lt;label&gt;</>}
          desc={
            <>
              يكتب <strong>التسمية</strong> أمام الحقل (مثل &quot;الاسم:&quot;). يُربط بالحقل عبر{" "}
              <code>for</code>.
            </>
          }
          when="دائماً قبل كل حقل لتحسين تجربة المستخدم."
        />
        <TagCard
          name={<>&lt;textarea&gt;</>}
          desc={
            <>
              حقل نصّي <strong>كبير ومتعدد الأسطر</strong> (مثل خانة الرسائل).
            </>
          }
          when="عندما يحتاج المستخدم لكتابة نص طويل."
        />
        <TagCard
          name={<>&lt;button&gt;</>}
          desc="زر — غالباً يُستخدم لإرسال النموذج."
          when="في نهاية النموذج لإرسال البيانات."
        />
        <TagCard
          name={<>&lt;select&gt;</>}
          desc={
            <>
              قائمة منسدلة (Drop-down) فيها خيارات <code>&lt;option&gt;</code>.
            </>
          }
          when="لاختيار قيمة واحدة من قائمة (مثل اختيار الدولة)."
        />
      </TagGrid>
    </>
  );
}

const lesson: Lesson = {
  slug: "forms",
  number: 7,
  title: "النماذج (Forms)",
  lead: "كيفية إنشاء حقول إدخال لجمع البيانات من المستخدم.",
  Body,
  editor: {
    title: "محرر تجريبي — نموذج كامل",
    defaultCode: `<form>
  <label for="uname">الاسم:</label><br>
  <input type="text" id="uname" placeholder="اكتب اسمك"><br><br>

  <label for="mail">البريد الإلكتروني:</label><br>
  <input type="email" id="mail"><br><br>

  <label for="pwd">كلمة المرور:</label><br>
  <input type="password" id="pwd"><br><br>

  <label>الجنس:</label><br>
  <input type="radio" name="g" id="m">
  <label for="m">ذكر</label>
  <input type="radio" name="g" id="f">
  <label for="f">أنثى</label><br><br>

  <label for="msg">ملاحظاتك:</label><br>
  <textarea id="msg" rows="3" cols="30"></textarea><br><br>

  <button type="submit">إرسال</button>
</form>`,
  },
  tips: [
    <>
      <code>&lt;input&gt;</code> تاج <strong>مفرد</strong>، نوعه يحدد شكله.
    </>,
    <>
      أنواع <code>type</code> الأكثر شيوعاً: <code>text</code>, <code>password</code>,{" "}
      <code>email</code>, <code>radio</code>, <code>checkbox</code>, <code>submit</code>.
    </>,
    <>
      اربط <code>&lt;label&gt;</code> بالحقل باستخدام <code>for</code> + <code>id</code>.
    </>,
    <>
      أزرار <code>radio</code> التي تشترك في نفس <code>name</code> = اختيار واحد فقط منها.
    </>,
  ],
  quiz: {
    mcq: [
      {
        q: "أي نوع input يخفي ما يكتبه المستخدم؟",
        opts: ["hidden", "password", "secret", "text"],
        correct: 1,
        ok: 'صحيح! type="password" يخفي النص.',
        ko: "الإجابة الصحيحة: password.",
      },
      {
        q: "أي تاج لحقل نصّي متعدد الأسطر؟",
        opts: ["<input>", "<textarea>", "<text>", "<area>"],
        correct: 1,
        ok: "تمام! <textarea> للنصوص الطويلة.",
        ko: "الإجابة الصحيحة: <textarea>.",
      },
      {
        q: "كيف تجمع أزرار radio بحيث يُختار واحد فقط منها؟",
        opts: ["بإعطائها نفس id", "بوضعها داخل <group>", "بإعطائها نفس name", "بوضعها داخل <select>"],
        correct: 2,
        ok: "ممتاز! نفس name = اختيار واحد فقط.",
        ko: "الإجابة الصحيحة: نفس name.",
      },
    ],
    coding: [
      {
        prompt: "اكتب نموذجاً (form) فيه حقل نصي للاسم وحقل كلمة سر وزر إرسال (Submit).",
        hint: 'استخدم <form>، input type="text"، input type="password"، input type="submit" أو <button>.',
        starter: "",
        solution: '<form>\n  <input type="text" name="username">\n  <input type="password" name="pw">\n  <button type="submit">إرسال</button>\n</form>',
        check: (c) => /<form\b[\s\S]*<\/form>/i.test(c)
          && /<input\b[^>]*type\s*=\s*["']text["']/i.test(c)
          && /<input\b[^>]*type\s*=\s*["']password["']/i.test(c)
          && (/<input\b[^>]*type\s*=\s*["']submit["']/i.test(c) || /<button\b[\s\S]*?<\/button>/i.test(c)),
      },
    ],
  },
};

export default lesson;
