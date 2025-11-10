# Cyberpunk Resume Portfolio

![Demo Screenshot](https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80)

一个赛博朋克风格的简历作品展示网站，专为求职者或自由职业者设计，融合了未来主义视觉效果和动态交互体验。

## 技术栈

- **前端框架**: React 18
- **UI 框架**: Tailwind CSS
- **动画库**: GSAP
- **路由**: React Router
- **数据管理**: 本地 JSON 文件
- **部署平台**: Vercel / Netlify / GitHub Pages

## 功能特性

1. **赛博朋克风格**:
   - RGB 分离效果
   - 扫描线动画
   - 数据损坏纹样
   - 乱码文字特效

2. **核心模块**:
   - 个人简历展示
   - 项目作品展示
   - 技能雷达图
   - 加载状态管理

3. **响应式设计**:
   - 适配移动端和桌面端

## 运行项目

### 开发环境

1. 克隆仓库:
   ```bash
   git clone https://github.com/your-repo/cyberpunk-resume-portfolio.git
   cd cyberpunk-resume-portfolio/frontend
安装依赖:

npm install
启动开发服务器:

npm run dev
打开浏览器访问:

http://localhost:3000
生产构建
构建项目:

npm run build
启动生产服务器:

npm run preview
部署指南
Vercel 部署
将代码推送到 GitHub 仓库。
登录 Vercel。
选择 "Import Project"，关联你的 GitHub 仓库。
配置部署设置（默认即可）。
点击 "Deploy"。
Netlify 部署
将代码推送到 GitHub 仓库。
登录 Netlify。
选择 "New site from Git"，关联你的 GitHub 仓库。
配置构建命令和发布目录:
Build command: npm run build
Publish directory: dist
点击 "Deploy site"。
GitHub Pages 部署
修改 vite.config.js 中的 base 为你的仓库名:

base: '/your-repo-name/'
构建项目:

npm run build
将 dist 文件夹推送到 GitHub 仓库的 gh-pages 分支:

git subtree push --prefix dist origin gh-pages
在 GitHub 仓库的 Settings > Pages 中启用 gh-pages 分支。

数据定制
简历数据: data/resume.json
项目数据: data/projects.json
技能数据: data/skills.json
贡献
欢迎提交 Issue 或 Pull Request！

许可证
MIT License


### 补充说明
1. **部署链接**：替换 `your-repo` 为你的实际仓库名。
2. **图片链接**：可以替换为实际的项目截图。
3. **数据定制**：用户可以根据需要修改 JSON 文件中的内容。

如果需要进一步调整，请告诉我！
