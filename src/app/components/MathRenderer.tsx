'use client';

import 'katex/dist/katex.min.css';
import { renderToString } from 'katex';
import { useEffect, useState } from 'react';

interface MathRendererProps {
  content: string;
}

export default function MathRenderer({ content }: MathRendererProps) {
  const [renderedContent, setRenderedContent] = useState<string>(content);
  
  useEffect(() => {
    // Function to replace LaTeX expressions with rendered HTML
    const renderMath = (text: string) => {
      // Regular expression to find LaTeX expressions between $ or $$ delimiters
      const singleDollarRegex = /\$([^$]+)\$/g;
      const doubleDollarRegex = /\$\$([^$]+)\$\$/g;
      
      // First replace double dollar expressions (display mode)
      let result = text.replace(doubleDollarRegex, (match, formula) => {
        try {
          return renderToString(formula, {
            displayMode: true,
            throwOnError: false
          });
        } catch (error) {
          console.error('KaTeX error:', error);
          return match; // Return original if rendering fails
        }
      });
      
      // Then replace single dollar expressions (inline mode)
      result = result.replace(singleDollarRegex, (match, formula) => {
        try {
          return renderToString(formula, {
            displayMode: false,
            throwOnError: false
          });
        } catch (error) {
          console.error('KaTeX error:', error);
          return match; // Return original if rendering fails
        }
      });
      
      return result;
    };
    
    // Apply math rendering to content
    const rendered = renderMath(content);
    setRenderedContent(rendered);
  }, [content]);
  
  return (
    <div dangerouslySetInnerHTML={{ __html: renderedContent }} />
  );
}