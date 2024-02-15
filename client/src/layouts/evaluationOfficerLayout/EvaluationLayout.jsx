import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Sidebar, StaffNavBarB } from '../../components';
import {
  HiOutlineRectangleGroup,
  HiViewfinderCircle,
  HiOutlineBell,
  HiOutlineCog6Tooth,
} from 'react-icons/hi2';
import { MdOutlineDeliveryDining } from "react-icons/md";
import Newnavbar from '../../components/navbar/Newnavbar';
import MobileNavBar from '../../components/navbar/MobileNavBar';
import Logout from '../../pages/Logout/Logout';

function EvaluationLayout() {
       // Function to extract staff ID from stored data
       const getStaffId = () => {
        const storedUserData = localStorage.getItem('staff');
        if (storedUserData) {
            const userDataObject = JSON.parse(storedUserData);
            return userDataObject?._id;
          
        }
        return null;
    };
    
    
    const staffId = getStaffId();

  // Define menu items, using defaultUser if user is not specified
  const menuItems = [
    {
      title: 'Dashboard',
      icon: <HiOutlineRectangleGroup size={20} />,
      path: `/evaluationofficer/${staffId}/dashboard`,
      isActive: true,
    },
     
    // {
    //   title: 'Select Courier',
    //   icon: <MdOutlineDeliveryDining size={20} />,
    //   path: `/evaluationofficer/${staffId}/choosecourier`,
    // },

    // {
    //   title: 'Request',
    //   icon: <HiOutlineBell size={20} />,
    //   path: "",
    // },

 

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
          {/* Conditional rendering of the Navbar component */}
         
  
          <div className="flex-1 p-4 bg-slate-100 overflow-y-auto">
            {/* Use 'overflow-y-auto' to enable vertical scrolling */}
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
  
}

export default EvaluationLayout;
