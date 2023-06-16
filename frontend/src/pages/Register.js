import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Row, Col, Button, Card, Container } from "react-bootstrap";
import { registerUser } from "../redux/actions/userActions";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Register = () => {
  const [name, setName] = useState("");
  const [college, setCollege] = useState("");
  const [department, setDepartment] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();

  const register = useSelector((state) => state.userRegister);
  const { loading, error, success } = register;
  console.log(
    role,
    password,
    confirmPassword,
    email,
    name,
    college,
    department
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if name value is logged correctly

    if (password !== confirmPassword) {
      return;
    }

    const userData = {
      name,
      college,
      department,
      role,
      email,
      password,
    };

    console.log(userData); // Check if userData object is logged correctly

    dispatch(registerUser(userData));
  };

  console.log(name);

  return (
    <>
      <Container className="register-container">
        <Row>
          <Form className="register-form" onSubmit={handleSubmit}>
            <Col ml={5} className="register-column">
              <Card ml={5} className="register-card">
                <Form.Group className="mt-2">
                  <Form.Label>User Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Your Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mt-2">
                  <Form.Label className="d-block">College</Form.Label>
                  <Form.Select
                    className="ml-3"
                    aria-label="Select College"
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                  >
                    <option>Select user College</option>
                    <option>
                      College of Electrical and Mechanical Engineering
                    </option>
                    <option>
                      College of Biological and Chemical Engineering
                    </option>
                    <option>College of Applied Science</option>
                    <option>College of Natural and Social Science</option>
                    <option>
                      College of Architecture and Civil Engineering
                    </option>
                    <option>Vice President</option>
                    <option>Human Resources</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mt-2">
                  <Form.Label className="d-block">Department</Form.Label>
                  <Form.Select
                    className="ml-3"
                    aria-label="Select Department"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                  >
                    <option>Select user Department</option>

                    <option>Electrical and Computer Engineering </option>
                    <option>Electromechanical Engineering</option>
                    <option>Mechanical Engineering</option>
                    <option>Software Engineering</option>

                    <option>Biotechnology Engineering</option>
                    <option>Chemical Engineering</option>
                    <option>Environmental Engineering</option>

                    <option>Mathematics Department</option>
                    <option>Language Department</option>
                    <option>Physics and Statistics Department</option>
                    <option>Social Sciences Department</option>

                    <option>Architecture Engineering</option>
                    <option>Civil Engineering</option>
                    <option>Mining Engineering </option>

                    <option>Geology Department</option>
                    <option>Industrial Chemistry Department</option>
                    <option>
                      Food Science and Applied Nutrition Department
                    </option>
                    <option>Vice President</option>
                    <option>Human Resources</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mt-2" style={{ marginBottom: "40px" }}>
                  <Form.Label className="d-block">Role of User</Form.Label>
                  <Form.Select
                    className="ml-3"
                    aria-label="Select Role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option>Select the Role of the User</option>
                    <option>Lecturer</option>

                    <option>Department Head</option>
                    <option>College Dean</option>
                    <option>Vice President</option>
                    <option>Human Resources</option>
                  </Form.Select>
                </Form.Group>
                {/* </Form> */}
              </Card>
            </Col>
            <Col ml={5} className="register-column">
              <Card className="register-card">
                {/* <Form className="p-4"> */}
                <Form.Group className="mt-2">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mt-2">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter Your Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mt-2">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </Form.Group>

                <Button className="btn btn-dark d-block mt-3" type="submit">
                  Register
                </Button>
              </Card>
            </Col>
          </Form>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default Register;
