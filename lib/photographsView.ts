export type ViewMode = "stack" | "grid";

const VIEW_KEY = "photographs-view";

export function readPhotographsView(): ViewMode | null {
  if (typeof window === "undefined") return null;
  const v = window.localStorage.getItem(VIEW_KEY);
  return v === "grid" || v === "stack" ? v : null;
}

export function writePhotographsView(mode: ViewMode): void {
  window.localStorage.setItem(VIEW_KEY, mode);
}
