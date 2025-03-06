'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface MarkdownSyntaxProps {}

const MarkdownSyntax: React.FC<MarkdownSyntaxProps> = () => {
  return React.createElement('div', { className: 'min-h-screen bg-gray-50 flex flex-col' },
    // Main content wrapper
    React.createElement('div', { className: 'flex-grow' },
      React.createElement('div', { className: 'max-w-4xl mx-auto px-4 py-8' },
        // Header
        React.createElement('header', { className: 'mb-12 text-center' },
          React.createElement(Link, { 
            href: '/',
            className: 'inline-flex items-center gap-3 mb-6 hover:opacity-80 transition-opacity'
          },
            // React.createElement(Image, {
            //   src: '/logo.svg',
            //   alt: 'Free Markdown to HTML Converter',
            //   width: 40,
            //   height: 40,
            //   className: 'w-10 h-10'
            // }),
            React.createElement('h1', { className: 'text-3xl font-bold text-gray-900' }, 
              'Complete Markdown Guide'
            )
          ),
          React.createElement('p', { className: 'text-xl text-gray-600 max-w-2xl mx-auto' },
            'Master Markdown with our comprehensive guide. Learn how to format text, create lists, add links, and convert to HTML using our free online converter.'
          )
        ),

        // Main Content
        React.createElement('div', { className: 'prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-600' },
          // What is Markdown section
          React.createElement('section', { className: 'mb-12' },
            React.createElement('h2', { className: 'text-2xl font-bold mb-6' }, 'What is Markdown?'),
            React.createElement('p', {},
              'Markdown is a lightweight markup language created by John Gruber in 2004. It allows you to write using an easy-to-read, easy-to-write plain text format, which can then be converted into structurally valid HTML. Our free Markdown to HTML converter makes this conversion process simple and efficient.'
            ),
            React.createElement('p', {},
              'Whether you\'re writing documentation, README files, or blog posts, Markdown\'s simplicity and flexibility make it an excellent choice for both beginners and experienced writers.'
            )
          ),

          // Basic Syntax section
          React.createElement('section', { className: 'mb-12' },
            React.createElement('h2', { className: 'text-2xl font-bold mb-6' }, 'Basic Markdown Syntax'),
            
            // Headers
            React.createElement('div', { className: 'mb-8' },
              React.createElement('h3', { className: 'text-xl font-semibold mb-4' }, 'Headers'),
              React.createElement('p', { className: 'mb-4' }, 'Create headers using # symbols:'),
              React.createElement('pre', { className: 'bg-gray-50 p-4 rounded-lg' },
                React.createElement('code', {},
                  '# H1 Header\n## H2 Header\n### H3 Header\n#### H4 Header\n##### H5 Header\n###### H6 Header'
                )
              )
            ),

            // Emphasis
            React.createElement('div', { className: 'mb-8' },
              React.createElement('h3', { className: 'text-xl font-semibold mb-4' }, 'Text Formatting'),
              React.createElement('p', { className: 'mb-4' }, 'Format text with various styles:'),
              React.createElement('pre', { className: 'bg-gray-50 p-4 rounded-lg' },
                React.createElement('code', {},
                  '*Italic text* or _italic text_\n**Bold text** or __bold text__\n***Bold and italic*** or ___bold and italic___\n~~Strikethrough text~~'
                )
              )
            ),

            // Lists
            React.createElement('div', { className: 'mb-8' },
              React.createElement('h3', { className: 'text-xl font-semibold mb-4' }, 'Lists'),
              React.createElement('p', { className: 'mb-4' }, 'Create ordered and unordered lists:'),
              React.createElement('pre', { className: 'bg-gray-50 p-4 rounded-lg' },
                React.createElement('code', {},
                  '1. First item\n2. Second item\n   * Nested unordered item\n3. Third item\n\n* Unordered item\n* Another item\n  1. Nested ordered item\n* Last item'
                )
              )
            ),

            // Links and Images
            React.createElement('div', { className: 'mb-8' },
              React.createElement('h3', { className: 'text-xl font-semibold mb-4' }, 'Links and Images'),
              React.createElement('p', { className: 'mb-4' }, 'Add links and images to your content:'),
              React.createElement('pre', { className: 'bg-gray-50 p-4 rounded-lg' },
                React.createElement('code', {},
                  '[Link text](https://freemarkdown.com)\n[Link with title](https://freemarkdown.com "Link title")\n\n![Image alt text](image.jpg)\n![Image with title](image.jpg "Image title")'
                )
              )
            ),

            // Code Blocks
            React.createElement('div', { className: 'mb-8' },
              React.createElement('h3', { className: 'text-xl font-semibold mb-4' }, 'Code'),
              React.createElement('p', { className: 'mb-4' }, 'Display code with syntax highlighting:'),
              React.createElement('pre', { className: 'bg-gray-50 p-4 rounded-lg' },
                React.createElement('code', {},
                  'Inline `code` with backticks\n\n```javascript\n// Code block\nfunction example() {\n    return "hello world";\n}\n```'
                )
              )
            ),

            // Tables
            React.createElement('div', { className: 'mb-8' },
              React.createElement('h3', { className: 'text-xl font-semibold mb-4' }, 'Tables'),
              React.createElement('p', { className: 'mb-4' }, 'Create tables with alignment options:'),
              React.createElement('pre', { className: 'bg-gray-50 p-4 rounded-lg' },
                React.createElement('code', {},
                  '| Left | Center | Right |\n|:-----|:------:|------:|\n|Cell 1|Cell 2|Cell 3|\n|Cell 4|Cell 5|Cell 6|'
                )
              )
            ),

            // Blockquotes
            React.createElement('div', { className: 'mb-8' },
              React.createElement('h3', { className: 'text-xl font-semibold mb-4' }, 'Blockquotes'),
              React.createElement('p', { className: 'mb-4' }, 'Add quotes and nested quotes:'),
              React.createElement('pre', { className: 'bg-gray-50 p-4 rounded-lg' },
                React.createElement('code', {},
                  '> First level quote\n>> Nested quote\n>>> Deeper nested quote'
                )
              )
            ),

            // Task Lists
            React.createElement('div', { className: 'mb-8' },
              React.createElement('h3', { className: 'text-xl font-semibold mb-4' }, 'Task Lists'),
              React.createElement('p', { className: 'mb-4' }, 'Create interactive task lists:'),
              React.createElement('pre', { className: 'bg-gray-50 p-4 rounded-lg' },
                React.createElement('code', {},
                  '- [x] Completed task\n- [ ] Pending task\n- [x] Another completed task'
                )
              )
            ),

            // Footnotes
            React.createElement('div', { className: 'mb-8' },
              React.createElement('h3', { className: 'text-xl font-semibold mb-4' }, 'Footnotes'),
              React.createElement('p', { className: 'mb-4' }, 'Add footnotes to your text:'),
              React.createElement('pre', { className: 'bg-gray-50 p-4 rounded-lg' },
                React.createElement('code', {},
                  'Here\'s a sentence with a footnote[^1].\n\n[^1]: This is the footnote content.'
                )
              )
            )
          ),

          // References section
          React.createElement('section', { className: 'mb-12' },
            React.createElement('h2', { className: 'text-2xl font-bold mb-6' }, 'References and Further Reading'),
            React.createElement('ul', { className: 'list-disc pl-6 space-y-2' },
              React.createElement('li', {},
                React.createElement('a', 
                  { 
                    href: 'https://en.wikipedia.org/wiki/Markdown',
                    className: 'text-blue-600 hover:underline',
                    target: '_blank',
                    rel: 'noopener noreferrer'
                  },
                  'Markdown - Wikipedia'
                )
              ),
              React.createElement('li', {},
                React.createElement('a',
                  {
                    href: 'https://daringfireball.net/projects/markdown/',
                    className: 'text-blue-600 hover:underline',
                    target: '_blank',
                    rel: 'noopener noreferrer'
                  },
                  'Daring Fireball: Markdown by John Gruber'
                )
              ),
              React.createElement('li', {},
                React.createElement('a',
                  {
                    href: 'https://github.github.com/gfm/',
                    className: 'text-blue-600 hover:underline',
                    target: '_blank',
                    rel: 'noopener noreferrer'
                  },
                  'GitHub Flavored Markdown Spec'
                )
              )
            )
          ),

          // Try Converter section
          React.createElement('section', { className: 'mb-12' },
            React.createElement('h2', { className: 'text-2xl font-bold mb-6' }, 'Try Our Free Converter'),
            React.createElement('p', { className: 'mb-6' },
              'Ready to convert your Markdown to clean HTML? Our free online converter makes it easy. Just write or paste your Markdown content, and get beautifully formatted HTML instantly.'
            ),
            React.createElement('div', { className: 'flex justify-center' },
              React.createElement(Link, {
                href: '/',
                className: 'inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
              }, 'Start Converting Now')
            )
          )
        )
      )
    ),

    // Footer
    // React.createElement('footer', { className: 'bg-white border-t mt-auto' },
    //   React.createElement('div', { className: 'max-w-6xl mx-auto px-4 py-8' },
    //     React.createElement('div', { className: 'text-center' },
    //       React.createElement('div', { className: 'flex items-center justify-center mb-4' },
    //         React.createElement(Image, {
    //           src: '/logo.svg',
    //           alt: 'FreeMarkdown Logo',
    //           width: 24,
    //           height: 24,
    //           className: 'mr-2'
    //         }),
    //         React.createElement('span', { className: 'text-lg font-semibold text-gray-900' },
    //           'FreeMarkdown.com'
    //         )
    //       ),
    //       React.createElement('p', { className: 'text-gray-600 mb-2' },
    //         'Convert your Markdown to HTML easily and freely. No registration required.'
    //       ),
    //       React.createElement('p', { className: 'text-sm text-gray-500' },
    //         '© 2024 FreeMarkdown.com - All rights reserved.'
    //       )
    //     )
    //   )
    // )
  );
};

export default MarkdownSyntax; 