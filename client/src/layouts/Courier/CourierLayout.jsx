// react imports
import React, { useEffect, useState } from 'react';
import { HiOutlineRectangleGroup, HiListBullet, HiOutlineBell, HiOutlineCog6Tooth } from 'react-icons/hi2';
// components imports
import { Sidebar } from '../../components';
import Newnavbar from '../../components/navbar/Newnavbar';
import MobileNavBar from '../../components/navbar/MobileNavBar';

// rrd outlets
import { Outlet, Link } from 'react-router-dom';

function CourierLayout() {
  // Function to extract institution ID from stored data
  const getCourierId = () => {
    const storedUserData = localStorage.getItem('courier');
    if (storedUserData) {
      const userDataObject = JSON.parse(storedUserData);
      return userDataObject?.logistic?._id;
    }
    return null;
  };

  const courierId = getCourierId();

  const getCourierName = () => {
    const storedUserData = localStorage.getItem('courier');
    if (storedUserData) {
      const userDataObject = JSON.parse(storedUserData);
      return userDataObject?.logistic?.businessName;
    }
    return null;
  };

  const courierName = getCourierName();

  const getCourierToken = () => {
    const storedUserData = localStorage.getItem('courier');
    if (storedUserData) {
      const userDataObject = JSON.parse(storedUserData);
      return userDataObject?.token;
    }
    return null;
  };

  const courierToken = getCourierToken();

  console.log("courierToken:", courierToken);
  console.log("courierId:", courierId);

  // State to track the window width
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // State to manage notification count
  const [notificationCount, setNotificationCount] = useState(0);

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

  // Fetch notifications and update the notificationCount
//   const fetchNotifications = async () => {
//     try {
//       const response = await fetch(`https://dacs.onrender.com/api/v1/institution/notifications/institution`, {
//         method: 'GET',
//         headers: {
//           Authorization: `Bearer ${institutionToken}`,
//         },
//       });
  
//       if (response.ok) {
//         const data = await response.json();
//         setNotificationCount(data.length); // Assuming the response is an array of notifications
//       } else {
//         console.error('Failed to fetch notifications');
//       }
//     } catch (error) {
//       console.error('Error fetching notifications:', error);
//     }
//   };
  

//   // Fetch notifications on component mount
//   useEffect(() => {
//     fetchNotifications();
//   }, []); // Fetch notifications when the component mounts

  // Function to determine whether to show the Navbar based on window width
  const showNavbar = windowWidth >= 768; // Adjust the breakpoint as needed

  // Update the menuItems to include notification count
  const menuItems = [
    {
      title: 'Dashboard',
      icon: <HiOutlineRectangleGroup size={20} />,
      path: `/courier/${courierId}/${courierToken}/dashboard`,
    },
   
    {
      title: 'Notification',
      icon: <HiOutlineBell size={20} />,
      path: ``,
      notificationCount: notificationCount,
    },
    {
      title: 'KYC Verification',
      icon: <HiOutlineCog6Tooth size={20} />,
      path: `/courier/${courierId}/${courierToken}/kyc`,
    },
    {
      title: 'Prices',
      icon: <HiOutlineCog6Tooth size={20} />,
      path: `/courier/${courierId}/${courierToken}/courierprices`,
    },
  ];

  return (
    <div className="flex-1 grid grid-cols-1 w-full">
      {/* Sidebar */}
      <div className="md:grid md:grid-cols-5 w-full">
        <div className="col-span-1">
          <Sidebar menuItems={menuItems} name={courierName} />
        </div>

        <div className="md:col-span-4 flex-1 flex flex-col">
          {/* Newnavbar with notification count */}
          <Link to={`/institution/${courierId}/institutionnotification`}>
            <div className="flex items-center justify-end p-4">
              <div className="relative">
                <HiOutlineBell size={40}  />
                {notificationCount > 0 && (
                  <div className="absolute top-0 right-0 -mt-1 -mr-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
                    {/* {notificationCount} */}
                  </div>
                )}
              </div>
            </div>
          </Link>

          {/* Conditional rendering of the Navbar component */}
          {showNavbar ? <Newnavbar /> : <MobileNavBar />}
          {/* Render MobileNavBar when the screen is smaller */}

          <div className="flex-1 p-4 bg-slate-100 overflow-y-auto">
            {/* Use 'overflow-y-auto' to enable vertical scrolling */}
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourierLayout;
