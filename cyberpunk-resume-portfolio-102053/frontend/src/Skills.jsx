import React, { useState, useEffect, useRef } from 'react';
import Loading from './Loading';
import skillsData from '../data/skills.json';

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [categories, setCategories] = useState([]);
  const canvasRef = useRef(null);

  useEffect(() => {
    const loadSkills = async () => {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 800));
        setSkills(skillsData);
        const uniqueCategories = ['全部', ...new Set(skillsData.map(skill => skill.category))];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('加载技能数据失败:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSkills();
  }, []);

  useEffect(() => {
    if (!isLoading && skills.length > 0 && canvasRef.current) {
      drawRadarChart();
    }
  }, [skills, isLoading, selectedCategory]);

  const drawRadarChart = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 60;

    const filteredSkills = selectedCategory === '全部' 
      ? skills.slice(0, 8) 
      : skills.filter(s => s.category === selectedCategory).slice(0, 8);

    const angleStep = (Math.PI * 2) / filteredSkills.length;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 绘制背景网格
    ctx.strokeStyle = 'rgba(142, 68, 173, 0.2)';
    ctx.lineWidth = 1;
    for (let i = 1; i <= 5; i++) {
      ctx.beginPath();
      const r = (radius / 5) * i;
      for (let j = 0; j <= filteredSkills.length; j++) {
        const angle = angleStep * j - Math.PI / 2;
        const x = centerX + Math.cos(angle) * r;
        const y = centerY + Math.sin(angle) * r;
        if (j === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.closePath();
      ctx.stroke();
    }

    // 绘制轴线
    ctx.strokeStyle = 'rgba(189, 195, 199, 0.3)';
    ctx.lineWidth = 1;
    filteredSkills.forEach((skill, index) => {
      const angle = angleStep * index - Math.PI / 2;
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;
      
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(x, y);
      ctx.stroke();

      // 绘制标签
      ctx.fillStyle = '#00ff41';
      ctx.font = '12px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const labelX = centerX + Math.cos(angle) * (radius + 30);
      const labelY = centerY + Math.sin(angle) * (radius + 30);
      ctx.fillText(skill.name, labelX, labelY);
    });

    // 绘制数据区域
    ctx.fillStyle = 'rgba(142, 68, 173, 0.3)';
    ctx.strokeStyle = '#8E44AD';
    ctx.lineWidth = 2;
    ctx.beginPath();
    filteredSkills.forEach((skill, index) => {
      const angle = angleStep * index - Math.PI / 2;
      const r = (radius * skill.level) / 100;
      const x = centerX + Math.cos(angle) * r;
      const y = centerY + Math.sin(angle) * r;
      
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // 绘制数据点
    filteredSkills.forEach((skill, index) => {
      const angle = angleStep * index - Math.PI / 2;
      const r = (radius * skill.level) / 100;
      const x = centerX + Math.cos(angle) * r;
      const y = centerY + Math.sin(angle) * r;
      
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.fillStyle = '#BDC3C7';
      ctx.fill();
      ctx.strokeStyle = '#8E44AD';
      ctx.lineWidth = 2;
      ctx.stroke();
    });
  };

  const handleTimeout = () => {
    setIsLoading(false);
  };

  const filteredSkills = selectedCategory === '全部' 
    ? skills 
    : skills.filter(skill => skill.category === selectedCategory);

  return (
    <div className="min-h-screen bg-black text-white py-20 px-4 relative overflow-hidden corrupt-texture">
      <Loading isLoading={isLoading} timeout={10000} onTimeout={handleTimeout} />

      <div className="binary-bg fixed inset-0 opacity-10 pointer-events-none">
        {[...Array(100)].map((_, i) => (
          <div key={i}>
            {Math.random().toString(2).substring(2, 50)}
          </div>
        ))}
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <h1 
            className="text-5xl md:text-6xl font-bold mb-4 neon-text rgb-split"
            data-text="TECH_STACK"
          >
            TECH_STACK
          </h1>
          <p className="text-xl text-[#BDC3C7] glitch-text" data-text="技能矩阵" data-glitch="技能矩█">
            技能矩阵 <span className="cyber-blink">█</span>
          </p>
        </div>

        <div className="mb-12 flex flex-wrap justify-center gap-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 border-2 transition-all duration-300 font-mono text-sm ${
                selectedCategory === category
                  ? 'bg-[#8E44AD] border-[#8E44AD] text-white shadow-lg shadow-[#8E44AD]/50'
                  : 'border-[#2C3E50] text-[#BDC3C7] hover:border-[#8E44AD] hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="hud-element p-8">
            <h2 className="text-2xl font-bold mb-6 text-[#00ff41] flex items-center gap-3">
              <span className="cyber-blink">▶</span> 雷达图分析
            </h2>
            <div className="flex justify-center items-center">
              <canvas 
                ref={canvasRef} 
                width="500" 
                height="500"
                className="max-w-full h-auto"
              />
            </div>
          </div>

          <div className="hud-element p-8">
            <h2 className="text-2xl font-bold mb-6 text-[#00ff41] flex items-center gap-3">
              <span className="cyber-blink">▶</span> 熟练度统计
            </h2>
            <div className="space-y-6 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
              {filteredSkills.map((skill, index) => (
                <div key={index} className="skill-item">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[#BDC3C7] font-mono text-sm">
                      {skill.name}
                    </span>
                    <span className="text-[#8E44AD] font-bold text-lg">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="h-3 bg-[#2C3E50] rounded-full overflow-hidden border border-[#8E44AD]/30">
                    <div 
                      className="h-full bg-gradient-to-r from-[#8E44AD] to-[#BDC3C7] transition-all duration-1000 ease-out relative"
                      style={{ width: `${skill.level}%` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-shimmer"></div>
                    </div>
                  </div>
                  <p className="text-xs text-[#BDC3C7]/60 mt-1 font-mono">
                    {skill.category}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
          {filteredSkills.map((skill, index) => (
            <div 
              key={index}
              className="hud-element p-6 hover:shadow-2xl hover:shadow-[#8E44AD]/50 transition-all duration-300 cursor-pointer transform hover:scale-105"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold text-[#00ff41] rgb-split" data-text={skill.name}>
                  {skill.name}
                </h3>
                <div className="w-12 h-12 rounded-full border-4 border-[#8E44AD] flex items-center justify-center relative">
                  <span className="text-xs font-bold text-white z-10">{skill.level}</span>
                  <div 
                    className="absolute inset-0 rounded-full bg-[#8E44AD]"
                    style={{
                      clipPath: `polygon(50% 50%, 50% 0%, ${
                        skill.level >= 50 ? '100%' : '50%'
                      } 0%, ${
                        skill.level >= 50 ? '100%' : '50%'
                      } ${
                        skill.level >= 50 ? `${(skill.level - 50) * 2}%` : '0%'
                      }, ${
                        skill.level >= 50 ? '100%' : `${50 + skill.level}%`
                      } 100%, 50% 100%, 50% 100%, 0% 100%, 0% 0%)`
                    }}
                  />
                </div>
              </div>
              <div className="text-xs text-[#BDC3C7] font-mono mb-2">
                {skill.category}
              </div>
              <div className="h-2 bg-[#2C3E50] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#8E44AD] transition-all duration-1000"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="error-popup mt-12 p-6 text-center">
          <p className="text-[#BDC3C7] font-mono text-sm">
            <span className="text-[#8E44AD] font-bold">WARNING:</span> 技能数据实时更新中
            <span className="cyber-blink ml-2">█</span>
          </p>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #2C3E50;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #8E44AD;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #9B59B6;
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default Skills;