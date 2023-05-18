import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getRequests, openFile } from "../redux/actions/requestAction";
import { Table } from "react-bootstrap";

const ReceivedPage = () => {
  const dispatch = useDispatch();
  const { requests, isLoading, error } = useSelector((state) => state.requests);

  useEffect(() => {
    dispatch(getRequests());
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  console.log(requests);

  const handleFileOpen = (filename) => {
    dispatch(openFile(filename));
  };

  return (
    <div>
      <h1>Received Requests</h1>
      <Table striped bordered>
        <thead>
          <tr>
            <th>From</th>
            <th>By</th>
            <th>Document Type</th>
            <th>Purpose</th>
            <th>To</th>
            <th>Filename</th>
          </tr>
        </thead>
        <tbody>
          {requests &&
            requests.map((request) => (
              <tr key={request._id}>
                <td>{request.from}</td>
                <td>{request.by}</td>
                <td>{request.documentType}</td>
                <td>{request.purpose}</td>
                <td>{request.to}</td>
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
