import { Card, Col, Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Footer from '../components/Footer';
import Header from '../components/HomeHeader';

function Home() {
    return (
        <>
            <Header />
            <Container className='justify-container-center mt-5 text-primary' >

                <Col md={4}>
                    <Card>
                        <Form className='p-3'>
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
                </Col>
            </Container>
            <Footer />
        </>
    );
}

export default Home;