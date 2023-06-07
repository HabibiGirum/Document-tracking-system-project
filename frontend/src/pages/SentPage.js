import React, { useEffect } from "react";
import "./SentPage.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchSentDocuments } from "../redux/actions/trackingAction";

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

  useEffect(() => {
    const fullName = name; // Replace with the desired user ID
    dispatch(fetchSentDocuments(fullName, "", ""));
  }, [dispatch]);

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
                <div className="status-icons">
                  <div
                    className={`status-icon ${
                      document.status.department
                        ? "status-icon-green"
                        : "status-icon-red"
                    }`}
                  >
                    Department
                  </div>
                  <div
                    className={`status-icon ${
                      document.status.college
                        ? "status-icon-green"
                        : "status-icon-red"
                    }`}
                  >
                    College
                  </div>
                  <div
                    className={`status-icon ${
                      document.status.vicepresident
                        ? "status-icon-green"
                        : "status-icon-red"
                    }`}
                  >
                    Vice President
                  </div>
                  <div
                    className={`status-icon ${
                      document.status.humanResource
                        ? "status-icon-green"
                        : "status-icon-red"
                    }`}
                  >
                    Human Resource
                  </div>
                </div>
              </td>
              <td>
                <button
                  onClick={() => window.open(document.filename, "_blank")}
                >
                  {document.filename}
                </button>
              </td>
              <td>{formatCreatedAt(document.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SentPage;
