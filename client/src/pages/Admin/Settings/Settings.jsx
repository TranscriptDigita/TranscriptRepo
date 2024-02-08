import React, { useState } from "react";
import { AdminChangePassword, AdminProfile, Notifications } from "../../../containers";

function Settings() {
  const [activeButton, setActiveButton] = useState("Profile");

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  return (
    <div>
      <div className="justify-between items-stretch flex max-w-[682px] gap-5 max-md:flex-wrap">
        <div className="text-zinc-800 text-lg font-semibold"> </div>
        <div className="justify-between items-stretch self-center flex gap-5 my-auto px-5 ">
          <button
            className={`text-${activeButton === "Profile" ? "purple-800" : "black"} text-sm font-${activeButton === "Profile" ? "semibold" : "normal"}`}
            onClick={() => handleButtonClick("Profile")}
          >
            Profile
          </button>
          <button
            className={`text-${activeButton === "Passwords" ? "purple-800" : "black"} text-sm font-${activeButton === "Passwords" ? "semibold" : "normal"}`}
            onClick={() => handleButtonClick("Passwords")}
          >
            Passwords
          </button>
          <button
            className={`text-${activeButton === "Notifications" ? "purple-800" : "black"} text-sm font-${activeButton === "Notifications" ? "semibold" : "normal"}`}
            onClick={() => handleButtonClick("Notifications")}
          >
            Notifications
          </button>
        </div>
      </div>

      {activeButton === "Profile" && <AdminProfile />}
      {activeButton === "Passwords" && <AdminChangePassword />}
      {activeButton === "Notifications" && <Notifications />}
    </div>
  );
}

export default Settings;
