import type { Exam } from "@/lib/content/types";

export const htmlExam: Exam = {
  mcq: [
    { topic: 'مقدمة', q: 'ماذا يعني اختصار HTML؟', opts: ['HyperText Markup Language', 'Home Tool Modern Logic', 'High Test Markup Layer', 'HighText Mark Lang'], correct: 0 },
    { topic: 'هيكل', q: 'أين يوضع تاج <title>؟', opts: ['داخل <body>', 'داخل <head>', 'داخل <html> فقط', 'في أي مكان'], correct: 1 },
    { topic: 'هيكل', q: 'ما هو أول سطر في صفحة HTML؟', opts: ['<html>', '<!DOCTYPE html>', '<head>', '<body>'], correct: 1 },
    { topic: 'نصوص', q: 'أي عنوان هو الأكبر حجماً؟', opts: ['<h6>', '<h3>', '<h1>', '<h2>'], correct: 2 },
    { topic: 'نصوص', q: 'أي تاج يضع خطاً تحت النص؟', opts: ['<i>', '<u>', '<s>', '<b>'], correct: 1 },
    { topic: 'روابط', q: 'الخاصية المسؤولة عن وجهة الرابط هي:', opts: ['src', 'href', 'link', 'target'], correct: 1 },
    { topic: 'روابط', q: 'أي قيمة لـ target تفتح في نافذة جديدة؟', opts: ['_self', '_blank', '_top', '_new'], correct: 1 },
    { topic: 'قوائم', q: 'أي تاج لقائمة مرقّمة؟', opts: ['<ul>', '<ol>', '<dl>', '<list>'], correct: 1 },
    { topic: 'جداول', q: 'أي خاصية تدمج خلايا أفقياً؟', opts: ['rowspan', 'colspan', 'merge', 'span'], correct: 1 },
    { topic: 'جداول', q: 'تاج خلايا العناوين في الجدول:', opts: ['<td>', '<th>', '<tr>', '<thead>'], correct: 1 },
    { topic: 'نماذج', q: 'أي input يخفي ما يكتبه المستخدم؟', opts: ['hidden', 'password', 'secret', 'text'], correct: 1 },
    { topic: 'نماذج', q: 'لجمع أزرار radio يجب أن يكون لها...', opts: ['نفس id', 'نفس name', 'نفس class', 'نفس type'], correct: 1 },
    { topic: 'وسائط', q: 'الخاصية الإلزامية في <img> لتحديد مسار الصورة:', opts: ['href', 'src', 'path', 'link'], correct: 1 },
    { topic: 'وسائط', q: 'لإظهار أدوات التحكم في فيديو:', opts: ['play="true"', 'controls', 'show="yes"', 'auto'], correct: 1 },
    { topic: 'دلالي', q: 'تاج دلالي للقائمة الرئيسية للتنقل:', opts: ['<menu>', '<nav>', '<bar>', '<links>'], correct: 1 },
    { topic: 'دلالي', q: 'تاج المحتوى الأساسي للصفحة:', opts: ['<body>', '<main>', '<section>', '<content>'], correct: 1 },
    { topic: 'best', q: 'الفرق الأساسي بين id و class:', opts: ['لا يوجد فرق', 'id فريد، class يتكرر', 'class فريد، id يتكرر', 'كلاهما فريد'], correct: 1 },
    { topic: 'best', q: 'الأفضل لتنسيق الصفحة:', opts: ['align و bgcolor', 'CSS', 'JavaScript فقط', 'Word'], correct: 1 },
  ],
  coding: [
    {
      topic: 'هيكل',
      prompt: 'اكتب هيكل صفحة HTML كامل (DOCTYPE، html، head فيها title بعنوان "صفحتي"، body فيه h1 بنص "أهلاً").',
      hint: 'تذكّر <!DOCTYPE html> ثم <html> يحتوي <head> و <body>.',
      starter: '',
      solution: '<!DOCTYPE html>\n<html>\n  <head>\n    <title>صفحتي</title>\n  </head>\n  <body>\n    <h1>أهلاً</h1>\n  </body>\n</html>',
      check: (c) => /<!doctype\s+html>/i.test(c)
        && /<head\b[\s\S]*<title\b[^>]*>\s*صفحتي\s*<\/title>[\s\S]*<\/head>/i.test(c)
        && /<body\b[\s\S]*<h1\b[^>]*>\s*أهلاً\s*<\/h1>[\s\S]*<\/body>/i.test(c)
    },
    {
      topic: 'نصوص + روابط',
      prompt: 'اكتب فقرة فيها رابط نصّه "زيارة Google" ويفتح https://google.com في نافذة جديدة.',
      hint: 'فقرة <p> تحتوي <a href="..." target="_blank">.',
      starter: '',
      solution: '<p>اضغط هنا: <a href="https://google.com" target="_blank">زيارة Google</a></p>',
      check: (c) => /<p\b[\s\S]*<a\b[^>]*href\s*=\s*["'][^"']*google\.com[^"']*["'][^>]*target\s*=\s*["']_blank["'][^>]*>\s*زيارة\s*Google\s*<\/a>[\s\S]*<\/p>/i.test(c)
        || /<p\b[\s\S]*<a\b[^>]*target\s*=\s*["']_blank["'][^>]*href\s*=\s*["'][^"']*google\.com[^"']*["'][^>]*>\s*زيارة\s*Google\s*<\/a>[\s\S]*<\/p>/i.test(c)
    },
    {
      topic: 'قوائم',
      prompt: 'اكتب قائمة مرقّمة (ol) فيها 3 خطوات: التخطيط، البناء، الاختبار.',
      hint: '<ol> ثم <li> لكل خطوة.',
      starter: '',
      solution: '<ol>\n  <li>التخطيط</li>\n  <li>البناء</li>\n  <li>الاختبار</li>\n</ol>',
      check: (c) => {
        const ol = /<ol\b[\s\S]*?<\/ol>/i.exec(c);
        if (!ol) return false;
        const items = (ol[0].match(/<li\b[\s\S]*?<\/li>/gi) || []).map(s => s.replace(/<[^>]+>/g,'').trim());
        return items.length >= 3
          && items.some(t => /التخطيط/.test(t))
          && items.some(t => /البناء/.test(t))
          && items.some(t => /الاختبار/.test(t));
      }
    },
    {
      topic: 'جداول',
      prompt: 'اكتب جدولاً فيه صفّ عناوين ("اسم", "درجة") وصفّان للبيانات: ("سارة", 90) و ("علي", 80).',
      hint: 'استخدم <table>، <tr>، <th>، <td>.',
      starter: '',
      solution: '<table border="1">\n  <tr><th>اسم</th><th>درجة</th></tr>\n  <tr><td>سارة</td><td>90</td></tr>\n  <tr><td>علي</td><td>80</td></tr>\n</table>',
      check: (c) => /<table\b[\s\S]*<\/table>/i.test(c)
        && /<th\b[\s\S]*?اسم[\s\S]*?<\/th>/.test(c)
        && /<th\b[\s\S]*?درجة[\s\S]*?<\/th>/.test(c)
        && /<td\b[\s\S]*?سارة[\s\S]*?<\/td>/.test(c)
        && /<td\b[\s\S]*?90[\s\S]*?<\/td>/.test(c)
        && /<td\b[\s\S]*?علي[\s\S]*?<\/td>/.test(c)
        && /<td\b[\s\S]*?80[\s\S]*?<\/td>/.test(c)
    },
    {
      topic: 'نماذج',
      prompt: 'اكتب نموذجاً (form) فيه: حقل بريد إلكتروني (email)، حقل كلمة سر (password)، وزرّ إرسال.',
      hint: 'input type="email" + type="password" + button submit.',
      starter: '',
      solution: '<form>\n  <input type="email" name="email">\n  <input type="password" name="pw">\n  <button type="submit">إرسال</button>\n</form>',
      check: (c) => /<form\b[\s\S]*<\/form>/i.test(c)
        && /<input\b[^>]*type\s*=\s*["']email["']/i.test(c)
        && /<input\b[^>]*type\s*=\s*["']password["']/i.test(c)
        && (/<input\b[^>]*type\s*=\s*["']submit["']/i.test(c) || /<button\b[\s\S]*?<\/button>/i.test(c))
    },
    {
      topic: 'دلالي',
      prompt: 'اكتب صفحة دلالية بسيطة بترتيب: <header>، <nav>، <main>، <footer>.',
      hint: 'استخدم العناصر الدلالية الأربعة بالترتيب.',
      starter: '',
      solution: '<header><h1>موقعي</h1></header>\n<nav>روابط</nav>\n<main><p>محتوى</p></main>\n<footer>الذيل</footer>',
      check: (c) => {
        const h = c.search(/<header\b/i);
        const n = c.search(/<nav\b/i);
        const m = c.search(/<main\b/i);
        const f = c.search(/<footer\b/i);
        return h !== -1 && n !== -1 && m !== -1 && f !== -1
          && h < n && n < m && m < f;
      }
    },
  ],
};
