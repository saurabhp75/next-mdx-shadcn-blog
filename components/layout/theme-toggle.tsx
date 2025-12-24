"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
	const { resolvedTheme, setTheme } = useTheme();
	const [mounted, setMounted] = React.useState(false);

	React.useEffect(() => {
		setMounted(true);
	}, []);

	return (
		<Button
			variant="ghost"
			size="icon"
			onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
			className={cn(
				"h-9 w-9 relative overflow-hidden",
				"hover:text-primary transition-colors",
			)}
			suppressHydrationWarning
		>
			<Sun
				className={cn(
					"h-4 w-4 absolute transition-all duration-300 ease-out",
					!mounted
						? "rotate-0 scale-100 opacity-100"
						: resolvedTheme === "dark"
							? "rotate-0 scale-100 opacity-100"
							: "-rotate-90 scale-0 opacity-0",
				)}
			/>
			<Moon
				className={cn(
					"h-4 w-4 absolute transition-all duration-300 ease-out",
					!mounted
						? "rotate-90 scale-0 opacity-0"
						: resolvedTheme === "light"
							? "rotate-0 scale-100 opacity-100"
							: "rotate-90 scale-0 opacity-0",
				)}
			/>
			<span className="sr-only">Toggle theme</span>
		</Button>
	);
}
