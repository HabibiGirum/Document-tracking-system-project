import React from "react";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav className="justify-content-center mb-4">
      <Nav.Item>
        {step1 ? (
          <LinkContainer to="/">
            <Nav.Link>step1</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>step1</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step2 ? (
          <LinkContainer to="/">
            <Nav.Link>step2</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>step2</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step3 ? (
          <LinkContainer to="/">
            <Nav.Link>step3</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>step4</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step4 ? (
          <LinkContainer to="/placeorder">
            <Nav.Link>step5</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>step5</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
};

export default CheckoutSteps;
