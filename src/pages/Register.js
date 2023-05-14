import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from 'react-router-dom';
import { Form, Row, Col, Button, Card, Container } from "react-bootstrap";
import { register } from "../redux/actions/userActions";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Register = ({history}) => {
  
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [department, setDepartment] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState(null);
  const location = useLocation()
  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(register(name, email, password, lastName, role, department));
      console.log(name,email,lastName,password,department,role);

    }
  };
  return (
    <>
      <Header />
      <Container className="justify-content-center">
        <Row>
          <Col md={5}>
            <Card md={4}>
              <Form onSubmit={submitHandler}>
                <Form.Group>
                  <Form.Label>Name:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Last Name:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Your Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Department:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your department"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter Your Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Comfirem password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="comfirem password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </Form.Group>
                <Form.Select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <Form.Label>Select your role?</Form.Label>
                  <option value="0"></option>
                  <option value="1">Admin</option>
                  <option value="2">User</option>
                </Form.Select>

                <Button type="submit" className="btn btn-dark">Register</Button>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default Register;
