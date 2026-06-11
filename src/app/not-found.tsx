import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-6 text-center">
      <p className="font-mono text-5xl font-bold text-accent">404</p>
      <h1 className="mt-4 text-2xl font-bold">الصفحة غير موجودة</h1>
      <p className="mt-2 text-ink-mute">
        ربما حُذف هذا الدرس أو تغيّر رابطه. يمكنك العودة إلى قائمة الدورات.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-lg bg-accent px-5 py-2.5 font-semibold text-bg transition hover:opacity-90"
      >
        كل الدورات
      </Link>
    </main>
  );
}
