import React from 'react';
import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import MainPage from './pages/MainPage';
import AuthPage from './pages/AuthPage';
import { useSelector } from 'react-redux';
import { Layout, AuthLayout, ProtectedRoute } from './Components/Layout';
import { RootState } from './redux/store';
import ApprovalRequestsPage from './pages/ApprovalRequestsPage';
import EmployeesPage from './pages/EmployeesPage';
import LeaveRequestsPage from './pages/LeaveRequestsPage';
import ManagersPage from './pages/ManagersPage';
import ProjectsPage from './pages/ProjectsPage';
import CreateUserPage from './pages/CreateUserPage';
import { UserType } from './types/User';

function App() {
  
  return (
    <Routes>
      <Route path="/" element={<AuthLayout />}>
        <Route index element={<MainPage />} />
        
        <Route path="/approval-requests" element={<ProtectedRoute allowedRoles={[UserType.Admin, UserType.HrManager, UserType.ProjectManager, UserType.Employee]} />}>
          <Route index element={<ApprovalRequestsPage />} />
        </Route>
        
        <Route path="/employees" element={<ProtectedRoute allowedRoles={[UserType.Admin, UserType.HrManager, UserType.ProjectManager]} />}>
          <Route index element={<EmployeesPage />} />
        </Route>
        
        <Route path="/leave-requests" element={<ProtectedRoute allowedRoles={[UserType.Admin, UserType.HrManager, UserType.Employee, UserType.ProjectManager]} />}>
          <Route index element={<LeaveRequestsPage />} />
        </Route>
        
        <Route path="/managers" element={<ProtectedRoute allowedRoles={[UserType.Admin]} />}>
          <Route index element={<ManagersPage />} />
        </Route>
        
        <Route path="/projects" element={<ProtectedRoute allowedRoles={[UserType.Admin, UserType.ProjectManager, UserType.HrManager, UserType.Employee]} />}>
          <Route index element={<ProjectsPage />} />
        </Route>
        
        <Route path="/create-user" element={<ProtectedRoute allowedRoles={[UserType.Admin]} />}>
          <Route index element={<CreateUserPage />} />
        </Route>
      </Route>
      
      <Route path="/" element={<Layout />}>
        <Route path="/auth" element={<AuthPage />} />
      </Route>
    </Routes>
  );
}

export default App;
