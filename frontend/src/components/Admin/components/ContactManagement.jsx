import React, { useState, useEffect } from 'react';
import { FaEnvelope, FaPhone, FaLinkedin, FaGithub, FaInstagram, FaFacebook, FaTwitter, FaSave, FaEdit, FaGlobe } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';

const ContactManagement = ({ styles: parentStyles, theme }) => {
  const [contactInfo, setContactInfo] = useState({
    email: 'mohdrehanansari95@gmail.com',
    phone: '+91 70523 28932',
    socialLinks: {
      linkedin: 'https://www.linkedin.com/in/mohammad-rehan-7b13262ba?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
      github: 'https://github.com/Mohammad-Rehan0403',
      leetcode: 'https://leetcode.com/yourprofile',
      instagram: 'https://www.instagram.com/mohammadrehan04032003?utm_source=qr&igsh=MWszOHdqaTQ4Nmo3aw==',
      facebook: 'https://facebook.com/yourprofile',
      twitter: 'https://x.com/Rehan_0403?t=lXucF1hJPILLJy58icSLew&s=09'
    }
  });
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...contactInfo });

  // Synchronized styles with Contact page
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
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '1.5rem',
      marginBottom: '1.5rem'
    },
    card: {
      background: 'linear-gradient(145deg, #1e293b 0%, #334155 100%)',
      padding: '2rem',
      borderRadius: '16px',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
      border: '1px solid #334155',
      marginBottom: '1.5rem'
    },
    formGroup: {
      marginBottom: '1.5rem'
    },
    label: {
      display: 'block',
      fontWeight: '600',
      marginBottom: '0.75rem',
      fontSize: '1rem',
      color: '#e2e8f0',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    input: {
      width: '100%',
      padding: '0.9rem',
      borderRadius: '10px',
      border: '2px solid #475569',
      backgroundColor: '#334155',
      color: 'white',
      fontSize: '1rem',
      transition: 'all 0.3s ease'
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
    }
  };

  useEffect(() => {
    loadContactInfo();
  }, []);

  const loadContactInfo = () => {
    const savedInfo = localStorage.getItem('portfolioContactInfo');
    if (savedInfo) {
      const parsedInfo = JSON.parse(savedInfo);
      setContactInfo(parsedInfo);
      setFormData(parsedInfo);
    }
  };

  const saveContactInfo = () => {
    localStorage.setItem('portfolioContactInfo', JSON.stringify(formData));
    setContactInfo(formData);
    setIsEditing(false);
  };

  const cancelEdit = () => {
    setFormData(contactInfo);
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSocialLinkChange = (platform, value) => {
    setFormData(prev => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [platform]: value
      }
    }));
  };

  const socialPlatforms = [
    {
      key: 'linkedin',
      label: 'LinkedIn',
      icon: <FaLinkedin />,
      color: '#0A66C2',
      placeholder: 'https://linkedin.com/in/yourprofile'
    },
    {
      key: 'github',
      label: 'GitHub',
      icon: <FaGithub />,
      color: '#171515',
      placeholder: 'https://github.com/yourusername'
    },
    {
      key: 'leetcode',
      label: 'LeetCode',
      icon: <SiLeetcode />,
      color: '#FFA116',
      placeholder: 'https://leetcode.com/yourprofile'
    },
    {
      key: 'instagram',
      label: 'Instagram',
      icon: <FaInstagram />,
      color: '#E4405F',
      placeholder: 'https://instagram.com/yourprofile'
    },
    {
      key: 'facebook',
      label: 'Facebook',
      icon: <FaFacebook />,
      color: '#1877F2',
      placeholder: 'https://facebook.com/yourprofile'
    },
    {
      key: 'twitter',
      label: 'Twitter',
      icon: <FaTwitter />,
      color: '#1DA1F2',
      placeholder: 'https://twitter.com/yourprofile'
    }
  ];

  return (
    <div style={styles.container}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={styles.sectionTitle}>
          <FaEnvelope /> Contact Information
        </h1>
        {!isEditing ? (
          <button 
            style={{...styles.button, ...styles.buttonPrimary}}
            onClick={() => setIsEditing(true)}
            onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
          >
            <FaEdit /> Edit Contact Info
          </button>
        ) : (
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button 
              style={{...styles.button, ...styles.buttonSuccess}}
              onClick={saveContactInfo}
              onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
            >
              <FaSave /> Save Changes
            </button>
            <button 
              style={{...styles.button, ...styles.buttonSecondary}}
              onClick={cancelEdit}
              onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* Basic Contact Information */}
      <div style={styles.card}>
        <h3 style={{ marginBottom: '1.5rem', color: '#e2e8f0', fontSize: '1.3rem' }}>Basic Information</h3>
        
        <div style={styles.grid}>
          <div style={styles.formGroup}>
            <label style={styles.label}>
              <FaEnvelope style={{ color: '#60a5fa' }} />
              Email Address
            </label>
            {isEditing ? (
              <input
                style={styles.input}
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                type="email"
                onFocus={(e) => e.target.style.borderColor = '#facc15'}
                onBlur={(e) => e.target.style.borderColor = '#475569'}
              />
            ) : (
              <div style={{ 
                padding: '0.9rem', 
                backgroundColor: 'rgba(30, 41, 59, 0.7)', 
                borderRadius: '10px',
                color: '#e2e8f0',
                border: '1px solid #475569'
              }}>
                {contactInfo.email}
              </div>
            )}
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>
              <FaPhone style={{ color: '#60a5fa' }} />
              Phone Number
            </label>
            {isEditing ? (
              <input
                style={styles.input}
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                onFocus={(e) => e.target.style.borderColor = '#facc15'}
                onBlur={(e) => e.target.style.borderColor = '#475569'}
              />
            ) : (
              <div style={{ 
                padding: '0.9rem', 
                backgroundColor: 'rgba(30, 41, 59, 0.7)', 
                borderRadius: '10px',
                color: '#e2e8f0',
                border: '1px solid #475569'
              }}>
                {contactInfo.phone}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Social Media Links */}
      <div style={styles.card}>
        <h3 style={{ marginBottom: '1.5rem', color: '#e2e8f0', fontSize: '1.3rem' }}>Social Media Links</h3>
        
        <div style={styles.grid}>
          {socialPlatforms.map(platform => (
            <div key={platform.key} style={styles.formGroup}>
              <label style={styles.label}>
                <span style={{ color: platform.color }}>
                  {platform.icon}
                </span>
                {platform.label}
              </label>
              {isEditing ? (
                <input
                  style={styles.input}
                  value={formData.socialLinks[platform.key] || ''}
                  onChange={(e) => handleSocialLinkChange(platform.key, e.target.value)}
                  placeholder={platform.placeholder}
                  type="url"
                  onFocus={(e) => e.target.style.borderColor = '#facc15'}
                  onBlur={(e) => e.target.style.borderColor = '#475569'}
                />
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ 
                    padding: '0.9rem', 
                    backgroundColor: 'rgba(30, 41, 59, 0.7)', 
                    borderRadius: '10px',
                    color: '#e2e8f0',
                    border: '1px solid #475569',
                    flex: 1,
                    fontSize: '0.9rem',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}>
                    {contactInfo.socialLinks[platform.key] || 'Not set'}
                  </div>
                  {contactInfo.socialLinks[platform.key] && (
                    <a
                      href={contactInfo.socialLinks[platform.key]}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        ...styles.button,
                        ...styles.buttonSecondary,
                        padding: '0.75rem',
                        textDecoration: 'none'
                      }}
                      onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                      onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                    >
                      <FaGlobe />
                    </a>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Preview */}
      {!isEditing && (
        <div style={styles.card}>
          <h3 style={{ marginBottom: '1.5rem', color: '#e2e8f0', fontSize: '1.3rem' }}>Live Preview</h3>
          <div style={{
            padding: '2rem',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '16px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)'
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
              {/* Email */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1.5rem',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  backgroundColor: '#3b82f620',
                  color: '#3b82f6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.2rem'
                }}>
                  <FaEnvelope />
                </div>
                <div>
                  <div style={{ fontWeight: '600', color: '#e2e8f0' }}>Email</div>
                  <div style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>{contactInfo.email}</div>
                </div>
              </div>

              {/* Phone */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1.5rem',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  backgroundColor: '#10b98120',
                  color: '#10b981',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.2rem'
                }}>
                  <FaPhone />
                </div>
                <div>
                  <div style={{ fontWeight: '600', color: '#e2e8f0' }}>Phone</div>
                  <div style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>{contactInfo.phone}</div>
                </div>
              </div>
            </div>

            {/* Social Links Preview */}
            <div style={{ marginTop: '1.5rem' }}>
              <h4 style={{ marginBottom: '1rem', color: '#e2e8f0' }}>Social Links</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                {socialPlatforms.map(platform => {
                  if (!contactInfo.socialLinks[platform.key]) return null;
                  
                  return (
                    <a
                      key={platform.key}
                      href={contactInfo.socialLinks[platform.key]}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '12px',
                        padding: '20px',
                        borderRadius: '12px',
                        textDecoration: 'none',
                        color: 'white',
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.transform = 'translateY(-5px)';
                        e.target.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.2)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = 'none';
                      }}
                    >
                      <div style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        backgroundColor: platform.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '1.2rem'
                      }}>
                        {platform.icon}
                      </div>
                      <span style={{ fontWeight: '500', fontSize: '0.9rem' }}>{platform.label}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Instructions */}
      <div style={styles.card}>
        <h3 style={{ marginBottom: '1rem', color: '#e2e8f0', fontSize: '1.3rem' }}>Instructions</h3>
        <div style={{ color: '#cbd5e1', lineHeight: '1.6' }}>
          <ul style={{ paddingLeft: '1.5rem', margin: 0 }}>
            <li>Update your contact information that appears on the portfolio contact page</li>
            <li>All social media links should be full URLs (starting with https://)</li>
            <li>Changes are saved automatically when you click "Save Changes"</li>
            <li>Empty social media links will not be displayed on your portfolio</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ContactManagement;