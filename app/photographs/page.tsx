import PhotographyGallery from "@/components/PhotographyGallery";
import { getCollectionItems } from "@/lib/collections";

export default function PhotographsPage() {
  const items = getCollectionItems("photographs");
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Photographs</h1>
      <PhotographyGallery items={items} />
    </div>
  );
}
