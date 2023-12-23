import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ChangePassword(props) {
  const [adminData, setAdminData] = useState({});
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const { id, token } = useParams();

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await fetch(`https://dacs.onrender.com/api/v1/admin/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const admin = await response.json();
          setAdminData(admin);
          console.log("Admin Data:", admin); // Log the API response
        } else {
          console.error("Failed to fetch admin data:", response.statusText);
        }
      } catch (error) {
        console.error("Error during admin data fetch:", error);
      }
    };

    fetchAdminData();
  }, [id, token]);

  const handleUpdatePassword = async () => {
    try {
      const response = await fetch("https://dacs.onrender.com/api/v1/admin/change-password", {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
          confirmNewPassword,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Password updated successfully:", data);
        toast.success("Password change successful!"); // Toast notification
      } else {
        console.error("Failed to update password:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating password:", error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-stretch gap-5 mt-20">
      <div className="flex-grow flex-basis-0 flex-shrink-0 md:flex-grow-0 md:flex-shrink md:flex-col items-stretch px-5">
        <div className="text-black text-base leading-5 tracking-wide mb-2 md:mb-4">Email</div>
        <input
          type="text"
          value={adminData?.data?.emailAddress}
          className="text-zinc-800 text-base bg-neutral-100 mt-2 pl-4 pr-4 md:pr-6 py-3 rounded-md border-[0.5px] border-solid border-neutral-700 border-opacity-80 max-md:pr-5"
          readOnly
        />
      </div>

      <div className="flex-grow flex-basis-0 flex-shrink-0 md:flex-grow-0 md:flex-shrink md:flex-col items-stretch px-5">
        <div className="text-black text-base leading-5 tracking-wide mb-2 md:mb-4">Current Password</div>
        <input
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className="text-black text-sm bg-neutral-100 mt-2 pl-4 pr-4 md:pr-6 py-4 rounded-md border-[0.5px] border-solid border-neutral-700 border-opacity-80 max-md:pr-5"
        />
      </div>

      <div className="flex-grow flex-basis-0 flex-shrink-0 md:flex-grow-0 md:flex-shrink md:flex-col items-stretch px-5">
        <div className="text-black text-base leading-5 tracking-wide mb-2 md:mb-4">New Password</div>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="text-black text-sm bg-neutral-100 mt-2 pl-4 pr-4 md:pr-6 py-4 rounded-md border-[0.5px] border-solid border-neutral-700 border-opacity-80 max-md:pr-5"
        />
      </div>

      <div className="flex-grow flex-basis-0 flex-shrink-0 md:flex-grow-0 md:flex-shrink md:flex-col items-stretch px-5">
        <div className="text-black text-base leading-5 tracking-wide mb-2 md:mb-4">Confirm Password</div>
        <input
          type="password"
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
          className="text-black text-sm bg-neutral-100 mt-2 pl-4 pr-4 md:pr-6 py-4 rounded-md border-[0.5px] border-solid border-neutral-700 border-opacity-80 max-md:pr-5"
        />
      </div>

      <div className="flex-grow flex-basis-0 flex-shrink-0 md:flex-grow-0 md:flex-shrink md:flex-col items-stretch px-5">
        <div className="text-black text-sm bg-purple-500 mt-2 pl-4 pr-4 md:pr-6 py-4 rounded-md border-[0.5px] border-opacity-80 max-md:pr-5">
          <button className="text-white font-medium" onClick={handleUpdatePassword}>
            Update password
          </button>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </div>
  );
}

export default ChangePassword;
