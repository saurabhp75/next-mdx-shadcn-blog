import type { Metadata } from "next";
import { siteConfig } from "./config";
import type { PostMeta } from "./blog";

const DEFAULT_OG_IMAGE = {
	url: siteConfig.ogImage,
	width: 1200,
	height: 630,
	alt: siteConfig.title,
};

export interface SeoImage {
	url: string;
	alt?: string;
	width?: number;
	height?: number;
}

interface BuildMetadataOptions {
	title?: string;
	description?: string;
	url?: string;
	image?: SeoImage | string;
	type?: "website" | "article";
	tags?: string[];
	publishedTime?: string;
	modifiedTime?: string;
	authors?: string[];
}

function isAbsoluteUrl(url: string) {
	return /^https?:\/\//i.test(url);
}

export function toAbsoluteUrl(pathOrUrl: string) {
	if (!pathOrUrl) return siteConfig.url;
	return isAbsoluteUrl(pathOrUrl)
		? pathOrUrl
		: new URL(pathOrUrl, siteConfig.url).toString();
}

function normalizeImage(image?: SeoImage | string) {
	if (!image)
		return { ...DEFAULT_OG_IMAGE, url: toAbsoluteUrl(DEFAULT_OG_IMAGE.url) };
	if (typeof image === "string") {
		return { ...DEFAULT_OG_IMAGE, url: toAbsoluteUrl(image) };
	}
	return {
		alt: image.alt ?? DEFAULT_OG_IMAGE.alt,
		width: image.width ?? DEFAULT_OG_IMAGE.width,
		height: image.height ?? DEFAULT_OG_IMAGE.height,
		url: toAbsoluteUrl(image.url),
	};
}

export function buildMetadata(options: BuildMetadataOptions = {}): Metadata {
	const {
		title = siteConfig.title,
		description = siteConfig.description,
		url,
		image,
		type = "website",
		tags,
		publishedTime,
		modifiedTime,
		authors,
	} = options;

	const canonical = url ? toAbsoluteUrl(url) : siteConfig.url;
	const ogImage = normalizeImage(image);
	const keywords = tags?.length
		? Array.from(new Set([...(siteConfig.keywords || []), ...tags]))
		: siteConfig.keywords;

	return {
		title,
		description,
		keywords,
		openGraph: {
			title,
			description,
			type,
			url: canonical,
			siteName: siteConfig.name,
			images: [ogImage],
			...(publishedTime ? { publishedTime } : {}),
			...(modifiedTime ? { modifiedTime } : {}),
			...(authors ? { authors } : {}),
			...(tags ? { tags } : {}),
		},
		twitter: {
			card: "summary_large_image",
			title,
			description,
			images: [ogImage.url],
		},
		alternates: {
			canonical,
		},
	};
}

export function buildPostMetadata(post: PostMeta): Metadata {
	return buildMetadata({
		title: post.title,
		description: post.description,
		url: `/blog/${post.slug}`,
		image: post.image ?? DEFAULT_OG_IMAGE,
		type: "article",
		publishedTime: post.date,
		modifiedTime: post.updated || post.date,
		tags: post.tags,
		authors: [post.author],
	});
}

export function buildTagMetadata(tag: string): Metadata {
	const decodedTag = decodeURIComponent(tag);
	return buildMetadata({
		title: `Posts tagged "${decodedTag}"`,
		description: `Browse all blog posts tagged with "${decodedTag}".`,
		url: `/tags/${decodedTag.toLowerCase()}`,
		tags: [decodedTag],
	});
}

export function buildPageMetadata(
	title: string,
	description?: string,
	path?: string,
	image?: SeoImage | string,
): Metadata {
	return buildMetadata({
		title,
		description,
		url: path,
		image,
	});
}

function readingTimeToWordCount(readingTime: string) {
	const minutesMatch = readingTime.match(/(\d+(?:\.\d+)?)/);
	if (!minutesMatch) return undefined;
	const minutes = parseFloat(minutesMatch[1]);
	return Math.max(1, Math.round(minutes * 200));
}

export function buildBlogPostJsonLd(post: PostMeta) {
	const url = toAbsoluteUrl(`/blog/${post.slug}`);
	const imageUrl = toAbsoluteUrl(post.image ?? DEFAULT_OG_IMAGE.url);
	const wordCount = readingTimeToWordCount(post.readingTime);

	return {
		"@context": "https://schema.org",
		"@type": "BlogPosting",
		headline: post.title,
		description: post.description,
		image: imageUrl,
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
				url: toAbsoluteUrl(siteConfig.ogImage),
			},
		},
		mainEntityOfPage: {
			"@type": "WebPage",
			"@id": url,
		},
		keywords: post.tags.join(", "),
		articleSection: post.category,
		...(wordCount ? { wordCount } : {}),
	};
}
