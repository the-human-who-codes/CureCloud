import Header from "../Components/Header/Header";
import Sidebar from "../Components/Sidebar";
import { useState } from "react";

function SettingsPage() {
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    app: true,
  });
  const [language, setLanguage] = useState("en");
  const [timezone, setTimezone] = useState("UTC-5");
  const [theme, setTheme] = useState("light");
  const [calendarView, setCalendarView] = useState("week");
  const [defaultView, setDefaultView] = useState("grid");

  const handleSearch = (term) => {
    // Handle search functionality if needed
  };

  return (
    <div className="flex h-screen bg-[#f8faff]">
      <Sidebar activePage="Settings" />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onSearch={handleSearch} notificationCount={3} />

        <div className="flex-1 overflow-y-auto px-6 py-8">
          <div className="max-w-[1920px] mx-auto">
            <h1 className="font-poppins text-2xl font-bold text-[#2c4ecf] mb-8">
              Settings
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-8">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-[#e1e8ff]">
                  <h2 className="font-poppins text-xl font-semibold text-[#2c4ecf] mb-6">
                    General Settings
                  </h2>

                  <div className="space-y-6">
                    <div>
                      <h3 className="font-poppins text-[#4a5568] font-medium mb-4">
                        Notification Preferences
                      </h3>
                      <div className="space-y-3">
                        {Object.entries(notifications).map(([key, value]) => (
                          <div key={key} className="flex items-center">
                            <input
                              type="checkbox"
                              id={key}
                              checked={value}
                              onChange={(e) =>
                                setNotifications((prev) => ({
                                  ...prev,
                                  [key]: e.target.checked,
                                }))
                              }
                              className="w-4 h-4 text-[#2c4ecf] border-[#e1e8ff] rounded focus:ring-[#2c4ecf]"
                            />
                            <label
                              htmlFor={key}
                              className="ml-2 font-poppins text-[#4a5568]"
                            >
                              {key.charAt(0).toUpperCase() + key.slice(1)}{" "}
                              Notifications
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-poppins text-[#4a5568] font-medium mb-4">
                        Language Settings
                      </h3>
                      <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="w-full p-3 border border-[#e1e8ff] rounded-lg focus:ring-2 focus:ring-[#2c4ecf] focus:border-transparent"
                      >
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                      </select>
                    </div>

                    <div>
                      <h3 className="font-poppins text-[#4a5568] font-medium mb-4">
                        Time Zone Settings
                      </h3>
                      <select
                        value={timezone}
                        onChange={(e) => setTimezone(e.target.value)}
                        className="w-full p-3 border border-[#e1e8ff] rounded-lg focus:ring-2 focus:ring-[#2c4ecf] focus:border-transparent"
                      >
                        <option value="UTC-5">Eastern Time (UTC-5)</option>
                        <option value="UTC-6">Central Time (UTC-6)</option>
                        <option value="UTC-7">Mountain Time (UTC-7)</option>
                        <option value="UTC-8">Pacific Time (UTC-8)</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-[#e1e8ff]">
                  <h2 className="font-poppins text-xl font-semibold text-[#2c4ecf] mb-6">
                    Security Settings
                  </h2>

                  <div className="space-y-6">
                    <button className="w-full px-4 py-3 bg-[#f8faff] text-[#2c4ecf] rounded-lg font-poppins hover:bg-[#e1e8ff] transition-colors duration-200 flex items-center">
                      <i className="fas fa-key mr-2"></i>
                      Change Password
                    </button>

                    <button className="w-full px-4 py-3 bg-[#f8faff] text-[#2c4ecf] rounded-lg font-poppins hover:bg-[#e1e8ff] transition-colors duration-200 flex items-center">
                      <i className="fas fa-shield-alt mr-2"></i>
                      Enable Two-Factor Authentication
                    </button>

                    <button className="w-full px-4 py-3 bg-[#f8faff] text-[#2c4ecf] rounded-lg font-poppins hover:bg-[#e1e8ff] transition-colors duration-200 flex items-center">
                      <i className="fas fa-history mr-2"></i>
                      View Login History
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <div className="bg-white rounded-xl p-6 shadow-sm border border-[#e1e8ff]">
                  <h2 className="font-poppins text-xl font-semibold text-[#2c4ecf] mb-6">
                    System Preferences
                  </h2>

                  <div className="space-y-6">
                    <div>
                      <h3 className="font-poppins text-[#4a5568] font-medium mb-4">
                        Theme Settings
                      </h3>
                      <div className="flex gap-4">
                        {["light", "dark"].map((themeOption) => (
                          <button
                            key={themeOption}
                            onClick={() => setTheme(themeOption)}
                            className={`flex-1 px-4 py-3 rounded-lg font-poppins ${
                              theme === themeOption
                                ? "bg-[#2c4ecf] text-white"
                                : "bg-[#f8faff] text-[#4a5568] hover:bg-[#e1e8ff]"
                            } transition-colors duration-200`}
                          >
                            <i
                              className={`fas fa-${
                                themeOption === "light" ? "sun" : "moon"
                              } mr-2`}
                            ></i>
                            {themeOption.charAt(0).toUpperCase() +
                              themeOption.slice(1)}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-poppins text-[#4a5568] font-medium mb-4">
                        Calendar Preferences
                      </h3>
                      <select
                        value={calendarView}
                        onChange={(e) => setCalendarView(e.target.value)}
                        className="w-full p-3 border border-[#e1e8ff] rounded-lg focus:ring-2 focus:ring-[#2c4ecf] focus:border-transparent"
                      >
                        <option value="day">Daily View</option>
                        <option value="week">Weekly View</option>
                        <option value="month">Monthly View</option>
                      </select>
                    </div>

                    <div>
                      <h3 className="font-poppins text-[#4a5568] font-medium mb-4">
                        Default View Settings
                      </h3>
                      <select
                        value={defaultView}
                        onChange={(e) => setDefaultView(e.target.value)}
                        className="w-full p-3 border border-[#e1e8ff] rounded-lg focus:ring-2 focus:ring-[#2c4ecf] focus:border-transparent"
                      >
                        <option value="grid">Grid View</option>
                        <option value="list">List View</option>
                        <option value="table">Table View</option>
                      </select>
                    </div>
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

export default SettingsPage;
