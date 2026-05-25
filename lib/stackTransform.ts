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

export function getStackTransform(id: string, index: number): StackTransform {
  const seed = hashId(`${id}:${index}`);
  const rotate = ((seed % 17) - 8) * 1.25;
  const translateX = (seed % 40) - 20;
  const translateY = ((seed >> 3) % 30) - 15;
  return {
    rotate,
    translateX,
    translateY,
    zIndex: index + 1,
  };
}
