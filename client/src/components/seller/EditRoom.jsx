import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./createRoom.css";
import Sidebar from "./Sidebar";
import { editRoom } from "../../redux/actions/sellerAction";
import { useNavigate, useParams } from "react-router-dom";
import { serverURI } from "../../redux/store";
import axios from "axios";
import { toast } from "react-hot-toast";
const EditRoom = ({ isSeller }) => {
  const nav = useNavigate();
  useEffect(() => {
    if (!isSeller) return nav("/");
  }, [nav, isSeller]);
  const roomId = useParams().roomId;
  const dispatch = useDispatch();
  const [roomData, setRoomData] = useState({
    dimension: "",
    price: "",
    sellType: "",
    category: "",
    genderSpecificity: "",
    contactNumber: "",
    address: "",
    description: "",
  });
  const inputHandler = (e) => {
    const val = e.target.value;
    setRoomData({ ...roomData, [e.target.name]: val });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(editRoom(roomId, roomData));
    nav("/seller/rooms");
  };
  //getting room info
  const singleRoom = async () => {
    try {
      const { data } = await axios.get(`${serverURI}/seller/room/${roomId}`);
      setRoomData(data.msg);
    } catch (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
      alert(error.response.data.message);
    }
  };
  useEffect(() => {
    singleRoom();
  }, []);
  const { msg: message, error } = useSelector((state) => state.room);
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
  return (
    <div className="seller-parent">
      <div className="create-room-parent seller-working-section">
        <form method="post">
          <label htmlFor="dimension">Room Type</label>
          <input
            required
            type="text"
            id="dimension"
            name="dimension"
            placeholder="eg: 2BHK"
            onChange={inputHandler}
            value={roomData.dimension}
          />

          <label htmlFor="price">Pricing</label>
          <input
            required
            type="text"
            id="price"
            name="price"
            placeholder="eg: 3000"
            onChange={inputHandler}
            value={roomData.price}
          />
          <div className="selectables">
            <div className="select-box">
              <label htmlFor="sellType">Sell Type</label>
              <br />
              <select
                value={roomData.sellType}
                onChange={inputHandler}
                name="sellType"
                id="sellType"
              >
                <option value="rent">Rent</option>
                <option value="sell">Sell</option>
              </select>
            </div>

            <div className="select-box">
              <label htmlFor="category">Category</label>
              <br />
              <select
                value={roomData.category}
                onChange={inputHandler}
                name="category"
                id="category"
              >
                <option value="room">Room</option>
                <option value="flat">Flat</option>
                <option value="house">House</option>
                <option value="villa">Villa</option>
                <option value="apartment">Apartment</option>
                <option value="office">Office</option>
              </select>
            </div>
            <div className="select-box">
              <label htmlFor="genderSpecificity">Gender Specific Room</label>
              <br />
              <select
                name="genderSpecificity"
                id="genderSpecificity"
                value={roomData.genderSpecificity}
                onChange={inputHandler}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="family">Family</option>
                <option value="any">Any</option>
              </select>
            </div>
          </div>
          <label htmlFor="contactNumber">Contact Number</label>
          <input
            required
            type="text"
            id="contactNumber"
            name="contactNumber"
            placeholder="eg: 93353xxxx"
            onChange={inputHandler}
            value={roomData.contactNumber}
          />

          <label htmlFor="address">Address</label>
          <input
            required
            type="text"
            id="address"
            name="address"
            onChange={inputHandler}
            value={roomData.address}
            placeholder="eg: 04 Victory Palace, Washington DC"
          />

          <label htmlFor="description">Description</label>
          <input
            required
            type="text"
            id="description"
            name="description"
            onChange={inputHandler}
            value={roomData.description}
            placeholder="eg: room additional description"
          />
          <button onClick={submitHandler} type="submit">
            Edit Room
          </button>
        </form>
      </div>
      <div>
        <Sidebar />
      </div>
    </div>
  );
};

export default EditRoom;
