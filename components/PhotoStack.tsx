"use client";

import Image from "next/image";
import { getSpreadStackMinHeight, getSpreadStackTransform } from "@/lib/stackTransform";
import type { CollectionItem } from "@/lib/collections";

type PhotoStackProps = {
  items: CollectionItem[];
  onSelect: (index: number) => void;
};

export default function PhotoStack({ items, onSelect }: PhotoStackProps) {
  const minHeight = getSpreadStackMinHeight(items.length);

  return (
    <div
      aria-label="Photo stack"
      className="relative mx-auto w-full max-w-6xl px-4"
      style={{ minHeight }}
    >
      <div className="absolute left-1/2 top-1/2 w-0">
        {items.map((item, index) => {
          const t = getSpreadStackTransform(item.id, index, items.length);
          return (
            <button
              key={item.id}
              type="button"
              aria-label={`Open ${item.title} from stack`}
              className="absolute w-44 max-w-[11rem] origin-center overflow-hidden rounded-sm border border-zinc-200/90 bg-white shadow-md transition duration-200 hover:z-[100] hover:scale-[1.03] hover:shadow-xl sm:w-52 sm:max-w-[13rem] dark:border-zinc-600 dark:bg-zinc-900"
              style={{
                left: 0,
                top: 0,
                transform: `translate(calc(-50% + ${t.translateX}px), calc(-50% + ${t.translateY}px)) rotate(${t.rotate}deg)`,
                zIndex: t.zIndex,
              }}
              onClick={() => onSelect(index)}
            >
              <Image
                src={item.src}
                alt={item.alt}
                width={item.width ?? 400}
                height={item.height ?? 300}
                className="h-auto w-full"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
