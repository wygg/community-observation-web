import Link from 'next/link';
import Image from 'next/image';

interface PostCardProps {
  post: {
    id: string;
    title: string;
    date: string;
    location: string;
    category: string;
    tags: string[];
    youtube?: string;
    images?: string[];
  };
}

export function PostCard({ post }: PostCardProps) {
  const hasVideo = post.youtube;
  const hasImages = post.images && post.images.length > 0;

  return (
    <div className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200 transform hover:-translate-y-1">
      {/* 媒体预览区域 */}
      {(hasImages || hasVideo) && (
        <div className="relative h-48 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
          {hasImages && (
            <div className="relative w-full h-full">
              <Image
                src={post.images![0]}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          )}
          {hasVideo && !hasImages && (
            <div className="flex items-center justify-center h-full">
              <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </div>
          )}
          
          {/* 叠加标签 */}
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-gray-700 shadow-sm">
              {post.category}
            </span>
          </div>
        </div>
      )}

      <div className="p-6">
        {/* 标题和日期 */}
        <div className="mb-3">
          <Link href={`/observations/${post.id}`}>
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
              {post.title}
            </h3>
          </Link>
          <div className="flex items-center text-sm text-gray-500 mt-2 space-x-4">
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {post.date}
            </span>
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {post.location}
            </span>
          </div>
        </div>

        {/* 标签 */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 text-xs rounded-full font-medium"
              >
                #{tag}
              </span>
            ))}
            {post.tags.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium">
                +{post.tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* 媒体指标 */}
        <div className="flex items-center space-x-3 mb-4 text-sm text-gray-500">
          {hasVideo && (
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
              视频
            </span>
          )}
          {hasImages && (
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {post.images!.length} 张图片
            </span>
          )}
        </div>

        {/* 阅读按钮 */}
        <Link 
          href={`/observations/${post.id}`}
          className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm group"
        >
          阅读观察
          <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}