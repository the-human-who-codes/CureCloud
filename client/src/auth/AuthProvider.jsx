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
import { setDisplayTimeZone } from "../utils/format";

const AuthContext = createContext(null);

// Loads the CureCloud profile for the signed-in Firebase user, creating it on first sign-in.
async function loadProfile() {
  try {
    return await api.getMe();
  } catch (err) {
    if (err.status !== 404) throw err;
    return api.createMe();
  }
}

const SIGNED_OUT = {
  user: null,
  patient: null,
  permissions: [],
  error: null,
};

export function AuthProvider({ children }) {
  const [state, setState] = useState({
    firebaseUser: undefined,
    ...SIGNED_OUT,
  });

  const refresh = useCallback(async () => {
    if (!auth.currentUser)
      return setState({ firebaseUser: null, ...SIGNED_OUT });
    try {
      const { user, patient = null, permissions = [] } = await loadProfile();
      setState({
        firebaseUser: auth.currentUser,
        user,
        patient,
        permissions,
        error: null,
      });
      if (user.status === "active")
        api
          .getPreferences()
          .then((p) => setDisplayTimeZone(p.timeZone))
          .catch(() => {});
    } catch (error) {
      setState({ firebaseUser: auth.currentUser, ...SIGNED_OUT, error });
    }
  }, []);

  useEffect(() => onAuthStateChanged(auth, () => refresh()), [refresh]);

  // GET/PATCH /me responses ({ user, patient, permissions }) update the context in place.
  const applyMe = useCallback(
    (me) =>
      setState((s) => ({
        ...s,
        user: me.user ?? s.user,
        patient: me.patient !== undefined ? me.patient : s.patient,
        permissions: me.permissions ?? s.permissions,
      })),
    []
  );
  const setPatient = useCallback(
    (patient) => setState((s) => ({ ...s, patient })),
    []
  );

  const value = {
    ...state,
    loading:
      state.firebaseUser === undefined ||
      (state.firebaseUser && !state.user && !state.error),
    // Role permission from GET /me. The UI uses it to show or hide actions; the API enforces.
    can: (permission) => state.permissions.includes(permission),
    // A system admin is an admin without a facility (docs/domain-model.md §3.3).
    isSystemAdmin: state.user?.role === "admin" && !state.user?.facilityId,
    refresh,
    applyMe,
    setPatient,
    signOut: () => firebaseSignOut(auth),
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = { children: PropTypes.node };

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
