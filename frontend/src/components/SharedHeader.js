import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, Container } from "react-bootstrap";
import { FaUser, FaSignOutAlt } from "react-icons/fa";
import myImage from "../assets/images/AASTU.jpg";
import "./SharedHeader.css";

const SharedHeader = () => {
  function handleLogout() {
    // Remove user info from local storage
    localStorage.removeItem("userInfo");
    localStorage.removeItem("cartItems");

    // Perform any other logout actions (e.g. redirect to login page)
    // ...
  }

  return (
    <header>
      <Navbar variant="dark" expand="lg" collapseOnSelect className="navbar">
        <Container>
          <LinkContainer to="/home">
            <Navbar.Brand className="nav">
              <img src={myImage} alt="Logo" height="30" className="logo" />
              AASTU Document Tracking System
            </Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            className="toggle-btn"
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <LinkContainer to="/profile">
                <Nav.Link className="nav-link">
                  <FaUser className="nav-icon" />
                  Profile
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/login">
                <Nav.Link onClick={handleLogout} className="nav-link">
                  <FaSignOutAlt className="nav-icon" />
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default SharedHeader;
