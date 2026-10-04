// Minimal Markdown reader for editorial articles. It covers only what the
// articles use (headings, paragraphs, lists, rules, **bold**, *italic*) and
// never alters the text: every character outside the markup is kept as is.

export type Inline = string | { type: "strong" | "em"; children: Inline[] };

export type Block =
  | { type: "heading"; level: number; content: Inline[] }
  | { type: "paragraph"; content: Inline[] }
  | { type: "list"; ordered: boolean; items: Inline[][] }
  | { type: "rule" };

export function parseInline(text: string): Inline[] {
  const out: Inline[] = [];
  const pattern = /\*\*(.+?)\*\*|\*(.+?)\*/g;
  let last = 0;

  for (const match of text.matchAll(pattern)) {
    if (match.index > last) out.push(text.slice(last, match.index));
    out.push(
      match[1] !== undefined
        ? { type: "strong", children: parseInline(match[1]) }
        : { type: "em", children: parseInline(match[2]) },
    );
    last = match.index + match[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

export function parseMarkdown(source: string): Block[] {
  const blocks: Block[] = [];
  let paragraph: string[] = [];
  let list: { ordered: boolean; items: string[] } | null = null;

  const flush = () => {
    if (paragraph.length) blocks.push({ type: "paragraph", content: parseInline(paragraph.join(" ")) });
    if (list) blocks.push({ type: "list", ordered: list.ordered, items: list.items.map(parseInline) });
    paragraph = [];
    list = null;
  };

  for (const line of source.split(/\r?\n/)) {
    const heading = line.match(/^(#{1,6}) (.*)$/);
    const bullet = line.match(/^- (.*)$/);
    const numbered = line.match(/^\d+\. (.*)$/);

    if (!line.trim()) {
      flush();
    } else if (heading) {
      flush();
      blocks.push({ type: "heading", level: heading[1].length, content: parseInline(heading[2]) });
    } else if (/^-{3,}$/.test(line)) {
      flush();
      blocks.push({ type: "rule" });
    } else if (bullet || numbered) {
      const ordered = Boolean(numbered);
      if (paragraph.length || (list && list.ordered !== ordered)) flush();
      list ??= { ordered, items: [] };
      list.items.push((bullet ?? numbered)![1]);
    } else {
      if (list) flush();
      paragraph.push(line);
    }
  }
  flush();
  return blocks;
}

export function plainText(content: Inline[]): string {
  return content.map((node) => (typeof node === "string" ? node : plainText(node.children))).join("");
}
