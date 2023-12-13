import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button } from '@mui/material';
import { HiChevronDown, HiBars3, HiXMark } from 'react-icons/hi2';
import MobileMenu from '../mobileMenu/MobileMenu';
import Logout from '../../pages/Logout/Logout';

function Newnavbar() {
  const { user } = useSelector((state) => state.institution);
  

  console.log('User Data:', user);

  return (
    <div className="grid grid-cols-1 shadow">
      <div className="p-3 md:p-5 flex justify-between items-center">
        <div>
          <span className="flex gap-x-2 font-semibold">Welcome !!!!!!!!</span>
          <h4 className="text-[black] font-semibold">{user?.data?.fullName}</h4>
          {/** Uses a default User called user so I do not have to log in each time I want to view the page */}
        </div>
        <div className="p-3 md:p-5 flex justify-between items-center">
          <div class="w-10 h-10 bg-gray-500 rounded-full"></div>
          {/* <button
            className="flex p-2 justify-center items-center gap-2 border-2 border-solid border-[#6B3FA0] rounded-md bg-white text-[#6B3FA0] hover:bg-[#6B3FA0] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#6B3FA0]"
            style={{ marginLeft: '10px', width: '100px' }}
          >
            LogOut
          </button> */}
          <Logout />
        </div>
      </div>
    </div>
  );
}

export default Newnavbar;
