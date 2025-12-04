import { useAuth0 } from "@auth0/auth0-react";

export default function RegisterButton() {
  const { loginWithRedirect } = useAuth0();

  const handleRegister = () => {
    loginWithRedirect({
      authorizationParams: {
        screen_hint: 'signup'
      }
    });
  };

  return (
    <button
      onClick={handleRegister}
      className="font-bold px-4 py-2 text-white bg-blue-500 rounded"
    >
      Register
    </button>
  );
}
