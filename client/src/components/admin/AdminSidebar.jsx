import React from "react";
import { Link } from "react-router-dom";
import '../seller/sidebar.css'

const AdminSidebar = () => {
  return (
    <div className="sidebar-parent">
      <div className="header">
        <h2>Admin Panel</h2>
      </div>
      <hr />
      <div className="body">
        <ul>
          <li>
            <Link to="/admin/dashboard">Users</Link>
          </li>
          <li>
            <Link to="/admin/dashboard">Clients</Link>
          </li>
          <li>
            <Link to="/admin/dashboard">Sellers</Link>
          </li>
          <li>
            <Link to="/admin/dashboard">Rooms</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminSidebar;
