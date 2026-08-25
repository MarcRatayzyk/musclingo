"use client";

function renderInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g).filter((p) => p.length > 0);
  return parts.map((part, i) => {
    const bold = /^\*\*[^*]+\*\*$/.test(part);
    const content = bold ? part.slice(2, -2) : part;
    return bold ? (
      <strong key={i} className="font-semibold text-white">
        {content}
      </strong>
    ) : (
      <span key={i}>{content}</span>
    );
  });
}

function parseChunks(markdown: string): string[] {
  const normalized = markdown.replace(/\r\n/g, "\n").trim();
  if (!normalized) return [];

  const byRule = normalized
    .split(/\n---\n/)
    .map((s) =>
      s
        .replace(/^#+\s*/gm, "")
        .replace(/\n+/g, " ")
        .replace(/\s+/g, " ")
        .trim(),
    )
    .filter(Boolean);

  if (byRule.length > 1) return byRule;

  const one = normalized
    .replace(/^#+\s*/gm, "")
    .replace(/\n+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return one ? [one] : [];
}

export function MarkdownPreview({ markdown }: { markdown: string }) {
  const chunks = parseChunks(markdown);

  if (!chunks.length) {
    return <p className="text-sm text-muted">Rien à prévisualiser.</p>;
  }

  return (
    <div className="space-y-4">
      {chunks.map((chunk, i) => (
        <div key={i}>
          {i > 0 && <hr className="mb-4 border-border/60" />}
          <p className="text-sm leading-7 text-white/90">{renderInline(chunk)}</p>
          <p className="mt-1 text-[11px] uppercase tracking-wider text-muted">
            Paragraphe {i + 1}/{chunks.length}
          </p>
        </div>
      ))}
    </div>
  );
}
