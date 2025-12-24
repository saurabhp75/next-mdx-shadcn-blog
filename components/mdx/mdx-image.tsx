import Image from "next/image";
import { cn } from "@/lib/utils";

interface MDXImageProps {
  src?: string;
  alt?: string;
  className?: string;
  width?: number;
  height?: number;
}

export function MDXImage({
  src,
  alt = "",
  className,
  width = 800,
  height = 400,
}: MDXImageProps) {
  if (!src) return null;

  const isExternal = src.startsWith("http");

  return (
    <figure className="my-8">
      <div
        className={cn(
          "relative overflow-hidden rounded-lg border border-border",
          "transition-all duration-300 hover:shadow-lg",
          className
        )}
      >
        {isExternal ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={alt}
            className="w-full h-auto object-cover"
            loading="lazy"
          />
        ) : (
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className="w-full h-auto object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 800px"
          />
        )}
      </div>
      {alt && (
        <figcaption className="mt-3 text-center text-sm text-muted-foreground italic">
          {alt}
        </figcaption>
      )}
    </figure>
  );
}
