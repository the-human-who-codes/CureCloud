import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { onAuthStateChanged, signOut as firebaseSignOut } from "firebase/auth";
import PropTypes from "prop-types";
import { auth } from "../firebaseConfig";
import { api } from "../api/client";

const AuthContext = createContext(null);

// Loads the CureCloud profile for the signed-in Firebase user, creating it on first sign-in.
async function loadProfile() {
  try {
    return await api.getMe();
  } catch (err) {
    if (err.status !== 404) throw err;
    await api.createMe();
    return api.getMe();
  }
}

export function AuthProvider({ children }) {
  const [state, setState] = useState({
    firebaseUser: undefined,
    user: null,
    patient: null,
    error: null,
  });

  const refresh = useCallback(async () => {
    if (!auth.currentUser)
      return setState({
        firebaseUser: null,
        user: null,
        patient: null,
        error: null,
      });
    try {
      const { user, patient = null } = await loadProfile();
      setState({ firebaseUser: auth.currentUser, user, patient, error: null });
    } catch (error) {
      setState({
        firebaseUser: auth.currentUser,
        user: null,
        patient: null,
        error,
      });
    }
  }, []);

  useEffect(() => onAuthStateChanged(auth, () => refresh()), [refresh]);

  const value = {
    ...state,
    loading:
      state.firebaseUser === undefined ||
      (state.firebaseUser && !state.user && !state.error),
    refresh,
    signOut: () => firebaseSignOut(auth),
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = { children: PropTypes.node };

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
