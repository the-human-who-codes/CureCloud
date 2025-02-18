"use client";
import { useState } from "react";
import Header from "../Components/Header/Header";
import Sidebar from "../Components/Sidebar";
import ContactInformationSection from "../Components/ProfilePage/ContactInformationSection";
import ProfessionalInformationSection from "../Components/ProfilePage/ProfessionalInformationSection";
import ProfileCard from "../Components/ProfilePage/ProfileCard";
import ScheduleOverview from "../Components/ProfilePage/ScheduleOverview";

function ProfilePage() {
  const [searchTerm, setSearchTerm] = useState("");

  const profileData = {
    name: "Dr. Sarah Connor",
    title: "Senior Cardiologist",
    image: "/default-avatar.png",
    license: "ML123456789",
    specialization: "Cardiology",
    experience: "15 years",
    education: [
      {
        degree: "MD in Cardiology",
        institution: "Harvard Medical School",
        year: "2010",
      },
      {
        degree: "MBBS",
        institution: "Johns Hopkins University",
        year: "2005",
      },
    ],
    email: "sarah.connor@curecloud.com",
    phone: "+1 (555) 123-4567",
    office: "Building A, Floor 3, Room 302",
    emergency: {
      name: "John Connor",
      relation: "Son",
      phone: "+1 (555) 987-6543",
    },
    schedule: {
      workingHours: "Mon-Fri, 9:00 AM - 5:00 PM",
      appointmentDuration: "30 minutes",
      availableSlots: [
        "Morning: 9:00 AM - 12:00 PM",
        "Afternoon: 2:00 PM - 5:00 PM",
      ],
    },
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div className="flex h-screen bg-[#f8faff]">
      <Sidebar activePage="Profile" />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onSearch={handleSearch} />

        <div className="flex-1 overflow-y-auto px-6 py-8">
          <div className="max-w-[1920px] mx-auto">
            <ProfileCard profileData={profileData} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-8">
                {/* professional info */}
                <ProfessionalInformationSection profileData={profileData} />
                {/* personal contact info */}
                <ContactInformationSection profileData={profileData} />
                {console.log(profileData)}
              </div>
              <ScheduleOverview profileData={profileData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
