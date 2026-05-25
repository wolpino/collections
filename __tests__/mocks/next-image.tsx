import type { ImageProps } from "next/image";

export default function MockImage({ src, alt, className, width, height }: ImageProps) {
  const resolved = typeof src === "string" ? src : "";
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={resolved} alt={alt ?? ""} className={className} width={width} height={height} />
  );
}
