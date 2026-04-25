/* =======================================================================
   تعلّم HTML — Script
   Handles: live editors, quizzes, search, dark mode, navigation,
            progress bar, back-to-top, copy buttons, mobile sidebar
   ======================================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ===================================================================
     1. THEME TOGGLE (light / dark)
     =================================================================== */
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon   = document.getElementById('themeIcon');
  const root        = document.documentElement;

  // Load saved theme (default: light)
  const savedTheme = localStorage.getItem('html-learn-theme') || 'light';
  if (savedTheme === 'dark') root.setAttribute('data-theme', 'dark');
  updateThemeIcon();

  themeToggle.addEventListener('click', () => {
    const isDark = root.getAttribute('data-theme') === 'dark';
    if (isDark) {
      root.removeAttribute('data-theme');
      localStorage.setItem('html-learn-theme', 'light');
    } else {
      root.setAttribute('data-theme', 'dark');
      localStorage.setItem('html-learn-theme', 'dark');
    }
    updateThemeIcon();
  });

  function updateThemeIcon() {
    const isDark = root.getAttribute('data-theme') === 'dark';
    // moon icon for light mode (click to go dark), sun icon for dark mode
    if (isDark) {
      themeIcon.innerHTML = '<circle cx="12" cy="12" r="4"/><line x1="12" y1="2" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="22"/><line x1="2" y1="12" x2="5" y2="12"/><line x1="19" y1="12" x2="22" y2="12"/><line x1="4.93" y1="4.93" x2="6.7" y2="6.7"/><line x1="17.3" y1="17.3" x2="19.07" y2="19.07"/><line x1="4.93" y1="19.07" x2="6.7" y2="17.3"/><line x1="17.3" y1="6.7" x2="19.07" y2="4.93"/>';
    } else {
      themeIcon.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>';
    }
  }


  /* ===================================================================
     2. INTERACTIVE CODE EDITORS
        Each .editor has a textarea + iframe preview + run/copy buttons
     =================================================================== */
  document.querySelectorAll('.editor').forEach(editor => {
    const textarea = editor.querySelector('.editor-code');
    const iframe   = editor.querySelector('.editor-preview');
    const runBtn   = editor.querySelector('.run-btn');
    const copyBtn  = editor.querySelector('.copy-btn');

    // Decode HTML entities in the data-default attribute, so Arabic + tags survive
    const defaultCode = decodeEntities(editor.getAttribute('data-default') || '');
    textarea.value = defaultCode;

    // Initial render
    renderPreview(iframe, defaultCode);

    // Run button: render current textarea contents into the iframe
    runBtn.addEventListener('click', () => {
      renderPreview(iframe, textarea.value);
      runBtn.textContent = 'تم ✓';
      setTimeout(() => runBtn.textContent = 'تشغيل', 1100);
    });

    // Auto-run on Ctrl/Cmd+Enter inside the textarea (nice UX bonus)
    textarea.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        runBtn.click();
      }
    });

    // Copy button: copy textarea contents to clipboard
    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(textarea.value);
        showToast('تم نسخ الكود ✓');
      } catch (err) {
        // Fallback for older browsers
        textarea.select();
        document.execCommand('copy');
        showToast('تم نسخ الكود ✓');
      }
    });
  });

  /**
   * Render an HTML string into the given iframe.
   * Wraps the user's code so RTL/Arabic display works in the preview.
   */
  function renderPreview(iframe, code) {
    const html = `<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="UTF-8">
      <style>
        body{font-family:"Tajawal","Segoe UI",Tahoma,sans-serif;
             padding:14px;color:#161A30;background:#F0ECE5;line-height:1.7;}
        table{border-collapse:collapse;}
        th,td{padding:6px 10px;border:1px solid #B6BBC4;}
        a{color:#31304D;}
      </style></head><body>${code}</body></html>`;
    iframe.srcdoc = html;
  }

  /**
   * Decode HTML entity strings stored in data-* attributes.
   * Allows us to put `&lt;p&gt;` in HTML and turn it back into `<p>` for the editor.
   */
  function decodeEntities(str) {
    const txt = document.createElement('textarea');
    txt.innerHTML = str;
    return txt.value;
  }


  /* ===================================================================
     3. QUIZ SYSTEM
        Per-topic quiz with two parts: MCQ + Coding tasks.
        QUIZZES[topic] = { mcq: [...], coding: [...] }
        Coding questions: prompt + starter + solution + check(code).
     =================================================================== */
  const QUIZZES = {
    intro: {
      mcq: [
        {
          q: 'ماذا تعني HTML؟',
          opts: [
            'HyperText Markup Language',
            'Home Tool Markup Language',
            'High Text Modern Language',
            'Hyperlinks Text Main Language'
          ],
          correct: 0,
          ok: 'ممتاز! HTML = HyperText Markup Language.',
          ko: 'الإجابة الصحيحة: HyperText Markup Language.'
        },
        {
          q: 'هل HTML لغة برمجة؟',
          opts: [
            'نعم، لغة برمجة كاملة',
            'لا، هي لغة توصيف (Markup)',
            'نعم، مثل JavaScript',
            'هي لغة قواعد بيانات'
          ],
          correct: 1,
          ok: 'صحيح! HTML لغة توصيف وليست لغة برمجة.',
          ko: 'الإجابة الصحيحة: HTML هي لغة توصيف (Markup).'
        }
      ],
      coding: [
        {
          prompt: 'اكتب فقرة (paragraph) تحتوي على النص: "أهلاً بالعالم".',
          hint: 'استخدم تاج <p> ... </p>.',
          starter: '',
          solution: '<p>أهلاً بالعالم</p>',
          check: (c) => /<p\b[^>]*>\s*أهلاً\s*بالعالم\s*<\/p>/.test(c)
        }
      ]
    },

    structure: {
      mcq: [
        {
          q: 'أي تاج يحتوي على المحتوى الظاهر للمستخدم؟',
          opts: ['<head>', '<title>', '<body>', '<html>'],
          correct: 2,
          ok: 'صحيح! <body> يحتوي المحتوى الظاهر.',
          ko: 'الإجابة الصحيحة: <body>.'
        },
        {
          q: 'أين يجب أن نضع تاج <title>؟',
          opts: ['داخل <body>', 'خارج <html>', 'داخل <head>', 'في أي مكان'],
          correct: 2,
          ok: 'تمام! <title> يكون داخل <head>.',
          ko: 'الإجابة الصحيحة: داخل <head>.'
        },
        {
          q: 'ما هو أول تاج عادة في صفحة HTML؟',
          opts: ['<html>', '<!DOCTYPE html>', '<body>', '<head>'],
          correct: 1,
          ok: 'صح! <!DOCTYPE html> يأتي في الأول.',
          ko: 'الإجابة الصحيحة: <!DOCTYPE html>.'
        }
      ],
      coding: [
        {
          prompt: 'اكتب هيكل صفحة HTML كامل (DOCTYPE، html، head فيها title، body).',
          hint: 'تذكّر <!DOCTYPE html> ثم <html> يحتوي <head> و <body>.',
          starter: '',
          solution: '<!DOCTYPE html>\n<html>\n  <head>\n    <title>صفحتي</title>\n  </head>\n  <body>\n    <h1>مرحباً</h1>\n  </body>\n</html>',
          check: (c) => /<!doctype\s+html>/i.test(c)
            && /<html\b[\s\S]*<\/html>/i.test(c)
            && /<head\b[\s\S]*<title\b[\s\S]*<\/title>[\s\S]*<\/head>/i.test(c)
            && /<body\b[\s\S]*<\/body>/i.test(c)
        }
      ]
    },

    text: {
      mcq: [
        { q: 'أي تاج يجعل النص مائلاً؟', opts: ['<b>', '<i>', '<u>', '<em>'], correct: 1, ok: 'ممتاز! <i> = italic.', ko: 'الإجابة الصحيحة: <i>.' },
        { q: 'أي تاج يضع خطاً تحت النص؟', opts: ['<u>', '<i>', '<s>', '<line>'], correct: 0, ok: 'صحيح! <u> = underline.', ko: 'الإجابة الصحيحة: <u>.' },
        { q: 'كيف ننزل سطراً جديداً داخل فقرة؟', opts: ['<newline>', '<br>', '<break>', '<lb>'], correct: 1, ok: 'صح! <br> = break line.', ko: 'الإجابة الصحيحة: <br>.' },
        { q: 'أي عنوان هو الأكبر حجماً؟', opts: ['<h6>', '<h3>', '<h1>', '<head>'], correct: 2, ok: 'تمام! <h1> هو الأكبر والأهم.', ko: 'الإجابة الصحيحة: <h1>.' }
      ],
      coding: [
        {
          prompt: 'اكتب عنواناً رئيسياً بالنص "موقعي" ثم فقرة فيها كلمة مائلة باستخدام <i>.',
          hint: 'استخدم <h1> للعنوان و<i> للجزء المائل.',
          starter: '',
          solution: '<h1>موقعي</h1>\n<p>هذه <i>كلمة</i> مائلة.</p>',
          check: (c) => /<h1\b[^>]*>\s*موقعي\s*<\/h1>/.test(c) && /<i\b[^>]*>[\s\S]*?<\/i>/.test(c)
        },
        {
          prompt: 'اكتب فقرة تحتوي على سطرين منفصلين باستخدام <br>.',
          hint: '<br> ذاتي الإغلاق ولا يحتاج لإغلاق.',
          starter: '',
          solution: '<p>السطر الأول<br>السطر الثاني</p>',
          check: (c) => /<p\b[^>]*>[\s\S]*<br\s*\/?>[\s\S]*<\/p>/i.test(c)
        }
      ]
    },

    links: {
      mcq: [
        { q: 'ما هي الخاصية التي تحدد وجهة الرابط؟', opts: ['src', 'link', 'href', 'target'], correct: 2, ok: 'ممتاز! href تحدد وجهة الرابط.', ko: 'الإجابة الصحيحة: href.' },
        { q: 'أي قيمة لـ target تفتح رابطاً في نافذة جديدة؟', opts: ['_self', '_blank', '_new', '_window'], correct: 1, ok: 'صحيح! _blank يفتح في نافذة جديدة.', ko: 'الإجابة الصحيحة: _blank.' },
        { q: 'أي تاج نستخدمه للروابط؟', opts: ['<link>', '<href>', '<a>', '<url>'], correct: 2, ok: 'تمام! <a> هو تاج الروابط.', ko: 'الإجابة الصحيحة: <a>.' },
        { q: 'الرابط <a href="page.html"> هو رابط...', opts: ['خارجي', 'داخلي', 'بريدي', 'صورة'], correct: 1, ok: 'صح! اسم ملف فقط = رابط داخلي.', ko: 'الإجابة الصحيحة: داخلي.' }
      ],
      coding: [
        {
          prompt: 'اكتب رابطاً يفتح موقع google.com في نافذة جديدة، ونصّه "اذهب إلى Google".',
          hint: 'استخدم href و target="_blank".',
          starter: '',
          solution: '<a href="https://google.com" target="_blank">اذهب إلى Google</a>',
          check: (c) => /<a\b[^>]*href\s*=\s*["'][^"']*google\.com[^"']*["'][^>]*>[\s\S]*?<\/a>/i.test(c)
            && /target\s*=\s*["']_blank["']/i.test(c)
        }
      ]
    },

    lists: {
      mcq: [
        { q: 'أي تاج يصنع قائمة مرقّمة؟', opts: ['<ul>', '<ol>', '<li>', '<list>'], correct: 1, ok: 'صحيح! <ol> = ordered.', ko: 'الإجابة الصحيحة: <ol>.' },
        { q: 'أي تاج يصنع قائمة بنقاط (غير مرقّمة)؟', opts: ['<ul>', '<ol>', '<dl>', '<menu>'], correct: 0, ok: 'تمام! <ul> = unordered.', ko: 'الإجابة الصحيحة: <ul>.' },
        { q: 'ما تاج العنصر داخل القائمة؟', opts: ['<item>', '<li>', '<list>', '<el>'], correct: 1, ok: 'صحيح! <li> = list item.', ko: 'الإجابة الصحيحة: <li>.' }
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
          }
        }
      ]
    },

    tables: {
      mcq: [
        { q: 'أي خاصية تستخدم لدمج خلايا أفقياً (عبر أعمدة)؟', opts: ['rowspan', 'colspan', 'merge', 'span'], correct: 1, ok: 'ممتاز! colspan = دمج أعمدة.', ko: 'الإجابة الصحيحة: colspan.' },
        { q: 'أي خاصية تستخدم لدمج خلايا عمودياً (عبر صفوف)؟', opts: ['rowspan', 'colspan', 'cellspan', 'cellmerge'], correct: 0, ok: 'صحيح! rowspan = دمج صفوف.', ko: 'الإجابة الصحيحة: rowspan.' },
        { q: 'أي تاج يستخدم لخلايا العناوين في الجدول؟', opts: ['<td>', '<tr>', '<th>', '<header>'], correct: 2, ok: 'تمام! <th> = table header.', ko: 'الإجابة الصحيحة: <th>.' },
        { q: 'ماذا يمثّل تاج <tr>؟', opts: ['خلية', 'صف', 'عمود', 'عنوان'], correct: 1, ok: 'صحيح! <tr> = table row.', ko: 'الإجابة الصحيحة: صف (row).' }
      ],
      coding: [
        {
          prompt: 'اكتب جدولاً بصفّ عناوين فيه "الاسم" و"العمر"، وصفّ بيانات: "أحمد" و 20.',
          hint: 'استخدم <table>، ثم <tr> فيها <th> للعناوين و<td> للبيانات.',
          starter: '',
          solution: '<table border="1">\n  <tr><th>الاسم</th><th>العمر</th></tr>\n  <tr><td>أحمد</td><td>20</td></tr>\n</table>',
          check: (c) => /<table\b[\s\S]*<\/table>/i.test(c)
            && /<th\b[\s\S]*?الاسم[\s\S]*?<\/th>/.test(c)
            && /<th\b[\s\S]*?العمر[\s\S]*?<\/th>/.test(c)
            && /<td\b[\s\S]*?أحمد[\s\S]*?<\/td>/.test(c)
            && /<td\b[\s\S]*?20[\s\S]*?<\/td>/.test(c)
        }
      ]
    },

    forms: {
      mcq: [
        { q: 'أي نوع input يخفي ما يكتبه المستخدم؟', opts: ['hidden', 'password', 'secret', 'text'], correct: 1, ok: 'صحيح! type="password" يخفي النص.', ko: 'الإجابة الصحيحة: password.' },
        { q: 'أي تاج لحقل نصّي متعدد الأسطر؟', opts: ['<input>', '<textarea>', '<text>', '<area>'], correct: 1, ok: 'تمام! <textarea> للنصوص الطويلة.', ko: 'الإجابة الصحيحة: <textarea>.' },
        { q: 'كيف تجمع أزرار radio بحيث يُختار واحد فقط منها؟', opts: ['بإعطائها نفس id', 'بوضعها داخل <group>', 'بإعطائها نفس name', 'بوضعها داخل <select>'], correct: 2, ok: 'ممتاز! نفس name = اختيار واحد فقط.', ko: 'الإجابة الصحيحة: نفس name.' }
      ],
      coding: [
        {
          prompt: 'اكتب نموذجاً (form) فيه حقل نصي للاسم وحقل كلمة سر وزر إرسال (Submit).',
          hint: 'استخدم <form>، input type="text"، input type="password"، input type="submit" أو <button>.',
          starter: '',
          solution: '<form>\n  <input type="text" name="username">\n  <input type="password" name="pw">\n  <button type="submit">إرسال</button>\n</form>',
          check: (c) => /<form\b[\s\S]*<\/form>/i.test(c)
            && /<input\b[^>]*type\s*=\s*["']text["']/i.test(c)
            && /<input\b[^>]*type\s*=\s*["']password["']/i.test(c)
            && (/<input\b[^>]*type\s*=\s*["']submit["']/i.test(c) || /<button\b[\s\S]*?<\/button>/i.test(c))
        }
      ]
    },

    media: {
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

    semantic: {
      mcq: [
        { q: 'أي تاج دلالي يستخدم لرأس الصفحة؟', opts: ['<top>', '<header>', '<head>', '<main>'], correct: 1, ok: 'تمام! <header> = رأس الصفحة.', ko: 'الإجابة الصحيحة: <header>.' },
        { q: 'أي تاج لقائمة التنقل؟', opts: ['<menu>', '<nav>', '<links>', '<bar>'], correct: 1, ok: 'صحيح! <nav> = navigation.', ko: 'الإجابة الصحيحة: <nav>.' },
        { q: 'أي تاج للمحتوى الأساسي للصفحة؟', opts: ['<body>', '<content>', '<main>', '<section>'], correct: 2, ok: 'ممتاز! <main> = المحتوى الأساسي.', ko: 'الإجابة الصحيحة: <main>.' }
      ],
      coding: [
        {
          prompt: 'اكتب هيكلاً دلالياً بسيطاً: <header> ثم <nav> ثم <main> ثم <footer>.',
          hint: 'استخدم العناصر الدلالية الأربعة بالترتيب.',
          starter: '',
          solution: '<header>الرأس</header>\n<nav>التنقل</nav>\n<main>المحتوى</main>\n<footer>الذيل</footer>',
          check: (c) => /<header\b[\s\S]*<\/header>/i.test(c)
            && /<nav\b[\s\S]*<\/nav>/i.test(c)
            && /<main\b[\s\S]*<\/main>/i.test(c)
            && /<footer\b[\s\S]*<\/footer>/i.test(c)
        }
      ]
    },

    best: {
      mcq: [
        { q: 'ما الفرق بين id و class؟', opts: ['لا يوجد فرق', 'id فريد، class يتكرر', 'class فريد، id يتكرر', 'كلاهما يتكرر'], correct: 1, ok: 'ممتاز! id فريد، class يتكرر.', ko: 'الإجابة الصحيحة: id فريد، class يتكرر.' },
        { q: 'لتنسيق صفحة احترافياً، الأفضل أن نستخدم...', opts: ['خصائص HTML قديمة مثل align و bgcolor', 'CSS منفصل', 'JavaScript فقط', 'Word'], correct: 1, ok: 'صحيح! CSS هو الحل الصحيح.', ko: 'الإجابة الصحيحة: CSS منفصل.' },
        { q: 'أي خاصية تستخدم لتحديد محاذاة المحتوى (طريقة قديمة)؟', opts: ['position', 'align', 'center', 'place'], correct: 1, ok: 'صح! align (لكنها قديمة، استخدم CSS).', ko: 'الإجابة الصحيحة: align.' }
      ],
      coding: [
        {
          prompt: 'اكتب فقرة لها id باسم "main-note" وكلاس "highlight".',
          hint: '<p id="..." class="...">.',
          starter: '',
          solution: '<p id="main-note" class="highlight">ملاحظة مهمة</p>',
          check: (c) => /<p\b[^>]*id\s*=\s*["']main-note["'][^>]*class\s*=\s*["'][^"']*\bhighlight\b[^"']*["']/i.test(c)
            || /<p\b[^>]*class\s*=\s*["'][^"']*\bhighlight\b[^"']*["'][^>]*id\s*=\s*["']main-note["']/i.test(c)
        }
      ]
    }
  };

  /* ---------------------- per-lesson quiz renderer ---------------------- */
  document.querySelectorAll('.quiz').forEach(quizEl => {
    const key = quizEl.getAttribute('data-quiz');
    const data = QUIZZES[key];
    if (!data) return;

    const mcq    = data.mcq    || [];
    const coding = data.coding || [];
    const total  = mcq.length + coding.length;

    quizEl.innerHTML = `
      <div class="quiz-head">
        <div class="quiz-icon">?</div>
        <div>
          <h3>اختبر نفسك</h3>
          <p>${total} أسئلة (${mcq.length} اختيار من متعدد + ${coding.length} برمجية)</p>
        </div>
      </div>
      ${mcq.length ? `<div class="quiz-section-label">الاختيار من متعدد</div>${renderMcqBlock(mcq)}` : ''}
      ${coding.length ? `<div class="quiz-section-label">أسئلة برمجية</div>${renderCodingBlock(coding, mcq.length)}` : ''}
    `;

    wireMcq(quizEl, mcq);
    wireCoding(quizEl, coding);
  });

  function renderMcqBlock(questions) {
    return questions.map((q, qi) => `
      <div class="quiz-q" data-correct="${q.correct}">
        <div class="quiz-q-text"><span class="qnum">${qi + 1}</span>${escapeHtml(q.q)}</div>
        <div class="quiz-options">
          ${q.opts.map((opt, oi) => `
            <button class="quiz-opt" data-idx="${oi}">
              <span class="opt-letter">${String.fromCharCode(0x0623 + oi)}</span>
              <span>${escapeHtml(opt)}</span>
            </button>
          `).join('')}
        </div>
        <div class="quiz-feedback"></div>
      </div>
    `).join('');
  }

  function renderCodingBlock(codings, startIndex) {
    return codings.map((q, qi) => {
      const num = (startIndex || 0) + qi + 1;
      return `
        <div class="code-q" data-cidx="${qi}">
          <div class="code-q-prompt"><span class="qnum">${num}</span><span>${escapeHtml(q.prompt)}</span></div>
          ${q.hint ? `<div class="code-q-hint">💡 ${escapeHtml(q.hint)}</div>` : ''}
          <div class="code-q-editor">
            <textarea class="code-q-textarea" spellcheck="false">${escapeHtml(q.starter || '')}</textarea>
            <iframe class="code-q-preview" title="معاينة"></iframe>
          </div>
          <div class="code-q-actions">
            <button class="btn-run" type="button">تشغيل</button>
            <button class="btn-check" type="button">تحقق من الإجابة</button>
            <button class="btn-reveal" type="button">إظهار الحل</button>
          </div>
          <div class="code-q-feedback"></div>
          <div class="code-q-solution">
            <div class="code-q-solution-label">الحل المقترح:</div>
            <pre><code></code></pre>
          </div>
        </div>
      `;
    }).join('');
  }

  function wireMcq(quizEl, questions) {
    quizEl.querySelectorAll('.quiz-q').forEach((qDiv, qi) => {
      const correct = parseInt(qDiv.getAttribute('data-correct'), 10);
      const opts    = qDiv.querySelectorAll('.quiz-opt');
      const fb      = qDiv.querySelector('.quiz-feedback');
      const meta    = questions[qi];

      opts.forEach(btn => {
        btn.addEventListener('click', () => {
          const chosen = parseInt(btn.getAttribute('data-idx'), 10);
          opts.forEach(o => o.setAttribute('disabled', 'true'));
          if (chosen === correct) {
            btn.classList.add('correct');
            fb.textContent = '✓ ' + meta.ok;
            fb.className = 'quiz-feedback show ok';
          } else {
            btn.classList.add('wrong');
            opts[correct].classList.add('correct');
            fb.textContent = '✗ ' + meta.ko;
            fb.className = 'quiz-feedback show ko';
          }
        });
      });
    });
  }

  function wireCoding(quizEl, codings) {
    quizEl.querySelectorAll('.code-q').forEach((cDiv, ci) => {
      const meta     = codings[ci];
      const textarea = cDiv.querySelector('.code-q-textarea');
      const iframe   = cDiv.querySelector('.code-q-preview');
      const fb       = cDiv.querySelector('.code-q-feedback');
      const runBtn   = cDiv.querySelector('.btn-run');
      const chkBtn   = cDiv.querySelector('.btn-check');
      const revBtn   = cDiv.querySelector('.btn-reveal');
      const solWrap  = cDiv.querySelector('.code-q-solution');
      const solCode  = cDiv.querySelector('.code-q-solution code');

      // initial preview
      renderPreview(iframe, textarea.value);

      runBtn.addEventListener('click', () => {
        renderPreview(iframe, textarea.value);
        runBtn.textContent = 'تم ✓';
        setTimeout(() => runBtn.textContent = 'تشغيل', 1100);
      });

      textarea.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
          e.preventDefault();
          runBtn.click();
        }
      });

      chkBtn.addEventListener('click', () => {
        const code = textarea.value;
        renderPreview(iframe, code);
        const ok = !!meta.check && safeCheck(meta.check, code);
        if (ok) {
          fb.textContent = '✓ إجابة صحيحة! أحسنت.';
          fb.className = 'code-q-feedback show ok';
        } else {
          fb.textContent = '✗ ليست بعد — راجع الإرشاد وحاول مرة أخرى.';
          fb.className = 'code-q-feedback show ko';
        }
      });

      revBtn.addEventListener('click', () => {
        solCode.textContent = meta.solution || '';
        solWrap.classList.add('show');
        revBtn.setAttribute('disabled', 'true');
      });
    });
  }

  function safeCheck(fn, code) {
    try { return !!fn(code); } catch { return false; }
  }

  function escapeHtml(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }


  /* ===================================================================
     3b. COMPREHENSIVE EXAM
        Pulls a curated set of MCQ + coding questions across all topics
        with score tracking and a final grade.
     =================================================================== */
  const EXAM = {
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
      { topic: 'best', q: 'الأفضل لتنسيق الصفحة:', opts: ['align و bgcolor', 'CSS', 'JavaScript فقط', 'Word'], correct: 1 }
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
      }
    ]
  };

  function buildExam() {
    const examEl = document.getElementById('examContainer');
    if (!examEl) return;

    const totalCount = EXAM.mcq.length + EXAM.coding.length;

    examEl.innerHTML = `
      <div class="exam-score-bar">
        <div class="exam-score-info">
          <span>الإجابات: <strong id="examAnswered">0</strong> / ${totalCount}</span>
          <span>الصحيحة: <strong id="examCorrect">0</strong></span>
        </div>
        <div class="exam-progress"><div class="exam-progress-fill" id="examProgressFill"></div></div>
        <button class="exam-submit" id="examSubmit">إنهاء وعرض النتيجة</button>
      </div>

      <div id="examQuestions"></div>

      <div class="exam-result" id="examResult">
        <h3>انتهى الامتحان!</h3>
        <div class="exam-result-score">
          <span id="examFinalScore">0</span><span>/${totalCount}</span>
        </div>
        <p id="examResultMsg"></p>
        <div class="exam-result-grade" id="examGrade">—</div>
        <div><button class="exam-restart" id="examRestart">إعادة الامتحان</button></div>
      </div>
    `;

    const qWrap = examEl.querySelector('#examQuestions');
    let html = '';

    // MCQ questions
    EXAM.mcq.forEach((q, i) => {
      html += `
        <div class="exam-card" data-exam-mcq="${i}" data-correct="${q.correct}">
          <div class="exam-card-head">
            <div class="exam-card-title">
              <span class="exam-card-num">${i + 1}</span>
              <span>${escapeHtml(q.q)}</span>
            </div>
            <span class="exam-card-topic">${escapeHtml(q.topic)} · MCQ</span>
          </div>
          <div class="quiz-options">
            ${q.opts.map((opt, oi) => `
              <button class="quiz-opt" data-idx="${oi}">
                <span class="opt-letter">${String.fromCharCode(0x0623 + oi)}</span>
                <span>${escapeHtml(opt)}</span>
              </button>
            `).join('')}
          </div>
          <div class="quiz-feedback"></div>
        </div>`;
    });

    // Coding questions
    EXAM.coding.forEach((q, i) => {
      const num = EXAM.mcq.length + i + 1;
      html += `
        <div class="exam-card" data-exam-code="${i}">
          <div class="exam-card-head">
            <div class="exam-card-title">
              <span class="exam-card-num">${num}</span>
              <span>${escapeHtml(q.prompt)}</span>
            </div>
            <span class="exam-card-topic">${escapeHtml(q.topic)} · سؤال برمجي</span>
          </div>
          ${q.hint ? `<div class="code-q-hint">💡 ${escapeHtml(q.hint)}</div>` : ''}
          <div class="code-q-editor">
            <textarea class="code-q-textarea" spellcheck="false">${escapeHtml(q.starter || '')}</textarea>
            <iframe class="code-q-preview" title="معاينة"></iframe>
          </div>
          <div class="code-q-actions">
            <button class="btn-run" type="button">تشغيل</button>
            <button class="btn-check" type="button">تحقق من الإجابة</button>
            <button class="btn-reveal" type="button">إظهار الحل</button>
          </div>
          <div class="code-q-feedback"></div>
          <div class="code-q-solution">
            <div class="code-q-solution-label">الحل المقترح:</div>
            <pre><code></code></pre>
          </div>
        </div>`;
    });

    qWrap.innerHTML = html;

    // ----- state tracking -----
    const state = {
      mcq:  EXAM.mcq.map(()    => ({ answered: false, correct: false })),
      code: EXAM.coding.map(() => ({ answered: false, correct: false }))
    };

    const answeredEl = examEl.querySelector('#examAnswered');
    const correctEl  = examEl.querySelector('#examCorrect');
    const fillEl     = examEl.querySelector('#examProgressFill');

    function refresh() {
      const ans = state.mcq.filter(s => s.answered).length + state.code.filter(s => s.answered).length;
      const cor = state.mcq.filter(s => s.correct).length  + state.code.filter(s => s.correct).length;
      answeredEl.textContent = ans;
      correctEl.textContent  = cor;
      fillEl.style.width = (ans / totalCount * 100).toFixed(1) + '%';
    }

    // wire MCQ
    examEl.querySelectorAll('[data-exam-mcq]').forEach(card => {
      const i       = parseInt(card.getAttribute('data-exam-mcq'), 10);
      const correct = parseInt(card.getAttribute('data-correct'), 10);
      const opts    = card.querySelectorAll('.quiz-opt');
      const fb      = card.querySelector('.quiz-feedback');

      opts.forEach(btn => {
        btn.addEventListener('click', () => {
          if (state.mcq[i].answered) return;
          const chosen = parseInt(btn.getAttribute('data-idx'), 10);
          opts.forEach(o => o.setAttribute('disabled', 'true'));
          state.mcq[i].answered = true;
          if (chosen === correct) {
            btn.classList.add('correct');
            state.mcq[i].correct = true;
            fb.textContent = '✓ إجابة صحيحة';
            fb.className = 'quiz-feedback show ok';
          } else {
            btn.classList.add('wrong');
            opts[correct].classList.add('correct');
            fb.textContent = '✗ الإجابة الصحيحة هي: ' + EXAM.mcq[i].opts[correct];
            fb.className = 'quiz-feedback show ko';
          }
          refresh();
        });
      });
    });

    // wire coding
    examEl.querySelectorAll('[data-exam-code]').forEach(card => {
      const i        = parseInt(card.getAttribute('data-exam-code'), 10);
      const meta     = EXAM.coding[i];
      const textarea = card.querySelector('.code-q-textarea');
      const iframe   = card.querySelector('.code-q-preview');
      const fb       = card.querySelector('.code-q-feedback');
      const runBtn   = card.querySelector('.btn-run');
      const chkBtn   = card.querySelector('.btn-check');
      const revBtn   = card.querySelector('.btn-reveal');
      const solWrap  = card.querySelector('.code-q-solution');
      const solCode  = card.querySelector('.code-q-solution code');

      renderPreview(iframe, textarea.value);

      runBtn.addEventListener('click', () => {
        renderPreview(iframe, textarea.value);
        runBtn.textContent = 'تم ✓';
        setTimeout(() => runBtn.textContent = 'تشغيل', 1100);
      });

      textarea.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
          e.preventDefault();
          runBtn.click();
        }
      });

      chkBtn.addEventListener('click', () => {
        const code = textarea.value;
        renderPreview(iframe, code);
        const ok = !!meta.check && safeCheck(meta.check, code);
        // Coding can be retried until correct OR until reveal pressed
        if (ok) {
          state.code[i].answered = true;
          state.code[i].correct = true;
          fb.textContent = '✓ إجابة صحيحة! أحسنت.';
          fb.className = 'code-q-feedback show ok';
        } else {
          // mark answered only if not already correct, but don't lock — allow retries
          if (!state.code[i].correct) {
            state.code[i].answered = true;
            state.code[i].correct = false;
          }
          fb.textContent = '✗ ليست بعد — راجع الإرشاد وحاول مرة أخرى.';
          fb.className = 'code-q-feedback show ko';
        }
        refresh();
      });

      revBtn.addEventListener('click', () => {
        solCode.textContent = meta.solution || '';
        solWrap.classList.add('show');
        revBtn.setAttribute('disabled', 'true');
        // counts as answered (incorrect) if not already correct
        if (!state.code[i].correct) {
          state.code[i].answered = true;
        }
        refresh();
      });
    });

    // submit
    const submitBtn = examEl.querySelector('#examSubmit');
    const result    = examEl.querySelector('#examResult');
    const finalEl   = examEl.querySelector('#examFinalScore');
    const msgEl     = examEl.querySelector('#examResultMsg');
    const gradeEl   = examEl.querySelector('#examGrade');
    const restart   = examEl.querySelector('#examRestart');

    submitBtn.addEventListener('click', () => {
      const cor = state.mcq.filter(s => s.correct).length + state.code.filter(s => s.correct).length;
      const pct = Math.round(cor / totalCount * 100);
      finalEl.textContent = cor;
      let grade, cls, msg;
      if (pct >= 85)      { grade = 'ممتاز';   cls = 'pass'; msg = 'أداء رائع — أنت جاهز للامتحان.'; }
      else if (pct >= 70) { grade = 'جيد جداً'; cls = 'pass'; msg = 'نتيجة جيدة جداً، راجع الأسئلة الخاطئة.'; }
      else if (pct >= 50) { grade = 'جيد';     cls = 'pass'; msg = 'نتيجة لا بأس بها، احتاج لمراجعة المواضيع الضعيفة.'; }
      else                { grade = 'يحتاج مراجعة'; cls = 'fail'; msg = 'راجع الدروس مرة أخرى ثم أعد الامتحان.'; }
      gradeEl.textContent = `${grade} (${pct}%)`;
      gradeEl.className = 'exam-result-grade ' + cls;
      msgEl.textContent = msg;
      result.classList.add('show');
      result.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    restart.addEventListener('click', () => {
      buildExam();
      document.getElementById('exam').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    refresh();
  }

  buildExam();


  /* ===================================================================
     4. SIDEBAR NAVIGATION + ACTIVE LINK ON SCROLL
     =================================================================== */
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.lesson');

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      // close mobile sidebar after click
      closeSidebar();
    });
  });

  // IntersectionObserver: highlight nav link of the section currently in view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(l => {
          l.classList.toggle('active', l.getAttribute('data-target') === id);
        });
      }
    });
  }, {
    rootMargin: '-30% 0px -60% 0px',
    threshold: 0
  });
  sections.forEach(s => observer.observe(s));


  /* ===================================================================
     5. MOBILE SIDEBAR TOGGLE
     =================================================================== */
  const sidebar  = document.getElementById('sidebar');
  const overlay  = document.getElementById('sidebarOverlay');
  const menuBtn  = document.getElementById('menuToggle');

  menuBtn.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    overlay.classList.toggle('show');
  });
  overlay.addEventListener('click', closeSidebar);

  function closeSidebar() {
    sidebar.classList.remove('open');
    overlay.classList.remove('show');
  }


  /* ===================================================================
     6. READING PROGRESS BAR + PROGRESS CARD
     =================================================================== */
  const progressFill     = document.getElementById('progressFill');
  const progressCardFill = document.getElementById('progressCardFill');
  const progressPct      = document.getElementById('progressPct');

  function updateProgress() {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled  = window.scrollY;
    const pct       = Math.min(100, Math.max(0, (scrolled / docHeight) * 100));
    progressFill.style.width = pct + '%';
    progressCardFill.style.width = pct + '%';
    progressPct.textContent = Math.round(pct) + '%';
  }
  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress);
  updateProgress();


  /* ===================================================================
     7. BACK TO TOP BUTTON
     =================================================================== */
  const backTop = document.getElementById('backTop');
  window.addEventListener('scroll', () => {
    backTop.classList.toggle('show', window.scrollY > 500);
  }, { passive: true });
  backTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });


  /* ===================================================================
     8. SEARCH FUNCTIONALITY
        Simple text-search across lesson content. Hides non-matching
        lessons in the sidebar; scrolls to first match when present.
     =================================================================== */
  const searchInput = document.getElementById('searchInput');
  let searchTimer;

  searchInput.addEventListener('input', () => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(runSearch, 180);
  });

  function runSearch() {
    const term = searchInput.value.trim().toLowerCase();

    // Reset highlights
    document.querySelectorAll('mark.search-hl').forEach(m => {
      const parent = m.parentNode;
      parent.replaceChild(document.createTextNode(m.textContent), m);
      parent.normalize();
    });

    if (!term) {
      // restore: show every lesson + every nav link
      sections.forEach(s => s.classList.remove('search-hidden'));
      navLinks.forEach(l => l.classList.remove('search-hidden'));
      return;
    }

    let firstMatch = null;
    sections.forEach(section => {
      const text = section.textContent.toLowerCase();
      const id   = section.id;
      const navLink = document.querySelector(`.nav-link[data-target="${id}"]`);
      if (text.includes(term)) {
        section.classList.remove('search-hidden');
        if (navLink) navLink.classList.remove('search-hidden');
        if (!firstMatch) firstMatch = section;
        // highlight occurrences within this section's text-bearing elements
        highlightInSection(section, term);
      } else {
        section.classList.add('search-hidden');
        if (navLink) navLink.classList.add('search-hidden');
      }
    });

    if (firstMatch) {
      firstMatch.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  function highlightInSection(section, term) {
    // Walk through text nodes in safe elements (skip code blocks/editors)
    const skip = new Set(['SCRIPT', 'STYLE', 'TEXTAREA', 'IFRAME', 'CODE', 'PRE', 'BUTTON']);
    const walker = document.createTreeWalker(section, NodeFilter.SHOW_TEXT, {
      acceptNode(n) {
        if (!n.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        let p = n.parentElement;
        while (p) {
          if (skip.has(p.tagName)) return NodeFilter.FILTER_REJECT;
          if (p === section) break;
          p = p.parentElement;
        }
        return NodeFilter.FILTER_ACCEPT;
      }
    });

    const matches = [];
    let node;
    while ((node = walker.nextNode())) matches.push(node);

    const lowerTerm = term;
    matches.forEach(node => {
      const text = node.nodeValue;
      const lower = text.toLowerCase();
      const idx = lower.indexOf(lowerTerm);
      if (idx === -1) return;

      const before = text.slice(0, idx);
      const match  = text.slice(idx, idx + lowerTerm.length);
      const after  = text.slice(idx + lowerTerm.length);

      const frag = document.createDocumentFragment();
      if (before) frag.appendChild(document.createTextNode(before));
      const mark = document.createElement('mark');
      mark.className = 'search-hl';
      mark.textContent = match;
      frag.appendChild(mark);
      if (after) frag.appendChild(document.createTextNode(after));

      node.parentNode.replaceChild(frag, node);
    });
  }


  /* ===================================================================
     9. TOAST helper
     =================================================================== */
  const toast = document.getElementById('toast');
  let toastTimer;
  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 1800);
  }

}); // DOMContentLoaded
