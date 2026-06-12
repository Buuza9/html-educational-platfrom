import Link from "next/link";
import { Show, UserButton } from "@clerk/nextjs";

/**
 * Account controls for the top bar: a Clerk user menu when signed in, or
 * sign-in / sign-up links when signed out. Content stays public either way.
 * Uses Clerk v7's <Show when="..."> control component.
 */
export default function AuthControls() {
  return (
    <div className="flex items-center gap-2">
      <Show when="signed-out">
        <Link
          href="/sign-in"
          className="flex min-h-[36px] items-center rounded-[10px] border border-line bg-surface px-3 py-2 text-[0.8rem] font-semibold text-ink no-underline transition-all duration-200 hover:-translate-y-px hover:border-accent hover:bg-[var(--accent-soft)] hover:text-accent hover:no-underline sm:px-[1rem] sm:text-[0.85rem]"
        >
          <span className="sm:hidden">دخول</span>
          <span className="hidden sm:inline">تسجيل الدخول</span>
        </Link>
        <Link
          href="/sign-up"
          className="flex min-h-[36px] items-center rounded-[10px] border border-transparent bg-accent px-3 py-2 text-[0.8rem] font-semibold text-bg no-underline transition-all duration-200 hover:-translate-y-px hover:bg-ink hover:no-underline hover:shadow-[var(--shadow-sm)] sm:px-[1rem] sm:text-[0.85rem]"
        >
          <span className="sm:hidden">حساب</span>
          <span className="hidden sm:inline">إنشاء حساب</span>
        </Link>
      </Show>
      <Show when="signed-in">
        <UserButton />
      </Show>
    </div>
  );
}
