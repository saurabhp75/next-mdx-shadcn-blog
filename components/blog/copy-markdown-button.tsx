"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { Check, Copy, FileText } from "lucide-react";

export interface CopyMarkdownButtonProps {
	slug: string;
	content: string;
	meta: {
		title: string;
		description: string;
		date: string;
		updated?: string;
		author: string;
		image?: string;
		tags: string[];
		category: string;
	};
}

function yamlString(value: string) {
	// JSON strings are valid YAML scalars; this also safely escapes quotes/newlines.
	return JSON.stringify(value);
}

function toMdxFile({
	slug,
	content,
	meta,
}: {
	slug: string;
	content: string;
	meta: CopyMarkdownButtonProps["meta"];
}) {
	const frontmatterLines: string[] = ["---"];

	frontmatterLines.push(`title: ${yamlString(meta.title)}`);
	frontmatterLines.push(`description: ${yamlString(meta.description)}`);
	frontmatterLines.push(`date: ${yamlString(meta.date)}`);
	if (meta.updated)
		frontmatterLines.push(`updated: ${yamlString(meta.updated)}`);
	frontmatterLines.push(`author: ${yamlString(meta.author)}`);
	frontmatterLines.push(`tags: ${JSON.stringify(meta.tags ?? [])}`);
	frontmatterLines.push(`category: ${yamlString(meta.category)}`);
	if (meta.image) frontmatterLines.push(`image: ${yamlString(meta.image)}`);

	frontmatterLines.push("---", "");

	const normalizedContent = (content ?? "").replace(/^\ufeff/, "");
	const finalBody = `${normalizedContent.trimEnd()}\n`;

	return {
		filename: `${slug}.mdx`,
		text: frontmatterLines.join("\n") + finalBody,
	};
}

async function copyTextToClipboard(text: string) {
	// Prefer the async Clipboard API.
	if (navigator.clipboard?.writeText) {
		await navigator.clipboard.writeText(text);
		return;
	}

	// Fallback for older browsers.
	const textarea = document.createElement("textarea");
	textarea.value = text;
	textarea.setAttribute("readonly", "");
	textarea.style.position = "absolute";
	textarea.style.left = "-9999px";
	document.body.appendChild(textarea);
	textarea.select();
	const ok = document.execCommand("copy");
	document.body.removeChild(textarea);
	if (!ok) throw new Error("Copy failed");
}

export function CopyMarkdownButton({
	slug,
	content,
	meta,
}: CopyMarkdownButtonProps) {
	const [{ copied, error }, setStatus] = useState({
		copied: false,
		error: "",
	});

	const file = useMemo(
		() => toMdxFile({ slug, content, meta }),
		[slug, content, meta],
	);

	const onCopy = async () => {
		try {
			setStatus({ copied: false, error: "" });
			await copyTextToClipboard(file.text);
			setStatus({ copied: true, error: "" });
			window.setTimeout(() => setStatus({ copied: false, error: "" }), 2000);
		} catch (err) {
			const message = err instanceof Error ? err.message : "Failed to copy";
			setStatus({ copied: false, error: message });
		}
	};

	const label = copied ? "Copied" : "Copy MDX";
	const Icon = copied ? Check : Copy;
	const tooltipText = error
		? `Copy failed: ${error}`
		: `Copies ${file.filename} (frontmatter + body)`;

	return (
		<Tooltip>
			<TooltipTrigger
				render={
					<Button
						variant="outline"
						size="sm"
						onClick={onCopy}
						className="rounded-none"
						aria-label="Copy full MDX"
					/>
				}
			>
				<span className="inline-flex items-center">
					<FileText className="mr-2 h-4 w-4 text-muted-foreground" />
					<Icon
						className={copied ? "mr-2 h-4 w-4 text-green-500" : "mr-2 h-4 w-4"}
					/>
					{label}
				</span>
			</TooltipTrigger>
			<TooltipContent>
				<p>{tooltipText}</p>
			</TooltipContent>
		</Tooltip>
	);
}
