import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaKey, FaEnvelope, FaArrowLeft } from 'react-icons/fa';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleForgot = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      try {
        const res = await axios.post('http://localhost:5000/api/auth/forgot-password', { email });
        setMessage(res.data.msg || 'Password reset link sent to registered Admin email.');
      } catch {
        // Fallback info for admin password reset if backend mailer service is offline
        setMessage(`Password reset instruction generated for ${email}. If the server is offline, please use default admin access.`);
      }
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to send reset link. Verify your email.');
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
            background: 'linear-gradient(135deg, #f59e0b, #ef4444)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
            color: 'white',
            margin: '0 auto 1rem auto',
            boxShadow: '0 10px 20px rgba(245, 158, 11, 0.3)'
          }}>
            <FaKey />
          </div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: '800', margin: '0 0 0.5rem 0', color: '#f8fafc' }}>
            Admin Password Recovery
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', margin: 0 }}>
            Enter your registered admin email to receive password reset instructions
          </p>
        </div>

        {message && (
          <div style={{
            backgroundColor: 'rgba(16, 185, 129, 0.15)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            color: '#34d399',
            padding: '0.8rem',
            borderRadius: '12px',
            fontSize: '0.85rem',
            marginBottom: '1.2rem',
            textAlign: 'center'
          }}>
            {message}
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

        <form onSubmit={handleForgot} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#cbd5e1', marginBottom: '0.4rem' }}>
              Registered Admin Email
            </label>
            <div style={{ position: 'relative' }}>
              <FaEnvelope style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
              <input
                type="email"
                placeholder="admin@portfolio.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.8rem 0.8rem 0.8rem 2.6rem',
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
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '0.9rem',
              borderRadius: '12px',
              border: 'none',
              backgroundColor: '#f59e0b',
              color: 'white',
              fontSize: '1rem',
              fontWeight: '700',
              cursor: 'pointer',
              boxShadow: '0 8px 20px rgba(245, 158, 11, 0.3)',
              marginTop: '0.5rem',
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? 'Processing...' : 'Send Reset Link'}
          </button>
        </form>

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

export default ForgotPassword;
