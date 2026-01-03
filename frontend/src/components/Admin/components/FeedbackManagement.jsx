import React, { useState, useEffect } from 'react';
import { FaStar, FaUser, FaEnvelope, FaCalendar, FaTrash, FaEye, FaReply, FaThumbsUp, FaThumbsDown, FaSync } from 'react-icons/fa';

const FeedbackManagement = ({ styles: parentStyles, theme }) => {
  const [feedback, setFeedback] = useState([]);
  const [filter, setFilter] = useState('all');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const styles = {
    container: {
      padding: '2rem',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      minHeight: '100vh',
      color: 'white',
      fontFamily: "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    },
    sectionTitle: {
      fontSize: '2.2rem',
      marginBottom: '2rem',
      background: 'linear-gradient(90deg, #facc15, #f59e0b)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      fontWeight: '800',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '1.5rem',
      marginBottom: '2rem'
    },
    card: {
      background: 'linear-gradient(145deg, #1e293b 0%, #334155 100%)',
      padding: '2rem',
      borderRadius: '20px',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
      border: '1px solid #334155',
      marginBottom: '1.5rem'
    },
    statCard: {
      background: 'linear-gradient(145deg, #1e293b 0%, #334155 100%)',
      padding: '1.5rem',
      borderRadius: '15px',
      boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)',
      border: '1px solid #334155'
    },
    statIcon: {
      width: '60px',
      height: '60px',
      borderRadius: '15px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1.5rem',
      marginBottom: '1rem'
    },
    statContent: {
      textAlign: 'center'
    },
    statNumber: {
      fontSize: '2rem',
      fontWeight: 'bold',
      color: '#e2e8f0',
      marginBottom: '0.5rem'
    },
    statLabel: {
      color: '#94a3b8',
      fontSize: '0.9rem'
    },
    label: {
      color: '#e2e8f0',
      fontWeight: '600',
      fontSize: '1rem'
    },
    button: {
      padding: '0.75rem 1.5rem',
      borderRadius: '10px',
      border: 'none',
      cursor: 'pointer',
      fontWeight: '600',
      fontSize: '0.9rem',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    buttonPrimary: {
      background: 'linear-gradient(90deg, #facc15, #f59e0b)',
      color: '#1e293b'
    },
    buttonSecondary: {
      background: '#334155',
      color: '#e2e8f0',
      border: '1px solid #475569'
    },
    buttonSuccess: {
      background: '#10b981',
      color: 'white'
    },
    buttonError: {
      background: '#ef4444',
      color: 'white'
    }
  };

  const loadFeedback = () => {
    setIsRefreshing(true);
    
    try {
      // Try to load from localStorage first
      const savedFeedback = JSON.parse(localStorage.getItem('portfolioFeedback') || '[]');
      
      if (savedFeedback.length > 0) {
        setFeedback(savedFeedback);
      } else {
        // Fallback to sample data if no saved feedback
        const sampleFeedback = [
          {
            id: 1,
            name: 'John Doe',
            email: 'john@example.com',
            rating: 5,
            message: 'Great portfolio! Love the design and projects.',
            timestamp: new Date('2024-01-15').toISOString(),
            status: 'new',
            recommend: 'yes',
            sharedFeedback: 'yes'
          },
          {
            id: 2,
            name: 'Jane Smith',
            email: 'jane@example.com',
            rating: 4,
            message: 'Nice work on the VLSI projects. Very impressive!',
            timestamp: new Date('2024-01-14').toISOString(),
            status: 'read',
            recommend: 'yes',
            sharedFeedback: 'yes'
          }
        ];
        setFeedback(sampleFeedback);
        // Save sample data to localStorage for future use
        localStorage.setItem('portfolioFeedback', JSON.stringify(sampleFeedback));
      }
    } catch (error) {
      console.error('Error loading feedback:', error);
    } finally {
      setTimeout(() => setIsRefreshing(false), 500);
    }
  };

  useEffect(() => {
    loadFeedback();
    
    // Listen for storage changes to sync between tabs
    const handleStorageChange = (e) => {
      if (e.key === 'portfolioFeedback') {
        loadFeedback();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const deleteFeedback = (id) => {
    if (window.confirm('Are you sure you want to delete this feedback?')) {
      const updatedFeedback = feedback.filter(item => item.id !== id);
      setFeedback(updatedFeedback);
      localStorage.setItem('portfolioFeedback', JSON.stringify(updatedFeedback));
    }
  };

  const markAsRead = (id) => {
    const updatedFeedback = feedback.map(item => 
      item.id === id ? { ...item, status: 'read' } : item
    );
    setFeedback(updatedFeedback);
    localStorage.setItem('portfolioFeedback', JSON.stringify(updatedFeedback));
  };

  const clearAllFeedback = () => {
    if (window.confirm('Are you sure you want to delete ALL feedback? This action cannot be undone.')) {
      setFeedback([]);
      localStorage.removeItem('portfolioFeedback');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'new': return '#facc15';
      case 'read': return '#10b981';
      case 'replied': return '#f59e0b';
      default: return '#94a3b8';
    }
  };

  const getRatingStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FaStar 
        key={i} 
        color={i < rating ? '#f59e0b' : '#475569'} 
        style={{ marginRight: '2px' }}
      />
    ));
  };

  const filteredFeedback = feedback.filter(item => {
    if (filter === 'all') return true;
    if (filter === 'new') return item.status === 'new';
    if (filter === 'high') return item.rating >= 4;
    return item.status === filter;
  });

  const stats = {
    total: feedback.length,
    new: feedback.filter(f => f.status === 'new').length,
    averageRating: feedback.length > 0 
      ? (feedback.reduce((sum, f) => sum + f.rating, 0) / feedback.length).toFixed(1)
      : 0,
    highRating: feedback.filter(f => f.rating >= 4).length
  };

  return (
    <div style={styles.container}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={styles.sectionTitle}>
          <FaEnvelope /> Feedback Management
        </h1>
        <button 
          onClick={loadFeedback}
          style={{
            ...styles.button,
            ...styles.buttonSecondary,
            opacity: isRefreshing ? 0.7 : 1
          }}
          disabled={isRefreshing}
        >
          <FaSync style={{ animation: isRefreshing ? 'spin 1s linear infinite' : 'none' }} />
          Refresh
        </button>
      </div>

      {/* Statistics */}
      <div style={styles.grid}>
        <div style={styles.statCard}>
          <div style={{...styles.statIcon, backgroundColor: '#3b82f620', color: '#3b82f6'}}>
            <FaEnvelope />
          </div>
          <div style={styles.statContent}>
            <div style={styles.statNumber}>{stats.total}</div>
            <div style={styles.statLabel}>Total Feedback</div>
          </div>
        </div>

        <div style={styles.statCard}>
          <div style={{...styles.statIcon, backgroundColor: '#f59e0b20', color: '#f59e0b'}}>
            <FaStar />
          </div>
          <div style={styles.statContent}>
            <div style={styles.statNumber}>{stats.averageRating}</div>
            <div style={styles.statLabel}>Average Rating</div>
          </div>
        </div>

        <div style={styles.statCard}>
          <div style={{...styles.statIcon, backgroundColor: '#ef444420', color: '#ef4444'}}>
            <FaThumbsUp />
          </div>
          <div style={styles.statContent}>
            <div style={styles.statNumber}>{stats.highRating}</div>
            <div style={styles.statLabel}>High Ratings (4-5)</div>
          </div>
        </div>

        <div style={styles.statCard}>
          <div style={{...styles.statIcon, backgroundColor: '#8b5cf620', color: '#8b5cf6'}}>
            <FaEye />
          </div>
          <div style={styles.statContent}>
            <div style={styles.statNumber}>{stats.new}</div>
            <div style={styles.statLabel}>New Feedback</div>
          </div>
        </div>
      </div>

      {/* Filters and Actions */}
      <div style={styles.card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <label style={styles.label}>Filter by:</label>
            {[
              { value: 'all', label: 'All Feedback', count: stats.total },
              { value: 'new', label: 'New', count: stats.new },
              { value: 'high', label: 'High Rating', count: stats.highRating },
              { value: 'read', label: 'Read', count: feedback.filter(f => f.status === 'read').length }
            ].map(filterOption => (
              <button
                key={filterOption.value}
                onClick={() => setFilter(filterOption.value)}
                style={{
                  ...styles.button,
                  ...styles.buttonSecondary,
                  ...(filter === filterOption.value ? styles.buttonPrimary : {}),
                  padding: '0.5rem 1rem'
                }}
              >
                {filterOption.label} ({filterOption.count})
              </button>
            ))}
          </div>
          
          <button
            onClick={clearAllFeedback}
            style={{
              ...styles.button,
              ...styles.buttonError,
              padding: '0.5rem 1rem'
            }}
          >
            <FaTrash /> Clear All
          </button>
        </div>
      </div>

      {/* Feedback List */}
      <div style={styles.card}>
        <h3 style={{ marginBottom: '1.5rem', color: '#e2e8f0', fontSize: '1.3rem' }}>
          Feedback Messages ({filteredFeedback.length})
        </h3>

        {filteredFeedback.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '3rem', 
            color: '#94a3b8',
            border: '2px dashed #475569',
            borderRadius: '12px'
          }}>
            <FaEnvelope style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.5 }} />
            <div style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>No feedback messages yet</div>
            <div style={{ fontSize: '0.9rem' }}>Submit feedback through the form to see it here</div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {filteredFeedback.map((item) => (
              <div 
                key={item.id}
                style={{
                  padding: '1.5rem',
                  background: item.status === 'new' ? 'rgba(250, 204, 21, 0.1)' : 'rgba(30, 41, 59, 0.7)',
                  borderRadius: '12px',
                  border: '1px solid #475569',
                  borderLeft: `4px solid ${getStatusColor(item.status)}`
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      background: 'rgba(59, 130, 246, 0.2)',
                      color: '#3b82f6',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.2rem'
                    }}>
                      <FaUser />
                    </div>
                    <div>
                      <div style={{ fontWeight: '600', fontSize: '1.1rem', color: '#e2e8f0' }}>{item.name}</div>
                      <div style={{ fontSize: '0.9rem', color: '#94a3b8' }}>{item.email}</div>
                      <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.25rem' }}>
                        Would recommend: <strong style={{ color: item.recommend === 'yes' ? '#10b981' : '#ef4444' }}>
                          {item.recommend === 'yes' ? 'Yes' : 'No'}
                        </strong>
                      </div>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      {getRatingStars(item.rating)}
                    </div>
                    <div style={{ 
                      padding: '0.25rem 0.75rem',
                      borderRadius: '20px',
                      fontSize: '0.75rem',
                      fontWeight: '500',
                      background: `${getStatusColor(item.status)}20`,
                      color: getStatusColor(item.status),
                      textTransform: 'capitalize'
                    }}>
                      {item.status}
                    </div>
                  </div>
                </div>

                <div style={{ 
                  marginBottom: '1rem',
                  lineHeight: '1.6',
                  color: '#e2e8f0'
                }}>
                  {item.message}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#94a3b8', fontSize: '0.9rem' }}>
                    <FaCalendar />
                    {new Date(item.timestamp).toLocaleString()}
                  </div>
                  
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {item.status === 'new' && (
                      <button
                        onClick={() => markAsRead(item.id)}
                        style={{
                          ...styles.button,
                          ...styles.buttonSuccess,
                          padding: '0.5rem 1rem',
                          fontSize: '0.8rem'
                        }}
                      >
                        <FaEye /> Mark Read
                      </button>
                    )}
                    <button
                      style={{
                        ...styles.button,
                        ...styles.buttonPrimary,
                        padding: '0.5rem 1rem',
                        fontSize: '0.8rem'
                      }}
                    >
                      <FaReply /> Reply
                    </button>
                    <button
                      onClick={() => deleteFeedback(item.id)}
                      style={{
                        ...styles.button,
                        ...styles.buttonError,
                        padding: '0.5rem 1rem',
                        fontSize: '0.8rem'
                      }}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Rating Distribution */}
      {feedback.length > 0 && (
        <div style={styles.card}>
          <h3 style={{ marginBottom: '1rem', color: '#e2e8f0' }}>Rating Distribution</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[5, 4, 3, 2, 1].map(rating => {
              const count = feedback.filter(f => f.rating === rating).length;
              const percentage = feedback.length > 0 ? (count / feedback.length) * 100 : 0;
              
              return (
                <div key={rating} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', minWidth: '100px' }}>
                    {getRatingStars(rating)}
                    <span style={{ fontSize: '0.9rem', color: '#94a3b8' }}>({count})</span>
                  </div>
                  <div style={{ 
                    flex: 1,
                    height: '8px',
                    background: '#334155',
                    borderRadius: '4px',
                    overflow: 'hidden'
                  }}>
                    <div 
                      style={{
                        width: `${percentage}%`,
                        height: '100%',
                        background: rating >= 4 ? '#10b981' : rating >= 3 ? '#f59e0b' : '#ef4444',
                        borderRadius: '4px',
                        transition: 'width 0.3s ease'
                      }}
                    />
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#94a3b8', minWidth: '40px' }}>
                    {percentage.toFixed(1)}%
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedbackManagement;