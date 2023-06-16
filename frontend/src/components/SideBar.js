import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaPaperPlane, FaInbox, FaHome, FaBars } from "react-icons/fa";
import "./Sidebar.css";

const Sidebar = () => {
  const [isSidebarWrapped, setIsSidebarWrapped] = useState(false);
  const userInfoFromStorage = localStorage.getItem("userInfo")
    ? localStorage.getItem("userInfo")
    : null;
  const userInfo = JSON.parse(userInfoFromStorage);
  const handleSidebarToggle = () => {
    setIsSidebarWrapped(!isSidebarWrapped);
  };

  return (
    <div className={`layout-container ${isSidebarWrapped ? "wrapped" : ""}`}>
      <div className="sidebar">
        {/* <div className="hamburger-menu" onClick={handleSidebarToggle}>
          <FaBars />
        </div> */}
        <div className="logo">
          <h2>My App</h2>
        </div>
        <ul className="sidebar-menu">
          {!isSidebarWrapped && (
            <>
              <li>
                <Link to="/home">
                  <FaHome /> Home
                </Link>
              </li>
              <li>
                <Link to="/sent">
                  <FaPaperPlane /> Sent
                </Link>
              </li>
              <li>
                <Link to="/received">
                  <FaInbox /> Received
                </Link>
              </li>
              {userInfo.role === "Human Resources" ? (
                <li>
                  <Link to="/register">
                    <FaInbox /> Register
                  </Link>
                </li>
              ) : (
                ""  
              )}
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
