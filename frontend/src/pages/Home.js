import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Form, Container, Button } from "react-bootstrap";
import Footer from "../components/Footer";
import Header from "../components/HomeHeader";
import { jsPDF } from "jspdf";
import { createRequest } from "../redux/actions/requestAction";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
// import List from "../components/List";

function Home() {
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const userInfoFromStorage = localStorage.getItem("userInfo")
    ? localStorage.getItem("userInfo")
    : null;

  useEffect(() => {
    if (userInfoFromStorage) {
      console.log(userInfoFromStorage.name);
    }
  }, [userInfoFromStorage]);

  const handleSubmit = async (event) => {
    // Mark the function as async
    event.preventDefault();
    // Generate a unique ID using uuidv4
    const uniqueId = uuidv4();
    // Access the form field values using event.target.elements
    const fullName = event.target.elements.fullName.value;
    const department = event.target.elements.department.value;
    const purpose = event.target.elements.purpose.value;
    const to = event.target.elements.to.value;
    const documentType = event.target.elements.documentType.value;

    const data = {
      id: uniqueId, // Include the unique ID in the data
      fullName,
      department,
      purpose,
      to,
      documentType,
    };

    dispatch(createRequest(data));
    console.log(data);

    // Display an alert with the tracking ID
    window.alert(`This is your tracking ID: ${uniqueId}`);

    // Create FormData object
    const formData = new FormData();
    formData.append("image", event.target.elements.imageDocument.files[0]);
    try {
      // Send the image file to the Flask server
      const response = await axios.post("/process_image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Access the extracted text from the response
      const extractedText = response.data.text;
      console.log(extractedText);
    } catch (error) {
      console.log(error);
    }
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

    //doc.save("form.pdf");
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
                defaultValue={JSON.parse(userInfoFromStorage)?.name}
                disabled
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
                <option>Vice President</option>
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
                <option value="2">Recruitment</option>
                <option value="3">Promotion</option>
              </Form.Control>
            </Form.Group>

            {selectedOption === "3" && (
              <Form.Group>
                <Form.Label>Upload image document</Form.Label>
                <Form.Control
                  type="file"
                  name="imageDocument"
                  accept="image/*"
                />
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
              <Form.Control type="file" accept="application/pdf" multiple />
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
