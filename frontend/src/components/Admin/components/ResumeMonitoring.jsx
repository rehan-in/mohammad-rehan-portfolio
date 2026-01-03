import React, { useState, useEffect } from 'react';
import { FaDownload, FaEye, FaChartBar, FaHistory, FaCalendar, FaPercentage, FaFilePdf, FaTrash } from 'react-icons/fa';

const ResumeMonitoring = ({ styles, theme }) => {
  const [resumeStats, setResumeStats] = useState(null);
  const [timeRange, setTimeRange] = useState('all');

  useEffect(() => {
    loadResumeStats();
  }, []);

  const loadResumeStats = () => {
    const stats = JSON.parse(localStorage.getItem('resumeStatistics') || '{}');
    setResumeStats(stats);
  };

  const getFilteredStats = () => {
    if (!resumeStats) return { views: 0, downloads: 0 };
    
    const now = new Date();
    let filterDate = new Date(0);

    switch (timeRange) {
      case 'today':
        filterDate = new Date(now.setHours(0, 0, 0, 0));
        break;
      case 'week':
        filterDate = new Date(now.setDate(now.getDate() - 7));
        break;
      case 'month':
        filterDate = new Date(now.setMonth(now.getMonth() - 1));
        break;
      default:
        return resumeStats;
    }

    const filteredViewHistory = (resumeStats.viewHistory || []).filter(entry => 
      new Date(entry.timestamp) >= filterDate
    );
    
    const filteredDownloadHistory = (resumeStats.downloadHistory || []).filter(entry => 
      new Date(entry.timestamp) >= filterDate
    );

    return {
      views: filteredViewHistory.length,
      downloads: filteredDownloadHistory.length,
      viewHistory: filteredViewHistory,
      downloadHistory: filteredDownloadHistory
    };
  };

  const calculateConversionRate = (views, downloads) => {
    return views > 0 ? Math.round((downloads / views) * 100) : 0;
  };

  const getDailyStats = () => {
    if (!resumeStats) return [];
    
    const dailyStats = {};
    const allHistory = [
      ...(resumeStats.viewHistory || []).map(entry => ({ ...entry, type: 'view' })),
      ...(resumeStats.downloadHistory || []).map(entry => ({ ...entry, type: 'download' }))
    ];

    allHistory.forEach(entry => {
      const date = new Date(entry.timestamp).toLocaleDateString();
      if (!dailyStats[date]) {
        dailyStats[date] = { views: 0, downloads: 0, date };
      }
      if (entry.type === 'view') {
        dailyStats[date].views++;
      } else {
        dailyStats[date].downloads++;
      }
    });

    return Object.values(dailyStats).reverse().slice(0, 7);
  };

  const resetStatistics = () => {
    if (window.confirm('Are you sure you want to reset all resume statistics? This action cannot be undone.')) {
      localStorage.removeItem('resumeStatistics');
      loadResumeStats();
    }
  };

  if (!resumeStats) {
    return (
      <div style={styles.card}>
        <div style={{ textAlign: 'center', padding: '2rem', color: theme.textSecondary }}>
          <FaFilePdf style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.5 }} />
          <div>No resume statistics available yet.</div>
          <div style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
            Statistics will appear when visitors view or download your resume.
          </div>
        </div>
      </div>
    );
  }

  const filteredStats = getFilteredStats();
  const dailyStats = getDailyStats();
  const conversionRate = calculateConversionRate(filteredStats.views, filteredStats.downloads);
  const totalConversionRate = calculateConversionRate(resumeStats.views || 0, resumeStats.downloads || 0);

  return (
    <div>
      <h1 style={styles.sectionTitle}>
        <FaFilePdf /> Resume Analytics
      </h1>

      {/* Time Range Filter */}
      <div style={{ ...styles.card, marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <label style={styles.label}>Time Range:</label>
            <select 
              style={{ ...styles.select, width: 'auto' }}
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <option value="today">Today</option>
              <option value="week">Last 7 Days</option>
              <option value="month">Last 30 Days</option>
              <option value="all">All Time</option>
            </select>
          </div>
          <button 
            style={{...styles.button, ...styles.buttonError}}
            onClick={resetStatistics}
          >
            <FaTrash /> Reset Stats
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div style={styles.grid}>
        <div style={{...styles.card, ...styles.statCard}}>
          <div style={{...styles.statIcon, backgroundColor: '#3b82f620', color: '#3b82f6'}}>
            <FaEye />
          </div>
          <div style={styles.statContent}>
            <div style={styles.statNumber}>{filteredStats.views}</div>
            <div style={styles.statLabel}>Views ({timeRange})</div>
            <div style={{ fontSize: '0.8rem', color: theme.textSecondary }}>
              Total: {resumeStats.views || 0}
            </div>
          </div>
        </div>

        <div style={{...styles.card, ...styles.statCard}}>
          <div style={{...styles.statIcon, backgroundColor: '#10b98120', color: '#10b981'}}>
            <FaDownload />
          </div>
          <div style={styles.statContent}>
            <div style={styles.statNumber}>{filteredStats.downloads}</div>
            <div style={styles.statLabel}>Downloads ({timeRange})</div>
            <div style={{ fontSize: '0.8rem', color: theme.textSecondary }}>
              Total: {resumeStats.downloads || 0}
            </div>
          </div>
        </div>

        <div style={{...styles.card, ...styles.statCard}}>
          <div style={{...styles.statIcon, backgroundColor: '#f59e0b20', color: '#f59e0b'}}>
            <FaPercentage />
          </div>
          <div style={styles.statContent}>
            <div style={styles.statNumber}>{conversionRate}%</div>
            <div style={styles.statLabel}>Conversion Rate</div>
            <div style={{ fontSize: '0.8rem', color: theme.textSecondary }}>
              Total: {totalConversionRate}%
            </div>
          </div>
        </div>

        <div style={{...styles.card, ...styles.statCard}}>
          <div style={{...styles.statIcon, backgroundColor: '#8b5cf620', color: '#8b5cf6'}}>
            <FaCalendar />
          </div>
          <div style={styles.statContent}>
            <div style={styles.statNumber}>
              {resumeStats.lastViewed ? 
                new Date(resumeStats.lastViewed).toLocaleDateString() : 'Never'
              }
            </div>
            <div style={styles.statLabel}>Last Viewed</div>
            <div style={{ fontSize: '0.8rem', color: theme.textSecondary }}>
              {resumeStats.lastViewed ? 
                new Date(resumeStats.lastViewed).toLocaleTimeString() : ''
              }
            </div>
          </div>
        </div>
      </div>

      {/* Daily Statistics */}
      <div style={{ ...styles.card, marginBottom: '1.5rem' }}>
        <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <FaChartBar /> Last 7 Days Activity
        </h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '500px' }}>
            <thead>
              <tr style={styles.tableHeader}>
                <th style={styles.tableCell}>Date</th>
                <th style={styles.tableCell}>Views</th>
                <th style={styles.tableCell}>Downloads</th>
                <th style={styles.tableCell}>Conversion Rate</th>
                <th style={styles.tableCell}>Trend</th>
              </tr>
            </thead>
            <tbody>
              {dailyStats.map((day, index) => {
                const dayConversion = calculateConversionRate(day.views, day.downloads);
                return (
                  <tr key={index}>
                    <td style={styles.tableCell}>{day.date}</td>
                    <td style={styles.tableCell}>
                      <span style={{ 
                        fontWeight: '600',
                        color: day.views > 0 ? theme.accent : theme.textSecondary
                      }}>
                        {day.views}
                      </span>
                    </td>
                    <td style={styles.tableCell}>
                      <span style={{ 
                        fontWeight: '600',
                        color: day.downloads > 0 ? theme.success : theme.textSecondary
                      }}>
                        {day.downloads}
                      </span>
                    </td>
                    <td style={styles.tableCell}>
                      <span style={{ 
                        fontWeight: '600',
                        color: dayConversion > 0 ? theme.success : theme.textSecondary
                      }}>
                        {dayConversion}%
                      </span>
                    </td>
                    <td style={styles.tableCell}>
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '0.25rem',
                        color: day.views > (dailyStats[index + 1]?.views || 0) ? theme.success : theme.error
                      }}>
                        {day.views > (dailyStats[index + 1]?.views || 0) ? '↗' : '↘'}
                        <span style={{ fontSize: '0.8rem' }}>
                          {index < dailyStats.length - 1 ? 
                            Math.abs(day.views - (dailyStats[index + 1]?.views || 0)) : 0
                          }
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {dailyStats.length === 0 && (
                <tr>
                  <td colSpan="5" style={{...styles.tableCell, textAlign: 'center'}}>
                    No data available for the selected period.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Activity */}
      <div style={styles.grid}>
        <div style={styles.card}>
          <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FaEye /> Recent Views (Last 10)
          </h3>
          <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
            {(resumeStats.viewHistory || []).slice(-10).reverse().map((view, index) => (
              <div key={index} style={{
                padding: '0.75rem',
                borderBottom: `1px solid ${theme.border}`,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                transition: 'background-color 0.2s'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: '#3b82f620',
                    color: '#3b82f6',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.8rem'
                  }}>
                    <FaEye />
                  </div>
                  <span>Resume Viewed</span>
                </div>
                <span style={{ fontSize: '0.8rem', color: theme.textSecondary }}>
                  {new Date(view.timestamp).toLocaleString()}
                </span>
              </div>
            ))}
            {(resumeStats.viewHistory || []).length === 0 && (
              <div style={{ 
                textAlign: 'center', 
                padding: '2rem', 
                color: theme.textSecondary,
                fontStyle: 'italic'
              }}>
                No views recorded yet.
              </div>
            )}
          </div>
        </div>

        <div style={styles.card}>
          <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FaDownload /> Recent Downloads (Last 10)
          </h3>
          <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
            {(resumeStats.downloadHistory || []).slice(-10).reverse().map((download, index) => (
              <div key={index} style={{
                padding: '0.75rem',
                borderBottom: `1px solid ${theme.border}`,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                transition: 'background-color 0.2s'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: '#10b98120',
                    color: '#10b981',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.8rem'
                  }}>
                    <FaDownload />
                  </div>
                  <span>Resume Downloaded</span>
                </div>
                <span style={{ fontSize: '0.8rem', color: theme.textSecondary }}>
                  {new Date(download.timestamp).toLocaleString()}
                </span>
              </div>
            ))}
            {(resumeStats.downloadHistory || []).length === 0 && (
              <div style={{ 
                textAlign: 'center', 
                padding: '2rem', 
                color: theme.textSecondary,
                fontStyle: 'italic'
              }}>
                No downloads recorded yet.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Performance Insights */}
      <div style={styles.card}>
        <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <FaChartBar /> Performance Insights
        </h3>
        <div style={styles.grid}>
          <div style={{
            padding: '1rem',
            backgroundColor: theme.surfaceLight,
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: theme.accent }}>
              {totalConversionRate}%
            </div>
            <div style={{ color: theme.textSecondary, fontSize: '0.9rem' }}>
              Overall Conversion Rate
            </div>
          </div>
          
          <div style={{
            padding: '1rem',
            backgroundColor: theme.surfaceLight,
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: theme.success }}>
              {resumeStats.downloads || 0}
            </div>
            <div style={{ color: theme.textSecondary, fontSize: '0.9rem' }}>
              Total Downloads
            </div>
          </div>
          
          <div style={{
            padding: '1rem',
            backgroundColor: theme.surfaceLight,
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: theme.warning }}>
              {Math.round(((resumeStats.downloads || 0) / Math.max((resumeStats.views || 1), 1)) * 100)}%
            </div>
            <div style={{ color: theme.textSecondary, fontSize: '0.9rem' }}>
              Engagement Rate
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeMonitoring;