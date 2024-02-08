
//New Navbar For The Dashboard Section

import React, {useState} from 'react'

import {useSelector, useDispatch} from 'react-redux'

import {logout, reset} from '../../features/auth/authSlice'

// rrd imports
import { Link } from 'react-router-dom'

// material-ui  imports
import { Button } from '@mui/material';

// icons imports
import { HiChevronDown, HiBars3, HiXMark } from 'react-icons/hi2'
import MobileMenu from '../mobileMenu/MobileMenu';
import Logout from '../../pages/Logout/Logout';

function AdminNavbar() {

    const [isOpen, setIsOpen] = useState(false);

      // Function to extract institution ID from stored data
   const getAdminName = () => {
    const storedUserData = localStorage.getItem('AdminUser');
    if (storedUserData) {
        const userDataObject = JSON.parse(storedUserData);
        return userDataObject?.admin?.emailAddress;
      
    }
    return null;
};

const name = getAdminName();

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    const {user} = useSelector((state) => state.auth)

  return (
    <div className="grid grid-cols-1 shadow">
        <div className='p-3 flex justify-between items-center'>
        <div className='flex flex-col items-start justify-center'>
        <span className='flex gap-x-2 font-semibold'>Welcome back {name}</span>
      
        {/** Uses a default User called user so i do not have to login each time i want to view page */}
        </div>
        <div className='p-3 md:p-5 flex justify-between items-center'>
        
        <Logout/>
        </div>
    </div>
    </div>
  )
}

export default AdminNavbar;