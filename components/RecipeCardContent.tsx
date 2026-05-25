import Image from "next/image";
import type { Recipe } from "@/lib/recipes";

type RecipeCardContentProps = {
  recipe: Recipe;
  preview?: boolean;
};

export default function RecipeCardContent({ recipe, preview = false }: RecipeCardContentProps) {
  return (
    <article aria-label={`Recipe: ${recipe.title}`} className="space-y-3">
      <h2 className="text-xl font-semibold">{recipe.title}</h2>
      {recipe.image ? (
        <Image
          src={recipe.image}
          alt=""
          width={400}
          height={300}
          className="h-auto w-full rounded-md object-cover"
        />
      ) : null}
      <div>
        <h3 className="text-sm font-medium uppercase tracking-wide text-zinc-500">Ingredients</h3>
        <ul className="mt-1 list-disc space-y-1 pl-5 text-sm">
          {recipe.ingredients.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="text-sm font-medium uppercase tracking-wide text-zinc-500">Steps</h3>
        <ol className={`mt-1 list-decimal space-y-1 pl-5 text-sm ${preview ? "line-clamp-3" : ""}`}>
          {recipe.steps.map((step, i) => (
            <li key={`${recipe.id}-step-${i}`}>{step}</li>
          ))}
        </ol>
      </div>
      {recipe.notes ? <p className="text-sm text-zinc-600 dark:text-zinc-400">{recipe.notes}</p> : null}
    </article>
  );
}
