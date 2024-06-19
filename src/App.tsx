import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import AuthPage from './pages/AuthPage';
import { Layout, AuthLayout, ProtectedRoute } from './Components/Layout';
import ApprovalRequestsPage from './pages/ApprovalRequestsPage';
import EmployeesPage from './pages/EmployeesPage';
import LeaveRequestsPage from './pages/LeaveRequestsPage';
import ManagersPage from './pages/ManagersPage';
import ProjectsPage from './pages/ProjectsPage';
import CreateEmployeePage from './pages/CreateEmployeePage';
import LeaveRequestDetailsPage from './pages/LeaveRequestDetailsPage';
import { UserType } from './types/User';
import UpdateLeaveRequestPage from './pages/UpdateLeaveRequestPage';
import CreateLeaveRequestPage from './pages/CreateLeaveRequestPage';
import ProjectDetailsPage from './pages/ProjectDetailsPage';
import UpdateProjectPage from './pages/UpdateProjectPage';
import CreateProjectPage from './pages/CreateProjectPage';
import EditProjectEmployees from './pages/EditProjectEmployees';
import UpdateEmployeePage from './pages/UpdateEmployeePage';
import EmployeeDetailsPage from './pages/EmployeeDetatilsPage';

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
        <Route path="/employee/:id" element={<ProtectedRoute allowedRoles={[UserType.Admin, UserType.HrManager, UserType.ProjectManager]} />}>
          <Route index element={<EmployeeDetailsPage />} />
        </Route>
        <Route path="/update-employee/:id" element={<ProtectedRoute allowedRoles={[UserType.Admin, UserType.HrManager, UserType.ProjectManager]} />}>
          <Route index element={<UpdateEmployeePage />} />
        </Route>
        <Route path="/create-employee" element={<ProtectedRoute allowedRoles={[UserType.Admin, UserType.HrManager]} />}>
          <Route index element={<CreateEmployeePage />} />
        </Route>
                
        <Route path="/managers" element={<ProtectedRoute allowedRoles={[UserType.Admin]} />}>
          <Route index element={<ManagersPage />} />
        </Route>
        
        <Route path="/projects" element={<ProtectedRoute allowedRoles={[UserType.Admin, UserType.ProjectManager, UserType.HrManager, UserType.Employee]} />}>
          <Route index element={<ProjectsPage />} />
        </Route>
        <Route path="/project/:id" element={<ProtectedRoute allowedRoles={[UserType.Admin, UserType.HrManager, UserType.Employee, UserType.ProjectManager]}/>}>
          <Route index element={<ProjectDetailsPage />} />
        </Route>
        <Route path="/update-project/:id" element={<ProtectedRoute allowedRoles={[UserType.Admin, UserType.ProjectManager]}/>}>
          <Route index element={<UpdateProjectPage />} />
        </Route>
        <Route path="/create-project" element={<ProtectedRoute allowedRoles={[UserType.Admin, UserType.ProjectManager]}/>}>
          <Route index element={<CreateProjectPage />} />
        </Route>
        <Route path="/project-add-employees/:id" element={<ProtectedRoute allowedRoles={[UserType.Admin, UserType.ProjectManager]}/>}>
          <Route index element={<EditProjectEmployees />} />
        </Route>
        
        

        <Route path="/leave-requests" element={<ProtectedRoute allowedRoles={[UserType.Admin, UserType.HrManager, UserType.Employee, UserType.ProjectManager]} />}>
          <Route index element={<LeaveRequestsPage />} />
        </Route>
        <Route path="/leave-request-details/:id" element={<ProtectedRoute allowedRoles={[UserType.Admin, UserType.HrManager, UserType.Employee, UserType.ProjectManager]}/>}>
          <Route index element={<LeaveRequestDetailsPage />} />
        </Route>
        <Route path="/update-leave-request/:id" element={<ProtectedRoute allowedRoles={[UserType.Employee]}/>}>
          <Route index element={<UpdateLeaveRequestPage />} />
        </Route>
        <Route path="/create-leave-request" element={<ProtectedRoute allowedRoles={[UserType.Employee]}/>}>
          <Route index element={<CreateLeaveRequestPage />} />
        </Route>
      </Route>
      
      <Route path="/" element={<Layout />}>
        <Route path="/auth" element={<AuthPage />} />
      </Route>
    </Routes>
  );
}

export default App;
