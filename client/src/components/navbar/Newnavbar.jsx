
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

function Newnavbar() {

    const [isOpen, setIsOpen] = useState(false);

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    const {user} = useSelector((state) => state.auth)

  return (
    <div className="grid grid-cols-1 shadow">
        <div className='p-3 md:p-5 flex justify-between items-center'>
        <div>
        <span className='flex gap-x-2 font-semibold'>Welcome!!!!!!!!</span>
        <h4 className='text-[black] font-semibold'>{user?.data?.fullName || "User"}</h4> 
        {/** Uses a default User called user so i do not have to login each time i want to view page */}
        </div>
        <div className='p-3 md:p-5 flex justify-between items-center'>
        <div class="w-10 h-10 bg-gray-500 rounded-full"></div>
        <button className="flex p-2 justify-center items-center gap-2 border-2 border-solid border-[#6B3FA0] rounded-md bg-white text-[#6B3FA0] hover:bg-[#6B3FA0] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#6B3FA0]" style={{ marginLeft: '10px', width: '100px' }} >
  LogOut
</button>



        </div>
        

    </div>
    </div>
  )
}

export default Newnavbar