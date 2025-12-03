import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

export default function RegisterButton() {
  const { loginWithRedirect } = useAuth0();

  return (
    <Link
      onClick={() =>
        loginWithRedirect()
      }
      className="font-bold"
    >
      Register
    </Link>
  );
}
