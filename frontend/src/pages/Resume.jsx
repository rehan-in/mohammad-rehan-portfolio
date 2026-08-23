import React, { useEffect, useState } from 'react';
import { FaDownload, FaFilePdf, FaEye, FaGraduationCap, FaBriefcase, FaCode, FaMicrochip, FaAward, FaEnvelope, FaPhone } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Resume = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('interactive'); // 'interactive' or 'pdf'
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({ views: 0, downloads: 0 });

  useEffect(() => {
    recordResumeView();
    loadStats();
  }, []);

  const loadStats = () => {
    const savedStats = JSON.parse(localStorage.getItem('resumeStatistics') || '{}');
    setStats({
      views: savedStats.views || 1,
      downloads: savedStats.downloads || 0
    });
  };

  const recordResumeView = () => {
    const currentStats = JSON.parse(localStorage.getItem('resumeStatistics') || '{}');
    if (!currentStats.views) currentStats.views = 0;
    if (!currentStats.viewHistory) currentStats.viewHistory = [];

    const lastView = sessionStorage.getItem('lastResumeView');
    const now = new Date().toISOString();

    if (!lastView || (new Date(now) - new Date(lastView)) > 30 * 60 * 1000) {
      currentStats.views += 1;
      currentStats.viewHistory.push({ timestamp: now });
      currentStats.lastViewed = now;

      localStorage.setItem('resumeStatistics', JSON.stringify(currentStats));
      sessionStorage.setItem('lastResumeView', now);
      setStats(prev => ({ ...prev, views: currentStats.views }));
    }
  };

  const handleDownload = () => {
    const currentStats = JSON.parse(localStorage.getItem('resumeStatistics') || '{}');
    if (!currentStats.downloads) currentStats.downloads = 0;
    if (!currentStats.downloadHistory) currentStats.downloadHistory = [];

    currentStats.downloads += 1;
    currentStats.downloadHistory.push({ timestamp: new Date().toISOString() });

    localStorage.setItem('resumeStatistics', JSON.stringify(currentStats));
    setStats(prev => ({ ...prev, downloads: currentStats.downloads }));

    const link = document.createElement('a');
    link.href = '/Resume.pdf';
    link.download = 'Mohammad_Rehan_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      color: '#f8fafc',
      fontFamily: "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      padding: '2rem 1rem'
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        
        {/* Hero Header */}
        <div style={{
          background: 'rgba(30, 41, 59, 0.7)',
          backdropFilter: 'blur(16px)',
          borderRadius: '24px',
          padding: '2.5rem',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
          marginBottom: '2rem',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.5rem'
        }}>
          <div>
            <span style={{
              backgroundColor: 'rgba(59, 130, 246, 0.15)',
              color: '#60a5fa',
              padding: '0.4rem 1rem',
              borderRadius: '50px',
              fontSize: '0.85rem',
              fontWeight: '600',
              border: '1px solid rgba(96, 165, 250, 0.3)',
              display: 'inline-block',
              marginBottom: '0.8rem'
            }}>
              📄 Verified Curriculum Vitae
            </span>
            <h1 style={{
              fontSize: '2.5rem',
              fontWeight: '800',
              margin: '0.2rem 0',
              background: 'linear-gradient(90deg, #60a5fa, #34d399)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Mohammad Rehan
            </h1>
            <p style={{ color: '#94a3b8', fontSize: '1.1rem', margin: 0 }}>
              Full Stack Web Developer & VLSI System Engineer
            </p>
          </div>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              onClick={handleDownload}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                backgroundColor: '#2563eb',
                color: 'white',
                padding: '0.8rem 1.6rem',
                borderRadius: '12px',
                border: 'none',
                fontWeight: '600',
                fontSize: '0.95rem',
                cursor: 'pointer',
                boxShadow: '0 10px 20px rgba(37, 99, 235, 0.3)',
                transition: 'all 0.2s ease'
              }}
            >
              <FaDownload /> Download PDF
            </button>
            <button
              onClick={() => navigate('/contact')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                color: '#e2e8f0',
                padding: '0.8rem 1.6rem',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                fontWeight: '600',
                fontSize: '0.95rem',
                cursor: 'pointer'
              }}
            >
              <FaEnvelope /> Get In Touch
            </button>
          </div>
        </div>

        {/* View Mode Tabs */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          <button
            onClick={() => setActiveTab('interactive')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.7rem 1.5rem',
              borderRadius: '50px',
              border: 'none',
              backgroundColor: activeTab === 'interactive' ? '#3b82f6' : 'rgba(30, 41, 59, 0.8)',
              color: 'white',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '0.95rem',
              transition: 'all 0.3s ease'
            }}
          >
            <FaEye /> Interactive View
          </button>
          <button
            onClick={() => setActiveTab('pdf')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.7rem 1.5rem',
              borderRadius: '50px',
              border: 'none',
              backgroundColor: activeTab === 'pdf' ? '#3b82f6' : 'rgba(30, 41, 59, 0.8)',
              color: 'white',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '0.95rem',
              transition: 'all 0.3s ease'
            }}
          >
            <FaFilePdf /> Original PDF View
          </button>
        </div>

        {/* Interactive Resume View */}
        {activeTab === 'interactive' && (
          <div style={{ display: 'grid', gap: '2rem' }}>
            
            {/* Executive Summary */}
            <div style={{
              background: 'rgba(30, 41, 59, 0.7)',
              backdropFilter: 'blur(16px)',
              padding: '2rem',
              borderRadius: '20px',
              border: '1px solid rgba(255,255,255,0.08)'
            }}>
              <h2 style={{ fontSize: '1.4rem', fontWeight: '700', color: '#60a5fa', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <FaBriefcase /> Executive Summary
              </h2>
              <p style={{ color: '#cbd5e1', lineHeight: '1.7', fontSize: '1rem', margin: 0 }}>
                Driven and detail-oriented Full Stack Web Developer and VLSI Engineer. Proficient in designing scalable web applications using the MERN stack (MongoDB, Express, React, Node.js) and developing digital hardware architectures with Verilog HDL and FPGA design tools. Passionate about problem-solving, clean code architecture, and high-performance engineering.
              </p>
            </div>

            {/* Grid for Technical Expertise & Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
              
              {/* Technical Expertise */}
              <div style={{
                background: 'rgba(30, 41, 59, 0.7)',
                backdropFilter: 'blur(16px)',
                padding: '2rem',
                borderRadius: '20px',
                border: '1px solid rgba(255,255,255,0.08)'
              }}>
                <h2 style={{ fontSize: '1.4rem', fontWeight: '700', color: '#34d399', marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <FaCode /> Core Stack
                </h2>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                  {['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JavaScript (ES6+)', 'Verilog HDL', 'Digital Design', 'Tailwind CSS', 'C++', 'Git/GitHub'].map((skill, i) => (
                    <span key={i} style={{
                      backgroundColor: 'rgba(52, 211, 153, 0.12)',
                      color: '#34d399',
                      padding: '0.5rem 1rem',
                      borderRadius: '12px',
                      fontSize: '0.85rem',
                      fontWeight: '600',
                      border: '1px solid rgba(52, 211, 153, 0.25)'
                    }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Verified Analytics */}
              <div style={{
                background: 'rgba(30, 41, 59, 0.7)',
                backdropFilter: 'blur(16px)',
                padding: '2rem',
                borderRadius: '20px',
                border: '1px solid rgba(255,255,255,0.08)'
              }}>
                <h2 style={{ fontSize: '1.4rem', fontWeight: '700', color: '#f59e0b', marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <FaAward /> Resume Engagement
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div style={{ backgroundColor: 'rgba(255,255,255,0.03)', padding: '1.2rem', borderRadius: '14px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ fontSize: '2rem', fontWeight: '800', color: '#60a5fa' }}>{stats.views}</div>
                    <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '0.3rem' }}>Profile Views</div>
                  </div>
                  <div style={{ backgroundColor: 'rgba(255,255,255,0.03)', padding: '1.2rem', borderRadius: '14px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ fontSize: '2rem', fontWeight: '800', color: '#34d399' }}>{stats.downloads}</div>
                    <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '0.3rem' }}>PDF Downloads</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Education & Academic Journey */}
            <div style={{
              background: 'rgba(30, 41, 59, 0.7)',
              backdropFilter: 'blur(16px)',
              padding: '2rem',
              borderRadius: '20px',
              border: '1px solid rgba(255,255,255,0.08)'
            }}>
              <h2 style={{ fontSize: '1.4rem', fontWeight: '700', color: '#a78bfa', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <FaGraduationCap /> Education & Specialization
              </h2>
              <div style={{ borderLeft: '3px solid #a78bfa', paddingLeft: '1.5rem', marginLeft: '0.5rem' }}>
                <div style={{ marginBottom: '1.5rem' }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '700', margin: '0 0 0.3rem 0', color: '#f8fafc' }}>
                    Bachelor of Technology (B.Tech) - Engineering & Technology
                  </h3>
                  <p style={{ color: '#a78bfa', margin: '0 0 0.5rem 0', fontWeight: '600' }}>
                    Specialization in Electronics & Computer Science
                  </p>
                  <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: '1.6', margin: 0 }}>
                    Rigorous curriculum covering Data Structures, Full Stack Software Engineering, Digital Logic Design, Microcontrollers, and VLSI Systems.
                  </p>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* Embedded PDF Viewer Mode */}
        {activeTab === 'pdf' && (
          <div style={{
            position: 'relative',
            height: '750px',
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            backgroundColor: '#1e293b'
          }}>
            {isLoading && (
              <div style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#0f172a',
                zIndex: 10
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    border: '4px solid rgba(59, 130, 246, 0.2)',
                    borderTop: '4px solid #3b82f6',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite',
                    margin: '0 auto 1rem auto'
                  }}></div>
                  <p style={{ color: '#94a3b8' }}>Loading PDF Document...</p>
                </div>
              </div>
            )}
            <iframe
              src="/Resume.pdf#toolbar=1&navpanes=0"
              title="Mohammad Rehan Resume PDF"
              width="100%"
              height="100%"
              style={{ border: 'none' }}
              onLoad={() => setIsLoading(false)}
              onError={() => setIsLoading(false)}
            />
          </div>
        )}

      </div>
    </div>
  );
};

export default Resume;