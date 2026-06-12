import type { Lesson } from "@/lib/content/types";
import { Block, Bullet, CodeBlock, TagGrid, TagCard } from "@/components/lesson-content";

function Body() {
  return (
    <>
      <Block title="كل عنصر هو صندوق">
        <p>
          في CSS يُعامَل كل عنصر في الصفحة على أنه <strong>صندوق مستطيل</strong>، وهذا
          الصندوق يتكوّن من أربع طبقات مرتّبة من الداخل إلى الخارج:
        </p>
        <Bullet
          items={[
            <>
              <strong>المحتوى (content):</strong> النص أو الصورة داخل العنصر.
            </>,
            <>
              <strong>الحشو (padding):</strong> مسافة فارغة <em>بين المحتوى والحدود</em>،
              تأخذ لون خلفية العنصر.
            </>,
            <>
              <strong>الحدود (border):</strong> الإطار المحيط بالحشو والمحتوى.
            </>,
            <>
              <strong>الهامش (margin):</strong> مسافة فارغة <em>خارج الحدود</em> تفصل
              العنصر عمّا حوله، وهي شفّافة.
            </>,
          ]}
        />
        <p>
          الترتيب من الداخل للخارج إذًا هو: <code>content → padding → border → margin</code>.
        </p>
      </Block>

      <TagGrid>
        <TagCard
          name="padding"
          desc={
            <>
              الحشو الداخلي بين المحتوى والحدود. قيمة واحدة تُطبَّق على الجهات الأربع.
            </>
          }
          example={<CodeBlock small>{`padding: 20px;`}</CodeBlock>}
        />
        <TagCard
          name="padding-top / -right / -bottom / -left"
          desc={<>التحكّم في حشو جهة واحدة فقط.</>}
          example={<CodeBlock small>{`padding-top: 10px;
padding-left: 30px;`}</CodeBlock>}
        />
        <TagCard
          name="margin"
          desc={<>الهامش الخارجي حول العنصر، له أيضًا الجهات الأربع.</>}
          example={<CodeBlock small>{`margin: 16px;
margin-bottom: 0;`}</CodeBlock>}
        />
        <TagCard
          name="margin: auto"
          desc={
            <>
              مع عنصر <strong>block</strong> له <code>width</code> محدّد، يوزّع المساحة
              المتبقية على الجانبين فيتمركز أفقيًّا.
            </>
          }
          example={<CodeBlock small>{`width: 300px;
margin: 0 auto;`}</CodeBlock>}
        />
        <TagCard
          name="border"
          desc={
            <>
              الإطار، ويُكتب بالشكل: السُّمك ثم النوع ثم اللون.
            </>
          }
          example={<CodeBlock small>{`border: 2px solid #333;`}</CodeBlock>}
        />
        <TagCard
          name="box-sizing"
          desc={
            <>
              يحدّد هل <code>width</code> يشمل الحشو والحدود أم لا. القيمة المفضّلة{" "}
              <code>border-box</code>.
            </>
          }
          example={<CodeBlock small>{`box-sizing: border-box;`}</CodeBlock>}
        />
      </TagGrid>

      <Block title="الاختصار (shorthand) للحشو والهامش">
        <p>
          يمكن تمرير أكثر من قيمة لـ <code>padding</code> أو <code>margin</code> في سطر
          واحد، والترتيب يبدأ من الأعلى ثم يدور باتجاه عقارب الساعة:
        </p>
        <Bullet
          items={[
            <>
              قيمة واحدة: <code>padding: 20px;</code> — الجهات الأربع.
            </>,
            <>
              قيمتان: <code>padding: 10px 30px;</code> — (أعلى/أسفل) ثم (يمين/يسار).
            </>,
            <>
              أربع قيم: <code>padding: 5px 10px 15px 20px;</code> — أعلى، يمين، أسفل،
              يسار.
            </>,
          ]}
        />
      </Block>

      <Block title="box-sizing: لماذا نختار border-box؟">
        <p>
          القيمة الافتراضية <code>content-box</code> تجعل <code>width</code> يساوي عرض
          المحتوى فقط، فيُضاف الحشو والحدود <strong>فوق</strong> العرض المطلوب. مثلًا عنصر
          عرضه <code>200px</code> مع حشو <code>20px</code> وحد <code>2px</code> يصبح عرضه
          الفعلي <code>244px</code>.
        </p>
        <p>
          أما <code>border-box</code> فيجعل <code>width</code> يشمل الحشو والحدود، فيبقى
          العرض الفعلي <code>200px</code> تمامًا — وهذا أسهل في الحساب، لذلك يُنصح به.
        </p>
        <CodeBlock>{`* {
  box-sizing: border-box;
}`}</CodeBlock>
      </Block>
    </>
  );
}

const lesson: Lesson = {
  slug: "box-model",
  number: 8,
  title: "النموذج الصندوقي (Box Model)",
  lead: "كل عنصر صندوق من محتوى وحشو وحدود وهامش — تعلّم padding وmargin وbox-sizing.",
  Body,
  editor: {
    title: "محرر تجريبي — طبقات الصندوق",
    defaultCode: `<style>
  .box {
    box-sizing: border-box;
    width: 300px;
    background-color: #cf1a11;
    color: white;
    padding: 20px;
    border: 4px solid #333;
    margin: 30px auto;
    text-align: center;
  }
</style>

<div class="box">
  صندوق له خلفية وحشو 20px وحد 4px وهامش يتمركز أفقيًّا.
</div>`,
  },
  tips: [
    <>
      الترتيب من الداخل للخارج: <code>content → padding → border → margin</code>.
    </>,
    <>
      <code>margin: 0 auto</code> يتمركز العنصر block أفقيًّا (مع وجود <code>width</code>).
    </>,
    <>
      <code>box-sizing: border-box</code> يجعل <code>width</code> يشمل الحشو والحدود.
    </>,
  ],
  quiz: {
    mcq: [
      {
        q: "ما الترتيب الصحيح لطبقات الصندوق من الداخل إلى الخارج؟",
        opts: [
          "border → padding → content → margin",
          "content → padding → border → margin",
          "margin → border → padding → content",
          "content → margin → border → padding",
        ],
        correct: 1,
        ok: "صحيح! المحتوى ثم الحشو ثم الحدود ثم الهامش.",
        ko: "الترتيب الصحيح: content → padding → border → margin.",
      },
      {
        q: "أي قيمة تُستخدم لتمركز عنصر block أفقيًّا؟",
        opts: ["text-align: center", "margin: auto", "padding: auto", "float: center"],
        correct: 1,
        ok: "تمام! margin: auto يوزّع المساحة على الجانبين.",
        ko: "الإجابة الصحيحة: margin: auto.",
      },
      {
        q: "ماذا يفعل box-sizing: border-box؟",
        opts: [
          "يلغي الحدود تمامًا",
          "يجعل width يشمل الحشو والحدود",
          "يضيف الحشو فوق العرض المحدّد",
          "يحوّل العنصر إلى inline",
        ],
        correct: 1,
        ok: "ممتاز! العرض يشمل الحشو والحدود.",
        ko: "الإجابة الصحيحة: يجعل width يشمل الحشو والحدود.",
      },
    ],
    coding: [
      {
        prompt:
          "اكتب قاعدة CSS للعنصر <div> تعطيه حشوًا (padding) مقداره 20px وحدًّا (border) بسُمك 2px من النوع solid.",
        hint: "استخدم padding: 20px; وborder: 2px solid <لون>; داخل قاعدة div.",
        starter: "<style>\n  div {\n\n  }\n</style>",
        solution:
          "<style>\n  div {\n    padding: 20px;\n    border: 2px solid black;\n  }\n</style>",
        check: (c) =>
          /div\s*\{[^}]*\}/i.test(c) &&
          /padding\s*:\s*20px/i.test(c) &&
          /border\s*:\s*2px\s+solid\b/i.test(c),
      },
    ],
  },
};

export default lesson;
