"use client";

import type { Recipe } from "@/lib/recipes";
import RecipeCardContent from "./RecipeCardContent";

type RecipeCardProps = {
  recipe: Recipe;
  onSelect: () => void;
};

export default function RecipeCard({ recipe, onSelect }: RecipeCardProps) {
  return (
    <button
      type="button"
      aria-label={`Open recipe ${recipe.title}`}
      className="h-full w-full rounded-lg border border-zinc-200 bg-white p-4 text-left shadow-sm transition hover:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-900"
      onClick={onSelect}
    >
      <RecipeCardContent recipe={recipe} preview />
    </button>
  );
}
