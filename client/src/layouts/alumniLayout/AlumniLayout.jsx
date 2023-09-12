import React from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Navbar, Sidebar } from '../../components';
import {
  HiOutlineRectangleGroup,
  HiViewfinderCircle,
  HiOutlineBell,
  HiOutlineCog6Tooth,
} from 'react-icons/hi2';
import Newnavbar from '../../components/navbar/Newnavbar';

function AlumniLayout() {
  // Retrieve user data from Redux state
  const { user } = useSelector((state) => state.auth);

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
      title: 'Tracking',
      icon: <HiViewfinderCircle size={20} />,
      path: `/alumni/${user?.alumni?._id || defaultUser.alumni._id}/progress`,
    },

    {
      title: 'Notification',
      icon: <HiOutlineBell size={20} />,
      path: "",
    },

    {
      title: 'Settings',
      icon: <HiOutlineCog6Tooth size={20} />,
      path: `/alumni/${user?.alumni?._id || defaultUser.alumni._id}/change-password`,
    },
    
  ];

  return (
    <div className='flex-1 grid grid-cols-1 md:grid-cols-5 w-full fixed h-screen'>
    {/* sidebar */}
    <div className='bg-white md:block hidden'>
      <Sidebar menuItems={menuItems} />
    </div>

    <div className='md:col-span-4 flex-1 overflow-y-scroll flex flex-col '>
      
      {/* Navbar component placed here */}
      <Newnavbar />
      
      <div className='flex-1 flex flex-col p-4 bg-slate-100'>
        <Outlet />
      </div>
    </div>
  </div>
  );
}

export default AlumniLayout;
