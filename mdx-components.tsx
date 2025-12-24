import type { MDXComponents } from "mdx/types";
import { MDXImage } from "@/components/mdx/mdx-image";
import { MDXLink } from "@/components/mdx/mdx-link";
import { CodeBlock } from "@/components/mdx/code-block";
import { Callout } from "@/components/mdx/callout";
import { MDXHeading } from "@/components/mdx/mdx-heading";

export function useMDXComponents(components: MDXComponents): MDXComponents {
	return {
		// Headings with anchor links
		h1: (props) => <MDXHeading level={1} {...props} />,
		h2: (props) => <MDXHeading level={2} {...props} />,
		h3: (props) => <MDXHeading level={3} {...props} />,
		h4: (props) => <MDXHeading level={4} {...props} />,
		h5: (props) => <MDXHeading level={5} {...props} />,
		h6: (props) => <MDXHeading level={6} {...props} />,

		// Paragraphs
		p: ({ children }) => (
			<p className="leading-7 [&:not(:first-child)]:mt-6">{children}</p>
		),

		// Links
		a: MDXLink,

		// Images
		img: MDXImage,

		// Code blocks
		pre: ({ children, ...props }) => (
			<CodeBlock {...props}>{children}</CodeBlock>
		),

		// Inline code
		code: ({ children, ...props }) => {
			// Check if this is inside a pre (code block) - handled by CodeBlock component
			const isInlineCode = !props.className?.includes("language-");
			if (isInlineCode && typeof children === "string") {
				return (
					<code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
						{children}
					</code>
				);
			}
			return <code {...props}>{children}</code>;
		},

		// Blockquote
		blockquote: ({ children }) => (
			<blockquote className="mt-6 border-l-2 border-primary pl-6 italic text-muted-foreground">
				{children}
			</blockquote>
		),

		// Lists
		ul: ({ children }) => (
			<ul className="my-6 ml-6 list-disc [&>li]:mt-2">{children}</ul>
		),
		ol: ({ children }) => (
			<ol className="my-6 ml-6 list-decimal [&>li]:mt-2">{children}</ol>
		),
		li: ({ children }) => <li className="leading-7">{children}</li>,

		// Horizontal rule
		hr: () => <hr className="my-8 border-border" />,

		// Table
		table: ({ children }) => (
			<div className="my-6 w-full overflow-y-auto">
				<table className="w-full">{children}</table>
			</div>
		),
		thead: ({ children }) => <thead>{children}</thead>,
		tbody: ({ children }) => <tbody>{children}</tbody>,
		tr: ({ children }) => (
			<tr className="m-0 border-t p-0 even:bg-muted">{children}</tr>
		),
		th: ({ children }) => (
			<th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
				{children}
			</th>
		),
		td: ({ children }) => (
			<td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
				{children}
			</td>
		),

		// Custom components
		Callout,

		...components,
	};
}
