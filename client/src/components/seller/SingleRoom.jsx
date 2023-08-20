import React, { useEffect, useState } from "react";
import image from "./p-3.png";
import "./singleRoom.css";
import { useParams } from "react-router-dom";
import Spinner from "../common/Spinner";
import axios from "axios";
import { serverURI } from "../../redux/store";
const SingleRoom = () => {
  const roomId = useParams().roomId;
  const [roomData, setRoomData] = useState({
    dimension: "",
    sellType: "",
    genderSpecificity: "",
    contactNumber: "",
    price: "",
    description: "",
    address: "",
    category: "",
    roomImg: null
  });
  const {
    dimension,
    sellType,
    category,
    genderSpecificity,
    contactNumber,
    address,
    price,
    description,
    roomImg,
  } = roomData;
const [loading, setLoading] = useState(true);

  //get single room action
  const singleRoom = async () => {
    setLoading(true)
    try {
      const { data } = await axios.get(`${serverURI}/seller/room/${roomId}`);
      setRoomData(data.msg);
      setLoading(false)
    } catch (error) {
      alert(error.response.data.message);
      setLoading(false)
    }
  };
  useEffect(() => {
    singleRoom();
  }, []);
  return loading ? (<Spinner />) : (
    <>
      <div className="detailed-room-parent single-room">
        <div className="img-corousel">
          <img src={roomImg ? roomImg.url : image} alt="loading..." />
        </div>
        <div className="room-info single">
          <div className="dimension">
            <h3 className="orange">
              <span>Size: </span> {dimension}
            </h3>
          </div>
          <div className="Price single">
            <h3 className="orange">
              <span>Price: </span>
              {price}
            </h3>
          </div>
          <div className="sell-type single">
            <h3 className="orange">
              <span>To-Let Type: </span>
              {sellType}
            </h3>
          </div>
          <div className="gender-specificity single">
            <h3 className="orange">
              <span>Gender Specific: </span>
              {genderSpecificity}
            </h3>
          </div>
          <div className="contact-number single">
            <h3 className="orange">
              <span>Contact Number: </span> {contactNumber}
            </h3>
          </div>
          <div className="address single">
            <h3 className="orange">
              <span>Address: </span>
              {address}
            </h3>
          </div>
          <div className="category single">
            <h3 className="orange">
              <span>Category: </span>
              {category}
            </h3>
          </div>
          <div className="description single">
            <h3 className="orange">
              <span>Description: </span>
              {description}
            </h3>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleRoom;
