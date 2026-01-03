import React, { useState, useEffect } from 'react';
import { 
  FaHome, FaSave, FaEdit, FaUser, FaCode, FaMicrochip, FaRobot, 
  FaTrophy, FaBriefcase, FaGraduationCap, FaCertificate, FaPlus, 
  FaTrash, FaCalendarAlt, FaClock, FaAward, FaLightbulb, 
  FaBolt, FaCogs, FaDesktop, FaServer, FaDatabase 
} from 'react-icons/fa';

const HomeManagement = ({ styles, theme }) => {
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
        icon: 'FaMicrochip'
      },
      {
        title: 'Very Large Scale Integration (VLSI)',
        desc: 'I design and simulate digital circuits using Verilog & SystemVerilog, deploy to FPGA boards, and optimize RTL flows.',
        icon: 'FaCogs'
      },
      {
        title: 'Full-Stack Developer & AI Enthusiast',
        desc: 'From frontend to backend, I build end-to-end apps and integrate AI tools that bring innovation to life.',
        icon: 'FaRobot'
      }
    ],
    featuredProjects: []
  });

  // NEW: Achievements state
  const [achievements, setAchievements] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingAchievement, setIsEditingAchievement] = useState(false);
  const [currentAchievement, setCurrentAchievement] = useState({
    type: 'hackathon',
    title: '',
    organization: '',
    achievement: '',
    duration: '',
    date: '',
    description: '',
    skills: '',
    icon: 'FaTrophy'
  });

  useEffect(() => {
    loadHomeContent();
    loadAchievements(); // NEW: Load achievements
  }, []);

  const loadHomeContent = () => {
    const savedContent = localStorage.getItem('portfolioHomeContent');
    if (savedContent) {
      setHomeContent(JSON.parse(savedContent));
    }
  };

  // NEW: Load achievements from localStorage
  const loadAchievements = () => {
    const savedAchievements = localStorage.getItem('portfolioAchievements');
    if (savedAchievements) {
      setAchievements(JSON.parse(savedAchievements));
    } else {
      // Default achievements
      const defaultAchievements = [
        {
          id: 1,
          type: "hackathon",
          title: "AI Health Monitor",
          organization: "Tech Hack 2024",
          achievement: "1st Place Winner",
          date: "March 2024",
          description: "Built a real-time health monitoring system using IoT and AI",
          skills: ["IoT", "AI", "Python"],
          icon: "FaTrophy"
        },
        {
          id: 2,
          type: "internship",
          title: "Embedded Systems Intern",
          organization: "TechCorp Solutions",
          duration: "Summer 2024",
          description: "Developed IoT solutions and embedded firmware",
          skills: ["C++", "Arduino", "IoT Protocols"],
          icon: "FaBriefcase"
        },
        {
          id: 3,
          type: "course",
          title: "Advanced VLSI Design",
          organization: "Coursera",
          date: "Completed Jan 2024",
          description: "Mastered digital circuit design and verification",
          skills: ["Verilog", "Vivado", "FPGA Programming"],
          icon: "FaCertificate"
        }
      ];
      setAchievements(defaultAchievements);
    }
  };

  const saveHomeContent = () => {
    localStorage.setItem('portfolioHomeContent', JSON.stringify(homeContent));
    setIsEditing(false);
  };

  // NEW: Save achievements to localStorage
  const saveAchievements = () => {
    localStorage.setItem('portfolioAchievements', JSON.stringify(achievements));
    setIsEditingAchievement(false);
  };

  const updateHeroField = (field, value) => {
    setHomeContent(prev => ({
      ...prev,
      hero: { ...prev.hero, [field]: value }
    }));
  };

  const updateRole = (index, field, value) => {
    setHomeContent(prev => ({
      ...prev,
      roles: prev.roles.map((role, i) => 
        i === index ? { ...role, [field]: value } : role
      )
    }));
  };

  // NEW: Achievement management functions
  const addAchievement = () => {
    const newAchievement = {
      ...currentAchievement,
      id: Date.now(),
      skills: currentAchievement.skills.split(',').map(skill => skill.trim())
    };
    setAchievements([...achievements, newAchievement]);
    setCurrentAchievement({
      type: 'hackathon',
      title: '',
      organization: '',
      achievement: '',
      duration: '',
      date: '',
      description: '',
      skills: '',
      icon: 'FaTrophy'
    });
    saveAchievements();
  };

  const editAchievement = (achievement) => {
    setCurrentAchievement({
      ...achievement,
      skills: Array.isArray(achievement.skills) ? achievement.skills.join(', ') : achievement.skills
    });
    setIsEditingAchievement(true);
  };

  const updateAchievement = () => {
    const updatedAchievements = achievements.map(ach =>
      ach.id === currentAchievement.id ? {
        ...currentAchievement,
        skills: currentAchievement.skills.split(',').map(skill => skill.trim())
      } : ach
    );
    setAchievements(updatedAchievements);
    setCurrentAchievement({
      type: 'hackathon',
      title: '',
      organization: '',
      achievement: '',
      duration: '',
      date: '',
      description: '',
      skills: '',
      icon: 'FaTrophy'
    });
    setIsEditingAchievement(false);
    saveAchievements();
  };

  const deleteAchievement = (id) => {
    if (window.confirm('Are you sure you want to delete this achievement?')) {
      const updatedAchievements = achievements.filter(ach => ach.id !== id);
      setAchievements(updatedAchievements);
      saveAchievements();
    }
  };

  const cancelAchievementEdit = () => {
    setCurrentAchievement({
      type: 'hackathon',
      title: '',
      organization: '',
      achievement: '',
      duration: '',
      date: '',
      description: '',
      skills: '',
      icon: 'FaTrophy'
    });
    setIsEditingAchievement(false);
  };

  const getAchievementIcon = (iconName) => {
    const iconMap = {
      'FaTrophy': FaTrophy,
      'FaBriefcase': FaBriefcase,
      'FaGraduationCap': FaGraduationCap,
      'FaCertificate': FaCertificate,
      'FaAward': FaAward,
      'FaLightbulb': FaLightbulb
    };
    const IconComponent = iconMap[iconName] || FaTrophy;
    return <IconComponent />;
  };

  const getIconComponent = (iconName) => {
    const iconMap = {
      'FaMicrochip': FaMicrochip,
      'FaCogs': FaCogs,
      'FaRobot': FaRobot,
      'FaCode': FaCode,
      'FaDesktop': FaDesktop,
      'FaServer': FaServer,
      'FaDatabase': FaDatabase,
      'FaBolt': FaBolt,
      'FaTrophy': FaTrophy,
      'FaBriefcase': FaBriefcase,
      'FaGraduationCap': FaGraduationCap,
      'FaCertificate': FaCertificate,
      'FaAward': FaAward,
      'FaLightbulb': FaLightbulb
    };
    return iconMap[iconName] || FaCode;
  };

  const getAchievementColor = (type) => {
    switch (type) {
      case 'hackathon': return '#f59e0b';
      case 'internship': return '#3b82f6';
      case 'course': return '#10b981';
      case 'certification': return '#8b5cf6';
      default: return '#6b7280';
    }
  };

  const roleIconOptions = [
    { value: 'FaMicrochip', label: 'Microchip (Embedded)' },
    { value: 'FaCogs', label: 'Gears (VLSI)' },
    { value: 'FaRobot', label: 'Robot (AI)' },
    { value: 'FaCode', label: 'Code (Full-Stack)' },
    { value: 'FaDesktop', label: 'Desktop (Frontend)' },
    { value: 'FaServer', label: 'Server (Backend)' },
    { value: 'FaDatabase', label: 'Database (Data)' },
    { value: 'FaBolt', label: 'Bolt (Fast)' }
  ];

  const achievementIconOptions = [
    { value: 'FaTrophy', label: 'Trophy (Award)' },
    { value: 'FaBriefcase', label: 'Briefcase (Work)' },
    { value: 'FaGraduationCap', label: 'Graduation Cap (Education)' },
    { value: 'FaCertificate', label: 'Certificate (Certification)' },
    { value: 'FaAward', label: 'Award (Achievement)' },
    { value: 'FaLightbulb', label: 'Lightbulb (Idea)' }
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={styles.sectionTitle}>
          <FaHome /> Home Page Management
        </h1>
        {!isEditing ? (
          <button 
            style={{...styles.button, ...styles.buttonPrimary}}
            onClick={() => setIsEditing(true)}
          >
            <FaEdit /> Edit Home Content
          </button>
        ) : (
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button 
              style={{...styles.button, ...styles.buttonSuccess}}
              onClick={saveHomeContent}
            >
              <FaSave /> Save Changes
            </button>
            <button 
              style={{...styles.button, ...styles.buttonSecondary}}
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* Hero Section Management */}
      <div style={styles.card}>
        <h3 style={{ marginBottom: '1.5rem', color: theme.text }}>Hero Section</h3>
        
        <div style={styles.grid}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Your Name</label>
            {isEditing ? (
              <input
                style={styles.input}
                value={homeContent.hero.title}
                onChange={(e) => updateHeroField('title', e.target.value)}
                placeholder="Enter your name"
              />
            ) : (
              <div style={{ 
                padding: '0.75rem', 
                backgroundColor: theme.surfaceLight, 
                borderRadius: '6px',
                color: theme.text,
                fontWeight: '600'
              }}>
                {homeContent.hero.title}
              </div>
            )}
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Tagline</label>
            {isEditing ? (
              <input
                style={styles.input}
                value={homeContent.hero.tagline}
                onChange={(e) => updateHeroField('tagline', e.target.value)}
                placeholder="Enter your professional tagline"
              />
            ) : (
              <div style={{ 
                padding: '0.75rem', 
                backgroundColor: theme.surfaceLight, 
                borderRadius: '6px',
                color: theme.text
              }}>
                {homeContent.hero.tagline}
              </div>
            )}
          </div>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Description</label>
          {isEditing ? (
            <textarea
              style={styles.textarea}
              value={homeContent.hero.description}
              onChange={(e) => updateHeroField('description', e.target.value)}
              placeholder="Enter a brief description about yourself"
              rows="3"
            />
          ) : (
            <div style={{ 
              padding: '0.75rem', 
              backgroundColor: theme.surfaceLight, 
              borderRadius: '6px',
              color: theme.text,
              lineHeight: '1.6'
            }}>
              {homeContent.hero.description}
            </div>
          )}
        </div>
      </div>

      {/* Roles Section Management */}
      <div style={styles.card}>
        <h3 style={{ marginBottom: '1.5rem', color: theme.text }}>Roles & Services</h3>
        
        <div style={styles.grid}>
          {homeContent.roles.map((role, index) => {
            const IconComponent = getIconComponent(role.icon);
            return (
              <div key={index} style={{
                padding: '1.5rem',
                backgroundColor: theme.surfaceLight,
                borderRadius: '12px',
                border: `1px solid ${theme.border}`
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    backgroundColor: theme.accent + '20',
                    color: theme.accent,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem'
                  }}>
                    <IconComponent />
                  </div>
                  {isEditing ? (
                    <input
                      style={{...styles.input, fontSize: '1.1rem', fontWeight: '600'}}
                      value={role.title}
                      onChange={(e) => updateRole(index, 'title', e.target.value)}
                      placeholder="Role title"
                    />
                  ) : (
                    <div style={{ fontWeight: '600', color: theme.text, fontSize: '1.1rem' }}>
                      {role.title}
                    </div>
                  )}
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Description</label>
                  {isEditing ? (
                    <textarea
                      style={styles.textarea}
                      value={role.desc}
                      onChange={(e) => updateRole(index, 'desc', e.target.value)}
                      placeholder="Describe this role or service"
                      rows="3"
                    />
                  ) : (
                    <div style={{ 
                      color: theme.text,
                      lineHeight: '1.6',
                      fontSize: '0.95rem'
                    }}>
                      {role.desc}
                    </div>
                  )}
                </div>

                {isEditing && (
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Icon</label>
                    <select
                      style={styles.select}
                      value={role.icon}
                      onChange={(e) => updateRole(index, 'icon', e.target.value)}
                    >
                      {roleIconOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* NEW: Achievements Management Section */}
      <div style={styles.card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h3 style={{ color: theme.text }}>Achievements & Experience</h3>
          <button 
            style={{...styles.button, ...styles.buttonPrimary}}
            onClick={() => setIsEditingAchievement(true)}
          >
            <FaPlus /> Add Achievement
          </button>
        </div>

        {/* Achievement Form */}
        {isEditingAchievement && (
          <div style={{
            padding: '1.5rem',
            backgroundColor: theme.surfaceLight,
            borderRadius: '12px',
            border: `1px solid ${theme.border}`,
            marginBottom: '1.5rem'
          }}>
            <h4 style={{ marginBottom: '1rem', color: theme.text }}>
              {currentAchievement.id ? 'Edit Achievement' : 'Add New Achievement'}
            </h4>
            
            <div style={styles.grid}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Type</label>
                <select
                  style={styles.select}
                  value={currentAchievement.type}
                  onChange={(e) => setCurrentAchievement({...currentAchievement, type: e.target.value})}
                >
                  <option value="hackathon">Hackathon</option>
                  <option value="internship">Internship</option>
                  <option value="course">Course</option>
                  <option value="certification">Certification</option>
                </select>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Icon</label>
                <select
                  style={styles.select}
                  value={currentAchievement.icon}
                  onChange={(e) => setCurrentAchievement({...currentAchievement, icon: e.target.value})}
                >
                  {achievementIconOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Title *</label>
              <input
                style={styles.input}
                value={currentAchievement.title}
                onChange={(e) => setCurrentAchievement({...currentAchievement, title: e.target.value})}
                placeholder="e.g., AI Health Monitor, Embedded Systems Intern"
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Organization *</label>
              <input
                style={styles.input}
                value={currentAchievement.organization}
                onChange={(e) => setCurrentAchievement({...currentAchievement, organization: e.target.value})}
                placeholder="e.g., Tech Hack 2024, TechCorp Solutions"
              />
            </div>

            <div style={styles.grid}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Date</label>
                <input
                  style={styles.input}
                  value={currentAchievement.date}
                  onChange={(e) => setCurrentAchievement({...currentAchievement, date: e.target.value})}
                  placeholder="e.g., March 2024, Completed Jan 2024"
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Duration</label>
                <input
                  style={styles.input}
                  value={currentAchievement.duration}
                  onChange={(e) => setCurrentAchievement({...currentAchievement, duration: e.target.value})}
                  placeholder="e.g., Summer 2024, 3 months"
                />
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Achievement/Award</label>
              <input
                style={styles.input}
                value={currentAchievement.achievement}
                onChange={(e) => setCurrentAchievement({...currentAchievement, achievement: e.target.value})}
                placeholder="e.g., 1st Place Winner, Best Project"
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Description *</label>
              <textarea
                style={styles.textarea}
                value={currentAchievement.description}
                onChange={(e) => setCurrentAchievement({...currentAchievement, description: e.target.value})}
                placeholder="Brief description of the achievement..."
                rows="3"
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Skills (comma separated)</label>
              <input
                style={styles.input}
                value={currentAchievement.skills}
                onChange={(e) => setCurrentAchievement({...currentAchievement, skills: e.target.value})}
                placeholder="e.g., IoT, AI, Python, C++"
              />
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <button 
                style={{...styles.button, ...styles.buttonSuccess}}
                onClick={currentAchievement.id ? updateAchievement : addAchievement}
                disabled={!currentAchievement.title || !currentAchievement.organization || !currentAchievement.description}
              >
                <FaSave /> {currentAchievement.id ? 'Update' : 'Add'} Achievement
              </button>
              <button 
                style={{...styles.button, ...styles.buttonSecondary}}
                onClick={cancelAchievementEdit}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Achievements List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {achievements.length === 0 ? (
            <div style={{ 
              textAlign: 'center', 
              padding: '2rem', 
              color: theme.textSecondary,
              border: `1px dashed ${theme.border}`,
              borderRadius: '8px'
            }}>
              <FaTrophy style={{ fontSize: '2rem', marginBottom: '1rem', opacity: 0.5 }} />
              <div>No achievements added yet</div>
            </div>
          ) : (
            achievements.map((achievement) => {
              const AchievementIcon = getIconComponent(achievement.icon);
              return (
                <div key={achievement.id} style={{
                  padding: '1.5rem',
                  backgroundColor: theme.surfaceLight,
                  borderRadius: '12px',
                  border: `1px solid ${theme.border}`,
                  borderLeft: `4px solid ${getAchievementColor(achievement.type)}`
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '12px',
                        backgroundColor: getAchievementColor(achievement.type) + '20',
                        color: getAchievementColor(achievement.type),
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.5rem'
                      }}>
                        <AchievementIcon />
                      </div>
                      <div>
                        <div style={{ fontWeight: '600', fontSize: '1.1rem', color: theme.text }}>
                          {achievement.title}
                        </div>
                        <div style={{ color: getAchievementColor(achievement.type), fontWeight: '500' }}>
                          {achievement.organization}
                        </div>
                      </div>
                    </div>
                    
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button
                        onClick={() => editAchievement(achievement)}
                        style={{
                          ...styles.button,
                          ...styles.buttonPrimary,
                          padding: '0.5rem 0.75rem',
                          fontSize: '0.8rem'
                        }}
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => deleteAchievement(achievement.id)}
                        style={{
                          ...styles.button,
                          ...styles.buttonError,
                          padding: '0.5rem 0.75rem',
                          fontSize: '0.8rem'
                        }}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>

                  <div style={{ color: theme.text, lineHeight: '1.6', marginBottom: '1rem' }}>
                    {achievement.description}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                    <div style={{ display: 'flex', gap: '1rem', fontSize: '0.9rem', color: theme.textSecondary }}>
                      {achievement.date && (
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                          <FaCalendarAlt /> {achievement.date}
                        </span>
                      )}
                      {achievement.duration && (
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                          <FaClock /> {achievement.duration}
                        </span>
                      )}
                      {achievement.achievement && (
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                          <FaAward /> {achievement.achievement}
                        </span>
                      )}
                    </div>

                    {achievement.skills && achievement.skills.length > 0 && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {achievement.skills.slice(0, 3).map((skill, index) => (
                          <span key={index} style={{
                            padding: '0.25rem 0.75rem',
                            backgroundColor: theme.surface,
                            color: theme.textSecondary,
                            borderRadius: '12px',
                            fontSize: '0.8rem'
                          }}>
                            {skill}
                          </span>
                        ))}
                        {achievement.skills.length > 3 && (
                          <span style={{
                            padding: '0.25rem 0.75rem',
                            backgroundColor: theme.surface,
                            color: theme.textSecondary,
                            borderRadius: '12px',
                            fontSize: '0.8rem'
                          }}>
                            +{achievement.skills.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Preview Section */}
      {!isEditing && (
        <div style={styles.card}>
          <h3 style={{ marginBottom: '1.5rem', color: theme.text }}>Live Preview</h3>
          <div style={{
            padding: '2rem',
            backgroundColor: theme.surfaceLight,
            borderRadius: '12px',
            border: `1px solid ${theme.border}`
          }}>
            {/* Hero Preview */}
            <div style={{ textAlign: 'center', marginBottom: '3rem', padding: '2rem 0' }}>
              <div style={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                backgroundColor: theme.accent,
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem',
                fontWeight: 'bold',
                margin: '0 auto 1.5rem'
              }}>
                <FaUser />
              </div>
              <h1 style={{ 
                fontSize: '2.5rem', 
                fontWeight: 'bold', 
                marginBottom: '0.5rem',
                color: theme.text 
              }}>
                {homeContent.hero.title}
              </h1>
              <p style={{ 
                fontSize: '1.2rem', 
                color: theme.textSecondary,
                marginBottom: '1rem'
              }}>
                {homeContent.hero.tagline}
              </p>
              <p style={{ 
                color: theme.text,
                lineHeight: '1.6',
                maxWidth: '600px',
                margin: '0 auto'
              }}>
                {homeContent.hero.description}
              </p>
            </div>

            {/* Roles Preview */}
            <div>
              <h2 style={{ 
                textAlign: 'center', 
                marginBottom: '2rem',
                color: theme.text
              }}>
                What I Do
              </h2>
              <div style={styles.grid}>
                {homeContent.roles.map((role, index) => {
                  const IconComponent = getIconComponent(role.icon);
                  return (
                    <div key={index} style={{
                      padding: '1.5rem',
                      backgroundColor: theme.surface,
                      borderRadius: '12px',
                      textAlign: 'center',
                      border: `1px solid ${theme.border}`
                    }}>
                      <div style={{
                        fontSize: '2.5rem',
                        marginBottom: '1rem',
                        color: theme.accent
                      }}>
                        <IconComponent />
                      </div>
                      <h3 style={{ 
                        marginBottom: '1rem',
                        color: theme.text,
                        fontSize: '1.2rem'
                      }}>
                        {role.title}
                      </h3>
                      <p style={{ 
                        color: theme.textSecondary,
                        lineHeight: '1.6',
                        fontSize: '0.95rem'
                      }}>
                        {role.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* NEW: Achievements Preview */}
            <div style={{ marginTop: '3rem' }}>
              <h2 style={{ 
                textAlign: 'center', 
                marginBottom: '2rem',
                color: theme.text
              }}>
                Achievements & Experience
              </h2>
              <div style={{ 
                textAlign: 'center', 
                padding: '2rem',
                backgroundColor: theme.surface,
                borderRadius: '12px',
                border: `1px solid ${theme.border}`
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem', color: theme.accent }}>
                  <FaTrophy />
                </div>
                <p style={{ color: theme.textSecondary, marginBottom: '1rem' }}>
                  {achievements.length} achievements configured
                </p>
                <p style={{ color: theme.textSecondary, fontSize: '0.9rem' }}>
                  These will appear as a rotating carousel on the homepage
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Instructions */}
      <div style={styles.card}>
        <h3 style={{ marginBottom: '1rem', color: theme.text }}>Instructions</h3>
        <div style={{ color: theme.textSecondary, lineHeight: '1.6' }}>
          <ul style={{ paddingLeft: '1.5rem', margin: 0 }}>
            <li>Update your hero section content that appears at the top of your portfolio</li>
            <li>Manage the roles/services sections that showcase your expertise</li>
            <li>Add achievements, internships, courses, and hackathon experiences</li>
            <li>Use icons for role and achievement icons to make them visually appealing</li>
            <li>Changes are saved automatically when you click "Save Changes"</li>
            <li>Preview your changes before saving to ensure they look good</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HomeManagement;