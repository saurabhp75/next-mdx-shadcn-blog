import { Metadata } from "next";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
	title: "Privacy Policy",
	description: `Privacy policy for ${siteConfig.name}.`,
};

export default function PrivacyPage() {
	return (
		<div className="container max-w-screen-md px-4 md:px-8 py-12 md:py-16">
			<h1 className="text-4xl font-extrabold tracking-tight mb-8">
				Privacy Policy
			</h1>

			<div className="prose prose-neutral dark:prose-invert max-w-none">
				<p className="text-muted-foreground text-lg">
					Last updated: December 25, 2025
				</p>

				<h2>Introduction</h2>
				<p>
					Welcome to {siteConfig.name}. This Privacy Policy explains how we
					collect, use, and protect your information when you visit our website.
				</p>

				<h2>Information We Collect</h2>
				<p>We collect minimal information to improve your experience:</p>
				<ul>
					<li>
						<strong>Analytics Data:</strong> Basic usage statistics like page
						views and visit duration (no personal identification)
					</li>
					<li>
						<strong>Technical Data:</strong> Browser type, device type, and
						general location (country level)
					</li>
				</ul>

				<h2>How We Use Your Information</h2>
				<p>The information we collect is used to:</p>
				<ul>
					<li>Improve website content and user experience</li>
					<li>Understand which topics are most valuable to readers</li>
					<li>Fix technical issues and optimize performance</li>
				</ul>

				<h2>Cookies</h2>
				<p>
					We use essential cookies for site functionality and optional analytics
					cookies. You can control cookie preferences through your browser
					settings.
				</p>

				<h2>Third-Party Services</h2>
				<p>We may use the following third-party services:</p>
				<ul>
					<li>Vercel Analytics for basic site statistics</li>
					<li>GitHub for code hosting and comments (if enabled)</li>
				</ul>

				<h2>Your Rights</h2>
				<p>You have the right to:</p>
				<ul>
					<li>Access any personal data we hold about you</li>
					<li>Request deletion of your data</li>
					<li>Opt out of analytics tracking</li>
				</ul>

				<h2>Contact</h2>
				<p>
					If you have questions about this Privacy Policy, please reach out
					through any of the social links on the <a href="/about">About page</a>
					.
				</p>

				<h2>Changes to This Policy</h2>
				<p>
					We may update this Privacy Policy from time to time. Any changes will
					be posted on this page with an updated revision date.
				</p>
			</div>
		</div>
	);
}
