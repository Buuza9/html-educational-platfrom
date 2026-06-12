import type { ReactNode } from "react";

/** A titled prose block. (legacy .block) */
export function Block({ title, children }: { title?: ReactNode; children: ReactNode }) {
  return (
    <div className="block">
      {title && <h3>{title}</h3>}
      {children}
    </div>
  );
}

/** Bulleted list. (legacy ul.bullet) */
export function Bullet({ items }: { items: ReactNode[] }) {
  return (
    <ul className="bullet">
      {items.map((it, i) => (
        <li key={i}>{it}</li>
      ))}
    </ul>
  );
}

/** A fenced code sample (LTR, monospace). (legacy .codeblock) */
export function CodeBlock({ children, small = false }: { children: ReactNode; small?: boolean }) {
  return (
    <pre className={small ? "codeblock small" : "codeblock"}>
      <code>{children}</code>
    </pre>
  );
}

/** Grid of "tag cards" describing tags/properties. (legacy .tag-grid) */
export function TagGrid({ children }: { children: ReactNode }) {
  return <div className="tag-grid">{children}</div>;
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
    <article className="tag-card">
      <div className="tag-card-head">
        <code className="tag">{name}</code>
      </div>
      <p className="tag-desc">{desc}</p>
      {when && (
        <div className="tag-when">
          <strong>متى نستخدمه؟</strong> {when}
        </div>
      )}
      {example}
    </article>
  );
}

/** "ملاحظات للامتحان" callout. (legacy .tips) */
export function Tips({ items }: { items: ReactNode[] }) {
  return (
    <div className="tips">
      <h4>💡 ملاحظات للامتحان</h4>
      <ul>
        {items.map((it, i) => (
          <li key={i}>{it}</li>
        ))}
      </ul>
    </div>
  );
}
