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
    <div className="quiz">
      <div className="quiz-head">
        <span className="quiz-icon">؟</span>
        <div>
          <h3>اختبر فهمك</h3>
          <p>أجب عن الأسئلة التالية لمراجعة ما تعلمته.</p>
        </div>
      </div>

      {hasMcq && (
        <>
          <p className="quiz-section-label">الاختيار من متعدد</p>
          {data.mcq.map((q, i) => (
            <McqItem key={i} q={q} index={i} />
          ))}
        </>
      )}

      {hasCoding && (
        <>
          <p className="quiz-section-label">أسئلة برمجية</p>
          {data.coding.map((q, i) => (
            <CodingItem key={i} q={q} number={data.mcq.length + i + 1} />
          ))}
        </>
      )}
    </div>
  );
}

function McqItem({ q, index }: { q: MCQ; index: number }) {
  const [picked, setPicked] = useState<number | null>(null);
  const answered = picked !== null;
  const correct = picked === q.correct;

  return (
    <div className="quiz-q">
      <div className="quiz-q-text">
        <span className="qnum">{index + 1}</span>
        {q.q}
      </div>
      <div className="quiz-options">
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
                "quiz-opt",
                isCorrect ? "correct" : "",
                isWrongPick ? "wrong" : "",
              ].filter(Boolean).join(" ")}
            >
              <span className="opt-letter">{OPTION_LETTERS[oi]}</span>
              {opt}
            </button>
          );
        })}
      </div>
      {answered && (
        <p className={`quiz-feedback show ${correct ? "ok" : "ko"}`}>
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
    <div className="code-q">
      <div className="code-q-prompt">
        <span className="qnum">{number}</span>
        {q.prompt}
      </div>
      {q.hint && <p className="code-q-hint">💡 {q.hint}</p>}
      <div className="code-q-editor">
        <textarea
          className="code-q-textarea"
          dir="ltr"
          spellCheck={false}
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <iframe ref={iframeRef} className="code-q-preview" title="معاينة" />
      </div>
      <div className="code-q-actions">
        <button type="button" className="btn-run" onClick={() => render(code)}>
          تشغيل
        </button>
        <button type="button" className="btn-check" onClick={check}>
          تحقق من الإجابة
        </button>
        <button
          type="button"
          className="btn-reveal"
          onClick={() => setShowSolution((s) => !s)}
        >
          {showSolution ? "إخفاء الحل" : "إظهار الحل"}
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
