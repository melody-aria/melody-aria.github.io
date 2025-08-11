import { getAllPosts } from "@/lib/mdx"
import HomePageClient from "./home-page-client"

export default async function HomePage() {
  const blogPosts = await getAllPosts()

  const popularPosts = [...blogPosts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 8);
  const allTags = [...new Set(blogPosts.flatMap(post => post.tags))];
  const allCategories = [...new Set(blogPosts.map(post => post.category))];

  return <HomePageClient allPosts={blogPosts} popularPosts={popularPosts} allTags={allTags} allCategories={allCategories} />
}