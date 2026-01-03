import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  // 🚫 Redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
    if (token) {
      // navigate('/'); // Redirect to home if already logged in
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      const { token } = res.data;
      if (rememberMe) {
        localStorage.setItem('authToken', token);
      } else {
        sessionStorage.setItem('authToken', token);
      }

      alert('Login successful');
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.msg || 'Login failed');
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
    form: {
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '40px',
      width: '100%',
      maxWidth: '400px',
      boxShadow: '0 15px 35px rgba(0, 0, 0, 0.2)',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease'
    },
    heading: {
      textAlign: 'center',
      marginBottom: '30px',
      color: '#4a5568',
      fontSize: '28px',
      fontWeight: '600'
    },
    input: {
      width: '100%',
      padding: '14px',
      marginBottom: '20px',
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
    checkboxContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '25px'
    },
    checkboxLabel: {
      display: 'flex',
      alignItems: 'center',
      fontSize: '14px',
      color: '#4a5568',
      cursor: 'pointer'
    },
    checkbox: {
      marginRight: '8px',
      cursor: 'pointer'
    },
    forgotPassword: {
      fontSize: '14px',
      color: '#667eea',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      textDecoration: 'none'
    },
    loginButton: {
      width: '100%',
      padding: '14px',
      backgroundColor: '#667eea',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'background-color 0.3s, transform 0.2s',
      marginBottom: '25px'
    },
    signupContainer: {
      textAlign: 'center'
    },
    signupText: {
      fontSize: '14px',
      color: '#718096',
      marginBottom: '10px'
    },
    signupButton: {
      width: '100%',
      padding: '12px',
      backgroundColor: '#edf2f7',
      color: '#4a5568',
      border: 'none',
      borderRadius: '8px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'background-color 0.3s'
    }
  };

  return (
    <div style={styles.container}>
      <form 
        onSubmit={handleLogin}
        style={styles.form}
        onMouseEnter={() => {
          // Add a subtle hover effect to the form
          document.getElementById('login-form').style.transform = 'translateY(-5px)';
          document.getElementById('login-form').style.boxShadow = '0 20px 45px rgba(0, 0, 0, 0.25)';
        }}
        onMouseLeave={() => {
          document.getElementById('login-form').style.transform = 'translateY(0)';
          document.getElementById('login-form').style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.2)';
        }}
        id="login-form"
      >
        <h2 style={styles.heading}>Login</h2>

        <input
          type="email"
          placeholder="Email"
          required
          style={styles.input}
          onFocus={(e) => {
            e.target.style.borderColor = styles.inputFocus.borderColor;
            e.target.style.boxShadow = styles.inputFocus.boxShadow;
          }}
          onBlur={(e) => {
            e.target.style.borderColor = styles.input.border;
            e.target.style.boxShadow = 'none';
          }}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          required
          style={styles.input}
          onFocus={(e) => {
            e.target.style.borderColor = styles.inputFocus.borderColor;
            e.target.style.boxShadow = styles.inputFocus.boxShadow;
          }}
          onBlur={(e) => {
            e.target.style.borderColor = styles.input.border;
            e.target.style.boxShadow = 'none';
          }}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div style={styles.checkboxContainer}>
          <label style={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              style={styles.checkbox}
            />
            Remember me
          </label>
          <button
            type="button"
            onClick={() => navigate('/forgot-password')}
            style={styles.forgotPassword}
          >
            Forgot Password?
          </button>
        </div>

        <button
          type="submit"
          style={styles.loginButton}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = '#5a67d8';
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = '#667eea';
          }}
        >
          Login
        </button>

        <div style={styles.signupContainer}>
          <p style={styles.signupText}>Don't have an account?</p>
          <button
            type="button"
            onClick={() => navigate('/signup')}
            style={styles.signupButton}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#e2e8f0';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = '#edf2f7';
            }}
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;