import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaUser,
  FaPaperPlane,
  FaInbox,
  FaHome,
  FaBars,
  FaUserPlus,
} from "react-icons/fa";
import "./Sidebar.css";

const Sidebar = () => {
  const [isSidebarWrapped, setIsSidebarWrapped] = useState(false);
  const location = useLocation();

  const userInfoFromStorage = localStorage.getItem("userInfo")
    ? localStorage.getItem("userInfo")
    : null;
  const userInfo = JSON.parse(userInfoFromStorage);

  const handleSidebarToggle = () => {
    setIsSidebarWrapped(!isSidebarWrapped);
  };

  const isActive = (path) => {
    return location.pathname === path ? "active" : "";
  };

  const getSidebarIcon = (path) => {
    if (path === "/homePage") return <FaHome />;
    if (path === "/home") return <FaHome />;
    if (path === "/received") return <FaInbox />;
    if (path === "/sent") return <FaPaperPlane />;
    if (path === "/register") return <FaUserPlus />;
    return null;
  };

  return (
    <div className={`layout-container ${isSidebarWrapped ? "wrapped" : ""}`}>
      <div className="sidebar">
        {/* <div className="hamburger-menu" onClick={handleSidebarToggle}>
          <FaBars />
        </div> */}
        <div className="logo">
          <h2>{getSidebarIcon(location.pathname)}</h2>
        </div>
        <ul className="sidebar-menu">
          {!isSidebarWrapped && (
            <>
              {userInfo.role === "Lecturer" && (
                <li className={isActive("/home")}>
                  <Link to="/home">
                    <FaHome />
                    Home
                  </Link>
                </li>
              )}
              {(userInfo.role === "Vice President" ||
                userInfo.role === "Human Resources" ||
                userInfo.role === "College Dean" ||
                userInfo.role === "Department Head") && (
                <li className={isActive("/homePage")}>
                  <Link to="/homePage">
                    <FaHome />
                    Home
                  </Link>
                </li>
              )}
              <li className={isActive("/received")}>
                <Link to="/received">
                  <FaInbox />
                  Received
                </Link>
              </li>
              <li className={isActive("/sent")}>
                <Link to="/sent">
                  <FaPaperPlane />
                  Sent
                </Link>
              </li>

              {userInfo.role === "Human Resources" && (
                <li className={isActive("/register")}>
                  <Link to="/register">
                    <FaUserPlus />
                    Register
                  </Link>
                </li>
              )}
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
