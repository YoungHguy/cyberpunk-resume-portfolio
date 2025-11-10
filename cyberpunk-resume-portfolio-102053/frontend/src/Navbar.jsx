import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [glitchText, setGlitchText] = useState('CYBER_DEV');
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      const glitchChars = '█▓▒░01@#$%&*';
      const originalText = 'CYBER_DEV';
      const randomGlitch = Math.random() > 0.7;
      
      if (randomGlitch) {
        const glitchedText = originalText.split('').map(char => {
          return Math.random() > 0.8 ? glitchChars[Math.floor(Math.random() * glitchChars.length)] : char;
        }).join('');
        setGlitchText(glitchedText);
        
        setTimeout(() => setGlitchText(originalText), 100);
      }
    }, 2000);

    return () => clearInterval(glitchInterval);
  }, []);

  const navLinks = [
    { path: '/', label: '简历', glitch: '简█' },
    { path: '/projects', label: '作品', glitch: '作█' },
    { path: '/skills', label: '技能', glitch: '技█' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-300 ${
          scrolled 
            ? 'bg-black/95 backdrop-blur-md border-b-2 border-[#8E44AD] shadow-lg shadow-[#8E44AD]/30' 
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-center relative">
            <Link 
              to="/" 
              className="absolute left-0 group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 border-2 border-[#8E44AD] bg-[#2C3E50] flex items-center justify-center relative overflow-hidden">
                  <span className="text-[#00ff41] font-bold text-lg z-10 relative">C</span>
                  <div className="absolute inset-0 bg-[#8E44AD] transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                </div>
                
                <h1 
                  className="text-2xl font-bold text-[#00ff41] rgb-split relative hidden md:block"
                  data-text={glitchText}
                >
                  {glitchText}
                  <span className="cyber-blink ml-1">█</span>
                </h1>
              </div>
            </Link>

            <div className="flex items-center gap-1 md:gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-4 md:px-6 py-2 border-2 transition-all duration-300 font-mono text-sm md:text-base ${
                    isActive(link.path)
                      ? 'bg-[#8E44AD] border-[#8E44AD] text-white shadow-lg shadow-[#8E44AD]/50'
                      : 'border-[#2C3E50] text-[#BDC3C7] hover:border-[#8E44AD] hover:text-white'
                  }`}
                >
                  <span 
                    className="glitch-text relative"
                    data-text={link.label}
                    data-glitch={link.glitch}
                  >
                    {link.label}
                  </span>
                  
                  {isActive(link.path) && (
                    <>
                      <span className="absolute top-0 left-0 w-2 h-2 bg-[#00ff41]"></span>
                      <span className="absolute top-0 right-0 w-2 h-2 bg-[#00ff41]"></span>
                      <span className="absolute bottom-0 left-0 w-2 h-2 bg-[#00ff41]"></span>
                      <span className="absolute bottom-0 right-0 w-2 h-2 bg-[#00ff41]"></span>
                    </>
                  )}
                </Link>
              ))}
            </div>

            <div className="hidden lg:flex items-center gap-2 font-mono text-xs text-[#BDC3C7] absolute right-0">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-[#00ff41] rounded-full animate-pulse"></div>
                <span>ONLINE</span>
              </div>
              <span className="text-[#8E44AD]">|</span>
              <span className="cyber-blink">
                {new Date().toLocaleTimeString('zh-CN', { hour12: false })}
              </span>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#8E44AD] to-transparent"></div>
      </nav>

      <div className="h-16 md:h-20"></div>

      <div className="error-popup fixed top-20 right-4 z-[9998] px-4 py-2 text-xs font-mono hidden md:block">
        <div className="flex items-center gap-2 text-[#BDC3C7]">
          <span className="text-[#8E44AD] cyber-blink">▶</span>
          <span>SYSTEM_STATUS: ACTIVE</span>
        </div>
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
        
        .rgb-split::before,
        .rgb-split::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
        }
        
        .rgb-split::before {
          animation: glitch-anim-1 2s infinite linear alternate-reverse;
          color: #ff00ff;
          z-index: -1;
        }
        
        .rgb-split::after {
          animation: glitch-anim-2 2s infinite linear alternate-reverse;
          color: #00ffff;
          z-index: -2;
        }
        
        @keyframes glitch-anim-1 {
          0%, 100% {
            transform: translate(0);
            clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
          }
          20% {
            transform: translate(-2px, 2px);
            clip-path: polygon(0 20%, 100% 20%, 100% 40%, 0 40%);
          }
          40% {
            transform: translate(2px, -2px);
            clip-path: polygon(0 60%, 100% 60%, 100% 80%, 0 80%);
          }
          60% {
            transform: translate(-2px, 2px);
            clip-path: polygon(0 0%, 100% 0%, 100% 20%, 0 20%);
          }
          80% {
            transform: translate(2px, -2px);
            clip-path: polygon(0 80%, 100% 80%, 100% 100%, 0 100%);
          }
        }
        
        @keyframes glitch-anim-2 {
          0%, 100% {
            transform: translate(0);
            clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
          }
          20% {
            transform: translate(2px, -2px);
            clip-path: polygon(0 40%, 100% 40%, 100% 60%, 0 60%);
          }
          40% {
            transform: translate(-2px, 2px);
            clip-path: polygon(0 80%, 100% 80%, 100% 100%, 0 100%);
          }
          60% {
            transform: translate(2px, -2px);
            clip-path: polygon(0 0%, 100% 0%, 100% 30%, 0 30%);
          }
          80% {
            transform: translate(-2px, 2px);
            clip-path: polygon(0 50%, 100% 50%, 100% 70%, 0 70%);
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;