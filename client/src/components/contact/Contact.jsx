import React, { useEffect, useState } from "react";
import img from "../images/pricing.jpg";
import Back from "../common/Back";
import "./contact.css";
import { contactAdmin } from "../../redux/actions/otherAction";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import Spinner from "../common/Spinner";



const Contact = () => {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    subject: "",
    feedback: "",
  });
  const { msg: message, loading, error } = useSelector((state) => state.other);
  const inputHandler = (e) => {
    const val = e.target.value;
    setUserData({ ...userData, [e.target.name]: val });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(contactAdmin(userData.email, userData.name, userData.feedback));
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
    <>
      <section className="contact mb">
        <Back
          name="Contact Us"
          title="Get Helps & Friendly Support"
          cover={img}
        />
        <div className="container">
          <form className="shadow">
            <h4>Fillup The Form</h4> <br />
            <div>
              <input
                type="text"
                name="name"
                placeholder="Name"
                onChange={inputHandler}
                value={userData.name}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={inputHandler}
                value={userData.email}
              />
            </div>
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              onChange={inputHandler}
              value={userData.subject}
            />
            <textarea
              cols="30"
              rows="10"
              name="feedback"
              onChange={inputHandler}
              value={userData.feedback}
            ></textarea>
            <button onClick={submitHandler}>
              {loading ? (
                <Spinner />
              ) : (
                <i className="fa fa-paper-plane">&nbsp; &nbsp;Send Mail</i>
              )}
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Contact;
