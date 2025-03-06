# Markdown to HTML Converter

<div align="center">
  <img src="https://freemarkdown.com/logo.png" alt="Markdown Converter Logo" width="200" />
</div>

[English](#english) | [中文](#chinese) | [Try Online ↗](https://freemarkdown.com/)

<a name="chinese"></a>

## 中文版

一个轻度的在线 [Markdown to HTML](https://freemarkdown.com)工具，支持实时预览和 HTML 导出功能,新增了轻度优雅的主题样式。

### ✨ 主要功能

- 📝 实时 Markdown 编辑与预览
- 🔄 [Markdown to HTML](https://freemarkdown.com/) 导出
- 📱 响应式设计，支持移动端
- 📂 支持 Markdown 文件上传
- 🎨 代码高亮显示
- 🖼️ 全屏编辑模式
- 🎯 支持常用 Markdown 语法
- 🌐 内置 Markdown 语法指南

### 🛠️ 技术栈

- **框架**: Next.js 14
- **UI 组件**: React
- **Markdown 编辑器**: @uiw/react-md-editor
- **Markdown 解析**: markdown-it
- **代码高亮**: highlight.js
- **样式**: Tailwind CSS
- **文件处理**: react-dropzone, file-saver

### 🚀 快速开始

1. 克隆项目
```bash
git clone [repository-url]
cd mdtohtml
```

2. 安装依赖
```bash
npm install
# 或
yarn install
```

3. 启动开发服务器
```bash
npm run dev
# 或
yarn dev
```

4. 打开浏览器访问 `http://localhost:3000`

### 📖 使用说明

1. **编辑 Markdown**
   - 直接在编辑器中输入 Markdown 文本
   - 使用工具栏快捷按钮添加格式
   - 支持实时预览

2. **文件操作**
   - 点击"Upload MD"上传现有的 Markdown 文件
   - 使用"Convert to HTML"将内容转换为 HTML
   - 转换后的 HTML 文件将自动下载

3. **界面操作**
   - 使用全屏按钮进入沉浸式编辑模式
   - 移动端可切换编辑/预览模式

### 📝 支持的 Markdown 语法

- 标题（H1-H6）
- 文本格式化（粗体、斜体、删除线）
- 列表（有序、无序）
- 代码块（支持语法高亮）
- 表格
- 链接和图片
- 引用块
- 任务列表
- 水平分割线

### 🤝 贡献指南

欢迎提交 Issue 和 Pull Request 来帮助改进项目。

### 📄 许可证

[MIT License](LICENSE)

---

<a name="english"></a>

## English Version

A modern online [Markdown converter](https://freemarkdown.com/) with real-time preview and HTML export capabilities.

### ✨ Key Features

- 📝 Real-time Markdown editing and preview
- 🔄 [Markdown to HTML conversion](https://freemarkdown.com/) and export
- 📱 Responsive design for mobile devices
- 📂 Markdown file upload support
- 🎨 Code syntax highlighting
- 🖼️ Fullscreen editing mode
- 🎯 Common Markdown syntax support
- 🌐 Built-in Markdown syntax guide

### 🛠️ Tech Stack

- **Framework**: Next.js 14
- **UI Components**: React
- **Markdown Editor**: @uiw/react-md-editor
- **Markdown Parser**: markdown-it
- **Code Highlighting**: highlight.js
- **Styling**: Tailwind CSS
- **File Handling**: react-dropzone, file-saver

### 🚀 Quick Start

1. Clone the repository
```bash
git clone [repository-url]
cd mdtohtml
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Start the development server
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and visit `http://localhost:3000`

### 📖 Usage Guide

1. **Editing Markdown**
   - Type Markdown text directly in the editor
   - Use toolbar buttons for quick formatting
   - See changes in real-time preview

2. **File Operations**
   - Click "Upload MD" to upload existing Markdown files
   - Use "Convert to HTML" to transform content to HTML
   - Converted HTML files will download automatically

3. **Interface Controls**
   - Enter immersive editing mode with fullscreen button
   - Toggle between edit/preview modes on mobile devices

### 📝 Supported Markdown Syntax

- Headers (H1-H6)
- Text formatting (bold, italic, strikethrough)
- Lists (ordered and unordered)
- Code blocks (with syntax highlighting)
- Tables
- Links and images
- Blockquotes
- Task lists
- Horizontal rules

### 🤝 Contributing

Issues and Pull Requests are welcome to help improve the project.

### 📄 License

[MIT License](LICENSE)
