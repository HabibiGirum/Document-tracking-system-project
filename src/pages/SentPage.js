import React, { useEffect } from "react";
import "./SentPage.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchSentDocuments } from "../redux/actions/trackingAction";

const SentPage = () => {
  const dispatch = useDispatch();
  const { documents, loading, error } = useSelector(
    (state) => state.sentDocuments
  );

  useEffect(() => {
    const by = "Emily"; // Replace with the desired user ID
    dispatch(fetchSentDocuments(by, "", ""));
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const hasRejectedStatus = documents.some(
    (document) =>
      !document.status.department ||
      !document.status.college ||
      !document.status.vicepresident ||
      !document.status.humanResource
  );

  return (
    <div>
      <h1>Sent Documents</h1>
      <table className="sent-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Document Type</th>
            <th>Status</th>
            <th>Filename</th>
            <th>Date Created</th>
          </tr>
        </thead>
        <tbody>
          {documents.map((document) => (
            <tr key={document._id}>
              <td>{document.title}</td>
              <td>{document.documentType}</td>
              <td>
                <div
                  className={`status-icon ${
                    hasRejectedStatus ? "status-icon-red" : "status-icon-green"
                  }`}
                >
                  {hasRejectedStatus ? "Rejected" : "Accepted"}
                </div>
              </td>
              <td>
                <button
                  onClick={() => window.open(document.filename, "_blank")}
                >
                  {document.filename}
                </button>
              </td>
              <td>{document.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SentPage;
