import img1 from "../assets/pics/1.webp";
import img2 from "../assets/pics/2.jpg";
import img3 from "../assets/pics/3.jpg";
import img4 from "../assets/pics/4.webp";
import img5 from "../assets/pics/5.jpeg";
import img6 from "../assets/pics/6.jpeg";
import img7 from "../assets/pics/7.png";
import img8 from "../assets/pics/8.jpg";
import img9 from "../assets/pics/9.avif";

const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9];

export const MockData = {
  patients: [
    {
      id: "p1",
      image: images[0],
      name: "John Doe",
      room: "101",
      vitals: {
        bp: "120/80",
        hr: "72",
      },
      nextMed: "Aspirin",
      priority: "Stable",
    },
    {
      id: "p2",
      image: images[1],
      name: "Jane Smith",
      room: "102",
      vitals: {
        bp: "110/70",
        hr: "75",
      },
      nextMed: "Paracetamol",
      priority: "Critical",
    },
    {
      id: "p3",
      image: images[2],
      name: "Alice Johnson",
      room: "103",
      vitals: {
        bp: "130/85",
        hr: "80",
      },
      nextMed: "Ibuprofen",
      priority: "Stable",
    },
    {
      id: "p4",
      image: images[3],
      name: "Michael Brown",
      room: "104",
      vitals: {
        bp: "140/90",
        hr: "78",
      },
      nextMed: "Metformin",
      priority: "High",
    },
    {
      id: "p5",
      image: images[4],
      name: "Emily Davis",
      room: "105",
      vitals: {
        bp: "118/76",
        hr: "70",
      },
      nextMed: "Amoxicillin",
      priority: "Stable",
    },
    {
      id: "p6",
      image: images[5],
      name: "Chris Wilson",
      room: "106",
      vitals: {
        bp: "125/82",
        hr: "74",
      },
      nextMed: "Lisinopril",
      priority: "Moderate",
    },
    {
      id: "p7",
      image: images[6],
      name: "Olivia Martinez",
      room: "107",
      vitals: {
        bp: "135/88",
        hr: "79",
      },
      nextMed: "Prednisone",
      priority: "High",
    },
    {
      id: "p8",
      image: images[7],
      name: "Daniel White",
      room: "108",
      vitals: {
        bp: "122/78",
        hr: "73",
      },
      nextMed: "Warfarin",
      priority: "Stable",
    },
    {
      id: "p9",
      image: images[8],
      name: "Sophia Anderson",
      room: "109",
      vitals: {
        bp: "128/83",
        hr: "76",
      },
      nextMed: "Simvastatin",
      priority: "Moderate",
    },
  ],

  appointments: [
    {
      id: "A12345",
      patientId: "p1",
      patientName: "John Doe",
      doctorId: "D12345",
      date: "2025-03-01",
      time: "09:00",
      type: "Follow-up",
      status: "Confirmed",
      notes: "Regular diabetes check-up",
    },
    {
      id: "A12346",
      patientId: "p2",
      patientName: "Jane Smith",
      doctorId: "D12346",
      date: "2025-03-02",
      time: "14:30",
      type: "Emergency",
      status: "Completed",
      notes: "Chest pain evaluation",
    },
  ],

  prescriptions: [
    {
      id: "RX12345",
      patientId: "p1",
      doctorId: "D12345",
      medication: "Metformin",
      dosage: "500mg",
      frequency: "Twice daily",
      startDate: "2025-02-15",
      endDate: "2025-05-15",
      status: "Active",
      refills: 2,
    },
  ],

  medicalReports: [
    {
      id: "R12345",
      patientId: "p1",
      doctorId: "D12345",
      date: "2025-02-15",
      type: "Blood Work",
      results: "Elevated blood sugar levels",
      recommendations: "Adjust medication dosage",
      status: "Final",
    },
  ],

  doctors: [
    {
      id: "D12345",
      name: "Dr. James Wilson",
      specialization: "Endocrinologist",
      experience: "15 years",
      email: "j.wilson@hospital.com",
      phone: "(555) 123-4573",
      schedule: "Mon-Fri",
      status: "Active",
      image: "/doctor1.png",
    },
  ],

  billing: [
    {
      id: "B12345",
      patientId: "p1",
      totalAmount: 250.0,
      amountPaid: 150.0,
      outstanding: 100.0,
      dueDate: "2025-03-01",
      status: "Unpaid",
    },
  ],

  visitHistory: [
    {
      id: "V12345",
      patientId: "p1",
      date: "2025-02-15",
      doctorId: "D12345",
      visitType: "Routine",
      symptoms: "Fatigue, Excessive thirst",
      diagnosis: "Uncontrolled diabetes",
      treatment: "Adjusted medication",
    },
  ],

  stats: {
    patientsUnderCare: 5,
    tasksForToday: 3,
    upcomingMedications: 2,
    criticalAlerts: 1,
  },

  adminStats: {
    totalDoctors: 45,
    totalPatients: 1234,
    activeAppointments: 89,
    occupancyRate: "85%",
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
  mockAppointments: [
    {
      id: 1,
      type: "General Checkup",
      date: "2025-03-15",
      time: "10:00 AM",
      status: "Scheduled",
    },
    {
      id: 2,
      type: "Follow-up",
      date: "2025-03-20",
      time: "2:30 PM",
      status: "Pending",
    },
    {
      id: 3,
      type: "Specialist Consult",
      date: "2025-03-25",
      time: "11:15 AM",
      status: "Scheduled",
    },
  ],
  healthStats: {
    bloodPressure: "120/80",
    heartRate: "72 bpm",
    weight: "68 kg",
    bloodSugar: "95 mg/dL",
  },

  recentLabResults: [
    {
      id: 1,
      patientName: "Sarah Johnson",
      testType: "Blood Work",
      date: "2025-02-15",
      status: "Complete",
      result: "Abnormal",
    },
    {
      id: 2,
      patientName: "Michael Chen",
      testType: "ECG",
      date: "2025-02-14",
      status: "Pending",
      result: "Processing",
    },
    {
      id: 3,
      patientName: "Emily Brown",
      testType: "X-Ray",
      date: "2025-02-10",
      status: "Complete",
      result: "Normal",
    },
    {
      id: 4,
      patientName: "James Wilson",
      testType: "MRI",
      date: "2025-02-09",
      status: "Complete",
      result: "Normal",
    },
    {
      id: 5,
      patientName: "Linda Martinez",
      testType: "CT Scan",
      date: "2025-02-08",
      status: "Complete",
      result: "Abnormal",
    },
  ],

  mockNotifications: [
    {
      id: 1,
      title: "New Schedule Assignment",
      description:
        "You have been assigned to the Emergency Department for next week",
      type: "shift",
      priority: "important",
      read: false,
      createdAt: "2024-01-20T09:00:00Z",
      senderName: "Dr. Sarah Wilson",
    },
    {
      id: 2,
      title: "Department Meeting",
      description: "Monthly department meeting scheduled for tomorrow at 10 AM",
      type: "department",
      priority: "normal",
      read: true,
      createdAt: "2024-01-19T15:30:00Z",
      senderName: "Dr. James Moore",
    },
    {
      id: 3,
      title: "System Maintenance",
      description:
        "System will be down for maintenance on Sunday from 2 AM to 4 AM",
      type: "system",
      priority: "urgent",
      read: false,
      createdAt: "2024-01-18T11:45:00Z",
      senderName: "System Admin",
    },
    {
      id: 4,
      title: "New Protocol Update",
      description: "Updated COVID-19 protocols are now in effect",
      type: "department",
      priority: "important",
      read: false,
      createdAt: "2024-01-17T16:20:00Z",
      senderName: "Dr. Emily Chen",
    },
    {
      id: 5,
      title: "Training Reminder",
      description: "Mandatory safety training due by end of week",
      type: "system",
      priority: "normal",
      read: true,
      createdAt: "2024-01-16T13:15:00Z",
      senderName: "HR Department",
    },
  ],

  notifications: [
    {
      id: 1,
      type: "appointment",
      message: "Upcoming appointment with Dr. Wilson tomorrow at 10:00 AM",
      priority: "high",
    },
    {
      id: 2,
      type: "prescription",
      message: "Metformin prescription needs refill in 5 days",
      priority: "medium",
    },
  ],

  mockPrescriptions: [
    {
      id: 1,
      medication: "Metformin",
      dosage: "500mg",
      frequency: "Twice daily",
      status: "Active",
    },
    {
      id: 2,
      medication: "Lisinopril",
      dosage: "10mg",
      frequency: "Once daily",
      status: "Active",
    },
    {
      id: 3,
      medication: "Atorvastatin",
      dosage: "20mg",
      frequency: "Once daily",
      status: "Active",
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

  medications: [
    {
      id: "m1",
      name: "Aspirin",
      time: "08:00 AM",
    },
  ],

  alerts: [
    {
      id: "a1",
      message: "Patient John Doe's vitals need attention.",
      level: "Critical",
    },
  ],
};
