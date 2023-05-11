import { Form, Row, Col, Button, Card, Container } from 'react-bootstrap';

import Header from "../components/Header";
import Footer from "../components/Footer";


const Register = () => {
    return (
        <>
            <Header />
            <Container className='justify-content-center'>
                <Row>

                    <Col md={5}>
                        <Card md={4}>

                            <Form>
                                <Form.Group>
                                    <Form.Label>email address</Form.Label>
                                    <Form.Control
                                        type='email'
                                        placeholder='Enter Your Email'
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>password</Form.Label>
                                    <Form.Control
                                        type='password'
                                        placeholder='Enter Your Password'
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Comfirem password</Form.Label>
                                    <Form.Control
                                        type='password'
                                        placeholder='comfirem password'
                                    />
                                </Form.Group>

                                <Button className='btn btn-dark'>
                                    Register
                                </Button>
                            </Form>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </>
    )
}

export default Register;