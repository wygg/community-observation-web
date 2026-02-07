import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { PostCard } from '@/components/PostCard';
import { HeroSection } from '@/components/HeroSection';
import { StatsSection } from '@/components/StatsSection';

const postsDirectory = path.join(process.cwd(), 'content', 'observations');

function getSortedPostsData() {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((name) => name.endsWith('.md'))
    .map((fileName) => {
      const id = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const matterResult = matter(fileContents);

      return {
        id,
        ...matterResult.data,
      };
    });

  return allPostsData.sort((a: any, b: any) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export default function Home() {
  const posts = getSortedPostsData();
  const postCount = posts.length;
  const categories = [...new Set(posts.map((post: any) => post.category))].length;
  const locations = [...new Set(posts.map((post: any) => post.location))].length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <HeroSection />
      
      <StatsSection 
        postCount={postCount} 
        categories={categories} 
        locations={locations} 
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            最新观察
            <span className="ml-3 text-2xl font-normal text-gray-500">
              ({postCount} 篇)
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            深入社区每一个角落，发现生活中的设计智慧和人文关怀
          </p>
        </div>
        
        {posts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-lg border border-gray-100">
            <div className="max-w-md mx-auto">
              <div className="w-20 h-20 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">开始你的第一次观察</h3>
              <p className="text-gray-600">
                在 <code className="bg-gray-100 px-2 py-1 rounded text-sm">content/observations/</code> 目录下添加你的第一个 Markdown 观察笔记
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post: any) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </main>

      <footer className="bg-white border-t border-gray-100 mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <h3 className="text-lg font-bold text-gray-900 mb-4">社区考现学</h3>
              <p className="text-gray-600 text-sm">
                通过细致的观察和深入的思考，发现社区中的人文关怀和设计智慧。
              </p>
            </div>
            <div className="md:col-span-1">
              <h4 className="font-semibold text-gray-900 mb-4">观察领域</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>🏢 公共空间设计</li>
                <li>🚗 交通设施规划</li>
                <li>🌱 绿化环境维护</li>
                <li>🔒 安全设施配置</li>
              </ul>
            </div>
            <div className="md:col-span-1">
              <h4 className="font-semibold text-gray-900 mb-4">技术栈</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>⚛️ Next.js 14</li>
                <li>🎨 Tailwind CSS</li>
                <li>📝 Obsidian</li>
                <li>🚀 Vercel</li>
              </ul>
            </div>
            <div className="md:col-span-1">
              <h4 className="font-semibold text-gray-900 mb-4">关于项目</h4>
              <p className="text-sm text-gray-600">
                基于 Next.js + Obsidian + GitHub + Vercel 构建的现代化观察记录平台。
              </p>
              <div className="flex space-x-4 mt-4">
                <a href="https://github.com/wygg/community-observation-web" 
                   className="text-gray-400 hover:text-gray-600 transition-colors">
                  GitHub
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-100 mt-8 pt-8 text-center">
            <p className="text-sm text-gray-500">
              © 2024 社区考现学. 用心观察，用爱记录.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}