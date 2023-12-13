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


     

     // Function to extract institution ID from stored data
     const getInstitutionId = () => {
      const storedUserData = localStorage.getItem('institutionUser');
      if (storedUserData) {
          const userDataObject = JSON.parse(storedUserData);
          return userDataObject?.institution?._id;
        
      }
      return null;
  };

  const institutionId = getInstitutionId();

   // Log the value of institutionId
   console.log('Institution ID:', institutionId);
    

    const menuItems = [
        {
            title: 'Dashboard',
            icon: <HiOutlineRectangleGroup size={20}/>,
            path: '/institution/${institutionId}/dashboard'
        },
    
        {
            title: 'Staff List',
            icon: <HiListBullet size={20}/>,
            path: '/institution/${institutionId}/stafflist'
        },

        {
          title: 'Profile And Results',
          icon: <HiOutlineCog6Tooth size={20}/>,
          path: '/institution/${institutionId}/universityprofile'
      },
    
        {
            title: 'Request',
            icon: <HiOutlineBell size={20}/>,
              path: '/institution/${institutionId}/requestlist',
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



        useEffect(() => {
          // Retrieve and log the stored data when the component is mounted
          const storedUserData = localStorage.getItem('institutionUser');
          console.log('Stored Institution User Data:', storedUserData);
      }, []); // Empty dependency array means this effect runs only once, similar to componentDidMount
  

    

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