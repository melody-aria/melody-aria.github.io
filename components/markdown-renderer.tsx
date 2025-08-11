import React from 'react';
import Image from 'next/image';

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  // 将内容按行分割
  const lines = content.split('\n');
  
  // 处理Markdown内容
  const renderContent = () => {
    const result: JSX.Element[] = [];
    let currentList: JSX.Element[] = [];
    let inOrderedList = false;
    let inUnorderedList = false;
    let listKey = 0;

    // 处理每一行
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const key = `line-${i}`;

      // 处理标题
      if (line.startsWith('# ')) {
        // 如果之前在列表中，先结束列表
        if (inOrderedList) {
          result.push(<ol key={`ol-${listKey++}`} className="list-decimal list-inside mb-4 text-slate-700">{currentList}</ol>);
          currentList = [];
          inOrderedList = false;
        } else if (inUnorderedList) {
          result.push(<ul key={`ul-${listKey++}`} className="list-disc list-inside mb-4 text-slate-700">{currentList}</ul>);
          currentList = [];
          inUnorderedList = false;
        }
        
        result.push(<h1 key={key} className="text-3xl font-bold text-emerald-800 mb-6">{line.slice(2)}</h1>);
      } 
      // 处理二级标题
      else if (line.startsWith('## ')) {
        // 如果之前在列表中，先结束列表
        if (inOrderedList) {
          result.push(<ol key={`ol-${listKey++}`} className="list-decimal list-inside mb-4 text-slate-700">{currentList}</ol>);
          currentList = [];
          inOrderedList = false;
        } else if (inUnorderedList) {
          result.push(<ul key={`ul-${listKey++}`} className="list-disc list-inside mb-4 text-slate-700">{currentList}</ul>);
          currentList = [];
          inUnorderedList = false;
        }
        
        result.push(<h2 key={key} className="text-2xl font-semibold text-emerald-700 mb-4 mt-8">{line.slice(3)}</h2>);
      } 
      // 处理三级标题
      else if (line.startsWith('### ')) {
        // 如果之前在列表中，先结束列表
        if (inOrderedList) {
          result.push(<ol key={`ol-${listKey++}`} className="list-decimal list-inside mb-4 text-slate-700">{currentList}</ol>);
          currentList = [];
          inOrderedList = false;
        } else if (inUnorderedList) {
          result.push(<ul key={`ul-${listKey++}`} className="list-disc list-inside mb-4 text-slate-700">{currentList}</ul>);
          currentList = [];
          inUnorderedList = false;
        }
        
        result.push(<h3 key={key} className="text-xl font-medium text-emerald-600 mb-3 mt-6">{line.slice(4)}</h3>);
      } 
      // 处理引用
      else if (line.startsWith('> ')) {
        // 如果之前在列表中，先结束列表
        if (inOrderedList) {
          result.push(<ol key={`ol-${listKey++}`} className="list-decimal list-inside mb-4 text-slate-700">{currentList}</ol>);
          currentList = [];
          inOrderedList = false;
        } else if (inUnorderedList) {
          result.push(<ul key={`ul-${listKey++}`} className="list-disc list-inside mb-4 text-slate-700">{currentList}</ul>);
          currentList = [];
          inUnorderedList = false;
        }
        
        result.push(
          <blockquote key={key} className="border-l-4 border-emerald-300 bg-emerald-50 p-4 my-4 italic text-emerald-800">
            {line.slice(2)}
          </blockquote>
        );
      } 
      // 处理无序列表
      else if (line.startsWith('- ')) {
        // 如果之前在有序列表中，先结束有序列表
        if (inOrderedList) {
          result.push(<ol key={`ol-${listKey++}`} className="list-decimal list-inside mb-4 text-slate-700">{currentList}</ol>);
          currentList = [];
          inOrderedList = false;
        }
        
        // 添加到无序列表
        currentList.push(<li key={key} className="mb-2">{line.slice(2)}</li>);
        inUnorderedList = true;
        
        // 如果是最后一行或下一行不是无序列表，结束当前列表
        if (i === lines.length - 1 || !lines[i + 1].startsWith('- ')) {
          result.push(<ul key={`ul-${listKey++}`} className="list-disc list-inside mb-4 text-slate-700">{currentList}</ul>);
          currentList = [];
          inUnorderedList = false;
        }
      } 
      // 处理有序列表
      else if (line.match(/^\d+\. /)) {
        // 如果之前在无序列表中，先结束无序列表
        if (inUnorderedList) {
          result.push(<ul key={`ul-${listKey++}`} className="list-disc list-inside mb-4 text-slate-700">{currentList}</ul>);
          currentList = [];
          inUnorderedList = false;
        }
        
        // 添加到有序列表
        currentList.push(<li key={key} className="mb-2">{line.replace(/^\d+\. /, '')}</li>);
        inOrderedList = true;
        
        // 如果是最后一行或下一行不是有序列表，结束当前列表
        if (i === lines.length - 1 || !lines[i + 1].match(/^\d+\. /)) {
          result.push(<ol key={`ol-${listKey++}`} className="list-decimal list-inside mb-4 text-slate-700">{currentList}</ol>);
          currentList = [];
          inOrderedList = false;
        }
      } 
      // 处理空行
      else if (line.trim() === '') {
        // 如果之前在列表中，先结束列表
        if (inOrderedList) {
          result.push(<ol key={`ol-${listKey++}`} className="list-decimal list-inside mb-4 text-slate-700">{currentList}</ol>);
          currentList = [];
          inOrderedList = false;
        } else if (inUnorderedList) {
          result.push(<ul key={`ul-${listKey++}`} className="list-disc list-inside mb-4 text-slate-700">{currentList}</ul>);
          currentList = [];
          inUnorderedList = false;
        }
        
        result.push(<br key={key} />);
      } 
      // 处理普通段落
      else {
        // 如果之前在列表中，先结束列表
        if (inOrderedList) {
          result.push(<ol key={`ol-${listKey++}`} className="list-decimal list-inside mb-4 text-slate-700">{currentList}</ol>);
          currentList = [];
          inOrderedList = false;
        } else if (inUnorderedList) {
          result.push(<ul key={`ul-${listKey++}`} className="list-disc list-inside mb-4 text-slate-700">{currentList}</ul>);
          currentList = [];
          inUnorderedList = false;
        }
        
        // 处理图片
        const imageMatch = line.match(/!\[([^\]]*)\]\(([^)]+?)(?:\s+"([^"]+)")?\)/);
        if (imageMatch) {
          const [, alt, src, sizeInfo] = imageMatch;
          let imageProps = {
            width: 800,
            height: 400,
            style: {}
          };
          
          // 解析尺寸信息
          if (sizeInfo) {
            // 支持 "300x200" 格式
            const dimensionMatch = sizeInfo.match(/^(\d+)x(\d+)$/);
            if (dimensionMatch) {
              imageProps.width = parseInt(dimensionMatch[1]);
              imageProps.height = parseInt(dimensionMatch[2]);
              imageProps.style = { 
                width: `${imageProps.width}px`, 
                height: `${imageProps.height}px`,
                objectFit: 'cover' as const
              };
            }
            // 支持 "width:400px" 或 "width:50%" 格式
            else if (sizeInfo.startsWith('width:')) {
              const widthValue = sizeInfo.replace('width:', '').trim();
              imageProps.style = { 
                width: widthValue, 
                height: 'auto'
              };
              // 如果是像素值，也更新 width 属性
              if (widthValue.includes('px')) {
                const pxValue = parseInt(widthValue);
                if (!isNaN(pxValue)) {
                  imageProps.width = pxValue;
                  imageProps.height = Math.round(pxValue * 0.6);
                }
              }
            }
          }
          
          result.push(
            <div key={key} className="my-6">
              <Image
                src={src}
                alt={alt}
                width={imageProps.width}
                height={imageProps.height}
                className="rounded-lg shadow-md"
                style={imageProps.style}
                priority={false}
              />
            </div>
          );
        }
        // 处理视频
        else if (line.includes('<video')) {
          const videoMatch = line.match(/<video\s+([^>]*)>/);
          if (videoMatch) {
            const attributes = videoMatch[1];
            const srcMatch = attributes.match(/src="([^"]+)"/);
            const controlsMatch = attributes.match(/controls/);
            const widthMatch = attributes.match(/width="([^"]+)"/);
            
            if (srcMatch) {
              result.push(
                <video
                  key={key}
                  src={srcMatch[1]}
                  controls={!!controlsMatch}
                  style={{ width: widthMatch ? widthMatch[1] : '100%', height: 'auto' }}
                  className="rounded-lg shadow-md my-6"
                />
              );
            }
          }
        }
        // 处理普通文本
        else {
          result.push(<p key={key} className="text-slate-700 mb-4 leading-relaxed">{line}</p>);
        }
      }
    }

    return result;
  };

  return (
    <div className="prose-headings:text-emerald-800 prose-p:text-slate-700 prose-strong:text-emerald-700 prose-blockquote:border-emerald-300 prose-blockquote:bg-emerald-50 prose-blockquote:text-emerald-800 prose-li:text-slate-700">
      {renderContent()}
    </div>
  );
};

export default MarkdownRenderer;