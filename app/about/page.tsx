import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { Button, ButtonLink } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  MapPin,
  Code2,
  Brain,
  Sparkles,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description: `Learn more about ${siteConfig.author.name}, the author of ${siteConfig.name}.`,
};

const skills = [
  { name: "JavaScript/TypeScript", category: "Languages" },
  { name: "React", category: "Frontend" },
  { name: "Next.js", category: "Framework" },
  { name: "Node.js", category: "Backend" },
  { name: "Python", category: "Languages" },
  { name: "AI/ML", category: "Emerging" },
  { name: "PostgreSQL", category: "Database" },
  { name: "Tailwind CSS", category: "Styling" },
];

const timeline = [
  {
    year: "Present",
    title: "Full-Stack Developer & Blogger",
    description:
      "Building web applications and sharing knowledge through technical writing.",
  },
  {
    year: "Continuous",
    title: "Learning & Growing",
    description:
      "Always exploring new technologies, especially in AI and web development.",
  },
];

export default function AboutPage() {
  return (
    <div className="container max-w-screen-xl px-4 md:px-8 py-12 md:py-16">
      {/* Hero Section */}
      <section className="mb-16">
        <div className="grid md:grid-cols-[300px_1fr] gap-10 items-start">
          {/* Profile Image */}
          <div className="relative mx-auto md:mx-0">
            <div className="relative w-64 h-64 md:w-full md:h-auto md:aspect-square rounded-2xl overflow-hidden border-4 border-primary/20">
              <Image
                src={siteConfig.author.avatar || "/avatar.jpg"}
                alt={siteConfig.author.name}
                fill
                className="object-cover"
                priority
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/10 rounded-full blur-2xl" />
          </div>

          {/* Bio */}
          <div className="space-y-6">
            <div>
              <p className="text-primary font-medium mb-2">Hello, I&apos;m</p>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
                {siteConfig.author.name}
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                {siteConfig.author.bio}
              </p>
            </div>

            {/* Quick info */}
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                India
              </span>
              <span className="flex items-center gap-2">
                <Code2 className="h-4 w-4" />
                Full-Stack Developer
              </span>
            </div>

            {/* Social links */}
            <div className="flex flex-wrap gap-3">
              <ButtonLink
                variant="outline"
                size="sm"
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-4 w-4 mr-2" />
                GitHub
              </ButtonLink>
              <ButtonLink
                variant="outline"
                size="sm"
                href={siteConfig.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="h-4 w-4 mr-2" />
                LinkedIn
              </ButtonLink>
              <ButtonLink
                variant="outline"
                size="sm"
                href={siteConfig.links.twitter}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className="h-4 w-4 mr-2" />
                Twitter/X
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      {/* About the Blog */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6">About This Blog</h2>
        <Card>
          <CardContent className="p-6 space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">code & context</strong> is my
              personal corner of the internet where I share insights, tutorials,
              and reflections on the ever-evolving world of technology. The name
              reflects my belief that code doesn&apos;t exist in isolation—it&apos;s
              always embedded in a broader context of problems to solve, users to
              serve, and life to live.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Here you&apos;ll find deep dives into web development, explorations of
              AI and machine learning, programming tutorials, and occasionally,
              thoughts on life beyond the screen. I believe in learning in public
              and sharing knowledge freely.
            </p>
            <div className="flex flex-wrap gap-6 pt-4">
              <div className="flex items-center gap-2">
                <Code2 className="h-5 w-5 text-primary" />
                <span>Web Development</span>
              </div>
              <div className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary" />
                <span>AI & Machine Learning</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                <span>Life & Tech</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Skills */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Skills & Technologies</h2>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <Badge
              key={skill.name}
              variant="secondary"
              className="px-3 py-1.5 text-sm"
            >
              {skill.name}
            </Badge>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-12 px-6 rounded-2xl bg-gradient-to-br from-primary/5 via-transparent to-accent/5 border border-border">
        <h2 className="text-2xl font-bold mb-4">Let&apos;s Connect</h2>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          Have a question, want to collaborate, or just say hello? Feel free to
          reach out through any of my social channels.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/blog">
            <Button>
              Read the Blog
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
          <ButtonLink
            variant="outline"
            href={`mailto:${siteConfig.author.email}`}
          >
            <Mail className="h-4 w-4 mr-2" />
            Get in Touch
          </ButtonLink>
        </div>
      </section>
    </div>
  );
}
