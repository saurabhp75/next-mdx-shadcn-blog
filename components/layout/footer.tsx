import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { Github, Linkedin, Twitter, Heart } from "lucide-react";

export function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="border-t border-border bg-background">
			<div className="container max-w-screen-xl px-4 md:px-8 py-12">
				<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
					{/* Brand */}
					<div className="md:col-span-2">
						<Link href="/" className="inline-block mb-4">
							<span className="font-bold text-xl tracking-tight">
								<span className="text-primary">code</span>
								<span className="text-muted-foreground"> & </span>
								<span>context</span>
							</span>
						</Link>
						<p className="text-sm text-muted-foreground max-w-md leading-relaxed">
							Exploring the intersection of technology and life. Writing about
							web development, AI, programming, and the occasional life
							reflection.
						</p>
						<div className="flex items-center gap-4 mt-6">
							<a
								href={siteConfig.links.github}
								target="_blank"
								rel="noopener noreferrer"
								className="text-muted-foreground hover:text-primary transition-colors duration-200"
								aria-label="GitHub"
							>
								<Github className="h-5 w-5" />
							</a>
							<a
								href={siteConfig.links.linkedin}
								target="_blank"
								rel="noopener noreferrer"
								className="text-muted-foreground hover:text-primary transition-colors duration-200"
								aria-label="LinkedIn"
							>
								<Linkedin className="h-5 w-5" />
							</a>
							<a
								href={siteConfig.links.twitter}
								target="_blank"
								rel="noopener noreferrer"
								className="text-muted-foreground hover:text-primary transition-colors duration-200"
								aria-label="Twitter/X"
							>
								<Twitter className="h-5 w-5" />
							</a>
						</div>
					</div>

					{/* Navigation */}
					<div>
						<h3 className="font-semibold mb-4">Navigation</h3>
						<ul className="space-y-3">
							{siteConfig.navigation.map((item) => (
								<li key={item.href}>
									<Link
										href={item.href}
										className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
									>
										{item.name}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Categories */}
					<div>
						<h3 className="font-semibold mb-4">Categories</h3>
						<ul className="space-y-3">
							{siteConfig.categories.slice(0, 4).map((category) => (
								<li key={category}>
									<Link
										href={`/blog?category=${encodeURIComponent(category)}`}
										className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
									>
										{category}
									</Link>
								</li>
							))}
						</ul>
					</div>
				</div>

				{/* Bottom bar */}
				<div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
					<p className="text-sm text-muted-foreground flex items-center gap-1">
						© {currentYear} {siteConfig.name}. Built with{" "}
						<Heart className="h-3 w-3 text-red-500 fill-red-500 inline" /> by{" "}
						<a
							href={siteConfig.links.github}
							target="_blank"
							rel="noopener noreferrer"
							className="hover:text-primary transition-colors"
						>
							{siteConfig.author.name}
						</a>
					</p>
					<div className="flex items-center gap-6 text-sm text-muted-foreground">
						<Link
							href="/privacy"
							className="hover:text-primary transition-colors"
						>
							Privacy
						</Link>
						<Link
							href="/rss.xml"
							className="hover:text-primary transition-colors"
						>
							RSS
						</Link>
						<Link
							href="/sitemap.xml"
							className="hover:text-primary transition-colors"
						>
							Sitemap
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
}
