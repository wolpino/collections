"use client";

import Image from "next/image";
import { getStackTransform } from "@/lib/stackTransform";
import type { CollectionItem } from "@/lib/collections";

type PhotoStackProps = {
  items: CollectionItem[];
  onSelect: (index: number) => void;
};

export default function PhotoStack({ items, onSelect }: PhotoStackProps) {
  return (
    <div aria-label="Photo stack" className="relative mx-auto h-[420px] w-full max-w-lg">
      {items.map((item, index) => {
        const t = getStackTransform(item.id, index);
        return (
          <button
            key={item.id}
            type="button"
            aria-label={`Open ${item.title} from stack`}
            className="absolute left-1/2 top-1/2 w-[70%] max-w-sm -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-lg border border-zinc-300 bg-white shadow-lg transition hover:z-50 dark:border-zinc-600 dark:bg-zinc-900"
            style={{
              transform: `translate(calc(-50% + ${t.translateX}px), calc(-50% + ${t.translateY}px)) rotate(${t.rotate}deg)`,
              zIndex: t.zIndex,
            }}
            onClick={() => onSelect(index)}
          >
            <Image src={item.src} alt={item.alt} width={400} height={300} className="h-auto w-full" />
          </button>
        );
      })}
    </div>
  );
}
