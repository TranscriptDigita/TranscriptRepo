import React from 'react';
import './mobileMenu.css'

import { HiOutlineBellAlert, HiOutlineBuildingOffice2, HiOutlineUser } from 'react-icons/hi2'
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import lumniImg from '../../assets/loumni2.png';

function MobileMenu() {

    const menuItems = [
        {
            title: 'Home',
            path: '/',
            isActive: false,
            icon: <HiOutlineBuildingOffice2 size={30} />
        },

        {
            title: 'Login/SignUp',
            path: '/selectlogin',
            isActive: false,
            icon: <HiOutlineUser size={30} />
        },


    ]

    return (
        <div className='w-full bg-white p-3 z-50'>
            {/* <div className="flex items-center justify-end p-4"><img src={lumniImg} alt="Company Logo" className="w-20 " /></div> */}
            <List className='p-2 gap-y-2 flex flex-col'>
                {menuItems && menuItems.map((menuItem) => (
                    <Link
                        key={menuItem.title}
                        to={menuItem.path}
                        className='border-b'
                    >
                        <ListItem
                            key={menuItem.title}
                            className={`${menuItem.isActive == true ? `bg-[#6B3FA0] bg-opacity-10` : ``} `}
                        >
                            <ListItemIcon>{menuItem.icon}</ListItemIcon>
                            <ListItemText primary={menuItem.title} />
                        </ListItem>
                    </Link>
                ))}

            </List>
        </div>
    )
}

export default MobileMenu
