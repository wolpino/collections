"use client";

import { useCallback, useState } from "react";
import type { Recipe } from "@/lib/recipes";
import RecipeCard from "./RecipeCard";
import RecipeLightbox from "./RecipeLightbox";

type RecipesGridProps = {
  recipes: Recipe[];
};

export default function RecipesGrid({ recipes }: RecipesGridProps) {
  const [index, setIndex] = useState<number | null>(null);
  const close = useCallback(() => setIndex(null), []);

  return (
    <section aria-label="Recipes grid" className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        {recipes.map((recipe, i) => (
          <RecipeCard key={recipe.id} recipe={recipe} onSelect={() => setIndex(i)} />
        ))}
      </div>
      {index !== null ? (
        <RecipeLightbox recipes={recipes} index={index} onClose={close} onChangeIndex={setIndex} />
      ) : null}
    </section>
  );
}
