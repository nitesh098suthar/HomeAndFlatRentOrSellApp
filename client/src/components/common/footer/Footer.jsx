import React from "react";
import "./footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="container">
          <div className="box">
            <div className="logo" style={{ marginBottom: "20px" }}>
              <img src="../images/logo-light.png" alt="" />
            </div>
            <div>
              <h1>Have any Query ? Contact us</h1>
              <Link to="/contact">
                <button className="btn1 contactus">Contact US</button>
              </Link>
            </div>
          </div>
          <div className="box">
            <h3>Layouts</h3>
            <ul>
              <Link to="/">
                <li>Home </li>
              </Link>
              <Link to="/room">
                <li>Explore</li>
              </Link>
              <Link to="/about">
                <li>About</li>
              </Link>
            </ul>
          </div>
          <div className="box">
            <h3>Handles</h3>
            <ul>
              <Link to="https://instagram.com/sakshamsonii">
                <li>
                  Instagram
                </li>
              </Link>
              <Link to="/https://linkedin.com/in/nitesh-suthar">
                <li>
              Github
                </li>
              </Link>
              <Link to="https://github.com/nitesh098suthar">
                <li>
                  LinkedIn
                </li>
              </Link>
              <Link to="mailto:nitesh098suthar@gmail.com">
                <li>
                  Email
                </li>
              </Link>
            </ul>
          </div>
        </div>
      </footer>
      <div className="legal">
        <span>Designed by Saksham Soni, Dhruv Rawal, Nitesh Kumar.</span>
      </div>
    </>
  );
};

export default Footer;
