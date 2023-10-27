import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import { HiBars3, HiXMark } from 'react-icons/hi2';
import { logout } from '../../features/auth/authSlice';

function Newnavbar() {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch(); // Get the dispatch function

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    const { user } = useSelector((state) => state.auth);

    const handleLogout = () => {
        // Dispatch the logout action to log the user out
        dispatch(logout());
    };

    return (
        <div className="grid grid-cols-1 shadow">
            <div className="p-3 md:p-5 flex justify-between items-center">
                <div>
                    {user ? ( // Check if a user is logged in
                        <>
                            <span className="flex gap-x-2 font-semibold">Welcome</span>
                            <h4 className="text-[black] font-semibold">{user?.data?.fullName}</h4>
                        </>
                    ) : (
                        <span>No User Logged In</span>
                    )}
                </div>
                <div className="p-3 md:p-5 flex justify-between items-center">
                    {user && ( // Render the user avatar and logout button if a user is logged in
                        <>
                            <div className="w-10 h-10 bg-gray-500 rounded-full"></div>
                            <Button
                                onClick={handleLogout}
                                className="flex p-2 justify-center items-center gap-2 border-2 border-solid border-[#6B3FA0] rounded-md bg-white text-[#6B3FA0] hover:bg-[#6B3FA0] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#6B3FA0]"
                                style={{ marginLeft: '10px', width: '100px' }}
                            >
                                Logout
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Newnavbar;
