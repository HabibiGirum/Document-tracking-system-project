import { Button,  Col, Form, Card, Image, Row ,Container} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {  useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/actions/userActions";
import FormContainer from "../components/FormContainer";
import Message from "../components/Message";
import Loader from "../components/Loader";
import myImage from "../assets/images/AASTU.jpg";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error } = userLogin;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password))
      .then(() => {
        // Redirect to the home page after successful login
        navigate("/home");
      })
      .catch((error) => {
        // Handle login error
        console.log(error);
      });;
    console.log(email);
    console.log(password);
  };
  return (
    <Row>
    
    <Col>
      <div
        className="d-flex justify-content-center align-items-center md"
        style={{ height: "100vh"}}
      >
        <FormContainer>
        <Image className="mx-5" src ={myImage} height='90px'/>

        <h1>Sign In</h1>
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type="submit" className="button col-md-12 p-3 my-2">
            Sign In
          </Button>
        </Form>
        </FormContainer> 
    </div>
      </Col>
      </Row>
    
  );
};

export default Login;
