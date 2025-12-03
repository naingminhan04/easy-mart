import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../components/LoginButton";
import LogoutButton from "../components/LogoutButton";
import RegisterButton from "../components/RegisterButton";
import { ShoppingBag } from "lucide-react";

export default function Login() {
  const { isAuthenticated, isLoading, error } = useAuth0();

  if (isLoading) return <div className="pt-20 text-center">Loading...</div>;
  if (error) return <div className="pt-20 text-center">Error: {error.message}</div>;

  return (
    <div className="app-container pt-20 flex flex-col items-center">
      <ShoppingBag className="text-4xl mb-4" />
      <h1 className="text-2xl font-bold mb-6">Welcome to EasyMart</h1>

      {isAuthenticated ? (
        <div className="flex flex-col items-center gap-4">
          <p className="text-green-500 font-semibold">✅ You are logged in!</p>
          <LogoutButton />
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <p className="mb-2">Get started by signing in to your account</p>
          <LoginButton />
          <RegisterButton />
        </div>
      )}
    </div>
  );
}
