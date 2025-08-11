import { notFound } from "next/navigation"
import { getPostBySlug, getAllPosts } from "@/lib/mdx"
import BlogPostClient from "./blog-post-client"

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

// 生成静态参数，用于静态导出
export async function generateStaticParams() {
  const posts = await getAllPosts()
  
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return <BlogPostClient post={post} />
}