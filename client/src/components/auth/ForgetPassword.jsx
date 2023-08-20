import React, { useState, useEffect } from "react";
import "./auth.css";
import { useDispatch, useSelector } from "react-redux";
import { sendResetToken } from "../../redux/actions/authAction";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Spinner from "../common/Spinner";

const ForgetPassword = ({ isAuthenticated }) => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  useEffect(() => {
    if (isAuthenticated) return nav("/");
  }, [nav, isAuthenticated]);
  const [email, setEmail] = useState("");
  const { error, msg: message, loading } = useSelector((state) => state.other);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(sendResetToken(email));
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
  return (
    <div className="auth-parent">
      <div className="auth-card">
        <h1>Forget Password</h1>
        <form method="put">
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
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <div>
            <button onClick={submitHandler} type="submit">
            {loading ? (
                <Spinner />
              ) : (
                <i className="fa fa-paper-plane">&nbsp; &nbsp;Send Reset Link</i>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
