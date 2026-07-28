import { Navigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { rolePermissions } from "../services/rolePermissions";

export default function ProtectedRoute({
  children,
  path,
}) {
  const { loggedIn, role } = useAuth();

  if (!loggedIn) {
    return <Navigate to="/login" replace />;
  }

  const allowedRoutes = rolePermissions[role] || [];

  if (!allowedRoutes.includes(path)) {
    return <Navigate to="/" replace />;
  }

  return children;
}