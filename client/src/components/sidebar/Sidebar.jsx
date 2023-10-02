import React, { useState } from 'react';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu'; // Import the Menu icon from Material-UI
import './Sidebar.css'; // Import a CSS file for styling

function Sidebar({ menuItems }) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
    console.log('Sidebar Open:', isSidebarOpen);
  };

  const hideSidebarOnSmallScreen = () => {
    if (window.innerWidth <= 768) {
      setSidebarOpen(false);
      console.log('Sidebar Hidden on Small Screen');
    }
  };

  window.addEventListener('resize', hideSidebarOnSmallScreen);

  return (
    <div className={`sidebar-container ${isSidebarOpen ? 'open' : ''}`}>
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        {/* Use the Menu icon instead of the divs */}
        <button
          className={`md:hidden ${isSidebarOpen ? 'fixed top-5 left-5' : 'absolute top-5 left-5'}`}
          onClick={toggleSidebar}
        >
          <MenuIcon />
        </button>

        <List className={`p-2 gap-y-2 flex flex-col mt-10 ${isSidebarOpen ? '' : 'hidden'}`}>
          {menuItems &&
            menuItems.map((menuItem) => (
              <Link key={menuItem.title} to={menuItem.path} onClick={hideSidebarOnSmallScreen}>
                <ListItem
                  key={menuItem.title}
                  className={`${menuItem.isActive ? 'bg-[#6B3FA0] bg-opacity-10' : ''} hover:bg-[#6B3FA0] hover:bg-opacity-10 rounded-lg`}
                >
                  <ListItemIcon>{menuItem.icon}</ListItemIcon>
                  <ListItemText primary={menuItem.title} />
                </ListItem>
              </Link>
            ))}
        </List>
      </div>
    </div>
  );
}

export default Sidebar;