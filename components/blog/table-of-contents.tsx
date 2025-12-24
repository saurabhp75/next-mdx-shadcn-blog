"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TocItem {
	id: string;
	text: string;
	level: number;
}

export function TableOfContents() {
	const [headings, setHeadings] = useState<TocItem[]>([]);
	const [activeId, setActiveId] = useState<string>("");

	useEffect(() => {
		const article = document.querySelector("article");
		if (!article) return;

		const elements = article.querySelectorAll("h2, h3, h4");
		const items: TocItem[] = Array.from(elements).map((element) => ({
			id: element.id,
			text: element.textContent || "",
			level: Number(element.tagName[1]),
		}));
		setHeadings(items);

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setActiveId(entry.target.id);
					}
				});
			},
			{
				rootMargin: "-100px 0% -66%",
				threshold: 0,
			},
		);

		elements.forEach((element) => observer.observe(element));

		return () => observer.disconnect();
	}, []);

	if (headings.length === 0) return null;

	return (
		<nav className="space-y-2">
			<p className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">
				On This Page
			</p>
			<ul className="space-y-2 text-sm">
				{headings.map((heading) => (
					<li
						key={heading.id}
						style={{ paddingLeft: `${(heading.level - 2) * 12}px` }}
					>
						<a
							href={`#${heading.id}`}
							className={cn(
								"block py-1 transition-colors duration-200",
								"hover:text-primary",
								activeId === heading.id
									? "text-primary font-medium"
									: "text-muted-foreground",
							)}
							onClick={(e) => {
								e.preventDefault();
								const element = document.getElementById(heading.id);
								if (element) {
									element.scrollIntoView({ behavior: "smooth" });
									setActiveId(heading.id);
								}
							}}
						>
							{heading.text}
						</a>
					</li>
				))}
			</ul>
		</nav>
	);
}
