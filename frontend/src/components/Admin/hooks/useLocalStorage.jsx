import { useState, useEffect } from 'react';

export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
};

export const useStatistics = () => {
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalSkills: 0,
    totalFeedback: 0,
    totalMessages: 0,
    resumeViews: 0,
    resumeDownloads: 0
  });

  const refreshStats = () => {
    const savedProjects = localStorage.getItem('portfolioProjects');
    const projects = savedProjects ? JSON.parse(savedProjects) : [];
    
    const savedSkills = localStorage.getItem('portfolioSkills');
    const skills = savedSkills ? JSON.parse(savedSkills) : [];
    
    const resumeStats = JSON.parse(localStorage.getItem('resumeStatistics') || '{}');
    
    const chatMessages = localStorage.getItem('chatMessages');
    const messages = chatMessages ? JSON.parse(chatMessages) : [];

    setStats({
      totalProjects: projects.length,
      totalSkills: skills.length,
      totalFeedback: 0,
      totalMessages: messages.length,
      resumeViews: resumeStats.views || 0,
      resumeDownloads: resumeStats.downloads || 0
    });
  };

  useEffect(() => {
    refreshStats();
    
    const interval = setInterval(refreshStats, 30000);
    return () => clearInterval(interval);
  }, []);

  return { stats, refreshStats };
};