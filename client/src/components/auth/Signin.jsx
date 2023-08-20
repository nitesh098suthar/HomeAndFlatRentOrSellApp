import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./auth.css";
import toast from "react-hot-toast";
import { login } from "../../redux/actions/authAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Spinner from "../common/Spinner";
const Signin = ({ isAuthenticated }) => {
  const nav = useNavigate();
  useEffect(() => {
    if (isAuthenticated) return nav("/");
  }, [nav, isAuthenticated]);
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({ email: "", password: "" });
  const inputHandler = (e) => {
    const value = e.target.value;
    setUserData({ ...userData, [e.target.name]: value });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(login(userData.email, userData.password));
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
        <h1>Login Here</h1>
        <form method="post">
          <label htmlFor="email">
            <small>Email</small>
          </label>
          <br />
          <input
            required
            placeholder="eg: address@service.tld"
            type="email"
            name="email"
            id="email"
            onChange={inputHandler}
            value={userData.email}
          />
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <br />
          <input
            required
            placeholder="eg: john@Doe03"
            type="password"
            id="password"
            name="password"
            onChange={inputHandler}
            value={userData.password}
          />
          <small>
            <Link to="/password/forget">Forget Password</Link>
          </small>
          <div>
            <button onClick={submitHandler} type="submit">
              Login
            </button>
          </div>
          <small>
            <Link to="/signup">New to RState ? Register Here</Link>
          </small>
        </form>
      </div>
    </div>
  );
};

export default Signin;
