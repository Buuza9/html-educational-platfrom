import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import AuthControls from "@/components/AuthControls";

/**
 * Shared top bar: brand (links home), account controls, theme toggle.
 * Used by the dashboard and the course-area layout for consistent navigation.
 */
export default function TopBar() {
  return (
    <header className="topbar">
      <Link href="/" className="brand">
        <div className="brand-mark" dir="ltr" aria-hidden>
          &lt;/&gt;
        </div>
        <div className="brand-text">
          <h1>تعلّم HTML و CSS</h1>
          <span>منصة تفاعلية للمبتدئين</span>
        </div>
      </Link>
      <div className="topbar-tools">
        <AuthControls />
        <ThemeToggle />
      </div>
    </header>
  );
}
