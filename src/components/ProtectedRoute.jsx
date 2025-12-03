import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth0();
  if (isLoading) return <div className="flex justify-center items-center h-64 text-lg font-semibold">Loading...</div>;
  return isAuthenticated ? children : <Navigate to="/users" />;
}
