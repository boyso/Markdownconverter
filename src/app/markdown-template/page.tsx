'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';

const MDEditor = dynamic(
  () => import('@uiw/react-md-editor'),
  { ssr: false }
);

// 定义主题接口
interface Theme {
  id: string;
  name: string;
  description: string;
  preview: string;
  styles: {
    backgroundColor: string;
    textColor: string;
    fontFamily: string;
    backgroundPattern?: string;
    css: string;
  };
}

// 预定义主题
const themes: Theme[] = [
  {
    id: 'classic',
    name: 'Classic Light',
    description: 'Clean and minimal light theme',
    preview: '/themes/classic.png',
    styles: {
      backgroundColor: '#ffffff',
      textColor: '#333333',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      css: `
        h1, h2, h3, h4, h5, h6 { color: #111; }
        a { color: #0366d6; }
        code { background: #f6f8fa; }
        blockquote { border-left: 4px solid #dfe2e5; }
      `
    }
  },
  {
    id: 'dark',
    name: 'Modern Dark',
    description: 'Elegant dark theme with high contrast',
    preview: '/themes/dark.png',
    styles: {
      backgroundColor: '#1a1a1a',
      textColor: '#ffffff',
      fontFamily: 'Inter, sans-serif',
      backgroundPattern: `data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.627 0l.83.828-1.415 1.415L51.8 0h2.827zM5.373 0l-.83.828L5.96 2.243 8.2 0H5.374zM48.97 0l3.657 3.657-1.414 1.414L46.143 0h2.828zM11.03 0L7.372 3.657 8.787 5.07 13.857 0H11.03zm32.284 0L49.8 6.485 48.384 7.9l-7.9-7.9h2.83zM16.686 0L10.2 6.485 11.616 7.9l7.9-7.9h-2.83zM22.344 0L13.858 8.485 15.272 9.9l7.9-7.9h-.828zm5.656 0L19.515 8.485 17.343 10.657 28 0h-2.83zM32.656 0L26.172 6.485 24 8.657 34.657 0h-2zM44.97 0L40.5 4.472 42.672 6.644 45.5 3.815 47.672 6 50.5 3.172 52.672 5.343 55.5 2.515 57.672 4.687 60 2.357V0h-2.83z' fill='%23ffffff' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E`,
      css: `
        h1, h2, h3, h4, h5, h6 { color: #fff; }
        a { color: #58a6ff; }
        code { background: #2d2d2d; color: #fff; }
        blockquote { border-left: 4px solid #404040; }
      `
    }
  },
  {
    id: 'sepia',
    name: 'Sepia Reading',
    description: 'Comfortable reading experience',
    preview: '/themes/sepia.png',
    styles: {
      backgroundColor: '#f4ecd8',
      textColor: '#433422',
      fontFamily: 'Georgia, serif',
      backgroundPattern: `data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23433422' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E`,
      css: `
        h1, h2, h3, h4, h5, h6 { color: #2c1810; }
        a { color: #8b4513; }
        code { background: #eae0c9; }
        blockquote { border-left: 4px solid #d3c4a9; }
      `
    }
  },
  {
    id: 'github',
    name: 'GitHub Style',
    description: 'Clean and professional GitHub documentation style',
    preview: '/themes/github.png',
    styles: {
      backgroundColor: '#ffffff',
      textColor: '#24292e',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
      css: `
        h1, h2, h3, h4, h5, h6 { 
          color: #24292e;
          border-bottom: 1px solid #eaecef;
          padding-bottom: 0.3em;
        }
        a { color: #0366d6; }
        code { 
          background: #f6f8fa;
          padding: 0.2em 0.4em;
          border-radius: 3px;
        }
        pre { background: #f6f8fa; }
        blockquote { 
          border-left: 4px solid #dfe2e5;
          color: #6a737d;
        }
        table th {
          background: #f6f8fa;
        }
      `
    }
  },
  {
    id: 'notion',
    name: 'Notion Style',
    description: 'Clean and modern Notion-like design',
    preview: '/themes/notion.png',
    styles: {
      backgroundColor: '#ffffff',
      textColor: '#37352f',
      fontFamily: 'inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, sans-serif',
      css: `
        h1, h2, h3, h4, h5, h6 { 
          color: #37352f;
          font-weight: 600;
        }
        a { 
          color: #2eaadc;
          text-decoration: underline;
          opacity: 0.7;
        }
        a:hover {
          opacity: 1;
        }
        code { 
          background: rgba(135,131,120,0.15);
          color: #eb5757;
          padding: 0.2em 0.4em;
          border-radius: 3px;
        }
        pre { 
          background: #f7f6f3;
          border-radius: 3px;
        }
        blockquote { 
          border-left: 3px solid #e1e1e1;
          padding: 0.2em 1em;
          color: #6b6b6b;
        }
      `
    }
  },
  {
    id: 'nord',
    name: 'Nord Theme',
    description: 'Arctic-inspired color palette',
    preview: '/themes/nord.png',
    styles: {
      backgroundColor: '#2e3440',
      textColor: '#eceff4',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      css: `
        h1, h2, h3, h4, h5, h6 { 
          color: #88c0d0;
        }
        a { 
          color: #88c0d0;
          text-decoration: none;
          border-bottom: 1px solid #4c566a;
        }
        a:hover {
          border-bottom-color: #88c0d0;
        }
        code { 
          background: #3b4252;
          color: #d8dee9;
        }
        pre { 
          background: #3b4252;
          border-radius: 4px;
        }
        blockquote { 
          border-left: 4px solid #4c566a;
          color: #d8dee9;
        }
        table th {
          background: #3b4252;
        }
        table td {
          border-color: #4c566a;
        }
      `
    }
  },
  {
    id: 'minimal',
    name: 'Minimal White',
    description: 'Ultra-clean minimalist design',
    preview: '/themes/minimal.png',
    styles: {
      backgroundColor: '#ffffff',
      textColor: '#222222',
      fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif',
      css: `
        h1, h2, h3, h4, h5, h6 { 
          color: #222222;
          font-weight: 700;
          letter-spacing: -0.02em;
        }
        a { 
          color: #222222;
          text-decoration: none;
          border-bottom: 1px solid #222222;
        }
        code { 
          background: #f5f5f5;
          color: #222222;
          font-family: "SF Mono", Menlo, monospace;
        }
        pre { 
          background: #f5f5f5;
          border-radius: 0;
        }
        blockquote { 
          border-left: 2px solid #222222;
          padding-left: 1.5em;
          font-style: italic;
        }
      `
    }
  },
  {
    id: 'solarized',
    name: 'Solarized Light',
    description: 'Eye-friendly solarized theme',
    preview: '/themes/solarized.png',
    styles: {
      backgroundColor: '#fdf6e3',
      textColor: '#657b83',
      fontFamily: '"Fira Sans", system-ui, sans-serif',
      css: `
        h1, h2, h3, h4, h5, h6 { 
          color: #b58900;
        }
        a { 
          color: #268bd2;
        }
        code { 
          background: #eee8d5;
          color: #dc322f;
        }
        pre { 
          background: #eee8d5;
          border-radius: 4px;
        }
        blockquote { 
          border-left: 4px solid #93a1a1;
          color: #93a1a1;
        }
        table th {
          background: #eee8d5;
        }
      `
    }
  }
];

// 添加默认示例内容常量
const DEFAULT_MARKDOWN = `# Theme Preview

## Text Formatting

Regular text and *italic text* and **bold text** and ***bold italic text*** and ~~strikethrough text~~.

## Links and Code

Here's a [link to example](https://freemarkdown.com) and some \`inline code\`.

\`\`\`javascript
// Code block example
function greeting(name) {
    return \`Hello, \${name}!\`;
}
console.log(greeting('World'));
\`\`\`

## Lists

1. First ordered item
2. Second ordered item
   * Unordered sub-item
   * Another sub-item
3. Third ordered item

## Blockquotes

> This is a blockquote
> Multiple lines in the same quote
>> Nested blockquote

## Tables

| Header 1 | Header 2 | Header 3 |
|----------|:--------:|---------:|
| Left     | Center   | Right    |
| Cell     | Cell     | Cell     |

## Task List

- [x] Completed task
- [ ] Pending task
- [x] Another done task`;

export default function MarkdownTemplate() {
  const [selectedTheme, setSelectedTheme] = useState<Theme>(themes[0]);
  const [markdownText, setMarkdownText] = useState(DEFAULT_MARKDOWN);

  // 初始化 markdown-it
  const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
    highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(str, { language: lang }).value;
        } catch (__) {}
      }
      return ''; // 使用默认的转义
    }
  });

  // 生成带主题的HTML
  const generateThemedHtml = () => {
    const { styles } = selectedTheme;
    const htmlContent = md.render(markdownText);

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Markdown Content</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github.min.css">
    <style>
        body {
            background-color: ${styles.backgroundColor};
            color: ${styles.textColor};
            font-family: ${styles.fontFamily};
            line-height: 1.6;
            max-width: 800px;
            margin: 0 auto;
            padding: 2rem;
            ${styles.backgroundPattern ? `background-image: url("${styles.backgroundPattern}");` : ''}
        }
        ${styles.css}
        pre {
            padding: 1rem;
            border-radius: 4px;
            overflow-x: auto;
        }
        img {
            max-width: 100%;
            height: auto;
        }
        table {
            border-collapse: collapse;
            width: 100%;
            margin: 1rem 0;
        }
        table th, table td {
            border: 1px solid #ddd;
            padding: 8px;
        }
        blockquote {
            margin: 1rem 0;
            padding-left: 1rem;
        }
    </style>
</head>
<body>
    ${htmlContent}
    <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"></script>
    <script>hljs.highlightAll();</script>
</body>
</html>`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Link href="/" className="inline-flex items-center gap-3">
            {/* <Image 
              src="/logo.svg" 
              alt="FreeMarkdown Logo" 
              width={32} 
              height={32}
              className="w-8 h-8"
            /> */}
            <span className="text-xl font-semibold text-gray-900">Markdown HTML Themes</span>
          </Link>
        </div>
      </header>

      <div className="flex h-[calc(100vh-64px)]">
        {/* 左侧主题选择 */}
        <div className="w-64 bg-white border-r overflow-y-auto">
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-4">Select Theme</h2>
            <div className="space-y-4">
              {themes.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => setSelectedTheme(theme)}
                  className={`w-full p-4 rounded-lg border transition-all ${
                    selectedTheme.id === theme.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-200'
                  }`}
                >
                  <div className="text-left">
                    <h3 className="font-medium">{theme.name}</h3>
                    <p className="text-sm text-gray-500">{theme.description}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 中间编辑器和预览 */}
        <div className="flex-1 flex flex-col">
          <div className="p-4 border-b bg-white">
            <div className="flex justify-between items-center">
              <h1 className="text-xl font-semibold">Theme Preview & Editor</h1>
              <button
                onClick={() => {
                  const html = generateThemedHtml();
                  const blob = new Blob([html], { type: 'text/html' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `markdown-${selectedTheme.id}.html`;
                  a.click();
                  URL.revokeObjectURL(url);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Generate & Download HTML
              </button>
            </div>
          </div>
          
          <div className="flex-1 p-4 overflow-hidden">
            <div className="h-full rounded-lg border overflow-hidden">
              <MDEditor
                value={markdownText}
                onChange={value => setMarkdownText(value || '')}
                preview="live"
                height="100%"
                hideToolbar={false}
                enableScroll={true}
                previewOptions={{
                  className: "markdown-preview",
                  style: {
                    backgroundColor: selectedTheme.styles.backgroundColor,
                    color: selectedTheme.styles.textColor,
                    fontFamily: selectedTheme.styles.fontFamily,
                    ...(selectedTheme.styles.backgroundPattern ? {
                      backgroundImage: `url("${selectedTheme.styles.backgroundPattern}")`,
                    } : {})
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 修改样式，只针对预览区域应用主题 */}
      <style jsx global>{`
        /* 保持编辑器左侧的原始样式 */
        .w-md-editor {
          background-color: white !important;
        }
        .w-md-editor-text {
          color: #333 !important;
        }
        .w-md-editor-toolbar {
          background-color: #f9fafb !important;
          border-color: #e5e7eb !important;
        }
        .w-md-editor-toolbar button {
          color: #4b5563 !important;
        }
        .w-md-editor-toolbar button:hover {
          background-color: #f3f4f6 !important;
        }
        
        /* 只对预览区域应用主题样式 */
        .w-md-editor-preview {
          background-color: ${selectedTheme.styles.backgroundColor} !important;
          color: ${selectedTheme.styles.textColor} !important;
          font-family: ${selectedTheme.styles.fontFamily} !important;
          ${selectedTheme.styles.backgroundPattern ? `background-image: url("${selectedTheme.styles.backgroundPattern}");` : ''}
        }
        
        /* 应用主题的自定义样式到预览区域 */
        .markdown-preview {
          ${selectedTheme.styles.css}
        }
        
        /* 预览区域的代码块样式 */
        .w-md-editor-preview pre {
          background-color: ${
            selectedTheme.styles.backgroundColor === '#ffffff' 
              ? '#f6f8fa' 
              : selectedTheme.styles.backgroundColor === '#1a1a1a' 
                ? '#2d2d2d' 
                : selectedTheme.styles.backgroundColor
          } !important;
        }

        /* 分隔线样式 */
        .w-md-editor-show-live div.wmde-markdown-var {
          border-left: 1px solid #e5e7eb !important;
        }
      `}</style>
    </div>
  );
} 