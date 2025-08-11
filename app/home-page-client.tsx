"use client"

import { useState, useMemo, useEffect } from 'react'
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
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // 确保组件在客户端挂载后才渲染动态内容
  useEffect(() => {
    setMounted(true);
  }, []);

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
        <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
       {/* 增强的动态背景效果 */}
       <div className="fixed inset-0 overflow-hidden pointer-events-none">
         {/* 背景层 */}
         <div className="absolute inset-0 bg-gradient-to-b from-slate-900/20 via-slate-800/15 to-slate-900/20 dark:from-slate-950/80 dark:via-slate-900/70 dark:to-slate-950/80" />
         
         {mounted && (
           <>
             {/* 夜间模式 - 月亮音乐主题 */}
             {theme === 'dark' && (
               <>
                 {/* 月亮主体 - 增强发光效果 */}
                 <div className="absolute top-16 right-16 w-24 h-24 bg-gradient-radial from-yellow-200 via-yellow-300 to-yellow-400 rounded-full animate-moon-phase shadow-2xl">
                   <div className="absolute inset-0 rounded-full animate-moon-glow" />
                   {/* 月亮表面纹理 */}
                   <div className="absolute top-2 left-3 w-2 h-2 bg-yellow-500 rounded-full opacity-60" />
                   <div className="absolute top-6 right-4 w-1.5 h-1.5 bg-yellow-500 rounded-full opacity-40" />
                   <div className="absolute bottom-4 left-6 w-1 h-1 bg-yellow-500 rounded-full opacity-50" />
                 </div>
                 
                 {/* 月光光束 - 增强效果 */}
                 {[...Array(8)].map((_, i) => (
                   <div
                     key={`moonbeam-${i}`}
                     className="absolute top-20 right-20 w-1 bg-gradient-to-b from-yellow-200/40 via-yellow-300/20 to-transparent animate-moonbeam"
                     style={{
                       height: '400px',
                       transform: `rotate(${i * 45}deg)`,
                       transformOrigin: 'top center',
                       animationDelay: `${i * 0.3}s`,
                     }}
                   />
                 ))}
                 
                 {/* 音符元素 - 夜间版本 */}
                 {[...Array(12)].map((_, i) => {
                   const pseudoRandom = (Math.sin(i * 12.9898) * 43758.5453) % 1;
                   const fontSize = 1.2 + Math.abs(pseudoRandom) * 0.8;
                   const topPosition = 30 + Math.sin(i) * 20;
                   
                   return (
                     <div
                       key={`note-${i}`}
                       className="absolute text-yellow-300/70 animate-bounce-music"
                       style={{
                         left: `${20 + (i * 8)}%`,
                         top: `${topPosition}%`,
                         fontSize: `${fontSize}rem`,
                         animationDelay: `${i * 0.2}s`,
                       }}
                     >
                       {['♪', '♫', '♬', '♩', '♭', '♯'][i % 6]}
                     </div>
                   );
                 })}
                 
                 {/* 音乐波浪效果 - 夜间版本 */}
                 {[...Array(6)].map((_, i) => (
                   <div
                     key={`wave-${i}`}
                     className="absolute left-10 bg-gradient-to-r from-blue-400/30 to-purple-400/30 animate-music-wave"
                     style={{
                       top: `${40 + i * 8}%`,
                       width: `${60 + i * 10}px`,
                       height: '3px',
                       borderRadius: '2px',
                       animationDelay: `${i * 0.1}s`,
                     }}
                   />
                 ))}
                 
                 {/* 月光波纹 - 增强效果 */}
                 {[...Array(5)].map((_, i) => (
                   <div
                     key={`ripple-${i}`}
                     className="absolute top-20 right-20 border-2 border-yellow-300/30 rounded-full animate-moonlight-ripple"
                     style={{
                       width: `${100 + i * 40}px`,
                       height: `${100 + i * 40}px`,
                       animationDelay: `${i * 0.8}s`,
                     }}
                   />
                 ))}
                 
                 {/* 星光音符轨迹 - 增强效果 */}
                 {[...Array(8)].map((_, i) => (
                   <div
                     key={`star-trail-${i}`}
                     className="absolute text-blue-300/80 animate-starlight-trail"
                     style={{
                       right: `${10 + i * 12}%`,
                       top: `${20 + i * 8}%`,
                       fontSize: '1.5rem',
                       animationDelay: `${i * 0.4}s`,
                     }}
                   >
                     ✦
                   </div>
                 ))}
                 
                 {/* 星座连线效果 */}
                 {[...Array(4)].map((_, i) => (
                   <div
                     key={`constellation-${i}`}
                     className="absolute animate-constellation"
                     style={{
                       left: `${15 + i * 20}%`,
                       top: `${15 + i * 15}%`,
                       animationDelay: `${i * 2}s`,
                     }}
                   >
                     <div className="relative">
                       <div className="w-2 h-2 bg-blue-300 rounded-full animate-star-pulse" />
                       <div className="absolute top-1 left-1 w-8 h-0.5 bg-gradient-to-r from-blue-300/60 to-transparent rotate-45" />
                       <div className="absolute top-1 left-1 w-6 h-0.5 bg-gradient-to-r from-blue-300/40 to-transparent -rotate-12" />
                     </div>
                   </div>
                 ))}
                 
                 {/* 流星效果 */}
                 {[...Array(3)].map((_, i) => (
                   <div
                     key={`shooting-star-${i}`}
                     className="absolute w-1 h-1 bg-white rounded-full animate-shooting-star"
                     style={{
                       right: `${20 + i * 30}%`,
                       top: `${10 + i * 20}%`,
                       animationDelay: `${i * 3 + 2}s`,
                       boxShadow: '0 0 6px rgba(255,255,255,0.3), 0 0 12px rgba(255,255,255,0.2), 0 0 18px rgba(255,255,255,0.1)',
                     }}
                   >
                     <div className="absolute -left-8 top-0 w-8 h-0.5 bg-gradient-to-r from-white to-transparent" />
                   </div>
                 ))}
                 
                 {/* 月光五线谱 - 增强效果 */}
                 {[...Array(5)].map((_, i) => (
                   <div
                     key={`staff-${i}`}
                     className="absolute left-1/4 w-1/2 h-0.5 bg-gradient-to-r from-transparent via-yellow-300/40 to-transparent animate-moonlight-staff"
                     style={{
                       top: `${60 + i * 4}%`,
                       animationDelay: `${i * 0.3}s`,
                     }}
                   />
                 ))}
                 
                 {/* 夜空星点 - 增强闪烁效果 */}
                 {[...Array(25)].map((_, i) => {
                   const pseudoRandomX = (Math.sin(i * 12.9898) * 43758.5453) % 1;
                   const pseudoRandomY = (Math.sin(i * 78.233) * 43758.5453) % 1;
                   const pseudoRandomDelay = (Math.sin(i * 45.164) * 43758.5453) % 1;
                   const pseudoRandomOpacity = (Math.sin(i * 23.456) * 43758.5453) % 1;
                   
                   return (
                     <div
                       key={`star-${i}`}
                       className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
                       style={{
                         left: `${Math.abs(pseudoRandomX) * 100}%`,
                         top: `${Math.abs(pseudoRandomY) * 100}%`,
                         animationDelay: `${Math.abs(pseudoRandomDelay) * 3}s`,
                         opacity: 0.2 + Math.abs(pseudoRandomOpacity) * 0.4,
                       }}
                     />
                   );
                 })}
                 
                 {/* 月光光晕 */}
                 <div className="absolute top-8 right-8 w-40 h-40 bg-gradient-radial from-yellow-200/20 via-yellow-300/10 to-transparent rounded-full animate-pulse" />
               </>
             )}

             {/* 白天模式 - 太阳音乐主题 */}
             {theme === 'light' && (
               <>
                 {/* 太阳主体 - 温暖发光效果 */}
                 <div className="absolute top-16 right-16 w-28 h-28 bg-gradient-radial from-orange-300 via-yellow-400 to-orange-500 rounded-full animate-sun-rotation shadow-2xl">
                   <div className="absolute inset-0 rounded-full animate-sun-glow" />
                   {/* 太阳光芒 */}
                   {[...Array(12)].map((_, i) => (
                     <div
                       key={`sun-ray-${i}`}
                       className="absolute w-1 h-8 bg-gradient-to-t from-orange-400/60 to-yellow-300/80 rounded-full animate-sun-rays"
                       style={{
                         top: '-16px',
                         left: '50%',
                         transformOrigin: '50% 30px',
                         transform: `translateX(-50%) rotate(${i * 30}deg)`,
                         animationDelay: `${i * 0.1}s`,
                       }}
                     />
                   ))}
                 </div>
                 
                 {/* 阳光光束 - 温暖效果 */}
                 {[...Array(6)].map((_, i) => (
                   <div
                     key={`sunbeam-${i}`}
                     className="absolute top-20 right-20 w-2 bg-gradient-to-b from-orange-300/30 via-yellow-400/20 to-transparent animate-sunbeam"
                     style={{
                       height: '350px',
                       transform: `rotate(${i * 60}deg)`,
                       transformOrigin: 'top center',
                       animationDelay: `${i * 0.4}s`,
                     }}
                   />
                 ))}
                 
                 {/* 音符元素 - 白天版本 */}
                 {[...Array(15)].map((_, i) => {
                   const pseudoRandom = (Math.sin(i * 12.9898) * 43758.5453) % 1;
                   const fontSize = 1.0 + Math.abs(pseudoRandom) * 1.0;
                   const topPosition = 25 + Math.sin(i) * 25;
                   
                   return (
                     <div
                       key={`sun-note-${i}`}
                       className="absolute text-orange-500/70 animate-float-music"
                       style={{
                         left: `${15 + (i * 6)}%`,
                         top: `${topPosition}%`,
                         fontSize: `${fontSize}rem`,
                         animationDelay: `${i * 0.15}s`,
                       }}
                     >
                       {['♪', '♫', '♬', '♩', '♭', '♯', '𝄞'][i % 7]}
                     </div>
                   );
                 })}
                 
                 {/* 音乐光波效果 - 白天版本 */}
                 {[...Array(8)].map((_, i) => (
                   <div
                     key={`light-wave-${i}`}
                     className="absolute left-8 bg-gradient-to-r from-orange-400/20 via-yellow-400/30 to-orange-400/20 animate-light-wave"
                     style={{
                       top: `${35 + i * 6}%`,
                       width: `${80 + i * 15}px`,
                       height: '2px',
                       borderRadius: '1px',
                       animationDelay: `${i * 0.2}s`,
                     }}
                   />
                 ))}
                 
                 {/* 太阳光环 - 音乐节拍效果 */}
                 {[...Array(4)].map((_, i) => (
                   <div
                     key={`sun-ring-${i}`}
                     className="absolute top-20 right-20 border-2 border-orange-400/25 rounded-full animate-sun-pulse"
                     style={{
                       width: `${120 + i * 50}px`,
                       height: `${120 + i * 50}px`,
                       animationDelay: `${i * 0.6}s`,
                     }}
                   />
                 ))}
                 
                 {/* 音符轨迹 - 阳光版本 */}
                 {[...Array(10)].map((_, i) => (
                   <div
                     key={`sun-trail-${i}`}
                     className="absolute text-yellow-600/60 animate-sunny-trail"
                     style={{
                       right: `${8 + i * 10}%`,
                       top: `${18 + i * 7}%`,
                       fontSize: '1.3rem',
                       animationDelay: `${i * 0.3}s`,
                     }}
                   >
                     ☀
                   </div>
                 ))}
                 
                 {/* 音乐五线谱 - 阳光版本 */}
                 {[...Array(5)].map((_, i) => (
                   <div
                     key={`sun-staff-${i}`}
                     className="absolute left-1/4 w-1/2 h-0.5 bg-gradient-to-r from-transparent via-orange-400/30 to-transparent animate-sunny-staff"
                     style={{
                       top: `${65 + i * 3}%`,
                       animationDelay: `${i * 0.25}s`,
                     }}
                   />
                 ))}
                 
                 {/* 温暖粒子效果 */}
                 {[...Array(20)].map((_, i) => {
                   const pseudoRandomX = (Math.sin(i * 15.7898) * 43758.5453) % 1;
                   const pseudoRandomY = (Math.sin(i * 82.233) * 43758.5453) % 1;
                   const pseudoRandomDelay = (Math.sin(i * 48.164) * 43758.5453) % 1;
                   const pseudoRandomOpacity = (Math.sin(i * 26.456) * 43758.5453) % 1;
                   
                   return (
                     <div
                       key={`warm-particle-${i}`}
                       className="absolute w-1.5 h-1.5 bg-orange-300/50 rounded-full animate-warm-float"
                       style={{
                         left: `${Math.abs(pseudoRandomX) * 100}%`,
                         top: `${Math.abs(pseudoRandomY) * 100}%`,
                         animationDelay: `${Math.abs(pseudoRandomDelay) * 4}s`,
                         opacity: 0.3 + Math.abs(pseudoRandomOpacity) * 0.4,
                       }}
                     />
                   );
                 })}
                 
                 {/* 太阳光晕 */}
                 <div className="absolute top-8 right-8 w-48 h-48 bg-gradient-radial from-orange-200/15 via-yellow-300/10 to-transparent rounded-full animate-pulse" />
               </>
             )}
           </>
         )}
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
                            if (typeof window !== 'undefined' && navigator.clipboard) {
                              navigator.clipboard.writeText('APWanderer');
                              alert('微信号已复制!');
                            }
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