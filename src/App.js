import React from 'react';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LoginForm from './components/LoginForm';
import StudentDashboard from './pages/StudentDashboard';
import StaffDashboard from './pages/StaffDashboard';
import AdminDashboard from './pages/AdminDashboard';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import { EquipmentProvider } from './context/EquipmentContext';
function App() {
    return (
        <AuthProvider>
            <EquipmentProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<LoginForm />} />
                    <Route path="/student-dashboard" element={
                        <ProtectedRoute allowedRole="student">
                            <StudentDashboard />
                            </ProtectedRoute>
                    } />    
                    <Route path="/staff-dashboard" element={
                        <ProtectedRoute allowedRole="staff">
                            <StaffDashboard />
                            </ProtectedRoute>
                    } />
                    <Route path="/admin-dashboard" element={
                        <ProtectedRoute allowedRole="admin">
                            <AdminDashboard />
                            </ProtectedRoute>
                    } />
                    </Routes>
            </Router>
            </EquipmentProvider>
        </AuthProvider>
    
  );
}

export default App;