import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";

export default function robots(): MetadataRoute.Robots {
	return {
		rules: [
			{
				userAgent: "*",
				allow: "/",
				disallow: ["/api/", "/admin/"],
			},
			// AI crawlers - explicitly allow
			{
				userAgent: "GPTBot",
				allow: "/",
			},
			{
				userAgent: "ChatGPT-User",
				allow: "/",
			},
			{
				userAgent: "Google-Extended",
				allow: "/",
			},
			{
				userAgent: "Anthropic-AI",
				allow: "/",
			},
			{
				userAgent: "Claude-Web",
				allow: "/",
			},
			{
				userAgent: "CCBot",
				allow: "/",
			},
			{
				userAgent: "PerplexityBot",
				allow: "/",
			},
		],
		sitemap: `${siteConfig.url}/sitemap.xml`,
		host: siteConfig.url,
	};
}
