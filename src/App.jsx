import { Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Dashboard from "./pages/Dashboard";
import Landlords from "./pages/Landlords";
import Properties from "./pages/Properties";
import Units from "./pages/Units";
import Tenants from "./pages/Tenants";
import Transactions from "./pages/Transactions";
import Documents from "./pages/Documents";
import Reports from "./pages/Reports";
import Notes from "./pages/Notes";
import AuditLog from "./pages/AuditLog";
import Settings from "./pages/Settings";
import Login from "./pages/Login";

import ProtectedRoute from "./components/ProtectedRoute";

import { useAuth } from "./context/AuthContext";

export default function App() {
  const { loggedIn } = useAuth();

  return (
    <Routes>
      {/* Login */}
      <Route
        path="/login"
        element={
          loggedIn ? (
            <Navigate to="/" replace />
          ) : (
            <Login />
          )
        }
      />

      {/* Protected App */}
      <Route
        element={
          loggedIn ? (
            <MainLayout />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      >
        <Route path="/" element={<Dashboard />} />

        <Route
          path="/landlords"
          element={
            <ProtectedRoute path="/landlords">
              <Landlords />
            </ProtectedRoute>
          }
        />

        <Route
          path="/properties"
          element={
            <ProtectedRoute path="/properties">
              <Properties />
            </ProtectedRoute>
          }
        />

        <Route
          path="/units"
          element={
            <ProtectedRoute path="/units">
              <Units />
            </ProtectedRoute>
          }
        />

        <Route
          path="/tenants"
          element={
            <ProtectedRoute path="/tenants">
              <Tenants />
            </ProtectedRoute>
          }
        />

        <Route
          path="/transactions"
          element={
            <ProtectedRoute path="/transactions">
              <Transactions />
            </ProtectedRoute>
          }
        />

        <Route
          path="/documents"
          element={
            <ProtectedRoute path="/documents">
              <Documents />
            </ProtectedRoute>
          }
        />

        <Route
          path="/reports"
          element={
            <ProtectedRoute path="/reports">
              <Reports />
            </ProtectedRoute>
          }
        />

        <Route
          path="/notes"
          element={
            <ProtectedRoute path="/notes">
              <Notes />
            </ProtectedRoute>
          }
        />

        <Route
          path="/audit-log"
          element={
            <ProtectedRoute path="/audit-log">
              <AuditLog />
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute path="/settings">
              <Settings />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* Catch All */}
      <Route
        path="*"
        element={
          <Navigate
            to={loggedIn ? "/" : "/login"}
            replace
          />
        }
      />
    </Routes>
  );
}