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

	// Using span with block display instead of figure to avoid hydration error
	// when MDX wraps images in <p> tags (figure cannot be descendant of p)
	return (
		<span className="block my-8 not-prose">
			<span
				className={cn(
					"block relative overflow-hidden rounded-none border border-border",
					"transition-all duration-300 hover:shadow-lg",
					className,
				)}
			>
				<Image
					src={src}
					alt={alt}
					width={width}
					height={height}
					className="w-full h-auto object-cover"
					sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 800px"
					loading="lazy"
					placeholder="empty"
				/>
			</span>
			{alt && (
				<span className="block mt-3 text-center text-sm text-muted-foreground italic">
					{alt}
				</span>
			)}
		</span>
	);
}
