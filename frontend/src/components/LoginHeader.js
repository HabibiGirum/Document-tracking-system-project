import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, Container } from "react-bootstrap";
import {Image} from 'react-bootstrap'
import myImage from "../assets/images/AASTU.jpg";
const LoginHeader = () => {
 

    

  return (
    <header>
      <Navbar className="Navbar"  variant="dark" expand="lg" collapseOnSelect>
      <Image className="mx-5" src ={myImage} height='40px'/>
        <Container className="ml-3">
          
          <LinkContainer to="/">
            <Navbar.Brand className="nav">AASTU Document Tracking System </Navbar.Brand>
          </LinkContainer>
        
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default LoginHeader;
