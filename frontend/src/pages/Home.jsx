import React, { useState, useEffect } from 'react';
import { 
  FaCode, FaMicrochip, FaLaptopCode, FaTrophy, 
  FaArrowRight, FaDownload, FaEnvelope, FaBriefcase, 
  FaCheckCircle, FaStar, FaGlobe, FaChevronLeft, FaChevronRight 
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/footer';

const Home = ({ isDark }) => {
  const navigate = useNavigate();
  const [displayedName, setDisplayedName] = useState('');
  const [nameIndex, setNameIndex] = useState(0);
  const [currentAchievementIndex, setCurrentAchievementIndex] = useState(0);
  
  const [homeContent, setHomeContent] = useState({
    hero: {
      title: "Mohammad Rehan",
      tagline: "Full-Stack Web Developer & VLSI System Engineer",
      description: "Building scalable web applications and digital hardware architectures. Bridging the gap between software performance and hardware design."
    },
    roles: [
      {
        title: 'Full-Stack Web Development',
        desc: 'Designing and deploying responsive web applications with React, Node.js, Express, and MongoDB. Focused on clean code, RESTful microservices, and smooth UX.',
        icon: <FaLaptopCode />
      },
      {
        title: 'VLSI & Digital System Design',
        desc: 'Architecting digital circuits and FSM logic using Verilog HDL and simulation tools like Xilinx Vivado, LTSpice, and hardware modeling techniques.',
        icon: <FaMicrochip />
      },
      {
        title: 'Engineering & Software Architecture',
        desc: 'Writing optimized algorithms, managing version control via Git/GitHub, and engineering hardware-software co-designed solutions.',
        icon: <FaCode />
      },
    ]
  });

  const [achievements, setAchievements] = useState([
    {
      type: "project",
      title: "Full-Stack Portfolio & Admin Suite",
      organization: "MERN Stack Project",
      achievement: "Featured Project",
      date: "2024",
      description: "Interactive portfolio application built with React, Express, MongoDB, and protected Admin management capabilities.",
      skills: ["React.js", "Node.js", "Express.js", "MongoDB", "REST API"]
    },
    {
      type: "hardware",
      title: "Binary to 7-Segment Decoder & FSM",
      organization: "VLSI System Design", 
      date: "2024",
      description: "RTL design and simulation of a multi-digit hex decoder and finite state machine using Verilog HDL.",
      skills: ["Verilog HDL", "Vivado", "Digital Logic", "FSM"]
    },
    {
      type: "academic",
      title: "B.Tech Specialization in Electronics & CS",
      organization: "Engineering Degree",
      date: "Ongoing",
      description: "Specialized coursework in Computer Science, Data Structures, Web Development, and Digital System Architecture.",
      skills: ["Data Structures", "Algorithms", "C++", "Python"]
    }
  ]);

  const loadHomeData = () => {
    const savedContent = localStorage.getItem('portfolioHomeContent');
    if (savedContent) {
      setHomeContent(JSON.parse(savedContent));
    }

    const savedAchievements = localStorage.getItem('portfolioAchievements');
    if (savedAchievements) {
      setAchievements(JSON.parse(savedAchievements));
    }
  };

  useEffect(() => {
    loadHomeData();
    window.addEventListener('storage', loadHomeData);
    const interval = setInterval(loadHomeData, 1000);

    return () => {
      window.removeEventListener('storage', loadHomeData);
      clearInterval(interval);
    };
  }, []);

  const fullName = homeContent.hero.title;

  const theme = {
    dark: {
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      text: '#f8fafc',
      secondary: '#94a3b8',
      surface: 'rgba(30, 41, 59, 0.75)',
      surfaceLight: 'rgba(51, 65, 85, 0.6)',
      accent: '#3b82f6',
      accentGlow: '#60a5fa',
      border: 'rgba(255, 255, 255, 0.08)',
      shadow: '0 20px 40px rgba(0, 0, 0, 0.35)'
    },
    light: {
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      text: '#1e293b',
      secondary: '#64748b',
      surface: 'rgba(255, 255, 255, 0.85)',
      surfaceLight: 'rgba(241, 245, 249, 0.9)',
      accent: '#2563eb',
      accentGlow: '#3b82f6',
      border: 'rgba(0, 0, 0, 0.08)',
      shadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
    }
  }[isDark ? 'dark' : 'light'];

  // Typing Effect
  useEffect(() => {
    if (nameIndex < fullName.length) {
      const timer = setTimeout(() => {
        setDisplayedName(fullName.substring(0, nameIndex + 1));
        setNameIndex(nameIndex + 1);
      }, 120);
      return () => clearTimeout(timer);
    }
  }, [nameIndex, fullName]);

  // Auto-rotate achievements
  useEffect(() => {
    if (achievements.length > 1) {
      const interval = setInterval(() => {
        setCurrentAchievementIndex((prev) => (prev === achievements.length - 1 ? 0 : prev + 1));
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [achievements.length]);

  const nextAchievement = () => {
    setCurrentAchievementIndex((current) => (current === achievements.length - 1 ? 0 : current + 1));
  };

  const prevAchievement = () => {
    setCurrentAchievementIndex((current) => (current === 0 ? achievements.length - 1 : current - 1));
  };

  const currentAchievement = achievements[currentAchievementIndex] || achievements[0];

  return (
    <div style={{
      minHeight: '100vh',
      background: theme.background,
      color: theme.text,
      fontFamily: "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      padding: 0,
      margin: 0
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1.5rem' }}>

        {/* Status Badge & Official Header Banner */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.6rem',
          backgroundColor: 'rgba(16, 185, 129, 0.15)',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          color: '#34d399',
          padding: '0.5rem 1.2rem',
          borderRadius: '50px',
          fontSize: '0.88rem',
          fontWeight: '600',
          marginBottom: '2rem',
          backdropFilter: 'blur(10px)'
        }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#34d399', boxShadow: '0 0 10px #34d399' }}></span>
          Available for Full-Stack & VLSI Engineering Roles
        </div>

        {/* Hero Section */}
        <section style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '3rem',
          alignItems: 'center',
          marginBottom: '4rem'
        }}>
          <div>
            <h1 style={{
              fontSize: '3.2rem',
              fontWeight: '800',
              lineHeight: '1.2',
              margin: '0 0 1rem 0'
            }}>
              Hi, I'm{' '}
              <span style={{
                background: 'linear-gradient(90deg, #60a5fa, #34d399)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                {displayedName}
              </span>
              <span style={{ opacity: 0.8, color: theme.accent }}>|</span>
            </h1>

            <h2 style={{
              fontSize: '1.4rem',
              fontWeight: '600',
              color: theme.accentGlow,
              margin: '0 0 1.2rem 0'
            }}>
              {homeContent.hero.tagline}
            </h2>

            <p style={{
              fontSize: '1.1rem',
              lineHeight: '1.7',
              color: theme.secondary,
              marginBottom: '2.5rem',
              maxWidth: '560px'
            }}>
              {homeContent.hero.description}
            </p>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => navigate('/projects')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  padding: '0.85rem 1.8rem',
                  borderRadius: '12px',
                  backgroundColor: '#2563eb',
                  color: 'white',
                  border: 'none',
                  fontSize: '1rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  boxShadow: '0 10px 25px rgba(37, 99, 235, 0.35)',
                  transition: 'all 0.2s ease'
                }}
              >
                Explore Projects <FaArrowRight />
              </button>

              <button
                onClick={() => navigate('/resume')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  padding: '0.85rem 1.8rem',
                  borderRadius: '12px',
                  backgroundColor: theme.surface,
                  color: theme.text,
                  border: `1px solid ${theme.border}`,
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <FaDownload /> View Resume
              </button>

              <button
                onClick={() => navigate('/contact')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  padding: '0.85rem 1.8rem',
                  borderRadius: '12px',
                  backgroundColor: 'transparent',
                  color: theme.accentGlow,
                  border: `1px solid ${theme.accentGlow}`,
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                <FaEnvelope /> Contact Me
              </button>
            </div>
          </div>

          {/* Hero Profile Image / Badge Card */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{
              position: 'relative',
              width: '100%',
              maxWidth: '380px',
              borderRadius: '24px',
              overflow: 'hidden',
              boxShadow: theme.shadow,
              border: `1px solid ${theme.border}`,
              backgroundColor: theme.surface
            }}>
              <img
                src="WIN_20250324_13_32_53_Pro.jpg"
                alt="Mohammad Rehan"
                style={{
                  width: '100%',
                  height: '420px',
                  objectFit: 'cover',
                  display: 'block'
                }}
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                background: 'linear-gradient(to top, rgba(15, 23, 42, 0.95), transparent)',
                padding: '1.5rem',
                color: 'white'
              }}>
                <div style={{ fontSize: '1.2rem', fontWeight: '800' }}>Mohammad Rehan</div>
                <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '0.2rem' }}>
                  Full-Stack & VLSI System Engineer
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Metrics Counter Bar */}
        <section style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.5rem',
          marginBottom: '4rem',
          backgroundColor: theme.surface,
          backdropFilter: 'blur(16px)',
          borderRadius: '20px',
          padding: '2rem',
          border: `1px solid ${theme.border}`,
          boxShadow: theme.shadow
        }}>
          {[
            { number: '10+', label: 'Engineering Projects', icon: <FaLaptopCode color="#60a5fa" /> },
            { number: '15+', label: 'Technical & VLSI Skills', icon: <FaMicrochip color="#34d399" /> },
            { number: '100%', label: 'Clean Code Commitment', icon: <FaCheckCircle color="#f59e0b" /> },
            { number: '24/7', label: 'Open to Inquiries', icon: <FaGlobe color="#a78bfa" /> }
          ].map((stat, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.8rem', marginBottom: '0.4rem' }}>{stat.icon}</div>
              <div style={{ fontSize: '2.2rem', fontWeight: '800', color: theme.text }}>{stat.number}</div>
              <div style={{ fontSize: '0.85rem', fontWeight: '600', color: theme.secondary, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{stat.label}</div>
            </div>
          ))}
        </section>

        {/* Core Pillars / What I Do Section */}
        <section style={{ marginBottom: '4.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '2.2rem', fontWeight: '800', margin: '0 0 0.5rem 0' }}>Core Specializations</h2>
            <p style={{ color: theme.secondary, fontSize: '1.05rem', margin: 0 }}>
              Combining web development expertise with hardware design capabilities
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem'
          }}>
            {homeContent.roles.map((role, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: theme.surface,
                  backdropFilter: 'blur(16px)',
                  borderRadius: '20px',
                  padding: '2.2rem',
                  border: `1px solid ${theme.border}`,
                  boxShadow: theme.shadow,
                  transition: 'transform 0.3s ease'
                }}
              >
                <div style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '16px',
                  backgroundColor: 'rgba(59, 130, 246, 0.15)',
                  color: '#60a5fa',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  marginBottom: '1.2rem'
                }}>
                  {role.icon}
                </div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: '700', margin: '0 0 0.8rem 0', color: theme.text }}>
                  {role.title}
                </h3>
                <p style={{ color: theme.secondary, lineHeight: '1.7', fontSize: '0.98rem', margin: 0 }}>
                  {role.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Key Achievements & Credentials Section */}
        <section style={{ marginBottom: '4.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '2.2rem', fontWeight: '800', margin: '0 0 0.5rem 0', display: 'inline-flex', alignItems: 'center', gap: '0.6rem' }}>
              <FaTrophy color="#f59e0b" /> Credentials & Highlights
            </h2>
          </div>

          <div style={{
            backgroundColor: theme.surface,
            backdropFilter: 'blur(16px)',
            borderRadius: '24px',
            padding: '2.5rem',
            border: `1px solid ${theme.border}`,
            boxShadow: theme.shadow,
            position: 'relative'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <span style={{ backgroundColor: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b', padding: '0.3rem 0.8rem', borderRadius: '12px', fontSize: '0.8rem', fontWeight: '700' }}>
                  {currentAchievement?.achievement || 'Highlight'}
                </span>
                <span style={{ color: theme.secondary, fontSize: '0.9rem' }}>{currentAchievement?.date}</span>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  onClick={prevAchievement}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    border: `1px solid ${theme.border}`,
                    backgroundColor: theme.surfaceLight,
                    color: theme.text,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <FaChevronLeft size={12} />
                </button>
                <button
                  onClick={nextAchievement}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    border: `1px solid ${theme.border}`,
                    backgroundColor: theme.surfaceLight,
                    color: theme.text,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <FaChevronRight size={12} />
                </button>
              </div>
            </div>

            <h3 style={{ fontSize: '1.5rem', fontWeight: '800', margin: '0 0 0.4rem 0', color: theme.text }}>
              {currentAchievement?.title}
            </h3>
            <p style={{ color: theme.accentGlow, fontWeight: '600', fontSize: '1rem', margin: '0 0 1rem 0' }}>
              {currentAchievement?.organization}
            </p>

            <p style={{ color: theme.secondary, lineHeight: '1.7', fontSize: '1rem', marginBottom: '1.5rem' }}>
              {currentAchievement?.description}
            </p>

            {currentAchievement?.skills && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {currentAchievement.skills.map((skill, idx) => (
                  <span key={idx} style={{
                    backgroundColor: 'rgba(59, 130, 246, 0.12)',
                    color: '#60a5fa',
                    padding: '0.4rem 0.9rem',
                    borderRadius: '10px',
                    fontSize: '0.82rem',
                    fontWeight: '600',
                    border: '1px solid rgba(59, 130, 246, 0.2)'
                  }}>
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA Banner */}
        <section style={{
          background: 'linear-gradient(135deg, #1e3a8a 0%, #1e293b 100%)',
          borderRadius: '24px',
          padding: '3rem 2rem',
          textAlign: 'center',
          marginBottom: '3rem',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
        }}>
          <h2 style={{ fontSize: '2rem', fontWeight: '800', color: 'white', margin: '0 0 1rem 0' }}>
            Ready to Collaborate or Hire?
          </h2>
          <p style={{ color: '#cbd5e1', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto 2rem auto', lineHeight: '1.6' }}>
            Whether you are looking for a Full-Stack MERN Developer or a VLSI System Engineer, feel free to reach out directly.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => navigate('/contact')}
              style={{
                padding: '0.85rem 2rem',
                borderRadius: '12px',
                border: 'none',
                backgroundColor: '#2563eb',
                color: 'white',
                fontSize: '1rem',
                fontWeight: '700',
                cursor: 'pointer',
                boxShadow: '0 10px 25px rgba(37, 99, 235, 0.35)'
              }}
            >
              Get In Touch
            </button>
            <button
              onClick={() => navigate('/projects')}
              style={{
                padding: '0.85rem 2rem',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Browse Projects
            </button>
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default Home;