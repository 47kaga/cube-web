import { ConfidentialStamp } from "./ConfidentialStamp";
import { ConversationLog, type ConversationLine } from "./ConversationLog";
import { TerminalLink } from "./TerminalButton";

const PLACEHOLDER_IMAGES = ["SLOT_A", "SLOT_B"] as const;

type Props = {
  episodeTitle: string;
  conversation: ConversationLine[];
};

export function EvidenceDossier({ episodeTitle, conversation }: Props) {
  return (
    <article className="relative max-w-3xl mx-auto border border-[#444] bg-[#d4d4d4] text-[#1a1a1a] p-6 md:p-10 shadow-[8px_8px_0_#000]">
      <ConfidentialStamp />
      <header className="relative z-10 mb-8 border-b-2 border-[#222] pb-4">
        <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#555] mb-2">
          Act I — Episode I
        </p>
        <h1 className="font-mono text-lg md:text-xl tracking-tight text-[#111]">
          {episodeTitle}
        </h1>
      </header>

      <section className="relative z-10 mb-8">
        <h2 className="font-mono text-xs uppercase tracking-widest text-[#444] mb-3">
          Evidence attachments
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {PLACEHOLDER_IMAGES.map((id) => (
            <div
              key={id}
              className="flex aspect-video items-center justify-center border-2 border-dashed border-[#666] bg-[#bcbcbc] font-mono text-[10px] uppercase tracking-widest text-[#555]"
            >
              [{id} — image placeholder]
            </div>
          ))}
        </div>
      </section>

      <section className="relative z-10 mb-8">
        <h2 className="font-mono text-xs uppercase tracking-widest text-[#444] mb-3">
          Cipher / notes
        </h2>
        <pre className="whitespace-pre-wrap border border-[#888] bg-[#c8c8c8] p-4 font-mono text-xs text-[#222] leading-relaxed">
          {`[REDACTED HEADER]
Lorem ipsum placeholder. Replace this block with your riddle.

>>> SAMPLE: 01001110 01101111 01110100 01101000 01101001 01101110 01100111

(Replace cipher content later.)`}
        </pre>
      </section>

      <section className="relative z-10 mb-6">
        <h2 className="font-mono text-xs uppercase tracking-widest text-[#444] mb-3">
          Intercept log
        </h2>
        <ConversationLog lines={conversation} />
      </section>

      <footer className="relative z-10 flex flex-wrap gap-3">
        <TerminalLink
          href="/act/1/episode/1/submit"
          className="normal-case tracking-normal"
        >
          Proceed to submission
        </TerminalLink>
        <TerminalLink
          href="/home"
          className="normal-case tracking-normal text-[#aaa] border-[#444]"
        >
          Return to console
        </TerminalLink>
      </footer>
    </article>
  );
}
