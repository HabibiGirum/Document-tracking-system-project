
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

  // const register = useSelector((state) => state.register);
  // const { loading, error, success } = register;
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
    console.log("kasfjdasfjakskjdfajkshfdhakskhdfhakjsdfhaskjdfaksdf");
    e.preventDefault();
    console.log(name); // Check if name value is logged correctly

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
      <Header />
      <Container className="justify-content-center h-500">
        <Row>
          <Form className="p-4 d-flex" onSubmit={handleSubmit}>
            <Col ml={5} style={{ width: "500px" }}>
              <Card ml={5} className="mt-5 p-2">
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
                    <option value="1">
                      College of Electrical and Mechanical Engineering
                    </option>
                    <option value="2">
                      College of Biological and Chemical Engineering
                    </option>
                    <option value="3">College of Applied Science</option>
                    <option value="4">
                      College of Natural and Social Science
                    </option>
                    <option value="5">
                      College of Architecture and Civil Engineering
                    </option>
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
                    <option value="1">
                      Electrical and Computer Engineering
                    </option>
                    <option value="2">ElectroMechanical Engineering</option>
                    <option value="3">Mechanical Engineering</option>
                    <option value="4">Software Engineering</option>
                    <option value="5">Biotechnology</option>
                    <option value="6">Chemical Engineering</option>
                    <option value="7">Environmental Engineering</option>
                    <option value="8">Geology</option>
                    <option value="9">Industrial Chemistry</option>
                    <option value="10">Food Science and Applied Science</option>
                    <option value="11">Architecture</option>
                    <option value="12">Civil Engineering Department</option>
                    <option value="13">Mining Engineering</option>
                    <option value="14">Mathematics </option>
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
                    <option value="1">Lecturer</option>
                    <option value="2">Department Head</option>
                    <option value="3">College Dean</option>
                    <option value="4">Vice President</option>
                    <option value="5">Human Resources</option>
                  </Form.Select>
                </Form.Group>
                {/* </Form> */}
              </Card>
            </Col>
            <Col ml={5} style={{ width: "500px" }}>
              <Card ml={5} className="mt-5 p-2 mb-2">
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
