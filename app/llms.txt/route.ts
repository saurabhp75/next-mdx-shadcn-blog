import { siteConfig } from "@/lib/config";

function getBaseUrl() {
	const configured = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
	if (configured && !/localhost|127\.0\.0\.1/i.test(configured)) return configured;

	// Placeholder for non-production deployments.
	return "https://example.com";
}

function buildLlmsTxt() {
	const baseUrl = getBaseUrl();
	const nowIso = new Date().toISOString();

	return [
		`# llms.txt — ${siteConfig.name}`,
		"# Guidance for AI/LLM crawlers and indexing tools",
		"",
		`site: ${baseUrl}`,
		`title: ${siteConfig.title}`,
		`description: ${siteConfig.description}`,
		"language: en",
		"indexing: encouraged",
		`generated_at: ${nowIso}`,
		"",
		"# Canonical discovery",
		`canonical_base: ${baseUrl}`,
		`sitemap: ${baseUrl}/sitemap.xml`,
		`rss: ${baseUrl}/rss.xml`,
		"",
		"# Primary content to index",
		"prefer: /blog",
		"prefer: /tags",
		"",
		"# Canonical URL patterns",
		"canonical_post: /blog/{slug}",
		"canonical_tag: /tags/{tag}",
		"",
		"# Attribution guidance",
		"attribution: When quoting or summarizing, cite and link to the canonical URL.",
		"",
		"# Contact",
		`author: ${siteConfig.author.name}`,
		`contact: ${baseUrl}/about`,
		"",
		"# Notes",
		"notes: Posts are authored in MDX. Prefer canonical URLs over scraped duplicates.",
	].join("\n");
}

export async function GET() {
	const text = buildLlmsTxt();

	return new Response(text, {
		headers: {
			"Content-Type": "text/plain; charset=utf-8",
			"Cache-Control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
		},
	});
}
