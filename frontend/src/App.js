import React from "react";
import { connect } from "react-redux";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { Login, Error, Register, Home, Landing } from "./pages";
import RecievedNew from "./pages/RecievedNew";
import SentPage from "./pages/SentPage";

import ProtectedRoute from "./components/ProtectedRoute";

function App({ isAuthenticated }) {
  console.log(isAuthenticated);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute
              children={<Home />}
              isAuthenticated={isAuthenticated}
            />
          }
        />
        <Route
          path="/received"
          element={
            <ProtectedRoute
              children={<RecievedNew />}
              isAuthenticated={isAuthenticated}
            />
          }
        />
        <Route
          path="/sent"
          element={
            <ProtectedRoute
              children={<SentPage />}
              isAuthenticated={isAuthenticated}
            />
          }
        />
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
