import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Layouts
import AdminLayout from "./Layouts/AdminLayout";
import DoctorLayout from "./Layouts/DoctorLayout";
import NurseLayout from "./Layouts/NurseLayout";
import PatientLayout from "./Layouts/PatientLayout";

// Admin Pages
import AdminDashboard from "./Components/AdminDashboard/AdminDashboard";
import UserManagement from "./Components/AdminDashboard/UserManagement";
import DepartmentSettings from "./Components/AdminDashboard/DepartmentSettings";
import AdminReports from "./Components/AdminDashboard/AdminReports";
import SystemSettings from "./Components/AdminDashboard/SystemSettings";

// Doctor Pages
import DoctorDashboard from "./Components/DoctorDashboard/DoctorDashboard";
import PatientRecords from "./Components/DoctorDashboard/PatientRecords";
import AppointmentsPage from "./Pages/AppointmentsPage";
import Prescriptions from "./Pages/Prescriptions";
import ReportsPage from "./Components/DoctorDashboard/ReportsPage"; // Role-aware
import TeamChat from "./Components/TeamChat/TeamChat";

// Nurse Pages
import NurseDashboard from "./Components/NurseDashboard/NurseDashboard";
import MyPatients from "./Components/NurseDashboard/MyPatients";
import Tasks from "./Components/NurseDashboard/Tasks";
import Medications from "./Components/NurseDashboard/Medications";

// Patient Pages
import PatientDashboard from "./Components/PatientDashboard/PatientDashboard";
import MedicalRecords from "./Components/PatientDashboard/MedicalRecords";
import Messages from "./Components/PatientDashboard/Messages";
import PatientPrescriptions from "./Components/PatientDashboard/PatientPrescriptions";
import UpcomingAppointmentsCard from "./Components/PatientDashboard/UpcomingAppointmentsCard";

// General Pages
import LandingPage from "./Pages/LandingPage";
import RoleSelection from "./Pages/RoleSelection";
import StaffSignUp from "./Pages/StaffSignUp";
import Notifications from "./Components/Notifications/Notifications";
import Profile from "./Components/ProfilePage/Profile";
import Settings from "./Components/Settings/Settings"; // Role-aware

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/role-selection" element={<RoleSelection />} />
        <Route path="/staff-sign-up" element={<StaffSignUp />} />

        {/* Admin Dashboard */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index path="dashboard" element={<AdminDashboard />} />
          <Route path="user-management" element={<UserManagement />} />
          <Route path="department-settings" element={<DepartmentSettings />} />
          <Route path="reports" element={<AdminReports role="admin" />} />
          <Route path="system-settings" element={<SystemSettings />} />
          <Route path="settings" element={<Settings role="admin" />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="team-chat" element={<TeamChat />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        {/* Doctor Dashboard */}
        <Route path="/doctor" element={<DoctorLayout />}>
          <Route index path="dashboard" element={<DoctorDashboard />} />
          <Route path="patient-records" element={<PatientRecords />} />
          <Route
            path="appointments"
            element={<AppointmentsPage role="doctor" />}
          />
          <Route path="prescriptions" element={<Prescriptions />} />
          <Route path="reports" element={<ReportsPage role="doctor" />} />
          <Route path="team-chat" element={<TeamChat />} />
          <Route path="settings" element={<Settings role="doctor" />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        {/* Nurse Dashboard */}
        <Route path="/nurse" element={<NurseLayout />}>
          <Route index path="dashboard" element={<NurseDashboard />} />
          <Route path="my-patients" element={<MyPatients />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="medications" element={<Medications />} />
          <Route path="reports" element={<ReportsPage role="nurse" />} />
          <Route path="team-chat" element={<TeamChat />} />
          <Route path="settings" element={<Settings role="nurse" />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        {/* Patient Dashboard */}
        <Route path="/patient" element={<PatientLayout />}>
          <Route index path="dashboard" element={<PatientDashboard />} />
          <Route path="appointments" element={<UpcomingAppointmentsCard />} />
          <Route path="prescriptions" element={<PatientPrescriptions />} />
          <Route path="medical-records" element={<MedicalRecords />} />
          <Route path="messages" element={<Messages />} />
          <Route path="settings" element={<Settings role="patient" />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
