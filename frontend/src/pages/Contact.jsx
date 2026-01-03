import React from 'react';
import {
  FaLinkedin,
  FaGithub,
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaEnvelope,
  FaPhone
} from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';

const Contact = () => {
  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1c273a 0%, #0f172a 100%)',
      color: '#ffffff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
      fontFamily: "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    },
    content: {
      width: '100%',
      maxWidth: '900px',
      textAlign: 'center'
    },
    heading: {
      fontSize: '2.8rem',
      fontWeight: '700',
      marginBottom: '15px',
      background: 'linear-gradient(45deg, #4ade80, #3b82f6)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },
    subheading: {
      fontSize: '1.2rem',
      color: '#cbd5e1',
      marginBottom: '40px',
      maxWidth: '600px',
      marginLeft: 'auto',
      marginRight: 'auto',
      lineHeight: '1.6'
    },
    card: {
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(10px)',
      padding: '30px',
      borderRadius: '16px',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
      margin: '0 auto 40px auto',
      maxWidth: '500px',
      border: '1px solid rgba(255, 255, 255, 0.1)'
    },
    cardTitle: {
      fontSize: '1.5rem',
      marginBottom: '25px',
      fontWeight: '600',
      color: '#e2e8f0'
    },
    contactItem: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '15px',
      marginBottom: '20px',
      fontSize: '1.1rem'
    },
    contactIcon: {
      color: '#60a5fa'
    },
    email: {
      color: '#60a5fa',
      textDecoration: 'none',
      fontWeight: '500',
      transition: 'color 0.3s ease'
    },
    socialContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '20px',
      padding: '0 10px'
    },
    socialLink: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '12px',
      padding: '25px 20px',
      borderRadius: '12px',
      textDecoration: 'none',
      color: 'white',
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
    },
    socialIcon: {
      width: '60px',
      height: '60px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)'
    },
    socialText: {
      fontSize: '1.1rem',
      fontWeight: '500'
    }
  };

  // Load contact info from localStorage
  const loadContactInfo = () => {
    const savedInfo = localStorage.getItem('portfolioContactInfo');
    if (savedInfo) {
      return JSON.parse(savedInfo);
    }
    // Default data if nothing saved
    return {
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
    };
  };

  const contactInfo = loadContactInfo();

  const socialPlatforms = [
    {
      key: 'linkedin',
      label: 'LinkedIn',
      icon: <FaLinkedin size={24} />,
      color: '#0A66C2',
      url: contactInfo.socialLinks.linkedin
    },
    {
      key: 'github',
      label: 'GitHub',
      icon: <FaGithub size={24} />,
      color: '#171515',
      url: contactInfo.socialLinks.github
    },
    {
      key: 'leetcode',
      label: 'LeetCode',
      icon: <SiLeetcode size={24} />,
      color: '#FFA116',
      url: contactInfo.socialLinks.leetcode
    },
    {
      key: 'instagram',
      label: 'Instagram',
      icon: <FaInstagram size={24} />,
      color: '#E4405F',
      gradient: 'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)',
      url: contactInfo.socialLinks.instagram
    },
    {
      key: 'facebook',
      label: 'Facebook',
      icon: <FaFacebook size={24} />,
      color: '#1877F2',
      url: contactInfo.socialLinks.facebook
    },
    {
      key: 'twitter',
      label: 'Twitter',
      icon: <FaTwitter size={24} />,
      color: '#000000',
      url: contactInfo.socialLinks.twitter
    }
  ];

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h2 style={styles.heading}>Let's Connect</h2>
        <p style={styles.subheading}>
          I'd love to hear from you! Whether it's about tech, collaboration, or just to say hi — reach out on any platform below:
        </p>

        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Contact Info</h3>
          <div style={styles.contactItem}>
            <FaEnvelope style={styles.contactIcon} />
            <a href={`mailto:${contactInfo.email}`} style={styles.email}>
              {contactInfo.email}
            </a>
          </div>
          <div style={styles.contactItem}>
            <FaPhone style={styles.contactIcon} />
            <span>{contactInfo.phone}</span>
          </div>
        </div>

        <div style={styles.socialContainer}>
          {socialPlatforms.map((platform) => (
            <a 
              key={platform.key}
              href={platform.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              style={styles.socialLink}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-5px)';
                e.target.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.2)';
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
              }}
            >
              <div style={{
                ...styles.socialIcon, 
                backgroundColor: platform.gradient ? 'transparent' : platform.color,
                background: platform.gradient || platform.color
              }}>
                {platform.icon}
              </div>
              <span style={styles.socialText}>{platform.label}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contact;