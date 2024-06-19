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
import CreateEmployeePage from './pages/CreatePages/CreateEmployeePage';
import LeaveRequestDetailsPage from './pages/DetailsPages/LeaveRequestDetailsPage';
import { UserType } from './types/User';
import UpdateLeaveRequestPage from './pages/UpdatePages/UpdateLeaveRequestPage';
import CreateLeaveRequestPage from './pages/CreatePages/CreateLeaveRequestPage';
import ProjectDetailsPage from './pages/DetailsPages/ProjectDetailsPage';
import UpdateProjectPage from './pages/UpdatePages/UpdateProjectPage';
import CreateProjectPage from './pages/CreatePages/CreateProjectPage';
import EditProjectEmployees from './pages/UpdatePages/UpdateProjectEmployees';
import UpdateEmployeePage from './pages/UpdatePages/UpdateEmployeePage';
import EmployeeDetailsPage from './pages/DetailsPages/EmployeeDetatilsPage';
import ManagerDetailsPage from './pages/DetailsPages/ManagerDetailsPage';
import CreateManagerPage from './pages/CreatePages/CreateManagerPage';
import UpdateManagerPage from './pages/UpdatePages/UpdateManagerPage';
import CreateAbsenceReason from './pages/CreatePages/CreateAbsenceReason';
import CreatePositionPage from './pages/CreatePages/CreatePositionPage';
import CreateSubdivisionPage from './pages/CreatePages/CreateSubdivisionPage';
import CreateProjectTypePage from './pages/CreatePages/CreateProjectTypePage';

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
                
        <Route path="/managers" element={<ProtectedRoute allowedRoles={[UserType.HrManager,UserType.Admin]} />}>
          <Route index element={<ManagersPage />} />
        </Route>
        <Route path="/manager/:id" element={<ProtectedRoute allowedRoles={[UserType.HrManager,UserType.Admin]} />}>
          <Route index element={<ManagerDetailsPage />} />
        </Route>
        <Route path="/create-manager" element={<ProtectedRoute allowedRoles={[UserType.HrManager,UserType.Admin]} />}>
          <Route index element={<CreateManagerPage />} />
        </Route>
        <Route path="/update-manager/:id" element={<ProtectedRoute allowedRoles={[UserType.HrManager,UserType.Admin]} />}>
          <Route index element={<UpdateManagerPage />} />
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

        <Route path="/create-absence-reason" element={<ProtectedRoute allowedRoles={[UserType.Admin, UserType.HrManager]}/>}>
          <Route index element={<CreateAbsenceReason />} />
        </Route>
        <Route path="/create-position" element={<ProtectedRoute allowedRoles={[UserType.Admin, UserType.HrManager]}/>}>
          <Route index element={<CreatePositionPage />} />
        </Route>
        <Route path="/create-subdivision" element={<ProtectedRoute allowedRoles={[UserType.Admin, UserType.HrManager]}/>}>
          <Route index element={<CreateSubdivisionPage />} />
        </Route>
        <Route path="/create-project-type" element={<ProtectedRoute allowedRoles={[UserType.Admin, UserType.ProjectManager]}/>}>
          <Route index element={<CreateProjectTypePage />} />
        </Route>



      </Route>
      
      <Route path="/" element={<Layout />}>
        <Route path="/auth" element={<AuthPage />} />
      </Route>
    </Routes>
  );
}

export default App;
