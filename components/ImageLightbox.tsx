"use client";

import Image from "next/image";
import { useCallback, useEffect } from "react";
import type { CollectionItem } from "@/lib/collections";

type ImageLightboxProps = {
  items: CollectionItem[];
  index: number;
  onClose: () => void;
  onChangeIndex: (index: number) => void;
};

export default function ImageLightbox({
  items,
  index,
  onClose,
  onChangeIndex,
}: ImageLightboxProps) {
  const item = items[index];
  const hasPrev = index > 0;
  const hasNext = index < items.length - 1;

  const goPrev = useCallback(() => {
    if (hasPrev) onChangeIndex(index - 1);
  }, [hasPrev, index, onChangeIndex]);

  const goNext = useCallback(() => {
    if (hasNext) onChangeIndex(index + 1);
  }, [hasNext, index, onChangeIndex]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, goPrev, goNext]);

  if (!item) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Image lightbox: ${item.title}`}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-3xl overflow-auto rounded-lg bg-zinc-950 p-4 text-zinc-50 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          aria-label="Close lightbox"
          className="absolute right-3 top-3 rounded px-2 py-1 text-xl leading-none hover:bg-zinc-800"
          onClick={onClose}
        >
          ×
        </button>
        <Image
          src={item.src}
          alt={item.alt}
          width={item.width ?? 800}
          height={item.height ?? 600}
          className="mx-auto h-auto max-h-[60vh] w-full object-contain"
        />
        <h2 className="mt-3 text-xl font-semibold">{item.title}</h2>
        {item.notes ? <p className="mt-2 text-sm text-zinc-300">{item.notes}</p> : null}
        <div className="mt-4 flex justify-between gap-2">
          <button
            type="button"
            aria-label="Previous image"
            disabled={!hasPrev}
            className="rounded border border-zinc-600 px-3 py-1 disabled:opacity-40"
            onClick={goPrev}
          >
            Previous
          </button>
          <button
            type="button"
            aria-label="Next image"
            disabled={!hasNext}
            className="rounded border border-zinc-600 px-3 py-1 disabled:opacity-40"
            onClick={goNext}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
