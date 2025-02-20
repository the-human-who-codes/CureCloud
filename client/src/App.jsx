import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

//Admin Dashboard
import AdminDashboard from "./Pages/AdminDashboard.jsx";
import UserManagement from "./Components/AdminDashboard/UserManagement.jsx";
import DepartmentSettings from "./Components/AdminDashboard/DepartmentSettings.jsx";
import AdminReports from "./Components/AdminDashboard/AdminReports.jsx";
import SystemSettings from "./Components/AdminDashboard/SystemSettings.jsx";

//Doctor Dashboard
import DoctorDashboard from "./Pages/DoctorDashboard.jsx";
import PatientRecords from "./Components/DoctorDashboard/PatientRecords.jsx";
import Appointments from "./Pages/AppointmentsPage.jsx";
import Prescriptions from "./Pages/Prescriptions.jsx";
import ReportsPage from "./Components/AdminDashboard/AdminReports.jsx";
import TeamChat from "./Components/TeamChat/TeamChat.jsx";

//Nurse Dashboard
import NurseDashboard from "./Pages/NurseDashboard.jsx";
import MyPatients from "./Components/NurseDashboard/MyPatients.jsx";
import Tasks from "./Components/NurseDashboard/Tasks.jsx";
import Medications from "./Components/NurseDashboard/Medications.jsx";

//Patient Dashboard
import PatientDashboard from "./Pages/PatientDashboard.jsx";
import MedicalRecords from "./Components/PatientDashboard/MedicalRecords.jsx";
import Messages from "./Components/PatientDashboard/Messages.jsx";

import LandingPage from "./Pages/LandingPage.jsx";
import RoleSelection from "./Pages/RoleSelection.jsx";
import StaffSignUp from "./Pages/StaffSignUp.jsx";
import NotificationsPage from "./Pages/NotificationsPage.jsx";
import ProfilePage from "./Pages/ProfilePage.jsx";
import SettingsPage from "./Pages/SettingsPage.jsx";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/role-selection" element={<RoleSelection />} />
        <Route path="/staff-sign-up" element={<StaffSignUp />} />

        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/user-management" element={<UserManagement />} />
        <Route
          path="/admin/department-settings"
          element={<DepartmentSettings />}
        />
        <Route path="/admin/reports" element={<AdminReports />} />
        <Route path="/admin/system-settings" element={<SystemSettings />} />

        {/* Doctor Routes */}
        <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
        <Route path="/doctor/patient-records" element={<PatientRecords />} />
        <Route path="/doctor/appointments" element={<Appointments />} />
        <Route path="/doctor/prescriptions" element={<Prescriptions />} />
        <Route path="/doctor/reports" element={<ReportsPage />} />
        <Route path="/doctor/settings" element={<SettingsPage />} />

        {/* Nurse Routes */}
        <Route path="/nurse/dashboard" element={<NurseDashboard />} />
        <Route path="/nurse/my-patients" element={<MyPatients />} />
        <Route path="/nurse/tasks" element={<Tasks />} />
        <Route path="/nurse/medications" element={<Medications />} />
        <Route path="/nurse/reports" element={<ReportsPage />} />
        <Route path="/nurse/team-chat" element={<TeamChat />} />
        <Route path="/nurse/settings" element={<SettingsPage />} />

        {/* Patient Routes */}
        <Route path="/patient/dashboard" element={<PatientDashboard />} />
        <Route path="/patient/appointments" element={<Appointments />} />
        <Route path="/patient/prescriptions" element={<Prescriptions />} />
        <Route path="/patient/medical-records" element={<MedicalRecords />} />
        <Route path="/patient/messages" element={<Messages />} />
        <Route path="/patient/settings" element={<SettingsPage />} />

        {/* General Routes */}
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
