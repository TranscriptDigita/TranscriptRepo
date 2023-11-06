
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

function StaffNavBar() {

    const [isOpen, setIsOpen] = useState(false);

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    const {user} = useSelector((state) => state.auth)

  return (
    <div className="grid grid-cols-1 shadow">
        <div className='p-3 md:p-5 flex justify-between items-center'>
        <div>
        <span className='flex gap-x-2 font-semibold'>Transcript Digita</span>
        </div>
        <span className='flex gap-x-2 font-semibold'>Home</span>
        <span className='flex gap-x-2 font-semibold'>About</span>
        <span className='flex gap-x-2 font-semibold'>Services</span>
        <span className='flex gap-x-2 font-semibold'>Contact</span>
       
        <div className='p-3 md:p-5 flex justify-between items-center'>
      
       


        </div>
        

    </div>
    </div>
  )
}

export default StaffNavBar