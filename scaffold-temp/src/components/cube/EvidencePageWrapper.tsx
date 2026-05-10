"use client";

import { type ReactNode } from "react";
import { FieldNotesDrawer } from "./FieldNotesDrawer";

type Props = {
  username: string;
  actSlug: string;
  episodeSlug: string;
  children: ReactNode;
};

/** Renders dossier + fixed overlay operator notes (no layout reflow). */
export function EvidencePageWrapper({
  username,
  actSlug,
  episodeSlug,
  children,
}: Props) {
  return (
    <div className="mx-auto w-full max-w-6xl">
      {children}
      <FieldNotesDrawer
        username={username}
        actSlug={actSlug}
        episodeSlug={episodeSlug}
      />
    </div>
  );
}
