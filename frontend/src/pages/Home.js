import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Form, Container, Button } from "react-bootstrap";
import Header from "../components/HomeHeader";
import { jsPDF } from "jspdf";
import { createRequest } from "../redux/actions/requestAction";
import { addDocument } from "../redux/actions/trackingAction";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import ".//Home.css";

function Home() {
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const userInfoFromStorage = localStorage.getItem("userInfo") || null;
  const { department, college, role } = JSON.parse(userInfoFromStorage) || {};

  useEffect(() => {
    if (userInfoFromStorage) {
      console.log(JSON.parse(userInfoFromStorage).name);
    }
  }, [userInfoFromStorage]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const now = new Date();
    const day = ("0" + now.getDate()).slice(-2);
    const uuid = uuidv4().substring(0, 5);
    const uniqueId = `${day}_${uuid}`;

    const fullName = event.target.elements.fullName.value;
    const department = event.target.elements.department.value;
    const purpose = event.target.elements.purpose.value;
    const to = event.target.elements.to.value;
    const documentType = event.target.elements.documentType.value;
    const filename = selectedFile.name;

    const data = {
      id: uniqueId,
      fullName,
      department,
      purpose,
      to,
      documentType,
      role,
      filename,
      college,
    };

    dispatch(createRequest(data));
    dispatch(addDocument(uniqueId));

    window.alert(`This is your tracking ID: ${uniqueId}`);

    const doc = new jsPDF();
    const content = `
      Name: ${fullName}
      Department: ${department}
      Purpose of Submission: ${purpose}
      To: ${to}
      Selected Document Type: ${documentType}
    `;
    doc.text(content, 10, 10);

    if (!selectedFile) {
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("college", college);
    formData.append("role", role);

    switch (college) {
      case "Electrical And Mechanical Collage":
        await axios.post("http://localhost:5000/api/upload/ECE_MECH", formData);
        break;
      case "College of Applied Sciences":
        await axios.post(
          "http://localhost:5000/api/upload/Applied_Scinces",
          formData
        );
        break;
      case "Biological And Chemical Collage":
        await axios.post("http://localhost:5000/api/upload/BIO_CHEM", formData);
        break;
      case "Architecture And Civil College":
        await axios.post(
          "http://localhost:5000/api/upload/ARCH_CIVIL",
          formData
        );
        break;
      case "Natural And Social Sciences College":
        await axios.post(
          "http://localhost:5000/api/upload/NATU_SOCI",
          formData
        );
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Container className="main-container home-page-container">
        <Card className="card">
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="fullName">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your full name"
                  required
                />
              </Form.Group>

              <Form.Group controlId="department">
                <Form.Label>Department</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your department"
                  required
                />
              </Form.Group>

              <Form.Group controlId="purpose">
                <Form.Label>Purpose of Submission</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter the purpose of submission"
                  required
                />
              </Form.Group>

              <Form.Group controlId="to">
                <Form.Label>To</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter recipient's name"
                  required
                />
              </Form.Group>

              <Form.Group controlId="documentType">
                <Form.Label>Select Document Type</Form.Label>
                <Form.Control as="select" required>
                  <option value="">Select</option>
                  <option value="Passport">Passport</option>
                  <option value="ID Card">ID Card</option>
                  <option value="Visa">Visa</option>
                  <option value="Others">Others</option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="file">
                <Form.Label>Upload File</Form.Label>
                <Form.Control
                  type="file"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  onChange={handleFileChange}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

export default Home;
