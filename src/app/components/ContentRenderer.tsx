// src/app/components/ContentRenderer.tsx
'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

interface ContentRendererProps {
  content: string;
  className?: string;
}

export default function ContentRenderer({ content, className = '' }: ContentRendererProps) {
  return (
    <div className={`prose prose-lg max-w-none text-gray-100 ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          // Custom components for better styling
          h1: ({ children }) => (
            <h1 className="text-3xl font-bold mb-4 text-gray-100">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-2xl font-semibold mb-3 text-gray-100">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xl font-semibold mb-3 text-gray-100">
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className="mb-2 text-gray-100 leading-relaxed text-lg">
              {children}
            </p>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-gray-900 dark:text-white">
              {children}
            </strong>
          ),
          em: ({ children }) => (
            <em className="italic text-gray-800 dark:text-gray-200">
              {children}
            </em>
          ),
          ul: ({ children }) => (
            <ul className="list-disc list-inside mb-3 space-y-1 text-gray-800 dark:text-gray-200">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside mb-3 space-y-1 text-gray-800 dark:text-gray-200">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="mb-1 text-gray-800 dark:text-gray-200">
              {children}
            </li>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-700 dark:text-gray-300 mb-3">
              {children}
            </blockquote>
          ),
          code: ({ children }) => (
            <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm font-mono text-gray-900 dark:text-gray-100">
              {children}
            </code>
          ),
          pre: ({ children }) => (
            <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded text-sm font-mono overflow-x-auto mb-3">
              {children}
            </pre>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}