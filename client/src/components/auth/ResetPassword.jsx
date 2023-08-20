import React, { useEffect, useState } from "react";
import "./auth.css";
import { resetPassword } from "../../redux/actions/authAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import Spinner from "../common/Spinner";

const ResetPassword = ({ isAuthenticated }) => {
  const nav = useNavigate();
  const { error, msg: message, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const token = useParams().token;
  const [userData, setUserData] = useState({
    confirmPassword: "",
    password: "",
  });
  const inputHandler = (e) => {
    const value = e.target.value;
    setUserData({ ...userData, [e.target.name]: value });
  };
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
  const submitHandler = (e) => {
    e.preventDefault();
    if (userData.confirmPassword !== userData.password)
      return toast.error("Both Password must match");
    dispatch(resetPassword(token, userData.password));
  };
  useEffect(() => {
    if (isAuthenticated) return nav("/");
  }, [nav, isAuthenticated]);
  return (
    <div className="auth-parent">
      <div className="auth-card">
        <h1>Reset Password</h1>
        <form method="post">
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <br />
          <input
            required
            placeholder="eg: john@Doe03"
            type="password"
            name="password"
            id="password"
            onChange={inputHandler}
            value={userData.password}
          />
          <label htmlFor="confirmPassword">
            <small>Confirm Password</small>
          </label>
          <br />
          <input
            required
            placeholder="eg: john@Doe03"
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            onChange={inputHandler}
            value={userData.confirmPassword}
          />
          <div>
            <button onClick={submitHandler} type="submit">
              {loading ? <Spinner /> : "Reset"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
