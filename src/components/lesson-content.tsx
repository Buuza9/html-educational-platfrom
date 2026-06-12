import type { ReactNode } from "react";

/** A titled prose block. (legacy .block) */
export function Block({ title, children }: { title?: ReactNode; children: ReactNode }) {
  return (
    <div className="mb-8">
      {title && (
        <h3 className="mb-3.5 font-display text-2xl font-bold text-ink">{title}</h3>
      )}
      <div className="space-y-3.5 text-ink-soft [&_strong]:font-bold [&_strong]:text-ink">
        {children}
      </div>
    </div>
  );
}

/** Bulleted list. (legacy ul.bullet) */
export function Bullet({ items }: { items: ReactNode[] }) {
  return (
    <ul className="my-2 space-y-2.5 text-ink-soft">
      {items.map((it, i) => (
        <li key={i} className="relative pe-0 ps-7">
          <span className="absolute start-0 top-[0.65em] h-[7px] w-[7px] rounded-full bg-accent" />
          {it}
        </li>
      ))}
    </ul>
  );
}

/** A fenced code sample (LTR, monospace). (legacy .codeblock) */
export function CodeBlock({ children, small = false }: { children: ReactNode; small?: boolean }) {
  return (
    <pre
      dir="ltr"
      className={`my-3 overflow-x-auto rounded-[var(--radius-app-sm)] border border-line bg-code-bg text-start font-mono leading-[1.65] text-code-fg shadow-[var(--shadow-sm)] ${
        small ? "px-3.5 py-3 text-[0.82rem]" : "px-5 py-[1.1rem] text-[0.9rem]"
      }`}
    >
      <code className="border-0 bg-transparent p-0 text-inherit">{children}</code>
    </pre>
  );
}

/** Grid of "tag cards" describing tags/properties. (legacy .tag-grid) */
export function TagGrid({ children }: { children: ReactNode }) {
  return (
    <div className="my-6 grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4">
      {children}
    </div>
  );
}

export function TagCard({
  name,
  desc,
  when,
  example,
}: {
  name: ReactNode;
  desc: ReactNode;
  when?: ReactNode;
  example?: ReactNode;
}) {
  return (
    <article className="flex flex-col gap-2.5 rounded-[var(--radius-app)] border border-line bg-surface px-[1.35rem] py-5 transition duration-200 hover:-translate-y-[3px] hover:border-accent hover:shadow-[var(--shadow-md)]">
      <div className="font-mono text-base font-semibold">
        <span
          dir="ltr"
          className="inline-block rounded-md bg-ink px-[11px] py-[5px] text-[0.92rem] text-bg"
        >
          {name}
        </span>
      </div>
      <p className="text-[0.94rem] leading-[1.7] text-ink-soft">{desc}</p>
      {when && (
        <p className="rounded-lg border-s-2 border-accent bg-soft px-3 py-2 text-[0.85rem] text-ink-mute">
          <strong className="font-bold text-ink-soft">متى نستخدمه؟</strong> {when}
        </p>
      )}
      {example && <div>{example}</div>}
    </article>
  );
}

/** "ملاحظات للامتحان" callout. (legacy .tips) */
export function Tips({ items }: { items: ReactNode[] }) {
  return (
    <div className="my-6 rounded-[var(--radius-app)] border border-accent/25 border-s-[3px] border-s-accent bg-accent-soft px-6 py-5">
      <h4 className="mb-2.5 font-display text-[1.05rem] font-bold text-accent">
        💡 ملاحظات للامتحان
      </h4>
      <ul className="space-y-[0.45rem]">
        {items.map((it, i) => (
          <li key={i} className="relative pe-0 ps-[1.4rem] text-[0.94rem] text-ink-soft">
            <span className="absolute start-0 font-bold text-accent">✓</span>
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
}
