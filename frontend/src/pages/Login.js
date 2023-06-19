import React, { useState } from "react";
import {
  Button,
  Col,
  Form,
  Card,
  Image,
  Row,
  Container,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/actions/userActions";
import FormContainer from "../components/FormContainer";
import Message from "../components/Message";
import Loader from "../components/Loader";
import myImage from "../assets/images/AASTU.jpg";
import ProtectedRoute from "../components/ProtectedRoute";
import Home from "./Home";
import "./Login.css";
import {ToastContainer } from "react-toastify";
import LoginHeader from "../components/LoginHeader";
import { Footer } from "../components";



const Login = () => {
  const isAuthenticated = useSelector(
    (state) => state.userLogin.isAuthenticated
  );
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error } = userLogin;
  console.log(userLogin);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    // Clear previous errors
    setEmailError("");
    setPasswordError("");

    // Perform basic validation
    let isValid = true;

    if (email.trim() === "") {
      setEmailError("Email is required");
      isValid = false;

    }
     else if (!email.includes("@")) {

      setEmailError("Email format incorrect");
      isValid = false;
    }

    if (password.trim() === "") {
      setPasswordError("Password is required");
      isValid = false;
    }

    if (isValid) {
      dispatch(login(email, password))
        .then()
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <>
    <LoginHeader />
      <Row
        className="justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Col md={3}>
          <Card className="my-2 my-card">
            
              <Container className="d-flex justify-content-center align-items-center">
                <Image src={myImage} height="90px" className="mr-3" />
              </Container>
              {loading && <Loader />}
              <Form onSubmit={onSubmit}>
              <h2 className="mb-2 text-center">Login</h2>
                <Form.Group controlId="email" className="col-md-9">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {emailError && (
                    <span className="error-text">{emailError}</span>
                  )}
                </Form.Group>

                <Form.Group controlId="password" className="col-md-9">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {passwordError && (
                    <span className="error-text">{passwordError}</span>
                  )}
                </Form.Group>

                <Button type="submit" className="mx-2 my-2  btn-block col-md-9">
                  Sign In
                </Button>
              </Form>
          
          </Card>
        </Col>
      </Row>
      <ToastContainer />
      <Footer />
    </>
  );
};

export default Login;
