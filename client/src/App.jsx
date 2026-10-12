import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Layouts
import DashboardLayout from "./Layouts/DashboardLayout";

// Admin Pages
import AdminDashboard from "./Components/AdminDashboard/AdminDashboard";
import UserManagement from "./Components/AdminDashboard/UserManagement";
import DepartmentSettings from "./Components/AdminDashboard/DepartmentSettings";
import AdminPatients from "./Components/AdminDashboard/AdminPatients";
import SystemSettings from "./Components/AdminDashboard/SystemSettings";

// Doctor Pages
import DoctorDashboard from "./Components/DoctorDashboard/DoctorDashboard";
import PatientRecords from "./Components/DoctorDashboard/PatientRecords";
import AppointmentsPage from "./Pages/AppointmentsPage";
import Prescriptions from "./Pages/Prescriptions";
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
import StaffSignUp from "./Pages/StaffSignUp";
import Notifications from "./Components/Notifications/Notifications";
import Profile from "./Components/ProfilePage/Profile";
import Settings from "./Components/Settings/Settings";
import ReportsPage from "./Components/Reports/ReportsPage"; // Role-aware

// Auth
import { AuthProvider } from "./auth/AuthProvider";
import RequireRole from "./auth/RequireRole";

const AppRouter = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/staff-sign-up" element={<StaffSignUp />} />
          <Route path="/dashboard" element={<RequireRole />} />

          {/* Admin Dashboard */}
          <Route
            path="/admin"
            element={
              <RequireRole role="admin">
                <DashboardLayout role="admin" />
              </RequireRole>
            }
          >
            <Route index path="dashboard" element={<AdminDashboard />} />
            <Route path="user-management" element={<UserManagement />} />
            <Route
              path="department-settings"
              element={<DepartmentSettings />}
            />
            <Route path="reports" element={<ReportsPage />} />
            <Route path="patients" element={<AdminPatients />} />
            <Route path="system-settings" element={<SystemSettings />} />
            <Route path="settings" element={<Settings />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="team-chat" element={<TeamChat />} />
            <Route path="profile" element={<Profile />} />
          </Route>

          {/* Doctor Dashboard */}
          <Route
            path="/doctor"
            element={
              <RequireRole role="doctor">
                <DashboardLayout role="doctor" />
              </RequireRole>
            }
          >
            <Route index path="dashboard" element={<DoctorDashboard />} />
            <Route path="patient-records" element={<PatientRecords />} />
            <Route path="appointments" element={<AppointmentsPage />} />
            <Route path="prescriptions" element={<Prescriptions />} />
            <Route path="reports" element={<ReportsPage />} />
            <Route path="team-chat" element={<TeamChat />} />
            <Route path="settings" element={<Settings />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="profile" element={<Profile />} />
          </Route>

          {/* Nurse Dashboard */}
          <Route
            path="/nurse"
            element={
              <RequireRole role="nurse">
                <DashboardLayout role="nurse" />
              </RequireRole>
            }
          >
            <Route index path="dashboard" element={<NurseDashboard />} />
            <Route path="my-patients" element={<MyPatients />} />
            <Route path="tasks" element={<Tasks />} />
            <Route path="medications" element={<Medications />} />
            <Route path="reports" element={<ReportsPage />} />
            <Route path="team-chat" element={<TeamChat />} />
            <Route path="settings" element={<Settings />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="profile" element={<Profile />} />
          </Route>

          {/* Patient Dashboard */}
          <Route
            path="/patient"
            element={
              <RequireRole role="patient">
                <DashboardLayout role="patient" />
              </RequireRole>
            }
          >
            <Route index path="dashboard" element={<PatientDashboard />} />
            <Route path="appointments" element={<UpcomingAppointmentsCard />} />
            <Route path="prescriptions" element={<PatientPrescriptions />} />
            <Route path="medical-records" element={<MedicalRecords />} />
            <Route path="messages" element={<Messages />} />
            <Route path="settings" element={<Settings />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default AppRouter;
