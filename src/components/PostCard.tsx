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
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <Link href={`/observations/${post.id}`}>
          <h3 className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors">
            {post.title}
          </h3>
        </Link>
        <span className="text-sm text-gray-500 whitespace-nowrap ml-4">
          {post.date}
        </span>
      </div>
      
      <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
        <span className="flex items-center">
          📍 {post.location}
        </span>
        <span className="flex items-center">
          📁 {post.category}
        </span>
        {post.youtube && (
          <span className="flex items-center">
            🎥 视频
          </span>
        )}
      </div>

      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
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

      {post.images && post.images.length > 0 && (
        <div className="mb-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {post.images.slice(0, 3).map((image, index) => (
              <div key={index} className="relative aspect-video rounded-md overflow-hidden bg-gray-100">
                <Image
                  src={image}
                  alt={`${post.title} - 图片 ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
          {post.images.length > 3 && (
            <p className="text-sm text-gray-500 mt-2">
              还有 {post.images.length - 3} 张图片...
            </p>
          )}
        </div>
      )}

      <div className="flex justify-between items-center">
        <Link 
          href={`/observations/${post.id}`}
          className="text-blue-600 hover:text-blue-800 font-medium text-sm"
        >
          阅读全文 →
        </Link>
      </div>
    </div>
  );
}