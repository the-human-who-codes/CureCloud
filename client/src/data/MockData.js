// Placeholder data for features that have no backend yet (team chat, nurse
// tasks/shift info, admin schedule and system alerts).
const MockData = {
  stats: {
    patientsUnderCare: 5,
    tasksForToday: 3,
    upcomingMedications: 2,
    criticalAlerts: 1,
  },

  staffSchedule: [
    { doctor: "Dr. James Wilson", shift: "Morning", status: "On Duty" },
    { doctor: "Dr. Maria Rodriguez", shift: "Evening", status: "On Leave" },
    { doctor: "Dr. David Kim", shift: "Night", status: "On Duty" },
  ],

  systemAlerts: [
    {
      type: "warning",
      message: "System maintenance scheduled for tonight",
      time: "2 hours ago",
    },
    {
      type: "error",
      message: "Low medical supplies in Storage B",
      time: "4 hours ago",
    },
    {
      type: "success",
      message: "New doctor onboarding completed",
      time: "6 hours ago",
    },
  ],
  tasks: [
    {
      id: "t1",
      name: "Monitor vital signs",
    },
  ],

  shiftInfo: {
    currentShift: "Night",
    handoverNotes: "Ensure all patients are stabilized before end of shift.",
    teamMembers: ["Alice", "Bob", "Charlie"],
  },

  mockDirectMessages: [
    {
      id: "dm1",
      name: "Dr. John Smith",
      role: "Surgeon",
      status: "online",
      unread: 2,
    },
    {
      id: "dm2",
      name: "Nurse Emma Wilson",
      role: "Head Nurse",
      status: "offline",
      unread: 0,
    },
    {
      id: "dm3",
      name: "Dr. Michael Chen",
      role: "Pediatrician",
      status: "away",
      unread: 1,
    },
    {
      id: "dm4",
      name: "Dr. Lisa Johnson",
      role: "Radiologist",
      status: "online",
      unread: 0,
    },
    {
      id: "dm5",
      name: "James Wilson",
      role: "Lab Technician",
      status: "online",
      unread: 0,
    },
  ],
  mockUser: {
    id: "U001",
    name: "Dr. Sarah Connor",
    role: "Cardiologist",
    avatar: "/default-avatar.png",
    status: "online",
  },
  mockChannels: [
    { id: "general", name: "General", type: "channel", unread: 2 },
    { id: "emergency", name: "Emergency Room", type: "channel", unread: 5 },
    { id: "cardiology", name: "Cardiology", type: "channel", unread: 0 },
    { id: "radiology", name: "Radiology", type: "channel", unread: 1 },
    { id: "nursing", name: "Nursing Staff", type: "channel", unread: 0 },
    { id: "lab", name: "Laboratory", type: "channel", unread: 3 },
  ],

  mockMessages: {
    general: [
      {
        id: 1,
        user: "Dr. John Smith",
        avatar: "/default-avatar.png",
        time: "09:00 AM",
        content:
          "Good morning team! Just a reminder about the staff meeting at 2 PM today.",
        role: "Surgeon",
        reactions: ["👍", "✅"],
      },
      {
        id: 2,
        user: "Nurse Emma Wilson",
        avatar: "/default-avatar.png",
        time: "09:05 AM",
        content:
          "Thanks for the reminder. Could we also discuss the new patient admission protocol?",
        role: "Head Nurse",
        reactions: ["👍"],
      },
      {
        id: 3,
        user: "Dr. Michael Chen",
        avatar: "/default-avatar.png",
        time: "09:15 AM",
        content:
          "I will prepare a brief presentation about the updated protocols.",
        role: "Pediatrician",
        reactions: ["🎉", "👏"],
      },
      {
        id: 4,
        user: "Dr. Sarah Connor",
        avatar: "/default-avatar.png",
        time: "09:30 AM",
        content:
          "Great initiative, Michael! I will share some insights from the cardiology department as well.",
        role: "Cardiologist",
        attachments: [
          { type: "pdf", name: "Protocol_Updates.pdf", size: "2.4 MB" },
        ],
      },
      {
        id: 5,
        user: "James Wilson",
        avatar: "/default-avatar.png",
        time: "09:45 AM",
        content:
          "Lab results for patient #12345 are ready. Critical values detected.",
        role: "Lab Technician",
        isPriority: true,
      },
    ],
  },
};

export default MockData;
