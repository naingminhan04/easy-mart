import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "../components/LogoutButton";
import { useState, useEffect, useRef } from "react";

const LOCAL_KEY_PREFIX = "profile_";

function getLocalProfile(userId) {
  const raw = localStorage.getItem(LOCAL_KEY_PREFIX + userId);
  return raw ? JSON.parse(raw) : {};
}

function setLocalProfile(userId, data) {
  localStorage.setItem(LOCAL_KEY_PREFIX + userId, JSON.stringify(data));
}

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();
  const userId = user?.sub;
  const [localProfile, setLocalProfileState] = useState({});

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (userId) {
      setLocalProfileState(getLocalProfile(userId));
    }
  }, [userId]);

  const [editing, setEditing] = useState({
    username: false,
    phone: false,
    address: false,
    photo: false,
  });
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [photo, setPhoto] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    setUsername(localProfile.username ?? user?.name);
    setPhone(localProfile.phone ?? user?.phone_number ?? "");
    setAddress(localProfile.address ?? user?.address ?? "");
    setPhoto(localProfile.photo ?? user?.picture ?? null);
  }, [localProfile, user]);

  const validateUsername = (val) => val.length <= 20 && val.length >= 1;
  const validatePhone = (val) => /^\d{1,15}$/.test(val);
  const validateAddress = (val) => val.split(/\s+/).length <= 100;

  const saveField = (field, value) => {
    if (!userId) return;
    const updated = { ...localProfile, [field]: value };
    setLocalProfile(userId, updated);
    setLocalProfileState(updated);
    setEditing((edit) => ({ ...edit, [field]: false }));
  };

  return isAuthenticated && user ? (
    <div className="flex min-h-dvh pt-15 md:pt-20 flex-col items-center md:justify-center bg-gray-100 overflow-hidden">
      <div className="flex-col md:shadow-2xl rounded-xl p-10 w-full md:w-2/3 md:m-10 max-w-195">
        <div className="flex justify-center mb-3">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={e => {
              const file = e.target.files[0];
              if (file) {
                const reader = new FileReader();
                reader.onload = () => {
                  saveField("photo", reader.result);
                  setPhoto(reader.result);
                };
                reader.readAsDataURL(file);
              }
            }}
          />
          {photo ? (
            <img
              src={photo}
              alt={username}
              className="w-30 h-30 bg-gray-300 rounded-full object-cover border-2 border-black shadow-md mx-auto cursor-pointer"
              onClick={() => fileInputRef.current && fileInputRef.current.click()}
              title="Click to change photo"
            />
          ) : (
            <div
              className="w-30 h-30 bg-gray-300 rounded-full border-2 border-black shadow-md mx-auto flex items-center justify-center cursor-pointer text-gray-500"
              onClick={() => fileInputRef.current && fileInputRef.current.click()}
              title="Click to add photo"
            >
              Add Photo
            </div>
          )}
        </div>
        <div className="flex-col flex items-start">
          <div className="my-2 flex-col flex w-full">
            <div className="text-xl font-semibold">Username</div>
            {editing.username ? (
              <input
                className="p-3 rounded-xl bg-gray-200 text-gray-700 w-full"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onBlur={() =>
                  validateUsername(username) && saveField("username", username)
                }
                onKeyDown={(e) =>
                  e.key === "Enter" &&
                  validateUsername(username) &&
                  saveField("username", username)
                }
                maxLength={20}
                autoFocus
              />
            ) : (
              <div
                className="p-3 rounded-xl bg-gray-200 text-gray-500 cursor-pointer"
                onClick={() =>
                  setEditing((edit) => ({ ...edit, username: true }))
                }
                title="Click to edit"
              >
                {username}
              </div>
            )}
            {!validateUsername(username) && (
              <div className="text-red-500 text-sm">Username must be between 1-20 letters.</div>
            )}
          </div>
          <div className="my-2 w-full">
            <div className="text-lg font-semibold">Email Address</div>
            <div className="p-3 rounded-xl bg-gray-200 text-gray-500">
              {user.email}
            </div>
          </div>
          <div className="my-2 w-full">
            <div className="text-lg font-semibold">Phone Number</div>
            {editing.phone ? (
              <input
                className="p-3 rounded-xl bg-gray-200 text-gray-700 w-full"
                value={phone}
                onChange={(e) =>
                  setPhone(e.target.value.replace(/[^0-9]/g, ""))
                }
                onBlur={() => validatePhone(phone) && saveField("phone", phone)}
                onKeyDown={(e) =>
                  e.key === "Enter" &&
                  validatePhone(phone) &&
                  saveField("phone", phone)
                }
                maxLength={15}
                autoFocus
              />
            ) : (
              <div
                className="p-3 rounded-xl bg-gray-200 text-gray-500 cursor-pointer"
                onClick={() => setEditing((edit) => ({ ...edit, phone: true }))}
                title="Click to edit"
              >
                {phone || "Add Phone Number"}
              </div>
            )}
            {!validatePhone(phone) && (
              <div className="text-red-500 text-sm">
                Must be up to 15 digits
              </div>
            )}
          </div>
          <div className="my-2 w-full">
            <div className="text-lg font-semibold">Order Address</div>
            {editing.address ? (
              <textarea
                className="p-3 min-h-30 rounded-xl bg-gray-200 text-gray-700 w-full"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                onBlur={() =>
                  validateAddress(address) && saveField("address", address)
                }
                onKeyDown={(e) =>
                  e.key === "Enter" &&
                  validateAddress(address) &&
                  saveField("address", address)
                }
                maxLength={300}
                autoFocus
              />
            ) : (
              <div
                className="p-3 min-h-30 rounded-xl bg-gray-200 text-gray-500 cursor-pointer"
                onClick={() =>
                  setEditing((edit) => ({ ...edit, address: true }))
                }
                title="Click to edit"
              >
                {address || "Add Order Address"}
              </div>
            )}
            {!validateAddress(address) && (
              <div className="text-red-500 text-sm">Max 100 words</div>
            )}
          </div>
          <div className="mt-3 p-2 mx-auto w-1/3 rounded-xl text-center bg-black text-white hover:bg-red-600 transition-colors duration-200">
            <LogoutButton />
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default Profile;
