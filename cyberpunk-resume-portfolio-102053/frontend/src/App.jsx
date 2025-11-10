import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Resume from './Resume';
import Projects from './Projects';
import Skills from './Skills';
import './styles/cyberpunk.css';

const App = () => {
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const loadTailwind = () => {
      if (!document.querySelector('script[src*="tailwindcss"]')) {
        const script = document.createElement('script');
        script.src = 'https://cdn.tailwindcss.com';
        script.onload = () => {
          if (window.tailwind) {
            window.tailwind.config = {
              important: true,
              theme: {
                extend: {
                  colors: {
                    'cyber-purple': '#8E44AD',
                    'cyber-dark': '#2C3E50',
                    'cyber-light': '#BDC3C7',
                    'cyber-green': '#00ff41'
                  }
                }
              }
            };
          }
        };
        document.head.appendChild(script);
      }
    };

    const loadGSAP = () => {
      if (!document.querySelector('script[src*="gsap"]')) {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js';
        document.head.appendChild(script);
      }
    };

    const initializeApp = async () => {
      try {
        loadTailwind();
        loadGSAP();
        
        await new Promise(resolve => setTimeout(resolve, 500));
        
        setIsInitializing(false);
      } catch (error) {
        console.error('初始化失败:', error);
        setIsInitializing(false);
      }
    };

    initializeApp();

    const handleFrameBlocking = () => {
      document.body.style.display = 'block';
    };

    handleFrameBlocking();

    return () => {
      document.body.style.display = '';
    };
  }, []);

  if (isInitializing) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="cyber-loader mb-4"></div>
          <p className="text-cyber-green font-mono text-sm animate-pulse">
            SYSTEM INITIALIZING<span className="cyber-blink">█</span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-black text-white font-sans antialiased relative overflow-x-hidden">
        <div className="fixed inset-0 pointer-events-none z-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-br from-cyber-purple via-transparent to-cyber-dark"></div>
        </div>

        <div className="relative z-10">
          <Navbar />
          
          <main className="relative flex justify-center">
            <Routes>
              <Route path="/" element={<Resume />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="*" element={<Resume />} />
            </Routes>
          </main>

          <div className="crypto-ticker fixed bottom-0 left-0 right-0 py-3 z-[9998]">
            <div className="crypto-ticker-content font-mono text-sm">
              <span className="mx-8">BTC/USDT: $45,231.87 <span className="text-green-400">+2.34%</span></span>
              <span className="mx-8">ETH/USDT: $3,021.45 <span className="text-red-400">-1.12%</span></span>
              <span className="mx-8">SOL/USDT: $98.76 <span className="text-green-400">+5.67%</span></span>
              <span className="mx-8">ADA/USDT: $0.5234 <span className="text-green-400">+3.21%</span></span>
              <span className="mx-8">DOT/USDT: $7.89 <span className="text-red-400">-0.89%</span></span>
              <span className="mx-8">BTC/USDT: $45,231.87 <span className="text-green-400">+2.34%</span></span>
              <span className="mx-8">ETH/USDT: $3,021.45 <span className="text-red-400">-1.12%</span></span>
            </div>
          </div>
        </div>

        <div className="fixed top-0 left-0 w-20 h-20 border-l-2 border-t-2 border-cyber-purple opacity-30 pointer-events-none z-[9999]"></div>
        <div className="fixed top-0 right-0 w-20 h-20 border-r-2 border-t-2 border-cyber-purple opacity-30 pointer-events-none z-[9999]"></div>
        <div className="fixed bottom-0 left-0 w-20 h-20 border-l-2 border-b-2 border-cyber-purple opacity-30 pointer-events-none z-[9999]"></div>
        <div className="fixed bottom-0 right-0 w-20 h-20 border-r-2 border-b-2 border-cyber-purple opacity-30 pointer-events-none z-[9999]"></div>
      </div>
    </Router>
  );
};

export default App;