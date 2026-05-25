"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/photographs", label: "Photographs" },
  { href: "/recipes", label: "Recipes" },
  { href: "/crafts", label: "Crafts" },
] as const;

function linkClass(active: boolean): string {
  return active
    ? "font-semibold text-foreground underline underline-offset-4"
    : "text-zinc-600 hover:text-foreground dark:text-zinc-400";
}

export default function SiteNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Site navigation" className="border-b border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-6 px-4 py-4">
        <Link href="/" className="text-lg font-semibold tracking-tight" aria-label="Collections home">
          Collections
        </Link>
        <ul className="flex flex-wrap gap-4 text-sm">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={linkClass(active)}
                  aria-current={active ? "page" : undefined}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
