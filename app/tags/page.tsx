import { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { getAllTags, getPostsByTag } from "@/lib/blog";
import { Tag } from "lucide-react";

export const metadata: Metadata = {
	title: "Tags",
	description: "Browse all blog post tags and topics.",
};

export default function TagsPage() {
	const tags = getAllTags();

	return (
		<div className="container max-w-screen-xl px-4 md:px-8 py-12 md:py-16">
			{/* Header */}
			<div className="mb-12 space-y-4">
				<h1 className="text-4xl font-extrabold tracking-tight">Tags</h1>
				<p className="text-xl text-muted-foreground max-w-2xl">
					Browse posts by topic. Click on any tag to see related articles.
				</p>
			</div>

			{/* Tags grid */}
			{tags.length > 0 ? (
				<div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
					{tags.map((tag) => {
						const postCount = getPostsByTag(tag).length;
						return (
							<Link
								key={tag}
								href={`/tags/${tag.toLowerCase()}`}
								className="group block"
							>
								<div className="flex items-center justify-between p-4 rounded-lg border border-border bg-card hover:border-primary/50 hover:bg-accent/50 transition-all duration-200">
									<div className="flex items-center gap-3">
										<Tag className="h-4 w-4 text-primary" />
										<span className="font-medium group-hover:text-primary transition-colors">
											{tag}
										</span>
									</div>
									<Badge variant="secondary" className="text-xs">
										{postCount} {postCount === 1 ? "post" : "posts"}
									</Badge>
								</div>
							</Link>
						);
					})}
				</div>
			) : (
				<div className="text-center py-16 border border-dashed border-border rounded-lg">
					<p className="text-muted-foreground">No tags found.</p>
				</div>
			)}
		</div>
	);
}
