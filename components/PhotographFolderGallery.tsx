"use client";

import { useCallback, useState } from "react";
import type { CollectionItem } from "@/lib/collections";
import ImageLightbox from "./ImageLightbox";
import PhotoStack from "./PhotoStack";

type PhotographFolderGalleryProps = {
  items: CollectionItem[];
};

export default function PhotographFolderGallery({ items }: PhotographFolderGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const open = useCallback((index: number) => setLightboxIndex(index), []);
  const close = useCallback(() => setLightboxIndex(null), []);

  return (
    <section aria-label="Album gallery" className="space-y-6">
      <PhotoStack items={items} onSelect={open} />
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
