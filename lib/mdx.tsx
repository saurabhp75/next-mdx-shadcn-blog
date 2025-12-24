"use server";

import { compileMDX } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkGfm from "remark-gfm";
import { MDXImage } from "@/components/mdx/mdx-image";
import { MDXLink } from "@/components/mdx/mdx-link";
import { CodeBlock } from "@/components/mdx/code-block";
import { Callout } from "@/components/mdx/callout";
import { MDXHeading } from "@/components/mdx/mdx-heading";

const components = {
	// Headings with anchor links
	h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
		<MDXHeading level={1} {...props}>
			{props.children}
		</MDXHeading>
	),
	h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
		<MDXHeading level={2} {...props}>
			{props.children}
		</MDXHeading>
	),
	h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
		<MDXHeading level={3} {...props}>
			{props.children}
		</MDXHeading>
	),
	h4: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
		<MDXHeading level={4} {...props}>
			{props.children}
		</MDXHeading>
	),
	h5: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
		<MDXHeading level={5} {...props}>
			{props.children}
		</MDXHeading>
	),
	h6: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
		<MDXHeading level={6} {...props}>
			{props.children}
		</MDXHeading>
	),

	// Paragraphs
	p: ({ children }: { children: React.ReactNode }) => (
		<p className="leading-7 [&:not(:first-child)]:mt-6">{children}</p>
	),

	// Links
	a: MDXLink,

	// Images
	img: MDXImage,

	// Code blocks with syntax highlighting from rehype-pretty-code
	pre: ({
		children,
		...props
	}: React.HTMLAttributes<HTMLPreElement> & {
		"data-language"?: string;
		"data-theme"?: string;
	}) => {
		const codeChild = children as React.ReactElement<{
			"data-language"?: string;
		}>;
		const dataLanguage =
			codeChild?.props?.["data-language"] ||
			(props as Record<string, unknown>)["data-language"];

		return (
			<CodeBlock data-language={dataLanguage as string} {...props}>
				{children}
			</CodeBlock>
		);
	},

	// Inline code
	code: ({
		children,
		...props
	}: React.HTMLAttributes<HTMLElement> & {
		"data-theme"?: string;
		"data-language"?: string;
	}) => {
		// Check if this is inside a pre (code block) - has data-theme or data-language
		const hasDataTheme = props["data-theme"];
		const hasDataLanguage = props["data-language"];

		if (hasDataTheme || hasDataLanguage) {
			return <code {...props}>{children}</code>;
		}

		// Inline code styling
		return (
			<code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
				{children}
			</code>
		);
	},

	// Blockquote
	blockquote: ({ children }: { children: React.ReactNode }) => (
		<blockquote className="mt-6 border-l-2 border-primary pl-6 italic text-muted-foreground">
			{children}
		</blockquote>
	),

	// Lists
	ul: ({ children }: { children: React.ReactNode }) => (
		<ul className="my-6 ml-6 list-disc [&>li]:mt-2">{children}</ul>
	),
	ol: ({ children }: { children: React.ReactNode }) => (
		<ol className="my-6 ml-6 list-decimal [&>li]:mt-2">{children}</ol>
	),
	li: ({ children }: { children: React.ReactNode }) => (
		<li className="leading-7">{children}</li>
	),

	// Horizontal rule
	hr: () => <hr className="my-8 border-border" />,

	// Table
	table: ({ children }: { children: React.ReactNode }) => (
		<div className="my-6 w-full overflow-y-auto">
			<table className="w-full">{children}</table>
		</div>
	),
	thead: ({ children }: { children: React.ReactNode }) => (
		<thead>{children}</thead>
	),
	tbody: ({ children }: { children: React.ReactNode }) => (
		<tbody>{children}</tbody>
	),
	tr: ({ children }: { children: React.ReactNode }) => (
		<tr className="m-0 border-t p-0 even:bg-muted">{children}</tr>
	),
	th: ({ children }: { children: React.ReactNode }) => (
		<th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
			{children}
		</th>
	),
	td: ({ children }: { children: React.ReactNode }) => (
		<td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
			{children}
		</td>
	),

	// Custom components
	Callout,
};

export async function renderMDX(source: string) {
	const { content } = await compileMDX({
		source,
		components,
		options: {
			parseFrontmatter: false,
			mdxOptions: {
				remarkPlugins: [remarkGfm],
				rehypePlugins: [
					rehypeSlug,
					[
						rehypePrettyCode,
						{
							theme: {
								dark: "github-dark",
								light: "github-light",
							},
							keepBackground: false,
							defaultLang: "plaintext",
						},
					],
					[
						rehypeAutolinkHeadings,
						{
							behavior: "wrap",
							properties: {
								className: ["anchor"],
							},
						},
					],
				],
			},
		},
	});

	return content;
}
