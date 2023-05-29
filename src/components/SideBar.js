import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaEnvelope, FaUser } from "react-icons/fa";
import "./Sidebar.css";

const SideBar = () => {
  return (
    <div className="sidebar">
      <ul className="sidebar-nav">
        <li>
          <Link to="/home">
            <FaHome className="sidebar-icon" />
            Home
          </Link>
        </li>
        <li>
          <Link to="/received">
            <FaEnvelope className="sidebar-icon" />
            Received Requests
          </Link>
        </li>
        <li>
          <Link to="/profile">
            <FaUser className="sidebar-icon" />
            Profile
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
