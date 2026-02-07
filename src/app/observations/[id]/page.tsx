import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { notFound } from 'next/navigation';
import { remark } from 'remark';
import html from 'remark-html';
import Image from 'next/image';

const postsDirectory = path.join(process.cwd(), 'content', 'observations');

interface PostData {
  id: string;
  title: string;
  date: string;
  location: string;
  category: string;
  tags: string[];
  youtube?: string;
  images?: string[];
  content: string;
}

async function getPostData(id: string): Promise<PostData> {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  
  if (!fs.existsSync(fullPath)) {
    notFound();
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    id,
    content: contentHtml,
    ...matterResult.data,
  } as PostData;
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const post = await getPostData(params.id);
  
  return {
    title: post.title,
    description: `小区考现学观察 - ${post.location}`,
  };
}

export default async function ObservationPost({ params }: { params: { id: string } }) {
  const post = await getPostData(params.id);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="mb-4">
            <a href="/" className="text-blue-600 hover:text-blue-800 text-sm">
              ← 返回首页
            </a>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">{post.title}</h1>
          <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-gray-600">
            <span className="flex items-center">
              📅 {post.date}
            </span>
            <span className="flex items-center">
              📍 {post.location}
            </span>
            <span className="flex items-center">
              📁 {post.category}
            </span>
          </div>
          {post.tags && post.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <article className="bg-white rounded-lg shadow-sm p-6">
          {post.youtube && (
            <div className="mb-6">
              <div className="aspect-video rounded-lg overflow-hidden">
                <iframe
                  src={`https://www.youtube.com/embed/${post.youtube}`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            </div>
          )}

          {post.images && post.images.length > 0 && (
            <div className="mb-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {post.images.map((image, index) => (
                  <div key={index} className="relative aspect-video rounded-lg overflow-hidden">
                    <Image
                      src={image}
                      alt={`${post.title} - 图片 ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div 
            className="prose prose-gray max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </main>

      <footer className="bg-white border-t mt-12">
        <div className="max-w-4xl mx-auto px-4 py-6 text-center">
          <a href="/" className="text-blue-600 hover:text-blue-800">
            ← 返回首页
          </a>
        </div>
      </footer>
    </div>
  );
}