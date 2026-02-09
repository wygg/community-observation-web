import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { notFound } from 'next/navigation';
import { remark } from 'remark';
import html from 'remark-html';
import Image from 'next/image';
import Link from 'next/link';

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

async function processFile(fullPath: string): Promise<PostData> {
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Extract id from filename
  const id = path.basename(fullPath, '.md');

  return {
    id,
    content: contentHtml,
    ...matterResult.data,
  } as PostData;
}

async function getPostData(id: string): Promise<PostData> {
  // Decode URL parameter to handle spaces and Chinese characters
  const decodedId = decodeURIComponent(id);
  const fullPath = path.join(postsDirectory, `${decodedId}.md`);
  
  // Debug logging
  console.log('=== Debug Info ===');
  console.log('Original id:', id);
  console.log('Decoded id:', decodedId);
  console.log('Expected path:', fullPath);
  console.log('File exists:', fs.existsSync(fullPath));
  
  if (fs.existsSync(fullPath)) {
    return processFile(fullPath);
  }
  
  // If direct path doesn't work, try to find matching file
  console.log('Trying alternative file matching...');
  const files = fs.readdirSync(postsDirectory);
  console.log('Available files:', files);
  
  const matchingFile = files.find(file => {
    const fileWithoutExt = file.replace('.md', '');
    console.log(`Comparing: "${fileWithoutExt}" with "${decodedId}"`);
    return fileWithoutExt === decodedId;
  });
  
  if (matchingFile) {
    const altPath = path.join(postsDirectory, matchingFile);
    console.log('Found matching file:', altPath);
    return processFile(altPath);
  }
  
  console.log('No matching file found for:', decodedId);
  notFound();
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const post = await getPostData(params.id);
  
  return {
    title: `${post.title} - 社区考现学`,
    description: `在${post.location}的深度观察记录 - ${post.category}`,
  };
}

export default async function ObservationPost({ params }: { params: { id: string } }) {
  const post = await getPostData(params.id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* 顶部导航 */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link 
              href="/" 
              className="flex items-center text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              返回观察列表
            </Link>
            
            <div className="flex items-center space-x-4">
              <span className="px-3 py-1 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 rounded-full text-sm font-medium">
                {post.category}
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 文章头部信息 */}
        <article className="bg-white rounded-3xl shadow-xl overflow-hidden">
          {/* 头部背景 */}
          <div className="relative h-64 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700">
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="flex flex-wrap gap-3 mb-4">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-white/90 text-sm">
                <span className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {post.date}
                </span>
                <span className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {post.location}
                </span>
              </div>
            </div>
          </div>

          <div className="p-8 md:p-12">
            {/* 媒体内容区域 */}
            {(post.youtube || post.images) && (
              <div className="mb-8">
                {post.youtube && (
                  <div className="mb-6">
                    <div className="aspect-video rounded-2xl overflow-hidden shadow-lg">
                      <iframe
                        src={`https://www.youtube.com/embed/${post.youtube}`}
                        title={`${post.title} - 视频记录`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                      />
                    </div>
                  </div>
                )}

                {post.images && post.images.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      观察图片
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {post.images.map((image, index) => (
                        <div key={index} className="group relative rounded-2xl overflow-hidden shadow-lg">
                          <div className="aspect-video">
                            <Image
                              src={image}
                              alt={`${post.title} - 图片 ${index + 1}`}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 文章内容 */}
            <div className="prose prose-lg prose-gray max-w-none">
              <div 
                className="lead text-xl text-gray-600 leading-relaxed mb-8"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>

            {/* 文章底部信息 */}
            <div className="mt-12 pt-8 border-t border-gray-100">
              <div className="flex flex-col sm:flex-row justify-between items-center">
                <div className="text-center sm:text-left mb-4 sm:mb-0">
                  <p className="text-gray-600 text-sm">
                    这篇观察记录发布于 {post.date}
                  </p>
                  <p className="text-gray-500 text-sm mt-1">
                    分类：{post.category} | 地点：{post.location}
                  </p>
                </div>
                <Link
                  href="/"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                >
                  查看更多观察
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </article>

        {/* 相关文章推荐区域 */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col items-center p-8 bg-white/50 backdrop-blur-sm rounded-2xl">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">继续探索</h3>
            <p className="text-gray-600 mb-4">发现更多有趣的社区观察记录</p>
            <Link
              href="/"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
            >
              返回观察列表
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}