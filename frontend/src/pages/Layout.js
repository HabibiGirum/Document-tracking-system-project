import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/SideBar";
import "./layout.css"; // Import the CSS file
import SharedHeader from "../components/SharedHeader";

const Layout = ({ children }) => {
  return (
    <div>
      <SharedHeader className="header layout-top" />
      <div className="layout-container">
        <Sidebar className="sidebar" />
        <div className="content">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
