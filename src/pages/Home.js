import React, { useState } from "react";
import { Card, Form, Container,Button } from "react-bootstrap";
import Footer from "../components/Footer";
import Header from "../components/HomeHeader";
import { jsPDF } from "jspdf";
// import List from "../components/List";


function Home() {
  const [selectedOption, setSelectedOption] = useState("");
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Access the form field values using event.target.elements
    
  const fullName = event.target.elements.fullName.value;
  const department = event.target.elements.department.value;
  const purpose = event.target.elements.purpose.value;
  const to = event.target.elements.to.value;
  const documentType = event.target.elements.documentType.value;
  const data={
    fullName,
    department,
    purpose,
    to,
    documentType

  }
  console.log(data);

  console.log("Full Name:", fullName);
  console.log("Department:", department);
  console.log("Purpose of Submission:", purpose);
  console.log("To:", to);
  console.log("Selected Document Type:", documentType);


    const doc = new jsPDF();

    // Generate the PDF content.
    const content = `
  Name: ${event.target.elements.fullName.value}
  Department: ${event.target.elements.department.value}
  Purpose of Submission: ${event.target.elements.purpose.value}
  To: ${event.target.elements.to.value}
  Selected Document Type: ${event.target.elements.documentType.value}
`;

    // Add the content to the PDF
    doc.text(content, 10, 10);

    // Save the PDF

    doc.save("form.pdf");
  };

  return (
    <>
      <Header />
      <Container className="justify-container-center mt-5 text-primary">
        <Card>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Name :</Form.Label>
              <Form.Control
                type="text"
                name="fullName"
                placeholder="Enter your full name."
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Department:</Form.Label>
              <Form.Control
                type="text"
                name="department"
                placeholder="enter your department"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="home">
              <Form.Label>Purpose of Submission</Form.Label>
              <Form.Control
                as="textarea"
                name="purpose"
                placeholder="Enter email"
              />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>
            <Form.Group>
              <Form.Label>To:</Form.Label>

              <Form.Control name="to" as="select">
                <option>Department</option>
                <option>College</option>
                <option>HR</option>
                <option>vice presedant</option>
              </Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>select document type</Form.Label>

              <Form.Control
                aria-label="Default Control example"
                as="select"
                name="documentType"
                onChange={handleOptionChange}
              >
                <option>Control document type</option>
                <option value="1">Leave</option>
                <option value="2">Requritment</option>
                <option value="3">Promotion</option>
              </Form.Control>
            </Form.Group>

            {selectedOption === "3" && (
              <Form.Group>
                <Form.Label>Upload image document</Form.Label>
                <Form.Control type="file" name="imageDocument" />
              </Form.Group>
            )}
            {selectedOption === "1" && (
              <Form.Group>
                <Form.Label>Select Leave type:</Form.Label>
                <Form.Control name="leaveType" as="select">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </Form.Control>
              </Form.Group>
            )}
            <Form.Group controlId="formFileMultiple" className="mb-3">
              <Form.Label>Multiple files input example</Form.Label>
              <Form.Control type="file" multiple />
            </Form.Group>
            <Button variant="secondary" type="submit">
              Submit
            </Button>
          </Form>
        </Card>
      </Container>
      <Footer />
    </>
  );
}

export default Home;

//// next task create document_request_action.js
///  constant.js
/// reducer.js
/// and store.js
