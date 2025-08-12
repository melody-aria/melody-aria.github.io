import type { MDXComponents } from 'mdx/types'
import Image, { ImageProps } from 'next/image'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Allows customizing built-in components, e.g. to add styling.
    h1: ({ children }) => (
      <h1 className="text-3xl font-bold text-emerald-800 mb-6">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-semibold text-emerald-700 mb-4 mt-8">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-medium text-emerald-600 mb-3 mt-6">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg font-medium text-emerald-600 mb-2 mt-4">{children}</h4>
    ),
    h5: ({ children }) => (
      <h5 className="text-base font-medium text-emerald-600 mb-2 mt-3">{children}</h5>
    ),
    h6: ({ children }) => (
      <h6 className="text-sm font-medium text-emerald-600 mb-2 mt-3">{children}</h6>
    ),
    p: ({ children }) => (
      <p className="text-slate-700 mb-4 leading-relaxed">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-emerald-300 bg-emerald-50 p-4 my-4 italic text-emerald-800">
        {children}
      </blockquote>
    ),
    ul: ({ children }) => (
      <ul className="list-disc list-inside mb-4 text-slate-700 space-y-1">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-inside mb-4 text-slate-700 space-y-1">{children}</ol>
    ),
    li: ({ children }) => (
      <li className="mb-1">{children}</li>
    ),
    strong: ({ children }) => (
      <strong className="font-bold text-emerald-800">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="italic text-emerald-700">{children}</em>
    ),
    del: ({ children }) => (
      <del className="line-through text-slate-500">{children}</del>
    ),
    code: ({ children }) => (
      <code className="bg-slate-100 text-emerald-700 px-1 py-0.5 rounded text-sm font-mono">
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto my-4">
        {children}
      </pre>
    ),
    table: ({ children }) => (
      <div className="overflow-x-auto my-6">
        <table className="min-w-full border-collapse border border-slate-300">
          {children}
        </table>
      </div>
    ),
    thead: ({ children }) => (
      <thead className="bg-emerald-50">{children}</thead>
    ),
    tbody: ({ children }) => (
      <tbody>{children}</tbody>
    ),
    tr: ({ children }) => (
      <tr className="border-b border-slate-200">{children}</tr>
    ),
    th: ({ children }) => (
      <th className="border border-slate-300 px-4 py-2 text-left font-semibold text-emerald-800">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="border border-slate-300 px-4 py-2 text-slate-700">
        {children}
      </td>
    ),
    a: ({ children, href }) => (
      <a 
        href={href} 
        className="text-emerald-600 hover:text-emerald-800 underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
    hr: () => (
      <hr className="border-t-2 border-emerald-200 my-8" />
    ),
    img: (props) => (
      <Image
        sizes="100vw"
        style={{ width: '100%', height: 'auto' }}
        className="rounded-lg shadow-md my-6"
        {...(props as ImageProps)}
      />
    ),
    video: (props: React.VideoHTMLAttributes<HTMLVideoElement>) => (
      <video
        style={{ width: '100%', height: 'auto' }}
        className="rounded-lg shadow-md my-6"
        {...props}
      />
    ),
    ...components,
  }
}
