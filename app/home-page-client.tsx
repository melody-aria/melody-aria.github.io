"use client"

import { useState, useMemo } from 'react'
import { useTheme } from 'next-themes'
import Link from "next/link"
import Image from "next/image"
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Leaf, Github, Home, BookOpen, MessageCircle, Code, Sun, Moon } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const categoryIcons = {
  "全部": <BookOpen className="h-5 w-5 mr-3 text-emerald-500" />,
  "博客": <BookOpen className="h-5 w-5 mr-3 text-emerald-500" />,
  "生活": <Home className="h-5 w-5 mr-3 text-emerald-500" />,
  "科技": <Code className="h-5 w-5 mr-3 text-emerald-500" />,
  "技术": <Code className="h-5 w-5 mr-3 text-emerald-500" />,
  "游戏": <MessageCircle className="h-5 w-5 mr-3 text-emerald-500" />,
  "知识": <BookOpen className="h-5 w-5 mr-3 text-emerald-500" />,
};

const getCategoryIcon = (categoryName) => {
  return categoryIcons[categoryName] || <Leaf className="h-5 w-5 mr-3 text-emerald-500" />;
};

export default function HomePageClient({ allPosts: blogPosts, popularPosts, allTags, allCategories }) {
  const [open, setOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState("");
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [selectedTag, setSelectedTag] = useState(null);
  const { theme, setTheme } = useTheme();

  const categories = [
    { name: "全部", icon: getCategoryIcon("全部") },
    { name: "博客", icon: getCategoryIcon("博客") },
    { name: "生活", icon: getCategoryIcon("生活") },
    { name: "科技", icon: getCategoryIcon("科技") },
    { name: "技术", icon: getCategoryIcon("技术") },
    { name: "游戏", icon: getCategoryIcon("游戏") },
    { name: "知识", icon: getCategoryIcon("知识") },
  ];

  const filteredPosts = useMemo(() => {
    let posts = blogPosts;
    
    // 按分类筛选
    if (selectedCategory !== '全部') {
      posts = posts.filter(post => post.category === selectedCategory);
    }
    
    // 按标签筛选
    if (selectedTag) {
      posts = posts.filter(post => post.tags && post.tags.includes(selectedTag));
    }
    
    return posts;
  }, [selectedCategory, selectedTag, blogPosts]);

  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName);
    setSelectedTag(null); // 切换分类时清除标签筛选
  };

  const handleTagClick = (tagName) => {
    setSelectedTag(selectedTag === tagName ? null : tagName);
  };

  return (
      <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-emerald-50 via-sky-50 to-teal-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* 动态背景 - 月光音乐主题 */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* 夜空渐变背景 */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-100/20 via-purple-100/15 to-blue-100/25 dark:from-slate-900/50 dark:via-indigo-900/40 dark:to-purple-900/45"></div>
        
        {/* 月亮 */}
        <div className="absolute top-16 right-20 w-24 h-24 bg-gradient-radial from-yellow-200/80 via-yellow-100/60 to-transparent dark:from-yellow-100/70 dark:via-yellow-50/50 dark:to-transparent rounded-full animate-moon-glow shadow-2xl shadow-yellow-200/30"></div>
        
        {/* 月光光束 */}
        <div className="absolute top-20 right-16 w-1 h-40 bg-gradient-to-b from-yellow-200/40 to-transparent dark:from-yellow-100/30 dark:to-transparent animate-moonbeam rotate-12"></div>
        <div className="absolute top-18 right-24 w-1 h-36 bg-gradient-to-b from-yellow-200/30 to-transparent dark:from-yellow-100/20 dark:to-transparent animate-moonbeam rotate-45" style={{animationDelay: '1s'}}></div>
         <div className="absolute top-22 right-12 w-1 h-32 bg-gradient-to-b from-yellow-200/35 to-transparent dark:from-yellow-100/25 dark:to-transparent animate-moonbeam -rotate-12" style={{animationDelay: '2s'}}></div>
        
        {/* 月光中的音符 */}
         <div className="absolute top-28 right-32 text-3xl text-yellow-300/60 dark:text-yellow-200/50 animate-moon-music">♪</div>
         <div className="absolute top-40 right-28 text-4xl text-yellow-400/60 dark:text-yellow-300/50 animate-moon-music" style={{animationDelay: '0.8s'}}>♫</div>
         <div className="absolute top-52 right-36 text-2xl text-yellow-200/60 dark:text-yellow-100/50 animate-moon-music" style={{animationDelay: '1.6s'}}>♬</div>
         
         {/* 飘散的音符 */}
         <div className="absolute top-20 left-10 text-4xl text-blue-300/50 dark:text-blue-200/40 animate-float-music">♪</div>
         <div className="absolute top-32 left-1/4 text-5xl text-indigo-300/50 dark:text-indigo-200/40 animate-moon-drift" style={{animationDelay: '1s'}}>♫</div>
         <div className="absolute bottom-40 left-1/3 text-3xl text-purple-300/50 dark:text-purple-200/40 animate-float-music" style={{animationDelay: '2s'}}>♬</div>
         <div className="absolute top-1/2 left-20 text-4xl text-cyan-300/50 dark:text-cyan-200/40 animate-moon-drift" style={{animationDelay: '3s'}}>♪</div>
         <div className="absolute bottom-20 left-10 text-5xl text-teal-300/50 dark:text-teal-200/40 animate-float-music" style={{animationDelay: '4s'}}>♫</div>
         
         {/* 月光波纹 */}
         <div className="absolute top-1/3 left-1/4 w-40 h-40 border-2 border-yellow-200/25 dark:border-yellow-100/20 rounded-full animate-moonlight-ripple"></div>
         <div className="absolute bottom-1/3 right-1/3 w-32 h-32 border-2 border-yellow-300/25 dark:border-yellow-200/20 rounded-full animate-moonlight-ripple" style={{animationDelay: '1.5s'}}></div>
         <div className="absolute top-1/2 left-1/2 w-48 h-48 border-2 border-yellow-100/20 dark:border-yellow-50/15 rounded-full animate-moonlight-ripple" style={{animationDelay: '3s'}}></div>
         
         {/* 星光音符轨迹 */}
         <div className="absolute top-1/4 right-1/2 text-2xl text-yellow-300/70 animate-starlight-trail">✦♪</div>
         <div className="absolute bottom-1/2 left-2/3 text-2xl text-yellow-200/70 animate-starlight-trail" style={{animationDelay: '2s'}}>✧♫</div>
         <div className="absolute top-2/3 right-1/4 text-2xl text-yellow-400/70 animate-starlight-trail" style={{animationDelay: '4s'}}>✦♬</div>
         
         {/* 月光五线谱 */}
         <div className="absolute bottom-1/4 left-1/3 w-40">
           <div className="w-full h-px bg-yellow-200/30 dark:bg-yellow-100/20 animate-moonlight-staff"></div>
           <div className="w-full h-px bg-yellow-200/30 dark:bg-yellow-100/20 animate-moonlight-staff mt-3" style={{animationDelay: '0.6s'}}></div>
           <div className="w-full h-px bg-yellow-200/30 dark:bg-yellow-100/20 animate-moonlight-staff mt-3" style={{animationDelay: '1.2s'}}></div>
           <div className="w-full h-px bg-yellow-200/30 dark:bg-yellow-100/20 animate-moonlight-staff mt-3" style={{animationDelay: '1.8s'}}></div>
           <div className="w-full h-px bg-yellow-200/30 dark:bg-yellow-100/20 animate-moonlight-staff mt-3" style={{animationDelay: '2.4s'}}></div>
         </div>
         
         {/* 月光光晕 */}
         <div className="absolute top-1/6 right-1/6 w-96 h-96 bg-gradient-radial from-yellow-200/15 via-yellow-100/8 to-transparent dark:from-yellow-100/12 dark:via-yellow-50/6 dark:to-transparent rounded-full animate-pulse"></div>
         <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-gradient-radial from-indigo-200/10 via-purple-100/5 to-transparent dark:from-indigo-100/8 dark:via-purple-50/4 dark:to-transparent rounded-full animate-pulse" style={{animationDelay: '3s'}}></div>
         
         {/* 夜空星点 */}
         <div className="absolute top-12 left-1/3 w-1 h-1 bg-yellow-200/80 dark:bg-yellow-100/70 rounded-full animate-twinkle"></div>
         <div className="absolute top-24 left-1/2 w-1 h-1 bg-yellow-300/80 dark:bg-yellow-200/70 rounded-full animate-twinkle" style={{animationDelay: '1s'}}></div>
         <div className="absolute top-36 left-2/3 w-1 h-1 bg-yellow-100/80 dark:bg-yellow-50/70 rounded-full animate-twinkle" style={{animationDelay: '2s'}}></div>
         <div className="absolute bottom-1/4 right-1/2 w-1 h-1 bg-yellow-200/80 dark:bg-yellow-100/70 rounded-full animate-twinkle" style={{animationDelay: '3s'}}></div>
         <div className="absolute bottom-1/3 right-2/3 w-1 h-1 bg-yellow-300/80 dark:bg-yellow-200/70 rounded-full animate-twinkle" style={{animationDelay: '4s'}}></div>
      </div>
      
      {/* 内容层 */}
      <div className="relative z-10">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="p-6 bg-white/40 backdrop-blur-sm rounded-lg shadow-lg border border-emerald-200 dark:bg-slate-800/40 dark:border-slate-600">
                {/* 主题切换按钮 */}
                <div className="flex justify-end mb-4">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                          className="bg-white/50 hover:bg-white/80 dark:bg-slate-700/50 dark:hover:bg-slate-700/80 border-emerald-200 dark:border-slate-600"
                        >
                          {theme === 'dark' ? (
                            <Sun className="h-4 w-4 text-yellow-500" />
                          ) : (
                            <Moon className="h-4 w-4 text-slate-600" />
                          )}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{theme === 'dark' ? '切换到白天模式' : '切换到夜间模式'}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="text-center mb-6">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden relative cursor-pointer" onClick={() => { setOpen(true); setImageSrc("/qingxian.png"); }}>
                    <Image
                      src="/qingxian.png"
                      alt="User Avatar"
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <h2 className="text-2xl font-bold text-emerald-800 dark:text-emerald-300">清月弦音</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Melody's Blog</p>
                </div>
                <div className="mt-6">
                  <TooltipProvider>
                    <div className="flex justify-center space-x-4">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <a href="https://github.com/melody-aria" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400">
                            <Github />
                          </a>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Github: melody-aria</p>
                        </TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button onClick={() => {
                            navigator.clipboard.writeText('APWanderer');
                            alert('微信号已复制!');
                          }} className="text-slate-500 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-wechat"><path d="M21 11.5c0-5.25-4.25-9.5-9.5-9.5S2 6.25 2 11.5c0 4.25 2.75 8 6.5 9.25c.5.1.5.35.5.5v1.5c0 .25.25.5.5.5h1c.25 0 .5-.25.5-.5v-1.5c0-.15.05-.3.1-.45c.5-.5 1.1-1 1.75-1.5c.5-.35 1.1-.7 1.75-1.05c.1-.05.15-.1.25-.15c.1-.05.2-.1.3-.15c.5-.25 1-.55 1.5-.9c.5-.35.95-.75 1.35-1.2c.4-.45.75-.95 1.05-1.5c.3-.55.5-1.15.6-1.8c.1-.65.15-1.3.15-2z"/></svg>
                          </button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>微信: APWanderer</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </TooltipProvider>
                </div>
                <div className="mt-6">
                  <nav>
                    <ul>
                      {categories.map((category) => (
                        <li key={category.name} className="mb-3">
                          <a
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              handleCategoryClick(category.name);
                            }}
                            className={`flex items-center p-3 rounded-lg transition-colors cursor-pointer ${selectedCategory === category.name ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300' : 'text-slate-600 hover:bg-emerald-50 dark:text-slate-300 dark:hover:bg-emerald-900/20'}`}
                          >
                            {category.icon}
                            {category.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
                <nav className="mt-6">
                  <ul>
                    <li className="mb-3">
                      <Link href="/about" className="flex items-center p-3 rounded-lg text-slate-600 hover:bg-emerald-50 dark:text-slate-300 dark:hover:bg-emerald-900/20 transition-colors">
                        <BookOpen className="h-5 w-5 mr-3 text-emerald-500" />
                        关于
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </aside>

            <main className="lg:col-span-2">
              <div className="space-y-8">
                {filteredPosts.map((post) => (
                  <Link key={post.slug} href={`/blog/${post.slug}`}>
                    <Card className="group transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-white/40 backdrop-blur-sm border-emerald-200 hover:border-emerald-300 dark:bg-slate-800/40 dark:border-slate-600 dark:hover:border-slate-500">
                      <div className={`grid ${post.image ? 'md:grid-cols-3' : 'grid-cols-1'}`}>
                        {post.image && (
                          <div className="md:col-span-1">
                            <Image
                              src={post.image}
                              alt={post.title}
                              width={300}
                              height={200}
                              className="w-full h-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none transition-transform duration-300 group-hover:scale-105 rounded-full"
                            />
                          </div>
                        )}
                        <div className={post.image ? "md:col-span-2" : "col-span-1"}>
                          <CardHeader>
                            <CardTitle className="text-xl text-slate-800 group-hover:text-emerald-700 dark:text-slate-200 dark:group-hover:text-emerald-400 transition-colors">
                              {post.title}
                            </CardTitle>
                            <div className="flex items-center gap-2 text-sm text-emerald-600 pt-2">
                              <Calendar className="h-4 w-4" />
                              <span>{post.date}</span>
                              <Clock className="h-4 w-4 ml-2" />
                              <span>{post.readTime}</span>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <CardDescription className="text-slate-600 dark:text-slate-300 line-clamp-3">
                              {post.description}
                            </CardDescription>
                            <div className="flex flex-wrap gap-2 mt-4">
                              {post.tags.map((tag) => (
                                <Badge
                                  key={tag}
                                  variant="secondary"
                                  className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 cursor-pointer"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleCategoryClick(tag);
                                  }}
                                >
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </CardContent>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </main>

            {/* Right Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-8">
                <div className="p-6 bg-white/40 backdrop-blur-sm rounded-lg shadow-lg border border-emerald-200 dark:bg-slate-800/40 dark:border-slate-600">
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">最新发布</h3>
                  <div className="space-y-4">
                    {popularPosts.map(post => (
                      <Link key={post.slug} href={`/blog/${post.slug}`} className="flex items-center group">
                        {post.image && (
                          <Image src={post.image} alt={post.title} width={80} height={64} className="w-20 h-16 object-cover rounded-full mr-4 flex-shrink-0" />
                        )}
                        <div className={!post.image ? 'w-full' : ''}>
                          <h4 className="font-semibold text-slate-700 group-hover:text-emerald-600 dark:text-slate-300 dark:group-hover:text-emerald-400 transition-colors line-clamp-2">{post.title}</h4>
                          <p className="text-sm text-slate-500 dark:text-slate-400">{post.date}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="mt-6 p-6 bg-white/40 backdrop-blur-sm rounded-lg shadow-lg border border-emerald-200 dark:bg-slate-800/40 dark:border-slate-600">
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">标签云</h3>
                  <div className="flex flex-wrap gap-2">
                    {allTags.map(tag => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className={`bg-sky-100 text-sky-700 dark:bg-emerald-900/30 dark:text-emerald-300 hover:bg-sky-200 dark:hover:bg-emerald-900/50 transition-colors cursor-pointer ${selectedTag === tag ? 'bg-emerald-200 text-emerald-800 dark:bg-emerald-800/50 dark:text-emerald-200' : ''}`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleTagClick(tag);
                        }}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Leaf className="h-6 w-6" />
            <p className="text-lg font-medium">Melody's Blog</p>
            <Leaf className="h-6 w-6" />
          </div>
          <p className="text-white/80">
            用心记录，用爱分享 © 2025
          </p>
        </div>
      </footer>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={[
          { src: imageSrc },
        ]}
      />
    </div>
  )
}