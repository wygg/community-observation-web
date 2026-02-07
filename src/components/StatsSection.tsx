interface StatsSectionProps {
  postCount: number;
  categories: number;
  locations: number;
}

export function StatsSection({ postCount, categories, locations }: StatsSectionProps) {
  return (
    <section className="py-16 bg-white/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 统计卡片 1 */}
          <div className="text-center group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-2xl transform group-hover:scale-105 transition-transform duration-300 opacity-10" />
              <div className="relative bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {postCount}
                </div>
                <div className="text-gray-600 font-medium">
                  观察记录
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  深度思考与分析
                </div>
              </div>
            </div>
          </div>

          {/* 统计卡片 2 */}
          <div className="text-center group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl transform group-hover:scale-105 transition-transform duration-300 opacity-10" />
              <div className="relative bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {categories}
                </div>
                <div className="text-gray-600 font-medium">
                  观察分类
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  多维度分析视角
                </div>
              </div>
            </div>
          </div>

          {/* 统计卡片 3 */}
          <div className="text-center group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-400 rounded-2xl transform group-hover:scale-105 transition-transform duration-300 opacity-10" />
              <div className="relative bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {locations}
                </div>
                <div className="text-gray-600 font-medium">
                  观察地点
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  社区各个角落
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}