import Link from "next/link";
import { Button, ButtonLink } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PostGrid } from "@/components/blog/post-grid";
import { getAllPosts, getAllTags } from "@/lib/blog";
import { siteConfig } from "@/lib/config";
import { ArrowRight, Code2, Brain, Sparkles } from "lucide-react";

export default function HomePage() {
	const posts = getAllPosts();
	const recentPosts = posts.slice(0, 7);
	const tags = getAllTags().slice(0, 8);

	return (
		<div className="flex flex-col">
			{/* Hero Section */}
			<section className="relative overflow-hidden border-b border-border">
				{/* Background gradient */}
				<div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
				<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />

				<div className="container relative max-w-screen-xl px-4 md:px-8 py-20 md:py-32">
					<div className="max-w-3xl space-y-8">
						{/* Badge */}
						<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-background/50 backdrop-blur-sm">
							<Sparkles className="h-3.5 w-3.5 text-primary" />
							<span className="text-sm text-muted-foreground">
								Technical Blog & Personal Reflections
							</span>
						</div>

						{/* Heading */}
						<h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
							<span className="text-primary">code</span>
							<span className="text-muted-foreground"> & </span>
							<span>context</span>
						</h1>

						{/* Description */}
						<p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl">
							Exploring the intersection of{" "}
							<span className="text-foreground font-medium">
								web development
							</span>
							,{" "}
							<span className="text-foreground font-medium">
								artificial intelligence
							</span>
							, and{" "}
							<span className="text-foreground font-medium">
								life&apos;s broader context
							</span>
							.
						</p>

						{/* CTAs */}
						<div className="flex flex-wrap gap-4 pt-4">
							<Link href="/blog" className="group">
								<Button size="lg">
									Read the Blog
									<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
								</Button>
							</Link>
							<Link href="/about">
								<Button variant="outline" size="lg">
									About Me
								</Button>
							</Link>
						</div>

						{/* Features */}
						<div className="flex flex-wrap gap-6 pt-8 text-sm text-muted-foreground">
							<div className="flex items-center gap-2">
								<Code2 className="h-4 w-4 text-primary" />
								<span>Web Development</span>
							</div>
							<div className="flex items-center gap-2">
								<Brain className="h-4 w-4 text-primary" />
								<span>AI & Machine Learning</span>
							</div>
							<div className="flex items-center gap-2">
								<Sparkles className="h-4 w-4 text-primary" />
								<span>Life & Tech Insights</span>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Recent Posts Section */}
			<section className="container max-w-screen-xl px-4 md:px-8 py-16 md:py-24">
				<div className="flex items-center justify-between mb-10">
					<div>
						<h2 className="text-3xl font-bold tracking-tight">Recent Posts</h2>
						<p className="text-muted-foreground mt-2">
							Latest thoughts and tutorials from the blog
						</p>
					</div>
					<Link href="/blog" className="hidden sm:flex group">
						<Button variant="ghost">
							View all posts
							<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
						</Button>
					</Link>
				</div>

				{recentPosts.length > 0 ? (
					<PostGrid posts={recentPosts} showFeatured />
				) : (
					<div className="text-center py-16 border border-dashed border-border rounded-lg">
						<p className="text-muted-foreground mb-4">
							No posts yet. Check back soon!
						</p>
						<p className="text-sm text-muted-foreground">
							Add MDX files to{" "}
							<code className="bg-muted px-2 py-1 rounded">content/blog/</code>{" "}
							to get started.
						</p>
					</div>
				)}

				<div className="mt-8 text-center sm:hidden">
					<Link href="/blog">
						<Button variant="outline">View all posts</Button>
					</Link>
				</div>
			</section>

			{/* Topics Section */}
			{tags.length > 0 && (
				<section className="border-t border-border bg-muted/30">
					<div className="container max-w-screen-xl px-4 md:px-8 py-16">
						<div className="text-center mb-10">
							<h2 className="text-3xl font-bold tracking-tight">
								Explore Topics
							</h2>
							<p className="text-muted-foreground mt-2">
								Browse posts by topic and interest
							</p>
						</div>
						<div className="flex flex-wrap justify-center gap-3">
							{tags.map((tag) => (
								<Link key={tag} href={`/tags/${tag.toLowerCase()}`}>
									<Badge
										variant="secondary"
										className="px-4 py-2 text-sm cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
									>
										{tag}
									</Badge>
								</Link>
							))}
							<Link href="/tags">
								<Badge
									variant="outline"
									className="px-4 py-2 text-sm cursor-pointer hover:bg-accent transition-colors"
								>
									View all →
								</Badge>
							</Link>
						</div>
					</div>
				</section>
			)}

			{/* Newsletter Section */}
			<section className="border-t border-border">
				<div className="container max-w-screen-xl px-4 md:px-8 py-16 md:py-24">
					<div className="max-w-2xl mx-auto text-center space-y-6">
						<h2 className="text-3xl font-bold tracking-tight">Stay Updated</h2>
						<p className="text-muted-foreground text-lg">
							Follow me on social media to get updates on new posts about web
							development, AI, and everything in between.
						</p>
						<div className="flex justify-center gap-4 pt-4">
							<ButtonLink
								variant="outline"
								href={siteConfig.links.twitter}
								target="_blank"
								rel="noopener noreferrer"
							>
								Follow on X
							</ButtonLink>
							<ButtonLink
								variant="outline"
								href={siteConfig.links.github}
								target="_blank"
								rel="noopener noreferrer"
							>
								Follow on GitHub
							</ButtonLink>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
