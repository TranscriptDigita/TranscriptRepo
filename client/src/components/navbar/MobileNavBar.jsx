import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../../features/auth/authSlice';
import { Link } from 'react-router-dom';
import { HiChevronDown, HiBars3, HiXMark } from 'react-icons/hi2';
import MobileMenu from '../mobileMenu/MobileMenu';

function MobileNavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const { user, institutionUser, staff, AdminUser } = useSelector((state) => state.auth);

  const onLogout = () => {
    // Clear user data from local storage
    localStorage.removeItem('userData');
    localStorage.removeItem('institutionUser');
    localStorage.removeItem('staff');
    localStorage.removeItem('stafftoken');
    localStorage.removeItem('AdminUser');

    // Dispatch logout and reset actions
    dispatch(logout());
    dispatch(reset());
  };

  return (
    <div className="grid grid-cols-1 shadow">
      <div className="p-3 md:p-5 flex justify-between items-center">
        <div>
          <span className="flex gap-x-2 font-semibold ml-10 mt-2">
            <h4 className="text-[black] font-semibold">{user?.alumni?.fullName}</h4>
          </span>
        </div>

        <div className="p-3 md:p-5 flex justify-between items-center">
          {user ? (
            // Render content for logged-in user
            <>
              <Link to={`/alumni/${user.alumni._id}/dashboard`} className="bg-[#6B3FA0] px-2 p-1 text-white rounded-full">
                <small>Dashboard</small>
              </Link>
              <button
                onClick={onLogout}
                className="border-[#6B3FA0] text-[#6B3FA0] hover:border-[#6B3FA0] hover:text-[#6B3FA0] hover:bg-[#6B3FA0] hover:bg-opacity-10"
              >
                Logout
              </button>
            </>
          ) : institutionUser ? (
            // Render content for institution user
            <>
              <Link to={`/institution/${institutionUser?.institution?._id}/dashboard`} className="bg-[#6B3FA0] px-2 p-1 text-white rounded-full">
                <small>Dashboard</small>
              </Link>
              <button
                onClick={onLogout}
                className="border-[#6B3FA0] text-[#6B3FA0] hover:border-[#6B3FA0] hover:text-[#6B3FA0] hover:bg-[#6B3FA0] hover:bg-opacity-10"
              >
                Logout
              </button>
            </>
          ) : staff ? (
            // Render content for staff user
            <>
              {staff.role === 'Evaluation Officer' ? (
                <Link to={`/evaluationofficer/${staff?._id}/dashboard`} className="bg-[#6B3FA0] px-2 p-1 text-white rounded-full">
                  <small>Dashboard</small>
                </Link>
              ) : staff.role === 'Auditor' ? (
                <Link to={`/auditor/${institutionUser?.institution?._id}/${staff?.token}/auditordashboard`} className="bg-[#6B3FA0] px-2 p-1 text-white rounded-full">
                  <small>Dashboard</small>
                </Link>
              ) : (
                // Handle other staff roles here
                null
              )}
              <button
                onClick={onLogout}
                className="border-[#6B3FA0] text-[#6B3FA0] hover:border-[#6B3FA0] hover:text-[#6B3FA0] hover:bg-[#6B3FA0] hover:bg-opacity-10"
              >
                Logout
              </button>
            </>
          ) : AdminUser ? (
            // Render content for admin user
            <>
              <Link to={`/admin/${AdminUser?.admin?._id}/${AdminUser?.token}/dashboard`} className="bg-[#6B3FA0] px-2 p-1 text-white rounded-full">
                <small>Dashboard</small>
              </Link>
              <button
                onClick={onLogout}
                className="border-[#6B3FA0] text-[#6B3FA0] hover:border-[#6B3FA0] hover:text-[#6B3FA0] hover:bg-[#6B3FA0] hover:bg-opacity-10"
              >
                Logout
              </button>
            </>
          ) : (
            // Render content for not-logged-in user
            <>
              <Link to={`/`} className="font-bold text-white">
                TranscriptDigita
              </Link>
              <Link to={`/selectlogin`}>
                <button variant="contained" className="md:block hidden bg-[#6B3FA0] hover:bg-[#6B3FA0]">
                  Sign in
                </button>
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Render mobile menu icon */}
      {isOpen ? (
        <HiXMark size={40} className="block md:hidden" onClick={toggleNavbar} />
      ) : (
        <HiBars3 size={40} className="block md:hidden" onClick={toggleNavbar} />
      )}

      {/* Render mobile menu */}
      {isOpen && <MobileMenu />}
    </div>
  );
}

export default MobileNavBar;
