import React, { useState, useEffect } from 'react';
import { 
  FaHome, FaProjectDiagram, FaCode, FaGraduationCap, 
  FaFilePdf, FaComments, FaEnvelope, FaRobot, 
  FaChartBar, FaCog, FaSignOutAlt, FaUser 
} from 'react-icons/fa';

// Import monitoring components
import DashboardView from './components/DashboardView';
import HomeManagement from './components/HomeManagement';
import ProjectsManagement from './components/ProjectsManagement';
import SkillsManagement from './components/SkillsManagement';
import EducationManagement from './components/EducationManagement';
import ResumeMonitoring from './components/ResumeMonitoring';
import FeedbackManagement from './components/FeedbackManagement';
import ContactManagement from './components/ContactManagement';
import ChatBotManagement from './components/ChatBotManagement';
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

  // Save theme preference
  useEffect(() => {
    localStorage.setItem('adminDarkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  // Load statistics
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
      background: '#0f172a',
      surface: '#1e293b',
      surfaceLight: '#334155',
      text: '#f8fafc',
      textSecondary: '#cbd5e1',
      accent: '#3b82f6',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      border: '#374151'
    },
    light: {
      background: '#f8fafc',
      surface: '#ffffff',
      surfaceLight: '#f1f5f9',
      text: '#1e293b',
      textSecondary: '#64748b',
      accent: '#2563eb',
      success: '#059669',
      warning: '#d97706',
      error: '#dc2626',
      border: '#e5e7eb'
    }
  }[darkMode ? 'dark' : 'light'];

  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: theme.background,
      color: theme.text,
      fontFamily: "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      display: 'flex'
    },
    sidebar: {
      width: '280px',
      backgroundColor: theme.surface,
      padding: '1.5rem 1rem',
      borderRight: `1px solid ${theme.border}`,
      display: 'flex',
      flexDirection: 'column',
      position: 'fixed',
      height: '100vh',
      overflowY: 'auto'
    },
    main: {
      flex: 1,
      padding: '2rem',
      marginLeft: '280px',
      minHeight: '100vh'
    },
    logo: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      marginBottom: '2rem',
      color: theme.accent
    },
    navItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      padding: '0.75rem 1rem',
      borderRadius: '8px',
      cursor: 'pointer',
      marginBottom: '0.5rem',
      transition: 'all 0.2s ease',
      backgroundColor: 'transparent',
      color: theme.textSecondary,
      border: 'none',
      width: '100%',
      textAlign: 'left',
      fontSize: '0.95rem'
    },
    navItemActive: {
      backgroundColor: theme.accent,
      color: '#ffffff'
    },
    userSection: {
      padding: '1rem 0',
      borderTop: `1px solid ${theme.border}`,
      marginTop: 'auto'
    },
    userInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      marginBottom: '1rem'
    },
    userAvatar: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      backgroundColor: theme.accent,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontWeight: 'bold',
      fontSize: '0.9rem'
    },
    button: {
      padding: '0.75rem 1rem',
      borderRadius: '8px',
      border: 'none',
      cursor: 'pointer',
      fontSize: '0.875rem',
      fontWeight: '500',
      transition: 'all 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      width: '100%',
      justifyContent: 'center'
    },
    buttonSecondary: {
      backgroundColor: theme.surfaceLight,
      color: theme.text
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
    { id: 'chatbot', label: 'ChatBot', icon: <FaRobot /> },
    { id: 'settings', label: 'Settings', icon: <FaCog /> }
  ];

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
      chatbot: <ChatBotManagement styles={getContentStyles()} theme={theme} />,
      settings: <SettingsManagement styles={getContentStyles()} theme={theme} onThemeChange={() => setDarkMode(!darkMode)} darkMode={darkMode} />
    };
    return components[activeTab] || components.dashboard;
  };

  const getContentStyles = () => {
    return {
      card: {
        backgroundColor: theme.surface,
        borderRadius: '12px',
        padding: '1.5rem',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        border: `1px solid ${theme.border}`,
        marginBottom: '1.5rem'
      },
      grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
      },
      statCard: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        padding: '1.5rem'
      },
      statIcon: {
        width: '60px',
        height: '60px',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.5rem'
      },
      statContent: {
        flex: 1
      },
      statNumber: {
        fontSize: '2rem',
        fontWeight: 'bold',
        marginBottom: '0.25rem'
      },
      statLabel: {
        color: theme.textSecondary,
        fontSize: '0.9rem',
        textTransform: 'uppercase',
        letterSpacing: '0.05em'
      },
      sectionTitle: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        marginBottom: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
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
        padding: '0.5rem 1rem',
        borderRadius: '6px',
        border: 'none',
        cursor: 'pointer',
        fontSize: '0.875rem',
        fontWeight: '500',
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
        fontWeight: '500',
        color: theme.text
      },
      input: {
        width: '100%',
        padding: '0.75rem',
        borderRadius: '6px',
        border: `1px solid ${theme.border}`,
        backgroundColor: theme.background,
        color: theme.text,
        fontSize: '1rem'
      },
      textarea: {
        width: '100%',
        padding: '0.75rem',
        borderRadius: '6px',
        border: `1px solid ${theme.border}`,
        backgroundColor: theme.background,
        color: theme.text,
        fontSize: '1rem',
        minHeight: '120px',
        resize: 'vertical'
      },
      select: {
        width: '100%',
        padding: '0.75rem',
        borderRadius: '6px',
        border: `1px solid ${theme.border}`,
        backgroundColor: theme.background,
        color: theme.text,
        fontSize: '1rem'
      },
      badge: {
        padding: '0.25rem 0.75rem',
        borderRadius: '20px',
        fontSize: '0.75rem',
        fontWeight: '500'
      },
      badgeSuccess: {
        backgroundColor: '#dcfce7',
        color: '#166534'
      },
      badgeWarning: {
        backgroundColor: '#fef3c7',
        color: '#92400e'
      },
      badgeError: {
        backgroundColor: '#fee2e2',
        color: '#991b1b'
      }
    };
  };

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <div style={styles.logo}>
          <FaCog /> Admin Panel
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
              <FaUser />
            </div>
            <div>
              <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>Mohammad Rehan</div>
              <div style={{ fontSize: '0.75rem', color: theme.textSecondary }}>Super Admin</div>
            </div>
          </div>
          
          <button
            onClick={() => setDarkMode(!darkMode)}
            style={{
              ...styles.button,
              ...styles.buttonSecondary,
              marginBottom: '0.5rem'
            }}
          >
            {darkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
          </button>
          
          <button
            onClick={() => window.location.href = '/'}
            style={{
              ...styles.button,
              ...styles.buttonSecondary
            }}
          >
            <FaSignOutAlt /> Back to Portfolio
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.main}>
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminDashboard;