import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./auth.css";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/actions/authAction";
import Spinner from "../common/Spinner";
import profilePic from "../../assets/profile.jpg";

const Signup = ({ isAuthenticated }) => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    role: "client",
  });
  const checkboxStatus = (e) => {
    if (e.target.checked) userData.role = "seller";
    else userData.role = "client";
  };
  const inputHandler = (e) => {
    const value = e.target.value;
    setUserData({ ...userData, [e.target.name]: value });
  };
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', userData.name),
    data.append('email', userData.email),
    data.append('password', userData.password),
    data.append('role', userData.role),
    data.append('file', avatar),
    dispatch(register(data));
  };
  const nav = useNavigate();

  const { loading, msg: message, error } = useSelector((state) => state.auth);
  useEffect(() => {
    if (isAuthenticated) return nav("/");
  }, [isAuthenticated, nav]);

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

  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(profilePic);

  const imageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setAvatarPreview(reader.result);
      setAvatar(file);
    };
  };

  return loading ? (
    <Spinner />
  ) : (
    <div className="auth-parent">
      <div className="auth-card">
        <h1>Register Yourself</h1>
        <form method="post">
          <div>
            <div className="avatar-container" style={{ width: "100px", height: "100px" }}>
              <img
                src={avatarPreview}
                alt="loading..."
                style={{
                  display: "inline-block",
                  height: "100%",
                  width: "100px",
                  objectFit: "cover",
                  borderRadius: '50%'
                }}
              />
            </div>
            <label htmlFor="image" style={{ display: "inline-block" }}>
              <p style={{ cursor: "pointer", paddingBottom: "1rem" }}>
                Change Image
              </p>
              <input
                style={{ visibility: "hidden" }}
                required
                type="file"
                id="image"
                accept="image/*"
                onChange={imageHandler}
              />
            </label>
          </div>
          <label htmlFor="name">
            <small>Name</small>
          </label>
          <br />
          <input
            required
            placeholder="eg: John Doe"
            type="name"
            name="name"
            id="name"
            onChange={inputHandler}
            value={userData.name}
          />
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
          <div className="checkbox-container">
            <input
              className="checkbox"
              type="checkbox"
              name="checkbox"
              id="checkbox"
              onClick={checkboxStatus}
            />
            <label className="checkbox-label" htmlFor="checkbox">
              Want to become a seller ?
            </label>
          </div>
          <div>
            <button onClick={submitHandler} type="submit">
              Signup
            </button>
          </div>
          <small>
            <Link to="/signin">Already a Member ? Login Here</Link>
          </small>
        </form>
      </div>
    </div>
  );
};

export default Signup;
