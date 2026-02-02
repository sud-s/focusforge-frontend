import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import Dashboard from '../components/dashboard/Dashboard';
import HabitsPage from '../components/habits/HabitsPage';
import TasksPage from '../components/tasks/TasksPage';
import AICoachPage from '../components/ai/AICoachPage';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';
import { useAuth } from '../store/authStore';
import Loader from '../components/common/Loader';



const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) return <div className="h-screen flex items-center justify-center"><Loader /></div>;
  if (!user) return <Navigate to="/login" />;
  
  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      <Route path="/" element={
        <ProtectedRoute>
          <MainLayout />
        </ProtectedRoute>
      }>
        <Route index element={<Dashboard />} />
        <Route path="habits" element={<HabitsPage />} />
        <Route path="tasks" element={<TasksPage />} />
        <Route path="ai-coach" element={<AICoachPage />} />
        {/* Fallback for unknown routes */}
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
