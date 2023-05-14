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
      <Container className="justify-content-center h-500">
        <Row>
          <Col md={5}>
            <Card md={4} className="mt-5">
              <Form className="p-4">
                <Form.Group className="mt-2">
                  <Form.Label>user name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Your Full Name"
                  />
                </Form.Group>
                <Form.Group className="mt-2">
                  <Form.Label>College</Form.Label>
                </Form.Group>
                <Form.Select aria-label="Default select example">
                  <Form.Label>select user College</Form.Label>
                  <option>select user College</option>
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
                    College of Archtctuire and Civil Engineering
                  </option>
                </Form.Select>
                <Form.Group className="mt-2">
                  <Form.Label>Department</Form.Label>
                </Form.Group>
                <Form.Select aria-label="Default select example">
                  <Form.Label>select user Departemnt</Form.Label>
                  <option>select user Departmnent</option>
                  <option value="1">Electrical and Computer Engineering</option>
                  <option value="2">ElectroMechanical Engineering</option>
                  <option value="3">Mechanical Engineering</option>
                  <option value="4">Software Engineering</option>
                  <option value="5">Biotechnology</option>
                  <option value="6">Chemical Engineering</option>
                  <option value="7">Enviromental Engineering</option>
                  <option value="8">Geology</option>
                  <option value="9">industrial Chimistry</option>
                  <option value="10">Food Science and Applied Science</option>
                  <option value="11">Archtecture</option>
                  <option value="12">Civil Engineering Departement</option>
                  <option value="13">Mining Engneering</option>
                  <option value="14">Mathmatics Department</option>
                  <option value="15">Language</option>
                  <option value="16">Physics and Stastics</option>
                  <option value="17">Social Sciences</option>
                  <option value="17">Prengineering Programs</option>
                </Form.Select>
                <Form.Group className="mt-2">
                  <Form.Label>role of user</Form.Label>
                </Form.Group>
                <Form.Select aria-label="Default select example" className="mb-5">
                  <Form.Label>select the role of the user</Form.Label>
                  <option>select role of the user</option>
                  <option value="1">Lecturer</option>
                  <option value="2">Department Head</option>
                  <option value="3">College Dean</option>
                  <option value="4">Vice President</option>
                  <option value="5">Human Resoureces</option>
                </Form.Select>
              </Form>
            </Card>
          </Col>
          <Col md={5}>
            <Card md={4} className="mt-5">
              <Form className="p-4">
                <Form.Group className="mt-2">
                  <Form.Label>email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter Your Email" />
                </Form.Group>

                <Form.Group className="mt-2">
                  <Form.Label>password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter Your Password"
                  />
                </Form.Group>
                <Form.Group className="mt-2">
                  <Form.Label>Comfirem password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="comfirem password"
                  />
                </Form.Group>

                <Button className="btn btn-dark d-block mt-3">Register</Button>
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
