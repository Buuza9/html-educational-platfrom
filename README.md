# منصة تعلّم تطوير الويب — Edu Platform

منصة تعليمية عربية (RTL) لتعلّم تطوير الويب: دورات **HTML** و **CSS** مع شرح خطوة بخطوة،
محرر كود مباشر، واختبارات بعد كل درس وامتحان شامل لكل دورة.

مبنية بـ **Next.js 16 (App Router) + TypeScript + Tailwind CSS v4**.

## التشغيل محلياً

```bash
npm install
npm run dev      # http://localhost:3000
```

## البنية

```
src/
  app/                         # المسارات (App Router)
    page.tsx                   # لوحة التحكم — كل الدورات
    courses/[course]/          # صفحة الدورة (قائمة الدروس)
      lessons/[lesson]/        # صفحة الدرس (شرح + محرر + اختبار الدرس)
      exam/                    # الامتحان الشامل للدورة
  components/                  # Editor, Quiz, Exam, CourseCard, ThemeToggle, ...
  lib/
    content/
      types.ts                 # نماذج المحتوى (Course / Lesson / Quiz / Exam)
      courses.ts               # سجل الدورات + getCourse / getLesson
      html/  css/              # محتوى كل دورة (دروس + امتحان) كوحدات TS مُنمَّطة
    preview.ts                 # تغليف كود المعاينة لإطار iframe
legacy/                        # الموقع الثابت الأصلي (HTML/CSS/JS) للمرجعية
```

## إضافة محتوى

أضِف درساً كملف `.tsx` يُصدّر `Lesson` (انظر `src/lib/content/html/lessons/01-intro.tsx`
كمرجع)، ثم سجّله في `index.ts` الخاص بالدورة. الدورات الجديدة تُضاف إلى `src/lib/content/courses.ts`.

## قادم (مرحلة الحسابات والتقدّم)

- المصادقة عبر **Clerk**.
- حفظ التقدّم لكل مستخدم في **Neon Postgres** عبر **Drizzle ORM**.
- انظر `.env.example` للمتغيّرات المطلوبة.
