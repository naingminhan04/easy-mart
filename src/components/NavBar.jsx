import {
  ShoppingBag,
  Search,
  LogInIcon,
  UserPlus,
  Filter,
  User,
  LogOut,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export default function NavBar() {
  const navigate = useNavigate();
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();
  const [value, setValue] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  function searchFn(value) {
    if (!value.trim()) return;
    navigate(`/search?query=${value}`);
    setValue("");
  }

  return (
    <div className="fixed z-10 w-full bg-black border-b-2 border-white text-amber-50 p-2 h-15 md:h-20 grid grid-cols-6 items-center">
      <Link
        to={""}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="flex col-span-1 gap-1 items-center"
      >
        <ShoppingBag className="size-7" />
        <span className="font-bold md:text-xl hidden sm:block">EasyMart</span>
      </Link>

      <div className="col-span-4 flex justify-center">
        <div className="flex w-full sm:max-w-2/3">
          <input
            className="w-full border-2 h-8 md:h-10 outline-0 border-white bg-white text-sm text-black rounded-l-xl p-1 focus:bg-white"
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Search For Products"
            onKeyDown={(e) => e.key === "Enter" && searchFn(value)}
          />
          <button
            className="h-8 md:h-10 rounded-r-xl cursor-pointer text-black bg-gray-300 hover:bg-gray-800 hover:text-white flex items-center justify-center px-2"
            onClick={() => searchFn(value)}
          >
            <Search />
          </button>
        </div>
      </div>

      {/* Desktop links */}
      <div className="hidden sm:flex col-span-1 justify-end items-center gap-4">
        {isAuthenticated ? (
          <>
            <Link
              to="/profile"
              className="flex items-center gap-1 md:text-lg font-bold"
            >
              <User size={25} /> Profile
            </Link>
            <Link
              to={`cart/${user.sub}`}
              className="flex items-center gap-1 md:text-lg font-bold"
            >
              <ShoppingBag size={25} /> Cart
            </Link>
          </>
        ) : (
          <>
            <button
              onClick={() => loginWithRedirect()}
              className="flex items-center gap-1 md:text-lg font-bold"
            >
              <LogInIcon size={25} /> Login
            </button>
            <button
              onClick={() =>
                loginWithRedirect({
                  authorizationParams: {
                    screen_hint: "signup",
                  },
                })
              }
              className="flex items-center gap-1 md:text-lg font-bold"
            >
              <UserPlus size={25} />
              Register
            </button>
          </>
        )}
      </div>

      <div className="flex sm:hidden col-span-1 justify-end items-center relative">
        <button
          className="p-2 border rounded border-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Filter size={20} />
        </button>

        {menuOpen && (
          <div className="absolute right-0 top-full mt-2 w-48 bg-black border border-white rounded shadow-lg flex flex-col p-2 gap-2 z-20">
            {isAuthenticated ? (
              <>
                <Link
                  to="/profile"
                  className="flex items-center gap-2 hover:bg-gray-800 p-1 rounded"
                  onClick={() => setMenuOpen(false)}
                >
                  <User size={18} /> Profile
                </Link>
                <Link
                  to={`cart/${user.sub}`}
                  className="flex items-center gap-2 hover:bg-gray-800 p-1 rounded"
                  onClick={() => setMenuOpen(false)}
                >
                  <ShoppingBag size={18} /> Cart
                </Link>
                <button
                  onClick={() => logout({ returnTo: window.location.origin })}
                  className="flex items-center gap-2 hover:bg-gray-800 p-1 rounded"
                >
                  <LogOut size={18} /> Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => loginWithRedirect()}
                  className="flex items-center gap-2 hover:bg-gray-800 p-1 rounded"
                >
                  <LogInIcon size={18} /> Login
                </button>
                <button
                  onClick={() =>
                    loginWithRedirect({
                      authorizationParams: {
                        screen_hint: "signup",
                      },
                    })
                  }
                  className="flex items-center gap-2 hover:bg-gray-800 p-1 rounded"
                >
                  <UserPlus size={18} />
                  Register
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
