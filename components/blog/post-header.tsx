import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tag } from "lucide-react";
import { siteConfig } from "@/lib/config";
import type { PostMeta } from "@/lib/blog";
import Link from "next/link";

interface PostHeaderProps {
	post: PostMeta;
}

export function PostHeader({ post }: PostHeaderProps) {
	const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
		year: "numeric",
		month: "short",
		day: "numeric",
	});

	const formattedUpdatedDate = post.updated
		? new Date(post.updated).toLocaleDateString("en-US", {
				year: "numeric",
				month: "short",
				day: "numeric",
			})
		: null;

	return (
		<header className="mb-10 space-y-6">
			{/* Category and tags */}
			<div className="flex flex-wrap items-center gap-2">
				<Badge className="bg-primary/10 text-primary hover:bg-primary/20">
					{post.category}
				</Badge>
				{post.tags.map((tag) => (
					<Link key={tag} href={`/tags/${tag.toLowerCase()}`}>
						<Badge
							variant="outline"
							className="cursor-pointer hover:bg-accent transition-colors"
						>
							<Tag className="h-3 w-3 mr-1" />
							{tag}
						</Badge>
					</Link>
				))}
			</div>

			{/* Title */}
			<h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
				{post.title}
			</h1>

			{/* Description */}
			<p className="text-xl text-muted-foreground leading-relaxed">
				{post.description}
			</p>

			{/* Author and meta info */}
			<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 pt-4 border-t border-border">
				<div className="flex items-center gap-3">
					<Avatar className="h-10 w-10 ring-2 ring-primary/20">
						<AvatarImage src={siteConfig.author.avatar} alt={post.author} />
						<AvatarFallback>
							{post.author
								.split(" ")
								.map((n) => n[0])
								.join("")}
						</AvatarFallback>
					</Avatar>
					<div>
						<p className="font-medium text-sm">{post.author}</p>
						<p className="text-xs text-muted-foreground">Author</p>
					</div>
				</div>

				<div className="flex flex-wrap sm:flex-nowrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground sm:justify-end">
					<span className="flex items-center gap-1.5">
						{/* <Calendar className="h-4 w-4" /> */}
						{formattedDate}
					</span>
					{formattedUpdatedDate && (
						<span className="flex items-center gap-1.5">
							(Updated: {formattedUpdatedDate})
						</span>
					)}
					<span className="flex items-center gap-1.5">
						{/* <Clock className="h-4 w-4" /> */}
						{post.readingTime}
					</span>
				</div>
			</div>

			{/* Featured image */}
			{post.image && (
				<div className="relative aspect-video overflow-hidden rounded-lg border border-border mt-8">
					<Image
						src={post.image}
						alt={post.title}
						fill
						className="object-cover"
						priority
						sizes="(max-width: 768px) 100vw, 800px"
					/>
				</div>
			)}
		</header>
	);
}
