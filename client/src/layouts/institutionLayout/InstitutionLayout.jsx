// react imports
import React, { useEffect, useState } from 'react';
import { HiOutlineRectangleGroup, HiListBullet, HiOutlineBell, HiOutlineCog6Tooth } from 'react-icons/hi2'

// components imports
import { Sidebar } from '../../components';

import Newnavbar from '../../components/navbar/Newnavbar';
import MobileNavBar from '../../components/navbar/MobileNavBar';

// rrd outlets
import { Outlet } from 'react-router-dom'

function InstitutionLayout() {
    

    const menuItems = [
        {
            title: 'Dashboard',
            icon: <HiOutlineRectangleGroup size={20}/>,
            path: '/institution/0000/dashboard'
        },
    
        {
            title: 'Staff List',
            icon: <HiListBullet size={20}/>,
            path: '/institution/0000/stafflist'
        },
    
        {
            title: 'Request',
            icon: <HiOutlineBell size={20}/>,
              path: '/institution/id:/requestlist',
        },
    
        {
            title: 'Settings',
            icon: <HiOutlineCog6Tooth size={20}/>,
            path: ''
        },
    
    ]



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
        {showNavbar ? (
          <Newnavbar />
        ) : (
          <MobileNavBar /> // Render MobileNavBar when the screen is smaller
        )}

        <div className="flex-1 p-4 bg-slate-100 overflow-y-auto">
          {/* Use 'overflow-y-auto' to enable vertical scrolling */}
          <Outlet />
        </div>
      </div>
    </div>
  </div>
  )
}

export default InstitutionLayout