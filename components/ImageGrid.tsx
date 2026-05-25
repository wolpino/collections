"use client";

import Image from "next/image";
import type { CollectionItem } from "@/lib/collections";

type ImageGridProps = {
  items: CollectionItem[];
  onSelect: (index: number) => void;
};

export default function ImageGrid({ items, onSelect }: ImageGridProps) {
  return (
    <div
      
      aria-label="Image grid"
      className="grid grid-cols-2 gap-4 sm:grid-cols-3"
    >
      {items.map((item, index) => (
        <button
          key={item.id}
          type="button"
          
          aria-label={`Open ${item.title}`}
          className="group overflow-hidden rounded-lg border border-zinc-200 bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900"
          onClick={() => onSelect(index)}
        >
          <Image
            src={item.src}
            alt={item.alt}
            width={item.width ?? 400}
            height={item.height ?? 300}
            className="h-auto w-full object-cover transition group-hover:opacity-90"
          />
          <span className="block px-2 py-1 text-left text-sm font-medium">{item.title}</span>
        </button>
      ))}
    </div>
  );
}
