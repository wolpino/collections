import PhotographyGallery from "@/components/PhotographyGallery";
import { getPhotographGroups } from "@/lib/collections";

export default function PhotographsPage() {
  const groups = getPhotographGroups();
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Photographs</h1>
      <PhotographyGallery groups={groups} />
    </div>
  );
}
