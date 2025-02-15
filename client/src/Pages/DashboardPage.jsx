import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig"; // Firebase authentication
import Navbar from "../Components/NavBar";
import "./LandingPage.css";

const DashboardPage = () => {
  const navigate = useNavigate(); // Hook for navigation

  const handleLogout = () => {
    auth.signOut()
      .then(() => {
        console.log("User logged out");
        navigate("/"); // Redirect to Landing Page
      })
      .catch((error) => {
        console.error("Logout error:", error.message);
      });
  };

  return (
    <div className="landing-container">
      {/* Navbar */}
      <Navbar />

      {/* Logout Button */}
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default DashboardPage;
