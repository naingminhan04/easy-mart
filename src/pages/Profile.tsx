import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "../components/LogoutButton";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div className="flex justify-center items-center h-64 text-lg font-semibold">Loading profile...</div>;
  }

  return (
    isAuthenticated && user ? (
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
    ) : null
  );
};

export default Profile;