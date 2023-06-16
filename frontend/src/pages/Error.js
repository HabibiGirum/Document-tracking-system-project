import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import { FaExclamationTriangle } from "react-icons/fa";
import "./Error.css";

const Error = () => {
  const goBack = () => {
    window.history.back(); // Return to the previous page
  };

  return (
    <Card>
      <div className="full-page">
        <FaExclamationTriangle className="error-icon" />
        <h3>Ohh! Page Not Found</h3>
        <p>We can't seem to find the page you're looking for</p>
        <button onClick={goBack}>Go Back</button>
      </div>
    </Card>
  );
};

export default Error;
