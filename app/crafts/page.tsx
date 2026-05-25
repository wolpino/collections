import CollectionGridPage from "@/components/CollectionGridPage";
import { getCollectionItems } from "@/lib/collections";

export default function CraftsPage() {
  const items = getCollectionItems("crafts");
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Crafts</h1>
      <CollectionGridPage items={items} title="Crafts" />
    </div>
  );
}
