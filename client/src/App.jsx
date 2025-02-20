import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminDashboard from "./Pages/AdminDashboard.jsx";
import Appointments from "./Pages/AppointmentsPage.jsx";
import DoctorDashboard from "./Pages/DoctorDashboard.jsx";
import LandingPage from "./Pages/LandingPage.jsx";
import MedicalRecords from "./Pages/MedicalRecords.jsx";
import NurseDashboard from "./Pages/NurseDashboard.jsx";
import PatientDashboard from "./Pages/PatientDashboard.jsx";
import PatientRecords from "./Pages/PatientRecords.jsx";
import Prescriptions from "./Pages/Prescriptions.jsx";
import RoleSelection from "./Pages/RoleSelection.jsx";
import StaffSignUp from "./Pages/StaffSignUp.jsx";
import NotificationsPage from "./Pages/NotificationsPage.jsx";
import Prescription from "./Pages/Prescriptions.jsx";
import ProfilePage from "./Pages/ProfilePage.jsx";
import SettingsPage from "./Pages/SettingsPage.jsx";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/nurse/prescription" element={<Prescription />} />
        <Route path="/medical-records" element={<MedicalRecords />} />
        <Route path="/nurse/dashboard" element={<NurseDashboard />} />
        <Route path="/patient/dashboard" element={<PatientDashboard />} />
        <Route path="/patient-records" element={<PatientRecords />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/patient/prescriptions" element={<Prescriptions />} />
        <Route path="/role-selection" element={<RoleSelection />} />
        <Route path="/staff-sign-up" element={<StaffSignUp />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
