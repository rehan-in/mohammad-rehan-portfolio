import React from 'react';
import { FaProjectDiagram, FaCode, FaComments, FaRobot, FaEye, FaDownload, FaPlus, FaEye as FaView, FaSave, FaUsers, FaChartLine } from 'react-icons/fa';

const DashboardView = ({ styles, theme, stats }) => {
  const quickActions = [
    {
      label: 'Add Project',
      icon: <FaPlus />,
      color: theme.accent,
      action: () => window.location.href = '/projects'
    },
    {
      label: 'View Portfolio',
      icon: <FaView />,
      color: theme.success,
      action: () => window.location.href = '/'
    },
    {
      label: 'Backup Data',
      icon: <FaSave />,
      color: theme.warning,
      action: () => {
        const data = {
          projects: localStorage.getItem('portfolioProjects'),
          skills: localStorage.getItem('portfolioSkills'),
          resumeStats: localStorage.getItem('resumeStatistics'),
          chatMessages: localStorage.getItem('chatMessages')
        };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `portfolio-backup-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
      }
    }
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={styles.sectionTitle}>Dashboard Overview</h1>
        <div style={{ color: theme.textSecondary, fontSize: '0.9rem' }}>
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>
      
      {/* Stats Grid */}
      <div style={styles.grid}>
        <div style={{...styles.card, ...styles.statCard}}>
          <div style={{...styles.statIcon, backgroundColor: '#3b82f620', color: '#3b82f6'}}>
            <FaProjectDiagram />
          </div>
          <div style={styles.statContent}>
            <div style={styles.statNumber}>{stats.totalProjects}</div>
            <div style={styles.statLabel}>Total Projects</div>
          </div>
        </div>

        <div style={{...styles.card, ...styles.statCard}}>
          <div style={{...styles.statIcon, backgroundColor: '#10b98120', color: '#10b981'}}>
            <FaCode />
          </div>
          <div style={styles.statContent}>
            <div style={styles.statNumber}>{stats.totalSkills}</div>
            <div style={styles.statLabel}>Skills Listed</div>
          </div>
        </div>

        <div style={{...styles.card, ...styles.statCard}}>
          <div style={{...styles.statIcon, backgroundColor: '#f59e0b20', color: '#f59e0b'}}>
            <FaComments />
          </div>
          <div style={styles.statContent}>
            <div style={styles.statNumber}>{stats.totalFeedback}</div>
            <div style={styles.statLabel}>Feedback Received</div>
          </div>
        </div>

        <div style={{...styles.card, ...styles.statCard}}>
          <div style={{...styles.statIcon, backgroundColor: '#ef444420', color: '#ef4444'}}>
            <FaRobot />
          </div>
          <div style={styles.statContent}>
            <div style={styles.statNumber}>{stats.totalMessages}</div>
            <div style={styles.statLabel}>Chat Messages</div>
          </div>
        </div>

        <div style={{...styles.card, ...styles.statCard}}>
          <div style={{...styles.statIcon, backgroundColor: '#8b5cf620', color: '#8b5cf6'}}>
            <FaEye />
          </div>
          <div style={styles.statContent}>
            <div style={styles.statNumber}>{stats.resumeViews}</div>
            <div style={styles.statLabel}>Resume Views</div>
          </div>
        </div>

        <div style={{...styles.card, ...styles.statCard}}>
          <div style={{...styles.statIcon, backgroundColor: '#06b6d420', color: '#06b6d4'}}>
            <FaDownload />
          </div>
          <div style={styles.statContent}>
            <div style={styles.statNumber}>{stats.resumeDownloads}</div>
            <div style={styles.statLabel}>Resume Downloads</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div style={styles.card}>
        <h2 style={styles.sectionTitle}>Quick Actions</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={action.action}
              style={{
                ...styles.button,
                backgroundColor: action.color,
                color: '#ffffff',
                padding: '1rem',
                flexDirection: 'column',
                gap: '0.5rem',
                textAlign: 'center'
              }}
            >
              <div style={{ fontSize: '1.5rem' }}>{action.icon}</div>
              <div>{action.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Activity & System Status */}
      <div style={styles.grid}>
        <div style={styles.card}>
          <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FaChartLine /> Portfolio Analytics
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem', backgroundColor: theme.surfaceLight, borderRadius: '8px' }}>
              <span>Project Conversion Rate</span>
              <span style={{ fontWeight: 'bold', color: theme.success }}>
                {stats.totalProjects > 0 ? 'Active' : 'No Projects'}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem', backgroundColor: theme.surfaceLight, borderRadius: '8px' }}>
              <span>Resume Engagement</span>
              <span style={{ fontWeight: 'bold', color: stats.resumeViews > 0 ? theme.success : theme.textSecondary }}>
                {stats.resumeViews > 0 ? `${Math.round((stats.resumeDownloads / Math.max(stats.resumeViews, 1)) * 100)}%` : 'No Views'}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem', backgroundColor: theme.surfaceLight, borderRadius: '8px' }}>
              <span>ChatBot Activity</span>
              <span style={{ fontWeight: 'bold', color: stats.totalMessages > 0 ? theme.success : theme.textSecondary }}>
                {stats.totalMessages > 0 ? 'Active' : 'No Activity'}
              </span>
            </div>
          </div>
        </div>
        
        <div style={styles.card}>
          <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FaUsers /> System Status
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[
              { label: 'Data Storage', status: 'Active', color: theme.success },
              { label: 'Analytics', status: 'Active', color: theme.success },
              { label: 'Backup System', status: 'Manual', color: theme.warning },
              { label: 'Security', status: 'Enabled', color: theme.success }
            ].map((item, index) => (
              <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0' }}>
                <span style={{ fontSize: '0.9rem' }}>{item.label}</span>
                <span style={{ 
                  fontSize: '0.8rem', 
                  color: item.color,
                  fontWeight: '600',
                  padding: '0.25rem 0.5rem',
                  backgroundColor: item.color + '20',
                  borderRadius: '12px'
                }}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;