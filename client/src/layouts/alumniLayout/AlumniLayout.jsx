import React, { useEffect, useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Sidebar } from '../../components';
import { HiOutlineRectangleGroup, HiViewfinderCircle, HiOutlineBell, HiOutlineCog6Tooth } from 'react-icons/hi2';
import Newnavbar from '../../components/navbar/Newnavbar';
import MobileNavBar from '../../components/navbar/MobileNavBar';
import Logout from '../../pages/Logout/Logout';
import lumniImg from '../../assets/loumni2.png';

function AlumniLayout() {
  // Retrieve user data from Redux state
  const { user } = useSelector((state) => state.auth);

  const getUserFullName = () => {
    const storedUserData = localStorage.getItem('user');
    if (storedUserData) {
        const userDataObject = JSON.parse(storedUserData);
        return userDataObject?.alumni?.fullName;
      
    }
    return null;
  };
  
  
  
  const userFullName = getUserFullName();
  console.log("User Email:", userFullName);


  const getUserToken = () => {
    const storedUserData = localStorage.getItem('user');
    if (storedUserData) {
      const userDataObject = JSON.parse(storedUserData);
      return userDataObject?.token;
    }
    return null;
  };

  const userToken = getUserToken();

  console.log("User Token:", userToken);

  // Default user data in case user is not specified
  const defaultUser = { alumni: { _id: 'defaultUserId' } };

  // Define menu items, using defaultUser if user is not specified
  const menuItems = [
    
    {
      title: 'Dashboard',
      icon: <HiOutlineRectangleGroup size={20} />,
      path: `/alumni/${user?.alumni?._id || defaultUser.alumni._id}/dashboard`,
      isActive: true,
    },
    {
      title: 'Requested Credentials',
      icon: <HiViewfinderCircle size={20} />,
      path: `/alumni/${user?.alumni?._id || defaultUser.alumni._id}/trackingpage`,
    },
    {
      title: 'Notification',
      icon: <HiOutlineBell size={20} />,
      path: `/alumni/${user?.alumni?._id || defaultUser.alumni._id}/alumninotification`,
    },
    {
      title: 'Settings',
      icon: <HiOutlineCog6Tooth size={20} />,
      path: `/alumni/${user?.alumni?._id || defaultUser.alumni._id}/${userToken}/settings`,
    },

    {
      title: ' ',
      icon: <Logout/>,
      path: ` `,
    },
  ];

  // State to track the window width
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // State to manage notification count
  const [notificationCount, setNotificationCount] = useState(0); // Initialize with 0

  const storedUserData = localStorage.getItem('User');
console.log("Stored User Data:", storedUserData);


  const getAlumniToken = () => {
    const storedUserData = localStorage.getItem('user');
    if (storedUserData) {
      const userDataObject = JSON.parse(storedUserData);
      return userDataObject?.token;
    }
    return null;
  };
  

  const alumniToken = getAlumniToken();

  console.log("Al Token:", alumniToken);
  // Fetch notifications and update the notificationCount
  const fetchNotifications = async () => {
    try {
      const response = await fetch(`https://dacs.onrender.com/api/v1/alumnus/notifications/alumni`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${alumniToken}`,
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        setNotificationCount(data.length); // Assuming the response is an array of notifications
      } else {
        console.error('Failed to fetch notifications');
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };
  

  // Fetch notifications on component mount
  useEffect(() => {
    fetchNotifications();
  }, []); // Fetch notifications when the component mounts

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
          {/* Newnavbar with notification count */}
          <Link to={`/alumni/${user?.alumni?._id || defaultUser.alumni._id}/alumninotification`}>
            <div className="flex items-center justify-end p-4">
            <img src={lumniImg} alt="Company Logo" className="w-20 mr-10" />
            {userFullName}
              <div className="relative">
                
                <HiOutlineBell size={40} />
                {notificationCount > 0 && (
                  <div className="absolute top-0 right-0 -mt-1 -mr-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
                    {notificationCount}
                  </div>
                )} 
              </div> 
            </div>
          </Link>
         

          {/* Conditional rendering of the Navbar component */}
          {/* {showNavbar ? <Newnavbar /> : <Newnavbar />}  */}
          
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

export default AlumniLayout;
