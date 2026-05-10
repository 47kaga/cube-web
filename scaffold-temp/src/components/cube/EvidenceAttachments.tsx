"use client";

import { useCallback, useEffect, useState } from "react";
import type { EvidenceImage } from "@/content/episode1-placeholder";

type Props = {
  images: EvidenceImage[];
};

export function EvidenceAttachments({ images }: Props) {
  const [lightbox, setLightbox] = useState<EvidenceImage | null>(null);
  const [broken, setBroken] = useState<Record<string, true>>({});

  const close = useCallback(() => setLightbox(null), []);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, close]);

  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
        {images.map((entry) => (
          <EvidenceCard
            key={entry.id}
            entry={entry}
            failed={Boolean(broken[entry.id])}
            onImgError={() =>
              setBroken((b) => ({ ...b, [entry.id]: true }))
            }
            onOpen={() => {
              const ok = entry.src && !broken[entry.id];
              if (ok) setLightbox(entry);
            }}
          />
        ))}
      </div>

      {lightbox ? (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-labelledby="evidence-lightbox-label"
        >
          <button
            type="button"
            className="absolute inset-0 cursor-default bg-[#0a0a0a]/88 backdrop-blur-[1px]"
            aria-label="Close lightbox"
            onClick={close}
          />
          <div className="relative z-10 max-h-[92vh] w-full max-w-4xl overflow-hidden border-2 border-[#3a3a3a] bg-[#c8c8c8] shadow-[0_0_0_1px_rgba(0,0,0,0.4),12px_12px_0_#000]">
            <div className="pointer-events-none absolute inset-0 z-20 opacity-[0.12] mix-blend-multiply crt-scanlines" />
            <div className="pointer-events-none absolute inset-0 z-20 opacity-[0.06] crt-noise" />
            <div className="relative z-30 flex items-center justify-between border-b-2 border-[#2a2a2a] bg-[#b8b8b8] px-3 py-2 font-mono text-[10px] uppercase tracking-widest text-[#333]">
              <span id="evidence-lightbox-label">{lightbox.label}</span>
              <button
                type="button"
                onClick={close}
                className="border border-[#444] bg-[#a8a8a8] px-2 py-1 text-[11px] normal-case tracking-normal text-[#111] hover:bg-[#989898] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#5a2d72]"
              >
                Close
              </button>
            </div>
            <div className="relative z-10 max-h-[calc(92vh-7rem)] overflow-auto bg-[#bfbfbf] p-4 sm:p-6">
              <div className="flex min-h-[200px] max-h-[70vh] items-center justify-center border border-[#666] bg-[#b0b0b0] p-2 sm:p-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={lightbox.src}
                  alt={lightbox.label}
                  className="max-h-[65vh] w-full object-contain"
                />
              </div>
              <p className="mt-4 font-mono text-xs leading-relaxed text-[#2a2a2a]">
                {lightbox.caption}
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

function EvidenceCard({
  entry,
  failed,
  onImgError,
  onOpen,
}: {
  entry: EvidenceImage;
  failed: boolean;
  onImgError: () => void;
  onOpen: () => void;
}) {
  const hasSrc = Boolean(entry.src?.trim());
  const showImage = hasSrc && !failed;

  return (
    <figure className="relative flex flex-col border-2 border-[#5a5a5a] bg-[#b8b8b8] p-3 shadow-[3px_3px_0_#1a1a1a]">
      <div className="relative overflow-hidden border border-[#4a4a4a] bg-[#a8a8a8]">
        <div className="pointer-events-none absolute inset-0 z-10 opacity-[0.14] mix-blend-multiply crt-scanlines" />
        <div className="pointer-events-none absolute inset-0 z-10 opacity-[0.07] crt-noise" />
        {showImage ? (
          <button
            type="button"
            onClick={onOpen}
            className="relative z-20 flex h-52 w-full cursor-zoom-in items-center justify-center bg-[#9a9a9a] p-2 outline-none transition-colors hover:bg-[#949494] focus-visible:ring-2 focus-visible:ring-[#5a2d72] focus-visible:ring-offset-2 focus-visible:ring-offset-[#a8a8a8]"
            aria-label={`Enlarge ${entry.label}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={entry.src}
              alt={entry.label}
              onError={onImgError}
              className="max-h-full w-full object-contain"
            />
          </button>
        ) : (
          <div className="relative z-20 flex h-52 w-full flex-col items-center justify-center gap-2 border-2 border-dashed border-[#666] bg-[#bcbcbc] px-3 text-center font-mono text-[10px] uppercase tracking-widest text-[#555]">
            <span>[{entry.label}]</span>
            <span className="max-w-[14rem] normal-case tracking-normal text-[#666]">
              {hasSrc
                ? "Attachment missing or failed to load."
                : "No image path configured."}
            </span>
          </div>
        )}
      </div>
      <figcaption className="mt-3 space-y-1 font-mono text-[10px] uppercase tracking-wider text-[#3a3a3a]">
        <div className="flex items-baseline justify-between gap-2 border-b border-[#888] pb-1">
          <span>{entry.label}</span>
          {showImage ? (
            <span className="text-[9px] normal-case tracking-normal text-[#666]">
              click to enlarge
            </span>
          ) : null}
        </div>
        <p className="text-[11px] normal-case leading-snug tracking-normal text-[#333]">
          {entry.caption}
        </p>
      </figcaption>
    </figure>
  );
}
