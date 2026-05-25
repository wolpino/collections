import recipesData from "@/content/recipes.json";

export type Recipe = {
  id: string;
  title: string;
  ingredients: string[];
  steps: string[];
  image?: string;
  notes?: string;
};

export function getRecipes(): Recipe[] {
  return recipesData as Recipe[];
}
