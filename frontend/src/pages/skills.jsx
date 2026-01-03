import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Skills = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const [activeCategory, setActiveCategory] = useState('technical');
  const [adminSkills, setAdminSkills] = useState([]);

  // Load skills from localStorage (same as admin page)
  useEffect(() => {
    loadSkillsFromStorage();
  }, []);

  const loadSkillsFromStorage = () => {
    try {
      const savedSkills = localStorage.getItem('portfolioSkills');
      if (savedSkills) {
        const parsedSkills = JSON.parse(savedSkills);
        setAdminSkills(Array.isArray(parsedSkills) ? parsedSkills : []);
      }
    } catch (error) {
      console.error('Error loading skills:', error);
      setAdminSkills([]);
    }
  };

  // Listen for localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      loadSkillsFromStorage();
    };

    window.addEventListener('storage', handleStorageChange);
    const interval = setInterval(handleStorageChange, 1000);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  // Convert admin skills to the same format as hard-coded skills
  const convertAdminSkillsToFormat = () => {
    const currentSkills = adminSkills.filter(skill => skill.category === activeCategory);
    
    if (currentSkills.length === 0) return [];

    // Group skills by subcategory (same logic as before but using subcategory instead of proficiency)
    const subcategoryGroups = {};
    
    currentSkills.forEach(skill => {
      const subcategory = skill.subcategory || 'general';
      if (!subcategoryGroups[subcategory]) {
        subcategoryGroups[subcategory] = {
          title: getSubcategoryLabel(subcategory),
          skills: [{ list: [] }]
        };
      }
      subcategoryGroups[subcategory].skills[0].list.push(skill.name);
    });

    return Object.values(subcategoryGroups);
  };

  // Get subcategory labels (same as SkillsManagement)
  const getSubcategoryLabel = (subcategory) => {
    const labels = {
      // Technical
      frontend: 'Frontend',
      backend: 'Backend',
      database: 'Database',
      tools: 'Tools',
      devops: 'DevOps',
      
      // VLSI
      languages: 'Technical Languages',
      tools: 'Tools',
      concepts: 'Concepts',
      problemsolving: 'Problem Solving',
      
      // Soft Skills
      communication: 'Communication',
      collaboration: 'Collaboration',
      leadership: 'Leadership',
      problemsolving: 'Problem Solving',
      
      // Fallback
      general: 'General Skills'
    };
    return labels[subcategory] || subcategory;
  };

  // Fallback hard-coded skills (EXACT SAME AS BEFORE)
  const getFallbackSkills = () => {
    if (activeCategory === 'technical') {
      return [
        {
          title: 'Frontend',
          skills: [
            {
              list: [
                'HTML',
                'CSS',
                'JavaScript',
                'React',
                'Tailwind CSS',
                'Bootstrap',
              ]
            },
          ],
        },
        {
          title: 'Backend',
          skills: [
            {
              list: [
                'Node.js',
                'Express.js',
                'MongoDB',
                'RESTful APIs',
              ]
            },
          ],
        },
        {
          title: 'Tools',
          skills: [
            {
              list: [
                'Postman',
                'Git',
                'GitHub',
                'VS Code',
              ]
            },
          ],
        },
      ];
    } else if (activeCategory === 'vlsi') {
      return [
        {
          title: 'Technical Languages',
          skills: [
            {
              list: [
                'Verilog',
                'SystemVerilog',
                'Python',
              ]
            },
          ]
        },
        {
          title: 'Tools',
          skills: [
            {
              list: [
                'Vivado',
                'LTSpice',
                'MATLAB',
                'Microwind31',
                'Circuit Varse',
              ]
            },
          ]
        },
        {
          title: 'Concepts',
          skills: [
            {
              list: [
                'Digital Logic & Computer Design',
                'CMOS',
                'Digital Electronics',
                'IC Design',
                'Hardware Modeling',
                'UVM concepts',
              ]
            },
          ]
        },
        {
          title: 'Problem Solving',
          skills: [
            {
              list: [
                'HDL Bits',
                'LeetCode',
                'Hackerrank',
              ]
            },
          ]
        }
      ];
    } else {
      return [
        {
          title: 'Soft Skills',
          skills: [
            {
              list: [
                'Effective Communication',
                'Team Collaboration',
                'Problem Solving',
                'Time Management',
                'Adaptability',
                'Critical Thinking',
                'Creativity',
                'Leadership',
              ]
            },
          ],
        }
      ];
    }
  };

  const getCurrentSkills = () => {
    // Use admin skills if available for the current category
    if (adminSkills.length > 0) {
      const categorySkills = adminSkills.filter(skill => skill.category === activeCategory);
      if (categorySkills.length > 0) {
        const convertedSkills = convertAdminSkillsToFormat();
        return convertedSkills.length > 0 ? convertedSkills : getFallbackSkills();
      }
    }
    return getFallbackSkills();
  };

  const getCategoryTitle = () => {
    const titles = {
      technical: 'Technical Skills',
      vlsi: 'VLSI Skills',
      soft: 'Soft Skills'
    };
    return titles[activeCategory] || 'Skills';
  };

  return (
    <section
      id="skills"
      className="skills-section"
    >
      <div className="skills-container">
        <h2
          className="skills-title"
          data-aos="fade-down"
        >
          {getCategoryTitle()}
        </h2>

        {/* Category buttons - EXACT SAME LAYOUT */}
        <div className="skills-category-selector">
          <button
            onClick={() => setActiveCategory('technical')}
            className={`category-button ${activeCategory === 'technical' ? 'active' : ''}`}
          >
            Technical
          </button>
          <button
            onClick={() => setActiveCategory('vlsi')}
            className={`category-button ${activeCategory === 'vlsi' ? 'active' : ''}`}
          >
            VLSI
          </button>
          <button
            onClick={() => setActiveCategory('soft')}
            className={`category-button ${activeCategory === 'soft' ? 'active' : ''}`}
          >
            Soft Skills
          </button>
        </div>

        {/* Admin skills indicator - EXACT SAME LAYOUT */}
        {adminSkills.length > 0 && (
          <div style={{ 
            textAlign: 'center', 
            marginBottom: '2rem',
            color: '#3498db',
            fontSize: '0.9rem'
          }}>
            🚀 {adminSkills.filter(skill => skill.category === activeCategory).length} skill(s) managed via Admin Panel
          </div>
        )}

        {/* Skills grid - EXACT SAME LAYOUT */}
        <div className="skills-grid">
          {getCurrentSkills().map(({ title, skills }) => (
            <div key={title} className="skill-category" data-aos="fade-up">
              <h3 className="skill-category-title">{title}</h3>
              <ul className="skills-list">
                {skills.map(({ list }, idx) => (
                  list.map((item) => (
                    <li key={`${item}-${idx}`} className="skill-item">{item}</li>
                  ))
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* EXACT SAME STYLES - NO CHANGES */}
      <style jsx>{`
        .skills-section {
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          color: #333;
          padding: 80px 20px;
          transition: all 0.3s ease;
          min-height: 100vh;
          display: flex;
          align-items: center;
        }
        
        .skills-container {
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
        }
        
        .skills-title {
          font-size: 2.8rem;
          font-weight: 700;
          text-align: center;
          margin-bottom: 40px;
          color: #2c3e50;
          position: relative;
          padding-bottom: 15px;
        }
        
        .skills-title:after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 80px;
          height: 4px;
          background: linear-gradient(90deg, #3498db, #2ecc71);
          border-radius: 2px;
        }
        
        .skills-category-selector {
          display: flex;
          justify-content: center;
          margin-bottom: 50px;
          gap: 20px;
          flex-wrap: wrap;
        }
        
        .category-button {
          padding: 12px 28px;
          border: none;
          border-radius: 50px;
          font-size: 1rem;
          fontWeight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          background: #fff;
          color: #3498db;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }
        
        .category-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
        }
        
        .category-button.active {
          background: linear-gradient(90deg, #3498db, #2ecc71);
          color: white;
        }
        
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 30px;
        }
        
        .skill-category {
          background: white;
          border-radius: 12px;
          padding: 25px;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .skill-category:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        }
        
        .skill-category-title {
          font-size: 1.5rem;
          fontWeight: 600;
          margin-bottom: 20px;
          color: #2c3e50;
          border-bottom: 2px solid #3498db;
          padding-bottom: 10px;
        }
        
        .skills-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        
        .skill-item {
          padding: 10px 0;
          border-bottom: 1px solid #eee;
          position: relative;
          padding-left: 25px;
          font-size: 1.05rem;
          transition: color 0.3s ease;
        }
        
        .skill-item:before {
          content: "•";
          color: #3498db;
          fontWeight: bold;
          display: inline-block;
          width: 1em;
          margin-left: -1em;
          font-size: 1.2rem;
        }
        
        .skill-item:last-child {
          border-bottom: none;
        }
        
        .skill-item:hover {
          color: #3498db;
        }
        
        @media (max-width: 768px) {
          .skills-title {
            font-size: 2.2rem;
          }
          
          .skills-category-selector {
            flex-direction: column;
            align-items: center;
          }
          
          .category-button {
            width: 200px;
          }
          
          .skills-grid {
            grid-template-columns: 1fr;
          }
        }
        
        @media (max-width: 480px) {
          .skills-section {
            padding: 60px 15px;
          }
          
          .skills-title {
            font-size: 1.8rem;
          }
          
          .skill-category {
            padding: 20px;
          }
        }
      `}</style>
    </section>
  );
};

export default Skills;