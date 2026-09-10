import React, { useState, useEffect } from 'react';
import { 
  FaCog, FaSave, FaTrash, FaDownload, FaUpload, FaUser, 
  FaPalette, FaBell, FaDatabase, FaLock, FaExclamationTriangle, FaUserPlus 
} from 'react-icons/fa';

const SettingsManagement = ({ styles, theme, onThemeChange, darkMode }) => {
  const [settings, setSettings] = useState({
    profile: {
      name: 'Mohammad Rehan',
      title: 'Embedded Systems & VLSI Engineer',
      location: 'Mizoram, India',
      bio: 'Passionate about embedded systems, VLSI design, and full-stack development.'
    },
    preferences: {
      autoSave: true,
      notifications: true,
      backupFrequency: 'weekly'
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: 30
    }
  });

  const [activeTab, setActiveTab] = useState('profile');
  const [newAdmin, setNewAdmin] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [addAdminLoading, setAddAdminLoading] = useState(false);
  const [addAdminMessage, setAddAdminMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = () => {
    const savedSettings = localStorage.getItem('adminSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  };

  const saveSettings = () => {
    localStorage.setItem('adminSettings', JSON.stringify(settings));
    alert('Settings saved successfully!');
  };

  const handleAddAdmin = async (e) => {
    e.preventDefault();
    setAddAdminMessage({ text: '', type: '' });

    if (!newAdmin.firstName || !newAdmin.lastName || !newAdmin.email || !newAdmin.password) {
      setAddAdminMessage({ text: 'Please fill out all fields.', type: 'error' });
      return;
    }

    if (newAdmin.password !== newAdmin.confirmPassword) {
      setAddAdminMessage({ text: 'Passwords do not match.', type: 'error' });
      return;
    }

    setAddAdminLoading(true);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || '';
      const response = await fetch(`${apiUrl}/api/auth/add-admin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: newAdmin.firstName,
          lastName: newAdmin.lastName,
          email: newAdmin.email,
          password: newAdmin.password
        })
      });

      const data = await response.json();

      if (response.ok) {
        setAddAdminMessage({ text: `✅ ${data.msg || 'New Admin added successfully!'}`, type: 'success' });
        setNewAdmin({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' });
      } else {
        setAddAdminMessage({ text: `❌ ${data.msg || 'Failed to add admin.'}`, type: 'error' });
      }
    } catch (err) {
      console.error('Error adding admin:', err);
      setAddAdminMessage({ text: '❌ Server error while adding admin.', type: 'error' });
    } finally {
      setAddAdminLoading(false);
    }
  };

  const updateSetting = (category, field, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value
      }
    }));
  };

  const exportAllData = () => {
    const data = {
      projects: localStorage.getItem('portfolioProjects'),
      skills: localStorage.getItem('portfolioSkills'),
      education: localStorage.getItem('portfolioEducation'),
      contact: localStorage.getItem('portfolioContactInfo'),
      home: localStorage.getItem('portfolioHomeContent'),
      resumeStats: localStorage.getItem('resumeStatistics'),
      chatMessages: localStorage.getItem('chatMessages'),
      chatbotSettings: localStorage.getItem('chatbotSettings'),
      adminSettings: localStorage.getItem('adminSettings')
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio-data-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importData = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        
        Object.keys(data).forEach(key => {
          if (data[key]) {
            localStorage.setItem(key, data[key]);
          }
        });
        
        alert('Data imported successfully! Please refresh the page.');
      } catch {
        alert('Error importing data. Please check the file format.');
      }
    };
    reader.readAsText(file);
  };

  const resetAllData = () => {
    if (window.confirm('⚠️ DANGER ZONE! This will delete ALL your portfolio data. This action cannot be undone. Are you absolutely sure?')) {
      if (window.confirm('🚨 FINAL WARNING: This will permanently delete all your projects, skills, education, and settings. Continue?')) {
        localStorage.clear();
        alert('All data has been reset. The page will now reload.');
        window.location.reload();
      }
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: <FaUser /> },
    { id: 'addAdmin', label: 'Add Admin', icon: <FaUserPlus /> },
    { id: 'preferences', label: 'Preferences', icon: <FaPalette /> },
    { id: 'security', label: 'Security', icon: <FaLock /> },
    { id: 'backup', label: 'Backup & Restore', icon: <FaDatabase /> }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div>
            <h3 style={{ marginBottom: '1.5rem', color: theme.text }}>Profile Settings</h3>
            <div style={styles.grid}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Full Name</label>
                <input
                  style={styles.input}
                  value={settings.profile.name}
                  onChange={(e) => updateSetting('profile', 'name', e.target.value)}
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Professional Title</label>
                <input
                  style={styles.input}
                  value={settings.profile.title}
                  onChange={(e) => updateSetting('profile', 'title', e.target.value)}
                />
              </div>
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Location</label>
              <input
                style={styles.input}
                value={settings.profile.location}
                onChange={(e) => updateSetting('profile', 'location', e.target.value)}
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Bio</label>
              <textarea
                style={styles.textarea}
                value={settings.profile.bio}
                onChange={(e) => updateSetting('profile', 'bio', e.target.value)}
                rows="4"
              />
            </div>
          </div>
        );

      case 'addAdmin':
        return (
          <div>
            <h3 style={{ marginBottom: '1.5rem', color: theme.text, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FaUserPlus /> Add New Admin
            </h3>
            <p style={{ color: theme.textSecondary, marginBottom: '1.5rem', fontSize: '0.9rem' }}>
              As an active administrator, you can grant administrative access to new team members.
            </p>

            {addAdminMessage.text && (
              <div style={{
                padding: '0.8rem 1rem',
                borderRadius: '10px',
                marginBottom: '1.5rem',
                backgroundColor: addAdminMessage.type === 'success' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                color: addAdminMessage.type === 'success' ? '#34d399' : '#f87171',
                border: `1px solid ${addAdminMessage.type === 'success' ? '#10b981' : '#ef4444'}`
              }}>
                {addAdminMessage.text}
              </div>
            )}

            <form onSubmit={handleAddAdmin}>
              <div style={styles.grid}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>First Name</label>
                  <input
                    type="text"
                    style={styles.input}
                    placeholder="Enter first name"
                    value={newAdmin.firstName}
                    onChange={(e) => setNewAdmin({ ...newAdmin, firstName: e.target.value })}
                    required
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Last Name</label>
                  <input
                    type="text"
                    style={styles.input}
                    placeholder="Enter last name"
                    value={newAdmin.lastName}
                    onChange={(e) => setNewAdmin({ ...newAdmin, lastName: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Admin Email Address</label>
                <input
                  type="email"
                  style={styles.input}
                  placeholder="admin@example.com"
                  value={newAdmin.email}
                  onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
                  required
                />
              </div>

              <div style={styles.grid}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Password</label>
                  <input
                    type="password"
                    style={styles.input}
                    placeholder="••••••••"
                    value={newAdmin.password}
                    onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
                    required
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Confirm Password</label>
                  <input
                    type="password"
                    style={styles.input}
                    placeholder="••••••••"
                    value={newAdmin.confirmPassword}
                    onChange={(e) => setNewAdmin({ ...newAdmin, confirmPassword: e.target.value })}
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={addAdminLoading}
                style={{
                  ...styles.button,
                  ...styles.buttonPrimary,
                  marginTop: '1rem',
                  opacity: addAdminLoading ? 0.7 : 1
                }}
              >
                <FaUserPlus /> {addAdminLoading ? 'Adding Admin...' : 'Add New Admin'}
              </button>
            </form>
          </div>
        );

      case 'preferences':
        return (
          <div>
            <h3 style={{ marginBottom: '1.5rem', color: theme.text }}>Preferences</h3>
            <div style={styles.formGroup}>
              <label style={{...styles.label, display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer'}}>
                <input
                  type="checkbox"
                  checked={settings.preferences.autoSave}
                  onChange={(e) => updateSetting('preferences', 'autoSave', e.target.checked)}
                />
                <span>Auto-save changes</span>
              </label>
            </div>
            <div style={styles.formGroup}>
              <label style={{...styles.label, display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer'}}>
                <input
                  type="checkbox"
                  checked={settings.preferences.notifications}
                  onChange={(e) => updateSetting('preferences', 'notifications', e.target.checked)}
                />
                <span>Enable notifications</span>
              </label>
            </div>
            <div style={styles.formGroup}>
              <label style={{...styles.label, display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer'}}>
                <input
                  type="checkbox"
                  checked={darkMode}
                  onChange={onThemeChange}
                />
                <span>Dark mode</span>
              </label>
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Backup Frequency</label>
              <select
                style={styles.select}
                value={settings.preferences.backupFrequency}
                onChange={(e) => updateSetting('preferences', 'backupFrequency', e.target.value)}
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="manual">Manual Only</option>
              </select>
            </div>
          </div>
        );

      case 'security':
        return (
          <div>
            <h3 style={{ marginBottom: '1.5rem', color: theme.text }}>Security Settings</h3>
            <div style={styles.formGroup}>
              <label style={{...styles.label, display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer'}}>
                <input
                  type="checkbox"
                  checked={settings.security.twoFactorAuth}
                  onChange={(e) => updateSetting('security', 'twoFactorAuth', e.target.checked)}
                />
                <span>Enable Two-Factor Authentication</span>
              </label>
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Session Timeout (minutes)</label>
              <select
                style={styles.select}
                value={settings.security.sessionTimeout}
                onChange={(e) => updateSetting('security', 'sessionTimeout', parseInt(e.target.value))}
              >
                <option value={15}>15 minutes</option>
                <option value={30}>30 minutes</option>
                <option value={60}>1 hour</option>
                <option value={120}>2 hours</option>
              </select>
            </div>
            <div style={{ 
              padding: '1rem',
              backgroundColor: theme.surfaceLight,
              borderRadius: '8px',
              marginTop: '2rem'
            }}>
              <h4 style={{ color: theme.text, marginBottom: '0.5rem' }}>Security Tips</h4>
              <ul style={{ color: theme.textSecondary, fontSize: '0.9rem', lineHeight: '1.6', margin: 0, paddingLeft: '1.5rem' }}>
                <li>Always log out when using public computers</li>
                <li>Enable two-factor authentication for added security</li>
                <li>Regularly backup your data</li>
                <li>Use strong, unique passwords</li>
              </ul>
            </div>
          </div>
        );

      case 'backup':
        return (
          <div>
            <h3 style={{ marginBottom: '1.5rem', color: theme.text }}>Backup & Restore</h3>
            
            <div style={styles.grid}>
              <div style={styles.card}>
                <h4 style={{ marginBottom: '1rem', color: theme.text, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <FaDownload /> Export Data
                </h4>
                <p style={{ color: theme.textSecondary, marginBottom: '1rem', fontSize: '0.9rem' }}>
                  Download a complete backup of all your portfolio data including projects, skills, education, and settings.
                </p>
                <button 
                  style={{...styles.button, ...styles.buttonPrimary, width: '100%'}}
                  onClick={exportAllData}
                >
                  <FaDownload /> Export All Data
                </button>
              </div>

              <div style={styles.card}>
                <h4 style={{ marginBottom: '1rem', color: theme.text, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <FaUpload /> Import Data
                </h4>
                <p style={{ color: theme.textSecondary, marginBottom: '1rem', fontSize: '0.9rem' }}>
                  Restore your portfolio from a previously exported backup file.
                </p>
                <div>
                  <input
                    type="file"
                    id="importFile"
                    accept=".json"
                    onChange={importData}
                    style={{ display: 'none' }}
                  />
                  <label 
                    htmlFor="importFile"
                    style={{
                      ...styles.button,
                      ...styles.buttonSuccess,
                      width: '100%',
                      textAlign: 'center',
                      cursor: 'pointer',
                      display: 'block'
                    }}
                  >
                    <FaUpload /> Choose File to Import
                  </label>
                </div>
              </div>
            </div>

            {/* Danger Zone */}
            <div style={{ 
              ...styles.card, 
              border: `2px solid ${theme.error}`,
              marginTop: '2rem'
            }}>
              <h4 style={{ 
                marginBottom: '1rem', 
                color: theme.error,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <FaExclamationTriangle /> Danger Zone
              </h4>
              <p style={{ color: theme.textSecondary, marginBottom: '1rem', fontSize: '0.9rem' }}>
                This will permanently delete all your portfolio data including projects, skills, education, and settings. This action cannot be undone.
              </p>
              <button 
                style={{...styles.button, ...styles.buttonError}}
                onClick={resetAllData}
              >
                <FaTrash /> Reset All Data
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div>
      <h1 style={styles.sectionTitle}>
        <FaCog /> Settings
      </h1>

      <div style={styles.grid}>
        {/* Navigation */}
        <div style={{...styles.card, alignSelf: 'flex-start'}}>
          <nav>
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  ...styles.button,
                  ...styles.buttonSecondary,
                  ...(activeTab === tab.id ? styles.buttonPrimary : {}),
                  width: '100%',
                  justifyContent: 'flex-start',
                  marginBottom: '0.5rem'
                }}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div style={{...styles.card, flex: 1}}>
          {renderTabContent()}
          
          {activeTab !== 'backup' && activeTab !== 'addAdmin' && (
            <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: `1px solid ${theme.border}` }}>
              <button 
                style={{...styles.button, ...styles.buttonSuccess}}
                onClick={saveSettings}
              >
                <FaSave /> Save Settings
              </button>
            </div>
          )}
        </div>
      </div>

      {/* System Information */}
      <div style={styles.card}>
        <h3 style={{ marginBottom: '1rem', color: theme.text }}>System Information</h3>
        <div style={styles.grid}>
          <div style={{
            padding: '1rem',
            backgroundColor: theme.surfaceLight,
            borderRadius: '8px'
          }}>
            <div style={{ fontSize: '0.9rem', color: theme.textSecondary }}>Storage Used</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: theme.text }}>
              {Math.round(JSON.stringify(localStorage).length / 1024)} KB
            </div>
          </div>
          
          <div style={{
            padding: '1rem',
            backgroundColor: theme.surfaceLight,
            borderRadius: '8px'
          }}>
            <div style={{ fontSize: '0.9rem', color: theme.textSecondary }}>Total Items</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: theme.text }}>
              {Object.keys(localStorage).length}
            </div>
          </div>
          
          <div style={{
            padding: '1rem',
            backgroundColor: theme.surfaceLight,
            borderRadius: '8px'
          }}>
            <div style={{ fontSize: '0.9rem', color: theme.textSecondary }}>Last Backup</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: theme.text }}>
              Never
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsManagement;