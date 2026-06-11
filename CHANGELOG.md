# CHANGELOG

جميع التغييرات الملحوظة في هذا المشروع.

## [Unreleased]

### Added
- نقل المنصة إلى **Next.js 16 + TypeScript + Tailwind v4** (فرع `nextjs-platform`).
- لوحة تحكم تعرض كل الدورات، صفحة لكل دورة بقائمة دروسها، وصفحة مستقلة لكل درس
  تحتوي شرحه ومحرّره واختباره الخاص، وصفحة امتحان شامل لكل دورة.
- دورة **CSS** كاملة (7 دروس + امتحان) أُضيفت إلى المنهج.
- نماذج محتوى مُنمَّطة (`Course` / `Lesson` / `Quiz` / `Exam`) ومكوّنات تفاعلية
  (`Editor`, `Quiz`, `Exam`) بمحرّر كود ومعاينة مباشرة.
- وضع ليلي/نهاري، خطوط عربية (Reem Kufi / Tajawal)، دعم RTL كامل.
- وثائق: `README.md`, `TRACKING.md`, `CHANGELOG.md`, `.env.example`.

### Changed
- أُرشف الموقع الثابت الأصلي (HTML/CSS/JS) داخل `legacy/`.

### Notes
- المرحلتان القادمتان: المصادقة عبر Clerk، وحفظ التقدّم عبر Neon + Drizzle.
