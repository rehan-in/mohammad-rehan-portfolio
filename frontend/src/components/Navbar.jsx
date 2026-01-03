import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const [isDark, setIsDark] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.backgroundColor = isDark ? '#1e293b' : '#f8fafc';
    document.body.style.color = isDark ? '#f8fafc' : '#1f2937';
  }, [isDark]);

  const theme = {
    background: isDark ? '#1e293b' : '#f8fafc',
    text: isDark ? '#f8fafc' : '#1f2937',
    accent: isDark ? '#60a5fa' : '#3b82f6',
    hover: isDark ? '#38bdf8' : '#0ea5e9',
    buttonText: isDark ? '#1e293b' : '#f8fafc',
    shadow: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
    mobileMenuBg: isDark ? '#0f172a' : '#e2e8f0',
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav style={{ ...styles.nav, backgroundColor: theme.background, boxShadow: `0 2px 15px ${theme.shadow}` }}>
      <div style={styles.inner}>
        {/* Logo and mobile menu button */}
        <div style={styles.logoContainer}>
          <h1 style={{ ...styles.title, color: theme.accent }}>Mohammad Rehan</h1>
          <button 
            style={{...styles.mobileMenuButton, color: theme.text}}
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Center Nav Links - Desktop */}
        <div style={styles.navLinks}>
          {['Home', 'Projects', 'Skills', 'Education', 'Resume', 'Feedback', 'Contact', 'ChatBot', 'Admin'].map((item) => (
            <Link
              key={item}
              to={`/${item === 'Home' ? '' : item.toLowerCase()}`}
              style={{
                ...styles.link,
                color: theme.text
              }}
              onMouseEnter={(e) => (e.target.style.color = theme.hover)}
              onMouseLeave={(e) => (e.target.style.color = theme.text)}
            >
              {item}
            </Link>
          ))}
        </div>

        {/* Right Side: Login + Theme Toggle - Desktop */}
        <div style={styles.rightContainer}>
          <Link
            to="/login"
            style={{
              ...styles.loginButton,
              backgroundColor: theme.accent,
              color: theme.buttonText
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = theme.hover)}
            onMouseLeave={(e) => (e.target.style.backgroundColor = theme.accent)}
          >
            Login
          </Link>

          <button
            onClick={() => setIsDark(!isDark)}
            style={{ 
              ...styles.toggleButton, 
              backgroundColor: isDark ? '#334155' : '#e2e8f0', 
              color: theme.text 
            }}
          >
            {isDark ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>

        {/* Mobile Menu - shown when toggled */}
        {isMobileMenuOpen && (
          <div style={{...styles.mobileMenu, backgroundColor: theme.mobileMenuBg}}>
            {['Home', 'Projects', 'Skills', 'Education', 'Resume', 'Feedback', 'Contact', 'ChatBot'].map((item) => (
              <Link
                key={item}
                to={`/${item === 'Home' ? '' : item.toLowerCase()}`}
                style={{
                  ...styles.mobileLink,
                  color: theme.text
                }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item}
              </Link>
            ))}
            <div style={styles.mobileButtons}>
              <Link
                to="/login"
                style={{
                  ...styles.mobileLoginButton,
                  backgroundColor: theme.accent,
                  color: theme.buttonText
                }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Login
              </Link>
              <button
                onClick={() => {
                  setIsDark(!isDark);
                  setIsMobileMenuOpen(false);
                }}
                style={{ 
                  ...styles.mobileToggleButton, 
                  backgroundColor: isDark ? '#334155' : '#e2e8f0', 
                  color: theme.text 
                }}
              >
                {isDark ? '☀️ Light' : '🌙 Dark'}
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    width: '100%',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    fontFamily: "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    transition: 'all 0.3s ease',
  },
  inner: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0.8rem 1.5rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    position: 'relative',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  title: {
    fontSize: '1.8rem',
    fontWeight: '800',
    margin: 0,
    background: 'linear-gradient(45deg, #60a5fa, #3b82f6)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  navLinks: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '1.8rem',
    flex: 1,
    minWidth: '300px',
    padding: '0.8rem 0',
  },
  link: {
    textDecoration: 'none',
    fontWeight: '500',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    padding: '0.5rem 0.2rem',
    position: 'relative',
  },
  loginButton: {
    padding: '0.6rem 1.5rem',
    borderRadius: '25px',
    fontWeight: '600',
    textDecoration: 'none',
    fontSize: '0.95rem',
    transition: 'all 0.3s ease',
    border: 'none',
    cursor: 'pointer',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  },
  toggleButton: {
    padding: '0.6rem 1rem',
    borderRadius: '8px',
    fontWeight: '600',
    fontSize: '0.9rem',
    cursor: 'pointer',
    border: 'none',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  },
  rightContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    flexShrink: 0,
  },
  mobileMenuButton: {
    display: 'none',
    background: 'none',
    border: 'none',
    fontSize: '1.5rem',
    cursor: 'pointer',
    padding: '0.5rem',
  },
  mobileMenu: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.2rem',
    boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
    zIndex: 1000,
  },
  mobileLink: {
    textDecoration: 'none',
    fontWeight: '500',
    fontSize: '1.1rem',
    padding: '0.5rem 0',
    transition: 'color 0.3s ease',
    textAlign: 'center',
  },
  mobileButtons: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    marginTop: '1rem',
  },
  mobileLoginButton: {
    padding: '0.8rem',
    borderRadius: '8px',
    fontWeight: '600',
    textDecoration: 'none',
    fontSize: '1rem',
    textAlign: 'center',
    border: 'none',
    cursor: 'pointer',
  },
  mobileToggleButton: {
    padding: '0.8rem',
    borderRadius: '8px',
    fontWeight: '600',
    fontSize: '1rem',
    cursor: 'pointer',
    border: 'none',
  },
};

// Add media queries for responsiveness
const addMediaQueries = () => {
  const style = document.createElement('style');
  style.textContent = `
    @media (max-width: 968px) {
      .nav-links {
        gap: 1rem;
      }
    }
    
    @media (max-width: 768px) {
      .nav-links, .right-container {
        display: none !important;
      }
      
      .mobile-menu-button {
        display: block !important;
      }
      
      .logo-container {
        width: 100%;
      }
    }
    
    @media (min-width: 769px) {
      .mobile-menu {
        display: none !important;
      }
    }
    
    .link::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 0;
      height: 2px;
      background-color: currentColor;
      transition: width 0.3s ease;
    }
    
    .link:hover::after {
      width: 100%;
    }
  `;
  document.head.appendChild(style);
};

// Call the function to add media queries
addMediaQueries();

export default Navbar;