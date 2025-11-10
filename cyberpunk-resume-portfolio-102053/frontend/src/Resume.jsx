import React, { useState, useEffect } from 'react';
import Loading from './Loading';
import resumeData from '../data/resume.json';

const Resume = () => {
  const [resume, setResume] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('personal');

  useEffect(() => {
    const loadResume = async () => {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setResume(resumeData);
      } catch (error) {
        console.error('加载简历数据失败:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadResume();
  }, []);

  const handleTimeout = () => {
    setIsLoading(false);
  };

  if (!resume) {
    return <Loading isLoading={isLoading} timeout={10000} onTimeout={handleTimeout} />;
  }

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
        <div className="text-center mb-12">
          <h1 
            className="text-5xl md:text-6xl font-bold mb-4 neon-text rgb-split"
            data-text="RESUME"
          >
            RESUME
          </h1>
          <p className="text-xl text-[#BDC3C7] glitch-text" data-text="个人档案" data-glitch="个人█案">
            个人档案 <span className="cyber-blink">█</span>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
          <div className="lg:col-span-1">
            <div className="hud-element p-6 mb-6 sticky top-20">
              <div className="monitor-effect mb-6 overflow-hidden">
                <img
                  src={resume.personal.avatar}
                  alt={resume.personal.name}
                  className="w-full h-auto rounded-lg"
                />
              </div>

              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-[#00ff41] mb-2 rgb-split" data-text={resume.personal.name}>
                  {resume.personal.name}
                </h2>
                <p className="text-[#8E44AD] font-mono text-sm mb-4">
                  {resume.personal.title}
                </p>
                <div className="text-xs text-[#BDC3C7] space-y-2 font-mono">
                  <div className="flex items-center justify-center gap-2">
                    <span>📧</span>
                    <span className="break-all">{resume.personal.email}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <span>📱</span>
                    <span>{resume.personal.phone}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <span>📍</span>
                    <span>{resume.personal.location}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                {resume.personal.github && (
                  <a
                    href={resume.personal.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full px-4 py-2 bg-[#2C3E50] hover:bg-[#8E44AD] text-[#BDC3C7] hover:text-white transition-colors border border-[#8E44AD]/30 text-center font-mono text-sm"
                  >
                    GitHub
                  </a>
                )}
                {resume.personal.linkedin && (
                  <a
                    href={resume.personal.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full px-4 py-2 bg-[#2C3E50] hover:bg-[#8E44AD] text-[#BDC3C7] hover:text-white transition-colors border border-[#8E44AD]/30 text-center font-mono text-sm"
                  >
                    LinkedIn
                  </a>
                )}
                {resume.personal.website && (
                  <a
                    href={resume.personal.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full px-4 py-2 bg-[#2C3E50] hover:bg-[#8E44AD] text-[#BDC3C7] hover:text-white transition-colors border border-[#8E44AD]/30 text-center font-mono text-sm"
                  >
                    Website
                  </a>
                )}
              </div>

              <div className="border-t border-[#2C3E50] pt-4">
                <h3 className="text-sm font-bold text-[#8E44AD] mb-3 flex items-center gap-2">
                  <span className="cyber-blink">▶</span> 统计数据
                </h3>
                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="bg-[#2C3E50] p-3 border border-[#8E44AD]/30">
                    <div className="text-2xl font-bold text-[#8E44AD]">{resume.summary.yearsOfExperience}</div>
                    <div className="text-xs text-[#BDC3C7] font-mono">年经验</div>
                  </div>
                  <div className="bg-[#2C3E50] p-3 border border-[#8E44AD]/30">
                    <div className="text-2xl font-bold text-[#8E44AD]">{resume.summary.projectsCompleted}</div>
                    <div className="text-xs text-[#BDC3C7] font-mono">个项目</div>
                  </div>
                  <div className="bg-[#2C3E50] p-3 border border-[#8E44AD]/30">
                    <div className="text-2xl font-bold text-[#8E44AD]">{resume.summary.linesOfCode}</div>
                    <div className="text-xs text-[#BDC3C7] font-mono">代码量</div>
                  </div>
                  <div className="bg-[#2C3E50] p-3 border border-[#8E44AD]/30">
                    <div className="text-2xl font-bold text-[#8E44AD]">{resume.summary.githubStars}</div>
                    <div className="text-xs text-[#BDC3C7] font-mono">GitHub星</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="mb-8">
              <div className="flex flex-wrap gap-3 mb-6">
                <button
                  onClick={() => setActiveTab('personal')}
                  className={`px-6 py-2 border-2 transition-all duration-300 font-mono text-sm ${
                    activeTab === 'personal'
                      ? 'bg-[#8E44AD] border-[#8E44AD] text-white shadow-lg shadow-[#8E44AD]/50'
                      : 'border-[#2C3E50] text-[#BDC3C7] hover:border-[#8E44AD] hover:text-white'
                  }`}
                >
                  个人简介
                </button>
                <button
                  onClick={() => setActiveTab('education')}
                  className={`px-6 py-2 border-2 transition-all duration-300 font-mono text-sm ${
                    activeTab === 'education'
                      ? 'bg-[#8E44AD] border-[#8E44AD] text-white shadow-lg shadow-[#8E44AD]/50'
                      : 'border-[#2C3E50] text-[#BDC3C7] hover:border-[#8E44AD] hover:text-white'
                  }`}
                >
                  教育背景
                </button>
                <button
                  onClick={() => setActiveTab('experience')}
                  className={`px-6 py-2 border-2 transition-all duration-300 font-mono text-sm ${
                    activeTab === 'experience'
                      ? 'bg-[#8E44AD] border-[#8E44AD] text-white shadow-lg shadow-[#8E44AD]/50'
                      : 'border-[#2C3E50] text-[#BDC3C7] hover:border-[#8E44AD] hover:text-white'
                  }`}
                >
                  工作经历
                </button>
                <button
                  onClick={() => setActiveTab('other')}
                  className={`px-6 py-2 border-2 transition-all duration-300 font-mono text-sm ${
                    activeTab === 'other'
                      ? 'bg-[#8E44AD] border-[#8E44AD] text-white shadow-lg shadow-[#8E44AD]/50'
                      : 'border-[#2C3E50] text-[#BDC3C7] hover:border-[#8E44AD] hover:text-white'
                  }`}
                >
                  其他信息
                </button>
              </div>

              {activeTab === 'personal' && (
                <div className="hud-element p-8 animate-fade-in">
                  <h2 className="text-2xl font-bold text-[#00ff41] mb-6 flex items-center gap-3">
                    <span className="cyber-blink">▶</span> 个人简介
                  </h2>
                  <p className="text-[#BDC3C7] leading-relaxed mb-6">
                    {resume.personal.bio}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-bold text-[#8E44AD] mb-3 flex items-center gap-2">
                        <span>◆</span> 语言能力
                      </h3>
                      <div className="space-y-2">
                        {resume.languages.map((lang, index) => (
                          <div key={index} className="flex justify-between items-center bg-[#2C3E50] p-3 border border-[#8E44AD]/30">
                            <span className="text-[#BDC3C7] font-mono text-sm">{lang.name}</span>
                            <span className="text-[#8E44AD] font-mono text-sm">{lang.level}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#8E44AD] mb-3 flex items-center gap-2">
                        <span>◆</span> 兴趣爱好
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {resume.interests.map((interest, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-[#8E44AD]/20 text-[#8E44AD] border border-[#8E44AD] font-mono text-sm"
                          >
                            {interest}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'education' && (
                <div className="space-y-6 animate-fade-in">
                  {resume.education.map((edu) => (
                    <div key={edu.id} className="hud-element p-8">
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="md:w-24 md:h-24 w-16 h-16 flex-shrink-0">
                          <img
                            src={edu.logo}
                            alt={edu.school}
                            className="w-full h-full object-cover rounded border-2 border-[#8E44AD] monitor-effect"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3">
                            <div>
                              <h3 className="text-xl font-bold text-[#00ff41] mb-1">{edu.school}</h3>
                              <p className="text-[#BDC3C7] font-mono text-sm">{edu.degree}</p>
                            </div>
                            <span className="text-[#8E44AD] font-mono text-sm mt-2 md:mt-0">{edu.duration}</span>
                          </div>

                          {edu.gpa && (
                            <div className="mb-3">
                              <span className="text-[#BDC3C7] text-sm font-mono">GPA: </span>
                              <span className="text-[#8E44AD] font-bold">{edu.gpa}</span>
                            </div>
                          )}

                          {edu.honors && edu.honors.length > 0 && (
                            <div className="mb-3">
                              <h4 className="text-sm font-bold text-[#8E44AD] mb-2">荣誉奖项</h4>
                              <ul className="space-y-1">
                                {edu.honors.map((honor, index) => (
                                  <li key={index} className="text-[#BDC3C7] text-sm flex items-start gap-2">
                                    <span className="text-[#8E44AD] mt-1">✓</span>
                                    <span>{honor}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {edu.courses && edu.courses.length > 0 && (
                            <div>
                              <h4 className="text-sm font-bold text-[#8E44AD] mb-2">核心课程</h4>
                              <div className="flex flex-wrap gap-2">
                                {edu.courses.map((course, index) => (
                                  <span
                                    key={index}
                                    className="text-xs px-2 py-1 bg-[#2C3E50] text-[#BDC3C7] border border-[#8E44AD]/30 font-mono"
                                  >
                                    {course}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {edu.certificates && edu.certificates.length > 0 && (
                            <div className="mt-3">
                              <h4 className="text-sm font-bold text-[#8E44AD] mb-2">获得认证</h4>
                              <div className="flex flex-wrap gap-2">
                                {edu.certificates.map((cert, index) => (
                                  <span
                                    key={index}
                                    className="text-xs px-2 py-1 bg-[#8E44AD]/20 text-[#8E44AD] border border-[#8E44AD] font-mono"
                                  >
                                    {cert}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'experience' && (
                <div className="space-y-6 animate-fade-in">
                  {resume.experience.map((exp) => (
                    <div key={exp.id} className="hud-element p-8">
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="md:w-24 md:h-24 w-16 h-16 flex-shrink-0">
                          <img
                            src={exp.logo}
                            alt={exp.company}
                            className="w-full h-full object-cover rounded border-2 border-[#8E44AD] monitor-effect"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3">
                            <div>
                              <h3 className="text-xl font-bold text-[#00ff41] mb-1">{exp.company}</h3>
                              <p className="text-[#BDC3C7] font-mono text-sm mb-1">{exp.position}</p>
                              <div className="flex flex-wrap gap-2 items-center">
                                <span className="text-xs px-2 py-1 bg-[#2C3E50] text-[#BDC3C7] border border-[#8E44AD]/30 font-mono">
                                  {exp.type}
                                </span>
                                <span className="text-xs text-[#BDC3C7]/60 font-mono">{exp.location}</span>
                              </div>
                            </div>
                            <span className="text-[#8E44AD] font-mono text-sm mt-2 md:mt-0">{exp.duration}</span>
                          </div>

                          <p className="text-[#BDC3C7] text-sm mb-4 leading-relaxed">
                            {exp.description}
                          </p>

                          <div className="mb-4">
                            <h4 className="text-sm font-bold text-[#8E44AD] mb-2 flex items-center gap-2">
                              <span>◆</span> 工作职责
                            </h4>
                            <ul className="space-y-2">
                              {exp.responsibilities.map((resp, index) => (
                                <li key={index} className="text-[#BDC3C7] text-sm flex items-start gap-2">
                                  <span className="text-[#8E44AD] mt-1">→</span>
                                  <span>{resp}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="mb-4">
                            <h4 className="text-sm font-bold text-[#8E44AD] mb-2 flex items-center gap-2">
                              <span>◆</span> 主要成就
                            </h4>
                            <ul className="space-y-2">
                              {exp.achievements.map((ach, index) => (
                                <li key={index} className="text-[#BDC3C7] text-sm flex items-start gap-2">
                                  <span className="text-[#8E44AD] mt-1">✓</span>
                                  <span>{ach}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h4 className="text-sm font-bold text-[#8E44AD] mb-2">技术栈</h4>
                            <div className="flex flex-wrap gap-2">
                              {exp.tech.map((tech, index) => (
                                <span
                                  key={index}
                                  className="text-xs px-2 py-1 bg-[#8E44AD]/20 text-[#8E44AD] border border-[#8E44AD] font-mono"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'other' && (
                <div className="space-y-6 animate-fade-in">
                  <div className="hud-element p-8">
                    <h2 className="text-2xl font-bold text-[#00ff41] mb-6 flex items-center gap-3">
                      <span className="cyber-blink">▶</span> 认证证书
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {resume.certifications.map((cert, index) => (
                        <div key={index} className="bg-[#2C3E50] p-4 border border-[#8E44AD]/30">
                          <h3 className="text-[#00ff41] font-bold mb-2">{cert.name}</h3>
                          <p className="text-[#BDC3C7] text-sm mb-1">{cert.issuer}</p>
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-[#8E44AD] font-mono">{cert.date}</span>
                            <span className="text-[#BDC3C7]/60 font-mono">{cert.credentialId}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="crypto-ticker py-3 mt-12 -mx-4">
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

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Resume;