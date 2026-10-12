import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { auth } from "../firebaseConfig";
import { useAuth } from "./AuthProvider";

// Guards a dashboard: unauthenticated -> landing page; wrong role -> the user's own dashboard.
// Without a role/children it just redirects to the signed-in user's dashboard (used after login).
function RequireRole({ role, children }) {
  const { firebaseUser, user, error, loading } = useAuth();

  // Right after sign-in, Firebase knows the user before the profile has loaded into context.
  const syncing = auth.currentUser?.uid !== firebaseUser?.uid;
  if (loading || syncing)
    return <div className="p-8 font-poppins text-ink">Loading…</div>;
  if (!firebaseUser) return <Navigate to="/" replace />;
  if (error) {
    return (
      <div className="p-8 font-poppins text-red-600">
        {error.status === 403
          ? error.message
          : "Could not load your profile. Please try again."}
      </div>
    );
  }
  if (user.status !== "active") {
    return (
      <div className="p-8 font-poppins text-ink">
        {user.status === "pending"
          ? "Your account is awaiting admin approval. Make sure you have verified your email address."
          : `Your account has been disabled${
              user.statusReason ? ` (${user.statusReason})` : ""
            }. Contact an administrator.`}
      </div>
    );
  }
  if (role && user.role !== role)
    return <Navigate to={`/${user.role}/dashboard`} replace />;
  return children ?? <Navigate to={`/${user.role}/dashboard`} replace />;
}

RequireRole.propTypes = {
  role: PropTypes.oneOf(["patient", "doctor", "nurse", "admin"]),
  children: PropTypes.node,
};

export default RequireRole;
