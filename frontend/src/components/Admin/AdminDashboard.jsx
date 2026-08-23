import React, { useState, useEffect } from 'react';
import { 
  FaHome, FaProjectDiagram, FaCode, FaGraduationCap, 
  FaFilePdf, FaComments, FaEnvelope, 
  FaChartBar, FaCog, FaSignOutAlt, FaUserCheck 
} from 'react-icons/fa';

// Import management views
import DashboardView from './components/DashboardView';
import HomeManagement from './components/HomeManagement';
import ProjectsManagement from './components/ProjectsManagement';
import SkillsManagement from './components/SkillsManagement';
import EducationManagement from './components/EducationManagement';
import ResumeMonitoring from './components/ResumeMonitoring';
import FeedbackManagement from './components/FeedbackManagement';
import ContactManagement from './components/ContactManagement';
import SettingsManagement from './components/SettingsManagement';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('adminDarkMode');
    return saved ? JSON.parse(saved) : true;
  });

  const [stats, setStats] = useState({
    totalProjects: 0,
    totalSkills: 0,
    totalFeedback: 0,
    totalMessages: 0,
    resumeViews: 0,
    resumeDownloads: 0
  });

  useEffect(() => {
    localStorage.setItem('adminDarkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = () => {
    const savedProjects = localStorage.getItem('portfolioProjects');
    const projects = savedProjects ? JSON.parse(savedProjects) : [];
    
    const savedSkills = localStorage.getItem('portfolioSkills');
    const skills = savedSkills ? JSON.parse(savedSkills) : [];
    
    const resumeStats = JSON.parse(localStorage.getItem('resumeStatistics') || '{}');
    
    const chatMessages = localStorage.getItem('chatMessages');
    const messages = chatMessages ? JSON.parse(chatMessages) : [];

    setStats({
      totalProjects: projects.length,
      totalSkills: skills.length,
      totalFeedback: 0,
      totalMessages: messages.length,
      resumeViews: resumeStats.views || 0,
      resumeDownloads: resumeStats.downloads || 0
    });
  };

  const theme = {
    dark: {
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      surface: 'rgba(30, 41, 59, 0.75)',
      surfaceLight: 'rgba(51, 65, 85, 0.6)',
      text: '#f8fafc',
      textSecondary: '#94a3b8',
      accent: '#3b82f6',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      border: 'rgba(255, 255, 255, 0.08)'
    },
    light: {
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      surface: 'rgba(255, 255, 255, 0.85)',
      surfaceLight: 'rgba(241, 245, 249, 0.9)',
      text: '#1e293b',
      textSecondary: '#64748b',
      accent: '#2563eb',
      success: '#059669',
      warning: '#d97706',
      error: '#dc2626',
      border: 'rgba(0, 0, 0, 0.08)'
    }
  }[darkMode ? 'dark' : 'light'];

  const styles = {
    container: {
      minHeight: '100vh',
      background: theme.background,
      color: theme.text,
      fontFamily: "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      display: 'flex'
    },
    sidebar: {
      width: '280px',
      backgroundColor: theme.surface,
      backdropFilter: 'blur(16px)',
      padding: '2rem 1.2rem',
      borderRight: `1px solid ${theme.border}`,
      display: 'flex',
      flexDirection: 'column',
      position: 'fixed',
      height: '100vh',
      overflowY: 'auto',
      zIndex: 50
    },
    main: {
      flex: 1,
      padding: '2.5rem',
      marginLeft: '280px',
      minHeight: '100vh'
    },
    logo: {
      fontSize: '1.4rem',
      fontWeight: '800',
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      marginBottom: '2.5rem',
      background: 'linear-gradient(90deg, #60a5fa, #34d399)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent'
    },
    navItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.85rem',
      padding: '0.85rem 1.2rem',
      borderRadius: '14px',
      cursor: 'pointer',
      marginBottom: '0.5rem',
      transition: 'all 0.25 ease',
      backgroundColor: 'transparent',
      color: theme.textSecondary,
      border: 'none',
      width: '100%',
      textAlign: 'left',
      fontSize: '0.95rem',
      fontWeight: '600'
    },
    navItemActive: {
      backgroundColor: theme.accent,
      color: '#ffffff',
      boxShadow: '0 8px 20px rgba(59, 130, 246, 0.35)'
    },
    userSection: {
      paddingTop: '1.5rem',
      borderTop: `1px solid ${theme.border}`,
      marginTop: 'auto'
    },
    userInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.85rem',
      marginBottom: '1.2rem'
    },
    userAvatar: {
      width: '42px',
      height: '42px',
      borderRadius: '50%',
      background: 'linear-gradient(135deg, #3b82f6, #10b981)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: '1.1rem',
      boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
    },
    button: {
      padding: '0.8rem 1rem',
      borderRadius: '12px',
      border: 'none',
      cursor: 'pointer',
      fontSize: '0.9rem',
      fontWeight: '600',
      transition: 'all 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '0.6rem',
      width: '100%',
      justifyContent: 'center'
    },
    buttonSecondary: {
      backgroundColor: theme.surfaceLight,
      color: theme.text,
      border: `1px solid ${theme.border}`
    }
  };

  const navigation = [
    { id: 'dashboard', label: 'Dashboard', icon: <FaChartBar /> },
    { id: 'home', label: 'Home Page', icon: <FaHome /> },
    { id: 'projects', label: 'Projects', icon: <FaProjectDiagram /> },
    { id: 'skills', label: 'Skills', icon: <FaCode /> },
    { id: 'education', label: 'Education', icon: <FaGraduationCap /> },
    { id: 'resume', label: 'Resume', icon: <FaFilePdf /> },
    { id: 'feedback', label: 'Feedback', icon: <FaComments /> },
    { id: 'contact', label: 'Contact', icon: <FaEnvelope /> },
    { id: 'settings', label: 'Settings', icon: <FaCog /> }
  ];

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    sessionStorage.removeItem('authToken');
    window.location.href = '/login';
  };

  const renderContent = () => {
    const components = {
      dashboard: <DashboardView styles={getContentStyles()} theme={theme} stats={stats} />,
      home: <HomeManagement styles={getContentStyles()} theme={theme} />,
      projects: <ProjectsManagement styles={getContentStyles()} theme={theme} />,
      skills: <SkillsManagement styles={getContentStyles()} theme={theme} />,
      education: <EducationManagement styles={getContentStyles()} theme={theme} />,
      resume: <ResumeMonitoring styles={getContentStyles()} theme={theme} />,
      feedback: <FeedbackManagement styles={getContentStyles()} theme={theme} />,
      contact: <ContactManagement styles={getContentStyles()} theme={theme} />,
      settings: <SettingsManagement styles={getContentStyles()} theme={theme} onThemeChange={() => setDarkMode(!darkMode)} darkMode={darkMode} />
    };
    return components[activeTab] || components.dashboard;
  };

  const getContentStyles = () => {
    return {
      card: {
        backgroundColor: theme.surface,
        backdropFilter: 'blur(16px)',
        borderRadius: '20px',
        padding: '1.8rem',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
        border: `1px solid ${theme.border}`,
        marginBottom: '1.8rem'
      },
      grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
      },
      statCard: {
        display: 'flex',
        alignItems: 'center',
        gap: '1.2rem',
        padding: '1.6rem'
      },
      statIcon: {
        width: '56px',
        height: '56px',
        borderRadius: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.5rem'
      },
      statContent: {
        flex: 1
      },
      statNumber: {
        fontSize: '2.2rem',
        fontWeight: '800',
        marginBottom: '0.2rem'
      },
      statLabel: {
        color: theme.textSecondary,
        fontSize: '0.85rem',
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: '0.05em'
      },
      sectionTitle: {
        fontSize: '1.8rem',
        fontWeight: '800',
        marginBottom: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.6rem'
      },
      table: {
        width: '100%',
        borderCollapse: 'collapse'
      },
      tableHeader: {
        backgroundColor: theme.surfaceLight,
        borderBottom: `1px solid ${theme.border}`
      },
      tableCell: {
        padding: '1rem',
        textAlign: 'left',
        borderBottom: `1px solid ${theme.border}`
      },
      button: {
        padding: '0.7rem 1.2rem',
        borderRadius: '10px',
        border: 'none',
        cursor: 'pointer',
        fontSize: '0.9rem',
        fontWeight: '600',
        transition: 'all 0.2s ease',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
      },
      buttonPrimary: {
        backgroundColor: theme.accent,
        color: '#ffffff'
      },
      buttonSecondary: {
        backgroundColor: theme.surfaceLight,
        color: theme.text
      },
      buttonSuccess: {
        backgroundColor: theme.success,
        color: '#ffffff'
      },
      buttonError: {
        backgroundColor: theme.error,
        color: '#ffffff'
      },
      formGroup: {
        marginBottom: '1.5rem'
      },
      label: {
        display: 'block',
        marginBottom: '0.5rem',
        fontWeight: '600',
        color: theme.text
      },
      input: {
        width: '100%',
        padding: '0.8rem',
        borderRadius: '10px',
        border: `1px solid ${theme.border}`,
        backgroundColor: theme.surfaceLight,
        color: theme.text,
        fontSize: '1rem'
      },
      textarea: {
        width: '100%',
        padding: '0.8rem',
        borderRadius: '10px',
        border: `1px solid ${theme.border}`,
        backgroundColor: theme.surfaceLight,
        color: theme.text,
        fontSize: '1rem',
        minHeight: '120px',
        resize: 'vertical'
      },
      select: {
        width: '100%',
        padding: '0.8rem',
        borderRadius: '10px',
        border: `1px solid ${theme.border}`,
        backgroundColor: theme.surfaceLight,
        color: theme.text,
        fontSize: '1rem'
      },
      badge: {
        padding: '0.3rem 0.8rem',
        borderRadius: '20px',
        fontSize: '0.75rem',
        fontWeight: '600'
      },
      badgeSuccess: {
        backgroundColor: 'rgba(16, 185, 129, 0.2)',
        color: '#34d399'
      },
      badgeWarning: {
        backgroundColor: 'rgba(245, 158, 11, 0.2)',
        color: '#fbbf24'
      },
      badgeError: {
        backgroundColor: 'rgba(239, 68, 68, 0.2)',
        color: '#f87171'
      }
    };
  };

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <div style={styles.logo}>
          <FaCog /> Admin Portal
        </div>
        
        <nav style={{ flex: 1 }}>
          {navigation.map(item => (
            <button
              key={item.id}
              style={{
                ...styles.navItem,
                ...(activeTab === item.id ? styles.navItemActive : {})
              }}
              onClick={() => setActiveTab(item.id)}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        {/* User Section */}
        <div style={styles.userSection}>
          <div style={styles.userInfo}>
            <div style={styles.userAvatar}>
              <FaUserCheck />
            </div>
            <div>
              <div style={{ fontWeight: '700', fontSize: '0.95rem' }}>Mohammad Rehan</div>
              <div style={{ fontSize: '0.75rem', color: theme.textSecondary }}>System Administrator</div>
            </div>
          </div>
          
          <button
            onClick={() => setDarkMode(!darkMode)}
            style={{
              ...styles.button,
              ...styles.buttonSecondary,
              marginBottom: '0.6rem'
            }}
          >
            {darkMode ? '🌞 Light Theme' : '🌙 Dark Theme'}
          </button>
          
          <button
            onClick={handleLogout}
            style={{
              ...styles.button,
              backgroundColor: 'rgba(239, 68, 68, 0.15)',
              color: '#f87171',
              border: '1px solid rgba(239, 68, 68, 0.3)'
            }}
          >
            <FaSignOutAlt /> Sign Out
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div style={styles.main}>
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminDashboard;