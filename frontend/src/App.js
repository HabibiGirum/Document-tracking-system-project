import React from "react";
import { connect } from "react-redux";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { Login, Error, Register, Home, Landing } from "./pages";
import ProfilePage from "./pages/UserProfile";
import RecievedNew from "./pages/RecievedNew";
import SentPage from "./pages/SentPage";
import Layout from "./pages/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

function App({ isAuthenticated }) {
  console.log(isAuthenticated);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Layout><Home /></Layout></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Layout><ProfilePage /></Layout></ProtectedRoute>} />
        <Route path="/received" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Layout><RecievedNew /></Layout></ProtectedRoute>} />
        <Route path="/sent" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Layout><SentPage /></Layout></ProtectedRoute>} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

// Map the isAuthenticated state from the store to a prop in the App component
const mapStateToProps = (state) => ({
  isAuthenticated: state.userLogin.isAuthenticated,
});

// Connect the App component to the Redux store
const ConnectedApp = connect(mapStateToProps)(App);

export default ConnectedApp;