"use client";

import { useEffect, useRef, useState } from "react";
import { previewDocument } from "@/lib/preview";

interface EditorProps {
  title: string;
  defaultCode: string;
}

/** Live code editor: a textarea + an iframe preview, with run/copy/reset. */
export default function Editor({ title, defaultCode }: EditorProps) {
  const [code, setCode] = useState(defaultCode);
  const [runLabel, setRunLabel] = useState("تشغيل");
  const [copyLabel, setCopyLabel] = useState("نسخ");
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const render = (value: string) => {
    if (iframeRef.current) iframeRef.current.srcdoc = previewDocument(value);
  };

  // Render the initial preview into the iframe (a DOM side-effect, not state).
  // `code` is seeded from defaultCode via useState; route changes remount this
  // component, so there is no need to reset state when defaultCode changes.
  useEffect(() => {
    render(defaultCode);
  }, [defaultCode]);

  const run = () => {
    render(code);
    setRunLabel("تم ✓");
    setTimeout(() => setRunLabel("تشغيل"), 1100);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopyLabel("تم النسخ ✓");
      setTimeout(() => setCopyLabel("نسخ"), 1100);
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="my-8 overflow-hidden rounded-[var(--radius-app)] border border-line bg-surface shadow-[var(--shadow-md)]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-soft px-4 py-3.5 text-sm font-semibold text-ink-soft sm:px-5">
        <span>{title}</span>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={copy}
            className="rounded-lg border border-line bg-transparent px-[1.1rem] py-2 text-[0.85rem] font-semibold text-ink-soft transition duration-200 hover:border-ink-mute hover:bg-bg hover:text-ink"
          >
            {copyLabel}
          </button>
          <button
            type="button"
            onClick={run}
            className="rounded-lg bg-accent px-[1.1rem] py-2 text-[0.85rem] font-semibold text-white transition duration-200 hover:-translate-y-px hover:bg-ink hover:shadow-[var(--shadow-sm)]"
          >
            {runLabel}
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:min-h-[280px] md:grid-cols-2">
        <textarea
          dir="ltr"
          spellCheck={false}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          onKeyDown={(e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
              e.preventDefault();
              run();
            }
          }}
          className="min-h-[200px] w-full resize-y bg-code-bg px-[1.15rem] py-4 text-start font-mono text-[0.88rem] leading-[1.7] text-code-fg outline-none md:min-h-[280px]"
        />
        <iframe
          ref={iframeRef}
          title="معاينة"
          className="min-h-[200px] w-full border-t border-line bg-white md:min-h-[280px] md:border-s md:border-t-0"
        />
      </div>
    </div>
  );
}
