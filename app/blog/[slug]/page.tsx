import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostHeader } from "@/components/blog/post-header";
import { TableOfContents } from "@/components/blog/table-of-contents";
import { ShareButtons } from "@/components/blog/share-buttons";
import { getAllPostSlugs, getPostBySlug } from "@/lib/blog";
import { siteConfig } from "@/lib/config";

interface BlogPostPageProps {
	params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
	const slugs = getAllPostSlugs();
	return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
	params,
}: BlogPostPageProps): Promise<Metadata> {
	const { slug } = await params;
	const post = getPostBySlug(slug);

	if (!post) {
		return {
			title: "Post Not Found",
		};
	}

	const url = `${siteConfig.url}/blog/${slug}`;

	return {
		title: post.title,
		description: post.description,
		authors: [{ name: post.author }],
		keywords: post.tags,
		openGraph: {
			title: post.title,
			description: post.description,
			type: "article",
			url,
			publishedTime: post.date,
			modifiedTime: post.updated || post.date,
			authors: [post.author],
			tags: post.tags,
			images: post.image
				? [
						{
							url: post.image,
							width: 1200,
							height: 630,
							alt: post.title,
						},
					]
				: undefined,
		},
		twitter: {
			card: "summary_large_image",
			title: post.title,
			description: post.description,
			images: post.image ? [post.image] : undefined,
		},
		alternates: {
			canonical: url,
		},
	};
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
	const { slug } = await params;
	const post = getPostBySlug(slug);

	if (!post) {
		notFound();
	}

	// Dynamic import of the MDX file
	const { default: PostContent } = await import(`@/content/blog/${slug}.mdx`);

	const postUrl = `${siteConfig.url}/blog/${slug}`;

	return (
		<>
			{/* JSON-LD Structured Data */}
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						"@context": "https://schema.org",
						"@type": "BlogPosting",
						headline: post.title,
						description: post.description,
						image: post.image,
						datePublished: post.date,
						dateModified: post.updated || post.date,
						author: {
							"@type": "Person",
							name: post.author,
							url: siteConfig.links.github,
						},
						publisher: {
							"@type": "Person",
							name: siteConfig.author.name,
							logo: {
								"@type": "ImageObject",
								url: `${siteConfig.url}/logo.png`,
							},
						},
						mainEntityOfPage: {
							"@type": "WebPage",
							"@id": postUrl,
						},
						keywords: post.tags.join(", "),
						articleSection: post.category,
						wordCount: post.readingTime.replace(/[^0-9]/g, "") + "00", // Approximate
					}),
				}}
			/>

			<div className="container max-w-screen-xl px-4 md:px-8 py-12">
				<div className="grid grid-cols-1 lg:grid-cols-[1fr_250px] gap-10">
					{/* Main content */}
					<div className="min-w-0">
						<PostHeader post={post} />

						{/* Article content */}
						<article className="prose prose-neutral dark:prose-invert max-w-none prose-headings:scroll-mt-20 prose-a:text-primary prose-pre:bg-transparent prose-pre:p-0">
							<PostContent />
						</article>

						{/* Post footer */}
						<div className="mt-12 pt-8 border-t border-border">
							<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
								<ShareButtons
									url={postUrl}
									title={post.title}
									description={post.description}
								/>
							</div>
						</div>
					</div>

					{/* Sidebar - Table of Contents */}
					<aside className="hidden lg:block">
						<div className="sticky top-24">
							<TableOfContents />
						</div>
					</aside>
				</div>
			</div>
		</>
	);
}
