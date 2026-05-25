"use client";

import { useCallback, useState } from "react";
import type { CollectionItem } from "@/lib/collections";
import ImageGrid from "./ImageGrid";
import ImageLightbox from "./ImageLightbox";

type CollectionGridPageProps = {
  items: CollectionItem[];
  title: string;
};

export default function CollectionGridPage({ items, title }: CollectionGridPageProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const close = useCallback(() => setLightboxIndex(null), []);

  return (
    <section aria-label={`${title} gallery`} className="space-y-6">
      <ImageGrid items={items} onSelect={setLightboxIndex} />
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
