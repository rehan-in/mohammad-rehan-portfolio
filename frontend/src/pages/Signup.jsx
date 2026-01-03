import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const getPasswordStrength = (password) => {
    if (password.length < 6) return 'Weak';
    if (/[A-Z]/.test(password) && /[0-9]/.test(password) && /[\W]/.test(password))
      return 'Strong';
    return 'Medium';
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      return setError('Please fill out all fields.');
    }

    if (!validateEmail(email)) {
      return setError('Please enter a valid email address.');
    }

    if (password.length < 6) {
      return setError('Password must be at least 6 characters long.');
    }

    if (password !== confirmPassword) {
      return setError('Passwords do not match.');
    }

    try {
      const res = await axios.post('http://localhost:5000/api/auth/signup', {
        firstName,
        lastName,
        email,
        password,
      });

      const { token } = res.data;
      if (token) localStorage.setItem('authToken', token);

      alert('Signup successful!');
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.msg || 'Signup failed. Try again.');
    }
  };

  const strength = getPasswordStrength(password);
  let strengthColor;
  if (strength === 'Weak') {
    strengthColor = '#e53e3e';
  } else if (strength === 'Medium') {
    strengthColor = '#d69e2e';
  } else {
    strengthColor = '#38a169';
  }

  // CSS styles
  const styles = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #48bb78 0%, #2f855a 100%)',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      padding: '20px',
      boxSizing: 'border-box'
    },
    formContainer: {
      backgroundColor: 'white',
      borderRadius: '16px',
      padding: '40px',
      width: '100%',
      maxWidth: '450px',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease'
    },
    header: {
      textAlign: 'center',
      marginBottom: '30px'
    },
    title: {
      fontSize: '32px',
      fontWeight: '700',
      color: '#2f855a',
      marginBottom: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    subtitle: {
      fontSize: '14px',
      color: '#718096',
      marginTop: '8px'
    },
    errorBox: {
      backgroundColor: '#fed7d7',
      color: '#c53030',
      padding: '12px 16px',
      marginBottom: '20px',
      borderRadius: '8px',
      fontSize: '14px',
      textAlign: 'center'
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px'
    },
    inputGroup: {
      display: 'flex',
      flexDirection: 'column'
    },
    label: {
      fontSize: '14px',
      fontWeight: '600',
      color: '#2d3748',
      marginBottom: '8px'
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
      borderColor: '#48bb78',
      boxShadow: '0 0 0 3px rgba(72, 187, 120, 0.2)'
    },
    passwordContainer: {
      position: 'relative'
    },
    showButton: {
      position: 'absolute',
      right: '12px',
      top: '50%',
      transform: 'translateY(-50%)',
      background: 'none',
      border: 'none',
      color: '#4a5568',
      fontSize: '14px',
      cursor: 'pointer'
    },
    strengthText: {
      fontSize: '12px',
      fontWeight: '600',
      marginTop: '4px'
    },
    submitButton: {
      backgroundColor: '#48bb78',
      color: 'white',
      padding: '14px',
      border: 'none',
      borderRadius: '8px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'background-color 0.3s, transform 0.2s',
      marginTop: '10px'
    },
    loginRedirect: {
      textAlign: 'center',
      fontSize: '14px',
      color: '#718096',
      marginTop: '24px'
    },
    loginButton: {
      background: 'none',
      border: 'none',
      color: '#2f855a',
      fontWeight: '600',
      cursor: 'pointer',
      textDecoration: 'underline',
      padding: '0',
      marginLeft: '4px'
    }
  };

  return (
    <div style={styles.container}>
      <div 
        style={styles.formContainer}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-5px)';
          e.currentTarget.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.2)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
        }}
      >
        <div style={styles.header}>
          <h1 style={styles.title}>
            <span style={{marginRight: '10px'}}>🌱</span> Create an Account
          </h1>
          <p style={styles.subtitle}>Fill in the details to get started</p>
        </div>

        {error && (
          <div style={styles.errorBox}>
            {error}
          </div>
        )}

        <form onSubmit={handleSignup} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              style={styles.input}
              onFocus={(e) => {
                e.target.style.borderColor = styles.inputFocus.borderColor;
                e.target.style.boxShadow = styles.inputFocus.boxShadow;
              }}
              onBlur={(e) => {
                e.target.style.borderColor = styles.input.border;
                e.target.style.boxShadow = 'none';
              }}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              style={styles.input}
              onFocus={(e) => {
                e.target.style.borderColor = styles.inputFocus.borderColor;
                e.target.style.boxShadow = styles.inputFocus.boxShadow;
              }}
              onBlur={(e) => {
                e.target.style.borderColor = styles.input.border;
                e.target.style.boxShadow = 'none';
              }}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              onFocus={(e) => {
                e.target.style.borderColor = styles.inputFocus.borderColor;
                e.target.style.boxShadow = styles.inputFocus.boxShadow;
              }}
              onBlur={(e) => {
                e.target.style.borderColor = styles.input.border;
                e.target.style.boxShadow = 'none';
              }}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <div style={styles.passwordContainer}>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.input}
                onFocus={(e) => {
                  e.target.style.borderColor = styles.inputFocus.borderColor;
                  e.target.style.boxShadow = styles.inputFocus.boxShadow;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = styles.input.border;
                  e.target.style.boxShadow = 'none';
                }}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={styles.showButton}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            <p style={{...styles.strengthText, color: strengthColor}}>
              Strength: {strength}
            </p>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Confirm Password</label>
            <div style={styles.passwordContainer}>
              <input
                type={showConfirm ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={styles.input}
                onFocus={(e) => {
                  e.target.style.borderColor = styles.inputFocus.borderColor;
                  e.target.style.boxShadow = styles.inputFocus.boxShadow;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = styles.input.border;
                  e.target.style.boxShadow = 'none';
                }}
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                style={styles.showButton}
              >
                {showConfirm ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          <button
            type="submit"
            style={styles.submitButton}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#38a169';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = '#48bb78';
            }}
          >
            Sign Up
          </button>
        </form>

        <p style={styles.loginRedirect}>
          Already have an account?
          <button
            onClick={() => navigate('/login')}
            style={styles.loginButton}
          >
            Log in
          </button>
        </p>
      </div>
    </div>
  );
};

export default Signup;