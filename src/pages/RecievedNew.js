import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getRequests, openFile } from "../redux/actions/requestAction";
import { Table } from "react-bootstrap";
import SideBar from '../components/SideBar'
import { json } from "react-router-dom";
import userEvent from "@testing-library/user-event";

const ReceivedPage = () => {
  const dispatch = useDispatch();
  const { requests, isLoading, error } = useSelector((state) => state.requests);
  const [sortedRequests, setSortedRequests] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");

  const { userInfo } = useSelector((state) => state.userLogin)
  // const userInfo = JSON.parse(userInfo)
  console.log(userInfo)
  // if (role == 1) {
    
  // }
  useEffect(() => {
    dispatch(getRequests());
  }, [dispatch]);

  useEffect(() => {
    setSortedRequests([...requests]);
  }, [requests]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleFileOpen = (filename) => {
    dispatch(openFile(filename));
  };

  const handleSort = (key) => {
    if (key === "createdAt") {
      // Sort by createdAt
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

  return (
    <div>
      <h1>Received Requests</h1>
      <SideBar />
      <Table striped bordered>
        <thead>
          <tr>
            <th>From</th>
            <th>By</th>
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
          </tr>
        </thead>
        <tbody>
          {sortedRequests.map((request) => (
            <tr key={request._id}>
              <td>{request.from}</td>
              <td>{request.by}</td>
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
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ReceivedPage;
