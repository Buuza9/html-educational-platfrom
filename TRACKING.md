# TRACKING — منصة تعلّم تطوير الويب

حالة العمل على تحويل الموقع الثابت إلى منصة Next.js. آخر تحديث: 2026-06-11.

## نظرة عامة

| البند        | القيمة                                            |
| ------------ | ------------------------------------------------- |
| الإطار        | Next.js 16 (App Router) · React 19 · TypeScript   |
| التنسيق       | Tailwind CSS v4 (توكنات منقولة من الموقع الأصلي)   |
| المصادقة      | Clerk *(قادم)*                                    |
| قاعدة البيانات | Neon Postgres + Drizzle ORM *(قادم)*              |
| المحتوى       | وحدات TS مُنمَّطة (Course / Lesson / Quiz / Exam)   |
| الفرع         | `nextjs-platform`                                 |

## المراحل

### ✅ المرحلة 0 — الأساس
- [x] إنشاء فرع `nextjs-platform` ونقل الموقع الثابت إلى `legacy/`.
- [x] تهيئة Next.js + Tailwind v4 + TypeScript.
- [x] نقل توكنات التصميم إلى `globals.css` (+ الوضع الليلي عبر `data-theme`).
- [x] تخطيط RTL عربي مع خطوط Reem Kufi / Tajawal / JetBrains Mono.
- [x] عقد نماذج المحتوى `types.ts` + مكوّنات مرجعية (`Editor`, `Quiz`, `lesson-content`).

### ✅ المرحلة 1 — المحتوى والواجهة
- [x] استخراج 10 دروس HTML + 7 دروس CSS كوحدات TS (مع المحرر والاختبار لكل درس).
- [x] فصل الامتحان الشامل إلى امتحان HTML (18 + 6) وامتحان CSS (10 + 4).
- [x] مكوّنات: `CourseCard`, `ThemeToggle`, `Exam`, `LessonQuiz`, `CourseExam`.
- [x] سجل الدورات `courses.ts` (`getCourse` / `getLesson`).
- [x] المسارات: لوحة التحكم → الدورة → الدرس → الامتحان، صفحة 404.
- [x] التحقق: `tsc` نظيف، `next build` ناجح (25 صفحة)، `lint` نظيف، اختبار تشغيل (كل المسارات 200).

### 🔄 المرحلة 2 — الحسابات (Clerk) — *الكود جاهز، بانتظار التزويد*
- [x] تثبيت `@clerk/nextjs` v7 + `@clerk/localizations` (عربي arSA + RTL).
- [x] `src/middleware.ts` (`clerkMiddleware`) — المحتوى يبقى عاماً.
- [x] `<ClerkProvider localization={arSA} afterSignOutUrl="/">` داخل `<body>`.
- [x] صفحات `/sign-in` و `/sign-up`.
- [x] `AuthControls` (زر الحساب عند الدخول / روابط الدخول والتسجيل) في الشريط العلوي.
- [x] **تزويد Clerk عبر Vercel Marketplace** (`clerk-fuchsia-horizon`) — المفاتيح في `.env.local`.
- [x] التحقق: `next build` ناجح بالمفاتيح الحقيقية، صفحة `/sign-in` تعرض واجهة Clerk.

أوامر التزويد (شغّلها بنفسك عبر `!` في الجلسة):
```
! npx vercel login
! npx vercel link
! npx vercel integration add clerk
! npx vercel env pull .env.local
```
> صفحات الدخول/التسجيل على المسارين الافتراضيين `/sign-in` و `/sign-up`، لذا لا حاجة
> لمتغيّرات `NEXT_PUBLIC_CLERK_SIGN_IN_URL` الإضافية.

### 🔄 المرحلة 3 — التقدّم (Neon + Drizzle) — *الكود جاهز، بانتظار التزويد*
- [x] تثبيت `drizzle-orm` + `@neondatabase/serverless` + `drizzle-kit`.
- [x] سكيمة Drizzle (`src/db/schema.ts`): `lesson_progress` + `exam_result` (معرّف Clerk كنص).
- [x] عميل Neon كسول (`src/db/index.ts`) + `drizzle.config.ts` + أوامر `db:generate/migrate/push`.
- [x] Server Actions للتقدّم (`src/lib/progress.ts`) — تتلاشى بأمان عند عدم الدخول/غياب القاعدة.
- [x] واجهة التقدّم: شريط في بطاقات الدورات، علامات إكمال للدروس، زر "إكمال الدرس"، حفظ نتيجة الامتحان.
- [x] **تزويد Neon عبر Vercel Marketplace** (`neon-aqua-helmet`) + `db:push` أنشأ الجداول.
- [x] التحقق: صفحات التقدّم أصبحت ديناميكية (per-user)، والاستعلام يتلاشى بأمان عند عدم الدخول.
- [ ] اختبار يدوي في المتصفح: التسجيل → إكمال درس → ظهور العلامة وحفظها (يحتاج تسجيل دخول حقيقي).

### ⬜ المرحلة 4 — التحسين والنشر
- [ ] شريط جانبي للتنقّل داخل الدورة + بحث.
- [ ] النشر على Vercel + ربط النطاق.

## ملاحظات
- المحتوى الأصلي محفوظ في `legacy/` للمرجعية ولا يُلَنتر.
- دوال `check()` في الاختبارات تبقى على جانب العميل (تُستدعى عبر `LessonQuiz` / `CourseExam`)
  حتى لا تعبر حدود الخادم→العميل.
