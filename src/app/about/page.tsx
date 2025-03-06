import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';

// 移动 metadata 到页面文件中
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
    canonical: 'https://freemarkdown.com/about',
  },
  openGraph: {
    title: 'About FreeMarkdown | Free Markdown to HTML Converter',
    description: 'Learn about FreeMarkdown.com and our mission to provide free Markdown to HTML conversion tools for everyone.',
    url: 'https://freemarkdown.com/about',
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

// 移除 'use client' 指令，使其成为静态页面
export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            About FreeMarkdown
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A free, open-source tool helping people convert Markdown to beautiful HTML since 2024.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Mission Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Mission</h2>
          <div className="prose prose-lg max-w-none">
            <p>
              <a href="https://freemarkdown.com" className="text-blue-600 hover:underline">Free Mark down</a> was created with a simple mission: to make Markdown conversion 
              accessible to everyone. We believe in the power of Markdown as a writing format 
              and want to help people transform their content into beautiful HTML without any barriers.
            </p>
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">What We Offer</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg border">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Free Markdown Converter
              </h3>
              <p className="text-gray-600">
                Convert your Markdown to clean, semantic HTML instantly. No registration required, 
                no limitations, completely free.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg border">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Beautiful Themes
              </h3>
              <p className="text-gray-600">
                Choose from a variety of carefully crafted themes to make your content look 
                professional and polished.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg border">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Comprehensive Guide
              </h3>
              <p className="text-gray-600">
                Learn Markdown syntax with our detailed guide, perfect for both beginners 
                and experienced users.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg border">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Open Source
              </h3>
              <p className="text-gray-600">
               We plan to open-source our project, and it will soon be available on GitHub. Currently, it is still in the planning phase
              </p>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Choose Us</h2>
          <div className="prose prose-lg max-w-none">
            <ul>
              <li>
                <strong>No Registration Required</strong> - Start converting immediately, 
                no sign-up needed.
              </li>
              <li>
                <strong>Privacy Focused</strong> - We don't store your content or track 
                your usage.
              </li>
              <li>
                <strong>Fast & Reliable</strong> - Built with modern technology for 
                quick and dependable conversions.
              </li>
              <li>
                <strong>Regular Updates</strong> - We continuously improve our tools 
                and add new features.
              </li>
            </ul>
          </div>
        </section>

        {/* Get Started Section */}
        <section className="bg-blue-50 p-8 rounded-lg text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-gray-600 mb-6">
            Try our Markdown converter now and see the difference for yourself.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Try Converter
            </Link>
            <Link
              href="/markdown-syntax"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors border border-blue-600"
            >
              Learn Markdown
            </Link>
          </div>
        </section>

        {/* Contact Section */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
          <div className="prose prose-lg max-w-none">
            <p>
              Have questions or suggestions? We'd love to hear from you. You can:
            </p>
            <ul>
              <li>
                <a 
                  href="https://github.com/boyso/Markdownconverter"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Visit our GitHub repository
                </a>
              </li>
              <li>
                <a 
                  href="mailto:support@freemarkdown.com"
                  className="text-blue-600 hover:underline"
                >
                  Email us at support@freemarkdown.com
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
} 