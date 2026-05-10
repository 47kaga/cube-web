import type { ConversationLine } from "@/components/cube/ConversationLog";

export type EvidenceImage = {
  id: string;
  src: string;
  label: string;
  caption: string;
};

/** Add/remove slots here; place files under `public/evidence/act-1/episode-1/`. */
export const EPISODE_1_EVIDENCE_IMAGES: EvidenceImage[] = [
  {
    id: "slot-a",
    src: "/evidence/act-1/episode-1/slot-a.png",
    label: "SLOT_A",
    caption: "Image evidence placeholder. Replace later.",
  },
  {
    id: "slot-b",
    src: "/evidence/act-1/episode-1/slot-b.png",
    label: "SLOT_B",
    caption: "Image evidence placeholder. Replace later.",
  },
];

export const EPISODE_1_TITLE =
  "PLACEHOLDER: Cold-frequency cache (replace later)";

export const EPISODE_1_CONVERSATION: ConversationLine[] = [
  {
    speaker: "m",
    text: "> link unstable. you still there?",
  },
  {
    speaker: "ouv",
    text: "Quiet. Read the margins. The CUBE does not forgive haste.",
  },
  {
    speaker: "m",
    text: "> copy. watching noise floor.",
  },
  {
    speaker: "ouv",
    text: "Good. When you understand the first breath, you may speak it.",
  },
];

export const VICTORY_OUV_TEXT =
  "You listened. That is rarer than you think.\n\nThe first threshold is behind you now.\n\nGo. The system will remember this.";
