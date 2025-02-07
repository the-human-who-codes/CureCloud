import Navbar from "../Components/NavBar";
import Hero from "../Components/Hero";
import "./LandingPage.css";
import Features from "../Components/Features";
import Footer from "../Components/Footer";

const LandingPage = () => {
  return (
    <div className="landing-container">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section*/}
      <Hero />

      {/* features */}
      <Features />
      <Footer />
    </div>
  );
};

export default LandingPage;
