import React, { useState, useEffect } from 'react';
import { FaGraduationCap, FaPlus, FaEdit, FaTrash, FaSave, FaTimes, FaUniversity, FaCalendar } from 'react-icons/fa';

const EducationManagement = ({ styles, theme }) => {
  const [education, setEducation] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEducation, setCurrentEducation] = useState({
    institute: '',
    degree: '',
    field: '',
    duration: '',
    grade: '',
    achievements: [],
    description: ''
  });

  useEffect(() => {
    loadEducation();
  }, []);

  const loadEducation = () => {
    const savedEducation = localStorage.getItem('portfolioEducation');
    if (savedEducation) {
      setEducation(JSON.parse(savedEducation));
    } else {
      // Default education data
      const defaultEducation = [
        {
          id: 1,
          institute: 'National Institute of Technology, Mizoram',
          degree: 'Bachelor of Technology',
          field: 'Electronics and Communication Engineering',
          duration: '2023 - 2027',
          grade: 'CGPA: 8.5/10',
          achievements: ['Department Rank: Top 10%', 'Relevant Courses: VLSI Design, Digital Electronics, Embedded Systems'],
          description: 'Currently pursuing my BTech in Electronics and Communication Engineering.'
        },
        {
          id: 2,
          institute: 'R.S.S Inter College',
          degree: 'PCM',
          field: 'Physics, Chemistry, Mathematics',
          duration: '2019 - 2021',
          grade: 'Percentage: 85%',
          achievements: ['Science Fair Winner', 'Math Olympiad Participant'],
          description: 'Completed intermediate education with focus on Science and Mathematics.'
        }
      ];
      setEducation(defaultEducation);
    }
  };

  const saveEducation = () => {
    localStorage.setItem('portfolioEducation', JSON.stringify(education));
  };

  const addEducation = () => {
    const newEducation = {
      ...currentEducation,
      id: Date.now(),
      achievements: currentEducation.achievements.split(',').map(a => a.trim())
    };
    setEducation([...education, newEducation]);
    setCurrentEducation({
      institute: '',
      degree: '',
      field: '',
      duration: '',
      grade: '',
      achievements: [],
      description: ''
    });
    setIsEditing(false);
    saveEducation();
  };

  const updateEducation = () => {
    const updatedEducation = education.map(edu =>
      edu.id === currentEducation.id ? currentEducation : edu
    );
    setEducation(updatedEducation);
    setCurrentEducation({
      institute: '',
      degree: '',
      field: '',
      duration: '',
      grade: '',
      achievements: [],
      description: ''
    });
    setIsEditing(false);
    saveEducation();
  };

  const deleteEducation = (id) => {
    if (window.confirm('Are you sure you want to delete this education entry?')) {
      const updatedEducation = education.filter(edu => edu.id !== id);
      setEducation(updatedEducation);
      saveEducation();
    }
  };

  const startEditing = (edu) => {
    setCurrentEducation({
      ...edu,
      achievements: Array.isArray(edu.achievements) ? edu.achievements.join(', ') : edu.achievements
    });
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setCurrentEducation({
      institute: '',
      degree: '',
      field: '',
      duration: '',
      grade: '',
      achievements: [],
      description: ''
    });
    setIsEditing(false);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={styles.sectionTitle}>
          <FaGraduationCap /> Education Management
        </h1>
        {!isEditing ? (
          <button 
            style={{...styles.button, ...styles.buttonPrimary}}
            onClick={() => setIsEditing(true)}
          >
            <FaPlus /> Add Education
          </button>
        ) : (
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button 
              style={{...styles.button, ...styles.buttonSuccess}}
              onClick={currentEducation.id ? updateEducation : addEducation}
            >
              <FaSave /> {currentEducation.id ? 'Update' : 'Add'} Education
            </button>
            <button 
              style={{...styles.button, ...styles.buttonSecondary}}
              onClick={cancelEditing}
            >
              <FaTimes /> Cancel
            </button>
          </div>
        )}
      </div>

      {/* Education Form */}
      {isEditing && (
        <div style={{...styles.card, marginBottom: '2rem'}}>
          <h3 style={{ marginBottom: '1.5rem', color: theme.text }}>
            {currentEducation.id ? 'Edit Education' : 'Add New Education'}
          </h3>
          
          <div style={styles.grid}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Institute Name *</label>
              <input
                style={styles.input}
                value={currentEducation.institute}
                onChange={(e) => setCurrentEducation({...currentEducation, institute: e.target.value})}
                placeholder="e.g., National Institute of Technology"
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Degree/Certificate *</label>
              <input
                style={styles.input}
                value={currentEducation.degree}
                onChange={(e) => setCurrentEducation({...currentEducation, degree: e.target.value})}
                placeholder="e.g., Bachelor of Technology"
              />
            </div>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Field of Study *</label>
            <input
              style={styles.input}
              value={currentEducation.field}
              onChange={(e) => setCurrentEducation({...currentEducation, field: e.target.value})}
              placeholder="e.g., Electronics and Communication Engineering"
            />
          </div>

          <div style={styles.grid}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Duration *</label>
              <input
                style={styles.input}
                value={currentEducation.duration}
                onChange={(e) => setCurrentEducation({...currentEducation, duration: e.target.value})}
                placeholder="e.g., 2023 - 2027"
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Grade/Score *</label>
              <input
                style={styles.input}
                value={currentEducation.grade}
                onChange={(e) => setCurrentEducation({...currentEducation, grade: e.target.value})}
                placeholder="e.g., CGPA: 8.5/10"
              />
            </div>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Achievements (comma separated)</label>
            <input
              style={styles.input}
              value={currentEducation.achievements}
              onChange={(e) => setCurrentEducation({...currentEducation, achievements: e.target.value})}
              placeholder="e.g., Department Rank, Science Fair Winner, Math Olympiad"
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Description</label>
            <textarea
              style={styles.textarea}
              value={currentEducation.description}
              onChange={(e) => setCurrentEducation({...currentEducation, description: e.target.value})}
              placeholder="Brief description about your education experience..."
              rows="3"
            />
          </div>
        </div>
      )}

      {/* Education Timeline */}
      <div style={styles.card}>
        <h3 style={{ marginBottom: '1.5rem', color: theme.text }}>
          Education Timeline ({education.length} entries)
        </h3>

        {education.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '3rem', 
            color: theme.textSecondary,
            border: `2px dashed ${theme.border}`,
            borderRadius: '8px'
          }}>
            <FaGraduationCap style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.5 }} />
            <div style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>No education entries yet</div>
            <div style={{ fontSize: '0.9rem' }}>Click "Add Education" to add your first education entry</div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', position: 'relative' }}>
            {/* Timeline line */}
            <div style={{
              position: 'absolute',
              left: '30px',
              top: '0',
              bottom: '0',
              width: '3px',
              backgroundColor: theme.accent,
              borderRadius: '3px',
              zIndex: 1
            }}></div>

            {education.map((edu, index) => (
              <div key={edu.id} style={{
                display: 'flex',
                gap: '2rem',
                position: 'relative',
                zIndex: 2
              }}>
                {/* Timeline dot */}
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  backgroundColor: theme.accent,
                  border: `3px solid ${theme.surface}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '1.2rem',
                  flexShrink: 0
                }}>
                  <FaUniversity />
                </div>

                {/* Education content */}
                <div style={{
                  flex: 1,
                  backgroundColor: theme.surfaceLight,
                  padding: '1.5rem',
                  borderRadius: '12px',
                  border: `1px solid ${theme.border}`
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                    <div>
                      <h4 style={{ 
                        margin: '0 0 0.5rem 0', 
                        color: theme.text,
                        fontSize: '1.3rem'
                      }}>
                        {edu.institute}
                      </h4>
                      <div style={{ 
                        color: theme.accent,
                        fontWeight: '600',
                        marginBottom: '0.25rem'
                      }}>
                        {edu.degree} in {edu.field}
                      </div>
                      <div style={{ 
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        color: theme.textSecondary,
                        fontSize: '0.9rem',
                        marginBottom: '0.5rem'
                      }}>
                        <FaCalendar />
                        {edu.duration}
                      </div>
                    </div>
                    
                    <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
                      <button
                        onClick={() => startEditing(edu)}
                        style={{
                          ...styles.button,
                          ...styles.buttonPrimary,
                          padding: '0.5rem 0.75rem',
                          fontSize: '0.8rem'
                        }}
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => deleteEducation(edu.id)}
                        style={{
                          ...styles.button,
                          ...styles.buttonError,
                          padding: '0.5rem 0.75rem',
                          fontSize: '0.8rem'
                        }}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>

                  <div style={{ 
                    color: theme.text,
                    lineHeight: '1.6',
                    marginBottom: '1rem'
                  }}>
                    {edu.description}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                    <div style={{
                      padding: '0.5rem 1rem',
                      backgroundColor: theme.accent + '20',
                      color: theme.accent,
                      borderRadius: '20px',
                      fontSize: '0.9rem',
                      fontWeight: '600'
                    }}>
                      {edu.grade}
                    </div>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {Array.isArray(edu.achievements) && edu.achievements.map((achievement, idx) => (
                        <span key={idx} style={{
                          padding: '0.25rem 0.75rem',
                          backgroundColor: theme.surface,
                          color: theme.textSecondary,
                          borderRadius: '12px',
                          fontSize: '0.8rem'
                        }}>
                          {achievement}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Statistics */}
      <div style={styles.grid}>
        <div style={styles.card}>
          <h4 style={{ marginBottom: '1rem', color: theme.text }}>Education Summary</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Total Institutions:</span>
              <span style={{ fontWeight: '600', color: theme.accent }}>{education.length}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Degrees:</span>
              <span style={{ fontWeight: '600', color: theme.accent }}>
                {[...new Set(education.map(edu => edu.degree))].length}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Total Achievements:</span>
              <span style={{ fontWeight: '600', color: theme.accent }}>
                {education.reduce((sum, edu) => sum + (Array.isArray(edu.achievements) ? edu.achievements.length : 0), 0)}
              </span>
            </div>
          </div>
        </div>

        <div style={styles.card}>
          <h4 style={{ marginBottom: '1rem', color: theme.text }}>Quick Actions</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <button 
              style={{...styles.button, ...styles.buttonPrimary}}
              onClick={() => setIsEditing(true)}
            >
              <FaPlus /> Add New Entry
            </button>
            <button 
              style={{...styles.button, ...styles.buttonSecondary}}
              onClick={() => window.location.href = '/education'}
            >
              View Live Page
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationManagement;