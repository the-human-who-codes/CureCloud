import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import FontAwesomeIcon
import {
  faUserMd,
  faUser,
  faUsersCog,
  faStethoscope,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons"; // Import required icons
import { useNavigate } from "react-router-dom"; // Import useNavigate for routing

function RoleSelection() {
  const [selectedRole, setSelectedRole] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate(); // Create navigate function

  const roles = [
    {
      id: "doctor",
      title: "Doctor",
      icon: faUserMd,
      description:
        "Access patient records, manage appointments, and provide care",
      color: "bg-blue-50",
    },
    {
      id: "patient",
      title: "Patient",
      icon: faUser,
      description:
        "View your medical history, schedule appointments, and communicate with doctors",
      color: "bg-green-50",
    },
    {
      id: "admin",
      title: "Administrator",
      icon: faUsersCog,
      description: "Manage hospital operations, staff, and system settings",
      color: "bg-purple-50",
    },
    {
      id: "nurse", // New Nurse role
      title: "Nurse",
      icon: faStethoscope, // You can choose an appropriate icon
      description:
        "Assist doctors, monitor patient conditions, and provide care",
      color: "bg-teal-50",
    },
  ];

  const handleContinue = async () => {
    if (!selectedRole) return;

    setIsLoading(true);
    try {
      // Simulating a loading process
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Redirecting based on selected role
      navigate(`/${selectedRole}`); // This will navigate to the correct dashboard
    } catch (error) {
      console.error("Failed to set role:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8faff] to-[#e6eaff] relative overflow-hidden">
      <div className="absolute inset-0 bg-[#2c4ecf]/[0.02] mix-blend-multiply"></div>

      <div className="relative z-10 container mx-auto px-6 py-12">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="font-poppins text-3xl md:text-4xl font-bold text-[#2c4ecf] mb-4">
            Welcome to CureCloud
          </h1>
          <p className="font-poppins text-lg text-[#4a5568]/80">
            Please select how you&apos;ll be using CureCloud today
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto mb-8">
          {" "}
          {/* Updated to 4 columns */}
          {roles.map((role) => (
            <button
              key={role.id}
              onClick={() => setSelectedRole(role.id)}
              className={`p-6 rounded-2xl border-2 transition-all duration-200 text-left ${
                selectedRole === role.id
                  ? "border-[#2c4ecf] bg-white shadow-lg scale-105"
                  : "border-[#e1e8ff] bg-white/50 hover:bg-white hover:shadow-md"
              }`}
            >
              <div
                className={`w-12 h-12 ${role.color} rounded-full flex items-center justify-center mb-4`}
              >
                <FontAwesomeIcon
                  icon={role.icon}
                  className="text-[#2c4ecf] text-xl"
                />
              </div>
              <h3 className="font-poppins font-semibold text-lg text-[#2c4ecf] mb-2">
                {role.title}
              </h3>
              <p className="font-poppins text-sm text-[#4a5568]/80">
                {role.description}
              </p>
            </button>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={handleContinue}
            disabled={!selectedRole || isLoading}
            className={`px-8 py-4 bg-[#2c4ecf] text-white rounded-xl font-poppins transition-all duration-200 inline-flex items-center gap-3
              ${
                !selectedRole
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-[#1a3baf]"
              }
            `}
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Preparing your dashboard...</span>
              </>
            ) : (
              <>
                <span>
                  Continue as{" "}
                  {selectedRole
                    ? roles.find((r) => r.id === selectedRole)?.title
                    : "..."}
                </span>
                <FontAwesomeIcon icon={faArrowRight} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default RoleSelection;
