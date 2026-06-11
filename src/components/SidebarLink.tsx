"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * A single lesson row in the course sidebar. Highlights the active lesson
 * (matching the current path) with a fixed navy background + white text — the
 * legacy ".nav-link.active" inverted style, readable in both themes.
 */
export default function SidebarLink({
  href,
  number,
  title,
  isDone,
}: {
  href: string;
  number: number;
  title: string;
  isDone: boolean;
}) {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={[
        "group flex items-center gap-3 rounded-[10px] border px-3.5 py-2.5 text-[0.92rem] font-medium no-underline transition-all duration-150",
        active
          ? "border-transparent bg-[var(--c-main)] text-white shadow-[var(--shadow-sm)] hover:text-white"
          : "border-transparent text-ink-soft hover:bg-surface hover:text-ink",
      ].join(" ")}
    >
      <span
        className={`min-w-[22px] shrink-0 font-mono text-xs font-semibold ${
          active ? "text-white/65" : "text-ink-mute"
        }`}
      >
        {number}
      </span>
      <span className="flex-1">{title}</span>
      {isDone && (
        <span
          aria-label="مكتمل"
          title="مكتمل"
          className={`shrink-0 font-semibold ${active ? "text-white" : "text-ok"}`}
        >
          ✓
        </span>
      )}
    </Link>
  );
}
