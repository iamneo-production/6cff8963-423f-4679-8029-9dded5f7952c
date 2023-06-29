import React from "react";
import "../components_styles/header.css";
import { Link } from "react-router-dom";

export default function HeaderListUsers() {
  return (
    <div className="header">

      <ul className="sections">
        <li>
          <Link to="/create-user" style={{ textDecoration: 'none' }}>Create User</Link>
        </li>
      </ul>
    </div>
  );
}
