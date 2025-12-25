import Link from "next/link";

export default function NotFound() {
	return (
		<div className="container max-w-screen-xl px-4 md:px-8 py-32 text-center">
			<h1 className="text-6xl font-extrabold tracking-tight mb-4">404</h1>
			<p className="text-xl text-muted-foreground mb-8">
				Oops! The page you&apos;re looking for doesn&apos;t exist.
			</p>
			<Link
				href="/"
				className="inline-flex items-center justify-center rounded-none bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
			>
				Go back home
			</Link>
		</div>
	);
}
