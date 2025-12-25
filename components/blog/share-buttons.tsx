"use client";

import { useState } from "react";
import { Button, ButtonLink } from "@/components/ui/button";
import { Check, Link2, Twitter, Linkedin, Facebook } from "lucide-react";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";

interface ShareButtonsProps {
	url: string;
	title: string;
	description?: string;
}

export function ShareButtons({ url, title, description }: ShareButtonsProps) {
	const [copied, setCopied] = useState(false);

	const shareUrl = encodeURIComponent(url);
	const shareText = encodeURIComponent(
		description ? `${title} — ${description}` : title,
	);

	const copyToClipboard = async () => {
		try {
			await navigator.clipboard.writeText(url);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch (err) {
			console.error("Failed to copy:", err);
		}
	};

	const shareLinks = [
		{
			name: "Twitter/X",
			icon: Twitter,
			href: `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareText}`,
		},
		{
			name: "LinkedIn",
			icon: Linkedin,
			href: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
		},
		{
			name: "Facebook",
			icon: Facebook,
			href: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
		},
	];

	return (
		<TooltipProvider>
			<div className="flex items-center gap-2">
				<span className="text-sm text-muted-foreground mr-2">Share:</span>
				{shareLinks.map((link) => (
					<Tooltip key={link.name}>
						<TooltipTrigger
							render={
								<ButtonLink
									variant="ghost"
									size="icon"
									className="h-8 w-8 hover:text-primary transition-colors"
									href={link.href}
									target="_blank"
									rel="noopener noreferrer"
									aria-label={`Share on ${link.name}`}
								/>
							}
						>
							<link.icon className="h-4 w-4" />
						</TooltipTrigger>
						<TooltipContent>
							<p>Share on {link.name}</p>
						</TooltipContent>
					</Tooltip>
				))}
				<Tooltip>
					<TooltipTrigger
						render={
							<Button
								variant="ghost"
								size="icon"
								className="h-8 w-8 hover:text-primary transition-colors"
								onClick={copyToClipboard}
							/>
						}
					>
						{copied ? (
							<Check className="h-4 w-4 text-green-500" />
						) : (
							<Link2 className="h-4 w-4" />
						)}
					</TooltipTrigger>
					<TooltipContent>
						<p>{copied ? "Copied!" : "Copy link"}</p>
					</TooltipContent>
				</Tooltip>
			</div>
		</TooltipProvider>
	);
}
