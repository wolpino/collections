import Link from "next/link";

const collections = [
  { href: "/photographs", title: "Photographs", description: "Stack or grid gallery with lightbox." },
  { href: "/recipes", title: "Recipes", description: "Ingredients, steps, and notes." },
  { href: "/crafts", title: "Crafts", description: "Handmade work in a simple grid." },
] as const;

export default function Home() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight">Collections</h1>
        <p className="mt-2 max-w-xl text-zinc-600 dark:text-zinc-400">
          A small site for photographs, recipes, and crafts — browse each collection below.
        </p>
      </header>
      <ul className="grid gap-4 sm:grid-cols-3" aria-label="Collection links">
        {collections.map((c) => (
          <li key={c.href}>
            <Link
              href={c.href}
              className="block rounded-lg border border-zinc-200 bg-white p-4 shadow-sm transition hover:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-900"
            >
              <h2 className="text-lg font-medium">{c.title}</h2>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{c.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
