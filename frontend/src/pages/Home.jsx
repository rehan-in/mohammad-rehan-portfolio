import React, { useState, useEffect } from 'react';
import Footer from '../components/footer';

const Home = ({ isDark }) => {
  const [displayedName, setDisplayedName] = useState('');
  const [nameIndex, setNameIndex] = useState(0);
  const [currentAchievementIndex, setCurrentAchievementIndex] = useState(0);
  
  const [homeContent, setHomeContent] = useState({
    hero: {
      title: "Mohammad Rehan",
      tagline: "Embedded Systems • VLSI • Full-Stack + AI Enthusiast",
      description: "I build innovative solutions combining hardware and software expertise."
    },
    roles: [
      {
        title: 'Embedded System Developer',
        desc: 'I build scalable web applications with React, Node.js, and modern AI integrations. Passionate about clean code, smart automation, and solving real-world problems.',
        icon: 'ES'
      },
      {
        title: 'Very Large Scale Integration (VLSI)',
        desc: 'I design and simulate digital circuits using Verilog & SystemVerilog, deploy to FPGA boards, and optimize RTL flows.',
        icon: 'VLSI'
      },
      {
        title: 'Full-Stack Developer & AI Enthusiast',
        desc: 'From frontend to backend, I build end-to-end apps and integrate AI tools that bring innovation to life.',
        icon: 'AI'
      },
    ]
  });

  // 🟢 NEW: Achievements data
  const [achievements, setAchievements] = useState([
    {
      type: "hackathon",
      title: "AI Health Monitor",
      organization: "Tech Hack 2024",
      achievement: "1st Place Winner",
      date: "March 2024",
      description: "Built a real-time health monitoring system using IoT and AI",
      icon: "1st"
    },
    {
      type: "internship",
      title: "Embedded Systems Intern",
      organization: "TechCorp Solutions", 
      duration: "Summer 2024",
      description: "Developed IoT solutions and embedded firmware",
      skills: ["C++", "Arduino", "IoT Protocols"],
      icon: "Int"
    },
    {
      type: "course",
      title: "Advanced VLSI Design",
      organization: "Coursera",
      date: "Completed Jan 2024",
      description: "Mastered digital circuit design and verification",
      skills: ["Verilog", "Vivado", "FPGA Programming"],
      icon: "Crse"
    },
    {
      type: "certification",
      title: "Full-Stack Development",
      organization: "Udemy",
      date: "Completed Dec 2023", 
      description: "Built full-stack applications with modern frameworks",
      skills: ["React", "Node.js", "MongoDB"],
      icon: "Cert"
    }
  ]);

  useEffect(() => {
    const savedContent = localStorage.getItem('portfolioHomeContent');
    if (savedContent) {
      setHomeContent(JSON.parse(savedContent));
    }

    // 🟢 NEW: Load achievements from localStorage
    const savedAchievements = localStorage.getItem('portfolioAchievements');
    if (savedAchievements) {
      setAchievements(JSON.parse(savedAchievements));
    }
  }, []);

  const fullName = homeContent.hero.title;

  const theme = {
    dark: {
      background: '#0D1117',
      text: '#C9D1D9',
      accent: '#58A6FF',
      secondary: '#8B949E',
      surface: '#161B22',
      shadow: 'rgba(255,255,255,0.05)',
      gradient: 'linear-gradient(135deg, #0D1117 0%, #161B22 100%)',
    },
    light: {
      background: '#F9FAFB',
      text: '#1F2937',
      accent: '#3B82F6',
      secondary: '#6B7280',
      surface: '#FFFFFF',
      shadow: 'rgba(0,0,0,0.1)',
      gradient: 'linear-gradient(135deg, #F9FAFB 0%, #E5E7EB 100%)',
    },
  }[isDark ? 'dark' : 'light'];

  // Typing Effect
  useEffect(() => {
    if (nameIndex < fullName.length) {
      const timer = setTimeout(() => {
        setDisplayedName(fullName.substring(0, nameIndex + 1));
        setNameIndex(nameIndex + 1);
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [nameIndex, fullName]);

  // 🟢 NEW: Auto-rotate achievements
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAchievementIndex((prevIndex) => 
        prevIndex === achievements.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000); // Rotate every 4 seconds

    return () => clearInterval(interval);
  }, [achievements.length]);

  useEffect(() => {
    setDisplayedName('');
    setNameIndex(0);
  }, [isDark]);

  // 🟢 NEW: Manual navigation for achievements
  const nextAchievement = () => {
    setCurrentAchievementIndex(current => 
      current === achievements.length - 1 ? 0 : current + 1
    );
  };

  const prevAchievement = () => {
    setCurrentAchievementIndex(current => 
      current === 0 ? achievements.length - 1 : current - 1
    );
  };

  const currentAchievement = achievements[currentAchievementIndex];

  return (
    <div style={{ ...styles.wrapper, background: theme.gradient, color: theme.text }}>
      <div style={styles.container}>

        {/* Hero Section - UNCHANGED */}
        <section style={styles.hero}>
          <div style={styles.heroLeft}>
            <h1 style={{ ...styles.name, color: theme.text }}>
              <span style={styles.typingText}>{displayedName}</span>
              <span style={styles.cursor}>|</span>
            </h1>
            <p style={{ ...styles.tagline, color: theme.secondary }}>
              {homeContent.hero.tagline}
            </p>
            
            <p style={{ 
              ...styles.heroDescription, 
              color: theme.secondary,
              marginBottom: '2rem'
            }}>
              {homeContent.hero.description}
            </p>

            <div style={styles.buttonContainer}>
              {['/projects', '/skills', '/contact'].map((href, i) => (
                <a
                  key={i}
                  href={href}
                  style={{
                    ...styles.button,
                    background: `linear-gradient(135deg, ${theme.accent} 0%, ${isDark ? '#1F6FEB' : '#2563EB'})`,
                    color: '#ffffff',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = `0 6px 12px ${theme.shadow}`;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  {i === 0 ? 'See My Work' : i === 1 ? 'See My Skills' : 'Hire Me'}
                </a>
              ))}
            </div>
          </div>

          {/* Right Side Full Image - UNCHANGED */}
          <div
            style={{
              ...styles.imageWrapper,
              backgroundColor: theme.surface,
              boxShadow: `0 10px 30px ${theme.shadow}`,
            }}
          >
            <img
              src="WIN_20250324_13_32_53_Pro.jpg"
              alt="Mohammad Rehan"
              style={styles.image}
            />
          </div>
        </section>

        {/* Roles Section - UNCHANGED */}
        <section style={styles.rolesWrapper}>
          <h2 style={{...styles.sectionTitle, color: theme.text}}>What I Do</h2>
          <div style={styles.rolesGrid}>
            {homeContent.roles.map((role, i) => (
              <div
                key={i}
                style={{
                  ...styles.roleCard,
                  backgroundColor: theme.surface,
                  boxShadow: `0 8px 24px ${theme.shadow}`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={styles.roleIcon}>{role.icon}</div>
                <h2 style={{ ...styles.role, color: theme.accent }}>{role.title}</h2>
                <p style={{ ...styles.description, color: theme.secondary }}>{role.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 🟢 NEW: Achievements Carousel Section */}
        <section style={styles.achievementsWrapper}>
          <h2 style={{...styles.sectionTitle, color: theme.text}}>Achievements & Experience</h2>
          <div style={styles.achievementsContainer}>
            <div style={styles.carousel}>
              {/* Navigation Arrows */}
              <button 
                style={styles.navButton} 
                onClick={prevAchievement}
                onMouseEnter={(e) => e.target.style.backgroundColor = theme.accent + '20'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
              >
                ‹
              </button>
              
              {/* Achievement Card */}
              <div style={{
                ...styles.achievementCard,
                backgroundColor: theme.surface,
                boxShadow: `0 8px 32px ${theme.shadow}`,
              }}>
                <div style={styles.achievementHeader}>
                  <div style={styles.achievementIcon}>
                    {currentAchievement?.icon}
                  </div>
                  <div style={styles.achievementTitle}>
                    <h3 style={{ margin: 0, color: theme.text }}>{currentAchievement?.title}</h3>
                    <p style={{ margin: 0, color: theme.accent, fontWeight: '600' }}>
                      {currentAchievement?.organization}
                    </p>
                  </div>
                </div>
                
                <div style={styles.achievementDetails}>
                  <p style={{ color: theme.text, margin: '0 0 1rem 0', lineHeight: '1.6' }}>
                    {currentAchievement?.description}
                  </p>
                  
                  <div style={styles.achievementMeta}>
                    {currentAchievement?.date && (
                      <span style={styles.metaItem}>Date: {currentAchievement.date}</span>
                    )}
                    {currentAchievement?.duration && (
                      <span style={styles.metaItem}>Duration: {currentAchievement.duration}</span>
                    )}
                    {currentAchievement?.achievement && (
                      <span style={styles.metaItem}>Achievement: {currentAchievement.achievement}</span>
                    )}
                  </div>

                  {currentAchievement?.skills && (
                    <div style={styles.skillsContainer}>
                      {currentAchievement.skills.map((skill, index) => (
                        <span 
                          key={index}
                          style={{
                            ...styles.skillTag,
                            backgroundColor: theme.accent + '20',
                            color: theme.accent,
                          }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <button 
                style={styles.navButton} 
                onClick={nextAchievement}
                onMouseEnter={(e) => e.target.style.backgroundColor = theme.accent + '20'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
              >
                ›
              </button>
            </div>

            {/* Progress Dots */}
            <div style={styles.progressDots}>
              {achievements.map((_, index) => (
                <button
                  key={index}
                  style={{
                    ...styles.progressDot,
                    backgroundColor: index === currentAchievementIndex ? theme.accent : theme.secondary,
                  }}
                  onClick={() => setCurrentAchievementIndex(index)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Footer - UNCHANGED */}
        <Footer />
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    minHeight: '100vh',
    width: '100%',
    fontFamily: "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    padding: 0,
    margin: 0,
    transition: 'all 0.3s ease',
  },
  container: {
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '3rem 1.5rem',
    boxSizing: 'border-box',
  },
  hero: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    alignItems: 'center',
    gap: '3rem',
    marginBottom: '5rem',
    minHeight: '80vh',
  },
  heroLeft: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    textAlign: 'left',
  },
  name: {
    fontSize: '3.5rem',
    fontWeight: '800',
    marginBottom: '0.5rem',
    minHeight: '4.5rem',
    display: 'flex',
    alignItems: 'center',
  },
  typingText: {
    background: 'linear-gradient(135deg, #58A6FF 0%, #3B82F6 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  cursor: {
    animation: 'blink 1s infinite',
    color: '#58A6FF',
    marginLeft: '2px',
  },
  tagline: {
    fontSize: '1.4rem',
    marginBottom: '1rem',
    lineHeight: '1.6',
  },
  heroDescription: {
    fontSize: '1.1rem',
    lineHeight: '1.6',
    maxWidth: '600px',
    marginBottom: '2rem',
  },
  imageWrapper: {
    width: '100%',
    maxWidth: '500px',
    height: '500px',
    borderRadius: '16px',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'all 0.3s ease',
    justifySelf: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
    borderRadius: '16px',
    transition: 'all 0.3s ease',
  },
  buttonContainer: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap',
    marginTop: '1rem',
  },
  button: {
    padding: '14px 28px',
    borderRadius: '10px',
    fontWeight: '600',
    fontSize: '1rem',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    boxShadow: 'none',
  },
  rolesWrapper: {
    marginTop: '5rem',
    padding: '2rem 0',
  },
  sectionTitle: {
    fontSize: '2.5rem',
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: '3rem',
  },
  rolesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2.5rem',
  },
  roleCard: {
    borderRadius: '16px',
    padding: '2rem',
    textAlign: 'center',
    transition: 'all 0.3s ease',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  roleIcon: {
    fontSize: '1.5rem',
    marginBottom: '1.5rem',
    fontWeight: '700',
    color: '#58A6FF',
  },
  role: {
    fontSize: '1.5rem',
    fontWeight: '700',
    marginBottom: '1rem',
  },
  description: {
    fontSize: '1.1rem',
    lineHeight: '1.6',
  },

  // 🟢 NEW: Achievements Styles
  achievementsWrapper: {
    marginTop: '5rem',
    padding: '2rem 0',
  },
  achievementsContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '2rem',
  },
  carousel: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
    width: '100%',
    maxWidth: '800px',
  },
  navButton: {
    background: 'transparent',
    border: 'none',
    fontSize: '2rem',
    color: 'inherit',
    cursor: 'pointer',
    padding: '0.5rem 1rem',
    borderRadius: '8px',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '50px',
    height: '50px',
  },
  achievementCard: {
    flex: 1,
    borderRadius: '16px',
    padding: '2rem',
    transition: 'all 0.5s ease',
    minHeight: '300px',
    display: 'flex',
    flexDirection: 'column',
  },
  achievementHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    marginBottom: '1.5rem',
  },
  achievementIcon: {
    fontSize: '1.5rem',
    fontWeight: '700',
    backgroundColor: '#58A6FF20',
    color: '#58A6FF',
    padding: '0.8rem',
    borderRadius: '8px',
    minWidth: '60px',
    textAlign: 'center',
  },
  achievementTitle: {
    flex: 1,
  },
  achievementDetails: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  achievementMeta: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap',
    marginBottom: '1rem',
  },
  metaItem: {
    fontSize: '0.9rem',
    padding: '0.4rem 0.8rem',
    borderRadius: '12px',
    background: 'rgba(0,0,0,0.1)',
  },
  skillsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
  },
  skillTag: {
    padding: '0.4rem 0.8rem',
    borderRadius: '20px',
    fontSize: '0.8rem',
    fontWeight: '500',
  },
  progressDots: {
    display: 'flex',
    gap: '0.5rem',
  },
  progressDot: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
};

// Add Inter font and blink animation
const addStyles = () => {
  const fontLink = document.createElement('link');
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap';
  fontLink.rel = 'stylesheet';
  document.head.appendChild(fontLink);
  
  const style = document.createElement('style');
  style.textContent = `
    @keyframes blink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0; }
    }
  `;
  document.head.appendChild(style);
};

addStyles();

export default Home;