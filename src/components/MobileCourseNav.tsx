"use client";

import { useEffect, useState, type ReactNode } from "react";

/**
 * Mobile-only in-course navigation. Renders a "الدروس" toggle button below lg
 * and a slide-over drawer (from the start side for RTL) containing the
 * server-rendered sidebar passed as children.
 */
export default function MobileCourseNav({
  children,
}: {
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-haspopup="dialog"
        className="nav-link nav-exam"
      >
        <span aria-hidden="true">☰</span>
        <span>الدروس</span>
      </button>

      {open && (
        <div className="fixed inset-0 z-[200]" role="dialog" aria-modal="true">
          <div
            className="sidebar-overlay show"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div
            className="absolute inset-y-0 start-0 w-[85%] max-w-[320px] overflow-y-auto bg-[var(--bg)]"
            onClick={() => setOpen(false)}
          >
            {children}
          </div>
        </div>
      )}
    </div>
  );
}
