import Image from "next/image";
import Link from "next/link";
import type { PhotographGroup } from "@/lib/collections";

type PhotographAlbumGridProps = {
  groups: PhotographGroup[];
};

export default function PhotographAlbumGrid({ groups }: PhotographAlbumGridProps) {
  return (
    <ul
      aria-label="Photograph albums"
      className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
    >
      {groups.map((group) => {
        const cover = group.items[0];
        if (!cover) return null;

        return (
          <li key={group.id}>
            <Link
              href={`/photographs/${group.id}`}
              aria-label={group.title}
              className="group block overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm transition hover:border-zinc-400 hover:shadow-md dark:border-zinc-700 dark:bg-zinc-900"
            >
              <Image
                src={cover.src}
                alt=""
                width={cover.width ?? 400}
                height={cover.height ?? 300}
                className="aspect-[4/3] w-full object-cover transition group-hover:opacity-90"
              />
              <span className="block px-3 py-2 text-center text-sm font-medium">
                {group.title}
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
