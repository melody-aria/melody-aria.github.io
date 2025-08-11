import { notFound } from "next/navigation"
import { getPostBySlug } from "@/lib/mdx"
import BlogPostClient from "./blog-post-client"

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return <BlogPostClient post={post} />
}