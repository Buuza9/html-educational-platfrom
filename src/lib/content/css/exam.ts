import type { Exam } from "@/lib/content/types";

export const cssExam: Exam = {
  mcq: [
    { topic: 'CSS', q: 'ماذا يعني اختصار CSS؟', opts: ['Cascading Style Sheets', 'Creative Style System', 'Computer Styled Syntax', 'Colorful Sheet Styles'], correct: 0 },
    { topic: 'CSS', q: 'أين تُكتب CSS الداخليَّة؟', opts: ['داخل <body>', 'داخل <style> في <head>', 'في ملف منفصل', 'داخل <script>'], correct: 1 },
    { topic: 'CSS', q: 'أي وسم يربط ملف CSS خارجي؟', opts: ['<style>', '<link>', '<css>', '<src>'], correct: 1 },
    { topic: 'CSS', q: 'الرمز الذي يسبق محدِّد الفئة (class) هو:', opts: ['#', '.', '@', '*'], correct: 1 },
    { topic: 'CSS', q: 'الرمز الذي يسبق محدِّد المعرّف (id) هو:', opts: ['.', '#', '&', '%'], correct: 1 },
    { topic: 'CSS', q: 'قيمة text-align التي تجعل الأسطر متساوية العرض:', opts: ['center', 'justify', 'right', 'left'], correct: 1 },
    { topic: 'CSS', q: '1em يساوي كم بكسل افتراضياً؟', opts: ['10px', '16px', '20px', '12px'], correct: 1 },
    { topic: 'CSS', q: 'محدِّد الرابط عند مرور الفأرة فوقه:', opts: ['a:link', 'a:visited', 'a:hover', 'a:active'], correct: 2 },
    { topic: 'CSS', q: 'قيمة background-repeat التي تمنع تكرار الصورة:', opts: ['repeat', 'repeat-x', 'no-repeat', 'once'], correct: 2 },
    { topic: 'CSS', q: 'قيمة font-style للخط المائل:', opts: ['bold', 'italic', 'slant', 'oblique-normal'], correct: 1 },
    { topic: 'CSS ألوان', q: 'ما القناة الرابعة في rgba() مقارنةً بـ rgb()؟', opts: ['السطوع', 'الشفافية (alpha)', 'التشبّع', 'درجة اللون'], correct: 1, ok: 'صحيح، alpha بين 0 و 1 تتحكّم بالشفافية.', ko: 'القناة الرابعة هي alpha التي تحدّد الشفافية.' },
    { topic: 'CSS ألوان', q: 'وحدة rem تُحسب نسبةً إلى:', opts: ['حجم خط العنصر نفسه', 'حجم خط العنصر الجذر <html>', 'عرض الشاشة', 'حجم خط العنصر الأب'], correct: 1, ok: 'تماماً، rem مرتبطة بحجم خط الجذر.', ko: 'rem تُحسب من حجم خط العنصر الجذر <html>، بخلاف em.' },
    { topic: 'CSS ألوان', q: 'اللون بصيغة hex ‎#ff0000‎ يقابل أي لون؟', opts: ['أخضر', 'أزرق', 'أحمر', 'أسود'], correct: 2 },
    { topic: 'CSS محددات', q: 'المحدِّد ‎div > p‎ يطابق:', opts: ['كل <p> داخل <div> على أي عمق', 'فقط <p> الأبناء المباشرين لـ <div>', 'أول <p> بعد <div>', 'كل <div> داخل <p>'], correct: 1, ok: 'صحيح، الرمز > للأبناء المباشرين فقط.', ko: 'الرمز > يطابق الأبناء المباشرين فقط، بينما المسافة تطابق كل الأحفاد.' },
    { topic: 'CSS محددات', q: 'أيٌّ ممّا يلي عنصر زائف (pseudo-element)؟', opts: [':hover', ':first-child', '::before', ':nth-child(2)'], correct: 2, ok: 'صحيح، ::before عنصر زائف يضيف محتوى.', ko: '::before عنصر زائف (يُكتب بنقطتين)، أمّا البقية فأصناف زائفة.' },
    { topic: 'CSS كاسكيد', q: 'أيّ محدِّد له أعلى أولويّة (specificity)؟', opts: ['محدِّد العنصر (p)', 'محدِّد الفئة (.box)', 'محدِّد المعرّف (#main)', 'المحدِّد الشامل (*)'], correct: 2, ok: 'صحيح، المعرّف #id أعلى من الفئة والعنصر.', ko: 'المعرّف #id يملك أعلى أولوية بين هذه الخيارات.' },
    { topic: 'CSS انتقالات', q: 'أيّ دالة transform تُحرّك العنصر أفقياً وعمودياً؟', opts: ['rotate()', 'scale()', 'translate()', 'skew()'], correct: 2, ok: 'صحيح، translate(x, y) تنقل العنصر.', ko: 'translate() تنقل العنصر، rotate تدور وscale تكبّر.' },
    { topic: 'CSS Grid', q: 'ماذا تعني الوحدة fr في CSS Grid؟', opts: ['وحدة بكسل ثابتة', 'جزء من المساحة المتاحة', 'نسبة من ارتفاع الشاشة', 'حجم الخط'], correct: 1, ok: 'صحيح، fr توزّع المساحة المتبقية كأجزاء.', ko: 'fr (fraction) تمثّل جزءاً من المساحة الحرّة في الشبكة.' },
    { topic: 'CSS متجاوب', q: 'أيّ استعلام وسائط ينطبق على الشاشات بعرض 600px أو أقل؟', opts: ['@media (min-width: 600px)', '@media (max-width: 600px)', '@media (width: 600px)', '@media screen'], correct: 1, ok: 'صحيح، max-width تستهدف الشاشات الأصغر.', ko: 'max-width: 600px تنطبق عندما يكون العرض 600px أو أقل.' }
  ],
  coding: [
    {
      topic: 'CSS طرق',
      prompt: 'اكتب وسم <link> لربط ملف CSS خارجي اسمه style.css.',
      hint: 'rel="stylesheet" و href="style.css".',
      starter: '',
      solution: '<link rel="stylesheet" type="text/css" href="style.css" />',
      check: (c) => /<link\b[^>]*rel\s*=\s*["']stylesheet["'][^>]*href\s*=\s*["']style\.css["']/i.test(c)
        || /<link\b[^>]*href\s*=\s*["']style\.css["'][^>]*rel\s*=\s*["']stylesheet["']/i.test(c)
    },
    {
      topic: 'CSS محدِّدات',
      prompt: 'اكتب قاعدة CSS (داخل <style>) تجعل كل عناصر <h1> لونها أزرق (blue).',
      hint: 'h1 { color: blue; }',
      starter: '<style>\n\n</style>',
      solution: '<style>\n  h1 { color: blue; }\n</style>',
      check: (c) => /h1\s*\{[^}]*color\s*:\s*blue/i.test(c)
    },
    {
      topic: 'CSS نصوص',
      prompt: 'اكتب قاعدة CSS تجعل الفقرات <p> موسّطة (center) ولون نصّها أحمر (red).',
      hint: 'text-align: center و color: red.',
      starter: '<style>\n  p {\n\n  }\n</style>',
      solution: '<style>\n  p {\n    text-align: center;\n    color: red;\n  }\n</style>',
      check: (c) => /text-align\s*:\s*center/i.test(c) && /color\s*:\s*red\b/i.test(c)
    },
    {
      topic: 'CSS خلفيات',
      prompt: 'اكتب قاعدة CSS تعطي العنصر <body> خلفية لونها أحمر (red).',
      hint: 'background-color: red; داخل قاعدة body.',
      starter: '<style>\n  body {\n\n  }\n</style>',
      solution: '<style>\n  body {\n    background-color: red;\n  }\n</style>',
      check: (c) => /body\s*\{[^}]*background(-color)?\s*:\s*red\b/i.test(c)
    },
    {
      topic: 'CSS Grid',
      prompt: 'اكتب قاعدة CSS تجعل العنصر ذا الفئة .grid شبكةً (grid) بثلاثة أعمدة متساوية باستخدام fr.',
      hint: 'display: grid; و grid-template-columns: 1fr 1fr 1fr;',
      starter: '<style>\n  .grid {\n\n  }\n</style>',
      solution: '<style>\n  .grid {\n    display: grid;\n    grid-template-columns: 1fr 1fr 1fr;\n  }\n</style>',
      check: (c) => /display\s*:\s*grid\b/i.test(c) && /grid-template-columns\s*:\s*1fr\s+1fr\s+1fr/i.test(c)
    },
    {
      topic: 'CSS متجاوب',
      prompt: 'اكتب استعلام وسائط (media query) يجعل خلفية <body> صفراء (yellow) عندما يكون عرض الشاشة 600px أو أقل.',
      hint: '@media (max-width: 600px) { body { background-color: yellow; } }',
      starter: '<style>\n\n</style>',
      solution: '<style>\n  @media (max-width: 600px) {\n    body { background-color: yellow; }\n  }\n</style>',
      check: (c) => /@media[^{]*max-width\s*:\s*600px/i.test(c) && /body\s*\{[^}]*background(-color)?\s*:\s*yellow\b/i.test(c)
    }
  ]
};
