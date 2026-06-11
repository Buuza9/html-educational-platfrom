"use client";

import { useMemo, useRef, useState } from "react";
import type {
  Exam as ExamData,
  ExamMCQ,
  ExamCoding,
} from "@/lib/content/types";
import { previewDocument } from "@/lib/preview";
import { saveExamResult } from "@/lib/progress";

const OPTION_LETTERS = ["أ", "ب", "ت", "د", "ث", "ج"];

type Status = { answered: boolean; correct: boolean };

type Grade = {
  label: string;
  pass: boolean;
  msg: string;
  pct: number;
  score: number;
};

function gradeFor(score: number, total: number): Grade {
  const pct = total === 0 ? 0 : Math.round((score / total) * 100);
  if (pct >= 85)
    return { label: "ممتاز", pass: true, pct, score, msg: "أداء رائع — أنت جاهز للامتحان." };
  if (pct >= 70)
    return { label: "جيد جداً", pass: true, pct, score, msg: "نتيجة جيدة جداً، راجع الأسئلة الخاطئة." };
  if (pct >= 50)
    return { label: "جيد", pass: true, pct, score, msg: "نتيجة لا بأس بها، احتاج لمراجعة المواضيع الضعيفة." };
  return { label: "يحتاج مراجعة", pass: false, pct, score, msg: "راجع الدروس مرة أخرى ثم أعد الامتحان." };
}

/** Comprehensive end-of-course exam: MCQ + coding, score bar, graded result. */
export default function Exam({
  data,
  courseSlug,
}: {
  data: ExamData;
  courseSlug: string;
}) {
  const total = data.mcq.length + data.coding.length;
  const [resetKey, setResetKey] = useState(0);
  const [mcqStatus, setMcqStatus] = useState<Status[]>(() =>
    data.mcq.map(() => ({ answered: false, correct: false })),
  );
  const [codeStatus, setCodeStatus] = useState<Status[]>(() =>
    data.coding.map(() => ({ answered: false, correct: false })),
  );
  const [result, setResult] = useState<Grade | null>(null);

  const answered = useMemo(
    () =>
      mcqStatus.filter((s) => s.answered).length +
      codeStatus.filter((s) => s.answered).length,
    [mcqStatus, codeStatus],
  );
  const correct = useMemo(
    () =>
      mcqStatus.filter((s) => s.correct).length +
      codeStatus.filter((s) => s.correct).length,
    [mcqStatus, codeStatus],
  );

  const setMcq = (i: number, next: Status) =>
    setMcqStatus((prev) => prev.map((s, idx) => (idx === i ? next : s)));
  const setCode = (i: number, next: Status) =>
    setCodeStatus((prev) => prev.map((s, idx) => (idx === i ? next : s)));

  const submit = () => {
    setResult(gradeFor(correct, total));
    try {
      void saveExamResult(courseSlug, correct, total);
    } catch {
      // signed-out or no DB — ignore, result display is unaffected
    }
  };

  const restart = () => {
    setMcqStatus(data.mcq.map(() => ({ answered: false, correct: false })));
    setCodeStatus(data.coding.map(() => ({ answered: false, correct: false })));
    setResult(null);
    setResetKey((k) => k + 1);
  };

  const pct = total === 0 ? 0 : (answered / total) * 100;

  return (
    <section className="my-8">
      {/* sticky score bar */}
      <div className="sticky top-[calc(var(--topbar-h)+8px)] z-50 mb-6 flex flex-wrap items-center justify-between gap-4 rounded-[var(--radius)] border border-line bg-surface px-5 py-4 shadow-[var(--shadow-sm)]">
        <div className="flex items-center gap-4 text-sm text-ink-soft">
          <span>
            الإجابات:{" "}
            <strong className="font-mono text-[1.05rem] text-accent">{answered}</strong> /{" "}
            {total}
          </span>
          <span>
            الصحيحة:{" "}
            <strong className="font-mono text-[1.05rem] text-ok">{correct}</strong>
          </span>
        </div>
        <div className="h-2 min-w-[140px] flex-1 overflow-hidden rounded-full bg-soft">
          <div
            className="h-full rounded-full bg-gradient-to-l from-accent to-accent-2 transition-[width] duration-300 ease-out"
            style={{ width: `${pct.toFixed(1)}%` }}
          />
        </div>
        <button
          type="button"
          onClick={submit}
          className="rounded-[10px] bg-accent px-6 py-2.5 text-[0.92rem] font-bold text-bg transition-all hover:-translate-y-px hover:bg-accent-2 hover:shadow-[var(--shadow-sm)]"
        >
          إنهاء وعرض النتيجة
        </button>
      </div>

      {/* questions */}
      <div className="space-y-4">
        {data.mcq.map((q, i) => (
          <McqCard
            key={`mcq-${i}-${resetKey}`}
            q={q}
            number={i + 1}
            onAnswered={(isCorrect) => setMcq(i, { answered: true, correct: isCorrect })}
          />
        ))}
        {data.coding.map((q, i) => (
          <CodingCard
            key={`code-${i}-${resetKey}`}
            q={q}
            number={data.mcq.length + i + 1}
            onCheck={(isCorrect) =>
              setCode(i, { answered: true, correct: isCorrect })
            }
            onReveal={() =>
              setCode(i, {
                answered: true,
                correct: codeStatus[i]?.correct ?? false,
              })
            }
          />
        ))}
      </div>

      {/* result */}
      {result && (
        <div className="mt-8 rounded-[var(--radius-lg)] border-2 border-accent bg-surface p-8 text-center">
          <h3 className="mb-2 font-display text-[1.6rem] font-bold text-accent">انتهى الامتحان!</h3>
          <div className="my-4 font-mono text-5xl font-bold leading-none text-ink">
            <span className={result.pass ? "text-ok" : "text-ko"}>{result.score}</span>
            <span className="text-2xl text-ink-mute"> / {total}</span>
          </div>
          <p className="mx-auto mb-4 max-w-[520px] text-base text-ink-soft">{result.msg}</p>
          <div
            className={`mt-2 inline-block rounded-full px-6 py-2.5 font-display text-[1.05rem] font-bold text-white ${
              result.pass ? "bg-ok" : "bg-ko"
            }`}
          >
            {result.label} ({result.pct}%)
          </div>
          <div className="mt-6">
            <button
              type="button"
              onClick={restart}
              className="rounded-lg border border-line bg-transparent px-5 py-2 text-sm font-semibold text-ink-soft transition-all hover:border-accent hover:bg-accent hover:text-bg"
            >
              إعادة الامتحان
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

function McqCard({
  q,
  number,
  onAnswered,
}: {
  q: ExamMCQ;
  number: number;
  onAnswered: (correct: boolean) => void;
}) {
  const [picked, setPicked] = useState<number | null>(null);
  const answered = picked !== null;
  const isCorrect = picked === q.correct;

  const pick = (oi: number) => {
    if (answered) return;
    setPicked(oi);
    onAnswered(oi === q.correct);
  };

  return (
    <div className="rounded-[var(--radius)] border border-line bg-surface px-7 py-6">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-dashed border-line pb-4">
        <div className="flex items-center gap-2.5 font-display text-[1.1rem] font-bold text-ink">
          <span className="inline-grid h-[30px] w-[30px] place-items-center rounded-lg bg-accent font-mono text-[0.82rem] text-bg">
            {number}
          </span>
          <span>{q.q}</span>
        </div>
        <span className="shrink-0 rounded-full bg-[var(--accent-soft)] px-2.5 py-1 text-[0.76rem] font-semibold uppercase tracking-[0.08em] text-accent-2">
          {q.topic} · MCQ
        </span>
      </div>
      <div className="flex flex-col gap-2">
        {q.opts.map((opt, oi) => {
          const showCorrect = answered && oi === q.correct;
          const showWrong = answered && oi === picked && oi !== q.correct;
          return (
            <button
              key={oi}
              type="button"
              disabled={answered}
              onClick={() => pick(oi)}
              className={[
                "flex w-full items-center gap-3 rounded-[10px] border px-4 py-2.5 text-start text-[0.92rem] transition-all",
                showCorrect
                  ? "border-ok bg-ok/[0.18] font-semibold text-ink"
                  : showWrong
                    ? "border-ko bg-ko/[0.18] text-ink"
                    : "border-line bg-bg text-ink-soft enabled:hover:-translate-x-0.5 enabled:hover:border-accent enabled:hover:bg-[var(--accent-soft)] enabled:hover:text-ink",
              ].join(" ")}
            >
              <span
                className={[
                  "grid h-6 w-6 flex-shrink-0 place-items-center rounded-md border font-mono text-xs font-bold",
                  showCorrect
                    ? "border-ok bg-ok text-white"
                    : showWrong
                      ? "border-ko bg-ko text-white"
                      : "border-line bg-soft",
                ].join(" ")}
              >
                {OPTION_LETTERS[oi]}
              </span>
              <span>{opt}</span>
            </button>
          );
        })}
      </div>
      {answered && (
        <p
          className={`mt-2.5 rounded-lg px-3.5 py-2.5 text-sm font-medium ${
            isCorrect ? "bg-ok/10 text-ok" : "bg-ko/10 text-ko"
          }`}
        >
          {isCorrect
            ? q.ok ?? "✓ إجابة صحيحة"
            : q.ko ?? `✗ الإجابة الصحيحة هي: ${q.opts[q.correct]}`}
        </p>
      )}
    </div>
  );
}

function CodingCard({
  q,
  number,
  onCheck,
  onReveal,
}: {
  q: ExamCoding;
  number: number;
  onCheck: (correct: boolean) => void;
  onReveal: () => void;
}) {
  const [code, setCode] = useState(q.starter ?? "");
  const [feedback, setFeedback] = useState<{ ok: boolean; msg: string } | null>(null);
  const [showSolution, setShowSolution] = useState(false);
  const [ran, setRan] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const render = (value: string) => {
    if (iframeRef.current) iframeRef.current.srcdoc = previewDocument(value);
  };

  const run = () => {
    render(code);
    setRan(true);
    window.setTimeout(() => setRan(false), 1100);
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
    onCheck(ok);
  };

  const reveal = () => {
    render(code);
    setShowSolution(true);
    onReveal();
  };

  return (
    <div className="rounded-[var(--radius)] border border-line bg-surface px-7 py-6">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-dashed border-line pb-4">
        <div className="flex items-center gap-2.5 font-display text-[1.1rem] font-bold text-ink">
          <span className="inline-grid h-[30px] w-[30px] place-items-center rounded-lg bg-accent font-mono text-[0.82rem] text-bg">
            {number}
          </span>
          <span>{q.prompt}</span>
        </div>
        <span className="shrink-0 rounded-full bg-[var(--accent-soft)] px-2.5 py-1 text-[0.76rem] font-semibold uppercase tracking-[0.08em] text-accent-2">
          {q.topic} · سؤال برمجي
        </span>
      </div>
      {q.hint && <p className="mb-2 text-sm text-ink-mute">💡 {q.hint}</p>}
      <div className="grid gap-px overflow-hidden rounded-lg border border-line bg-line md:grid-cols-2">
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
          className="min-h-[140px] resize-y bg-surface p-3 font-mono text-sm text-ink outline-none"
        />
        <iframe ref={iframeRef} title="معاينة" className="min-h-[140px] w-full bg-white" />
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={run}
          className="rounded-lg border border-line px-3 py-1.5 text-sm hover:bg-soft"
        >
          {ran ? "تم ✓" : "تشغيل"}
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
          onClick={reveal}
          className="rounded-lg border border-line px-3 py-1.5 text-sm hover:bg-soft"
        >
          إظهار الحل
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
        <div className="mt-3">
          <div className="mb-1 text-sm font-bold text-ink-mute">الحل المقترح:</div>
          <pre
            className="overflow-x-auto rounded-lg bg-code-bg p-3 text-sm text-code-fg"
            dir="ltr"
          >
            <code>{q.solution}</code>
          </pre>
        </div>
      )}
    </div>
  );
}
