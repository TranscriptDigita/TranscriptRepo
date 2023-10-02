
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

function MobileNavBar() {

    const [isOpen, setIsOpen] = useState(false);

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    const {user} = useSelector((state) => state.auth)

  return (
    <div className="grid grid-cols-1 shadow">
        <div className='p-3 md:p-5 flex justify-between items-center'>
        <div>
        <span className='flex gap-x-2 font-semibold ml-10 mt-2'>Welcome!!!!!!!!  <h4 className='text-[black] font-semibold'>{user?.alumni?.fullName || "User"}</h4>  </span>
       
        {/** Uses a default User called user so i do not have to login each time i want to view page */}
        </div>
        <div className='p-3 md:p-5 flex justify-between items-center'>
     



        </div>
        

    </div>
    </div>
  )
}

export default MobileNavBar