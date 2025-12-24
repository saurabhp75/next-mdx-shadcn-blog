import { PostCard } from "./post-card";
import type { PostMeta } from "@/lib/blog";

interface PostGridProps {
	posts: PostMeta[];
	showFeatured?: boolean;
}

export function PostGrid({ posts, showFeatured = false }: PostGridProps) {
	if (posts.length === 0) {
		return (
			<div className="text-center py-12">
				<p className="text-muted-foreground">No posts found.</p>
			</div>
		);
	}

	if (showFeatured && posts.length > 0) {
		const [featuredPost, ...restPosts] = posts;

		return (
			<div className="space-y-8">
				{/* Featured post */}
				<PostCard post={featuredPost} featured />

				{/* Rest of the posts in a grid */}
				{restPosts.length > 0 && (
					<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
						{restPosts.map((post) => (
							<PostCard key={post.slug} post={post} />
						))}
					</div>
				)}
			</div>
		);
	}

	return (
		<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
			{posts.map((post) => (
				<PostCard key={post.slug} post={post} />
			))}
		</div>
	);
}
