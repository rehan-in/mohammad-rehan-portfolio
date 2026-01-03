import React, { useState, useEffect } from 'react';

const Education = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [educationData, setEducationData] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // 🟢 Load education data from localStorage
  useEffect(() => {
    loadEducationData();
  }, []);

  const loadEducationData = () => {
    try {
      const savedEducation = localStorage.getItem('portfolioEducation');
      if (savedEducation) {
        setEducationData(JSON.parse(savedEducation));
      } else {
        // Fallback data if nothing in localStorage
        setEducationData([
          {
            id: 1,
            institute: 'National Institute of Technology, Mizoram',
            degree: 'Bachelor of Technology',
            field: 'Electronics and Communication Engineering',
            duration: '2023 - 2027',
            grade: 'CGPA: 8.5/10',
            achievements: ['Department Rank: Top 10%', 'Relevant Courses: VLSI Design, Digital Electronics, Embedded Systems'],
            description: 'Currently pursuing my BTech in Electronics and Communication Engineering.'
          },
          {
            id: 2,
            institute: 'R.S.S Inter College',
            degree: 'PCM',
            field: 'Physics, Chemistry, Mathematics',
            duration: '2019 - 2021',
            grade: 'Percentage: 85%',
            achievements: ['Science Fair Winner', 'Math Olympiad Participant'],
            description: 'Completed intermediate education with focus on Science and Mathematics.'
          },
          {
            id: 3,
            institute: 'S.S.V.M Inter College',
            degree: 'General Studies',
            field: 'General Studies',
            duration: '2017 - 2019',
            grade: 'Percentage: 89%',
            achievements: ['School Topper in Science', 'Chess Club Captain'],
            description: 'Completed high school education.'
          }
        ]);
      }
    } catch (error) {
      console.error('Error loading education data:', error);
    }
  };

  // 🟢 Listen for localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      loadEducationData();
    };

    window.addEventListener('storage', handleStorageChange);
    const interval = setInterval(handleStorageChange, 1000);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  return (
    <section id="education" style={styles.section}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h2 style={styles.heading}>
            <span style={styles.icon}>🎓</span>
            Education Journey
          </h2>
          <p style={styles.subheading}>My academic path and achievements</p>
        </div>
        
        {/* 🟢 Admin data indicator */}
        {educationData.length > 0 && (
          <div style={{ 
            textAlign: 'center', 
            marginBottom: '2rem',
            color: '#3498db',
            fontSize: '0.9rem'
          }}>
            🚀 {educationData.length} education entries managed via Admin Panel
          </div>
        )}
        
        <div style={styles.timeline}>
          {/* Timeline connector line */}
          <div style={styles.timelineLine}></div>
          
          {/* 🟢 Dynamic Education Items from localStorage */}
          {educationData.map((edu, index) => (
            <div 
              key={edu.id || index}
              style={{
                ...styles.item, 
                opacity: isVisible ? 1 : 0, 
                transform: isVisible ? 'translateX(0)' : 'translateX(-50px)', 
                transition: `all 0.6s ease ${0.2 + index * 0.2}s`
              }}
            >
              <div style={styles.timelineDot}>
                <div style={styles.dotInner}></div>
              </div>
              <div style={styles.content}>
                <div style={styles.itemHeader}>
                  <h3 style={styles.institute}>{edu.institute}</h3>
                  <span style={styles.duration}>{edu.duration}</span>
                </div>
                <p style={styles.course}>{edu.degree} in {edu.field}</p>
                <div style={styles.highlights}>
                  <span style={styles.highlight}>{edu.grade}</span>
                  {Array.isArray(edu.achievements) && edu.achievements.map((achievement, idx) => (
                    <span key={idx} style={styles.highlight}>{achievement}</span>
                  ))}
                </div>
                {edu.description && (
                  <p style={styles.description}>{edu.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 🟢 REMOVED: Key Skills Developed section */}

      {/* Add CSS animations */}
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          
          .education-item:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.12);
          }
          
          .highlight:before {
            content: "✓";
            margin-right: 8px;
            color: #2ecc71;
            font-weight: bold;
          }
        `}
      </style>
    </section>
  );
};

const styles = {
  section: {
    background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e7eb 100%)',
    padding: '80px 20px',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    fontFamily: "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  container: {
    width: '100%',
    maxWidth: '1100px',
    margin: '0 auto',
    padding: '0 20px',
  },
  header: {
    textAlign: 'center',
    marginBottom: '60px',
  },
  heading: {
    fontSize: '2.8rem',
    marginBottom: '15px',
    color: '#2c3e50',
    fontWeight: '800',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '15px',
  },
  icon: {
    fontSize: '2.5rem',
    animation: 'float 3s ease-in-out infinite',
  },
  subheading: {
    fontSize: '1.2rem',
    color: '#7f8c8d',
    fontWeight: '400',
    maxWidth: '600px',
    margin: '0 auto',
    lineHeight: '1.6',
  },
  timeline: {
    position: 'relative',
    paddingLeft: '30px',
    marginBottom: '80px',
  },
  timelineLine: {
    position: 'absolute',
    left: '15px',
    top: '0',
    bottom: '0',
    width: '3px',
    background: 'linear-gradient(to bottom, #3498db, #2ecc71, #3498db)',
    borderRadius: '3px',
  },
  item: {
    position: 'relative',
    marginBottom: '50px',
    display: 'flex',
    alignItems: 'flex-start',
  },
  timelineDot: {
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #3498db, #2ecc71)',
    border: '3px solid white',
    boxShadow: '0 0 0 3px #3498db, 0 3px 10px rgba(0,0,0,0.1)',
    position: 'absolute',
    left: '-38px',
    top: '5px',
    zIndex: '2',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotInner: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    backgroundColor: 'white',
  },
  content: {
    background: 'white',
    padding: '30px',
    borderRadius: '16px',
    boxShadow: '0 5px 25px rgba(0, 0, 0, 0.08)',
    width: '100%',
    transition: 'all 0.3s ease',
    borderLeft: '5px solid #3498db',
  },
  itemHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '15px',
    flexWrap: 'wrap',
    gap: '15px',
  },
  institute: {
    fontSize: '1.5rem',
    color: '#2c3e50',
    fontWeight: '700',
    margin: '0',
  },
  duration: {
    fontSize: '1rem',
    color: 'white',
    fontWeight: '600',
    background: 'linear-gradient(135deg, #3498db, #2ecc71)',
    padding: '6px 15px',
    borderRadius: '20px',
    boxShadow: '0 3px 10px rgba(52, 152, 219, 0.3)',
  },
  course: {
    fontSize: '1.1rem',
    color: '#34495e',
    margin: '0 0 20px 0',
    lineHeight: '1.5',
    fontWeight: '500',
  },
  description: {
    fontSize: '1rem',
    color: '#7f8c8d',
    margin: '15px 0 0 0',
    lineHeight: '1.6',
    fontStyle: 'italic',
  },
  highlights: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  highlight: {
    fontSize: '0.95rem',
    color: '#2c3e50',
    background: '#f3f7fb',
    padding: '8px 15px',
    borderRadius: '8px',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
  },
};

export default Education;