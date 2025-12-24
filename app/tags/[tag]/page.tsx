import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostGrid } from "@/components/blog/post-grid";
import { getAllTags, getPostsByTag } from "@/lib/blog";

interface TagPageProps {
	params: Promise<{ tag: string }>;
}

export async function generateStaticParams() {
	const tags = getAllTags();
	return tags.map((tag) => ({ tag: tag.toLowerCase() }));
}

export async function generateMetadata({
	params,
}: TagPageProps): Promise<Metadata> {
	const { tag } = await params;
	const decodedTag = decodeURIComponent(tag);

	return {
		title: `Posts tagged "${decodedTag}"`,
		description: `Browse all blog posts tagged with "${decodedTag}".`,
	};
}

export default async function TagPage({ params }: TagPageProps) {
	const { tag } = await params;
	const decodedTag = decodeURIComponent(tag);
	const posts = getPostsByTag(decodedTag);

	if (posts.length === 0) {
		notFound();
	}

	return (
		<div className="container max-w-screen-xl px-4 md:px-8 py-12 md:py-16">
			{/* Header */}
			<div className="mb-12 space-y-4">
				<h1 className="text-4xl font-extrabold tracking-tight">
					Posts tagged &ldquo;{decodedTag}&rdquo;
				</h1>
				<p className="text-xl text-muted-foreground">
					{posts.length} {posts.length === 1 ? "post" : "posts"} found
				</p>
			</div>

			{/* Posts */}
			<PostGrid posts={posts} />
		</div>
	);
}
