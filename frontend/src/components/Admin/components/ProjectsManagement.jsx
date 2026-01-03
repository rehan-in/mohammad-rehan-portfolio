import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaSave, FaTimes, FaStar, FaCode, FaMicrochip, FaExternalLinkAlt } from 'react-icons/fa';
import { SiRaspberrypi } from 'react-icons/si';

const ProjectsManagement = ({ styles, theme }) => {
  const [projects, setProjects] = useState([]);
  const [editingProject, setEditingProject] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'web',
    technologies: '',
    githubUrl: '',
    liveUrl: '',
    imageUrl: '',
    featured: false
  });

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = () => {
    const savedProjects = localStorage.getItem('portfolioProjects');
    setProjects(savedProjects ? JSON.parse(savedProjects) : []);
  };

  const saveProjects = (updatedProjects) => {
    localStorage.setItem('portfolioProjects', JSON.stringify(updatedProjects));
    setProjects(updatedProjects);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProject = {
      ...formData,
      id: editingProject ? editingProject.id : Date.now(),
      technologies: formData.technologies.split(',').map(tech => tech.trim()),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    let updatedProjects;
    if (editingProject) {
      updatedProjects = projects.map(p => p.id === editingProject.id ? newProject : p);
    } else {
      updatedProjects = [...projects, newProject];
    }

    saveProjects(updatedProjects);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: 'web',
      technologies: '',
      githubUrl: '',
      liveUrl: '',
      imageUrl: '',
      featured: false
    });
    setEditingProject(null);
    setShowForm(false);
  };

  const editProject = (project) => {
    setFormData({
      ...project,
      technologies: project.technologies.join(', ')
    });
    setEditingProject(project);
    setShowForm(true);
  };

  const deleteProject = (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      const updatedProjects = projects.filter(project => project.id !== id);
      saveProjects(updatedProjects);
    }
  };

  const toggleFeatured = (id) => {
    const updatedProjects = projects.map(project =>
      project.id === id ? { ...project, featured: !project.featured } : project
    );
    saveProjects(updatedProjects);
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'web': return <FaCode />;
      case 'vlsi': return <FaMicrochip />;
      case 'embedded': return <SiRaspberrypi />;
      default: return <FaCode />;
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'web': return '#3b82f6';
      case 'vlsi': return '#10b981';
      case 'embedded': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  // 🟢 Default styles if not provided
  const defaultStyles = {
    sectionTitle: {
      fontSize: '1.8rem',
      fontWeight: 'bold',
      marginBottom: '1rem',
      color: theme?.text || '#1E293B'
    },
    card: {
      backgroundColor: theme?.card || '#FFFFFF',
      border: `1px solid ${theme?.border || '#E5E7EB'}`,
      borderRadius: '12px',
      padding: '1.5rem',
      marginBottom: '1.5rem'
    },
    button: {
      padding: '0.75rem 1.5rem',
      borderRadius: '8px',
      border: 'none',
      cursor: 'pointer',
      fontSize: '0.9rem',
      fontWeight: '600',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      transition: 'all 0.2s ease'
    },
    buttonPrimary: {
      backgroundColor: theme?.accent || '#3b82f6',
      color: '#FFFFFF'
    },
    buttonSecondary: {
      backgroundColor: theme?.surfaceLight || '#F3F4F6',
      color: theme?.text || '#1E293B'
    },
    buttonSuccess: {
      backgroundColor: '#10b981',
      color: '#FFFFFF'
    },
    buttonError: {
      backgroundColor: '#ef4444',
      color: '#FFFFFF'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '1rem'
    },
    formGroup: {
      marginBottom: '1rem'
    },
    label: {
      display: 'block',
      marginBottom: '0.5rem',
      fontWeight: '600',
      color: theme?.text || '#1E293B'
    },
    input: {
      width: '100%',
      padding: '0.75rem',
      borderRadius: '8px',
      border: `1px solid ${theme?.border || '#E5E7EB'}`,
      backgroundColor: theme?.surfaceLight || '#F9FAFB',
      color: theme?.text || '#1E293B',
      fontSize: '0.9rem'
    },
    textarea: {
      width: '100%',
      padding: '0.75rem',
      borderRadius: '8px',
      border: `1px solid ${theme?.border || '#E5E7EB'}`,
      backgroundColor: theme?.surfaceLight || '#F9FAFB',
      color: theme?.text || '#1E293B',
      fontSize: '0.9rem',
      minHeight: '100px',
      resize: 'vertical'
    },
    select: {
      width: '100%',
      padding: '0.75rem',
      borderRadius: '8px',
      border: `1px solid ${theme?.border || '#E5E7EB'}`,
      backgroundColor: theme?.surfaceLight || '#F9FAFB',
      color: theme?.text || '#1E293B',
      fontSize: '0.9rem'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse'
    },
    tableHeader: {
      backgroundColor: theme?.surfaceLight || '#F3F4F6',
      borderBottom: `2px solid ${theme?.border || '#E5E7EB'}`
    },
    tableCell: {
      padding: '1rem',
      textAlign: 'left',
      borderBottom: `1px solid ${theme?.border || '#E5E7EB'}`,
      color: theme?.text || '#1E293B'
    }
  };

  // 🟢 Merge provided styles with defaults
  const mergedStyles = {
    ...defaultStyles,
    ...styles,
    button: { ...defaultStyles.button, ...styles?.button },
    buttonPrimary: { ...defaultStyles.buttonPrimary, ...styles?.buttonPrimary },
    buttonSecondary: { ...defaultStyles.buttonSecondary, ...styles?.buttonSecondary },
    buttonSuccess: { ...defaultStyles.buttonSuccess, ...styles?.buttonSuccess },
    buttonError: { ...defaultStyles.buttonError, ...styles?.buttonError }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={mergedStyles.sectionTitle}>Projects Management</h1>
        <button 
          style={{...mergedStyles.button, ...mergedStyles.buttonPrimary}}
          onClick={() => setShowForm(true)}
        >
          <FaPlus /> Add Project
        </button>
      </div>

      {/* Project Form */}
      {showForm && (
        <div style={{...mergedStyles.card, marginBottom: '2rem'}}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ margin: 0, color: theme?.text || '#1E293B' }}>{editingProject ? 'Edit Project' : 'Add New Project'}</h3>
            <button 
              style={{...mergedStyles.button, ...mergedStyles.buttonSecondary, padding: '0.5rem'}}
              onClick={resetForm}
            >
              <FaTimes />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={mergedStyles.grid}>
              <div style={mergedStyles.formGroup}>
                <label style={mergedStyles.label}>Project Title *</label>
                <input
                  style={mergedStyles.input}
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  required
                  placeholder="Enter project title"
                />
              </div>

              <div style={mergedStyles.formGroup}>
                <label style={mergedStyles.label}>Category *</label>
                <select
                  style={mergedStyles.select}
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                >
                  {/* 🟢 REMOVED: Mobile App and AI/ML categories */}
                  <option value="web">Full Stack</option>
                  <option value="vlsi">VLSI</option>
                  <option value="embedded">Embedded Systems</option>
                </select>
              </div>
            </div>

            <div style={mergedStyles.formGroup}>
              <label style={mergedStyles.label}>Description *</label>
              <textarea
                style={mergedStyles.textarea}
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                required
                placeholder="Describe your project..."
              />
            </div>

            <div style={mergedStyles.formGroup}>
              <label style={mergedStyles.label}>Technologies (comma separated)</label>
              <input
                style={mergedStyles.input}
                value={formData.technologies}
                onChange={(e) => setFormData({...formData, technologies: e.target.value})}
                placeholder="React, Node.js, MongoDB, Python"
              />
            </div>

            <div style={mergedStyles.grid}>
              <div style={mergedStyles.formGroup}>
                <label style={mergedStyles.label}>GitHub URL</label>
                <input
                  style={mergedStyles.input}
                  type="url"
                  value={formData.githubUrl}
                  onChange={(e) => setFormData({...formData, githubUrl: e.target.value})}
                  placeholder="https://github.com/username/repo"
                />
              </div>

              <div style={mergedStyles.formGroup}>
                <label style={mergedStyles.label}>Live Demo URL</label>
                <input
                  style={mergedStyles.input}
                  type="url"
                  value={formData.liveUrl}
                  onChange={(e) => setFormData({...formData, liveUrl: e.target.value})}
                  placeholder="https://your-project.vercel.app"
                />
              </div>
            </div>

            <div style={mergedStyles.formGroup}>
              <label style={mergedStyles.label}>Image URL</label>
              <input
                style={mergedStyles.input}
                type="url"
                value={formData.imageUrl}
                onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                placeholder="https://example.com/project-image.jpg"
              />
            </div>

            <div style={mergedStyles.formGroup}>
              <label style={{...mergedStyles.label, display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer'}}>
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                />
                <span>Featured Project (Show on homepage)</span>
              </label>
            </div>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button type="submit" style={{...mergedStyles.button, ...mergedStyles.buttonSuccess}}>
                <FaSave /> {editingProject ? 'Update Project' : 'Add Project'}
              </button>
              <button type="button" style={{...mergedStyles.button, ...mergedStyles.buttonSecondary}} onClick={resetForm}>
                <FaTimes /> Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Projects List */}
      <div style={mergedStyles.card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h3 style={{ margin: 0, color: theme?.text || '#1E293B' }}>Current Projects ({projects.length})</h3>
          <div style={{ fontSize: '0.9rem', color: theme?.textSecondary || '#6B7280' }}>
            {projects.filter(p => p.featured).length} featured
          </div>
        </div>
        
        {projects.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '3rem', 
            color: theme?.textSecondary || '#6B7280',
            border: `2px dashed ${theme?.border || '#E5E7EB'}`,
            borderRadius: '8px'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.5 }}>📁</div>
            <div style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>No projects yet</div>
            <div style={{ fontSize: '0.9rem' }}>Click "Add Project" to create your first project</div>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ ...mergedStyles.table, minWidth: '800px' }}>
              <thead>
                <tr style={mergedStyles.tableHeader}>
                  <th style={mergedStyles.tableCell}>Project</th>
                  <th style={mergedStyles.tableCell}>Category</th>
                  <th style={mergedStyles.tableCell}>Technologies</th>
                  <th style={mergedStyles.tableCell}>Status</th>
                  <th style={mergedStyles.tableCell}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr key={project.id} style={{ transition: 'background-color 0.2s' }}>
                    <td style={mergedStyles.tableCell}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '8px',
                          backgroundColor: getCategoryColor(project.category) + '20',
                          color: getCategoryColor(project.category),
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '1rem'
                        }}>
                          {getCategoryIcon(project.category)}
                        </div>
                        <div>
                          <div style={{ fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            {project.title}
                            {project.featured && <FaStar style={{ color: '#f59e0b', fontSize: '0.8rem' }} />}
                          </div>
                          <div style={{ fontSize: '0.8rem', color: theme?.textSecondary || '#6B7280' }}>
                            {project.description.substring(0, 60)}...
                          </div>
                        </div>
                      </div>
                    </td>
                    <td style={mergedStyles.tableCell}>
                      <span style={{
                        padding: '0.25rem 0.75rem',
                        borderRadius: '20px',
                        fontSize: '0.75rem',
                        fontWeight: '500',
                        backgroundColor: getCategoryColor(project.category) + '20',
                        color: getCategoryColor(project.category),
                        textTransform: 'capitalize'
                      }}>
                        {/* 🟢 UPDATED: Show proper category names */}
                        {project.category === 'web' ? 'Full Stack' : 
                         project.category === 'vlsi' ? 'VLSI' : 
                         project.category === 'embedded' ? 'Embedded Systems' : project.category}
                      </span>
                    </td>
                    <td style={mergedStyles.tableCell}>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem', maxWidth: '200px' }}>
                        {project.technologies.slice(0, 3).map((tech, index) => (
                          <span key={index} style={{
                            padding: '0.2rem 0.5rem',
                            backgroundColor: theme?.surfaceLight || '#F3F4F6',
                            borderRadius: '12px',
                            fontSize: '0.7rem',
                            color: theme?.textSecondary || '#6B7280'
                          }}>
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span style={{
                            padding: '0.2rem 0.5rem',
                            backgroundColor: theme?.surfaceLight || '#F3F4F6',
                            borderRadius: '12px',
                            fontSize: '0.7rem',
                            color: theme?.textSecondary || '#6B7280'
                          }}>
                            +{project.technologies.length - 3}
                          </span>
                        )}
                      </div>
                    </td>
                    <td style={mergedStyles.tableCell}>
                      <button
                        onClick={() => toggleFeatured(project.id)}
                        style={{
                          ...mergedStyles.button,
                          ...(project.featured ? mergedStyles.buttonSuccess : mergedStyles.buttonSecondary),
                          padding: '0.25rem 0.75rem',
                          fontSize: '0.75rem'
                        }}
                      >
                        <FaStar /> {project.featured ? 'Featured' : 'Regular'}
                      </button>
                    </td>
                    <td style={mergedStyles.tableCell}>
                      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              ...mergedStyles.button,
                              ...mergedStyles.buttonSecondary,
                              padding: '0.25rem 0.5rem',
                              fontSize: '0.75rem',
                              textDecoration: 'none'
                            }}
                          >
                            <FaExternalLinkAlt />
                          </a>
                        )}
                        <button
                          onClick={() => editProject(project)}
                          style={{
                            ...mergedStyles.button,
                            ...mergedStyles.buttonPrimary,
                            padding: '0.25rem 0.5rem',
                            fontSize: '0.75rem'
                          }}
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => deleteProject(project.id)}
                          style={{
                            ...mergedStyles.button,
                            ...mergedStyles.buttonError,
                            padding: '0.25rem 0.5rem',
                            fontSize: '0.75rem'
                          }}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsManagement;