"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * A single lesson row in the course sidebar. Highlights the active lesson
 * (matching the current path) with the legacy ".nav-link.active" inverted
 * style, readable in both themes.
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
      className={active ? "nav-link active" : "nav-link"}
    >
      <span className="nav-num">{number}</span>
      <span>{title}</span>
      {isDone && (
        <span aria-label="مكتمل" title="مكتمل">
          ✓
        </span>
      )}
    </Link>
  );
}
