import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getRequests, openFile } from "../redux/actions/requestAction";
import { sendAcceptanceMessage } from "../redux/actions/trackingAction";
import { createRequest } from "../redux/actions/requestAction";
import { Table, Modal, Button, Form, Col } from "react-bootstrap";
import Layout from "./Layout";
import "./receivedPage.css";

const ReceivedPage = () => {
  const dispatch = useDispatch();
  const [sortedRequests, setSortedRequests] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [showModal, setShowModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [additionalComments, setAdditionalComments] = useState("");
  const [accepted, setAccepted] = useState(null);

  const { requests, isLoading, error } = useSelector((state) => state.requests);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const role = userInfo.role
  const department = userInfo.department
  const college = userInfo.college

  useEffect(() => {
    dispatch(getRequests());
  }, [dispatch]);

  useEffect(() => {
    setSortedRequests([...requests]);
  }, [requests]);

  const handleFileOpen = (filename) => {
    dispatch(openFile(filename,userInfo.role));
  };

  const handleSort = (key) => {
    if (key === "createdAt") {
      const sorted = [...sortedRequests].sort((a, b) =>
        sortOrder === "asc"
          ? a.createdAt.localeCompare(b.createdAt)
          : b.createdAt.localeCompare(a.createdAt)
      );
      setSortedRequests(sorted);
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    }
  };

  const formatDateTime = (dateTime) => {
    return new Date(dateTime).toLocaleString();
  };

  const handleAccept = (request) => {
    setAccepted(true);
    setSelectedRequest(request);
    setShowModal(true);
  };

  const handleReject = (request) => {
    setAccepted(false);
    setSelectedRequest(request);
    setShowModal(true);
  };

  const handleConfirmAction = () => {
    // Perform the accepted/rejected action here
    console.log(selectedRequest);
    const { id } = selectedRequest; // Extract the ID from the selected request
    const fullName = userInfo.name;
    const department = userInfo.department;
  const checkboxes = document.querySelectorAll(
    'input[type="checkbox"]:checked'
  );
  const checkedValues = Array.from(checkboxes).map(
    (checkbox) => checkbox.value
  );

    let to;
    if (accepted === true) {
      if (userInfo.role === "Department Head") {
        to = "College Dean";
      } else if (userInfo.role === "College Dean") {
        to = "Vice President";
      } else if (userInfo.role === "Vice President") {
        to = "Human Resources";
      }
    } else if (accepted === false) {
      if (userInfo.role === "Department Head") {
        to = selectedRequest.fullName;
      } else if (userInfo.role === "College Dean") {
        to = "Department Head";
      } else if (userInfo.role === "Vice President") {
        to = "College Dean";
      } else if (userInfo.role === "Human Resources") {
        to = "Vice President";
      }
    }

    const documentType = selectedRequest.documentType;
    const filename = selectedRequest.filename;
    const college = userInfo.college;
    const purpose = additionalComments;
    let data = {
      id,
      fullName,
      department,
      purpose,
      to,
      documentType,
      role: userInfo.role,
      filename,
      college,
    };
    console.log(data);
    dispatch(sendAcceptanceMessage({ id, role: userInfo.role, accepted }));
    dispatch(createRequest(data));
    
    for (let i = 0; i < checkedValues.length; i++){
      let newData = {
        ...data,
        to: checkedValues[i]
      }
      dispatch(createRequest(newData))
    }

    setShowModal(false);
  };

  const handleCloseModal = () => {
    setSelectedRequest(null);
    setShowModal(false);
  };

  const handleCommentsChange = (event) => {
    setAdditionalComments(event.target.value);
  };

  return (
    <div className="received-page-container">
      <Table striped bordered className="received-page-table">
        <thead>
          <tr>
            <th>From</th>
            <th>Document Type</th>
            <th>Purpose</th>
            <th>To</th>
            <th>
              <button color="black" onClick={() => handleSort("createdAt")}>
                Created Date {sortOrder === "asc" ? "▲" : "▼"}
              </button>
            </th>
            <th>Created Time</th>
            {userInfo.role != "Vice President" &&
            userInfo.role != "Human Resources" ? (
              <th>Filename</th>
            ) : null}

            {userInfo.role === "Lecturer" ? null : <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {sortedRequests.map((request) => (
            <tr key={request._id}>
              <td>{request.fullName}</td>
              <td>{request.documentType}</td>
              <td>{request.purpose}</td>
              <td>{request.to}</td>
              <td>{formatDateTime(request.createdAt).split(",")[0]}</td>
              <td>{formatDateTime(request.createdAt).split(",")[1]}</td>
              {userInfo.role != "Vice President" &&
              userInfo.role != "Human Resources" ? (
                <td>
                  <button
                    className="received-page-button"
                    onClick={() =>
                      handleFileOpen(request.filename + "," + userInfo.college)
                    }
                  >
                    {
                      request.filename.split("_")[
                        request.filename.split("_").length - 1
                      ]
                    }
                  </button>
                </td>
              ) : null}

              {userInfo.role === "Lecturer" ? null : (
                <td>
                  <Button
                    variant="success"
                    onClick={() => handleAccept(request)}
                  >
                    Accept
                  </Button>{" "}
                  <Button
                    variant="danger"
                    onClick={() => handleReject(request)}
                  >
                    Reject
                  </Button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal
        show={showModal}
        onHide={handleCloseModal}
        dialogClassName="received-page-modal-dialog"
        contentClassName="received-page-modal-content"
      >
        <Modal.Header closeButton>
          <Modal.Title className="received-page-modal-title">
            Confirmation
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to perform this action?
          <Form.Group
            controlId="additionalComments"
            className="received-page-form-group"
          >
            <Form.Label className="received-page-modal-body-label">
              Additional Comments:
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={additionalComments}
              onChange={handleCommentsChange}
            />
          </Form.Group>
        </Modal.Body>
        <Col>
          {role === "College Dean" &&
            college === "College of Electrical and Mechanical Engineering" && (
              <Form.Group>
                <Form.Label>To:</Form.Label>
                <div>
                  <Form.Check
                    type="checkbox"
                    name="to"
                    value="Electrical and Computer Department"
                    label="Electrical and Computer Department"
                    required
                  />
                  <Form.Check
                    type="checkbox"
                    name="to"
                    value="Electromechanical Department"
                    label="Electromechanical Department"
                    required
                  />
                  <Form.Check
                    type="checkbox"
                    name="to"
                    value="Mechanical Department"
                    label="Mechanical Department"
                    required
                  />
                  <Form.Check
                    type="checkbox"
                    name="to"
                    value="Software Department"
                    label="Software Department"
                    required
                  />
                  <Form.Check
                    type="checkbox"
                    name="to"
                    value="Human Resources"
                    label="Human Resources"
                    required
                  />
                  <Form.Check
                    type="checkbox"
                    name="to"
                    value="Vice President"
                    label="Vice President"
                    required
                  />
                </div>
              </Form.Group>
            )}
          {department === "Electrical and Computer Engineering" && (
            <Form.Group>
              <Form.Label>To:</Form.Label>
              <div>
                <Form.Check
                  type="checkbox"
                  name="to"
                  value="Electrical And Mechanical Collage"
                  label="Electrical And Mechanical Collage"
                  required
                />
                <Form.Check
                  type="checkbox"
                  name="to"
                  value="Electrical and Computer Department"
                  label="Electrical and Computer Department"
                  required
                />
                <Form.Check
                  type="checkbox"
                  name="to"
                  value="Human Resources"
                  label="Human Resources"
                  required
                />
                <Form.Check
                  type="checkbox"
                  name="to"
                  value="Vice President"
                  label="Vice President"
                  required
                />
              </div>
            </Form.Group>
          )}
          {department === "Mechanical Engineering" && (
            <Form.Group>
              <Form.Label>To:</Form.Label>
              <div>
                <Form.Check
                  type="checkbox"
                  name="to"
                  value="Electrical And Mechanical Collage"
                  label="Electrical And Mechanical Collage"
                  required
                />
                <Form.Check
                  type="checkbox"
                  name="to"
                  value="Mechanical Department"
                  label="Mechanical Department"
                  required
                />
                <Form.Check
                  type="checkbox"
                  name="to"
                  value="Human Resources"
                  label="Human Resources"
                  required
                />
                <Form.Check
                  type="checkbox"
                  name="to"
                  value="Vice President"
                  label="Vice President"
                  required
                />
              </div>
            </Form.Group>
          )}
          {department === "Electromechanical Engineering" && (
            <Form.Group>
              <Form.Label>To:</Form.Label>
              <div>
                <Form.Check
                  type="checkbox"
                  name="to"
                  value="Electrical And Mechanical Collage"
                  label="Electrical And Mechanical Collage"
                  required
                />
                <Form.Check
                  type="checkbox"
                  name="to"
                  value="Electromechanical Department"
                  label="Electromechanical Department"
                  required
                />
                <Form.Check
                  type="checkbox"
                  name="to"
                  value="Human Resources"
                  label="Human Resources"
                  required
                />
                <Form.Check
                  type="checkbox"
                  name="to"
                  value="Vice President"
                  label="Vice President"
                  required
                />
              </div>
            </Form.Group>
          )}
          {department === "Software Engineering" && (
            <Form.Group>
              <Form.Label>To:</Form.Label>
              <div>
                <Form.Check
                  type="checkbox"
                  name="to"
                  value="Electrical And Mechanical Collage"
                  label="Electrical And Mechanical Collage"
                  required
                />
                <Form.Check
                  type="checkbox"
                  name="to"
                  value="Software Department"
                  label="Software Department"
                  required
                />
                <Form.Check
                  type="checkbox"
                  name="to"
                  value="Human Resources"
                  label="Human Resources"
                  required
                />
                <Form.Check
                  type="checkbox"
                  name="to"
                  value="Vice President"
                  label="Vice President"
                  required
                />
              </div>
            </Form.Group>
          )}
          {college === "College of Biological and Chemical Engineering" &&
            role === "College Dean" && (
              <Form.Group>
                <Form.Label>To:</Form.Label>
                <div>
                  <Form.Check
                    type="checkbox"
                    name="to"
                    value="Biotechnology Department"
                    label="Biotechnology Department"
                    required
                  />
                  <Form.Check
                    type="checkbox"
                    name="to"
                    value="Chemical Department"
                    label="Chemical Department"
                    required
                  />
                  <Form.Check
                    type="checkbox"
                    name="to"
                    value="Environmental Department"
                    label="Environmental Department"
                    required
                  />
                  <Form.Check
                    type="checkbox"
                    name="to"
                    value="Human Resources"
                    label="Human Resources"
                    required
                  />
                  <Form.Check
                    type="checkbox"
                    name="to"
                    value="Vice President"
                    label="Vice President"
                    required
                  />
                </div>
              </Form.Group>
            )}
          {department === "Chemical Engineering" && (
            <Form.Group>
              <Form.Label>To:</Form.Label>
              <div>
                <Form.Check
                  type="checkbox"
                  name="to"
                  value="Biological And Chemical Collage"
                  label="Biological And Chemical Collage"
                  required
                />
                <Form.Check
                  type="checkbox"
                  name="to"
                  value="Chemical Department"
                  label="Chemical Department"
                  required
                />
                <Form.Check
                  type="checkbox"
                  name="to"
                  value="Human Resources"
                  label="Human Resources"
                  required
                />
                <Form.Check
                  type="checkbox"
                  name="to"
                  value="Vice President"
                  label="Vice President"
                  required
                />
              </div>
            </Form.Group>
          )}
          {department === "Biotechnology Engineering" && (
            <Form.Group>
              <Form.Label>To:</Form.Label>
              <div>
                <Form.Check
                  type="checkbox"
                  name="to"
                  value="Biological And Chemical Collage"
                  label="Biological And Chemical Collage"
                  required
                />
                <Form.Check
                  type="checkbox"
                  name="to"
                  value="Biotechnology Department"
                  label="Biotechnology Department"
                  required
                />
                <Form.Check
                  type="checkbox"
                  name="to"
                  value="Human Resources"
                  label="Human Resources"
                  required
                />
                <Form.Check
                  type="checkbox"
                  name="to"
                  value="Vice President"
                  label="Vice President"
                  required
                />
              </div>
            </Form.Group>
          )}
          {department === "Environmental Engineering" && (
            <Form.Group>
              <Form.Label>To:</Form.Label>
              <div>
                <Form.Check
                  type="checkbox"
                  name="to"
                  value="Biological And Chemical Collage"
                  label="Biological And Chemical Collage"
                  required
                />
                <Form.Check
                  type="checkbox"
                  name="to"
                  value="Environmental Department"
                  label="Environmental Department"
                  required
                />
                <Form.Check
                  type="checkbox"
                  name="to"
                  value="Human Resources"
                  label="Human Resources"
                  required
                />
                <Form.Check
                  type="checkbox"
                  name="to"
                  value="Vice President"
                  label="Vice President"
                  required
                />
              </div>
            </Form.Group>
          )}
          {college === "College of Natural and Social Science" &&
            role === "College Dean" && (
              <Form.Group>
                <Form.Label>To:</Form.Label>
                <div>
                  <Form.Check
                    type="checkbox"
                    name="to"
                    value="Mathematics Department"
                    label="Mathematics Department"
                    required
                  />
                  <Form.Check
                    type="checkbox"
                    name="to"
                    value="Physics and Statistics"
                    label="Physics and Statistics"
                    required
                  />
                  <Form.Check
                    type="checkbox"
                    name="to"
                    value="Social Sciences Department"
                    label="Social Sciences Department"
                    required
                  />
                  <Form.Check
                    type="checkbox"
                    name="to"
                    value="Language Department"
                    label="Language Department"
                    required
                  />
                  <Form.Check
                    type="checkbox"
                    name="to"
                    value="Human Resources"
                    label="Human Resources"
                    required
                  />
                  <Form.Check
                    type="checkbox"
                    name="to"
                    value="Vice President"
                    label="Vice President"
                    required
                  />
                </div>
              </Form.Group>
            )}
          {department === "Mathematics Department" && (
            <Form.Group>
              <Form.Label>To:</Form.Label>
              <div>
                <Form.Check
                  type="checkbox"
                  name="to"
                  value="Natural And Social Sciences College"
                  label="Natural And Social Sciences College"
                  required
                />
                <Form.Check
                  type="checkbox"
                  name="to"
                  value="Mathematics Department"
                  label="Mathematics Department"
                  required
                />
                <Form.Check
                  type="checkbox"
                  name="to"
                  value="Human Resources"
                  label="Human Resources"
                  required
                />
                <Form.Check
                  type="checkbox"
                  name="to"
                  value="Vice President"
                  label="Vice President"
                  required
                />
              </div>
            </Form.Group>
          )}

          {department === "Language Department" && (
            <Form.Group>
              <Form.Label>To:</Form.Label>
              <div>
                <Form.Check
                  type="checkbox"
                  name="to"
                  value="Natural And Social College"
                  label="Natural And Social College"
                  required
                />
                <Form.Check
                  type="checkbox"
                  name="to"
                  value="Language Department"
                  label="Language Department"
                  required
                />
                <Form.Check
                  type="checkbox"
                  name="to"
                  value="Human Resources"
                  label="Human Resources"
                  required
                />
                <Form.Check
                  type="checkbox"
                  name="to"
                  value="Vice President"
                  label="Vice President"
                  required
                />
              </div>
            </Form.Group>
          )}

          {department === "Physics and Statistics Department" && (
            <Form.Group>
              <Form.Label>To:</Form.Label>
              <div>
                <Form.Check
                  type="checkbox"
                  name="to"
                  value="Natural And Social College"
                  label="Natural And Social College"
                  required
                />
                <Form.Check
                  type="checkbox"
                  name="to"
                  value="Physics and Statistics Department"
                  label="Physics and Statistics Department"
                  required
                />
                <Form.Check
                  type="checkbox"
                  name="to"
                  value="Human Resources"
                  label="Human Resources"
                  required
                />
                <Form.Check
                  type="checkbox"
                  name="to"
                  value="Vice President"
                  label="Vice President"
                  required
                />
              </div>
            </Form.Group>
          )}

          {department === "Social Sciences Department" && (
            <Form.Group>
              <Form.Label>To:</Form.Label>
              <div>
                <Form.Check
                  type="checkbox"
                  name="to"
                  value="Natural And Social College"
                  label="Natural And Social College"
                  required
                />
                <Form.Check
                  type="checkbox"
                  name="to"
                  value="Social Sciences Department"
                  label="Social Sciences Department"
                  required
                />
                <Form.Check
                  type="checkbox"
                  name="to"
                  value="Human Resources"
                  label="Human Resources"
                  required
                />
                <Form.Check
                  type="checkbox"
                  name="to"
                  value="Vice President"
                  label="Vice President"
                  required
                />
              </div>
            </Form.Group>
          )}

          {college === "College of Architecture and Civil Engineering" &&
            college === "College of Architecture and Civil Engineering" && (
              <Form.Group>
                <Form.Label>To:</Form.Label>
                <div>
                  <Form.Check
                    type="checkbox"
                    name="to"
                    value="Architecture Department"
                    label="Architecture Department"
                    required
                  />
                  <Form.Check
                    type="checkbox"
                    name="to"
                    value="Civil Department"
                    label="Civil Department"
                    required
                  />
                  <Form.Check
                    type="checkbox"
                    name="to"
                    value="Mining Department"
                    label="Mining Department"
                    required
                  />
                  <Form.Check
                    type="checkbox"
                    name="to"
                    value="Human Resources"
                    label="Human Resources"
                    required
                  />
                  <Form.Check
                    type="checkbox"
                    name="to"
                    value="Vice President"
                    label="Vice President"
                    required
                  />
                </div>
              </Form.Group>
            )}

          {department === "Architecture Engineering" && (
            <Form.Group>
              <Form.Label>To:</Form.Label>
              <div>
                <Form.Check
                  type="checkbox"
                  name="to"
                  value="Architecture And Civil College"
                  label="Architecture And Civil College"
                  required
                />
                <Form.Check
                  type="checkbox"
                  name="to"
                  value="Architecture Department"
                  label="Architecture Department"
                  required
                />
                <Form.Check
                  type="checkbox"
                  name="to"
                  value="Human Resources"
                  label="Human Resources"
                  required
                />
                <Form.Check
                  type="checkbox"
                  name="to"
                  value="Vice President"
                  label="Vice President"
                  required
                />
              </div>
            </Form.Group>
          )}

          {department === "Civil Engineering" && (
            <Form.Group>
              <Form.Label>To:</Form.Label>
              <div>
                <Form.Check
                  type="checkbox"
                  name="to"
                  value="Architecture And Civil College"
                  label="Architecture And Civil College"
                  required
                />
                <Form.Check
                  type="checkbox"
                  name="to"
                  value="Civil Department"
                  label="Civil Department"
                  required
                />
                <Form.Check
                  type="checkbox"
                  name="to"
                  value="Human Resources"
                  label="Human Resources"
                  required
                />
                <Form.Check
                  type="checkbox"
                  name="to"
                  value="Vice President"
                  label="Vice President"
                  required
                />
              </div>
            </Form.Group>
          )}

          {department === "Mining Engineering" && (
            <Form.Group>
              <Form.Label>To:</Form.Label>
              <div>
                <Form.Check
                  type="checkbox"
                  name="to"
                  value="Architecture And Civil College"
                  label="Architecture And Civil College"
                  required
                />
                <Form.Check
                  type="checkbox"
                  name="to"
                  value="Mining Department"
                  label="Mining Department"
                  required
                />
                <Form.Check
                  type="checkbox"
                  name="to"
                  value="Human Resources"
                  label="Human Resources"
                  required
                />
                <Form.Check
                  type="checkbox"
                  name="to"
                  value="Vice President"
                  label="Vice President"
                  required
                />
              </div>
            </Form.Group>
          )}

          {college === "College of Applied Science" &&
            role === "College Dean" && (
              <Form.Group>
                <Form.Label>To:</Form.Label>
                <div>
                  <Form.Check
                    type="checkbox"
                    name="to"
                    value="Geology Department"
                    label="Geology Department"
                    required
                  />
                  <Form.Check
                    type="checkbox"
                    name="to"
                    value="Industrial Chemistry Department"
                    label="Industrial Chemistry Department"
                    required
                  />
                  <Form.Check
                    type="checkbox"
                    name="to"
                    value="Food Science and Applied Nutrition Department"
                    label="Food Science and Applied Nutrition Department"
                    required
                  />
                  <Form.Check
                    type="checkbox"
                    name="to"
                    value="Human Resources"
                    label="Human Resources"
                    required
                  />
                  <Form.Check
                    type="checkbox"
                    name="to"
                    value="Vice President"
                    label="Vice President"
                    required
                  />
                </div>
              </Form.Group>
            )}

          {department === "Geology Department" && (
            <Form.Group>
              <Form.Label>To:</Form.Label>
              <div>
                <Form.Check
                  type="checkbox"
                  name="to"
                  value="Applied Sciences College"
                  label="Applied Sciences College"
                  required
                />
                <Form.Check
                  type="checkbox"
                  name="to"
                  value="Geology Department"
                  label="Geology Department"
                  required
                />
                <Form.Check
                  type="checkbox"
                  name="to"
                  value="Human Resources"
                  label="Human Resources"
                  required
                />
                <Form.Check
                  type="checkbox"
                  name="to"
                  value="Vice President"
                  label="Vice President"
                  required
                />
              </div>
            </Form.Group>
          )}

          {department === "Industrial Chemistry Department" && (
            <Form.Group>
              <Form.Label>To:</Form.Label>
              <div>
                <Form.Check
                  type="checkbox"
                  name="to"
                  value="Applied Sciences College"
                  label="Applied Sciences College"
                  required
                />
                <Form.Check
                  type="checkbox"
                  name="to"
                  value="Industrial Chemistry Department"
                  label="Industrial Chemistry Department"
                  required
                />
                <Form.Check
                  type="checkbox"
                  name="to"
                  value="Human Resources"
                  label="Human Resources"
                  required
                />
                <Form.Check
                  type="checkbox"
                  name="to"
                  value="Vice President"
                  label="Vice President"
                  required
                />
              </div>
            </Form.Group>
          )}

          {department === "Food Science and Applied Nutrition Department" && (
            <Form.Group>
              <Form.Label>To:</Form.Label>
              <div>
                <Form.Check
                  type="checkbox"
                  name="to"
                  value="Applied Sciences College"
                  label="Applied Sciences College"
                  required
                />
                <Form.Check
                  type="checkbox"
                  name="to"
                  value="Food Science and Applied Nutrition Department"
                  label="Food Science and Applied Nutrition Department"
                  required
                />
                <Form.Check
                  type="checkbox"
                  name="to"
                  value="Human Resources"
                  label="Human Resources"
                  required
                />
                <Form.Check
                  type="checkbox"
                  name="to"
                  value="Vice President"
                  label="Vice President"
                  required
                />
              </div>
            </Form.Group>
          )}

          {role === "Vice President" && (
            <Form.Group>
              <Form.Label>To:</Form.Label>
              <div>
                <Form.Check
                  type="checkbox"
                  name="to"
                  value="Natural And Social College"
                  label="Natural And Social College"
                  required
                />
                <Form.Check
                  type="checkbox"
                  name="to"
                  value="Biological And Chemical Collage"
                  label="Biological And Chemical Collage"
                  required
                />
                <Form.Check
                  type="checkbox"
                  name="to"
                  value="Electrical And Mechanical Collage"
                  label="Electrical And Mechanical Collage"
                  required
                />
                <Form.Check
                  type="checkbox"
                  name="to"
                  value="Architecture And Civil College"
                  label="Architecture And Civil College"
                  required
                />
                <Form.Check
                  type="checkbox"
                  name="to"
                  value="Applied Sciences College"
                  label="Applied Sciences College"
                  required
                />
                <Form.Check
                  type="checkbox"
                  name="to"
                  value="Natural And Social Sciences College"
                  label="Natural And Social Sciences College"
                  required
                />
              </div>
            </Form.Group>
          )}
        </Col>
        <Modal.Footer className="received-page-modal-footer">
          <Button
            variant="secondary"
            onClick={handleCloseModal}
            className="received-page-modal-footer-button"
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleConfirmAction}
            className="received-page-modal-footer-button"
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ReceivedPage;
