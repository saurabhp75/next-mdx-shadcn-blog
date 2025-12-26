import { ImageResponse } from "next/og";
import { getAllPostSlugs, getPostBySlug } from "@/lib/blog";
import { siteConfig } from "@/lib/config";

export const runtime = "nodejs";

export const dynamic = "force-static";
export const dynamicParams = false;
export const revalidate = false;

export const size = {
	width: 1200,
	height: 630,
};

export const contentType = "image/png";

export const alt = `${siteConfig.title} — Open Graph Image`;

export async function generateStaticParams() {
	const slugs = getAllPostSlugs();
	return slugs.map((slug) => ({ slug }));
}

function formatDate(dateIso: string) {
	try {
		return new Date(dateIso).toLocaleDateString("en-US", {
			year: "numeric",
			month: "short",
			day: "numeric",
		});
	} catch {
		return dateIso;
	}
}

export default async function OpenGraphImage({
	params,
}: {
	params: { slug: string };
}) {
	const slug = decodeURIComponent(params.slug);
	const post = getPostBySlug(slug);

	const title = post?.title ?? "Post Not Found";
	const description = post?.description ?? siteConfig.description;
	const author = post?.author ?? siteConfig.author.name;
	const date = post?.date ? formatDate(post.date) : "";
	const tags = post?.tags?.slice(0, 4) ?? [];

	// Boxy, high-contrast design to match the site.
	return new ImageResponse(
		<div
			style={{
				width: "100%",
				height: "100%",
				display: "flex",
				flexDirection: "column",
				backgroundColor: "#0b0b0f",
				color: "#f4f4f5",
				padding: 64,
				fontFamily:
					"ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial",
			}}
		>
			{/* top bar */}
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					padding: "18px 22px",
					border: "2px solid rgba(244,244,245,0.14)",
					background: "rgba(244,244,245,0.04)",
				}}
			>
				<div style={{ display: "flex", alignItems: "center", gap: 14 }}>
					<div
						style={{
							width: 14,
							height: 14,
							background: "#a3e635",
							border: "2px solid rgba(11,11,15,0.9)",
						}}
					/>
					<div
						style={{
							display: "flex",
							alignItems: "baseline",
							gap: 6,
							fontSize: 22,
							letterSpacing: -0.4,
						}}
					>
						<span style={{ color: "#a3e635", fontWeight: 700 }}>code</span>
						<span style={{ color: "rgba(244,244,245,0.65)" }}> &amp; </span>
						<span style={{ fontWeight: 700 }}>context</span>
					</div>
				</div>
				<div style={{ fontSize: 16, color: "rgba(244,244,245,0.65)" }}>
					{date}
				</div>
			</div>

			{/* content */}
			<div style={{ display: "flex", flex: 1, paddingTop: 44 }}>
				<div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
					<div
						style={{
							fontSize: 62,
							fontWeight: 800,
							letterSpacing: -1.6,
							lineHeight: 1.06,
							maxHeight: 230,
							overflow: "hidden",
						}}
					>
						{title}
					</div>

					<div
						style={{
							marginTop: 18,
							fontSize: 26,
							lineHeight: 1.35,
							color: "rgba(244,244,245,0.75)",
							maxHeight: 110,
							overflow: "hidden",
						}}
					>
						{description}
					</div>

					<div
						style={{
							display: "flex",
							alignItems: "center",
							gap: 12,
							marginTop: 28,
						}}
					>
						<div
							style={{
								padding: "10px 14px",
								border: "2px solid rgba(244,244,245,0.14)",
								background: "rgba(244,244,245,0.04)",
								fontSize: 18,
								color: "rgba(244,244,245,0.8)",
							}}
						>
							{`By ${author}`}
						</div>

						{tags.length > 0 && (
							<div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
								{tags.map((tag) => (
									<div
										key={tag}
										style={{
											padding: "10px 12px",
											border: "2px solid rgba(163,230,53,0.35)",
											background: "rgba(163,230,53,0.10)",
											fontSize: 16,
											color: "rgba(244,244,245,0.9)",
										}}
									>
										{tag}
									</div>
								))}
							</div>
						)}
					</div>
				</div>

				{/* accent panel */}
				<div
					style={{
						width: 260,
						display: "flex",
						flexDirection: "column",
						justifyContent: "flex-end",
						alignItems: "stretch",
						marginLeft: 44,
					}}
				>
					<div
						style={{
							border: "2px solid rgba(244,244,245,0.14)",
							background:
								"linear-gradient(135deg, rgba(163,230,53,0.14), rgba(244,244,245,0.04))",
							padding: 18,
							height: 180,
							display: "flex",
							flexDirection: "column",
							justifyContent: "space-between",
						}}
					>
						<div style={{ fontSize: 14, color: "rgba(244,244,245,0.7)" }}>
							Canonical:
						</div>
						<div style={{ fontSize: 16, color: "rgba(244,244,245,0.9)" }}>
							{`/blog/${slug}`}
						</div>
						<div style={{ fontSize: 14, color: "rgba(244,244,245,0.7)" }}>
							{siteConfig.url}
						</div>
					</div>
				</div>
			</div>
		</div>,
		{
			...size,
		},
	);
}
