import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaGithub, FaExternalLinkAlt, FaMicrochip, FaStar, FaUserCog } from 'react-icons/fa';
import { SiRaspberrypi } from 'react-icons/si';

const Projects = () => {
  const [filter, setFilter] = useState('All');
  const [ratings, setRatings] = useState({});
  const [submitted, setSubmitted] = useState({});
  const [isDark, setIsDark] = useState(false);
  const [activeTypingIndex, setActiveTypingIndex] = useState(-1);
  const [displayedDescriptions, setDisplayedDescriptions] = useState({});
  const [adminProjects, setAdminProjects] = useState([]);
  const typingTimeoutRef = useRef(null);

  useEffect(() => {
    setIsDark(window.matchMedia('(prefers-color-scheme: dark)').matches);
    loadProjects();
  }, []);

  const loadProjects = () => {
    const savedProjects = localStorage.getItem('portfolioProjects');
    if (savedProjects) {
      setAdminProjects(JSON.parse(savedProjects));
    }
  };

  useEffect(() => {
    const handleStorageChange = () => {
      loadProjects();
    };

    window.addEventListener('storage', handleStorageChange);
    const interval = setInterval(handleStorageChange, 1000);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const color = {
    light: {
      background: '#F8FAFC',
      text: '#1E293B',
      card: '#FFFFFF',
      border: '#E5E7EB',
      tagBg: '#DBEAFE',
      tagHover: '#BFDBFE',
      accent: '#2563EB',
      cardHover: '#EFF6FF',
      filterActive: '#2563EB',
      filterInactive: '#E5E7EB',
    },
    dark: {
      background: '#0F172A',
      text: '#F8FAFC',
      card: '#1E293B',
      border: '#334155',
      tagBg: '#1D4ED8',
      tagHover: '#2563EB',
      accent: '#60A5FA',
      cardHover: '#1E3A8A',
      filterActive: '#60A5FA',
      filterInactive: '#334155',
    },
  };

  const theme = isDark ? color.dark : color.light;

  const defaultProjects = [
    {
      domain: 'Full Stack',
      icon: <FaCode title="Full Stack Project" />,
      title: 'AI ChatBot Portfolio',
      description: 'Modern portfolio with React, Express.js, OpenAI API chatbot integration.',
      tools: ['React', 'Express', 'Node.js'],
      github: 'https://github.com/your-portfolio',
      demo: 'https://your-site.vercel.app',
      image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    },
    {
      domain: 'VLSI',
      icon: <FaMicrochip title="VLSI Project" />,
      title: 'Decoder From binary to 7-segment display',
      description: 'Binary → One-Hot → Hex Digit → 7-Segment',
      tools: ['Verilog', 'Vivado', 'FSM'],
      github: 'https://github.com/your-vlsi',
      image: 'https://images.unsplash.com/photo-1581094288338-231b058b38b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    },
    {
      domain: 'Embedded Systems',
      icon: <SiRaspberrypi title="Embedded Project" />,
      title: 'Smart Irrigation System',
      description: 'IoT soil moisture system using Raspberry Pi, MQTT, and auto watering.',
      tools: ['Python', 'MQTT', 'Raspberry Pi'],
      github: 'https://github.com/your-embedded',
      image: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    }
  ];

  const transformedAdminProjects = adminProjects.map(project => ({
    domain: project.category === 'web' ? 'Full Stack' : 
            project.category === 'embedded' ? 'Embedded Systems' : 
            project.category === 'vlsi' ? 'VLSI' : 'Other',
    icon: project.category === 'web' ? <FaCode title="Full Stack Project" /> :
          project.category === 'embedded' ? <SiRaspberrypi title="Embedded Project" /> :
          project.category === 'vlsi' ? <FaMicrochip title="VLSI Project" /> : <FaCode title="Project" />,
    title: project.title,
    description: project.description || 'No description available',
    tools: project.technologies || [],
    github: project.githubUrl || '',
    demo: project.liveUrl || '',
    image: project.imageUrl || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    isFromAdmin: true,
    featured: project.featured || false
  }));

  const getCombinedProjects = () => {
    return [
      ...transformedAdminProjects.filter(p => p.featured),
      ...defaultProjects,
      ...transformedAdminProjects.filter(p => !p.featured)
    ];
  };

  const allProjects = getCombinedProjects();
  const filteredProjects = allProjects.filter((p) => filter === 'All' || p.domain === filter);

  const startTypingEffect = (projectIndex, description) => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    setDisplayedDescriptions(prev => ({
      ...prev,
      [projectIndex]: ''
    }));

    let currentText = '';
    let currentIndex = 0;

    const type = () => {
      if (currentIndex < description.length) {
        currentText += description[currentIndex];
        setDisplayedDescriptions(prev => ({
          ...prev,
          [projectIndex]: currentText
        }));
        currentIndex++;
        typingTimeoutRef.current = setTimeout(type, 30);
      }
    };

    type();
  };

  const handleMouseEnter = (projectIndex, description) => {
    setActiveTypingIndex(projectIndex);
    startTypingEffect(projectIndex, description);
  };

  const handleMouseLeave = (projectIndex) => {
    setActiveTypingIndex(-1);
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
  };

  const handleRating = async (project, index, num) => {
    setRatings((prev) => ({ ...prev, [index]: num }));
    setSubmitted((prev) => ({ ...prev, [index]: false }));

    try {
      const response = await fetch("http://localhost:5000/api/rating", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectTitle: project.title, rating: num }),
      });

      const result = await response.json();
      if (response.ok) {
        setSubmitted((prev) => ({ ...prev, [index]: true }));
      } else {
        console.error("Backend error:", result.msg);
      }
    } catch (err) {
      console.error("Failed to submit rating:", err);
    }
  };

  return (
    <section style={{ 
      backgroundColor: theme.background, 
      color: theme.text, 
      minHeight: '100vh', 
      width: '100%',
      padding: '3rem 1rem',
      overflow: 'hidden'
    }}>
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto'
      }}>
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ 
            fontSize: '2.5rem', 
            fontWeight: 'bold', 
            marginBottom: '2rem',
            textAlign: 'center',
            background: `linear-gradient(135deg, ${theme.accent}, ${isDark ? '#86efac' : '#16a34a'})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          My Projects
        </motion.h2>

        {/* Filter Buttons - Only VLSI, Embedded Systems, Full Stack */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '1rem', 
            marginBottom: '3rem', 
            flexWrap: 'wrap' 
          }}
        >
          {['All', 'VLSI', 'Embedded Systems', 'Full Stack'].map((d, i) => (
            <motion.button
              key={i}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(d)}
              style={{
                padding: '0.6rem 1.5rem',
                borderRadius: '50px',
                border: 'none',
                backgroundColor: filter === d ? theme.filterActive : theme.filterInactive,
                color: filter === d ? '#fff' : theme.text,
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontWeight: '600',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s ease',
              }}
            >
              {d}
            </motion.button>
          ))}
        </motion.div>

        {/* Project Cards */}
        <div style={{ 
          display: 'grid', 
          gap: '2rem', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          justifyItems: 'center'
        }}>
          {filteredProjects.map((project, index) => (
              <motion.div
                key={`${project.title}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{
                  y: -5,
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
                }}
                onMouseEnter={() => handleMouseEnter(index, project.description)}
                onMouseLeave={() => handleMouseLeave(index)}
                style={{
                  backgroundColor: theme.card,
                  border: `1px solid ${theme.border}`,
                  borderRadius: '16px',
                  padding: '0',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  width: '100%',
                  maxWidth: '380px',
                  transition: 'all 0.3s ease',
                  overflow: 'hidden',
                  position: 'relative'
                }}
              >
                {project.isFromAdmin && (
                  <div style={{
                    position: 'absolute',
                    top: '1rem',
                    left: '1rem',
                    backgroundColor: '#10b981',
                    color: 'white',
                    padding: '0.3rem 0.6rem',
                    borderRadius: '12px',
                    fontSize: '0.7rem',
                    fontWeight: '600',
                    zIndex: 2,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem'
                  }}>
                    <FaUserCog size={10} /> Admin
                  </div>
                )}

                {project.featured && (
                  <div style={{
                    position: 'absolute',
                    top: '1rem',
                    left: project.isFromAdmin ? '5rem' : '1rem',
                    backgroundColor: '#f59e0b',
                    color: 'white',
                    padding: '0.3rem 0.6rem',
                    borderRadius: '12px',
                    fontSize: '0.7rem',
                    fontWeight: '600',
                    zIndex: 2,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem'
                  }}>
                    <FaStar size={10} /> Featured
                  </div>
                )}

                {/* Project Image */}
                <div style={{
                  height: '200px',
                  overflow: 'hidden',
                  position: 'relative'
                }}>
                  <img 
                    src={project.image} 
                    alt={project.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.5s ease'
                    }}
                    onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                    onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                  />
                  <div style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    backgroundColor: theme.tagBg,
                    color: theme.accent,
                    padding: '0.4rem 0.8rem',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    fontWeight: 500,
                  }}>
                    {project.domain}
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: '1.5rem' }}>
                  {/* Header */}
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.75rem', 
                    marginBottom: '1rem' 
                  }}>
                    <div style={{
                      backgroundColor: theme.accent,
                      borderRadius: '50%',
                      width: '40px',
                      height: '40px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      fontSize: '1.2rem'
                    }}>
                      {project.icon}
                    </div>
                    <h3 style={{ 
                      fontSize: '1.3rem', 
                      fontWeight: '600',
                      margin: 0
                    }}>{project.title}</h3>
                  </div>

                  {/* Description */}
                  <div style={{ 
                    minHeight: '80px',
                    marginBottom: '1.5rem',
                  }}>
                    <p style={{ 
                      color: theme.text,
                      opacity: 0.8,
                      lineHeight: '1.6',
                      minHeight: '60px'
                    }}>
                      {displayedDescriptions[index] || project.description}
                      {activeTypingIndex === index && (
                        <span style={{
                          display: 'inline-block',
                          width: '8px',
                          height: '1.2em',
                          backgroundColor: theme.accent,
                          marginLeft: '2px',
                          animation: 'blink 1s infinite',
                          verticalAlign: 'middle'
                        }}></span>
                      )}
                    </p>
                  </div>

                  {/* Tools */}
                  <div style={{ 
                    display: 'flex', 
                    flexWrap: 'wrap', 
                    gap: '0.5rem', 
                    marginBottom: '1.5rem' 
                  }}>
                    {project.tools.map((tool, i) => (
                      <span
                        key={i}
                        style={{
                          backgroundColor: theme.tagBg,
                          color: theme.accent,
                          padding: '0.4rem 0.8rem',
                          borderRadius: '20px',
                          fontSize: '0.8rem',
                          fontWeight: 500,
                          transition: 'all 0.2s ease',
                        }}
                        onMouseEnter={(e) => (e.target.style.backgroundColor = theme.tagHover)}
                        onMouseLeave={(e) => (e.target.style.backgroundColor = theme.tagBg)}
                      >
                        {tool}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div style={{ 
                    display: 'flex', 
                    gap: '1rem', 
                    marginBottom: '1.5rem' 
                  }}>
                    {project.github && (
                      <motion.a
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          color: theme.accent,
                          textDecoration: 'none',
                          fontSize: '0.9rem',
                          fontWeight: '500',
                          padding: '0.5rem 1rem',
                          backgroundColor: theme.tagBg,
                          borderRadius: '8px',
                          transition: 'all 0.2s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = theme.tagHover;
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = theme.tagBg;
                        }}
                      >
                        <FaGithub /> Code
                      </motion.a>
                    )}
                    {project.demo && (
                      <motion.a
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          color: theme.accent,
                          textDecoration: 'none',
                          fontSize: '0.9rem',
                          fontWeight: '500',
                          padding: '0.5rem 1rem',
                          backgroundColor: theme.tagBg,
                          borderRadius: '8px',
                          transition: 'all 0.2s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = theme.tagHover;
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = theme.tagBg;
                        }}
                      >
                        <FaExternalLinkAlt /> Live Demo
                      </motion.a>
                    )}
                  </div>

                  {/* Rating */}
                  <div style={{ 
                    textAlign: 'center', 
                    paddingTop: '1rem',
                    borderTop: `1px solid ${theme.border}`
                  }}>
                    <p style={{ 
                      fontSize: '0.9rem', 
                      marginBottom: '0.75rem',
                      color: theme.text,
                      opacity: 0.8
                    }}>Rate this project:</p>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'center', 
                      gap: '0.4rem',
                      marginBottom: '0.5rem'
                    }}>
                      {[1, 2, 3, 4, 5].map((num) => (
                        <motion.button
                          key={num}
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleRating(project, index, num)}
                          style={{
                            width: '2.2rem',
                            height: '2.2rem',
                            borderRadius: '50%',
                            backgroundColor: ratings[index] === num ? theme.accent : theme.border,
                            color: ratings[index] === num ? '#fff' : theme.text,
                            fontWeight: 'bold',
                            border: 'none',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.2s ease',
                          }}
                          disabled={submitted[index]}
                        >
                          <FaStar />
                        </motion.button>
                      ))}
                    </div>
                    {submitted[index] && (
                      <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        style={{ 
                          marginTop: '0.5rem', 
                          color: '#22c55e', 
                          fontSize: '0.85rem',
                          fontWeight: '500'
                        }}
                      >
                        Thank you for your feedback!
                      </motion.p>
                    )}
                  </div>
                </div>

                <style>{`
                  @keyframes blink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0; }
                  }
                `}</style>
              </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;