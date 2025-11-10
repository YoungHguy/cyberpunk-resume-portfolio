import React, { useState, useEffect } from 'react';
import Loading from './Loading';
import projectsData from '../data/projects.json';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [filterCategory, setFilterCategory] = useState('全部');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const loadProjects = async () => {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setProjects(projectsData);
        const uniqueCategories = ['全部', ...new Set(projectsData.map(p => p.category))];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('加载项目数据失败:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProjects();
  }, []);

  const handleTimeout = () => {
    setIsLoading(false);
  };

  const filteredProjects = filterCategory === '全部' 
    ? projects 
    : projects.filter(p => p.category === filterCategory);

  const openProjectDetail = (project) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden';
  };

  const closeProjectDetail = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'auto';
  };

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

      <div className="container mx-auto max-w-6xl px-4 relative z-10">
        <div className="text-center mb-16">
          <h1 
            className="text-5xl md:text-6xl font-bold mb-4 neon-text rgb-split"
            data-text="PROJECTS"
          >
            PROJECTS
          </h1>
          <p className="text-xl text-[#BDC3C7] glitch-text" data-text="作品档案" data-glitch="作品█案">
            作品档案 <span className="cyber-blink">█</span>
          </p>
        </div>

        <div className="mb-12 flex flex-wrap justify-center gap-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilterCategory(category)}
              className={`px-6 py-2 border-2 transition-all duration-300 font-mono text-sm ${
                filterCategory === category
                  ? 'bg-[#8E44AD] border-[#8E44AD] text-white shadow-lg shadow-[#8E44AD]/50'
                  : 'border-[#2C3E50] text-[#BDC3C7] hover:border-[#8E44AD] hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className="hud-element p-6 cursor-pointer transform hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-[#8E44AD]/50"
              onClick={() => openProjectDetail(project)}
            >
              {project.featured && (
                <div className="absolute top-2 right-2 bg-[#8E44AD] text-white px-3 py-1 text-xs font-bold border border-[#BDC3C7] cyber-blink">
                  FEATURED
                </div>
              )}

              <div className="monitor-effect mb-4 overflow-hidden h-48 relative">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              </div>

              <div className="space-y-3">
                <h3 className="text-xl font-bold text-[#00ff41] rgb-split" data-text={project.title}>
                  {project.title}
                </h3>

                <div className="flex items-center gap-2 text-xs">
                  <span className="px-2 py-1 bg-[#2C3E50] text-[#BDC3C7] border border-[#8E44AD]/30 font-mono">
                    {project.category}
                  </span>
                  <span className="text-[#BDC3C7]/60 font-mono">
                    {project.duration}
                  </span>
                </div>

                <p className="text-sm text-[#BDC3C7] line-clamp-3">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tech.slice(0, 3).map((tech, i) => (
                    <span
                      key={i}
                      className="text-xs px-2 py-1 bg-[#8E44AD]/20 text-[#8E44AD] border border-[#8E44AD]/50 font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.tech.length > 3 && (
                    <span className="text-xs px-2 py-1 text-[#BDC3C7] font-mono">
                      +{project.tech.length - 3}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[#2C3E50]">
                  <span className="text-xs text-[#BDC3C7] font-mono">
                    {project.role}
                  </span>
                  <button className="text-[#8E44AD] hover:text-[#BDC3C7] transition-colors font-mono text-sm">
                    查看详情 →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && !isLoading && (
          <div className="error-popup text-center p-8">
            <p className="text-[#BDC3C7] font-mono">
              <span className="text-red-500 text-2xl">⚠</span> 暂无该分类项目
            </p>
          </div>
        )}
      </div>

      {selectedProject && (
        <div 
          className="fixed inset-0 z-[10001] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 overflow-y-auto"
          onClick={closeProjectDetail}
        >
          <div 
            className="hud-element bg-black max-w-3xl w-full my-8 p-8 relative max-h-[90vh] overflow-y-auto custom-scrollbar"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeProjectDetail}
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-[#8E44AD] hover:bg-[#9B59B6] text-white transition-colors border-2 border-[#BDC3C7]"
            >
              ✕
            </button>

            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-[#00ff41] mb-2 rgb-split" data-text={selectedProject.title}>
                  {selectedProject.title}
                </h2>
                <div className="flex flex-wrap gap-3 items-center">
                  <span className="px-3 py-1 bg-[#2C3E50] text-[#BDC3C7] border border-[#8E44AD] font-mono text-sm">
                    {selectedProject.category}
                  </span>
                  <span className="text-[#BDC3C7]/80 font-mono text-sm">
                    {selectedProject.duration}
                  </span>
                  <span className="text-[#8E44AD] font-mono text-sm">
                    {selectedProject.role}
                  </span>
                </div>
              </div>

              <div className="monitor-effect overflow-hidden">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-auto object-cover"
                />
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-[#00ff41] mb-2 flex items-center gap-2">
                    <span className="cyber-blink">▶</span> 项目概述
                  </h3>
                  <p className="text-[#BDC3C7] leading-relaxed">
                    {selectedProject.details.overview}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[#00ff41] mb-2 flex items-center gap-2">
                    <span className="cyber-blink">▶</span> 技术挑战
                  </h3>
                  <ul className="space-y-2">
                    {selectedProject.details.challenges.map((challenge, i) => (
                      <li key={i} className="text-[#BDC3C7] flex items-start gap-2">
                        <span className="text-[#8E44AD] mt-1">◆</span>
                        <span>{challenge}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[#00ff41] mb-2 flex items-center gap-2">
                    <span className="cyber-blink">▶</span> 项目成果
                  </h3>
                  <ul className="space-y-2">
                    {selectedProject.details.achievements.map((achievement, i) => (
                      <li key={i} className="text-[#BDC3C7] flex items-start gap-2">
                        <span className="text-[#8E44AD] mt-1">✓</span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[#00ff41] mb-2 flex items-center gap-2">
                    <span className="cyber-blink">▶</span> 核心职责
                  </h3>
                  <ul className="space-y-2">
                    {selectedProject.details.responsibilities.map((responsibility, i) => (
                      <li key={i} className="text-[#BDC3C7] flex items-start gap-2">
                        <span className="text-[#8E44AD] mt-1">→</span>
                        <span>{responsibility}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[#00ff41] mb-3 flex items-center gap-2">
                    <span className="cyber-blink">▶</span> 技术栈
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-[#8E44AD]/20 text-[#8E44AD] border border-[#8E44AD] font-mono text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4 pt-4 border-t border-[#2C3E50]">
                  {selectedProject.links.demo !== '#' && (
                    <a
                      href={selectedProject.links.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-2 bg-[#8E44AD] hover:bg-[#9B59B6] text-white border-2 border-[#BDC3C7] transition-colors font-mono text-sm"
                    >
                      在线演示
                    </a>
                  )}
                  {selectedProject.links.github !== '#' && (
                    <a
                      href={selectedProject.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-2 border-2 border-[#8E44AD] text-[#8E44AD] hover:bg-[#8E44AD] hover:text-white transition-colors font-mono text-sm"
                    >
                      源码仓库
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

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
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default Projects;