import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faNotesMedical,
  faCalendarCheck,
  faBrain,
  faExchangeAlt,
  faUserMd,
  faHeartbeat,
} from "@fortawesome/free-solid-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

const featuresData = [
  {
    icon: faNotesMedical,
    title: "Digital Health Records",
    description:
      "Securely store and access your medical history anytime, anywhere.",
  },
  {
    icon: faCalendarCheck,
    title: "Appointment Booking",
    description:
      "Book appointments with specialists from the comfort of your home.",
  },
  {
    icon: faBrain,
    title: "AI-Powered Insights",
    description:
      "Get tailored health insights and recommendations with AI integration.",
  },
  {
    icon: faExchangeAlt,
    title: "Secure Data Sharing",
    description:
      "Easily and securely share your medical records with healthcare professionals.",
  },
  {
    icon: faUserMd,
    title: "Specialist Availability",
    description:
      "Check availability and get instant access to specialists based on your needs.",
  },
  {
    icon: faHeartbeat,
    title: "Health Tracking",
    description:
      "Track your vitals, appointments, and progress over time to stay on top of your health.",
  },
];

const scrollToSection = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

const Navbar = () => (
  <nav className="fixed top-0 left-0 right-0 flex justify-between items-center bg-white/70 backdrop-blur-md shadow-md px-6 py-3 w-full z-10">
    <h1 className="text-lg font-bold">CureCloud</h1>
    <div className="space-x-6">
      <button
        onClick={() => scrollToSection("hero")}
        className="text-gray-700 hover:text-blue-600"
      >
        Home
      </button>
      <button
        onClick={() => scrollToSection("features")}
        className="text-gray-700 hover:text-blue-600"
      >
        Features
      </button>
      <button
        onClick={() => scrollToSection("footer")}
        className="text-gray-700 hover:text-blue-600"
      >
        Contact
      </button>
    </div>
  </nav>
);

const HeroSection = () => (
  <div
    id="hero"
    className="min-h-screen flex flex-col justify-center items-center text-center px-6"
  >
    <h2 className="text-4xl md:text-5xl font-bold text-gray-800">
      Welcome to <span className="text-blue-600">CureCloud</span>
    </h2>
    <p className="mt-4 text-xl font-semibold text-gray-900">
      Your Health Simplified.
    </p>
    <p className="mt-3 text-gray-700 max-w-xl mx-auto">
      CureCloud simplifies healthcare management by providing a secure,
      centralized system for hospitals and clinics. Book specialist
      appointments, track medical history, and access health records seamlessly.
    </p>
    <button
      onClick={() => (window.location.href = "/role-selection")}
      className="mt-6 bg-white text-gray-900 flex items-center px-6 py-3 rounded-full shadow-md hover:bg-gray-100 transition mx-auto"
    >
      <FontAwesomeIcon icon={faGoogle} className="w-5 h-5 mr-3 text-blue-600" />
      Login with Google
    </button>
  </div>
);

const FeaturesSection = () => (
  <div id="features" className="mt-16 px-6 max-w-6xl mx-auto">
    <h3 className="text-3xl font-bold text-gray-800 text-center">
      Key Features
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {featuresData.map((feature, index) => (
        <div
          key={index}
          className="bg-white border border-gray-200 p-6 rounded-lg shadow-md flex flex-col items-center text-center max-w-sm mx-auto"
        >
          <FontAwesomeIcon
            icon={feature.icon}
            className="text-blue-600 text-4xl mb-4"
          />
          <h4 className="text-lg font-semibold text-gray-900">
            {feature.title}
          </h4>
          <p className="text-gray-700 text-sm mt-2">{feature.description}</p>
        </div>
      ))}
    </div>
  </div>
);

const Footer = () => (
  <footer
    id="footer"
    className="bg-gray-900 text-white text-center py-6 mt-16 w-full"
  >
    <p>&copy; {new Date().getFullYear()} CureCloud. All Rights Reserved.</p>
    <p>Contact us: support@curecloud.com</p>
    <p className="mt-2 text-sm text-gray-400">
      This is an open-source project created to demonstrate the potential of a
      centralized health management system. Currently, the software uses mock
      data to illustrate its intended functionality.
    </p>
    <p className="mt-2 text-sm text-gray-400">
      Contributors:
      <br />
      Founder: <strong>Muano Masiagwala</strong>
      <br />
      Contributor: <strong>Levi Mashilo</strong>
    </p>
    <p className="mt-2 text-sm text-gray-400">
      Want to contribute? Check out the repository on GitHub:{" "}
      <a
        href="https://github.com/muano-thee-last/CureCloud" // Replace with your actual GitHub link
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-400 hover:text-blue-600"
      >
        CureCloud GitHub Repository
      </a>
    </p>
    <p className="mt-4 text-sm text-gray-400">
      This project is licensed under the MIT License. See the LICENSE file for
      details.
    </p>
  </footer>
);

const LandingPage = () => {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-[#2c4ecf1a] to-white text-gray-900">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <Footer />
    </div>
  );
};

export default LandingPage;
