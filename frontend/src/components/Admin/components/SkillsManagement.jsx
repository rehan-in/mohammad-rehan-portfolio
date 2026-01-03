import React, { useState, useEffect } from 'react';
import { FaPlus, FaTrash, FaCode, FaMicrochip, FaUsers, FaSave, FaTimes } from 'react-icons/fa';

const SkillsManagement = ({ styles, theme }) => {
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState({ 
    name: '', 
    category: 'technical', 
    subcategory: 'frontend',
    icon: 'FaCode'
  });
  const [editingSkill, setEditingSkill] = useState(null);

  useEffect(() => {
    loadSkills();
  }, []);

  const loadSkills = () => {
    const savedSkills = localStorage.getItem('portfolioSkills');
    setSkills(savedSkills ? JSON.parse(savedSkills) : []);
  };

  const saveSkills = (updatedSkills) => {
    localStorage.setItem('portfolioSkills', JSON.stringify(updatedSkills));
    setSkills(updatedSkills);
  };

  const addSkill = () => {
    if (newSkill.name.trim()) {
      const updatedSkills = [...skills, { 
        ...newSkill, 
        id: Date.now(),
        createdAt: new Date().toISOString()
      }];
      saveSkills(updatedSkills);
      setNewSkill({ name: '', category: 'technical', subcategory: 'frontend', icon: 'FaCode' });
    }
  };

  const editSkill = (skill) => {
    setNewSkill(skill);
    setEditingSkill(skill.id);
  };

  const updateSkill = () => {
    if (newSkill.name.trim() && editingSkill) {
      const updatedSkills = skills.map(skill => 
        skill.id === editingSkill ? { ...newSkill, updatedAt: new Date().toISOString() } : skill
      );
      saveSkills(updatedSkills);
      setNewSkill({ name: '', category: 'technical', subcategory: 'frontend', icon: 'FaCode' });
      setEditingSkill(null);
    }
  };

  const deleteSkill = (id) => {
    const updatedSkills = skills.filter(skill => skill.id !== id);
    saveSkills(updatedSkills);
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'technical': return <FaCode />;
      case 'vlsi': return <FaMicrochip />;
      case 'soft': return <FaUsers />;
      default: return <FaCode />;
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'technical': return '#3b82f6';
      case 'vlsi': return '#10b981';
      case 'soft': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  const getSubcategoryColor = (subcategory) => {
    const colors = {
      // Technical subcategories
      frontend: '#ef4444',
      backend: '#3b82f6',
      database: '#10b981',
      tools: '#f59e0b',
      devops: '#8b5cf6',
      
      // VLSI subcategories
      languages: '#ef4444',
      tools: '#3b82f6',
      concepts: '#10b981',
      problemsolving: '#f59e0b',
      
      // Soft Skills subcategories
      communication: '#ef4444',
      collaboration: '#3b82f6',
      leadership: '#10b981',
      problemsolving: '#f59e0b'
    };
    return colors[subcategory] || '#6b7280';
  };

  // Subcategories based on category
  const getSubcategories = (category) => {
    const subcategories = {
      technical: [
        { value: 'frontend', label: 'Frontend' },
        { value: 'backend', label: 'Backend' },
        { value: 'database', label: 'Database' },
        { value: 'tools', label: 'Tools' },
        { value: 'devops', label: 'DevOps' }
      ],
      vlsi: [
        { value: 'languages', label: 'Languages' },
        { value: 'tools', label: 'Tools' },
        { value: 'concepts', label: 'Concepts' },
        { value: 'problemsolving', label: 'Problem Solving' }
      ],
      soft: [
        { value: 'communication', label: 'Communication' },
        { value: 'collaboration', label: 'Collaboration' },
        { value: 'leadership', label: 'Leadership' },
        { value: 'problemsolving', label: 'Problem Solving' }
      ]
    };
    return subcategories[category] || [];
  };

  const categories = [
    { value: 'technical', label: 'Technical Skills', icon: <FaCode /> },
    { value: 'vlsi', label: 'VLSI Skills', icon: <FaMicrochip /> },
    { value: 'soft', label: 'Soft Skills', icon: <FaUsers /> }
  ];

  const skillsByCategory = categories.reduce((acc, category) => {
    acc[category.value] = skills.filter(skill => skill.category === category.value);
    return acc;
  }, {});

  // Group skills by subcategory for display
  const groupSkillsBySubcategory = (categorySkills) => {
    const grouped = {};
    categorySkills.forEach(skill => {
      if (!grouped[skill.subcategory]) {
        grouped[skill.subcategory] = [];
      }
      grouped[skill.subcategory].push(skill);
    });
    return grouped;
  };

  const getSubcategoryLabel = (subcategory) => {
    const labels = {
      // Technical
      frontend: 'Frontend Development',
      backend: 'Backend Development',
      database: 'Database & Storage',
      tools: 'Tools & Platforms',
      devops: 'DevOps & Cloud',
      
      // VLSI
      languages: 'Technical Languages',
      tools: 'Tools & Software',
      concepts: 'Concepts & Theory',
      problemsolving: 'Problem Solving',
      
      // Soft Skills
      communication: 'Communication',
      collaboration: 'Collaboration',
      leadership: 'Leadership',
      problemsolving: 'Problem Solving'
    };
    return labels[subcategory] || subcategory;
  };

  return (
    <div>
      <h1 style={styles.sectionTitle}>Skills Management</h1>
      
      {/* Add Skill Form */}
      <div style={styles.card}>
        <h3 style={{ marginBottom: '1.5rem', color: theme.text }}>
          {editingSkill ? 'Edit Skill' : 'Add New Skill'}
        </h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr auto', gap: '1rem', alignItems: 'end' }}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Skill Name</label>
            <input
              style={styles.input}
              value={newSkill.name}
              onChange={(e) => setNewSkill({...newSkill, name: e.target.value})}
              placeholder="e.g., React, Verilog, Python"
            />
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.label}>Category</label>
            <select 
              style={styles.select}
              value={newSkill.category}
              onChange={(e) => {
                const newCategory = e.target.value;
                const availableSubcategories = getSubcategories(newCategory);
                setNewSkill({
                  ...newSkill, 
                  category: newCategory,
                  subcategory: availableSubcategories[0]?.value || 'frontend'
                });
              }}
            >
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Subcategory</label>
            <select 
              style={styles.select}
              value={newSkill.subcategory}
              onChange={(e) => setNewSkill({...newSkill, subcategory: e.target.value})}
            >
              {getSubcategories(newSkill.category).map(subcat => (
                <option key={subcat.value} value={subcat.value}>{subcat.label}</option>
              ))}
            </select>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {editingSkill ? (
              <>
                <button 
                  style={{...styles.button, ...styles.buttonSuccess}} 
                  onClick={updateSkill}
                >
                  <FaSave />
                </button>
                <button 
                  style={{...styles.button, ...styles.buttonSecondary}} 
                  onClick={() => {
                    setEditingSkill(null);
                    setNewSkill({ name: '', category: 'technical', subcategory: 'frontend', icon: 'FaCode' });
                  }}
                >
                  <FaTimes />
                </button>
              </>
            ) : (
              <button 
                style={{...styles.button, ...styles.buttonPrimary}} 
                onClick={addSkill}
                disabled={!newSkill.name.trim()}
              >
                <FaPlus /> Add
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Skills by Category */}
      <div style={styles.grid}>
        {categories.map(category => {
          const categorySkills = skillsByCategory[category.value] || [];
          const groupedSkills = groupSkillsBySubcategory(categorySkills);
          
          return (
            <div key={category.value} style={styles.card}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.75rem', 
                marginBottom: '1.5rem',
                paddingBottom: '0.75rem',
                borderBottom: `2px solid ${getCategoryColor(category.value)}20`
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  backgroundColor: getCategoryColor(category.value) + '20',
                  color: getCategoryColor(category.value),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.1rem'
                }}>
                  {category.icon}
                </div>
                <div>
                  <h3 style={{ margin: 0, color: theme.text }}>{category.label}</h3>
                  <div style={{ fontSize: '0.8rem', color: theme.textSecondary }}>
                    {categorySkills.length} skills across {Object.keys(groupedSkills).length} subcategories
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {Object.keys(groupedSkills).length > 0 ? (
                  Object.entries(groupedSkills).map(([subcategory, subcategorySkills]) => (
                    <div key={subcategory}>
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '0.5rem', 
                        marginBottom: '0.75rem',
                        padding: '0.5rem 0'
                      }}>
                        <div style={{
                          width: '12px',
                          height: '12px',
                          borderRadius: '50%',
                          backgroundColor: getSubcategoryColor(subcategory)
                        }}></div>
                        <h4 style={{ 
                          margin: 0, 
                          fontSize: '0.9rem', 
                          fontWeight: '600',
                          color: theme.text
                        }}>
                          {getSubcategoryLabel(subcategory)}
                        </h4>
                        <span style={{ 
                          fontSize: '0.75rem', 
                          color: theme.textSecondary,
                          marginLeft: 'auto'
                        }}>
                          {subcategorySkills.length} skills
                        </span>
                      </div>
                      
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {subcategorySkills.map(skill => (
                          <div key={skill.id} style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '0.75rem',
                            backgroundColor: theme.surfaceLight,
                            borderRadius: '8px',
                            border: `1px solid ${theme.border}`
                          }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                              <div style={{
                                width: '32px',
                                height: '32px',
                                borderRadius: '8px',
                                backgroundColor: getCategoryColor(skill.category) + '20',
                                color: getCategoryColor(skill.category),
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '0.8rem'
                              }}>
                                {getCategoryIcon(skill.category)}
                              </div>
                              <div>
                                <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>{skill.name}</div>
                                <div style={{ 
                                  fontSize: '0.75rem', 
                                  color: getSubcategoryColor(skill.subcategory),
                                  fontWeight: '500'
                                }}>
                                  {getSubcategories(skill.category).find(sc => sc.value === skill.subcategory)?.label || skill.subcategory}
                                </div>
                              </div>
                            </div>
                            
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                              <button
                                onClick={() => editSkill(skill)}
                                style={{
                                  ...styles.button,
                                  ...styles.buttonPrimary,
                                  padding: '0.25rem 0.5rem',
                                  fontSize: '0.75rem'
                                }}
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => deleteSkill(skill.id)}
                                style={{
                                  ...styles.button,
                                  ...styles.buttonError,
                                  padding: '0.25rem 0.5rem',
                                  fontSize: '0.75rem'
                                }}
                              >
                                <FaTrash />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                ) : (
                  <div style={{ 
                    textAlign: 'center', 
                    padding: '1.5rem', 
                    color: theme.textSecondary,
                    fontStyle: 'italic',
                    border: `1px dashed ${theme.border}`,
                    borderRadius: '8px'
                  }}>
                    No skills in this category
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Skills Summary */}
      <div style={styles.card}>
        <h3 style={{ marginBottom: '1rem', color: theme.text }}>Skills Summary</h3>
        <div style={styles.grid}>
          {categories.map(category => {
            const categorySkills = skillsByCategory[category.value] || [];
            const subcategoryCount = Object.keys(groupSkillsBySubcategory(categorySkills)).length;
            
            return (
              <div key={category.value} style={{
                padding: '1rem',
                backgroundColor: theme.surfaceLight,
                borderRadius: '8px',
                borderLeft: `4px solid ${getCategoryColor(category.value)}`
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span style={{ fontWeight: '600', fontSize: '0.9rem' }}>{category.label}</span>
                  <span style={{ fontSize: '0.8rem', color: theme.textSecondary }}>
                    {categorySkills.length} skills
                  </span>
                </div>
                <div style={{ fontSize: '0.75rem', color: theme.textSecondary }}>
                  {subcategoryCount} subcategories
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SkillsManagement;