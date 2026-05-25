"use client";

export type ViewMode = "stack" | "grid";

type ViewToggleProps = {
  mode: ViewMode;
  onChange: (mode: ViewMode) => void;
};

export default function ViewToggle({ mode, onChange }: ViewToggleProps) {
  return (
    <div role="group" aria-label="View mode" className="inline-flex rounded-lg border border-zinc-300 dark:border-zinc-600">
      <button
        type="button"
        aria-label="Stack view"
        aria-pressed={mode === "stack"}
        className={`px-3 py-1 text-sm ${mode === "stack" ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900" : ""}`}
        onClick={() => onChange("stack")}
      >
        Stack
      </button>
      <button
        type="button"
        aria-label="Grid view"
        aria-pressed={mode === "grid"}
        className={`px-3 py-1 text-sm ${mode === "grid" ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900" : ""}`}
        onClick={() => onChange("grid")}
      >
        Grid
      </button>
    </div>
  );
}
