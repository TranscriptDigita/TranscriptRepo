
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

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    const {user} = useSelector((state) => state.auth)

  return (
    <div className="grid grid-cols-1 shadow">
        <div className='p-3 flex justify-between items-center'>
        <div className='flex flex-col items-start justify-center'>
        <span className='flex gap-x-2 font-semibold'>Welcome!!</span>
        <h4 className='text-[#252424] font-semibold'>{user?.data?.fullName || "User"}</h4> 
        {/** Uses a default User called user so i do not have to login each time i want to view page */}
        </div>
        <div className='p-3 md:p-5 flex justify-between items-center'>
        <div className="w-10 h-10 bg-blue-500 rounded-full"></div>
        <Logout/>
        </div>
    </div>
    </div>
  )
}

export default AdminNavbar;