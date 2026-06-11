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
          className="rounded-[10px] border border-line bg-surface px-[1rem] py-2 text-[0.85rem] font-semibold text-ink no-underline transition-all duration-200 hover:-translate-y-px hover:border-accent hover:bg-[var(--accent-soft)] hover:text-accent hover:no-underline"
        >
          تسجيل الدخول
        </Link>
        <Link
          href="/sign-up"
          className="rounded-[10px] border border-transparent bg-accent px-[1rem] py-2 text-[0.85rem] font-semibold text-bg no-underline transition-all duration-200 hover:-translate-y-px hover:bg-ink hover:no-underline hover:shadow-[var(--shadow-sm)]"
        >
          إنشاء حساب
        </Link>
      </Show>
      <Show when="signed-in">
        <UserButton />
      </Show>
    </div>
  );
}
