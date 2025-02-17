import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebaseConfig";
import google from "../assets/google-logo.svg";
import "./GoogleAuthButton.css";

const GoogleAuthButton = ({ onSuccess, onFailure }) => {
  const googleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log("Google Sign-In successful:", result.user);
        if (onSuccess) onSuccess(result.user);
      })
      .catch((error) => {
        console.error("Google Sign-In error:", error.message);
        if (onFailure) onFailure(error.message);
      });
  };

  return (
    <button className="google-login" onClick={googleSignIn}>
      <img src={google} alt="Google Logo" className="google-icon" />
      <span>Login with Google</span>
    </button>
  );
};

export default GoogleAuthButton;
