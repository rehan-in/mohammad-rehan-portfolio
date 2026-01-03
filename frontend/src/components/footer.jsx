import React from 'react';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.footerContent}>
        <div style={styles.footerSection}>
          <h3 style={styles.footerLogo}>MOHAMMAD REHAN</h3>
          <p style={styles.footerDescription}>
            Embedded Systems & VLSI Engineer with passion for Full-Stack development 
            and AI integration. Creating innovative solutions for real-world problems.
          </p>
        </div>
        
        <div style={styles.footerSection}>
          <h4 style={styles.footerHeading}>NAVIGATION</h4>
          <ul style={styles.footerLinks}>
            <li style={styles.linkItem}><a href="/" style={styles.link}>Home</a></li>
            <li style={styles.linkItem}><a href="/projects" style={styles.link}>Projects</a></li>
            <li style={styles.linkItem}><a href="/skills" style={styles.link}>Skills</a></li>
            <li style={styles.linkItem}><a href="/contact" style={styles.link}>Contact</a></li>
            <li style={styles.linkItem}><a href="/feedback" style={styles.link}>Feedback</a></li>
          </ul>
        </div>
        
        <div style={styles.footerSection}>
          <h4 style={styles.footerHeading}>CONNECT</h4>
          <ul style={styles.footerLinks}>
            <li style={styles.linkItem}><a href="https://www.linkedin.com/in/mohammad-rehan-7b13262ba" style={styles.link}>LinkedIn</a></li>
            <li style={styles.linkItem}><a href="https://github.com/Mohammad-Rehan0403" style={styles.link}>GitHub</a></li>
            <li style={styles.linkItem}><a href="https://leetcode.com" style={styles.link}>LeetCode</a></li>
            <li style={styles.linkItem}><a href="https://www.instagram.com/mohammadrehan04032003" style={styles.link}>Instagram</a></li>
          </ul>
        </div>
        
        <div style={styles.footerSection}>
          <h4 style={styles.footerHeading}>POLICY</h4>
          <ul style={styles.footerLinks}>
            <li style={styles.linkItem}><a href="/terms" style={styles.link}>Terms & Conditions</a></li>
            <li style={styles.linkItem}><a href="/privacy" style={styles.link}>Privacy Policy</a></li>
          </ul>
        </div>
        
        <div style={styles.footerSection}>
          <h4 style={styles.footerHeading}>CONTACT INFO</h4>
          <div style={styles.contactInfo}>
            <p style={styles.contactItem}>
              <span style={styles.contactIcon}>📧</span>
              <a href="mailto:mohdrehanansari95@gmail.com" style={styles.link}>
                mohdrehanansari95@gmail.com
              </a>
            </p>
            <p style={styles.contactItem}>
              <span style={styles.contactIcon}>📱</span>
              <a href="tel:+917052328932" style={styles.link}>
                +91 7052328932
              </a>
            </p>
          </div>
        </div>
      </div>
      
      <div style={styles.footerBottom}>
        <p style={styles.copyright}>
          © {new Date().getFullYear()} Mohammad Rehan. All Rights Reserved.
        </p>
        <div style={styles.socialIcons}>
          <a href="https://www.linkedin.com/in/mohammad-rehan-7b13262ba" style={styles.socialLink}>LinkedIn</a>
          <span style={styles.separator}>•</span>
          <a href="https://github.com/Mohammad-Rehan0403" style={styles.socialLink}>GitHub</a>
          <span style={styles.separator}>•</span>
          <a href="https://x.com/Rehan_0403" style={styles.socialLink}>Twitter</a>
        </div>
      </div>
      
      {/* Add hover effects with style tag */}
      <style>{`
        .footer-link:hover {
          color: #4299e1 !important;
          transform: translateX(5px);
        }
        .social-link:hover {
          color: #48bb78 !important;
        }
      `}</style>
    </footer>
  );
};

const styles = {
  footer: {
    background: 'linear-gradient(135deg, #1a365d 0%, #2d3748 100%)',
    color: '#fff',
    padding: '60px 20px 20px',
    fontFamily: "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    marginTop: 'auto',
    width: '100%',
    boxSizing: 'border-box',
  },
  footerContent: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    maxWidth: '1200px',
    margin: '0 auto',
    gap: '30px',
  },
  footerSection: {
    flex: '1',
    minWidth: '200px',
    marginBottom: '30px',
  },
  footerLogo: {
    fontSize: '24px',
    fontWeight: '800',
    marginBottom: '20px',
    background: 'linear-gradient(45deg, #4299e1, #48bb78)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  footerDescription: {
    color: '#cbd5e0',
    lineHeight: '1.6',
    fontSize: '15px',
    maxWidth: '280px',
  },
  footerHeading: {
    fontSize: '18px',
    fontWeight: '600',
    marginBottom: '20px',
    color: '#4299e1',
    position: 'relative',
    paddingBottom: '10px',
  },
  footerHeadingAfter: {
    content: '""',
    position: 'absolute',
    left: '0',
    bottom: '0',
    width: '40px',
    height: '2px',
    backgroundColor: '#4299e1',
  },
  footerLinks: {
    listStyle: 'none',
    padding: '0',
    margin: '0',
  },
  linkItem: {
    marginBottom: '12px',
    transition: 'transform 0.3s ease',
  },
  link: {
    color: '#cbd5e0',
    textDecoration: 'none',
    fontSize: '15px',
    transition: 'all 0.3s ease',
    display: 'block',
    padding: '5px 0',
  },
  contactInfo: {
    marginTop: '10px',
  },
  contactItem: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '15px',
    color: '#cbd5e0',
  },
  contactIcon: {
    marginRight: '10px',
    fontSize: '18px',
  },
  footerBottom: {
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
    paddingTop: '20px',
    marginTop: '40px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    maxWidth: '1200px',
    margin: '40px auto 0',
  },
  copyright: {
    color: '#a0aec0',
    fontSize: '14px',
    margin: '0',
  },
  socialIcons: {
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
  },
  socialLink: {
    color: '#cbd5e0',
    textDecoration: 'none',
    fontSize: '14px',
    transition: 'color 0.3s ease',
  },
  separator: {
    color: '#a0aec0',
    margin: '0 5px',
  },
};

export default Footer;