import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebaseConfig";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import PropTypes from "prop-types";

const GoogleAuthButton = ({ onSuccess, onFailure }) => {
	const googleSignIn = () => {
		signInWithPopup(auth, provider)
			.then((result) => {
				console.log("Google Sign-In successful:", result.user);
				// Get the Firebase ID token
				result.user
					.getIdToken()
					.then((idToken) => {
						console.log("Firebase ID Token:", idToken);
						// Pass the ID token to the onSuccess callback
						if (onSuccess) onSuccess(result.user, idToken);
					})
					.catch((error) => {
						console.error("Error getting ID Token:", error.message);
						if (onFailure) onFailure(error.message);
					});
			})
			.catch((error) => {
				console.error("Google Sign-In error:", error.message);
				if (onFailure) onFailure(error.message);
			});
	};

	return (
		<button
			onClick={googleSignIn}
			className="mt-6 bg-white text-gray-900 flex items-center px-6 py-3 rounded-full shadow-md hover:bg-gray-100 transition mx-auto"
		>
			<FontAwesomeIcon
				icon={faGoogle}
				className="w-5 h-5 mr-3 text-blue-600"
			/>
			Login with Google
		</button>
	);
};

GoogleAuthButton.propTypes = {
	onSuccess: PropTypes.func,
	onFailure: PropTypes.func,
};

export default GoogleAuthButton;
