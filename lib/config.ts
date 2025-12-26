const siteUrl = (
	process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
).replace(/\/$/, "");

export const siteConfig = {
	name: "code and context",
	title: "code and context",
	description:
		"A technical blog exploring web development, AI, computers, and life in general. Written by Saurabh Prakash.",
	url: siteUrl,
	ogImage: "/og-image.png",
	author: {
		name: "Saurabh Prakash",
		bio: "Full-stack developer passionate about web technologies, AI, and building things that matter.",
		avatar: "/images/saurabh.webp",
		email: "saurabh@example.com", // Update with actual email
	},
	links: {
		github: "https://github.com/saurabhp75",
		linkedin: "https://www.linkedin.com/in/saurabhp75",
		twitter: "https://x.com/saurabhp75",
	},
	keywords: [
		"web development",
		"AI",
		"machine learning",
		"JavaScript",
		"TypeScript",
		"React",
		"Next.js",
		"programming",
		"technology",
		"software engineering",
	],
	navigation: [
		{ name: "Home", href: "/" },
		{ name: "Blog", href: "/blog" },
		{ name: "Tags", href: "/tags" },
		{ name: "About", href: "/about" },
	],
	categories: [
		"Web Development",
		"AI & Machine Learning",
		"Programming",
		"Life & Reflections",
		"Tutorials",
	],
};

export type SiteConfig = typeof siteConfig;
