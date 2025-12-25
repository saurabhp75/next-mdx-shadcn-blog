import { notFound } from "next/navigation";
import { PostHeader } from "@/components/blog/post-header";
import { TableOfContents } from "@/components/blog/table-of-contents";
import { ShareButtons } from "@/components/blog/share-buttons";
import { getAllPostSlugs, getPostBySlug } from "@/lib/blog";
import { renderMDX } from "@/lib/mdx";
import { buildBlogPostJsonLd, buildPostMetadata, toAbsoluteUrl } from "@/lib/seo";

interface BlogPostPageProps {
	params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
	const slugs = getAllPostSlugs();
	return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
	params,
}: BlogPostPageProps) {
	const { slug } = await params;
	const post = getPostBySlug(slug);

	if (!post) {
		return {
			title: "Post Not Found",
		};
	}

	return buildPostMetadata(post);
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
	const { slug } = await params;
	const post = getPostBySlug(slug);

	if (!post) {
		notFound();
	}

	// Render MDX content with syntax highlighting
	const content = await renderMDX(post.content);

	const postUrl = toAbsoluteUrl(`/blog/${slug}`);

	return (
		<>
			{/* JSON-LD Structured Data */}
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(buildBlogPostJsonLd(post)),
				}}
			/>

			<div className="container max-w-screen-xl px-4 md:px-8 py-12">
				<div className="grid grid-cols-1 lg:grid-cols-[1fr_250px] gap-10">
					{/* Main content */}
					<div className="min-w-0">
						<PostHeader post={post} />

						{/* Article content */}
						<article className="prose prose-neutral dark:prose-invert max-w-none prose-headings:scroll-mt-20 prose-a:text-primary prose-pre:bg-transparent prose-pre:p-0">
							{content}
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
