"use client";

import { useRef, useState } from "react";
import type { Quiz as QuizData, MCQ, CodingQuestion } from "@/lib/content/types";
import { previewDocument } from "@/lib/preview";

const OPTION_LETTERS = ["أ", "ب", "ت", "د", "ث", "ج"];

/** Per-lesson quiz: MCQ section + coding section. */
export default function Quiz({ data }: { data: QuizData }) {
  const hasMcq = data.mcq.length > 0;
  const hasCoding = data.coding.length > 0;
  if (!hasMcq && !hasCoding) return null;

  return (
    <section className="my-8 rounded-[var(--radius)] border border-line bg-surface px-4 py-6 sm:px-7">
      <div className="mb-5 flex items-center gap-3 border-b border-dashed border-line pb-4">
        <span className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-[10px] bg-accent text-[1.05rem] text-bg">
          ؟
        </span>
        <div>
          <h3 className="font-display text-lg font-bold leading-tight">اختبر فهمك</h3>
          <p className="text-xs text-ink-mute">أجب عن الأسئلة التالية لمراجعة ما تعلمته.</p>
        </div>
      </div>

      {hasMcq && (
        <>
          <p className="mb-3.5 mt-0 border-s-[3px] border-accent-2 ps-2 font-display text-[0.82rem] font-bold uppercase tracking-[0.14em] text-accent-2">
            الاختيار من متعدد
          </p>
          <div className="space-y-6">
            {data.mcq.map((q, i) => (
              <McqItem key={i} q={q} index={i} />
            ))}
          </div>
        </>
      )}

      {hasCoding && (
        <>
          <p className="mb-3.5 mt-6 border-s-[3px] border-accent-2 ps-2 font-display text-[0.82rem] font-bold uppercase tracking-[0.14em] text-accent-2">
            أسئلة برمجية
          </p>
          <div className="space-y-6">
            {data.coding.map((q, i) => (
              <CodingItem key={i} q={q} number={data.mcq.length + i + 1} />
            ))}
          </div>
        </>
      )}
    </section>
  );
}

function McqItem({ q, index }: { q: MCQ; index: number }) {
  const [picked, setPicked] = useState<number | null>(null);
  const answered = picked !== null;
  const correct = picked === q.correct;

  return (
    <div>
      <div className="mb-3.5 flex items-start text-[0.98rem] font-semibold">
        <span className="me-2 mt-0.5 inline-grid h-[22px] w-[22px] flex-shrink-0 place-items-center rounded-md bg-ink font-mono text-[0.72rem] text-bg">
          {index + 1}
        </span>
        <span className="min-w-0 break-words">{q.q}</span>
      </div>
      <div className="flex flex-col gap-2">
        {q.opts.map((opt, oi) => {
          const isCorrect = answered && oi === q.correct;
          const isWrongPick = answered && oi === picked && oi !== q.correct;
          return (
            <button
              key={oi}
              type="button"
              disabled={answered}
              onClick={() => setPicked(oi)}
              className={[
                "flex w-full items-start gap-3 rounded-[10px] border px-4 py-2.5 text-start text-[0.92rem] transition-all",
                isCorrect
                  ? "border-ok bg-ok/[0.18] font-semibold text-ink"
                  : isWrongPick
                    ? "border-ko bg-ko/[0.18] text-ink"
                    : "border-line bg-bg text-ink-soft enabled:hover:-translate-x-0.5 enabled:hover:border-accent enabled:hover:bg-[var(--accent-soft)] enabled:hover:text-ink",
              ].join(" ")}
            >
              <span
                className={[
                  "grid h-6 w-6 flex-shrink-0 place-items-center rounded-md border font-mono text-xs font-bold",
                  isCorrect
                    ? "border-ok bg-ok text-white"
                    : isWrongPick
                      ? "border-ko bg-ko text-white"
                      : "border-line bg-soft",
                ].join(" ")}
              >
                {OPTION_LETTERS[oi]}
              </span>
              <span className="min-w-0 break-words">{opt}</span>
            </button>
          );
        })}
      </div>
      {answered && (
        <p
          className={`mt-2.5 rounded-lg px-3.5 py-2.5 text-sm font-medium ${
            correct ? "bg-ok/10 text-ok" : "bg-ko/10 text-ko"
          }`}
        >
          {correct
            ? q.ok ?? "✓ إجابة صحيحة"
            : q.ko ?? `✗ الإجابة الصحيحة: ${q.opts[q.correct]}`}
        </p>
      )}
    </div>
  );
}

function CodingItem({ q, number }: { q: CodingQuestion; number: number }) {
  const [code, setCode] = useState(q.starter ?? "");
  const [feedback, setFeedback] = useState<{ ok: boolean; msg: string } | null>(null);
  const [showSolution, setShowSolution] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const render = (value: string) => {
    if (iframeRef.current) iframeRef.current.srcdoc = previewDocument(value);
  };

  const check = () => {
    render(code);
    let ok = false;
    try {
      ok = q.check(code);
    } catch {
      ok = false;
    }
    setFeedback(
      ok
        ? { ok: true, msg: "✓ إجابة صحيحة! أحسنت." }
        : { ok: false, msg: "✗ ليست بعد — راجع الإرشاد وحاول مرة أخرى." },
    );
  };

  return (
    <div>
      <div className="mb-2 flex items-start text-[0.98rem] font-semibold">
        <span className="me-2 mt-0.5 inline-grid h-[22px] w-[22px] flex-shrink-0 place-items-center rounded-md bg-ink font-mono text-[0.72rem] text-bg">
          {number}
        </span>
        <span className="min-w-0 break-words">{q.prompt}</span>
      </div>
      {q.hint && <p className="mb-2 text-sm text-ink-mute">💡 {q.hint}</p>}
      <div className="grid gap-px overflow-hidden rounded-lg border border-line bg-line md:grid-cols-2">
        <textarea
          dir="ltr"
          spellCheck={false}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="min-h-[140px] w-full resize-y bg-surface p-3 font-mono text-sm text-ink outline-none"
        />
        <iframe ref={iframeRef} title="معاينة" className="min-h-[140px] w-full bg-white" />
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => render(code)}
          className="rounded-lg border border-line px-3 py-1.5 text-sm hover:bg-soft"
        >
          تشغيل
        </button>
        <button
          type="button"
          onClick={check}
          className="rounded-lg bg-accent px-3 py-1.5 text-sm font-semibold text-bg hover:opacity-90"
        >
          تحقق من الإجابة
        </button>
        <button
          type="button"
          onClick={() => setShowSolution((s) => !s)}
          className="rounded-lg border border-line px-3 py-1.5 text-sm hover:bg-soft"
        >
          {showSolution ? "إخفاء الحل" : "إظهار الحل"}
        </button>
      </div>
      {feedback && (
        <p
          className={`mt-2.5 rounded-lg px-3.5 py-2.5 text-sm font-medium ${
            feedback.ok ? "bg-ok/10 text-ok" : "bg-ko/10 text-ko"
          }`}
        >
          {feedback.msg}
        </p>
      )}
      {showSolution && (
        <pre className="mt-3 overflow-x-auto rounded-lg bg-code-bg p-3 text-sm text-code-fg" dir="ltr">
          <code>{q.solution}</code>
        </pre>
      )}
    </div>
  );
}
