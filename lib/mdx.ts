import fs from 'fs';
import path from 'path';

// 定义博客文章的类型
export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description: string;
  readTime?: string;
  tags: string[];
  category: string; // 添加 category 字段
  image: string | null;
  content?: string;
}

// 内容目录路径
const contentDirectory = path.join(process.cwd(), 'content');

// 辅助函数：从文件内容中提取元数据
function extractMetadata(content: string): Omit<BlogPost, 'slug' | 'readTime' | 'content'> {
  try {
    const metadataMatch = content.match(/export const metadata = {([\s\S]*?)}/);
    if (metadataMatch) {
      const metadataString = `{${metadataMatch[1]}}`;
      // 使用 Function 构造函数来安全地解析对象字符串
      const metadata = new Function(`return ${metadataString}`)();
      return {
        title: metadata.title || 'Untitled',
        date: metadata.date || new Date().toISOString().split('T')[0],
        description: metadata.description || '',
        tags: metadata.tags || [],
        category: metadata.category || '未分类',
        image: metadata.image || null,
      };
    }
  } catch (e) {
    console.error("Error parsing metadata:", e);
  }
  
  // 如果解析失败，返回默认值
  return {
    title: 'Untitled',
    date: new Date().toISOString().split('T')[0],
    description: '',
    tags: [],
    category: '未分类',
    image: null,
  };
}

/**
 * 获取所有博客文章的元数据
 */
export async function getAllPosts(): Promise<BlogPost[]> {
  // 读取content目录下的所有.mdx文件
  const filenames = fs.readdirSync(contentDirectory);
  const mdxFiles = filenames.filter(filename => filename.endsWith('.mdx'));
  
  // 解析每个文件的元数据
  const posts = mdxFiles.map(filename => {
    // 获取文件路径
    const filePath = path.join(contentDirectory, filename);
    // 读取文件内容
    const fileContents = fs.readFileSync(filePath, 'utf8');
    // 提取元数据
    const data = extractMetadata(fileContents);
    
    // 从文件名中提取slug（去掉.mdx扩展名）
    const slug = filename.replace(/\.mdx$/, '');
    
    // 估算阅读时间（假设每分钟阅读200个单词）
    const contentWithoutMetadata = fileContents.replace(/export const metadata = {[^}]+}/, '').trim();
    const wordCount = contentWithoutMetadata.split(/\s+/).length;
    const readTime = `${Math.max(1, Math.ceil(wordCount / 200))} 分钟`;
    
    // 返回文章元数据
    return {
      slug,
      ...data,
      readTime,
    };
  });
  
  // 按日期排序（最新的文章排在前面）
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * 根据slug获取单篇博客文章的完整内容
 */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    // 构建文件路径
    const filePath = path.join(contentDirectory, `${slug}.mdx`);
    
    // 检查文件是否存在
    if (!fs.existsSync(filePath)) {
      return null;
    }
    
    // 读取文件内容
    const fileContents = fs.readFileSync(filePath, 'utf8');
    
    // 提取元数据
    const data = extractMetadata(fileContents);
    
    // 提取内容
    const content = fileContents.replace(/export const metadata = {[^}]+}/, '').trim();
    
    // 估算阅读时间
    const wordCount = content.split(/\s+/).length;
    const readTime = `${Math.max(1, Math.ceil(wordCount / 200))} 分钟`;
    
    // 返回文章完整信息
    return {
      slug,
      ...data,
      readTime,
      content,
    };
  } catch (error) {
    console.error(`Error getting post by slug ${slug}:`, error);
    return null;
  }
}