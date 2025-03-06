import { Metadata } from 'next';

const siteUrl = 'https://freemarkdown.com';

export const metadata: Metadata = {
  title: 'Complete Markdown Guide | Free Online Markdown to HTML Converter',
  description: 'Learn Markdown syntax with our comprehensive guide. Format text, create lists, add code blocks, and convert to HTML using our free online converter. Perfect for documentation, README files, and blog posts.',
  keywords: [
    'markdown guide',
    'markdown syntax',
    'markdown to html',
    'markdown converter',
    'free markdown',
    'markdown tutorial',
    'markdown cheatsheet',
    'markdown formatting',
    'markdown editor online',
    'convert markdown to html'
  ].join(', '),
  alternates: {
    canonical: `${siteUrl}/markdown-syntax`,
  },
  openGraph: {
    title: 'Complete Markdown Guide | Free Online Markdown to HTML Converter',
    description: 'Master Markdown with our comprehensive guide. Learn text formatting, lists, code blocks, and more. Convert to HTML instantly with our free online tool.',
    url: `${siteUrl}/markdown-syntax`,
    siteName: 'FreeMarkdown.com',
    locale: 'en_US',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Complete Markdown Guide | Free Online Markdown to HTML Converter',
    description: 'Master Markdown with our comprehensive guide. Learn text formatting, lists, code blocks, and more. Convert to HTML instantly with our free online tool.',
  }
}; 