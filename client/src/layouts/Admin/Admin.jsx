import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Sidebar } from '../../components';
import {
  HiOutlineRectangleGroup,
  HiViewfinderCircle,
  HiOutlineBell,
  HiOutlineCog6Tooth,
} from 'react-icons/hi2';
import Newnavbar from '../../components/navbar/Newnavbar';
import MobileNavBar from '../../components/navbar/MobileNavBar';
import AdminNavbar from '../../components/navbar/AdminNavbar';
import Logout from '../../pages/Logout/Logout';
import lumniImg from '../../assets/loumni2.png';

function AdminLayout() {



   // Function to extract institution ID from stored data
   const getAdminId = () => {
    const storedUserData = localStorage.getItem('AdminUser');
    if (storedUserData) {
        const userDataObject = JSON.parse(storedUserData);
        return userDataObject?.admin?._id;
      
    }
    return null;
};


const getAdminToken = () => {
  const storedUserData = localStorage.getItem('AdminUser');
  if (storedUserData) {
      const userDataObject = JSON.parse(storedUserData);
      return userDataObject?.token;
    
  }
  return null;
};


const getEmailAddress = () => {
  const storedUserData = localStorage.getItem('AdminUser');
  if (storedUserData) {
      const userDataObject = JSON.parse(storedUserData);
      return userDataObject?.admin?.emailAddress;
    
  }
  return null;
};


const adminEmail = getEmailAddress();
const adminId = getAdminId();

   // Log the value of institutionId
   console.log('Admin ID:', adminId);



   const adminToken = getAdminToken();

   // Log the value of institutionId
   console.log('Admin Token:', adminToken);
    





  // Retrieve user data from Redux state
  const { user } = useSelector((state) => state.auth);

  // Default user data in case user is not specified
  const defaultUser = { alumni: { _id: 'defaultUserId' } };

  // Define menu items, using defaultUser if user is not specified
  const menuItems = [
    {
      title: 'Dashboard',
      icon: <HiOutlineRectangleGroup size={20} />,
      path: `/admin/${adminId}/${adminToken}/dashboard`,
      isActive: true,
    },
     
    {
      title: 'Available Institutions',
      icon: <HiViewfinderCircle size={20} />,
      path: `/admin/${adminId}/availableinstitutions`,
      
    },

    {
      title: 'Tables',
      icon: <HiOutlineBell size={20} />,
      path: `/admin/${adminId}/institutiontables`,
    },

    {
      title: 'Settings',
      icon: <HiOutlineCog6Tooth size={20} />,
      path: `/admin/${adminId}/${adminToken}/adminsettings`,
    },
    {
      title: ' ',
      icon: <Logout/>,
      path: ``,
    },
    
  ];

  // State to track the window width
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Update window width when the window is resized
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Function to determine whether to show the Navbar based on window width
  const showNavbar = windowWidth >= 768; // Adjust the breakpoint as needed

  return (
    <div className="flex-1 grid grid-cols-1 w-full">
      {/* Sidebar */} 
      <div className="md:grid md:grid-cols-5 w-full">
        <div className="col-span-1">
          <Sidebar menuItems={menuItems} />
        </div>
        
        <div className="md:col-span-4 flex-1 flex flex-col">
        <div className="flex items-center justify-end p-4"><img src={lumniImg} alt="Company Logo" className="w-20 " /></div>
        <div className="flex items-center justify-end p-4"><h3> {adminEmail} </h3></div>
          {/* Conditional rendering of the Navbar component */}
          {/* <div>
          {showNavbar ? (
            <AdminNavbar />
          ) : (
            <MobileNavBar /> // Render MobileNavBar when the screen is smaller
          )}
          </div> */}
  
          <div className="flex-1 p-4 bg-slate-100 overflow-y-auto">
            {/* Use 'overflow-y-auto' to enable vertical scrolling */}
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
  
}

export default AdminLayout;
