import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { PostCard } from '@/components/PostCard';

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

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">小区考现学</h1>
          <p className="mt-2 text-gray-600">观察、记录、思考我们生活的社区</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">最新观察</h2>
          {posts.length === 0 ? (
            <div className="text-gray-500 text-center py-8">
              暂无观察记录，请在 content/observations/ 目录下添加 Markdown 文件
            </div>
          ) : (
            <div className="space-y-6">
              {posts.map((post: any) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </main>

      <footer className="bg-white border-t mt-12">
        <div className="max-w-4xl mx-auto px-4 py-6 text-center text-gray-600">
          <p>基于 Next.js + Obsidian + GitHub + Vercel 构建</p>
        </div>
      </footer>
    </div>
  );
}