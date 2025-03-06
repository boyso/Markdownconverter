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
  }
];

const TemplateSelect = () => {
  const [selectedTheme, setSelectedTheme] = useState<Theme>(themes[0]);
  const [markdownText, setMarkdownText] = useState('# Hello World\n\nThis is a preview of your markdown with the selected theme.');

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
            <Image 
              src="/logo.svg" 
              alt="FreeMarkdown Logo" 
              width={32} 
              height={32}
              className="w-8 h-8"
            />
            <span className="text-xl font-semibold text-gray-900">Theme Selection</span>
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
              <h1 className="text-xl font-semibold">Edit & Preview</h1>
              <button
                onClick={() => {
                  const html = generateThemedHtml();
                  const blob = new Blob([html], { type: 'text/html' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = 'markdown-themed.html';
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
            <div className="h-full rounded-lg border" style={selectedTheme.styles}>
              <MDEditor
                value={markdownText}
                onChange={value => setMarkdownText(value || '')}
                preview="live"
                height="100%"
                hideToolbar={false}
                enableScroll={true}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateSelect; 