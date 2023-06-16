import React, { useEffect } from "react";
import "./SentPage.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchSentDocuments } from "../redux/actions/trackingAction";
import Layout from "./Layout";
import { openFile } from "../redux/actions/requestAction";

const SentPage = () => {
  const dispatch = useDispatch();
  const { documents, loading, error } = useSelector(
    (state) => state.sentDocuments
  );

  const userInfoFromStorage = localStorage.getItem("userInfo")
    ? localStorage.getItem("userInfo")
    : null;
  const userInfo = JSON.parse(userInfoFromStorage);
  const name = userInfo.name;
  const college = userInfo.college

  useEffect(() => {
    const fullName = name; // Replace with the desired user ID
    dispatch(fetchSentDocuments(fullName,college, "", ""));
  }, [dispatch, name]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const formatCreatedAt = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleString(undefined, options);
  };

  const handleOpenFile = (filename) => {
    dispatch(openFile(filename))
  }

  const renderStatusIcon = (status) => {
    if (status.rejected) {
      return <div className="status-icon rejected">Rejected</div>;
    } else if (status.accepted) {
      return <div className="status-icon accepted">Accepted</div>;
    } else {
      return (
        <div className="status-icons">
          <div
            className={`status-icon ${
              status.department ? "status-icon-green" : "status-icon-red"
            }`}
          >
            Department
          </div>
          <div
            className={`status-icon ${
              status.college ? "status-icon-green" : "status-icon-red"
            }`}
          >
            College
          </div>
          <div
            className={`status-icon ${
              status.vicepresident ? "status-icon-green" : "status-icon-red"
            }`}
          >
            Vice President
          </div>
          <div
            className={`status-icon ${
              status.humanResource ? "status-icon-green" : "status-icon-red"
            }`}
          >
            Human Resource
          </div>
        </div>
      );
    }
  };

  const renderDocuments = () => {
    return documents.map((document) => (
      <tr key={document._id}>
        <td>{document.documentType}</td>
        {userInfo.role === "Lecturer" && (
          <td>{renderStatusIcon(document.status)}</td>
        )}
        <td>
          <button
            onClick={() =>
              handleOpenFile(document.filename + "," + userInfo.college)
            }
          >
            {document.filename}
          </button>
        </td>
        <td>{formatCreatedAt(document.createdAt)}</td>
      </tr>
    ));
  };

  return (
    <div className="sent-page-container">
      <table className="sent-table">
        <thead>
          <tr>
            <th>Document Type</th>
            {userInfo.role === "Lecturer" && <th>Status</th>}
            <th>Filename</th>
            <th>Date Created</th>
          </tr>
        </thead>
        <tbody>{renderDocuments()}</tbody>
      </table>
    </div>
  );
};

export default SentPage;
