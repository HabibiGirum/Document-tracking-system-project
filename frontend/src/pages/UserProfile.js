import React from "react";
import "./UserProfile.css";
import {ToastContainer } from "react-toastify";

const UserProfile = () => {
    const userInfoFromStorage = localStorage.getItem("userInfo")
      ? localStorage.getItem("userInfo")
      : null;
    const user= JSON.parse(userInfoFromStorage);
  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2>User Profile</h2>
      </div>
      <div className="profile-body">
        <div className="profile-field">
          <label>Name:</label>
          <span>{user.name}</span>
        </div>
        <div className="profile-field">
          <label>Email:</label>
          <span>{user.email}</span>
        </div>
        <div className="profile-field">
          <label>College:</label>
          <span>{user.college}</span>
        </div>
        <div className="profile-field">
          <label>Department:</label>
          <span>{user.department}</span>
        </div>
        <div className="profile-field">
          <label>Role:</label>
          <span>{user.role}</span>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UserProfile;
