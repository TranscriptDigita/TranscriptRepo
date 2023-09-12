// rrd imports
import { Outlet } from "react-router-dom";

// react imports
import React from 'react'
import AlumniLayout from "../alumniLayout/AlumniLayout";
import sidebar from "../../components/sidebar/Sidebar";
import Dashboard from "../../pages/Alumni/Dashboard/Dashboard";
// components imports
import { Navbar } from "../../components";

function Main() {

  
  {/**
  //Tried to exclude some pages from loading with the default navbar
  // List of page paths where you want to exclude the Navbar
  const excludedPaths = ['../alumniLayout/AlumniLayout', '../../components/sidebar/Sidebar', '../../pages/Alumni/Dashboard/Dashboard'];

  // Get the current pathname
  const currentPath = window.location.pathname;

  // Determine whether to render the Navbar
  const shouldRenderNavbar = !excludedPaths.includes(currentPath);  */}

  return (
    <div className="w-full flex flex-col w-full h-screen fixed ">
         {/* removing navbar from here removes it from all web pages */}
          {/* Conditional rendering of Navbar, seemed not to work */}
         {/* {shouldRenderNavbar && <Navbar />} */} 
         {/* Adding the default Navbar to all individual pages as quickfix to navbar appearing on all pages */} 
        
        <div className="flex-1 grid grid-cols-1 overflow-y-scroll h-auto">
            <Outlet/>
        </div>
    </div>
  )
}

export default Main