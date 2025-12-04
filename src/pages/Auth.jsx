import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../components/LoginButton";
import LogoutButton from "../components/LogoutButton";
import RegisterButton from "../components/RegisterButton";
import { ShoppingBag } from "lucide-react";

export default function Auth() {
  const { isAuthenticated, isLoading, error, user } = useAuth0();

  if (isLoading) return <div className="pt-20 text-center">Loading...</div>;
  if (error) return <div className="pt-20 text-center">Error: {error.message}</div>;

  return (
    <div className="app-container pt-20 flex flex-col items-center">
      <ShoppingBag className="text-4xl mb-4" />
      <h1 className="text-2xl font-bold mb-6">Welcome to EasyMart</h1>

      {isAuthenticated ? (
        <div className="flex pt-15 md:pt-20 flex-col items-center gap-4 py-8">
        {user.picture && (
          <img
            src={user.picture}
            alt={user.name || 'User'}
            className="w-28 h-28 rounded-full object-cover border-4 border-blue-400 shadow-md"
          />
        )}
        <div className="text-center">
          <div className="text-2xl font-semibold text-gray-100 mb-2">
            {user.name}
          </div>
          <div className="text-base text-gray-400">
            {user.email}
          </div>
          <div className="bg-red-500">
            <LogoutButton />
          </div>
        </div>
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
