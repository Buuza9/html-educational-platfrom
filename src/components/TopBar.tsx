import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import AuthControls from "@/components/AuthControls";

/**
 * Shared top bar: brand (links home), account controls, theme toggle.
 * Used by the dashboard and the course-area layout for consistent navigation.
 */
export default function TopBar() {
  return (
    <header className="topbar gap-2 px-3 sm:gap-4 sm:px-6">
      <Link href="/" className="brand min-w-0">
        <div className="brand-mark shrink-0" dir="ltr" aria-hidden>
          &lt;/&gt;
        </div>
        <div className="brand-text hidden min-[400px]:block">
          <h1 className="whitespace-nowrap text-[0.95rem] sm:text-[1.18rem]">
            تعلّم HTML و CSS
          </h1>
          <span className="hidden sm:block">منصة تفاعلية للمبتدئين</span>
        </div>
      </Link>
      <div className="topbar-tools gap-1.5 sm:gap-[0.6rem]">
        <AuthControls />
        <ThemeToggle />
      </div>
    </header>
  );
}
