import React from "react";
import { Container, Row, Col } from "react-bootstrap";
const Footer = () => {
  return (
    <footer className="b-0">
      <Container>
        <Row>
          <Col className="text-center py-3 my-5">
            Copyright &copy;2023
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
