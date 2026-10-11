import {
  faBell,
  faCog,
  faDatabase,
  faExclamationTriangle,
  faFileAlt,
  faFileMedical,
  faFlask,
  faNotesMedical,
  faPlug,
  faPrescriptionBottleAlt,
  faShieldAlt,
  faSync,
  faTools,
  faXRay,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

function SystemSettings() {
  const [activeTab, setActiveTab] = useState("general");
  const [saving, setSaving] = useState(false);

  const mockSystemInfo = {
    version: "2.5.0",
    lastUpdate: "2024-02-15",
    serverStatus: "Operational",
    storageUsed: "756.4 GB",
    totalStorage: "1 TB",
    activeUsers: 234,
    lastBackup: "2024-02-20 03:00 AM",
    uptime: "99.9%",
  };

  const mockSettings = {
    general: {
      hospitalName: "CureCloud Medical Center",
      address: "123 Healthcare Ave, Medical District",
      phone: "+1 (555) 123-4567",
      email: "admin@curecloud.com",
      timezone: "America/New_York",
      dateFormat: "MM/DD/YYYY",
      language: "English",
    },
    security: {
      passwordExpiration: 90,
      sessionTimeout: 30,
      twoFactorAuth: true,
      ipWhitelist: ["192.168.1.*", "10.0.0.*"],
      loginAttempts: 3,
      passwordComplexity: "high",
    },
    notifications: {
      emailNotifications: true,
      smsNotifications: true,
      systemAlerts: true,
      maintenanceAlerts: true,
      securityAlerts: true,
      reportNotifications: true,
    },
    backup: {
      autoBackup: true,
      backupFrequency: "daily",
      backupTime: "03:00",
      retentionPeriod: 30,
      backupLocation: "cloud",
    },
  };

  const tabs = [
    { id: "general", name: "General", icon: faCog },
    { id: "security", name: "Security", icon: faShieldAlt },
    { id: "notifications", name: "Notifications", icon: faBell },
    { id: "backup", name: "Backup & Recovery", icon: faDatabase },
    { id: "integrations", name: "Integrations", icon: faPlug },
    { id: "maintenance", name: "Maintenance", icon: faTools },
  ];

  return (
    <div className="flex h-screen bg-surface">
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto px-6 py-8">
          <div className="max-w-[1920px] mx-auto">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="font-poppins text-2xl font-bold text-primary">
                  System Settings
                </h1>
                <p className="font-poppins text-ink">
                  Manage system configuration and preferences
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-line mb-8">
              <h2 className="font-poppins text-lg font-semibold text-primary mb-4">
                System Status
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {Object.entries(mockSystemInfo).map(([key, value]) => (
                  <div key={key} className="bg-surface rounded-lg p-4">
                    <p className="font-poppins text-sm text-ink">
                      {key.replace(/([A-Z])/g, " $1").trim()}
                    </p>
                    <p className="font-poppins text-lg font-semibold text-primary">
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-line overflow-hidden">
              <div className="border-b border-line">
                <div className="flex overflow-x-auto">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      className={`px-6 py-4 font-poppins font-medium flex items-center whitespace-nowrap ${
                        activeTab === tab.id
                          ? "text-primary border-b-2 border-primary"
                          : "text-ink hover:text-primary"
                      }`}
                      onClick={() => setActiveTab(tab.id)}
                    >
                      <FontAwesomeIcon icon={tab.icon} className={`fas mr-2`} />
                      {tab.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-6">
                {activeTab === "general" && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {Object.entries(mockSettings.general).map(
                        ([key, value]) => (
                          <div key={key} className="space-y-2">
                            <label className="block font-poppins text-sm font-medium text-ink">
                              {key.replace(/([A-Z])/g, " $1").trim()}
                            </label>
                            <input
                              type="text"
                              value={value}
                              className="w-full p-3 border border-line rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            />
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}

                {activeTab === "security" && (
                  <div className="space-y-6">
                    {Object.entries(mockSettings.security).map(
                      ([key, value]) => (
                        <div
                          key={key}
                          className="flex items-center justify-between p-4 bg-surface rounded-lg"
                        >
                          <div>
                            <p className="font-poppins font-medium text-primary">
                              {key.replace(/([A-Z])/g, " $1").trim()}
                            </p>
                            <p className="font-poppins text-sm text-ink">
                              Current value:{" "}
                              {typeof value === "boolean"
                                ? value
                                  ? "Enabled"
                                  : "Disabled"
                                : value}
                            </p>
                          </div>
                          {typeof value === "boolean" ? (
                            <div className="relative inline-block w-12 h-6 rounded-full bg-line">
                              <input
                                type="checkbox"
                                checked={value}
                                className="absolute w-6 h-6 rounded-full bg-primary transform transition-transform duration-200 ease-in-out"
                                style={{ left: value ? "24px" : "0" }}
                              />
                            </div>
                          ) : (
                            <button className="px-4 py-2 text-primary hover:bg-line rounded-lg">
                              Configure
                            </button>
                          )}
                        </div>
                      )
                    )}
                  </div>
                )}

                {activeTab === "notifications" && (
                  <div className="space-y-6">
                    {Object.entries(mockSettings.notifications).map(
                      ([key, value]) => (
                        <div
                          key={key}
                          className="flex items-center justify-between p-4 bg-surface rounded-lg"
                        >
                          <div>
                            <p className="font-poppins font-medium text-primary">
                              {key.replace(/([A-Z])/g, " $1").trim()}
                            </p>
                            <p className="font-poppins text-sm text-ink">
                              {value ? "Enabled" : "Disabled"}
                            </p>
                          </div>
                          <div className="relative inline-block w-12 h-6 rounded-full bg-line">
                            <input
                              type="checkbox"
                              checked={value}
                              className="absolute w-6 h-6 rounded-full bg-primary transform transition-transform duration-200 ease-in-out"
                              style={{ left: value ? "24px" : "0" }}
                            />
                          </div>
                        </div>
                      )
                    )}
                  </div>
                )}

                {activeTab === "backup" && (
                  <div className="space-y-6">
                    {Object.entries(mockSettings.backup).map(([key, value]) => (
                      <div
                        key={key}
                        className="flex items-center justify-between p-4 bg-surface rounded-lg"
                      >
                        <div>
                          <p className="font-poppins font-medium text-primary">
                            {key.replace(/([A-Z])/g, " $1").trim()}
                          </p>
                          <p className="font-poppins text-sm text-ink">
                            {typeof value === "boolean"
                              ? value
                                ? "Enabled"
                                : "Disabled"
                              : value}
                          </p>
                        </div>
                        <button className="px-4 py-2 text-primary hover:bg-line rounded-lg">
                          Configure
                        </button>
                      </div>
                    ))}
                    <div className="flex gap-4">
                      <button className="px-6 py-3 bg-primary text-white rounded-lg font-poppins font-semibold hover:bg-primary-hover transition-colors duration-200">
                        Backup Now
                      </button>
                      <button className="px-6 py-3 border border-primary text-primary rounded-lg font-poppins font-semibold hover:bg-surface transition-colors duration-200">
                        Restore from Backup
                      </button>
                    </div>
                  </div>
                )}

                {activeTab === "integrations" && (
                  <div className="space-y-6">
                    {[
                      {
                        name: "Electronic Health Records (EHR)",
                        status: "Connected",
                        icon: faNotesMedical,
                      },
                      {
                        name: "Laboratory Information System",
                        status: "Connected",
                        icon: faFlask,
                      },
                      {
                        name: "Pharmacy Management",
                        status: "Not Connected",
                        icon: faPrescriptionBottleAlt,
                      },
                      {
                        name: "Medical Imaging (PACS)",
                        status: "Connected",
                        icon: faXRay,
                      },
                      {
                        name: "Insurance Verification",
                        status: "Connected",
                        icon: faFileMedical,
                      },
                    ].map((integration) => (
                      <div
                        key={integration.name}
                        className="flex items-center justify-between p-4 bg-surface rounded-lg"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <FontAwesomeIcon
                              icon={integration.icon}
                              className={`fas  text-primary`}
                            />
                          </div>
                          <div>
                            <p className="font-poppins font-medium text-primary">
                              {integration.name}
                            </p>
                            <p className="font-poppins text-sm text-ink">
                              {integration.status}
                            </p>
                          </div>
                        </div>
                        <button className="px-4 py-2 text-primary hover:bg-line rounded-lg">
                          Configure
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "maintenance" && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {[
                        {
                          name: "System Logs",
                          description: "View and download system logs",
                          icon: faFileAlt,
                        },
                        {
                          name: "Cache Management",
                          description: "Clear system cache",
                          icon: faSync,
                        },
                        {
                          name: "Database Optimization",
                          description: "Optimize database performance",
                          icon: faDatabase,
                        },
                        {
                          name: "Error Reports",
                          description: "View system error reports",
                          icon: faExclamationTriangle,
                        },
                      ].map((tool) => (
                        <div
                          key={tool.name}
                          className="p-6 bg-surface rounded-xl"
                        >
                          <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                              <FontAwesomeIcon
                                icon={tool.icon}
                                className={`fas text-primary text-xl`}
                              />
                            </div>
                            <div>
                              <h3 className="font-poppins font-semibold text-primary">
                                {tool.name}
                              </h3>
                              <p className="font-poppins text-sm text-ink">
                                {tool.description}
                              </p>
                            </div>
                          </div>
                          <button className="w-full px-4 py-2 bg-white text-primary rounded-lg hover:bg-line transition-colors duration-200">
                            Access
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="p-6 bg-surface border-t border-line">
                <div className="flex justify-end gap-4">
                  <button className="px-6 py-3 border border-primary text-primary rounded-lg font-poppins font-semibold hover:bg-surface transition-colors duration-200">
                    Cancel
                  </button>
                  <button
                    className="px-6 py-3 bg-primary text-white rounded-lg font-poppins font-semibold hover:bg-primary-hover transition-colors duration-200 flex items-center gap-2"
                    onClick={() => {
                      setSaving(true);
                      setTimeout(() => setSaving(false), 1500);
                    }}
                  >
                    {saving ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Saving...
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SystemSettings;
