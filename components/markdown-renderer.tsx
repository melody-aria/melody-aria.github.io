import React from 'react';
import Image from 'next/image';

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  // 将内容按行分割
  const lines = content.split('\n');
  
  // 脚注相关变量
  let footnotes: {[key: string]: string} = {};
  let footnoteRefs: string[] = [];
  
  // 处理文本中的格式
  const processTextFormatting = (text: string): React.ReactNode => {
    // 创建一个数组来存储处理后的元素
    const elements: React.ReactNode[] = [];
    
    // 定义所有需要处理的模式
    const patterns = [
      { regex: /`([^`]+)`/g, component: (content: string, index: string) => <code key={`code-${index}`} className="bg-slate-100 text-emerald-700 px-1 py-0.5 rounded text-sm font-mono">{content}</code> },
      { regex: /\*\*([^*]+)\*\*/g, component: (content: string, index: string) => <strong key={`strong-${index}`} className="font-bold text-emerald-800">{content}</strong> },
      { regex: /\*([^*]+)\*/g, component: (content: string, index: string) => <em key={`em-${index}`} className="italic text-emerald-700">{content}</em> },
      { regex: /~~([^~]+)~~/g, component: (content: string, index: string) => <del key={`del-${index}`} className="line-through text-slate-500">{content}</del> },
      { regex: /\[([^\]]+)\]\(([^)]+)\)/g, component: (linkText: string, url: string, index: string) => <a key={`link-${index}`} href={url} className="text-emerald-600 hover:text-emerald-800 underline" target="_blank" rel="noopener noreferrer">{linkText}</a> },
      { regex: /\[\^([^\]]+)\]/g, component: (footnoteId: string, index: string) => {
        if (footnotes[footnoteId]) {
          return (
            <sup key={`footnote-${index}`}>
              <a 
                href={`#footnote-${footnoteId}`} 
                className="text-emerald-600 hover:text-emerald-800 text-xs"
                title={footnotes[footnoteId]}
              >
                [{footnoteId}]
              </a>
            </sup>
          );
        }
        return <span key={`footnote-${index}`}>[^{footnoteId}]</span>;
      } }
    ];
    
    // 找到所有匹配项并按位置排序
    const matches: Array<{ start: number; end: number; element: React.ReactNode; patternIndex: number }> = [];
    
    patterns.forEach((pattern, patternIndex) => {
      let match;
      const regex = new RegExp(pattern.regex.source, pattern.regex.flags);
      let matchIndex = 0;
      while ((match = regex.exec(text)) !== null) {
        let element;
        if (pattern.regex.source.includes('\\[')) {
          // 链接模式
          element = pattern.component(match[1], match[2], `${patternIndex}-${matchIndex}`);
        } else {
          // 其他模式
          element = pattern.component(match[1], `${patternIndex}-${matchIndex}`);
        }
        matches.push({
          start: match.index,
          end: match.index + match[0].length,
          element,
          patternIndex
        });
        matchIndex++;
      }
    });
    
    // 按开始位置排序
    matches.sort((a, b) => a.start - b.start);
    
    // 处理重叠的匹配项（保留第一个）
    const filteredMatches = [];
    for (const match of matches) {
      if (!filteredMatches.some(existing => 
        (match.start >= existing.start && match.start < existing.end) ||
        (match.end > existing.start && match.end <= existing.end)
      )) {
        filteredMatches.push(match);
      }
    }
    
    // 构建最终的元素数组
    let currentIndex = 0;
    let elementIndex = 0;
    filteredMatches.forEach((match) => {
      // 添加匹配前的文本
      if (currentIndex < match.start) {
        elements.push(<span key={`text-${elementIndex++}`}>{text.slice(currentIndex, match.start)}</span>);
      }
      // 添加匹配的元素
      elements.push(match.element);
      currentIndex = match.end;
    });
    
    // 添加剩余的文本
    if (currentIndex < text.length) {
      elements.push(<span key={`text-${elementIndex++}`}>{text.slice(currentIndex)}</span>);
    }
    
    return elements.length === 1 && typeof elements[0] === 'string' ? elements[0] : <>{elements}</>;
  };
  
  // 处理表格行
  const parseTableRow = (line: string): string[] => {
    return line.split('|').map(cell => cell.trim()).filter(cell => cell !== '');
  };

  // 处理任务列表项
  const parseTaskListItem = (text: string): { checked: boolean; content: string } => {
    const match = text.match(/^\[([x\s])\]\s*(.*)$/);
    if (match) {
      return {
        checked: match[1] === 'x',
        content: match[2]
      };
    }
    return { checked: false, content: text };
  };

  // 处理Markdown内容
  const renderContent = () => {
    const result: JSX.Element[] = [];
    let currentList: JSX.Element[] = [];
    let inOrderedList = false;
    let inUnorderedList = false;
    let inCodeBlock = false;
    let codeBlockContent: string[] = [];
    let codeBlockLanguage = '';
    let listKey = 0;
    let inTable = false;
    let tableHeaders: string[] = [];
    let tableRows: string[][] = [];
    let tableKey = 0;

    // 首先扫描所有脚注定义
    const footnoteDefRegex = /^\[\^([^\]]+)\]:\s*(.+)$/;
    const processedLines: string[] = [];
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const footnoteMatch = line.match(footnoteDefRegex);
      
      if (footnoteMatch) {
        const [, id, definition] = footnoteMatch;
        footnotes[id] = definition;
      } else {
        processedLines.push(line);
      }
    }

    // 处理每一行
    for (let i = 0; i < processedLines.length; i++) {
      const line = processedLines[i];
      const key = `line-${i}`;

      // 处理代码块
      if (line.startsWith('```')) {
        if (!inCodeBlock) {
          // 开始代码块
          inCodeBlock = true;
          codeBlockLanguage = line.slice(3).trim();
          codeBlockContent = [];
          continue;
        } else {
          // 结束代码块
          inCodeBlock = false;
          result.push(
            <pre key={key} className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto my-4">
              <code>{codeBlockContent.join('\n')}</code>
            </pre>
          );
          codeBlockContent = [];
          continue;
        }
      }
      
      // 如果在代码块中，直接添加内容
      if (inCodeBlock) {
        codeBlockContent.push(line);
        continue;
      }

      // 处理标题
      if (line.startsWith('# ')) {
        // 如果之前在列表中，先结束列表
        if (inOrderedList) {
          result.push(<ol key={`ol-${listKey++}`} className="list-decimal list-inside mb-4 text-slate-700 space-y-1">{currentList}</ol>);
          currentList = [];
          inOrderedList = false;
        } else if (inUnorderedList) {
          result.push(<ul key={`ul-${listKey++}`} className="list-disc list-inside mb-4 text-slate-700 space-y-1">{currentList}</ul>);
          currentList = [];
          inUnorderedList = false;
        }
        
        result.push(<h1 key={key} className="text-3xl font-bold text-emerald-800 mb-6">{processTextFormatting(line.slice(2))}</h1>);
      } 
      // 处理二级标题
      else if (line.startsWith('## ')) {
        // 如果之前在列表中，先结束列表
        if (inOrderedList) {
          result.push(<ol key={`ol-${listKey++}`} className="list-decimal list-inside mb-4 text-slate-700 space-y-1">{currentList}</ol>);
          currentList = [];
          inOrderedList = false;
        } else if (inUnorderedList) {
          result.push(<ul key={`ul-${listKey++}`} className="list-disc list-inside mb-4 text-slate-700 space-y-1">{currentList}</ul>);
          currentList = [];
          inUnorderedList = false;
        }
        
        result.push(<h2 key={key} className="text-2xl font-semibold text-emerald-700 mb-4 mt-8">{processTextFormatting(line.slice(3))}</h2>);
      } 
      // 处理三级标题
      else if (line.startsWith('### ')) {
        // 如果之前在列表中，先结束列表
        if (inOrderedList) {
          result.push(<ol key={`ol-${listKey++}`} className="list-decimal list-inside mb-4 text-slate-700 space-y-1">{currentList}</ol>);
          currentList = [];
          inOrderedList = false;
        } else if (inUnorderedList) {
          result.push(<ul key={`ul-${listKey++}`} className="list-disc list-inside mb-4 text-slate-700 space-y-1">{currentList}</ul>);
          currentList = [];
          inUnorderedList = false;
        }
        
        result.push(<h3 key={key} className="text-xl font-medium text-emerald-600 mb-3 mt-6">{processTextFormatting(line.slice(4))}</h3>);
      }
      // 处理四级标题
      else if (line.startsWith('#### ')) {
        result.push(<h4 key={key} className="text-lg font-medium text-emerald-600 mb-2 mt-4">{processTextFormatting(line.slice(5))}</h4>);
      }
      // 处理五级标题
      else if (line.startsWith('##### ')) {
        result.push(<h5 key={key} className="text-base font-medium text-emerald-600 mb-2 mt-3">{processTextFormatting(line.slice(6))}</h5>);
      }
      // 处理六级标题
      else if (line.startsWith('###### ')) {
        result.push(<h6 key={key} className="text-sm font-medium text-emerald-600 mb-2 mt-3">{processTextFormatting(line.slice(7))}</h6>);
      }
      // 处理引用
      else if (line.startsWith('> ')) {
        // 如果之前在列表中，先结束列表
        if (inOrderedList) {
          result.push(<ol key={`ol-${listKey++}`} className="list-decimal list-inside mb-4 text-slate-700 space-y-1">{currentList}</ol>);
          currentList = [];
          inOrderedList = false;
        } else if (inUnorderedList) {
          result.push(<ul key={`ul-${listKey++}`} className="list-disc list-inside mb-4 text-slate-700 space-y-1">{currentList}</ul>);
          currentList = [];
          inUnorderedList = false;
        }
        
        result.push(
          <blockquote key={key} className="border-l-4 border-emerald-300 bg-emerald-50 p-4 my-4 italic text-emerald-800">
            {processTextFormatting(line.slice(2))}
          </blockquote>
        );
      }
      // 处理分隔线
      else if (line.trim() === '---' || line.trim() === '***' || line.trim() === '___') {
        result.push(<hr key={key} className="border-t-2 border-emerald-200 my-8" />);
      }
      // 处理无序列表
      else if (line.startsWith('- ')) {
        // 检查是否是任务列表
        const taskMatch = line.match(/^- \[([x\s])\]\s*(.*)$/);
        if (taskMatch) {
          // 处理任务列表
          const isChecked = taskMatch[1] === 'x';
          const taskContent = taskMatch[2];
          
          // 如果之前在其他列表中，先结束列表
          if (inOrderedList) {
            result.push(<ol key={`ol-${listKey++}`} className="list-decimal list-inside mb-4 text-slate-700 space-y-1">{currentList}</ol>);
            currentList = [];
            inOrderedList = false;
          }
          
          currentList.push(
            <li key={key} className="mb-2 flex items-center">
              <input 
                type="checkbox" 
                checked={isChecked} 
                readOnly 
                className="mr-2 h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
              />
              <span className={isChecked ? "line-through text-slate-500" : "text-slate-700"}>
                {processTextFormatting(taskContent)}
              </span>
            </li>
          );
          inUnorderedList = true;
          
          // 如果是最后一行或下一行不是任务列表，结束当前列表
          if (i === lines.length - 1 || !lines[i + 1].match(/^- \[[x\s]\]/)) {
            result.push(<ul key={`ul-${listKey++}`} className="list-none mb-4 space-y-1">{currentList}</ul>);
            currentList = [];
            inUnorderedList = false;
          }
        } else {
          // 普通无序列表
          // 如果之前在有序列表中，先结束有序列表
          if (inOrderedList) {
            result.push(<ol key={`ol-${listKey++}`} className="list-decimal list-inside mb-4 text-slate-700 space-y-1">{currentList}</ol>);
            currentList = [];
            inOrderedList = false;
          }
          
          // 添加到无序列表
          currentList.push(<li key={key} className="mb-1">{processTextFormatting(line.slice(2))}</li>);
          inUnorderedList = true;
          
          // 如果是最后一行或下一行不是无序列表，结束当前列表
          if (i === lines.length - 1 || !lines[i + 1].startsWith('- ')) {
            result.push(<ul key={`ul-${listKey++}`} className="list-disc list-inside mb-4 text-slate-700 space-y-1">{currentList}</ul>);
            currentList = [];
            inUnorderedList = false;
          }
        }
      } 
      // 处理有序列表
      else if (line.match(/^\d+\. /)) {
        // 如果之前在无序列表中，先结束无序列表
        if (inUnorderedList) {
          result.push(<ul key={`ul-${listKey++}`} className="list-disc list-inside mb-4 text-slate-700 space-y-1">{currentList}</ul>);
          currentList = [];
          inUnorderedList = false;
        }
        
        // 添加到有序列表
        currentList.push(<li key={key} className="mb-1">{processTextFormatting(line.replace(/^\d+\. /, ''))}</li>);
        inOrderedList = true;
        
        // 如果是最后一行或下一行不是有序列表，结束当前列表
        if (i === lines.length - 1 || !lines[i + 1].match(/^\d+\. /)) {
          result.push(<ol key={`ol-${listKey++}`} className="list-decimal list-inside mb-4 text-slate-700 space-y-1">{currentList}</ol>);
          currentList = [];
          inOrderedList = false;
        }
      } 
      // 处理空行
      else if (line.trim() === '') {
        // 如果之前在列表中，先结束列表
        if (inOrderedList) {
          result.push(<ol key={`ol-${listKey++}`} className="list-decimal list-inside mb-4 text-slate-700 space-y-1">{currentList}</ol>);
          currentList = [];
          inOrderedList = false;
        } else if (inUnorderedList) {
          result.push(<ul key={`ul-${listKey++}`} className="list-disc list-inside mb-4 text-slate-700 space-y-1">{currentList}</ul>);
          currentList = [];
          inUnorderedList = false;
        }
        
        result.push(<br key={key} />);
      } 
      // 处理普通段落
        else {
          // 如果之前在列表中，先结束列表
          if (inOrderedList) {
            result.push(<ol key={`ol-${listKey++}`} className="list-decimal list-inside mb-4 text-slate-700 space-y-1">{currentList}</ol>);
            currentList = [];
            inOrderedList = false;
          } else if (inUnorderedList) {
            result.push(<ul key={`ul-${listKey++}`} className="list-disc list-inside mb-4 text-slate-700 space-y-1">{currentList}</ul>);
            currentList = [];
            inUnorderedList = false;
          }

          // 处理表格
          if (line.includes('|') && line.trim() !== '') {
            const cells = parseTableRow(line);
            if (cells.length > 0) {
              if (!inTable) {
                // 开始新表格
                inTable = true;
                tableHeaders = cells;
                tableRows = [];
              } else if (line.match(/^[\s]*\|?[\s]*:?-+:?[\s]*\|/)) {
                // 跳过表格分隔行
                continue;
              } else {
                // 表格数据行
                tableRows.push(cells);
              }
              
              // 检查是否是表格的最后一行
              if (i === processedLines.length - 1 || !processedLines[i + 1].includes('|') || processedLines[i + 1].trim() === '') {
                // 渲染表格
                result.push(
                  <div key={`table-${tableKey++}`} className="overflow-x-auto my-6">
                    <table className="min-w-full border-collapse border border-slate-300">
                      <thead className="bg-emerald-50">
                        <tr>
                          {tableHeaders.map((header, index) => (
                            <th key={index} className="border border-slate-300 px-4 py-2 text-left font-semibold text-emerald-800">
                              {processTextFormatting(header)}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {tableRows.map((row, rowIndex) => (
                          <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                            {row.map((cell, cellIndex) => (
                              <td key={cellIndex} className="border border-slate-300 px-4 py-2 text-slate-700">
                                {processTextFormatting(cell)}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                );
                inTable = false;
                tableHeaders = [];
                tableRows = [];
              }
              continue;
            }
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
          // 处理 HTML details/summary 折叠内容
          else if (line.trim() === '<details>') {
            let detailsContent: string[] = [];
            let summaryText = '';
            let j = i + 1;
            
            // 查找 summary 和内容
            while (j < processedLines.length && processedLines[j].trim() !== '</details>') {
              if (processedLines[j].trim().startsWith('<summary>') && processedLines[j].trim().endsWith('</summary>')) {
                summaryText = processedLines[j].trim().replace('<summary>', '').replace('</summary>', '');
              } else if (!processedLines[j].trim().startsWith('<summary>') && !processedLines[j].trim().endsWith('</summary>')) {
                detailsContent.push(processedLines[j]);
              }
              j++;
            }
            
            result.push(
              <details key={key} className="my-4 border border-slate-200 rounded-lg">
                <summary className="cursor-pointer p-4 bg-slate-50 hover:bg-slate-100 font-medium text-emerald-700">
                  {summaryText}
                </summary>
                <div className="p-4 border-t border-slate-200">
                  <MarkdownRenderer content={detailsContent.join('\n')} />
                </div>
              </details>
            );
            
            // 跳过已处理的行
            i = j;
            continue;
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
            result.push(<p key={key} className="text-slate-700 mb-4 leading-relaxed">{processTextFormatting(line)}</p>);
          }
        }
    }

    return result;
  };

  const renderedContent = renderContent();
  
  // 在最后添加脚注列表
  if (Object.keys(footnotes).length > 0) {
    renderedContent.push(
      <div key="footnotes" className="mt-8 pt-4 border-t border-slate-200">
        <h4 className="text-lg font-semibold text-slate-800 mb-4">脚注</h4>
        {Object.entries(footnotes).map(([id, definition]) => (
          <div key={`footnote-def-${id}`} id={`footnote-${id}`} className="mb-2 text-sm text-slate-600">
            <span className="font-medium">[{id}]:</span> {processTextFormatting(definition)}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="prose-headings:text-emerald-800 prose-p:text-slate-700 prose-strong:text-emerald-700 prose-blockquote:border-emerald-300 prose-blockquote:bg-emerald-50 prose-blockquote:text-emerald-800 prose-li:text-slate-700">
      {renderedContent}
    </div>
  );
};

export default MarkdownRenderer;