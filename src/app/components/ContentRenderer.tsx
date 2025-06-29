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

function preprocessContent(content: string): string {
  let processedContent = content;
  
  // Convert numbered lists to markdown format
  processedContent = processedContent.replace(/^\d+\.\s*/gm, '- ');
  
  // Convert manual bullet points (•) to markdown format
  processedContent = processedContent.replace(/^•\s*/gm, '- ');
  
  // Convert other common bullet characters to markdown format
  processedContent = processedContent.replace(/^[‣▶▸►]\s*/gm, '- ');
  
  // Handle nested bullet points with proper indentation
  processedContent = processedContent.replace(/^(\s+)•\s*/gm, '$1- ');
  processedContent = processedContent.replace(/^(\s+)[‣▶▸►]\s*/gm, '$1- ');
  
  return processedContent;
}

export default function ContentRenderer({ content, className = '' }: ContentRendererProps) {
  const processedContent = preprocessContent(content);
  
  return (
    <div className={`prose prose-lg text-gray-100 break-words ${className}`}>
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
            <h2 className="text-2xl font-semibold mb-2 text-gray-100">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xl font-semibold mb-2 text-gray-100">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-xl font-semibold mb-1 text-gray-100">
              {children}
            </h4>
          ),
          p: ({ children }) => (
            <p className="mb-3 text-gray-100 leading-relaxed text-base">
              {children}
            </p>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-gray-100">
              {children}
            </strong>
          ),
          em: ({ children }) => (
            <em className="italic text-gray-200">
              {children}
            </em>
          ),
          ul: ({ children }) => (
            <ul className="mb-4 space-y-2 text-gray-100 ml-4 list-disc marker:text-gray-300">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="mb-4 space-y-2 text-gray-100 ml-4 list-decimal marker:text-gray-300">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="text-gray-100 leading-relaxed pl-2">
              {children}
            </li>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-300 mb-3 bg-gray-800/30 py-2 rounded-r">
              {children}
            </blockquote>
          ),
          code: ({ children }) => (
            <code className="bg-gray-800 px-2 py-1 rounded text-sm font-mono text-blue-300">
              {children}
            </code>
          ),
          pre: ({ children }) => (
            <pre className="bg-gray-800 p-4 rounded text-sm font-mono overflow-x-auto mb-3 border border-gray-700">
              {children}
            </pre>
          ),
        }}
      >
        {processedContent}
      </ReactMarkdown>
    </div>
  );
}