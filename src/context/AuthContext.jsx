import { createContext, useContext, useMemo, useState } from "react";
import { getCurrentRole, selectRole, logout as logoutService } from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [role, setRole] = useState(getCurrentRole());

  function login(newRole) {
    selectRole(newRole);
    setRole(newRole);
  }

  function logout() {
    logoutService();
    setRole(null);
  }

  const value = useMemo(
    () => ({
      role,
      loggedIn: !!role,
      login,
      logout,
    }),
    [role]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}