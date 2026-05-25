import type { Recipe } from "@/lib/recipes";

export const mockRecipes: Recipe[] = [
  {
    id: "sourdough",
    title: "Sourdough Loaf",
    ingredients: ["500g flour", "350g water", "10g salt"],
    steps: ["Mix", "Fold", "Bake"],
    image: "/recipes/sourdough.svg",
    notes: "Use active starter",
  },
  {
    id: "salad",
    title: "Green Salad",
    ingredients: ["Lettuce", "Olive oil"],
    steps: ["Wash greens", "Toss"],
  },
];
