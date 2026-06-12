import Link from "next/link";
import { Show, UserButton } from "@clerk/nextjs";

/**
 * Account controls for the top bar: a Clerk user menu when signed in, or
 * sign-in / sign-up links when signed out. Content stays public either way.
 * Uses Clerk v7's <Show when="..."> control component.
 */
export default function AuthControls() {
  return (
    <>
      <Show when="signed-out">
        <Link
          href="/sign-in"
          className="btn-ghost whitespace-nowrap px-3 py-1.5 text-[0.78rem] sm:px-4 sm:py-2 sm:text-[0.85rem]"
        >
          تسجيل الدخول
        </Link>
        <Link
          href="/sign-up"
          className="btn-primary whitespace-nowrap px-3 py-1.5 text-[0.78rem] sm:px-4 sm:py-2 sm:text-[0.85rem]"
        >
          إنشاء حساب
        </Link>
      </Show>
      <Show when="signed-in">
        <UserButton />
      </Show>
    </>
  );
}
