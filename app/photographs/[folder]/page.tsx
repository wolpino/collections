import Link from "next/link";
import { notFound } from "next/navigation";
import PhotographFolderGallery from "@/components/PhotographFolderGallery";
import {
  getPhotographFolderIds,
  getPhotographGroup,
} from "@/lib/collections";

type PageProps = {
  params: Promise<{ folder: string }>;
};

export function generateStaticParams() {
  return getPhotographFolderIds().map((folder) => ({ folder }));
}

export default async function PhotographFolderPage({ params }: PageProps) {
  const { folder } = await params;
  const group = getPhotographGroup(folder);

  if (!group || group.items.length === 0) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <Link
          href="/photographs"
          className="text-sm text-zinc-600 underline-offset-2 hover:underline dark:text-zinc-400"
        >
          ← All photographs
        </Link>
        <h1 className="text-2xl font-semibold">{group.title}</h1>
      </header>
      <PhotographFolderGallery items={group.items} />
    </div>
  );
}
