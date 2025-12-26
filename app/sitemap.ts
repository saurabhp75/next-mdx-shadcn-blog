import type { MetadataRoute } from "next";
import { getAllPosts, getAllTags } from "@/lib/blog";
import { siteConfig } from "@/lib/config";

export default function sitemap(): MetadataRoute.Sitemap {
	const posts = getAllPosts();
	const tags = getAllTags();

	const blogPosts = posts.map((post) => ({
		url: `${siteConfig.url}/blog/${post.slug}`,
		lastModified: new Date(post.updated || post.date),
		changeFrequency: "monthly" as const,
		priority: 0.8,
	}));

	const tagPages = tags.map((tag) => ({
		url: `${siteConfig.url}/tags/${tag.toLowerCase()}`,
		lastModified: new Date(),
		changeFrequency: "weekly" as const,
		priority: 0.5,
	}));

	return [
		{
			url: siteConfig.url,
			lastModified: new Date(),
			changeFrequency: "daily",
			priority: 1,
		},
		{
			url: `${siteConfig.url}/blog`,
			lastModified: new Date(),
			changeFrequency: "daily",
			priority: 0.9,
		},
		{
			url: `${siteConfig.url}/about`,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.7,
		},
		{
			url: `${siteConfig.url}/tags`,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.6,
		},
		...blogPosts,
		...tagPages,
	];
}
