export function hashId(id: string): number {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = (hash << 5) - hash + id.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export type StackTransform = {
  rotate: number;
  translateX: number;
  translateY: number;
  zIndex: number;
};

/** Spread-out scatter layout (wide field, light overlap) for album pages. */
export function getSpreadStackTransform(
  id: string,
  index: number,
  total: number,
): StackTransform {
  const seed = hashId(id);
  const cols = Math.max(3, Math.ceil(Math.sqrt(total)));
  const rows = Math.ceil(total / cols);
  const col = index % cols;
  const row = Math.floor(index / cols);

  const cellW = 200;
  const cellH = 160;
  const baseX = (col - (cols - 1) / 2) * cellW;
  const baseY = (row - (rows - 1) / 2) * cellH;
  const jitterX = (seed % 56) - 28;
  const jitterY = ((seed >> 4) % 48) - 24;
  const rotate = ((seed % 11) - 5) * 1.4;

  return {
    translateX: baseX + jitterX,
    translateY: baseY + jitterY,
    rotate,
    zIndex: index + 1,
  };
}

/** @deprecated Use getSpreadStackTransform — kept for tests migrating from tight stack. */
export function getStackTransform(id: string, index: number): StackTransform {
  return getSpreadStackTransform(id, index, 1);
}

export function getSpreadStackMinHeight(total: number): number {
  const cols = Math.max(3, Math.ceil(Math.sqrt(total)));
  const rows = Math.ceil(total / cols);
  return rows * 160 + 280;
}
