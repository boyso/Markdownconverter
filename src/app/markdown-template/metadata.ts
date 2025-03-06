import { Metadata } from 'next';

const siteUrl = 'https://freemarkdown.com';

export const metadata: Metadata = {
  title: 'Markdown HTML Themes | Free Markdown to HTML Converter',
  description: 'Choose from beautiful themes to style your Markdown content. Convert to HTML with custom themes, backgrounds, and typography. Free and no registration required.',
  keywords: [
    'markdown themes',
    'markdown to html themes',
    'markdown styling',
    'markdown templates',
    'themed markdown converter',
    'markdown html themes',
    'free markdown themes',
    'markdown css templates'
  ].join(', '),
  alternates: {
    canonical: `${siteUrl}/markdown-template`,
  },
  openGraph: {
    title: 'Markdown HTML Themes | Free Markdown to HTML Converter',
    description: 'Choose from beautiful themes to style your Markdown content. Convert to HTML with custom themes, backgrounds, and typography.',
    url: `${siteUrl}/markdown-template`,
    siteName: 'FreeMarkdown.com',
    locale: 'en_US',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Markdown HTML Themes | Free Markdown to HTML Converter',
    description: 'Choose from beautiful themes to style your Markdown content. Convert to HTML with custom themes, backgrounds, and typography.',
  }
}; 