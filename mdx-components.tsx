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
    p: ({ children }) => (
      <p className="text-slate-700 mb-4 leading-relaxed">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-emerald-300 bg-emerald-50 p-4 my-4 italic text-emerald-800">
        {children}
      </blockquote>
    ),
    ul: ({ children }) => (
      <ul className="list-disc list-inside mb-4 text-slate-700">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-inside mb-4 text-slate-700">{children}</ol>
    ),
    li: ({ children }) => (
      <li className="mb-2">{children}</li>
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
