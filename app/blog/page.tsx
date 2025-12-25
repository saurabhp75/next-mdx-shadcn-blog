import { PostGrid } from "@/components/blog/post-grid";
import { getAllPosts } from "@/lib/blog";
import { siteConfig } from "@/lib/config";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata(
	"Blog",
	`Technical articles and personal reflections about web development, AI, and life from ${siteConfig.author.name}.`,
	"/blog",
);

export default function BlogPage() {
	const posts = getAllPosts();

	return (
		<div className="container max-w-screen-xl px-4 md:px-8 py-12 md:py-16">
			{/* Header */}
			<div className="mb-12 space-y-4">
				<h1 className="text-4xl font-extrabold tracking-tight">Blog</h1>
				<p className="text-xl text-muted-foreground max-w-2xl">
					Thoughts, tutorials, and explorations in web development, AI, and the
					broader context of technology and life.
				</p>
			</div>

			{/* Posts */}
			<PostGrid posts={posts} />
		</div>
	);
}
