import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Form, Container, Button } from "react-bootstrap";
import Tesseract from "tesseract.js";
import { jsPDF } from "jspdf";
import { uploadFile } from "../redux/actions/uploadFile";
import { createRequest } from "../redux/actions/requestAction";
import { Footer, Header } from "../components";
import { uploadImage } from "../redux/actions/uploadImageAction";

function Home() {
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState(null);
  const uploading = useSelector((state) => state.uploading);
  const uploadError = useSelector((state) => state.uploadError);

  const [image, setImage] = useState(null);
  const [result, setResult] = useState("");

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setImage(URL.createObjectURL(file));
  };

  const performOcr = () => {
    Tesseract.recognize(image, "eng")
      .then((response) => {
        const extractedText = response.data.text;
        const regex = /ETS\d+\/\d+/; // Regular expression to match "ETS0489/11" pattern
        const match = extractedText.match(regex);
        if (match) {
          setResult(match[0]);
        } else {
          setResult('Pattern not found');
        }      })
      .catch((error) => {
        console.error("Error performing OCR: ", error);
      });
  };

  const [selectedOption, setSelectedOption] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const userInfoFromStorage = localStorage.getItem("userInfo")
    ? localStorage.getItem("userInfo")
    : null;
  const department = JSON.parse(userInfoFromStorage)?.department;
  const college = JSON.parse(userInfoFromStorage)?.college;
  const roll = JSON.parse(userInfoFromStorage)?.role;

  useEffect(() => {
    if (userInfoFromStorage) {
      console.log(userInfoFromStorage.name);
    }
  }, [userInfoFromStorage]);

  const handleSubmit = async (event) => {
    // Mark the function as async
    event.preventDefault();

    // Generate a unique ID using uuidv4

    const now = new Date();
    const year = now.getFullYear();
    const month = ("0" + (now.getMonth() + 1)).slice(-2);
    const day = ("0" + now.getDate()).slice(-2);
    const hours = ("0" + now.getHours()).slice(-2);
    const minutes = ("0" + now.getMinutes()).slice(-2);
    const seconds = ("0" + now.getSeconds()).slice(-2);

    const uniqueId = `${year}${month}${day}_${hours}${minutes}${seconds}`;
    const fullName = event.target.elements.fullName.value;
    const department = event.target.elements.department.value;
    const purpose = event.target.elements.purpose.value;
    const to = event.target.elements.to.value;
    const documentType = event.target.elements.documentType.value;
    const filename = selectedFile.name;
    const concatenatedFilename = `${uniqueId}_${filename}`;

    const data = {
      id: uniqueId, // Include the unique ID in the data
      fullName,
      department,
      purpose,
      to,
      documentType,
      roll,
      filename: concatenatedFilename,
      college,
    };

    dispatch(createRequest(data));
    dispatch(uploadFile(selectedFile, college, roll));
    console.log(data);

    // Display an alert with the tracking ID
    window.alert(`This is your tracking ID: ${uniqueId}`);

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

    dispatch(uploadImage(selectedImage));
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
                defaultValue={JSON.parse(userInfoFromStorage)?.name}
                disabled
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Department:</Form.Label>
              <Form.Control
                type="text"
                name="department"
                defaultValue={JSON.parse(userInfoFromStorage)?.department}
                disabled
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="home">
              <Form.Label>Purpose of Submission</Form.Label>
              <Form.Control
                as="textarea"
                name="purpose"
                placeholder="Enter email"
                required
              />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>
            {roll === "Electrical And Mechanical Collage Dean" && (
              <Form.Group>
                <Form.Label>To:</Form.Label>
                <Form.Control
                  name="to"
                  as="select"
                  placeholder="Select To"
                  required
                >
                  <option value=">Select send To" disabled>
                    Select send To
                  </option>
                  <option>Electrical and Computer Department</option>
                  <option>Electromechanical Department</option>
                  <option>Mechanical Department</option>
                  <option>Software Department</option>
                  <option>Human Resources</option>
                  <option>Vice President</option>
                </Form.Control>
              </Form.Group>
            )}
            {department === "Electrical and Computer Engineering" && (
              <Form.Group>
                <Form.Label>To:</Form.Label>

                <Form.Control name="to" as="select" required>
                  <option value=">Select send To" disabled>
                    Select send To
                  </option>
                  <option>Electrical And Mechanical Collage</option>
                  <option>Electrical and Computer Department</option>
                  <option>Human Resources</option>
                  <option>Vice President</option>
                </Form.Control>
              </Form.Group>
            )}

            {department === "Mechanical Engineering" && (
              <Form.Group>
                <Form.Label>To:</Form.Label>

                <Form.Control name="to" as="select" required>
                  <option value=">Select send To" disabled>
                    Select send To
                  </option>
                  <option>Electrical And Mechanical Collage</option>
                  <option>Mechanical Department</option>
                  <option>Human Resources</option>
                  <option>Vice President</option>
                </Form.Control>
              </Form.Group>
            )}

            {department === "Electromechanical Engineering" && (
              <Form.Group>
                <Form.Label>To:</Form.Label>

                <Form.Control name="to" as="select" required>
                  <option value=">Select send To" disabled>
                    Select send To
                  </option>
                  <option>Electrical And Mechanical Collage</option>
                  <option>Electromechanical Department</option>
                  <option>Human Resources</option>
                  <option>Vice President</option>
                </Form.Control>
              </Form.Group>
            )}

            {department === "Software Engineering" && (
              <Form.Group>
                <Form.Label>To:</Form.Label>

                <Form.Control name="to" as="select" required>
                  <option value=">Select send To" disabled>
                    Select send To
                  </option>
                  <option>Electrical And Mechanical Collage</option>
                  <option>Software Department</option>
                  <option>Human Resources</option>
                  <option>Vice President</option>
                </Form.Control>
              </Form.Group>
            )}

            {roll === "Biological And Chemical College Dean" && (
              <Form.Group>
                <Form.Label>To:</Form.Label>
                <Form.Control name="to" as="select" required>
                  <option value=">Select send To" disabled>
                    Select send To
                  </option>
                  <option>Biotechnology Department</option>
                  <option>Chemical Department</option>
                  <option>Environmental Department</option>
                  <option>Human Resources</option>
                  <option>Vice President</option>
                </Form.Control>
              </Form.Group>
            )}

            {department === "Chemical Engineering" && (
              <Form.Group>
                <Form.Label>To:</Form.Label>

                <Form.Control name="to" as="select" required>
                  <option value=">Select send To" disabled>
                    Select send To
                  </option>
                  <option>Biological And Chemical Collage</option>
                  <option>Chemical Department</option>
                  <option>Human Resources</option>
                  <option>Vice President</option>
                </Form.Control>
              </Form.Group>
            )}
            {department === "Biotechnology Engineering" && (
              <Form.Group>
                <Form.Label>To:</Form.Label>

                <Form.Control name="to" as="select" required>
                  <option>Biological And Chemical Collage</option>
                  <option>Biotechnology Department</option>
                  <option>Human Resources</option>
                  <option>Vice President</option>
                </Form.Control>
              </Form.Group>
            )}

            {department === "Environmental Engineering" && (
              <Form.Group>
                <Form.Label>To:</Form.Label>

                <Form.Control name="to" as="select" required>
                  <option value=">Select send To" disabled>
                    Select send To
                  </option>
                  <option>Biological And Chemical Collage</option>
                  <option>Environmental Department</option>
                  <option>Human Resources</option>
                  <option>Vice President</option>
                </Form.Control>
              </Form.Group>
            )}

            {roll === "Natural And Social College Dean" && (
              <Form.Group>
                <Form.Label>To:</Form.Label>

                <Form.Control name="to" as="select" required>
                  <option value=">Select send To" disabled>
                    Select send To
                  </option>
                  <option>Mathematics Department</option>
                  <option>Language Department</option>
                  <option>Physics and Statistics</option>
                  <option>Social Sciences Department</option>
                  <option>Human Resources</option>
                  <option>Vice President</option>
                </Form.Control>
              </Form.Group>
            )}

            {department === "Mathematics Department" && (
              <Form.Group>
                <Form.Label>To:</Form.Label>

                <Form.Control name="to" as="select" required>
                  <option value=">Select send To" disabled>
                    Select send To
                  </option>
                  <option>Natural And Social Sciences College</option>
                  <option>Mathematics Department</option>
                  <option>Human Resources</option>
                  <option>Vice President</option>
                </Form.Control>
              </Form.Group>
            )}

            {department === "Language Department" && (
              <Form.Group>
                <Form.Label>To:</Form.Label>

                <Form.Control name="to" as="select" required>
                  <option value=">Select send To" disabled>
                    Select send To
                  </option>
                  <option>LNatural And Social College</option>
                  <option>Language Department</option>
                  <option>Human Resources</option>
                  <option>Vice President</option>
                </Form.Control>
              </Form.Group>
            )}
            {department === "Physics and Statistics Department" && (
              <Form.Group>
                <Form.Label>To:</Form.Label>

                <Form.Control name="to" as="select" required>
                  <option value=">Select send To" disabled>
                    Select send To
                  </option>
                  <option>LNatural And Social College</option>
                  <option>Physics and Statistics Department</option>
                  <option>Human Resources</option>
                  <option>Vice President</option>
                </Form.Control>
              </Form.Group>
            )}
            {department === "Social Sciences Department" && (
              <Form.Group>
                <Form.Label>To:</Form.Label>

                <Form.Control name="to" as="select" required>
                  <option value=">Select send To" disabled>
                    Select send To
                  </option>
                  <option>LNatural And Social College</option>
                  <option>Social Sciences Department</option>
                  <option>Human Resources</option>
                  <option>Vice President</option>
                </Form.Control>
              </Form.Group>
            )}

            {roll === "Architecture And Civil College Dean" && (
              <Form.Group>
                <Form.Label>To:</Form.Label>

                <Form.Control name="to" as="select" required>
                  {/* <option>Architecture And Civil College</option> */}
                  <option value=">Select send To" disabled>
                    Select send To
                  </option>
                  <option>Architecture Department</option>
                  <option>Civil Department</option>
                  <option>Mining Department</option>
                  <option>Human Resources</option>
                  <option>Vice President</option>
                </Form.Control>
              </Form.Group>
            )}

            {department === "Architecture Engineering" && (
              <Form.Group>
                <Form.Label>To:</Form.Label>

                <Form.Control name="to" as="select" required>
                  <option value=">Select send To" disabled>
                    Select send To
                  </option>
                  <option>Architecture And Civil College</option>
                  <option>Architecture Department</option>
                  <option>Human Resources</option>
                  <option>Vice President</option>
                </Form.Control>
              </Form.Group>
            )}
            {department === "Civil Engineering" && (
              <Form.Group>
                <Form.Label>To:</Form.Label>

                <Form.Control name="to" as="select" required>
                  <option value=">Select send To" disabled>
                    Select send To
                  </option>
                  <option>Architecture And Civil College</option>
                  <option>Civil Department</option>
                  <option>Human Resources</option>
                  <option>Vice President</option>
                </Form.Control>
              </Form.Group>
            )}

            {department === "Mining Engineering" && (
              <Form.Group>
                <Form.Label>To:</Form.Label>

                <Form.Control name="to" as="select" required>
                  <option value=">Select send To" disabled>
                    Select send To
                  </option>
                  <option>Architecture And Civil College</option>
                  <option>Mining Department</option>
                  <option>Human Resources</option>
                  <option>Vice President</option>
                </Form.Control>
              </Form.Group>
            )}

            {roll === "Applied College Dean" && (
              <Form.Group>
                <Form.Label>To:</Form.Label>
                <Form.Control name="to" as="select" required>
                  {/* <option>Applied Sciences College</option> */}
                  <option value=">Select send To" disabled>
                    Select send To
                  </option>
                  <option>Geology Department</option>
                  <option>Industrial Chemistry Department</option>
                  <option>Food Science and Applied Nutrition Department</option>
                  <option>Human Resources</option>
                  <option>Vice President</option>
                </Form.Control>
              </Form.Group>
            )}

            {department === "Geology Department" && (
              <Form.Group>
                <Form.Label>To:</Form.Label>
                <Form.Control name="to" as="select" required>
                  <option value=">Select send To" disabled>
                    Select send To
                  </option>
                  <option>Applied Sciences College</option>
                  <option>Geology Department</option>
                  <option>Human Resources</option>
                  <option>Vice President</option>
                </Form.Control>
              </Form.Group>
            )}
            {department === "Industrial Chemistry Department" && (
              <Form.Group>
                <Form.Label>To:</Form.Label>
                <Form.Control name="to" as="select" required>
                  <option value=">Select send To" disabled>
                    Select send To
                  </option>
                  <option>Applied Sciences College</option>
                  <option>Industrial Chemistry Department</option>
                  <option>Human Resources</option>
                  <option>Vice President</option>
                </Form.Control>
              </Form.Group>
            )}

            {department === "Food Science and Applied Nutrition Department" && (
              <Form.Group>
                <Form.Label>To:</Form.Label>
                <Form.Control name="to" as="select" required>
                  <option value=">Select send To" disabled>
                    Select send To
                  </option>
                  <option>Applied Sciences College</option>
                  <option>Food Science and Applied Nutrition Department</option>
                  <option>Human Resources</option>
                  <option>Vice President</option>
                </Form.Control>
              </Form.Group>
            )}

            {roll === "Vice President" && (
              <Form.Group>
                <Form.Label>To:</Form.Label>

                <Form.Control name="to" as="select" required>
                  <option value=">Select send To" disabled>
                    Select send To
                  </option>
                  <option>LNatural And Social College</option>
                  <option>Biological And Chemical Collage</option>
                  <option>Electrical And Mechanical Collage</option>
                  <option>Applied Sciences Collage</option>
                  <option>Natural And Social Sciences College</option>
                  <option>Human Resources</option>
                </Form.Control>
              </Form.Group>
            )}
            {roll === "Human Resources" && (
              <Form.Group>
                <Form.Label>To:</Form.Label>

                <Form.Control name="to" as="select" required>
                  <option value=">Select send To" disabled>
                    Select send To
                  </option>
                  <option>LNatural And Social College</option>
                  <option>Biological And Chemical Collage</option>
                  <option>Electrical And Mechanical Collage</option>
                  <option>Applied Sciences Collage</option>
                  <option>Natural And Social Sciences College</option>
                  <option>Vice President</option>
                </Form.Control>
              </Form.Group>
            )}

            <Form.Group>
              <Form.Label>select document type</Form.Label>

              <Form.Control
                aria-label="Default Control example"
                as="select"
                name="documentType"
                onChange={handleOptionChange}
                defaultValue="Select document type"
                placeholder="Select document type"
                required
              >
                <option value="Select document type" disabled>
                  Select document type
                </option>
                <option>Leave</option>
                <option>Recruitment</option>
                <option>Promotion</option>
              </Form.Control>
            </Form.Group>

            {selectedOption === "Promotion" && (
              <Form.Group>
                <Form.Label>Upload image document</Form.Label>
                <Form.Control
                  type="file"
                  name="imageDocument"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                {uploading ? "Uploading..." : "Upload"}
                {uploadError && <p>Failed to upload image.</p>}
              </Form.Group>
            )}

            {selectedOption === "Leave" && (
              <Form.Group>
                <Form.Label>Upload Image</Form.Label>
                <Form.Control type="file" onChange={handleImageUpload} />
                <Button onClick={performOcr}>Perform OCR</Button>
                {image && (
                  <img
                    src={image}
                    style={{ width: "100px", height: "100px" }}
                    alt="Upload"
                  />
                )}
                {result && <p>{result}</p>}
              </Form.Group>
            )}
            {selectedOption === "Leave" && (
              <Form.Group>
                <Form.Label>Select Leave type:</Form.Label>
                <Form.Control name="leaveType" as="select">
                  <option>Case 2</option>
                  <option>case 1</option>
                  <option>Health</option>
                  <option>study leave</option>
                </Form.Control>
              </Form.Group>
            )}
            <Form.Group controlId="formFileMultiple" className="mb-3">
              <Form.Label>Multiple files input example</Form.Label>
              <Form.Control
                type="file"
                accept="application/pdf"
                multiple
                onChange={handleFileChange}
              />
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
