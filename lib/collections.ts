import craftsData from "@/content/crafts.json";
import photographsData from "@/content/photographs.json";

export type CollectionId = "photographs" | "crafts";

export type CollectionItem = {
  id: string;
  title: string;
  src: string;
  alt: string;
  notes?: string;
};

const collections: Record<CollectionId, CollectionItem[]> = {
  photographs: photographsData as CollectionItem[],
  crafts: craftsData as CollectionItem[],
};

export function getCollectionItems(collectionId: CollectionId): CollectionItem[] {
  return collections[collectionId];
}
