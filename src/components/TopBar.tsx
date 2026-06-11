import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import AuthControls from "@/components/AuthControls";

/**
 * Shared top bar: brand (links home), account controls, theme toggle.
 * Used by the dashboard and the course-area layout for consistent navigation.
 */
export default function TopBar() {
  return (
    <header className="sticky top-0 z-100 border-b border-line bg-[rgba(240,236,229,0.88)] backdrop-blur-[14px] backdrop-saturate-150 transition-colors dark:bg-[rgba(22,26,48,0.88)]">
      <div className="mx-auto flex h-[68px] max-w-6xl items-center gap-4 px-6">
        <Link
          href="/"
          className="flex items-center gap-[0.85rem] no-underline hover:no-underline"
        >
          <span
            className="grid h-[42px] w-[42px] place-items-center rounded-[11px] bg-ink font-mono text-[0.85rem] font-bold tracking-[-0.05em] text-bg shadow-[var(--shadow-sm)]"
            dir="ltr"
            aria-hidden
          >
            &lt;/&gt;
          </span>
          <span className="flex flex-col">
            <span className="font-display text-[1.18rem] font-bold leading-[1.1] tracking-[-0.01em] text-ink">
              تعلّم HTML و CSS
            </span>
            <span className="mt-0.5 text-[0.72rem] font-medium text-ink-mute">
              منصة تفاعلية للمبتدئين
            </span>
          </span>
        </Link>
        <div className="ms-auto flex items-center gap-[0.6rem]">
          <AuthControls />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
