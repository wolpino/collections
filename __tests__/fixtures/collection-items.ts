import type { CollectionItem } from "@/lib/collections";

export const mockPhotographs: CollectionItem[] = [
  {
    id: "photo-a",
    src: "/photographs/sunset.svg",
    alt: "Photo A",
    title: "Sunset",
    notes: "Beach at dusk",
  },
  {
    id: "photo-b",
    src: "/photographs/harbor.svg",
    alt: "Photo B",
    title: "Harbor",
  },
];

export const mockCrafts: CollectionItem[] = [
  {
    id: "craft-a",
    src: "/crafts/bowl.svg",
    alt: "Craft A",
    title: "Pottery bowl",
    notes: "Wheel-thrown stoneware",
  },
];
