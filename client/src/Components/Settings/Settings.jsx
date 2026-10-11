import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faKey,
  faShieldAlt,
  faHistory,
  faSun,
  faMoon,
} from "@fortawesome/free-solid-svg-icons";
import { PageShell } from "../common/PageShell";
import { ActionList } from "../common/QuickActions";
import { Card, SectionTitle } from "../common/Card";

const SECURITY_ACTIONS = [
  { name: "Change Password", icon: faKey },
  { name: "Enable Two-Factor Authentication", icon: faShieldAlt },
  { name: "View Login History", icon: faHistory },
];

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

  return (
    <PageShell>
      <h1 className="font-poppins text-2xl font-bold text-primary mb-8">
        Settings
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-8">
          <Card>
            <SectionTitle className="mb-6">General Settings</SectionTitle>

            <div className="space-y-6">
              <div>
                <h3 className="font-poppins text-ink font-medium mb-4">
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
                        className="w-4 h-4 text-primary border-line rounded focus:ring-primary"
                      />
                      <label
                        htmlFor={key}
                        className="ml-2 font-poppins text-ink"
                      >
                        {key.charAt(0).toUpperCase() + key.slice(1)}{" "}
                        Notifications
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-poppins text-ink font-medium mb-4">
                  Language Settings
                </h3>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full p-3 border border-line rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                </select>
              </div>

              <div>
                <h3 className="font-poppins text-ink font-medium mb-4">
                  Time Zone Settings
                </h3>
                <select
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  className="w-full p-3 border border-line rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="UTC-5">Eastern Time (UTC-5)</option>
                  <option value="UTC-6">Central Time (UTC-6)</option>
                  <option value="UTC-7">Mountain Time (UTC-7)</option>
                  <option value="UTC-8">Pacific Time (UTC-8)</option>
                </select>
              </div>
            </div>
          </Card>

          <Card>
            <SectionTitle className="mb-6">Security Settings</SectionTitle>

            <ActionList className="space-y-6" actions={SECURITY_ACTIONS} />
          </Card>
        </div>

        <div>
          <Card>
            <SectionTitle className="mb-6">System Preferences</SectionTitle>

            <div className="space-y-6">
              <div>
                <h3 className="font-poppins text-ink font-medium mb-4">
                  Theme Settings
                </h3>
                <div className="flex gap-4">
                  {["light", "dark"].map((themeOption) => (
                    <button
                      key={themeOption}
                      onClick={() => setTheme(themeOption)}
                      className={`flex-1 px-4 py-3 rounded-lg font-poppins ${
                        theme === themeOption
                          ? "bg-primary text-white"
                          : "bg-surface text-ink hover:bg-line"
                      } transition-colors duration-200`}
                    >
                      <FontAwesomeIcon
                        icon={themeOption === "light" ? faSun : faMoon}
                        className="mr-2"
                      />
                      {themeOption.charAt(0).toUpperCase() +
                        themeOption.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-poppins text-ink font-medium mb-4">
                  Calendar Preferences
                </h3>
                <select
                  value={calendarView}
                  onChange={(e) => setCalendarView(e.target.value)}
                  className="w-full p-3 border border-line rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="day">Daily View</option>
                  <option value="week">Weekly View</option>
                  <option value="month">Monthly View</option>
                </select>
              </div>

              <div>
                <h3 className="font-poppins text-ink font-medium mb-4">
                  Default View Settings
                </h3>
                <select
                  value={defaultView}
                  onChange={(e) => setDefaultView(e.target.value)}
                  className="w-full p-3 border border-line rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="grid">Grid View</option>
                  <option value="list">List View</option>
                  <option value="table">Table View</option>
                </select>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </PageShell>
  );
}

export default SettingsPage;
