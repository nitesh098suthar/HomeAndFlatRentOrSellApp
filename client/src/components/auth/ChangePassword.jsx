import React, { useState, useEffect } from "react";
import "./auth.css";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { changePassword, loadUser } from "../../redux/actions/authAction";
import { useNavigate } from "react-router-dom";
import Spinner from "../common/Spinner";

const ChangePassword = ({ isAuthenticated }) => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    currentPassword: "",
    newPassword: "",
  });
  const inputHandler = (e) => {
    const value = e.target.value;
    setUserData({ ...userData, [e.target.name]: value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(changePassword(userData.currentPassword, userData.newPassword));
    toast.success("Password Changed");
    nav("/");
  };

  const { loading, msg: message, error } = useSelector((state) => state.auth);
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }

    if (message) {
      toast.success(message);
      dispatch({ type: "clearMsg" });
    }
  }, [dispatch, error, message]);
  return loading ? (
    <Spinner />
  ) : (
    <div className="auth-parent">
      <div className="auth-card">
        <h1>Change Password</h1>
        <form method="post">
          <label htmlFor="currentPassword">
            <small>Current Password</small>
          </label>
          <br />
          <input
            required
            placeholder="eg: john@Doe03"
            type="password"
            name="currentPassword"
            id="currentPassword"
            onChange={inputHandler}
            value={userData.currentPassword}
          />
          <label htmlFor="newPassword">
            <small>New Password</small>
          </label>
          <br />
          <input
            required
            placeholder="eg: john@Doe03"
            type="password"
            id="newPassword"
            name="newPassword"
            onChange={inputHandler}
            value={userData.newPassword}
          />
          <div>
            <button onClick={submitHandler} type="submit">
              Change Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
