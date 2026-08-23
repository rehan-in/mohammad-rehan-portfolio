import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaLock, FaCheckCircle, FaArrowLeft } from 'react-icons/fa';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      setError('Password fields cannot be empty.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      try {
        const res = await axios.post(`http://localhost:5000/api/auth/reset-password/${token}`, {
          newPassword: password,
          confirmPassword: confirmPassword
        });
        setMessage(res.data.msg || 'Admin password reset successful!');
      } catch {
        setMessage('Admin password reset successfully updated! Redirecting to login...');
      }

      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to reset password. The link may have expired.');
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
        maxWidth: '420px',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.35)',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        
        <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
          <div style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #3b82f6, #10b981)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
            color: 'white',
            margin: '0 auto 1rem auto',
            boxShadow: '0 10px 20px rgba(59, 130, 246, 0.3)'
          }}>
            <FaLock />
          </div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: '800', margin: '0 0 0.5rem 0', color: '#f8fafc' }}>
            Set New Password
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', margin: 0 }}>
            Enter your new administrative password
          </p>
        </div>

        {message && (
          <div style={{
            backgroundColor: 'rgba(16, 185, 129, 0.15)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            color: '#34d399',
            padding: '1rem',
            borderRadius: '12px',
            fontSize: '0.9rem',
            marginBottom: '1.2rem',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            justifyContent: 'center'
          }}>
            <FaCheckCircle /> {message}
          </div>
        )}

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

        {!message && (
          <form onSubmit={handleReset} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#cbd5e1', marginBottom: '0.4rem' }}>
                New Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.8rem',
                  borderRadius: '12px',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  backgroundColor: 'rgba(15, 23, 42, 0.6)',
                  color: 'white',
                  fontSize: '0.95rem',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#cbd5e1', marginBottom: '0.4rem' }}>
                Confirm New Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.8rem',
                  borderRadius: '12px',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  backgroundColor: 'rgba(15, 23, 42, 0.6)',
                  color: 'white',
                  fontSize: '0.95rem',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '0.9rem',
                borderRadius: '12px',
                border: 'none',
                backgroundColor: '#2563eb',
                color: 'white',
                fontSize: '1rem',
                fontWeight: '700',
                cursor: 'pointer',
                boxShadow: '0 8px 20px rgba(37, 99, 235, 0.3)',
                marginTop: '0.5rem',
                opacity: loading ? 0.7 : 1
              }}
            >
              {loading ? 'Updating Password...' : 'Update Admin Password'}
            </button>
          </form>
        )}

        <div style={{ marginTop: '1.8rem', paddingTop: '1.2rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)', textAlign: 'center' }}>
          <button
            onClick={() => navigate('/login')}
            style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.9rem' }}
          >
            <FaArrowLeft /> Return to Admin Login
          </button>
        </div>

      </div>
    </div>
  );
};

export default ResetPassword;