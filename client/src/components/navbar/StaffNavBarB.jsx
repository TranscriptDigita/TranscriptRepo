import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button } from '@mui/material';
import { HiChevronDown, HiBars3, HiXMark } from 'react-icons/hi2';
import MobileMenu from '../mobileMenu/MobileMenu';
import Logout from '../../pages/Logout/Logout';

function StaffNavBarB() {
  const { user } = useSelector((state) => state.institution);
  

  console.log('User Data:', user);

  const getStaffName = () => {
    const storedUserData = localStorage.getItem('staff');
    if (storedUserData) {
      const userDataObject = JSON.parse(storedUserData);
      return userDataObject?.emailAddress;
    }
    return null;
  };

  const name = getStaffName();

  console.log('name is', name)

  return (
    <div className="grid grid-cols-1 shadow h-full" style={{marginTop: "-95px", paddingRight:"20px",}}>
      <div className="p-3 md:p-5 flex justify-between items-center mt-20">
        <div>
          <h4 className="text-[black] font-semibold">Welcome Back {name}</h4>
          {/** Uses a default User called user so I do not have to log in each time I want to view the page */}
        </div>
        <div className="p-3 md:p-5 flex justify-between items-center">
          
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

export default StaffNavBarB;
