// RoleSelection.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RoleCard from "../Components/RoleSelection/RoleCard";
import ContinueButton from "../Components/RoleSelection/ContinueButton";

import {
  faUserMd,
  faUser,
  faUsersCog,
  faStethoscope,
} from "@fortawesome/free-solid-svg-icons";

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
    id: "nurse",
    title: "Nurse",
    icon: faStethoscope,
    description: "Assist doctors, monitor patient conditions, and provide care",
    color: "bg-teal-50",
  },
];

function RoleSelection() {
  const [selectedRole, setSelectedRole] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleContinue = async () => {
    if (!selectedRole) return;

    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      navigate(`/${selectedRole}/dashboard`);
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
          {roles.map((role) => (
            <RoleCard
              key={role.id}
              role={role}
              isSelected={selectedRole === role.id}
              onClick={() => setSelectedRole(role.id)}
            />
          ))}
        </div>

        <div className="text-center">
          <ContinueButton
            selectedRole={selectedRole}
            isLoading={isLoading}
            onClick={handleContinue}
            roles={roles}
          />
        </div>
      </div>
    </div>
  );
}

export default RoleSelection;
