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
        className="inline-flex items-center gap-2 rounded-[10px] border border-line bg-surface px-3.5 py-2.5 text-[0.92rem] font-semibold text-ink no-underline shadow-[var(--shadow-sm)] transition-all duration-150 hover:bg-soft"
      >
        <span aria-hidden="true">☰</span>
        <span>الدروس</span>
      </button>

      {open && (
        <div className="fixed inset-0 z-50" role="dialog" aria-modal="true">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute inset-y-0 start-0 flex w-[85%] max-w-[320px] flex-col overflow-y-auto border-e border-line bg-bg shadow-[var(--shadow-sm)]">
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <span className="text-[0.92rem] font-bold text-ink">الدروس</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="إغلاق"
                className="inline-flex h-9 w-9 items-center justify-center rounded-[10px] text-ink-mute transition-all duration-150 hover:bg-surface hover:text-ink"
              >
                <span aria-hidden="true">✕</span>
              </button>
            </div>
            <div className="px-5 pb-6 pt-5" onClick={() => setOpen(false)}>
              {children}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
