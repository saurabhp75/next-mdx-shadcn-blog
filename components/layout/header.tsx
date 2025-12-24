"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/config";
import { Button, ButtonLink } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Github, Linkedin, Twitter } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { useState } from "react";

export function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-xl items-center px-4 md:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="mr-6 flex items-center space-x-2 group"
        >
          <span className="font-bold text-xl tracking-tight">
            <span className="text-primary transition-colors duration-200 group-hover:text-primary/80">
              code
            </span>
            <span className="text-muted-foreground"> & </span>
            <span className="transition-colors duration-200 group-hover:text-primary">
              context
            </span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex flex-1 items-center justify-center space-x-1">
          {siteConfig.navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-md transition-all duration-200",
                "hover:bg-accent hover:text-accent-foreground",
                "relative after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2",
                "after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300",
                "hover:after:w-[calc(100%-1rem)]",
                pathname === item.href
                  ? "text-foreground after:w-[calc(100%-1rem)]"
                  : "text-muted-foreground"
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Right side - Social links and theme toggle */}
        <div className="flex items-center gap-1 ml-auto">
          <div className="hidden sm:flex items-center gap-1">
            <ButtonLink
              variant="ghost"
              size="icon"
              className="h-9 w-9 hover:text-primary transition-colors"
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
            </ButtonLink>
            <ButtonLink
              variant="ghost"
              size="icon"
              className="h-9 w-9 hover:text-primary transition-colors"
              href={siteConfig.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </ButtonLink>
            <ButtonLink
              variant="ghost"
              size="icon"
              className="h-9 w-9 hover:text-primary transition-colors"
              href={siteConfig.links.twitter}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter/X"
            >
              <Twitter className="h-4 w-4" />
            </ButtonLink>
          </div>
          <ThemeToggle />

          {/* Mobile menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger
              className="md:hidden"
              render={<Button variant="ghost" size="icon" className="h-9 w-9" />}
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[350px]">
              <nav className="flex flex-col gap-4 mt-8">
                {siteConfig.navigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "text-lg font-medium py-2 px-4 rounded-md transition-colors",
                      "hover:bg-accent hover:text-accent-foreground",
                      pathname === item.href
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground"
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="border-t border-border my-4" />
                <div className="flex items-center gap-4 px-4">
                  <a
                    href={siteConfig.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label="GitHub"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                  <a
                    href={siteConfig.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a
                    href={siteConfig.links.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label="Twitter/X"
                  >
                    <Twitter className="h-5 w-5" />
                  </a>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
