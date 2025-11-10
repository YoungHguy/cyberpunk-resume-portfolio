import React, { useEffect, useState } from 'react';

const Loading = ({ isLoading, timeout = 10000, onTimeout }) => {
  const [showTimeout, setShowTimeout] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isLoading) {
      setShowTimeout(false);
      setProgress(0);
      return;
    }

    // 进度条动画
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 95) return prev;
        return prev + Math.random() * 15;
      });
    }, 300);

    // 超时机制
    const timeoutId = setTimeout(() => {
      setShowTimeout(true);
      if (onTimeout) {
        onTimeout();
      }
    }, timeout);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(timeoutId);
    };
  }, [isLoading, timeout, onTimeout]);

  useEffect(() => {
    if (!isLoading && progress > 0) {
      setProgress(100);
      setTimeout(() => setProgress(0), 500);
    }
  }, [isLoading]);

  if (!isLoading && !showTimeout) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black bg-opacity-95 backdrop-blur-sm">
      {/* 扫描线背景 */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="scanline-container h-full w-full relative overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-[#8E44AD] to-transparent"
              style={{
                top: `${i * 2}%`,
                animation: `scanline-move 8s linear infinite`,
                animationDelay: `${i * 0.1}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* 主加载内容 */}
      <div className="relative z-10 text-center px-4 w-full max-w-md mx-auto">
        {/* 加载器核心 */}
        <div className="relative inline-block w-full">
          {/* 外圈旋转环 */}
          <div className="cyber-loader relative w-32 h-32 mx-auto mb-8">
            <div className="absolute inset-0 border-4 border-[#8E44AD] border-t-transparent rounded-full animate-spin"></div>
            <div className="absolute inset-2 border-4 border-[#BDC3C7] border-b-transparent rounded-full animate-spin-reverse"></div>
            <div className="absolute inset-4 border-4 border-[#2C3E50] border-l-transparent rounded-full animate-spin-slow"></div>
            
            {/* 中心脉冲 */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 bg-[#8E44AD] rounded-full animate-pulse shadow-lg shadow-[#8E44AD]"></div>
            </div>
          </div>

          {/* RGB分离效果标题 */}
          <div className="relative mb-6">
            <h2 
              className="text-2xl font-bold text-[#00ff41] rgb-split cyber-blink"
              data-text="LOADING"
            >
              LOADING
            </h2>
          </div>

          {/* 进度条 */}
          <div className="w-full max-w-xs mx-auto mb-4">
            <div className="h-2 bg-[#2C3E50] rounded-full overflow-hidden border border-[#8E44AD] shadow-lg shadow-[#8E44AD]/50">
              <div 
                className="h-full bg-gradient-to-r from-[#8E44AD] via-[#BDC3C7] to-[#8E44AD] transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              >
                <div className="h-full w-full bg-gradient-to-r from-transparent via-white to-transparent opacity-50 animate-shimmer"></div>
              </div>
            </div>
            <p className="text-[#BDC3C7] text-sm mt-2 font-mono">
              {Math.round(progress)}% <span className="animate-pulse">█</span>
            </p>
          </div>

          {/* 加载文字动画 */}
          <div className="flex justify-center items-center gap-1 text-[#00ff41] font-mono text-sm">
            <span className="glitch-text" data-text="Initializing" data-glitch="1n1t14l1z1ng">
              Initializing
            </span>
            <span className="animate-bounce">.</span>
            <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>.</span>
            <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>.</span>
          </div>

          {/* HUD装饰元素 */}
          <div className="absolute -top-16 -left-16 md:-top-20 md:-left-20 w-12 h-12 md:w-16 md:h-16 border-l-2 border-t-2 border-[#8E44AD] opacity-50"></div>
          <div className="absolute -top-16 -right-16 md:-top-20 md:-right-20 w-12 h-12 md:w-16 md:h-16 border-r-2 border-t-2 border-[#8E44AD] opacity-50"></div>
          <div className="absolute -bottom-16 -left-16 md:-bottom-20 md:-left-20 w-12 h-12 md:w-16 md:h-16 border-l-2 border-b-2 border-[#8E44AD] opacity-50"></div>
          <div className="absolute -bottom-16 -right-16 md:-bottom-20 md:-right-20 w-12 h-12 md:w-16 md:h-16 border-r-2 border-b-2 border-[#8E44AD] opacity-50"></div>
        </div>

        {/* 超时错误提示 */}
        {showTimeout && (
          <div className="mt-8 error-popup w-full max-w-sm mx-auto px-6 py-4 rounded animate-fade-in">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-red-500 text-2xl animate-pulse">⚠</span>
              <h3 className="text-red-400 font-bold text-lg">CONNECTION TIMEOUT</h3>
            </div>
            <p className="text-[#BDC3C7] text-sm mb-4">
              加载超时，请检查网络连接或刷新页面重试
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-[#8E44AD] hover:bg-[#9B59B6] text-white rounded transition-colors duration-200 border border-[#BDC3C7] shadow-lg hover:shadow-[#8E44AD]/50"
            >
              重新加载
            </button>
          </div>
        )}

        {/* 滚动二进制代码装饰 */}
        <div className="absolute -bottom-8 left-0 right-0 overflow-hidden h-12 opacity-30">
          <div className="binary-scroll text-[#00ff41] text-xs whitespace-nowrap font-mono">
            01001000 01000001 01001001 01010011 01001110 01000001 01010000 00100000
            01001100 01001111 01000001 01000100 01001001 01001110 01000111 00100000
            01000011 01011001 01000010 01000101 01010010 01010000 01010101 01001110 01001011
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scanline-move {
          0% {
            transform: translateY(-100%);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateY(100vh);
            opacity: 0;
          }
        }

        @keyframes spin-reverse {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-spin {
          animation: spin 1s linear infinite;
        }

        .animate-spin-reverse {
          animation: spin-reverse 1.5s linear infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 2s linear infinite;
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .animate-shimmer {
          animation: shimmer 2s infinite;
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }

        .binary-scroll {
          animation: binary-scroll-horizontal 15s linear infinite;
        }

        @keyframes binary-scroll-horizontal {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
};

export default Loading;