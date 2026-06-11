import type { Lesson } from "@/lib/content/types";
import { Block, CodeBlock, TagGrid, TagCard } from "@/components/lesson-content";

function Body() {
  return (
    <>
      <Block title="الجدول في HTML">
        <p>
          الجدول مكوّن من <strong>صفوف</strong> (Rows) و<strong>خلايا</strong> (Cells). كل خلية
          تنتمي إلى صف، وكل صف يحتوي على عدّة خلايا.
        </p>
      </Block>

      <TagGrid>
        <TagCard
          name={<>&lt;table&gt;</>}
          desc={
            <>
              يُحدّد <strong>الجدول</strong> ككل، وهو الحاوية الأساسية.
            </>
          }
          when="لعرض البيانات في صفوف وأعمدة."
        />
        <TagCard
          name={<>&lt;tr&gt;</>}
          desc={
            <>
              Table Row — يُمثّل <strong>صفّاً واحداً</strong> داخل الجدول.
            </>
          }
          when="لكل صف أفقي."
        />
        <TagCard
          name={<>&lt;th&gt;</>}
          desc={
            <>
              Table Header — <strong>خلية عنوان</strong> (تظهر غامقة وفي المنتصف).
            </>
          }
          when="لعناوين الأعمدة في الصف الأول عادة."
        />
        <TagCard
          name={<>&lt;td&gt;</>}
          desc={
            <>
              Table Data — <strong>خلية بيانات عادية</strong>.
            </>
          }
          when="لمحتوى الجدول الفعلي (الأرقام، الأسماء، إلخ)."
        />
      </TagGrid>

      <Block title="مثال جدول بسيط">
        <CodeBlock>{`<table border="1">
  <tr>
    <th>الاسم</th>
    <th>العمر</th>
  </tr>
  <tr>
    <td>أحمد</td>
    <td>25</td>
  </tr>
  <tr>
    <td>سارة</td>
    <td>22</td>
  </tr>
</table>`}</CodeBlock>
      </Block>

      <Block
        title={
          <>
            🔥 دمج الخلايا: <code>colspan</code> و <code>rowspan</code>
          </>
        }
      >
        <p>
          هاتان خاصيتان مهمّتان جداً تُستخدمان لـ<strong>دمج خلايا</strong> الجدول.
        </p>

        <h4 className="font-bold">
          <code>colspan</code> — دمج عمودين أو أكثر
        </h4>
        <p>
          تُستخدم لجعل خلية تمتد <strong>أفقياً</strong> عبر عدة أعمدة.
        </p>
        <CodeBlock small>{`<tr>
  <td colspan="2">خلية ممتدة</td>
</tr>`}</CodeBlock>
        <p>لاحظ كيف &quot;المجموع&quot; يمتد على عمودين.</p>

        <h4 className="font-bold">
          <code>rowspan</code> — دمج صفّين أو أكثر
        </h4>
        <p>
          تُستخدم لجعل خلية تمتد <strong>عمودياً</strong> عبر عدة صفوف.
        </p>
        <CodeBlock small>{`<tr>
  <td rowspan="2">خلية ممتدة</td>
  <td>A</td>
</tr>
<tr>
  <td>B</td>
</tr>`}</CodeBlock>
        <p>لاحظ كيف &quot;العاشر&quot; يمتد على صفّين.</p>

        <p>
          <strong>انتبه:</strong> عند استخدام <code>colspan=&quot;2&quot;</code> في صف، يجب أن يحتوي
          الصف على خلية واحدة <strong>أقل</strong> من باقي الصفوف لأن خلية واحدة تأخذ مساحة عمودين.
        </p>
      </Block>
    </>
  );
}

const lesson: Lesson = {
  slug: "tables",
  number: 6,
  title: "الجداول (Tables)",
  lead: (
    <>
      شرح كامل لـ <code>&lt;table&gt;</code>, <code>&lt;tr&gt;</code>, <code>&lt;td&gt;</code>,{" "}
      <code>&lt;th&gt;</code> + خاصيتي <code>rowspan</code> و <code>colspan</code>.
    </>
  ),
  Body,
  editor: {
    title: "محرر تجريبي — جدول مع colspan و rowspan",
    defaultCode: `<table border="1" cellpadding="8">
  <tr>
    <th colspan="3">جدول الطلاب</th>
  </tr>
  <tr>
    <th>الاسم</th>
    <th>الصف</th>
    <th>الدرجة</th>
  </tr>
  <tr>
    <td rowspan="2">مجموعة A</td>
    <td>العاشر</td>
    <td>88</td>
  </tr>
  <tr>
    <td>الحادي عشر</td>
    <td>92</td>
  </tr>
</table>`,
  },
  tips: [
    <>
      <code>&lt;th&gt;</code> للعناوين، <code>&lt;td&gt;</code> للبيانات.
    </>,
    <>
      <code>colspan</code> = دمج <strong>أعمدة</strong> (أفقي). <code>rowspan</code> = دمج{" "}
      <strong>صفوف</strong> (عمودي).
    </>,
    <>
      <code>border=&quot;1&quot;</code> يضيف حدوداً للجدول، أما الأنسب فهو استخدام CSS.
    </>,
    <>
      تذكّر: عدد <code>&lt;td&gt;</code> في كل <code>&lt;tr&gt;</code> يجب أن يساوي عدد الأعمدة (مع
      مراعاة الدمج).
    </>,
  ],
  quiz: {
    mcq: [
      {
        q: "أي خاصية تستخدم لدمج خلايا أفقياً (عبر أعمدة)؟",
        opts: ["rowspan", "colspan", "merge", "span"],
        correct: 1,
        ok: "ممتاز! colspan = دمج أعمدة.",
        ko: "الإجابة الصحيحة: colspan.",
      },
      {
        q: "أي خاصية تستخدم لدمج خلايا عمودياً (عبر صفوف)؟",
        opts: ["rowspan", "colspan", "cellspan", "cellmerge"],
        correct: 0,
        ok: "صحيح! rowspan = دمج صفوف.",
        ko: "الإجابة الصحيحة: rowspan.",
      },
      {
        q: "أي تاج يستخدم لخلايا العناوين في الجدول؟",
        opts: ["<td>", "<tr>", "<th>", "<header>"],
        correct: 2,
        ok: "تمام! <th> = table header.",
        ko: "الإجابة الصحيحة: <th>.",
      },
      {
        q: "ماذا يمثّل تاج <tr>؟",
        opts: ["خلية", "صف", "عمود", "عنوان"],
        correct: 1,
        ok: "صحيح! <tr> = table row.",
        ko: "الإجابة الصحيحة: صف (row).",
      },
    ],
    coding: [
      {
        prompt: 'اكتب جدولاً بصفّ عناوين فيه "الاسم" و"العمر"، وصفّ بيانات: "أحمد" و 20.',
        hint: "استخدم <table>، ثم <tr> فيها <th> للعناوين و<td> للبيانات.",
        starter: "",
        solution:
          '<table border="1">\n  <tr><th>الاسم</th><th>العمر</th></tr>\n  <tr><td>أحمد</td><td>20</td></tr>\n</table>',
        check: (c) =>
          /<table\b[\s\S]*<\/table>/i.test(c) &&
          /<th\b[\s\S]*?الاسم[\s\S]*?<\/th>/.test(c) &&
          /<th\b[\s\S]*?العمر[\s\S]*?<\/th>/.test(c) &&
          /<td\b[\s\S]*?أحمد[\s\S]*?<\/td>/.test(c) &&
          /<td\b[\s\S]*?20[\s\S]*?<\/td>/.test(c),
      },
    ],
  },
};

export default lesson;
