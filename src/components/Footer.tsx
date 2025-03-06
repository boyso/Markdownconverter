import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Image src="/logo.svg" alt="FreeMarkdown Logo" width={24} height={24} />
              <span className="text-lg font-semibold text-gray-900">FreeMarkdown.com</span>
            </div>
            <p className="text-gray-600 mb-4">
              Convert your Markdown to HTML easily and freely. Choose from beautiful themes, 
              customize your content, and download clean HTML. No registration required.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Markdown Converter
                </Link>
              </li>
              <li>
                <Link href="/markdown-template" className="text-gray-600 hover:text-blue-600 transition-colors">
                  HTML Themes
                </Link>
              </li>
              <li>
                <Link href="/markdown-syntax" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Markdown Syntax
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 hover:text-blue-600 transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://github.com/boyso/Markdownconverter"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  GitHub Flavored Markdown
                </a>
              </li>
              <li>
                <a 
                  href="https://daringfireball.net/projects/markdown/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Original Markdown
                </a>
              </li>
              <li>
                <a href="https://allinai.tools" target="_blank">All in AI Tools</a>
                <a href="https://freefavico.com" target="_blank">Jpg to Favicon Converter</a>
                <a href="https://freepdfjpg.com" target="_blank">Jpg to PDF Converter</a>
                <a href="https://textformat.org" target="_blank">Text format</a>
                <a href="https://domainquery.app" target="_blank">Domain Query Tools</a>
                <a href="https://flux1.shop" target="_blank">AI image generator</a>
                <a href="https://aianimegenerator.app" target="_blank">AI Anime Generator</a>
                <a href="https://wanvideo.space" target="_blank">Wan video</a>
                <a href="https://claudecode.app" target="_blank">Claude Code</a>
                <a href="https://claudecode.app/mcp" target="_blank">Claude MCP servers</a>
                <a href="https://1bz.net" target="_blank">1BZ Free Games</a>
                <a href="https://screen.diy">Blackscreen</a>
              </li>
            </ul>
          </div>

          
        </div>

        <div className="border-t mt-8 pt-8 text-center">
          <p className="text-gray-600 mb-2">
            Made with ❤️ <a href='https://allinai.tools' target='_blank'>All in AI</a>
          </p>
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} FreeMarkdown.com - All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
} 