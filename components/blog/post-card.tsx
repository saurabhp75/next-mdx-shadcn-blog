import Link from "next/link";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardFooter,
	CardHeader,
} from "@/components/ui/card";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import type { PostMeta } from "@/lib/blog";

interface PostCardProps {
	post: PostMeta;
	featured?: boolean;
}

export function PostCard({ post, featured = false }: PostCardProps) {
	const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
		year: "numeric",
		month: "short",
		day: "numeric",
	});

	return (
		<Link href={`/blog/${post.slug}`} className="group block">
			<Card
				className={cn(
					"h-full overflow-hidden transition-all duration-300",
					"hover:shadow-lg hover:border-primary/50",
					"group-focus-visible:ring-2 group-focus-visible:ring-primary",
					featured && "md:flex md:flex-row",
				)}
			>
				{/* {post.image && (
					<div
						className={cn(
							"relative overflow-hidden",
							featured
								? "md:w-1/2 aspect-video md:aspect-auto"
								: "aspect-video",
						)}
					>
						<Image
							src={post.image}
							alt={post.title}
							fill
							priority={featured}
							className="object-cover transition-transform duration-500 group-hover:scale-105"
							sizes={cardImageSizes}
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
					</div>
				)} */}
				<div className={cn("flex flex-col", featured && "md:w-1/2")}>
					<CardHeader className="space-y-3">
						<div className="flex flex-wrap items-center gap-2">
							<Badge variant="secondary" className="text-xs">
								{post.category}
							</Badge>
							{post.tags.slice(0, 2).map((tag) => (
								<Badge key={tag} variant="outline" className="text-xs">
									{tag}
								</Badge>
							))}
						</div>
						<h3
							className={cn(
								"font-bold leading-tight tracking-tight",
								"transition-colors duration-200 group-hover:text-primary",
								featured ? "text-2xl md:text-3xl" : "text-xl",
							)}
						>
							{post.title}
						</h3>
					</CardHeader>
					{/* <CardContent className="flex-1">
						<p className="text-muted-foreground line-clamp-3 leading-relaxed">
							{post.description}
						</p>
					</CardContent> */}
					<CardFooter className="flex items-center justify-between pt-4 border-t border-border/50">
						<div className="flex items-center gap-4 text-sm text-muted-foreground">
							<span className="flex items-center gap-1.5">
								<Calendar className="h-3.5 w-3.5" />
								{formattedDate}
							</span>
							<span className="flex items-center gap-1.5">
								<Clock className="h-3.5 w-3.5" />
								{post.readingTime}
							</span>
						</div>
						<span className="flex items-center gap-1 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200">
							Read more
							<ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
						</span>
					</CardFooter>
				</div>
			</Card>
		</Link>
	);
}
