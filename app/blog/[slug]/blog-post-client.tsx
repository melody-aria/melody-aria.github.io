"use client"

import { useState, useEffect } from "react";
import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, Leaf, Heart } from 'lucide-react'
import MarkdownRenderer from "@/components/markdown-renderer"
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { BlogPost } from "@/lib/mdx";

interface BlogPostClientProps {
  post: BlogPost;
}

export default function BlogPostClient({ post }: BlogPostClientProps) {
  const [open, setOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    if (!post) return;

    const articleContent = document.getElementById('article-content');
    if (!articleContent) return;

    const images = articleContent.querySelectorAll('img');
    const handleClick = (e) => {
      setOpen(true);
      setImageSrc(e.target.src);
    };

    images.forEach(img => {
      img.style.cursor = 'pointer';
      img.addEventListener('click', handleClick);
    });

    return () => {
      images.forEach(img => {
        img.removeEventListener('click', handleClick);
      });
    };
  }, [post]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-sky-50 to-teal-50">
      {/* Header */}
      <header className="relative overflow-hidden bg-gradient-to-r from-emerald-400 via-teal-400 to-sky-400 py-8">
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: "url('/ghibli-clouds.png')" }}></div>
        <div className="relative container mx-auto px-4">
          <Link href="/">
            <Button variant="ghost" className="text-white hover:bg-white/20 mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              返回首页
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Image */}
      {post.image && (
        <div className="relative h-96 overflow-hidden cursor-pointer" onClick={() => { setOpen(true); setImageSrc(post.image); }}>
          <Image
            src={post.image}
            alt={post.title}
            width={1200}
            height={600}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          <div className="absolute bottom-8 left-8 text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 text-white/90">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{post.date}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {!post.image && (
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-slate-800">{post.title}</h1>
              <div className="flex items-center justify-center gap-4 text-slate-500">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{post.date}</span>
                </div>
              </div>
            </div>
          )}
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
              >
                {tag}
              </Badge>
            ))}
          </div>

          {/* Article Content */}
          <article className="prose prose-lg prose-emerald max-w-none">
            <div id="article-content" className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-emerald-200">
              <MarkdownRenderer content={post.content} />
            </div>
          </article>

          <Lightbox
            open={open}
            close={() => setOpen(false)}
            slides={[{ src: imageSrc }]}
          />

          {/* Like Button */}
          <div className="mt-12 text-center">
            <Button className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
              <Heart className="h-5 w-5 mr-2" />
              喜欢这篇文章
            </Button>
          </div>

          {/* Navigation */}
          <div className="mt-16 pt-8 border-t border-emerald-200">
            <Link href="/">
              <Button variant="outline" className="border-emerald-300 text-emerald-700 hover:bg-emerald-50">
                <Leaf className="h-4 w-4 mr-2" />
                查看更多文章
              </Button>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Leaf className="h-6 w-6" />
            <p className="text-lg font-medium">森之博客</p>
            <Leaf className="h-6 w-6" />
          </div>
          <p className="text-white/80">
            用心记录，用爱分享 © 2024
          </p>
        </div>
      </footer>
    </div>
  )
}
