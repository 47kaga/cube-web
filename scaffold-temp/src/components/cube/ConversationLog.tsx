type Speaker = "ouv" | "m";

export type ConversationLine = {
  speaker: Speaker;
  text: string;
};

const speakerStyle: Record<
  Speaker,
  { label: string; className: string }
> = {
  ouv: {
    label: "OUV",
    className: "text-[#c9a0ff]",
  },
  m: {
    label: "M",
    className: "text-[#7ddf9a]",
  },
};

type Props = {
  lines: ConversationLine[];
};

export function ConversationLog({ lines }: Props) {
  return (
    <div
      className="border border-[#2a2a2a] bg-[#0a0a0a] p-3 font-mono text-xs leading-relaxed"
      role="log"
      aria-label="Archived conversation"
    >
      <p className="mb-2 text-[10px] uppercase tracking-widest text-[#5a5a5a]">
        conversation_log // static capture
      </p>
      <ul className="space-y-2">
        {lines.map((line, i) => {
          const s = speakerStyle[line.speaker];
          return (
            <li key={i} className="flex flex-wrap gap-x-2 gap-y-0">
              <span className={`shrink-0 ${s.className}`}>{`[${s.label}]`}</span>
              <span className="text-[#9a9a9a]">{line.text}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
