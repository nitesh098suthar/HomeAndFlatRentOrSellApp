import React, { useEffect, useState } from "react";
import "./header.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loadUser, logout, swapRole } from "../../../redux/actions/authAction";
import Spinner from "../Spinner";
import { toast } from "react-hot-toast";

const Header = ({ userData }) => {
  const nav = useNavigate();
  const [userInfo, setUserInfo] = useState(userData);
  const [becomeSeller, setBecomeSeller] = useState(false);
  const [navList, setNavList] = useState(false);
  const dispatch = useDispatch();
  const {
    isAuthenticated,
    user,
    loading,
    msg: message,
    error,
  } = useSelector((state) => state.auth);
  const logoutHandler = () => {
    dispatch(logout());
  };
  const changeRole = async () => {
    await dispatch(swapRole("seller"));
    dispatch(loadUser());
    // nav("/seller/create");
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }

    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [dispatch, error, message]);
  useEffect(() => {
    if (user) {
      setUserInfo(user);
    }
  }, [user]);
  return loading ? (
    <Spinner />
  ) : (
    <>
      <header className="zIndex-99">
        <div className="container flex">

          <div className="logo">
            <img src="./images/logo.png" alt="" />
          </div>

          <div className="nav">
            <ul className={navList ? "small" : "flex"}>
              <li>
                <Link to={"/"}>Home</Link>
              </li>
              <li>
                <Link to={"/room"}>Explore</Link>
              </li>
              <li>
                <Link to={"/about"}>about</Link>
              </li>
              <li>
                <Link to={"/contact"}>contact</Link>
              </li>
              {isAuthenticated &&
                (userInfo && userInfo?.role === "admin" ? (
                  <li>
                    <Link to="/admin/dashboard">Admin Panel</Link>
                  </li>
                ) : userInfo?.role === "seller" ? (
                  <li>
                    <Link to="/seller/create">Seller Panel</Link>
                  </li>
                ) : (
                  <li onClick={() => setBecomeSeller(true)}>
                    &nbsp; &nbsp; &nbsp;Become a Seller
                  </li>
                ))}
            </ul>
          </div>
          
          {!isAuthenticated ? (
            <button className="btn1">
              <Link to="/signin" style={{ color: "#fff" }}>
                <i className="fa fa-sign-in">&nbsp; &nbsp;Sign in</i>
              </Link>
            </button>
          ) : (
            <button className="btn1" onClick={logoutHandler}>
              {loading ? <Spinner /> : <i className="fa fa-sign-out">&nbsp; &nbsp;Sign out</i>}
            </button>
          )}
          <div className="toggle">
            <button onClick={() => setNavList(!navList)}>
              {navList ? (
                <i className="fa fa-times"></i>
              ) : (
                <i className="fa fa-bars"></i>
              )}
            </button>
          </div>
        </div>
        {becomeSeller && (
          <div className="become-seller-prompt">
            <div className="dialog">
              <h3>Do You want to Become a Seller</h3>
              <div className="flex">
                <button onClick={changeRole}>Yes</button>
                <button onClick={() => setBecomeSeller(false)}>No</button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
