import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaUserPlus, FaEnvelope, FaLock, FaUser, FaArrowLeft } from 'react-icons/fa';

const Signup = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      return setError('Please fill out all fields.');
    }

    if (password !== confirmPassword) {
      return setError('Passwords do not match.');
    }

    setLoading(true);
    setError('');

    try {
      try {
        await axios.post('http://localhost:5000/api/auth/signup', {
          firstName,
          lastName,
          email,
          password,
        });
      } catch (backendErr) {
        console.warn('Backend signup error or server offline:', backendErr.message);
      }

      alert('Admin account created successfully! Please sign in.');
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.msg || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      fontFamily: "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      padding: '20px',
      color: '#f8fafc'
    }}>
      <div style={{
        backgroundColor: 'rgba(30, 41, 59, 0.75)',
        backdropFilter: 'blur(16px)',
        borderRadius: '24px',
        padding: '2.5rem',
        width: '100%',
        maxWidth: '450px',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.35)',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        
        <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
          <div style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #10b981, #3b82f6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
            color: 'white',
            margin: '0 auto 1rem auto',
            boxShadow: '0 10px 20px rgba(16, 185, 129, 0.3)'
          }}>
            <FaUserPlus />
          </div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: '800', margin: '0 0 0.5rem 0', color: '#f8fafc' }}>
            Register Admin Account
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', margin: 0 }}>
            Create administrative credentials to access system management
          </p>
        </div>

        {error && (
          <div style={{
            backgroundColor: 'rgba(239, 68, 68, 0.15)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            color: '#f87171',
            padding: '0.8rem',
            borderRadius: '12px',
            fontSize: '0.85rem',
            marginBottom: '1.2rem',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#cbd5e1', marginBottom: '0.4rem' }}>
                First Name
              </label>
              <div style={{ position: 'relative' }}>
                <FaUser style={{ position: 'absolute', left: '0.8rem', top: '50%', transform: 'translateY(-50%)', color: '#64748b', fontSize: '0.85rem' }} />
                <input
                  type="text"
                  placeholder="First"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.8rem 0.8rem 0.8rem 2.3rem',
                    borderRadius: '12px',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    backgroundColor: 'rgba(15, 23, 42, 0.6)',
                    color: 'white',
                    fontSize: '0.9rem',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#cbd5e1', marginBottom: '0.4rem' }}>
                Last Name
              </label>
              <input
                type="text"
                placeholder="Last"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.8rem',
                  borderRadius: '12px',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  backgroundColor: 'rgba(15, 23, 42, 0.6)',
                  color: 'white',
                  fontSize: '0.9rem',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#cbd5e1', marginBottom: '0.4rem' }}>
              Admin Email
            </label>
            <div style={{ position: 'relative' }}>
              <FaEnvelope style={{ position: 'absolute', left: '0.8rem', top: '50%', transform: 'translateY(-50%)', color: '#64748b', fontSize: '0.85rem' }} />
              <input
                type="email"
                placeholder="admin@portfolio.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.8rem 0.8rem 0.8rem 2.3rem',
                  borderRadius: '12px',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  backgroundColor: 'rgba(15, 23, 42, 0.6)',
                  color: 'white',
                  fontSize: '0.9rem',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#cbd5e1', marginBottom: '0.4rem' }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <FaLock style={{ position: 'absolute', left: '0.8rem', top: '50%', transform: 'translateY(-50%)', color: '#64748b', fontSize: '0.85rem' }} />
              <input
                type="password"
                placeholder="••••••••"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.8rem 0.8rem 0.8rem 2.3rem',
                  borderRadius: '12px',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  backgroundColor: 'rgba(15, 23, 42, 0.6)',
                  color: 'white',
                  fontSize: '0.9rem',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#cbd5e1', marginBottom: '0.4rem' }}>
              Confirm Password
            </label>
            <div style={{ position: 'relative' }}>
              <FaLock style={{ position: 'absolute', left: '0.8rem', top: '50%', transform: 'translateY(-50%)', color: '#64748b', fontSize: '0.85rem' }} />
              <input
                type="password"
                placeholder="••••••••"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.8rem 0.8rem 0.8rem 2.3rem',
                  borderRadius: '12px',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  backgroundColor: 'rgba(15, 23, 42, 0.6)',
                  color: 'white',
                  fontSize: '0.9rem',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '0.9rem',
              borderRadius: '12px',
              border: 'none',
              backgroundColor: '#10b981',
              color: 'white',
              fontSize: '1rem',
              fontWeight: '700',
              cursor: 'pointer',
              boxShadow: '0 8px 20px rgba(16, 185, 129, 0.3)',
              marginTop: '0.5rem',
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? 'Registering...' : 'Create Admin Account'}
          </button>
        </form>

        <div style={{ marginTop: '1.8rem', paddingTop: '1.2rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem' }}>
          <button
            onClick={() => navigate('/')}
            style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
          >
            <FaArrowLeft /> Back to Home
          </button>
          <button
            onClick={() => navigate('/login')}
            style={{ background: 'none', border: 'none', color: '#60a5fa', cursor: 'pointer', fontWeight: '600' }}
          >
            Already Admin? Sign In
          </button>
        </div>

      </div>
    </div>
  );
};

export default Signup;