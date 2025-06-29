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
    const renderMath = (text: string) => {
      // Regex to find LaTeX expressions between $ or $$ delimiters
      const singleDollarRegex = /\$([^$]+)\$/g;
      const doubleDollarRegex = /\$\$([^$]+)\$\$/g;
      
      let result = text.replace(doubleDollarRegex, (match, formula) => {
        try {
          return renderToString(formula, {
            displayMode: true,
            throwOnError: false
          });
        } catch (error) {
          console.error('KaTeX error:', error);
          return match; 
        }
      });
      
      
      result = result.replace(singleDollarRegex, (match, formula) => {
        try {
          return renderToString(formula, {
            displayMode: false,
            throwOnError: false
          });
        } catch (error) {
          console.error('KaTeX error:', error);
          return match; 
        }
      });
      
      return result;
    };
    
    const rendered = renderMath(content);
    setRenderedContent(rendered);
  }, [content]);
  
  return (
    <div dangerouslySetInnerHTML={{ __html: renderedContent }} />
  );
}