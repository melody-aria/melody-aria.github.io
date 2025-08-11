import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "@/lib/mdx";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Tag } from 'lucide-react';

// 生成静态参数，用于静态导出
export async function generateStaticParams() {
  const allPosts = await getAllPosts();
  const allTags = new Set<string>();
  
  // 收集所有标签
  allPosts.forEach(post => {
    post.tags.forEach(tag => allTags.add(tag));
  });
  
  return Array.from(allTags).map((tag) => ({
    tag: encodeURIComponent(tag),
  }));
}

export default async function TagPage({ params }: { params: { tag: string } }) {
  const tag = decodeURIComponent(params.tag);
  const allPosts = await getAllPosts();
  const filteredPosts = allPosts.filter(post => post.tags.includes(tag));

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8 text-center">
        <h1 className="flex items-center justify-center text-3xl font-bold text-slate-800">
          <Tag className="h-8 w-8 mr-3 text-emerald-600" />
          分类：{tag}
        </h1>
        <p className="text-slate-500 mt-2">共找到 {filteredPosts.length} 篇文章</p>
      </div>

      {filteredPosts.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <Card className="group transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-white/80 backdrop-blur-sm border-emerald-200 hover:border-emerald-300 h-full flex flex-col">
                {post.image && (
                  <div className="relative h-48 w-full">
                    <Image
                      src={post.image}
                      alt={post.title}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-t-lg transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="p-6 flex flex-col flex-grow">
                  <CardHeader className="p-0 mb-4">
                    <CardTitle className="text-xl text-slate-800 group-hover:text-emerald-700 transition-colors">
                      {post.title}
                    </CardTitle>
                    <div className="flex items-center gap-2 text-sm text-emerald-600 pt-2">
                      <Calendar className="h-4 w-4" />
                      <span>{post.date}</span>
                      <Clock className="h-4 w-4 ml-2" />
                      <span>{post.readTime}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0 flex-grow">
                    <CardDescription className="text-slate-600 line-clamp-3">
                      {post.description}
                    </CardDescription>
                  </CardContent>
                  <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-emerald-100">
                    {post.tags.map((t) => (
                      <Badge
                        key={t}
                        variant={t === tag ? "default" : "secondary"}
                        className={t === tag 
                          ? "bg-emerald-600 text-white"
                          : "bg-sky-100 text-sky-700 hover:bg-sky-200"
                        }
                      >
                        {t}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-xl text-slate-600">该分类下还没有文章哦！</p>
        </div>
      )}
    </div>
  );
}