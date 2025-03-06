import { Metadata } from 'next';

const siteUrl = 'https://freemarkdown.com';

export const metadata: Metadata = {
  title: 'About FreeMarkdown | Free Markdown to HTML Converter',
  description: 'Learn about FreeMarkdown.com, our mission to provide free Markdown to HTML conversion, and the team behind the project.',
  keywords: [
    'about freemarkdown',
    'markdown converter',
    'free markdown tool',
    'markdown to html',
    'open source markdown',
    'markdown themes',
    'markdown guide'
  ].join(', '),
  alternates: {
    canonical: `${siteUrl}/about`,
  },
  openGraph: {
    title: 'About FreeMarkdown | Free Markdown to HTML Converter',
    description: 'Learn about FreeMarkdown.com and our mission to provide free Markdown to HTML conversion tools for everyone.',
    url: `${siteUrl}/about`,
    siteName: 'FreeMarkdown.com',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About FreeMarkdown | Free Markdown to HTML Converter',
    description: 'Learn about FreeMarkdown.com and our mission to provide free Markdown to HTML conversion tools for everyone.',
  }
}; 