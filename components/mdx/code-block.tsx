"use client";

import { useState, useRef, useEffect, isValidElement } from "react";
import { Check, Copy, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
	children: React.ReactNode;
	className?: string;
	"data-language"?: string;
	"data-theme"?: string;
}

export function CodeBlock({
	children,
	className,
	"data-language": dataLanguage,
	...props
}: CodeBlockProps) {
	const [copied, setCopied] = useState(false);
	const [language, setLanguage] = useState<string>("");
	const preRef = useRef<HTMLPreElement>(null);

	useEffect(() => {
		let nextLanguage = "";

		// Prefer data attribute from rehype-pretty-code output
		if (dataLanguage) {
			nextLanguage = dataLanguage;
		} else if (preRef.current) {
			// Fallback: Extract language from code element's className
			const codeElement = preRef.current.querySelector("code");
			if (codeElement) {
				const langMatch = codeElement.className?.match(/language-(\w+)/);
				if (langMatch) {
					nextLanguage = langMatch[1];
				}
			}
		}

		if (!nextLanguage) return;

		const rafId = requestAnimationFrame(() => setLanguage(nextLanguage));

		return () => cancelAnimationFrame(rafId);
	}, [children, dataLanguage]);

	const copyToClipboard = async () => {
		if (preRef.current) {
			const codeElement = preRef.current.querySelector("code");
			const text = codeElement?.textContent || "";

			try {
				await navigator.clipboard.writeText(text);
				setCopied(true);
				setTimeout(() => setCopied(false), 2000);
			} catch (err) {
				console.error("Failed to copy text: ", err);
			}
		}
	};

	// Check if this is rehype-pretty-code output (has data-theme attribute)
	const isRehypePrettyCode = Boolean(
		props["data-theme"] ||
			(isValidElement(children) &&
				(children.props as Record<string, unknown>)?.["data-theme"]),
	);

	return (
		<div className="group relative my-6 overflow-hidden rounded-none border border-border bg-muted/50">
			{/* Header */}
			<div className="flex items-center justify-between border-b border-border bg-muted/80 px-4 py-2">
				<div className="flex items-center gap-2">
					<Terminal className="h-4 w-4 text-muted-foreground" />
					{language && (
						<span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
							{language}
						</span>
					)}
				</div>
				<button
					onClick={copyToClipboard}
					className={cn(
						"flex items-center gap-1.5 rounded-none px-2 py-1 text-xs font-medium",
						"text-muted-foreground hover:text-foreground",
						"bg-transparent hover:bg-background/50",
						"transition-all duration-200 ease-out",
						"focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-muted",
					)}
					aria-label={copied ? "Copied!" : "Copy code"}
				>
					<span
						className={cn(
							"transition-all duration-200",
							copied ? "scale-100 opacity-100" : "scale-95 opacity-0 absolute",
						)}
					>
						<Check className="h-3.5 w-3.5 text-green-500" />
					</span>
					<span
						className={cn(
							"transition-all duration-200",
							!copied ? "scale-100 opacity-100" : "scale-95 opacity-0 absolute",
						)}
					>
						<Copy className="h-3.5 w-3.5" />
					</span>
					<span className="ml-1">{copied ? "Copied!" : "Copy"}</span>
				</button>
			</div>
			{/* Code content */}
			<pre
				ref={preRef}
				className={cn(
					"overflow-x-auto p-4 text-sm leading-relaxed",
					"[&>code]:block [&>code]:bg-transparent [&>code]:p-0",
					"[&_[data-line]]:px-0",
					isRehypePrettyCode && "bg-transparent border-0",
					className,
				)}
				{...props}
			>
				{children}
			</pre>
		</div>
	);
}
