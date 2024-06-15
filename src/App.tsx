import React from 'react';
import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import MainPage from './pages/MainPage';
import AuthPage from './pages/AuthPage';
import { useSelector } from 'react-redux';
import Layout from './Components/Layout';
import { RootState } from './redux/store';
import ApprovalRequestsPage from './pages/ApprovalRequestsPage';
import EmployeesPage from './pages/EmployeesPage';
import LeaveRequestsPage from './pages/LeaveRequestsPage';
import ManagersPage from './pages/ManagersPage';
import ProjectsPage from './pages/ProjectsPage';
import CreateUserPage from './pages/CreateUserPage';

function App() {
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);
  const role = useSelector((state: RootState) => state.auth.role);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route path='/approval-requests' index element={<ApprovalRequestsPage />} />
        <Route path='/employees' index element={<EmployeesPage />} />
        <Route path='/leave-requests' index element={<LeaveRequestsPage />} />
        <Route path='/managers' index element={<ManagersPage />} />
        <Route path='/projects' index element={<ProjectsPage />} />
        <Route path='/create-user' index element={<CreateUserPage />} />
      </Route>
      <Route path="/auth" element={isAuth ? <Navigate to="/" replace /> : <AuthPage />} />
    </Routes>
  );
}

export default App;
