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
    <section>
      {/* sticky score bar */}
      <div className="exam-score-bar">
        <div className="exam-score-info">
          <span>
            الإجابات: <strong>{answered}</strong> / {total}
          </span>
          <span>
            الصحيحة: <strong>{correct}</strong>
          </span>
        </div>
        <div className="exam-progress">
          <div
            className="exam-progress-fill"
            style={{ width: `${pct.toFixed(1)}%` }}
          />
        </div>
        <button type="button" className="exam-submit" onClick={submit}>
          إنهاء وعرض النتيجة
        </button>
      </div>

      {/* questions */}
      <div>
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
        <div className="exam-result show">
          <h3>انتهى الامتحان!</h3>
          <div className="exam-result-score">
            {result.score}
            <span> / {total}</span>
          </div>
          <p>{result.msg}</p>
          <div
            className={`exam-result-grade ${result.pass ? "pass" : "fail"}`}
          >
            {result.label} ({result.pct}%)
          </div>
          <div>
            <button type="button" className="exam-restart" onClick={restart}>
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
    <div className="exam-card">
      <div className="exam-card-head">
        <div className="exam-card-title">
          <span className="exam-card-num">{number}</span>
          {q.q}
        </div>
        <span className="exam-card-topic">{q.topic} · MCQ</span>
      </div>
      <div className="quiz-options">
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
                "quiz-opt",
                showCorrect ? "correct" : "",
                showWrong ? "wrong" : "",
              ].filter(Boolean).join(" ")}
            >
              <span className="opt-letter">{OPTION_LETTERS[oi]}</span>
              {opt}
            </button>
          );
        })}
      </div>
      {answered && (
        <p className={`quiz-feedback show ${isCorrect ? "ok" : "ko"}`}>
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
    <div className="exam-card">
      <div className="exam-card-head">
        <div className="exam-card-title">
          <span className="exam-card-num">{number}</span>
          {q.prompt}
        </div>
        <span className="exam-card-topic">{q.topic} · سؤال برمجي</span>
      </div>
      {q.hint && <p className="code-q-hint">💡 {q.hint}</p>}
      <div className="code-q-editor">
        <textarea
          className="code-q-textarea"
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
        <iframe ref={iframeRef} className="code-q-preview" title="معاينة" />
      </div>
      <div className="code-q-actions">
        <button type="button" className="btn-run" onClick={run}>
          {ran ? "تم ✓" : "تشغيل"}
        </button>
        <button type="button" className="btn-check" onClick={check}>
          تحقق من الإجابة
        </button>
        <button type="button" className="btn-reveal" onClick={reveal}>
          إظهار الحل
        </button>
      </div>
      {feedback && (
        <p className={`code-q-feedback show ${feedback.ok ? "ok" : "ko"}`}>
          {feedback.msg}
        </p>
      )}
      <div className={`code-q-solution${showSolution ? " show" : ""}`}>
        <div className="code-q-solution-label">الحل المقترح:</div>
        <pre dir="ltr">
          <code>{q.solution}</code>
        </pre>
      </div>
    </div>
  );
}
