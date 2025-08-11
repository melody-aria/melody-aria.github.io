import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Leaf, Code, Palette, Heart, ArrowLeft } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-sky-50 to-teal-50">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-6">
          <Link href="/">
            <Button variant="outline" className="flex items-center gap-2 bg-white/80 backdrop-blur-sm border-emerald-200 hover:bg-emerald-50">
              <ArrowLeft className="h-4 w-4" />
              返回主页
            </Button>
          </Link>
        </div>
        <Card className="bg-white/80 backdrop-blur-sm border-emerald-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-slate-800 text-center">关于 清月弦音</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-lg max-w-none text-slate-700">
          <p className="text-center text-xl mb-8">欢迎来到我的数字花园，一个记录生活、分享知识和展示创意的空间。</p>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="p-6 bg-emerald-50 rounded-lg">
              <h3 className="flex items-center text-2xl font-semibold text-emerald-800 mb-4">
                <Leaf className="h-6 w-6 mr-3" />
                博客初衷
              </h3>
              <p>创建这个博客，是为了有一个安静的角落来存放我的思绪和感悟。无论是技术的探索、生活的点滴，还是游戏中的奇遇，我都希望通过文字将它们记录下来，与你分享。我相信，每一次记录都是一次成长，每一次分享都是一次连接。</p>
            </div>
            <div className="p-6 bg-sky-50 rounded-lg">
              <h3 className="flex items-center text-2xl font-semibold text-sky-800 mb-4">
                <Code className="h-6 w-6 mr-3" />
                技术栈
              </h3>
              <p>本博客基于以下技术构建：</p>
              <ul>
                <li><strong>框架:</strong> Next.js</li>
                <li><strong>UI 组件:</strong> shadcn/ui</li>
                <li><strong>样式:</strong> Tailwind CSS</li>
                <li><strong>内容:</strong> MDX</li>
                <li><strong>部署:</strong> Vercel</li>
              </ul>
            </div>
          </div>

          <div>
            <h3 className="flex items-center justify-center text-2xl font-semibold text-slate-800 mb-4">
              <Palette className="h-6 w-6 mr-3" />
              资源与声明
            </h3>
            <p>本站部分图片和图标资源来自网络，仅用于学习和交流。如有侵权，请联系我进行删除。所有原创内容，包括文章和代码，均采用 <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline">CC BY-NC-SA 4.0</a> 许可协议。欢迎转载，但请注明出处，并保持非商业性使用。</p>
          </div>

          <div className="text-center mt-12 border-t border-emerald-200 pt-8">
            <p className="flex items-center justify-center text-xl text-slate-600">
              <Heart className="h-6 w-6 mr-2 text-red-500" />
              感谢您的来访，愿你在这里找到片刻的宁静与欢喜。
            </p>
          </div>
        </CardContent>
        </Card>
      </div>
    </div>
  );
}