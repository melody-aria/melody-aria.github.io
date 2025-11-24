# 清月弦音 · 个人博客站点

一个基于 Next.js 15（App Router）与 MDX 的静态博客项目，使用 Tailwind CSS 与 shadcn/ui 构建界面，支持标签筛选、分页浏览、图片灯箱、脚注、表格等丰富的 Markdown/MDX 展示能力。项目通过 GitHub Actions 自动构建并部署到 GitHub Pages。

## 技术栈
- Next.js 15（App Router，静态导出 `output: 'export'`）
- React 19
- MDX（自定义渲染与全局 MDX 组件）
- Tailwind CSS + shadcn/ui 组件库
- next-themes（浅/深色主题切换）
- GitHub Actions + GitHub Pages

## 目录结构
- `melody-aria.github.io/app/`：应用入口与页面
  - `page.tsx`：主页，聚合文章、标签云、分类筛选、分页
  - `blog/[slug]/`：文章详情页，静态参数生成与内容渲染
  - `tags/[tag]/`：标签归档页面
  - `about/`：关于页面
- `melody-aria.github.io/content/`：博客文章源文件（`.mdx`）
- `melody-aria.github.io/components/`：UI 组件与 Markdown 渲染器
  - `markdown-renderer.tsx`：自定义 Markdown 解析与渲染
  - `ui/`：shadcn/ui 组件集合
- `melody-aria.github.io/lib/`：业务逻辑
  - `mdx.ts`：文章元数据解析、列表获取与详情读取
  - `utils.ts`：通用工具（例如 `cn` 合并类名）
- `melody-aria.github.io/public/`：静态资源（图片等）
- `melody-aria.github.io/next.config.mjs`：Next.js 配置（启用 MDX、静态导出、关闭构建期间的 lint/type 检查）
- `.github/workflows/deploy-pages.yml`：CI/CD 工作流（构建并部署到 GitHub Pages）

## 快速开始
- 环境要求
  - Node.js `>= 18`（推荐与 CI 一致，例如 22）
  - pnpm `>= 8`
- 安装依赖
  - 进入项目目录：`cd melody-aria.github.io`
  - 安装：`pnpm install`
- 本地开发
  - 启动开发：`pnpm dev`
  - 访问：`http://localhost:3000`
- 构建与静态导出
  - 构建：`pnpm build`
  - 产物目录：`melody-aria.github.io/out`
  - 可直接将 `out/` 发布到任何静态托管（Pages、Vercel 静态存储等）

## 内容写作指南（MDX）
- 文章文件放在 `melody-aria.github.io/content/`，以 `*.mdx` 命名
- 每篇文章头部需导出 `metadata`，示例：

```mdx
export const metadata = {
  title: "文章标题",
  date: "2025-01-01",
  description: "文章摘要简介",
  tags: ["JavaScript", "前端"],
  categories: ["技术"],
  image: "/placeholder.jpg" // 可选
}

正文从这里开始……
```

- 字段说明
  - `title`：标题
  - `date`：发布日期（`YYYY-MM-DD`）
  - `description`：摘要
  - `tags`：标签数组
  - `categories`：分类数组（支持多分类）
  - `image`：封面图（可选，展示于文章头图与列表卡片）

- 渲染能力概览
  - 代码块、内联代码、粗体、斜体、删除线
  - 表格（`|` 语法）
  - 脚注（形如 `[^ref]` 与定义 `[^ref]: 文本`）
  - 图片尺寸控制（在图片 title 位置支持 `300x200` 或 `width:400px/50%`）
  - `<details><summary>…</summary>…</details>` 折叠内容
  - `<video src="..." controls width="..." />` 视频

## 页面与路由
- 主页：`melody-aria.github.io/app/page.tsx`
  - 读取文章列表与标签集合，展示卡片、标签云、分页和主题切换
  - 参考：`melody-aria.github.io/app/page.tsx:4`
- 文章详情：`melody-aria.github.io/app/blog/[slug]/page.tsx`
  - 通过静态参数生成所有文章路径
  - 参考：`melody-aria.github.io/app/blog/[slug]/page.tsx:12`
- 标签页：`melody-aria.github.io/app/tags/[tag]/page.tsx`
  - 按标签筛选文章并静态导出
  - 参考：`melody-aria.github.io/app/tags/[tag]/page.tsx:9`
- 关于页：`melody-aria.github.io/app/about/page.tsx`

## 文章数据模型与渲染
- 列表与详情
  - 获取所有文章：`melody-aria.github.io/lib/mdx.ts:66`（`getAllPosts`）
  - 获取单篇文章：`melody-aria.github.io/lib/mdx.ts:109`（`getPostBySlug`）
- Markdown 渲染器
  - 入口：`melody-aria.github.io/components/markdown-renderer.tsx:148`
  - 支持脚注、表格、图片尺寸、details、视频、任务列表等
- 全局 MDX 组件风格
  - 入口：`melody-aria.github.io/mdx-components.tsx:4`

## 部署到 GitHub Pages
- CI 工作流：`.github/workflows/deploy-pages.yml`
  - 触发：推送到 `main` 分支或手动运行
  - 步骤：检出 → 设置 pnpm/Node → 安装 → 构建（导出到 `out/`）→ 上传产物 → 部署到 Pages
- 站点设置
  - 在仓库 Settings → Pages 中，选择从 GitHub Actions 部署

## 常用命令
- `pnpm dev`：本地开发
- `pnpm build`：构建并静态导出到 `out/`
- `pnpm start`：启动生产服务（非静态导出场景）
- `pnpm lint`：运行 ESLint

## 已知注意事项
- 分类字段为数组 `categories`（模型定义见 `melody-aria.github.io/lib/mdx.ts:12`）。
  - 主页分类聚合处使用了 `post.category` 字段：`melody-aria.github.io/app/page.tsx:11`
  - 实际应基于 `post.categories` 做聚合/筛选（当前筛选逻辑已按数组处理，见 `melody-aria.github.io/app/home-page-client.tsx:59`）
- `next.config.mjs` 关闭了构建期间的 lint/type 错误阻断（`ignoreDuringBuilds` 与 `ignoreBuildErrors`）。若需严格检查，可开启相应开关并在 CI 中执行 lint/typecheck。

## 许可与声明
- 原创内容与文章采用 CC BY-NC-SA 4.0（详见关于页）。
- 站点图片与图标多来源于网络，仅供学习交流，如有侵权可联系删除。