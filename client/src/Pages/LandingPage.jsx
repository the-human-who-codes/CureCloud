"use client"; // For Vite
import { useState } from "react"; // Import useState for handling loading state
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import FontAwesomeIcon component
import { faHeartbeat } from "@fortawesome/free-solid-svg-icons"; // Import heartbeat icon
import { faGoogle } from "@fortawesome/free-brands-svg-icons"; // Import Google brand icon
import { useNavigate } from "react-router-dom"; // Import useNavigate
import doctors from "../assets/doctors.jpg";
// LandingPage Component
function LandingPage() {
  const [isLoading, setIsLoading] = useState(false); // State for managing the loading spinner
  const navigate = useNavigate(); // Initialize navigate function

  // Handle the login (button click) action
  const handleLogin = async () => {
    setIsLoading(true); // Set loading to true when login starts
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate a login delay
      navigate("/role-selection"); // Navigate to RoleSelection page after "successful" login
    } catch (error) {
      console.error("Login failed:", error); // Log error if login fails
      setIsLoading(false); // Reset loading state if error occurs
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8faff] to-[#e6eaff] relative overflow-hidden">
      {/* Overlay background effect */}
      <div className="absolute inset-0 bg-[#2c4ecf]/[0.02] mix-blend-multiply"></div>

      {/* Main content container */}
      <div className="relative z-10 container mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-center min-h-screen">
        {/* Left content section */}
        <div className="md:w-1/2 text-center md:text-left mb-12 md:mb-0">
          <div className="max-w-md mx-auto md:mx-0">
            <div className="mb-8">
              {/* Icon for visual interest */}
              <div className="w-16 h-16 bg-[#2c4ecf]/10 rounded-full flex items-center justify-center mx-auto md:mx-0 mb-6">
                <FontAwesomeIcon
                  icon={faHeartbeat}
                  className="text-2xl text-[#2c4ecf]"
                />
              </div>
              {/* Heading */}
              <h1 className="font-poppins text-4xl md:text-5xl font-bold text-[#2c4ecf] mb-4">
                Welcome to CureCloud
              </h1>
              {/* Subheading */}
              <p className="font-poppins text-xl text-[#4a5568]/80">
                Your Health, Our Priority
              </p>
            </div>

            {/* Sign-in box */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#e1e8ff]">
              <p className="font-poppins text-[#4a5568] mb-6 text-center">
                Sign in to access your healthcare dashboard
              </p>
              {/* Sign in button */}
              <button
                onClick={handleLogin} // Trigger handleLogin on click
                disabled={isLoading} // Disable button if loading
                className="w-full px-6 py-4 bg-[#2c4ecf]/90 text-white rounded-xl font-poppins hover:bg-[#2c4ecf] transition-colors duration-200 flex items-center justify-center gap-3 shadow-sm hover:shadow-md"
              >
                {/* Spinner if loading */}
                {isLoading ? (
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Connecting...</span>
                  </div>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faGoogle} className="text-lg" />
                    <span>Continue with Google</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Right content section (Image + Decorative SVG) */}
        <div className="md:w-1/2 flex justify-center items-center">
          <div className="relative w-full max-w-lg">
            {/* Decorative blurred circles */}
            <div className="absolute top-0 left-0 w-40 h-40 bg-[#2c4ecf]/5 rounded-full filter blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-[#2c4ecf]/5 rounded-full filter blur-3xl"></div>
            {/* Decorative SVG path */}
            <svg
              viewBox="0 0 400 300"
              className="w-full h-auto relative z-10 text-[#2c4ecf]"
            >
              <path
                fill="currentColor"
                fillOpacity="0.1"
                d="M156.4,339.5c31.8-2.5,59.4-26.8,80.2-48.5c28.3-29.5,40.5-47,56.1-85.1c14-34.3,20.7-75.6,2.3-111  c-18.1-34.8-55.7-58-90.4-72.3c-11.7-4.8-24.1-8.8-36.8-11.5l-0.9-0.9l-0.6,0.6c-27.7-5.8-56.6-6-82.4,3c-38.8,13.6-64,48.8-66.8,90.3c-3,43.9,17.8,88.3,33.7,128.8c5.3,13.5,10.4,27.1,14.9,40.9C77.5,309.9,111,343,156.4,339.5z"
              />
            </svg>
            {/* Image of healthcare professionals */}
            {/* <img
              src={doctors}
              alt="Healthcare professionals working together to provide patient care"
              className="absolute inset-0 w-full h-full object-contain z-20 "
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
