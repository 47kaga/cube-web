import { ConfidentialStamp } from "./ConfidentialStamp";
import { ConversationLog, type ConversationLine } from "./ConversationLog";
import { TerminalLink } from "./TerminalButton";
import { EvidenceAttachments } from "./EvidenceAttachments";
import type { EvidenceImage } from "@/content/episode1-placeholder";

type Props = {
  episodeTitle: string;
  conversation: ConversationLine[];
  evidenceImages: EvidenceImage[];
};

export function EvidenceDossier({
  episodeTitle,
  conversation,
  evidenceImages,
}: Props) {
  return (
    <article className="relative mx-auto max-w-3xl border border-[#444] bg-[#d4d4d4] text-[#1a1a1a] p-6 pb-8 shadow-[8px_8px_0_#000] md:p-10 md:pb-12">
      <ConfidentialStamp />
      <header className="relative z-10 mb-10 border-b-2 border-[#222] pb-5">
        <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#555] mb-2">
          Act I — Episode I
        </p>
        <h1 className="font-mono text-lg md:text-xl tracking-tight text-[#111]">
          {episodeTitle}
        </h1>
      </header>

      <section className="relative z-10 mb-12">
        <h2 className="font-mono text-xs uppercase tracking-widest text-[#444] mb-5">
          Evidence attachments
        </h2>
        <EvidenceAttachments images={evidenceImages} />
      </section>

      <section className="relative z-10 mb-12">
        <h2 className="font-mono text-xs uppercase tracking-widest text-[#444] mb-4">
          Cipher / notes
        </h2>
        <pre className="whitespace-pre-wrap border border-[#888] bg-[#c8c8c8] p-5 font-mono text-xs text-[#222] leading-relaxed">
          {`[REDACTED HEADER]
Lorem ipsum placeholder. Replace this block with your riddle.

>>> SAMPLE: 01001110 01101111 01110100 01101000 01101001 01101110 01100111

(Replace cipher content later.)`}
        </pre>
      </section>

      <section className="relative z-10 mb-12">
        <h2 className="font-mono text-xs uppercase tracking-widest text-[#444] mb-4">
          Intercept log
        </h2>
        <ConversationLog lines={conversation} />
      </section>

      <footer className="relative z-10 mt-4 flex flex-wrap gap-4 border-t border-[#aaa] pt-8">
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
