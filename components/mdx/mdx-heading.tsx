"use client";

import { cn } from "@/lib/utils";
import { Link2 } from "lucide-react";
import type { ElementType } from "react";

interface MDXHeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  className?: string;
  id?: string;
}

const headingStyles = {
  1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
  2: "scroll-m-20 border-b border-border pb-2 text-3xl font-semibold tracking-tight mt-12 first:mt-0",
  3: "scroll-m-20 text-2xl font-semibold tracking-tight mt-8",
  4: "scroll-m-20 text-xl font-semibold tracking-tight mt-6",
  5: "scroll-m-20 text-lg font-semibold tracking-tight mt-4",
  6: "scroll-m-20 text-base font-semibold tracking-tight mt-4",
};

const headingTags: Record<number, ElementType> = {
  1: "h1",
  2: "h2",
  3: "h3",
  4: "h4",
  5: "h5",
  6: "h6",
};

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

export function MDXHeading({ level, children, className, id }: MDXHeadingProps) {
  const Tag = headingTags[level];
  const textContent = typeof children === "string" ? children : "";
  const headingId = id || slugify(textContent);

  // Only show anchor link for h2, h3, h4
  const showAnchor = level >= 2 && level <= 4;

  return (
    <Tag
      id={headingId}
      className={cn(
        headingStyles[level],
        "group relative",
        className
      )}
    >
      {children}
      {showAnchor && (
        <a
          href={`#${headingId}`}
          className={cn(
            "absolute -left-6 top-1/2 -translate-y-1/2",
            "opacity-0 group-hover:opacity-100",
            "transition-opacity duration-200",
            "text-muted-foreground hover:text-primary",
            "hidden md:inline-block"
          )}
          aria-label={`Link to ${textContent}`}
        >
          <Link2 className="h-4 w-4" />
        </a>
      )}
    </Tag>
  );
}
