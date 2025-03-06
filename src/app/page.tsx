'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { saveAs } from 'file-saver';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import { useDropzone } from 'react-dropzone';
import Link from 'next/link';

const MDEditor = dynamic(
  () => import('@uiw/react-md-editor'),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full h-[500px] bg-gray-50 rounded-lg flex items-center justify-center">
        <div className="animate-pulse text-gray-400">Loading editor...</div>
      </div>
    )
  }
);

const defaultMarkdown = `# Start Writing Your Markdown

## Basic Syntax Guide

### Headers
# H1
## H2
### H3

### Emphasis
*italic* or _italic_
**bold** or __bold__
***bold italic*** or ___bold italic___

### Lists
1. First item
2. Second item
3. Third item

- Bullet point
- Another point
  - Sub-point
  
### Code
Inline \`code\` has \`back-ticks\`.

\`\`\`javascript
// Code block
function greeting(name) {
    console.log(\`Hello, \${name}!\`);
}
greeting('World');
\`\`\`

### Tables
| Header 1 | Header 2 |
|----------|----------|
| Cell 1   | Cell 2   |
| Cell 3   | Cell 4   |

### Task Lists
- [x] Completed task
- [ ] Incomplete task

### Links & Images
[Link Text](https://freemarkdown.com)
![Alt Text](https://freemarkdown.com/logo.png)

### Blockquotes
> This is a blockquote
> Multiple lines
`;

const FileUpload = ({ onFileContent }: { onFileContent: (content: string) => void }) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        onFileContent(content);
      };
      reader.readAsText(file);
    }
  }, [onFileContent]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/markdown': ['.md', '.markdown'],
      'text/plain': ['.txt']
    },
    multiple: false
  });

  return (
    <button
      {...getRootProps()}
      className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center gap-2"
      title="Upload Markdown File"
    >
      <input {...getInputProps()} />
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-5 w-5"
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" 
        />
      </svg>
      Upload MD
    </button>
  );
};

export default function Home() {
  const [markdownText, setMarkdownText] = useState(defaultMarkdown);
  const [isMobile, setIsMobile] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);
  const editorContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      const isFullscreenNow = !!(
        document.fullscreenElement ||
        (document as any).webkitFullscreenElement ||
        (document as any).mozFullScreenElement ||
        (document as any).msFullscreenElement
      );
      setIsFullscreen(isFullscreenNow);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, []);

  useEffect(() => {
    // 处理编辑器工具栏按钮点击
    const handleToolbarClick = (e: Event) => {
      if (!(e instanceof MouseEvent)) return;
      
      const target = e.target as HTMLElement;
      const fullscreenButton = target.closest('button[data-name="fullscreen"]');
      
      if (fullscreenButton) {
        e.preventDefault();
        e.stopPropagation();
        handleCustomFullscreen();
      }
    };

    const toolbar = document.querySelector('.w-md-editor-toolbar');
    if (toolbar) {
      toolbar.addEventListener('click', handleToolbarClick as EventListener);
    }

    return () => {
      if (toolbar) {
        toolbar.removeEventListener('click', handleToolbarClick as EventListener);
      }
    };
  }, [isFullscreen]);

  const requestFullscreen = (element: HTMLElement) => {
    if (element.requestFullscreen) {
      element.requestFullscreen().catch(console.error);
    } else if ((element as any).webkitRequestFullscreen) {
      (element as any).webkitRequestFullscreen().catch(console.error);
    } else if ((element as any).mozRequestFullScreen) {
      (element as any).mozRequestFullScreen().catch(console.error);
    } else if ((element as any).msRequestFullscreen) {
      (element as any).msRequestFullscreen().catch(console.error);
    }
  };

  const exitFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen().catch(console.error);
    } else if ((document as any).webkitExitFullscreen) {
      (document as any).webkitExitFullscreen();
    } else if ((document as any).mozCancelFullScreen) {
      (document as any).mozCancelFullScreen();
    } else if ((document as any).msExitFullscreen) {
      (document as any).msExitFullscreen();
    }
  };

  const handleCustomFullscreen = () => {
    const container = editorContainerRef.current;
    if (!container) return;

    if (!isFullscreen) {
      requestFullscreen(container);
    } else {
      exitFullscreen();
    }
  };

  const handleEditorFullscreen = (e: any) => {
    if (e?.target?.closest?.('.w-md-editor-toolbar')) {
      e.preventDefault();
      e.stopPropagation();
      
      const editorElement = e.target.closest('.w-md-editor');
      if (editorElement) {
        if (!isFullscreen) {
          requestFullscreen(editorElement);
        } else {
          exitFullscreen();
        }
      }
    }
  };

  const convertMarkdownToHtml = async (markdown: string) => {
    try {
      const MarkdownIt = await import('markdown-it');
      const hljs = await import('highlight.js/lib/common');
      
      const md = new MarkdownIt.default({
        html: true,
        linkify: true,
        typographer: true,
        breaks: true,
        highlight: function (str: string, lang: string) {
          if (lang && hljs.default.getLanguage(lang)) {
            try {
              return hljs.default.highlight(str, { language: lang }).value;
            } catch (err) {
              console.error('Highlight error:', err);
            }
          }
          return hljs.default.highlightAuto(str).value;
        }
      });

      return md.render(markdown);
    } catch (error) {
      console.error('Error in markdown conversion:', error);
      throw error;
    }
  };

  const handleConvert = async () => {
    try {
      if (!markdownText) {
        alert('Please enter some markdown content first.');
        return;
      }

      console.log('Converting markdown...');
      const htmlContent = await convertMarkdownToHtml(markdownText);
      
      if (!htmlContent) {
        throw new Error('Failed to generate HTML content');
      }

      console.log('HTML content generated successfully');
      
      const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Converted Markdown</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github.min.css">
    <style>
        body {
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
        }
        pre {
            background-color: #f6f8fa;
            padding: 16px;
            border-radius: 6px;
            overflow-x: auto;
        }
        code {
            font-family: 'SFMono-Regular', Consolas, monospace;
            font-size: 85%;
            background-color: #f6f8fa;
            padding: 0.2em 0.4em;
            border-radius: 3px;
        }
        pre code {
            background-color: transparent;
            padding: 0;
        }
        img {
            max-width: 100%;
            height: auto;
        }
        h1, h2, h3, h4, h5, h6 {
            margin-top: 24px;
            margin-bottom: 16px;
            font-weight: 600;
            line-height: 1.25;
        }
        a {
            color: #0366d6;
            text-decoration: none;
        }
        a:hover {
            text-decoration: underline;
        }
        blockquote {
            padding: 0 1em;
            color: #6a737d;
            border-left: 0.25em solid #dfe2e5;
            margin: 0;
        }
        table {
            border-collapse: collapse;
            width: 100%;
            margin: 16px 0;
        }
        table th, table td {
            border: 1px solid #dfe2e5;
            padding: 6px 13px;
        }
        table tr:nth-child(2n) {
            background-color: #f6f8fa;
        }
        .task-list-item {
            list-style-type: none;
        }
        .task-list-item input[type="checkbox"] {
            margin-right: 0.5em;
        }
    </style>
</head>
<body>
    ${htmlContent}
    <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"></script>
    <script>hljs.highlightAll();</script>
</body>
</html>`;

      console.log('Creating blob...');
      const blob = new Blob([fullHtml], { type: 'text/html;charset=utf-8' });
      console.log('Saving file...');
      saveAs(blob, 'converted.html');
      console.log('File saved successfully');
    } catch (error) {
      console.error('Detailed error:', error);
      alert('Error converting markdown. Please try again.');
    }
  };

  const handleFileContent = (content: string) => {
    setMarkdownText(content);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <style jsx global>{`
        .w-md-editor-preview {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
          line-height: 1.6 !important;
          color: #333 !important;
          padding: 20px !important;
          background-color: transparent !important;
        }
        .wmde-markdown {
          background-color: transparent !important;
        }
        .w-md-editor-preview pre {
          background-color: #f6f8fa !important;
          padding: 16px !important;
          border-radius: 6px !important;
          overflow-x: auto !important;
        }
        .w-md-editor-preview code {
          font-family: 'SFMono-Regular', Consolas, monospace !important;
          font-size: 85% !important;
          background-color: #f6f8fa !important;
          padding: 0.2em 0.4em !important;
          border-radius: 3px !important;
        }
        .w-md-editor-preview pre code {
          background-color: transparent !important;
          padding: 0 !important;
        }
        .w-md-editor-preview img {
          max-width: 100% !important;
          height: auto !important;
        }
        .w-md-editor-preview h1,
        .w-md-editor-preview h2,
        .w-md-editor-preview h3,
        .w-md-editor-preview h4,
        .w-md-editor-preview h5,
        .w-md-editor-preview h6 {
          margin-top: 24px !important;
          margin-bottom: 16px !important;
          font-weight: 600 !important;
          line-height: 1.25 !important;
        }
        .w-md-editor-preview a {
          color: #0366d6 !important;
          text-decoration: none !important;
        }
        .w-md-editor-preview a:hover {
          text-decoration: underline !important;
        }
        .w-md-editor-preview blockquote {
          padding: 0 1em !important;
          color: #6a737d !important;
          border-left: 0.25em solid #dfe2e5 !important;
          margin: 0 !important;
        }
        .w-md-editor-preview table {
          border-collapse: collapse !important;
          width: 100% !important;
          margin: 16px 0 !important;
        }
        .w-md-editor-preview table th,
        .w-md-editor-preview table td {
          border: 1px solid #dfe2e5 !important;
          padding: 6px 13px !important;
        }
        .w-md-editor-preview table tr:nth-child(2n) {
          background-color: #f6f8fa !important;
        }
        .w-md-editor-preview .task-list-item {
          list-style-type: none !important;
        }
        .w-md-editor-preview .task-list-item input[type="checkbox"] {
          margin-right: 0.5em !important;
        }
        .w-md-editor {
          border: 1px solid #e5e7eb !important;
          border-radius: 8px !important;
        }
        .w-md-editor-toolbar {
          border-bottom: 1px solid #e5e7eb !important;
          background-color: #f9fafb !important;
          border-top-left-radius: 8px !important;
          border-top-right-radius: 8px !important;
        }
        .w-md-editor-toolbar ul > li > button {
          color: #4b5563 !important;
        }
        .w-md-editor-toolbar ul > li > button:hover {
          background-color: #e5e7eb !important;
        }
        .w-md-editor-content {
          min-height: 500px !important;
        }
      `}</style>
      <div className="max-w-6xl mx-auto px-4 py-8">


        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="flex items-center gap-3">
              <Image 
                src="/logo.svg" 
                alt="FreeMarkdown Logo" 
                width={40} 
                height={40} 
                className="w-10 h-10"
                priority 
              />
              <h1 className="text-3xl font-bold text-gray-900">Free Markdown to HTML</h1>
            </div>
          </div>
          <p className="text-center text-lg text-gray-600 max-w-2xl mx-auto">
            Convert your Markdown to clean, semantic HTML instantly. Free, fast, and no sign-up required.
            <Link href="/markdown-syntax" className="text-blue-600 hover:underline ml-2">
              Learn Markdown Syntax
            </Link>
          </p>
        </header>

        {/* Editor Section */}
        <div className="mb-12 editor-container" ref={editorContainerRef}>
          <div className="p-0 md:p-6">
            <div data-color-mode="light" className="w-full" ref={editorRef}>
              <MDEditor
                value={markdownText}
                onChange={value => setMarkdownText(value || '')}
                preview={isMobile ? (showPreview ? "preview" : "edit") : "live"}
                height={isFullscreen ? "calc(100vh - 160px)" : (isMobile ? "calc(100vh - 300px)" : 500)}
                highlightEnable
                enableScroll
                hideToolbar={false}
                visibleDragbar
                textareaProps={{
                  placeholder: 'Write or paste your Markdown here...',
                }}
              />
            </div>
          </div>

          <div className="editor-actions">
            {/* 预览切换按钮 - 仅在移动端显示 */}
            {isMobile && (
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="preview-button"
                title={showPreview ? "Switch to Editor" : "Switch to Preview"}
              >
                {showPreview ? (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                    Switch to Editor
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                    Preview Markdown
                  </>
                )}
              </button>
            )}

            {/* File upload and fullscreen buttons */}
            <div className="flex gap-2">
              <FileUpload onFileContent={handleFileContent} />
              
              {!isMobile && (
                <button
                  onClick={handleCustomFullscreen}
                  className="fullscreen-button"
                  title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
                >
                  {isFullscreen ? (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M5 4a1 1 0 0 0-1 1v4a1 1 0 0 1-2 0V5a3 3 0 0 1 3-3h4a1 1 0 0 1 0 2H5zm10 0a1 1 0 0 1 1 1v4a1 1 0 1 0 2 0V5a3 3 0 0 0-3-3h-4a1 1 0 1 0 0 2h4zM5 16a1 1 0 0 1-1-1v-4a1 1 0 1 0-2 0v4a3 3 0 0 0 3 3h4a1 1 0 1 0 0-2H5zm10 0a1 1 0 0 0 1-1v-4a1 1 0 1 1 2 0v4a3 3 0 0 1-3 3h-4a1 1 0 1 1 0-2h4z" />
                      </svg>
                      Exit Fullscreen
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M3 4a1 1 0 0 1 1-1h4a1 1 0 0 1 0 2H5.414l4.293 4.293a1 1 0 0 1-1.414 1.414L4 6.414V9a1 1 0 0 1-2 0V4zm5 10a1 1 0 0 1 1.414 0L13 17.586V15a1 1 0 0 1 2 0v5a1 1 0 0 1-1 1h-5a1 1 0 0 1 0-2h2.586l-4.293-4.293A1 1 0 0 1 8 14z" />
                      </svg>
                      Fullscreen Editor
                    </>
                  )}
                </button>
              )}
            </div>

            <Link
              href="/markdown-template"
              className="theme-button"
            >
              Choose Theme & Convert
            </Link>

            <button
              onClick={handleConvert}
              className="convert-button"
            >
              Convert to HTML & Download
            </button>
          </div>
        </div>

        {/* Features Section */}
        <section className="py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Why Choose Our Converter?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="feature-card">
              <div className="feature-icon">🚀</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Real-time Preview</h3>
              <p className="text-gray-600">See your HTML output instantly as you type with our live preview feature.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">✨</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Clean HTML Output</h3>
              <p className="text-gray-600">Get semantic, well-formatted HTML that's ready to use in your projects.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎨</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Syntax Highlighting</h3>
              <p className="text-gray-600">Beautiful code syntax highlighting for over 180 programming languages.</p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="faq-card">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Is this tool really free?</h3>
              <p className="text-gray-600">Yes! Our Markdown to HTML converter is completely free to use with no limitations. No registration or sign-up required.</p>
            </div>
            <div className="faq-card">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">What can I use this tool for?</h3>
              <p className="text-gray-600">You can use this tool to convert Markdown to HTML for your blog posts, documentation, README files, or any other content that needs to be converted from Markdown to HTML format.</p>
            </div>
            <div className="faq-card">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">What Markdown features are supported?</h3>
              <p className="text-gray-600">We support all standard Markdown features including headers, lists, code blocks with syntax highlighting, tables, task lists, blockquotes, and more.</p>
            </div>
            <div className="faq-card">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Can I use the generated HTML anywhere?</h3>
              <p className="text-gray-600">Yes! The HTML output is clean, semantic, and can be used anywhere that accepts HTML content. It includes necessary CSS for proper styling.</p>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      {/* <footer className="bg-white border-t">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Image src="/logo.svg" alt="FreeMarkdown Logo" width={24} height={24} className="mr-2" />
              <span className="text-lg font-semibold text-gray-900">FreeMarkdown.com</span>
            </div>
            <p className="text-gray-600 mb-2">Convert your Markdown to HTML easily and freely. No registration required.</p>
            <p className="text-sm text-gray-500"> 2023 FreeMarkdown.com - All rights reserved.</p>
          </div>
        </div>
      </footer> */}
    </main>
  );
}
