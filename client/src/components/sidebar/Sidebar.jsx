import React, { useState } from "react";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu"; // Import the Menu icon from Material-UI
import "./Sidebar.css"; // Import a CSS file for styling
import Logout from "../../pages/Logout/Logout";

function Sidebar({ menuItems, name }) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [titleText, setTitleText] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
    console.log("Sidebar Open:", isSidebarOpen);
  };

  const hideSidebarOnSmallScreen = () => {
    if (window.innerWidth <= 1200) {
      setSidebarOpen(false);
      setTitleText(false);
      console.log("Sidebar Hidden on Small Screen");
    }
  };

  window.addEventListener("resize", hideSidebarOnSmallScreen);

  return (
    <div
      className={`sidebar-container ${isSidebarOpen ? "open" : ""}`}
      style={{ width: isSidebarOpen ? "" : "0px" }}
    >
      
      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        {/* Use the Menu icon instead of the divs */}
        <button
          className={`md:hidden ${
            isSidebarOpen ? "fixed top-5 left-5" : "absolute top-5 left-5"
          }`}
          onClick={toggleSidebar}
        >
          <MenuIcon />
        </button>
        <div className="flex flex-col">
        {titleText ? (
            <h4 className="p-5 text-black font-bold">{name}</h4>
          ) : (
            ""
          )}
          
          <List
            className={`p-2 gap-y-2 flex flex-col mt-10`}
            style={{
              backgroundColor: isSidebarOpen ? "" : " ", // Add your desired background color here
              width: isSidebarOpen ? "" : "100%",
              visibility: isSidebarOpen ? "" : "hidden",
            }}
          >
            {menuItems &&
              menuItems.map((menuItem) => (
                <Link
                  key={menuItem.title}
                  to={menuItem.path}
                  onClick={hideSidebarOnSmallScreen}
                >
                  <ListItem
                    key={menuItem.title}
                    className={`${
                      menuItem.isActive ? "bg-[#6B3FA0] bg-opacity-10" : ""
                    } hover:bg-[#6B3FA0] hover:bg-opacity-10 rounded-lg`}
                  >
                    <ListItemIcon>{menuItem.icon}</ListItemIcon>
                    <ListItemText primary={menuItem.title} />
                  </ListItem>
                </Link>
              ))}
          </List>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
