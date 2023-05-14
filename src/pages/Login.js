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
    <Container>
    <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh"}}
      >

                
                    <Card>
                        <Form className="p-3">
                            <Form.Group className="mb-3" controlId="home">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" />
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" />
                            </Form.Group>

                            <Form.Select aria-label="Default select example">
                                <Form.Label>select document type</Form.Label>
                                <option>select document type</option>
                                <option value="1">Leave</option>
                                <option value="2">Requritment</option>
                                <option value="3">Promostion</option>
                            </Form.Select>
                            <Form.Group controlId="formFileMultiple" className="mb-3">
                                <Form.Label>Multiple files input example</Form.Label>
                                <Form.Control type="file" multiple />
                            </Form.Group>
                            <Button variant="secondary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Card>
                
                </div>
            </Container>
    </Col>
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
