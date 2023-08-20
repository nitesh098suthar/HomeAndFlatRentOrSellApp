import React, { useEffect, useState } from "react";
import "./sidebar.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../common/Spinner";
import { loadUser, swapRole } from "../../redux/actions/authAction";
import { getAllRoom } from "../../redux/actions/sellerAction";
const Sidebar = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const changeRoleHandler = async () => {
    await dispatch(swapRole("client"));
    dispatch(loadUser());
    dispatch(getAllRoom());
  };
  const { user, loading, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      if (!isAuthenticated) nav("/");
      if (user.role !== "seller") nav("/");
    }
  }, [isAuthenticated, user, nav]);

  return loading ? (
    <Spinner />
  ) : (
    <div className="sidebar-parent">
      <div className="header">
        <h2>Seller Panel</h2>
      </div>
      <hr />
      <div className="body">
        <ul>
          <li>
            <Link to="/seller/create">Create Room</Link>
          </li>
          <li>
            <Link to="/seller/rooms">My Rooms</Link>
          </li>
        </ul>
      </div>
      <div className="footer">
        <button type="submit" onClick={changeRoleHandler}>
          Become a Client
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
