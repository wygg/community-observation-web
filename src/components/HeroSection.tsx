export function HeroSection() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700">
      {/* 背景装饰 */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-transparent via-transparent to-black/10" />
        
        {/* 动态几何图形 */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" />
        <div className="absolute top-40 right-10 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000" />
        <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          {/* 主标题 */}
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            <span className="block">社区考现学</span>
            <span className="block text-3xl md:text-4xl font-light mt-2 text-blue-100">
              Community Observation
            </span>
          </h1>
          
          {/* 副标题 */}
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
            通过细致的观察和深入的思考，发现社区中的人文关怀和设计智慧
          </p>
          
          {/* CTA 按钮组 */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <a 
              href="#observations" 
              className="px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
            >
              开始探索
            </a>
            <a 
              href="https://github.com/wygg/community-observation-web" 
              className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-semibold text-lg hover:bg-white/10 transition-all duration-300"
            >
              查看源码
            </a>
          </div>
          
          {/* 特性标签 */}
          <div className="flex flex-wrap justify-center gap-3">
            <span className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm font-medium">
              🏙️ 城市观察
            </span>
            <span className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm font-medium">
              📊 数据驱动
            </span>
            <span className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm font-medium">
              🤖 AI 辅助
            </span>
            <span className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm font-medium">
              🌱 可持续发展
            </span>
          </div>
        </div>
      </div>
      
      {/* 底部波浪 */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg className="w-full h-16 text-slate-50" preserveAspectRatio="none" viewBox="0 0 1200 120" fill="currentColor">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" />
        </svg>
      </div>
    </div>
  );
}