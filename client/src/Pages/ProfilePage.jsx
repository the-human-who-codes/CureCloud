"use client";
import { useState } from "react";
import Header from "../Components/Header/Header";
import Sidebar from "../Components/Sidebar";

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
            <div className="bg-white rounded-xl shadow-sm border border-[#e1e8ff] p-8 mb-8">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                <img
                  src={profileData.image}
                  alt="Dr. Sarah Connor"
                  className="w-48 h-48 rounded-full object-cover border-4 border-[#e1e8ff]"
                />
                <div className="flex-1 text-center md:text-left">
                  <h1 className="font-poppins text-3xl font-bold text-[#2c4ecf] mb-2">
                    {profileData.name}
                  </h1>
                  <p className="font-poppins text-xl text-[#4a5568] mb-4">
                    {profileData.title}
                  </p>
                  <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                    <button className="px-6 py-3 bg-[#2c4ecf] text-white rounded-lg font-poppins hover:bg-[#1a3baf] transition-colors duration-200">
                      <i className="fas fa-edit mr-2"></i>Edit Profile
                    </button>
                    <button className="px-6 py-3 bg-[#f8faff] text-[#2c4ecf] rounded-lg font-poppins hover:bg-[#e1e8ff] transition-colors duration-200">
                      <i className="fas fa-key mr-2"></i>Change Password
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-8">
                <div className="bg-white rounded-xl shadow-sm border border-[#e1e8ff] p-6">
                  <h2 className="font-poppins text-xl font-semibold text-[#2c4ecf] mb-6">
                    <i className="fas fa-user-md mr-2"></i>Professional
                    Information
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <p className="font-poppins text-sm text-[#4a5568]">
                        Medical License
                      </p>
                      <p className="font-poppins text-lg">
                        {profileData.license}
                      </p>
                    </div>
                    <div>
                      <p className="font-poppins text-sm text-[#4a5568]">
                        Specialization
                      </p>
                      <p className="font-poppins text-lg">
                        {profileData.specialization}
                      </p>
                    </div>
                    <div>
                      <p className="font-poppins text-sm text-[#4a5568]">
                        Experience
                      </p>
                      <p className="font-poppins text-lg">
                        {profileData.experience}
                      </p>
                    </div>
                    <div>
                      <p className="font-poppins text-sm text-[#4a5568]">
                        Education
                      </p>
                      {profileData.education.map((edu, index) => (
                        <div key={index} className="mt-2">
                          <p className="font-poppins text-lg">{edu.degree}</p>
                          <p className="font-poppins text-sm text-[#4a5568]">
                            {edu.institution}, {edu.year}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-[#e1e8ff] p-6">
                  <h2 className="font-poppins text-xl font-semibold text-[#2c4ecf] mb-6">
                    <i className="fas fa-address-card mr-2"></i>Contact
                    Information
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <p className="font-poppins text-sm text-[#4a5568]">
                        Email
                      </p>
                      <p className="font-poppins text-lg">
                        {profileData.email}
                      </p>
                    </div>
                    <div>
                      <p className="font-poppins text-sm text-[#4a5568]">
                        Phone
                      </p>
                      <p className="font-poppins text-lg">
                        {profileData.phone}
                      </p>
                    </div>
                    <div>
                      <p className="font-poppins text-sm text-[#4a5568]">
                        Office Location
                      </p>
                      <p className="font-poppins text-lg">
                        {profileData.office}
                      </p>
                    </div>
                    <div>
                      <p className="font-poppins text-sm text-[#4a5568]">
                        Emergency Contact
                      </p>
                      <p className="font-poppins text-lg">
                        {profileData.emergency.name}
                      </p>
                      <p className="font-poppins text-sm text-[#4a5568]">
                        {profileData.emergency.relation} •{" "}
                        {profileData.emergency.phone}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-[#e1e8ff] p-6">
                <h2 className="font-poppins text-xl font-semibold text-[#2c4ecf] mb-6">
                  <i className="fas fa-clock mr-2"></i>Schedule Overview
                </h2>
                <div className="space-y-6">
                  <div>
                    <p className="font-poppins text-sm text-[#4a5568]">
                      Working Hours
                    </p>
                    <p className="font-poppins text-lg">
                      {profileData.schedule.workingHours}
                    </p>
                  </div>
                  <div>
                    <p className="font-poppins text-sm text-[#4a5568]">
                      Available Time Slots
                    </p>
                    {profileData.schedule.availableSlots.map((slot, index) => (
                      <p key={index} className="font-poppins text-lg mt-2">
                        {slot}
                      </p>
                    ))}
                  </div>
                  <div>
                    <p className="font-poppins text-sm text-[#4a5568]">
                      Preferred Appointment Duration
                    </p>
                    <p className="font-poppins text-lg">
                      {profileData.schedule.appointmentDuration}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
