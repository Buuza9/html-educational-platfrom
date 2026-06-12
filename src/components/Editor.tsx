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
    <div className="editor">
      <div className="editor-head">
        <span>{title}</span>
        <div className="editor-actions">
          <button type="button" className="btn-ghost copy-btn" onClick={copy}>
            {copyLabel}
          </button>
          <button type="button" className="btn-primary run-btn" onClick={run}>
            {runLabel}
          </button>
        </div>
      </div>
      <div className="editor-body">
        <textarea
          className="editor-code"
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
        />
        <iframe ref={iframeRef} className="editor-preview" title="معاينة" />
      </div>
    </div>
  );
}
