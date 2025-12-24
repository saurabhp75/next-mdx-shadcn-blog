import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const postsDirectory = path.join(process.cwd(), "content/blog");

export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated?: string;
  author: string;
  image?: string;
  tags: string[];
  category: string;
  readingTime: string;
  published: boolean;
}

export interface Post extends PostMeta {
  content: string;
}

function ensureDirectoryExists() {
  if (!fs.existsSync(postsDirectory)) {
    fs.mkdirSync(postsDirectory, { recursive: true });
  }
}

export function getAllPosts(): PostMeta[] {
  ensureDirectoryExists();

  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title || "Untitled",
        description: data.description || "",
        date: data.date || new Date().toISOString(),
        updated: data.updated,
        author: data.author || "Saurabh Prakash",
        image: data.image,
        tags: data.tags || [],
        category: data.category || "General",
        readingTime: readingTime(content).text,
        published: data.published !== false,
      } as PostMeta;
    })
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return allPostsData;
}

export function getPostBySlug(slug: string): Post | null {
  ensureDirectoryExists();

  const fullPath = path.join(postsDirectory, `${slug}.mdx`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: data.title || "Untitled",
    description: data.description || "",
    date: data.date || new Date().toISOString(),
    updated: data.updated,
    author: data.author || "Saurabh Prakash",
    image: data.image,
    tags: data.tags || [],
    category: data.category || "General",
    readingTime: readingTime(content).text,
    published: data.published !== false,
    content,
  };
}

export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tagsSet = new Set<string>();
  posts.forEach((post) => post.tags.forEach((tag) => tagsSet.add(tag)));
  return Array.from(tagsSet).sort();
}

export function getAllCategories(): string[] {
  const posts = getAllPosts();
  const categoriesSet = new Set<string>();
  posts.forEach((post) => categoriesSet.add(post.category));
  return Array.from(categoriesSet).sort();
}

export function getPostsByTag(tag: string): PostMeta[] {
  return getAllPosts().filter((post) =>
    post.tags.map((t) => t.toLowerCase()).includes(tag.toLowerCase())
  );
}

export function getPostsByCategory(category: string): PostMeta[] {
  return getAllPosts().filter(
    (post) => post.category.toLowerCase() === category.toLowerCase()
  );
}

export function getAllPostSlugs(): string[] {
  ensureDirectoryExists();

  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map((fileName) => fileName.replace(/\.mdx$/, ""));
}
