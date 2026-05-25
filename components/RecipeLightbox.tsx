"use client";

import { useCallback, useEffect } from "react";
import type { Recipe } from "@/lib/recipes";
import RecipeCardContent from "./RecipeCardContent";

type RecipeLightboxProps = {
  recipes: Recipe[];
  index: number;
  onClose: () => void;
  onChangeIndex: (index: number) => void;
};

export default function RecipeLightbox({
  recipes,
  index,
  onClose,
  onChangeIndex,
}: RecipeLightboxProps) {
  const recipe = recipes[index];
  const hasPrev = index > 0;
  const hasNext = index < recipes.length - 1;

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

  if (!recipe) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Recipe lightbox: ${recipe.title}`}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white p-6 dark:bg-zinc-950"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          aria-label="Close recipe"
          className="absolute right-3 top-3 rounded px-2 py-1 text-xl hover:bg-zinc-100 dark:hover:bg-zinc-800"
          onClick={onClose}
        >
          ×
        </button>
        <RecipeCardContent recipe={recipe} />
        <div className="mt-4 flex justify-between">
          <button
            type="button"
            aria-label="Previous recipe"
            disabled={!hasPrev}
            className="rounded border px-3 py-1 disabled:opacity-40"
            onClick={goPrev}
          >
            Previous
          </button>
          <button
            type="button"
            aria-label="Next recipe"
            disabled={!hasNext}
            className="rounded border px-3 py-1 disabled:opacity-40"
            onClick={goNext}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
