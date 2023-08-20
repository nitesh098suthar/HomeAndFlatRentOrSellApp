import React from "react";
import { Link } from "react-router-dom";
import "./notFound.css";
const NotFound = () => {
  return (
    <div className="not-found-parent">
      <div className="not-found-content">
        <h1>404 | Page Not Found</h1>
        <br />
        <button>
          <Link style={{color: '#fff'}} to="/">Go Home</Link>
        </button>
      </div>
    </div>
  );
};

export default NotFound;
