import { useAuth0 } from "@auth0/auth0-react";
import Auth from "../pages/Auth";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth0();
  if (isLoading) return <div className="flex justify-center items-center min-h-dvh text-lg font-semibold">Loading...</div>;
  return isAuthenticated ? children : <Auth />;
}
