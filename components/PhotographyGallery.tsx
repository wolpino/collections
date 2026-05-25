"use client";

import { useCallback, useEffect, useState } from "react";
import type { CollectionItem } from "@/lib/collections";
import { readPhotographsView, writePhotographsView, type ViewMode } from "@/lib/photographsView";
import ImageGrid from "./ImageGrid";
import ImageLightbox from "./ImageLightbox";
import PhotoStack from "./PhotoStack";
import ViewToggle from "./ViewToggle";

type PhotographyGalleryProps = {
  items: CollectionItem[];
};

export default function PhotographyGallery({ items }: PhotographyGalleryProps) {
  const [mode, setMode] = useState<ViewMode>("stack");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    const stored = readPhotographsView();
    if (stored) setMode(stored);
  }, []);

  const handleMode = useCallback((next: ViewMode) => {
    setMode(next);
    writePhotographsView(next);
  }, []);

  const open = useCallback((index: number) => setLightboxIndex(index), []);
  const close = useCallback(() => setLightboxIndex(null), []);

  return (
    <section aria-label="Photography gallery" className="space-y-6">
      <ViewToggle mode={mode} onChange={handleMode} />
      {mode === "stack" ? (
        <PhotoStack items={items} onSelect={open} />
      ) : (
        <ImageGrid items={items} onSelect={open} />
      )}
      {lightboxIndex !== null ? (
        <ImageLightbox
          items={items}
          index={lightboxIndex}
          onClose={close}
          onChangeIndex={setLightboxIndex}
        />
      ) : null}
    </section>
  );
}
