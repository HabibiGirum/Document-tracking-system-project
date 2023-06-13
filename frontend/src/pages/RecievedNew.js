import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getRequests, openFile } from "../redux/actions/requestAction";
import { sendAcceptanceMessage } from "../redux/actions/trackingAction";
import { createRequest } from "../redux/actions/requestAction";
import { Table, Modal, Button, Form } from "react-bootstrap";
import SideBar from "../components/SideBar";

const ReceivedPage = () => {
  const dispatch = useDispatch();
  const userInfoFromStorage = localStorage.getItem("userInfo")
    ? localStorage.getItem("userInfo")
    : null;
  const userInfo = JSON.parse(userInfoFromStorage);
  const role = userInfo.role;
  const { requests, isLoading, error } = useSelector((state) => state.requests);
  const [sortedRequests, setSortedRequests] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [showModal, setShowModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [additionalComments, setAdditionalComments] = useState("");
  const [accepted, setAccepted] = useState(null);

  useEffect(() => {
    dispatch(getRequests());
  }, [dispatch]);

  useEffect(() => {
    setSortedRequests([...requests]);
  }, [requests]);

  const handleFileOpen = (filename) => {
    dispatch(openFile(filename));
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
    const { id: id } = selectedRequest; // Extract the ID and role from the selected request
    // Access the form field values using event.target.elements
    const fullName = userInfo.name;
    const department = userInfo.department;

    let to;
    console.log(accepted);
    if (accepted === true) {
      if (userInfo.role === "Department Head") {
        to = "College Dean";
      } else if (userInfo.role === "College Dean") {
        to = "Vice President";
      } else if (userInfo.role === "") {
        to = "Human Resources";
      }
          dispatch(sendAcceptanceMessage({ id, role }));
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
    const data = {
      id, // Include the unique ID in the data
      fullName,
      department,
      purpose,
      to,
      documentType,
      role,
      filename,
      college,
    };
    console.log(data);
    dispatch(createRequest(data));


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
    <div>
      <h1>Received Requests</h1>
      <SideBar />
      <Table striped bordered>
        <thead>
          <tr>
            <th>From</th>
            <th>Document Type</th>
            <th>Purpose</th>
            <th>To</th>
            <th>
              <button onClick={() => handleSort("createdAt")}>
                Created Date {sortOrder === "asc" ? "▲" : "▼"}
              </button>
            </th>
            <th>Created Time</th>
            <th>Filename</th>
            <th>Actions</th>
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
              <td>
                <button onClick={() => handleFileOpen(request.filename)}>
                  {request.filename}
                </button>
              </td>
              <td>
                <Button variant="success" onClick={() => handleAccept(request)}>
                  Accept
                </Button>{" "}
                <Button variant="danger" onClick={() => handleReject(request)}>
                  Reject
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to perform this action?
          <Form.Group controlId="additionalComments">
            <Form.Label>Additional Comments:</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={additionalComments}
              onChange={handleCommentsChange}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleConfirmAction}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ReceivedPage;
