import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!token || token === 'undefined') {
      setError('Invalid or expired reset token.');
    }
  }, [token]);

  const handleReset = async (e) => {
    e.preventDefault();

    if (!password) {
      setError('Password cannot be empty.');
      return;
    }

    try {
      const res = await axios.post(`http://localhost:5000/api/auth/reset-password/${token}`, { password });
      setMessage(res.data.msg || 'Password reset successful!');
      setError('');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setMessage('');
      setError(err.response?.data?.msg || 'Failed to reset password');
    }
  };

  // CSS styles
  const styles = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      padding: '20px',
      boxSizing: 'border-box'
    },
    card: {
      backgroundColor: 'white',
      borderRadius: '16px',
      padding: '40px',
      width: '100%',
      maxWidth: '450px',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      textAlign: 'center'
    },
    heading: {
      fontSize: '28px',
      fontWeight: '700',
      color: '#4a5568',
      marginBottom: '30px',
      paddingBottom: '15px',
      borderBottom: '2px solid #e2e8f0'
    },
    message: {
      color: '#38a169',
      backgroundColor: '#f0fff4',
      padding: '12px',
      borderRadius: '8px',
      marginBottom: '20px',
      fontSize: '14px',
      border: '1px solid #9ae6b4'
    },
    error: {
      color: '#e53e3e',
      backgroundColor: '#fed7d7',
      padding: '12px',
      borderRadius: '8px',
      marginBottom: '20px',
      fontSize: '14px',
      border: '1px solid #feb2b2'
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px'
    },
    input: {
      padding: '14px',
      border: '1px solid #cbd5e0',
      borderRadius: '8px',
      fontSize: '16px',
      transition: 'border-color 0.3s, box-shadow 0.3s',
      boxSizing: 'border-box'
    },
    inputFocus: {
      outline: 'none',
      borderColor: '#667eea',
      boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.2)'
    },
    submitButton: {
      backgroundColor: '#667eea',
      color: 'white',
      padding: '14px',
      border: 'none',
      borderRadius: '8px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'background-color 0.3s, transform 0.2s'
    },
    successAnimation: {
      display: 'inline-block',
      width: '80px',
      height: '80px',
      marginBottom: '20px'
    }
  };

  return (
    <div style={styles.container}>
      <div 
        style={styles.card}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-5px)';
          e.currentTarget.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.2)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
        }}
      >
        <h2 style={styles.heading}>Reset Password</h2>

        {error && <p style={styles.error}>{error}</p>}
        {message && <p style={styles.message}>{message}</p>}

        {!error && !message && (
          <form onSubmit={handleReset} style={styles.form}>
            <input
              type="password"
              placeholder="Enter new password"
              style={styles.input}
              onFocus={(e) => {
                e.target.style.borderColor = styles.inputFocus.borderColor;
                e.target.style.boxShadow = styles.inputFocus.boxShadow;
              }}
              onBlur={(e) => {
                e.target.style.borderColor = styles.input.border;
                e.target.style.boxShadow = 'none';
              }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              style={styles.submitButton}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#5a67d8';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = '#667eea';
              }}
            >
              Update Password
            </button>
          </form>
        )}
        
        {message && (
          <div style={{marginTop: '20px', fontSize: '14px', color: '#718096'}}>
            Redirecting to login page...
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;