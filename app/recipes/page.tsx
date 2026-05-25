import RecipesGrid from "@/components/RecipesGrid";
import { getRecipes } from "@/lib/recipes";

export default function RecipesPage() {
  const recipes = getRecipes();
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Recipes</h1>
      <RecipesGrid recipes={recipes} />
    </div>
  );
}
