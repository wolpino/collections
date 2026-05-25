"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { CollectionItem, PhotographGroup } from "@/lib/collections";
import { readPhotographsView, writePhotographsView, type ViewMode } from "@/lib/photographsView";
import ImageGrid from "./ImageGrid";
import ImageLightbox from "./ImageLightbox";
import PhotoStack from "./PhotoStack";
import ViewToggle from "./ViewToggle";

type PhotographyGalleryProps = {
  groups: PhotographGroup[];
};

export default function PhotographyGallery({ groups }: PhotographyGalleryProps) {
  const [mode, setMode] = useState<ViewMode>("stack");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const flatItems = useMemo(
    () => groups.flatMap((group) => group.items),
    [groups],
  );

  useEffect(() => {
    const stored = readPhotographsView();
    if (stored) setMode(stored);
  }, []);

  const handleMode = useCallback((next: ViewMode) => {
    setMode(next);
    writePhotographsView(next);
  }, []);

  const openAt = useCallback(
    (groupIndex: number, itemIndex: number) => {
      let offset = 0;
      for (let i = 0; i < groupIndex; i++) offset += groups[i].items.length;
      setLightboxIndex(offset + itemIndex);
    },
    [groups],
  );

  const close = useCallback(() => setLightboxIndex(null), []);

  return (
    <section aria-label="Photography gallery" className="space-y-8">
      <ViewToggle mode={mode} onChange={handleMode} />
      {groups.map((group, groupIndex) => (
        <section key={group.id} aria-labelledby={`group-${group.id}`} className="space-y-4">
          <h2 id={`group-${group.id}`} className="text-lg font-medium text-zinc-700 dark:text-zinc-300">
            {group.title}
          </h2>
          {mode === "stack" ? (
            <PhotoStack
              items={group.items}
              onSelect={(itemIndex) => openAt(groupIndex, itemIndex)}
            />
          ) : (
            <ImageGrid
              items={group.items}
              onSelect={(itemIndex) => openAt(groupIndex, itemIndex)}
            />
          )}
        </section>
      ))}
      {lightboxIndex !== null ? (
        <ImageLightbox
          items={flatItems}
          index={lightboxIndex}
          onClose={close}
          onChangeIndex={setLightboxIndex}
        />
      ) : null}
    </section>
  );
}
