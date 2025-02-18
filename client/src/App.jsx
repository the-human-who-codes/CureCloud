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

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/doctor" element={<DoctorDashboard />} />
        <Route path="/medical-records" element={<MedicalRecords />} />
        <Route path="/nurse" element={<NurseDashboard />} />
        <Route path="/patient" element={<PatientDashboard />} />
        <Route path="/patient-records" element={<PatientRecords />} />
        <Route path="/prescriptions" element={<Prescriptions />} />
        <Route path="/role-selection" element={<RoleSelection />} />
        <Route path="/staff-sign-up" element={<StaffSignUp />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/prescription" element={<Prescription />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
