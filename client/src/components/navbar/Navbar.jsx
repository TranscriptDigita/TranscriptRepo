import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../../features/auth/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import lumniImg from '../../assets/loumni2.png';

// material-ui imports
import { Button } from '@mui/material';

// icons imports
import { HiChevronDown, HiBars3, HiXMark } from 'react-icons/hi2';
import MobileMenu from '../mobileMenu/MobileMenu';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedInstitutionUser = JSON.parse(localStorage.getItem('institutionUser'));
  const storedStaff = JSON.parse(localStorage.getItem('staff'));
  const storedAdminUser = JSON.parse(localStorage.getItem('AdminUser'));
  
  

  const getInstitutionId = () => {
    if (storedInstitutionUser) {
      return storedInstitutionUser?.institution?._id;
    }
    return null;
  };

  const getInstitutionName = () => {
    if (storedInstitutionUser) {
      return storedInstitutionUser?.institution?.name;
    }
    return null;
  };

  const institutionName = getInstitutionName();


  

  const getStaffId = () => {
    if (storedStaff) {
      return storedStaff?._id;
    }
    return null;
  };

  const getStaffName = () => {
    if (storedStaff) {
      return storedStaff?.name;
    }
    return null;
  };

  const staffName = getStaffName();


  const getToken = () => {
    const storedStaffToken = localStorage.getItem('stafftoken');
    return storedStaffToken || null;
  };

  const getAdminId = () => {
    if (storedAdminUser) {
      return storedAdminUser?.admin?._id;
    }
    return null;
  };

  
  const getAdminName = () => {
    if (storedAdminUser) {
      return storedAdminUser?.admin?.name;
    }
    return null;
  };

  const adminName = getAdminName();

  const getAdminToken = () => {
    if (storedAdminUser) {
      return storedAdminUser?.token;
    }
    return null;
  };

  const onLogout = () => {
    // Clear user data from local storage
    localStorage.clear();

    // Dispatch logout and reset actions
    dispatch(logout());
    dispatch(reset());

    // Navigate to the home page
    navigate('/');
  };

  return (
    <div className="grid grid-cols-1 shadow">
      <div className="p-3 md:p-5 flex justify-between items-center">
        {/* Check for user */}
        {storedUser && storedUser.alumni.isVerified === true ? (
          // Render content for logged-in user
          <>
            <div className="hidden md:flex md:items-center justify-between gap-x-4 w-full">
              <span className="flex gap-x-2">
                Welcome <br />
                <h4 className="text-[#6B3FA0] font-semibold">
                  {storedUser.alumni.fullName}
                </h4>
              </span>
              <div className="flex gap-x-4">
                {/* Render links based on user role */}
                <Link to={`/alumni/${storedUser.alumni._id}/dashboard`} className="bg-[#6B3FA0] px-2 p-1 text-white rounded-full">
                  <small>Dashboard</small>
                </Link>
                <button
                  onClick={onLogout}
                  className="border-[#6B3FA0] text-[#6B3FA0] hover:border-[#6B3FA0] hover:text-[#6B3FA0] hover:bg-[#6B3FA0] hover:bg-opacity-10"
                >
                  Logout
                </button>
              </div>
            </div>
          </>
        ) : (
          // Check for institution user
          storedInstitutionUser ? (
            // Render content for institution user
            <>
              <div className="hidden md:flex md:items-center justify-between gap-x-4 w-full">
                {/* Render links based on institution user role */}
                <span className="flex gap-x-2">
                Welcome <br />
                <h4 className="text-[#6B3FA0] font-semibold">
                  {institutionName}
                </h4>
              </span>
              <div className="flex gap-x-4">
                <Link to={`/institution/${getInstitutionId()}/dashboard`} className="bg-[#6B3FA0] px-2 p-1 text-white rounded-full">
                  <small>Dashboard</small>
                </Link>
                <button
                  onClick={onLogout}
                  className="border-[#6B3FA0] text-[#6B3FA0] hover:border-[#6B3FA0] hover:text-[#6B3FA0] hover:bg-[#6B3FA0] hover:bg-opacity-10"
                >
                  Logout
                </button>
                </div>
              </div>
            </>
          ) : (
            // Check for staff user
            storedStaff ? (
              // Render content for staff user
              <>
                <div className="hidden md:flex md:items-center justify-between gap-x-4 w-full">
                  {/* Render links based on staff user role */}
                  <span className="flex gap-x-2">
                Welcome <br />
                <h4 className="text-[#6B3FA0] font-semibold">
                  {staffName}
                </h4>
              </span>
              <div className="flex gap-x-4">
                  {storedStaff.role === 'Evaluation Officer' ? (
                   
                   <Link to={`/evaluationofficer/${getStaffId()}/dashboard`} className="bg-[#6B3FA0] px-2 p-1 text-white rounded-full">
                      <small>Dashboard</small>
                    </Link>
                  ) : storedStaff.role === 'Auditor' ? (
                    <Link to={`/auditor/${getInstitutionId()}/${getToken()}/auditordashboard`} className="bg-[#6B3FA0] px-2 p-1 text-white rounded-full">
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
                </div>
                </div>
              </>
            ) : (
              // Check for admin user
              storedAdminUser ? (
                // Render content for admin user
                <>
                  <div className="hidden md:flex md:items-center justify-between gap-x-4 w-full">
                    {/* Render links based on admin user role */}
                    <span className="flex gap-x-2">
                Welcome <br />
                <h4 className="text-[#6B3FA0] font-semibold">
                  {adminName}
                </h4>
              </span>
              <div className="flex gap-x-4">
                    <Link to={`/admin/${getAdminId()}/${getAdminToken()}/dashboard`} className="bg-[#6B3FA0] px-2 p-1 text-white rounded-full">
                      <small>Dashboard</small>
                    </Link>
                    <button
                      onClick={onLogout}
                      className="border-[#6B3FA0] text-[#6B3FA0] hover:border-[#6B3FA0] hover:text-[#6B3FA0] hover:bg-[#6B3FA0] hover:bg-opacity-10"
                    >
                      Logout
                    </button>
                  </div>
                  </div>
                </>
              ) : (
                // Render content for not-logged-in user
                <>
                <div className="flex items-center justify-end p-4"><img src={lumniImg} alt="Company Logo" className="w-20" /></div>
                  <div>
                    <Link to={`/`} className="font-bold text-white">
                      TranscriptDigita
                    </Link>
                  </div>
                  <nav className="md:text-[14px] justify-evenly flex-1 hidden md:flex">
                  <Link to={`/`} className='flex'>
                            <p>Home</p>
                        </Link>
                        <Link to={`/#contact`} className='flex'>
                            <p>Contact</p>
                        </Link>

                        <Link to={`/#testimonials`} className='flex'>
                            <p>Testimonials</p>
                        </Link>
                  
                        <Link to={`/#services`} className='flex'>
                            <p>Services</p>
                        </Link>
                   
                  </nav>

                  <div className='mr-10'>
                    <Link to={`/selectlogin`}>
                      <Button
                        variant="contained"
                        className="md:block hidden bg-[#6B3FA0] hover:bg-[#6B3FA0]"
                      >
                        Sign in
                      </Button>
                    </Link>
                  </div>
                  <div>
                    <Link to={`/selectlogin`}>
                      <Button
                        variant="contained"
                        className="md:block hidden bg-[#6B3FA0] hover:bg-[#6B3FA0]"
                      >
                        Sign up
                      </Button>
                    </Link>
                  </div>
                </>
              )
            )
          )
        )}
        {/* Render mobile menu icon */}
        {isOpen ? (
          <HiXMark size={40} className="block md:hidden" onClick={toggleNavbar} />
        ) : (
          <HiBars3 size={40} className="block md:hidden" onClick={toggleNavbar} />
        )}
      </div>
      {/* Render mobile menu */}
      {isOpen ? <MobileMenu /> : ``}
    </div>
  );
}

export default Navbar;
