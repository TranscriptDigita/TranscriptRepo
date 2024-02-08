import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Logs from "./Logs";

function AdminProfile() {
  const [adminData, setAdminData] = useState({});
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

  return (
    <div>
      <div style={{ display: "flex", height: "142px", backgroundColor: "purple", borderRadius: "20px", marginTop:"20px"}}>
        <img
          loading="lazy"
          srcSet="..."
          className={`w-40 h-40 md:w-20 md:h-20 lg:w-10 lg:h-10 rounded-full bg-white ${window.innerWidth > 768 ? 'md:w-60 md:h-60 lg:w-40 lg:h-40' : ''}`}
          style={{ marginTop: "20px", marginLeft: "20px" }}
        />
      </div>
      <div className="text-black text-sm font-semibold max-w-[71px] mt-20" style={{ marginLeft: "60px" }}>
        {/* Additional content */}
      </div>
      <p className={`text-sm font-semibold  ${adminData?.data?.isActive ? 'text-green-500' : 'text-red-500'}`}>
        Status: {adminData?.data?.isActive ? 'Active' : 'Inactive'}
      </p>
      <p className="text-sm font-semibold">
        Role: Administrator
      </p>
      <div className=" ">
        <p className="text-sm font-semibold">
          Email: {adminData?.data?.emailAddress}
        </p>
      </div>
    </div>
  );
}

export default AdminProfile;
