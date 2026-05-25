import craftsData from "@/content/crafts.json";
import photographsData from "@/content/photographs.json";

export type CollectionId = "photographs" | "crafts";

export type CollectionItem = {
  id: string;
  title: string;
  src: string;
  alt: string;
  notes?: string;
  width?: number;
  height?: number;
};

export type PhotographGroup = {
  id: string;
  title: string;
  items: CollectionItem[];
};

const photographGroups = photographsData as PhotographGroup[];

const collections: Record<CollectionId, CollectionItem[]> = {
  photographs: photographGroups.flatMap((group) => group.items),
  crafts: craftsData as CollectionItem[],
};

export function getPhotographGroups(): PhotographGroup[] {
  return photographGroups;
}

export function getCollectionItems(collectionId: CollectionId): CollectionItem[] {
  return collections[collectionId];
}
