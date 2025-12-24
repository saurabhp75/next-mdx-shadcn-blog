"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { ExternalLink } from "lucide-react";

interface MDXLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href?: string;
  children: React.ReactNode;
}

export function MDXLink({ href, children, className, ...props }: MDXLinkProps) {
  if (!href) {
    return <span {...props}>{children}</span>;
  }

  const isExternal = href.startsWith("http") || href.startsWith("//");
  const isAnchor = href.startsWith("#");

  const linkClasses = cn(
    "font-medium underline underline-offset-4 decoration-primary/50",
    "hover:decoration-primary transition-colors duration-200",
    "inline-flex items-center gap-0.5",
    className
  );

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClasses}
        {...props}
      >
        {children}
        <ExternalLink className="h-3 w-3 ml-0.5 inline-block" />
      </a>
    );
  }

  if (isAnchor) {
    return (
      <a href={href} className={linkClasses} {...props}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={linkClasses} {...props}>
      {children}
    </Link>
  );
}
