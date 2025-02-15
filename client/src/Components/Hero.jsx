import { useNavigate } from "react-router-dom";
import { auth, provider } from "../firebaseConfig";
import { signInWithPopup } from "firebase/auth";
import google from "../assets/google-logo.svg";
import "./Hero.css";

const Hero = () => {
  const navigate = useNavigate(); // Hook for navigation

  const googleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log("Google Sign-In successful:", result.user);
        navigate("/dashboard"); // Redirect to Dashboard
      })
      .catch((error) => {
        console.error("Google Sign-In error:", error.message);
      });
  };

  return (
    <section id="home" className="hero">
      <h1 className="hero-heading">Welcome to CureCloud</h1>
      <br />
      <div className="hero-content">
        <h2 className="hero-title">Your Health Simplified.</h2>
        <p className="hero-description">
          CureCloud simplifies healthcare management by providing a secure,
          centralized system for hospitals and clinics. Book specialist
          appointments, track medical history, and access health records seamlessly.
        </p>
        <button className="google-login" onClick={googleSignIn}>
          <img src={google} alt="Google Logo" className="google-icon" />
          <span>Login with Google</span>
        </button>
      </div>
    </section>
  );
};

export default Hero;
