"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { markLessonComplete } from "@/lib/progress";

export default function LessonCompleteButton({
  courseSlug,
  lessonSlug,
  initialCompleted,
}: {
  courseSlug: string;
  lessonSlug: string;
  initialCompleted: boolean;
}) {
  const [completed, setCompleted] = useState(initialCompleted);
  const [needsSignIn, setNeedsSignIn] = useState(false);
  const [isPending, startTransition] = useTransition();

  if (completed) {
    return (
      <div className="mt-8 flex items-center gap-2 text-sm font-medium text-ok">
        تمّ إكمال هذا الدرس ✓
      </div>
    );
  }

  function handleClick() {
    startTransition(async () => {
      const res = await markLessonComplete(courseSlug, lessonSlug);
      if (res.ok) {
        setCompleted(true);
      } else {
        setNeedsSignIn(true);
      }
    });
  }

  return (
    <div className="mt-8">
      <button
        type="button"
        onClick={handleClick}
        disabled={isPending}
        className="inline-flex items-center gap-2 rounded-lg bg-accent px-[1.1rem] py-2 text-[0.85rem] font-semibold text-white transition duration-200 hover:-translate-y-px hover:bg-ink hover:shadow-[var(--shadow-sm)] disabled:translate-y-0 disabled:opacity-60"
      >
        اعتبر الدرس مكتملاً
      </button>
      {needsSignIn && (
        <p className="mt-2 text-sm text-ink-mute">
          <Link href="/sign-in" className="underline transition hover:text-ink">
            سجّل الدخول لحفظ تقدّمك
          </Link>
        </p>
      )}
    </div>
  );
}
