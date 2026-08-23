import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminDashboard from '../components/Admin/AdminDashboard';

const Admin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
  if (!token) {
    return null;
  }

  return <AdminDashboard />;
};

export default Admin;