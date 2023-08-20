import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./createRoom.css";
import Sidebar from "./Sidebar";
import { createRoom } from "../../redux/actions/sellerAction";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Spinner from "../common/Spinner";
const CreateRoom = ({ isSeller }) => {
  const nav = useNavigate();
  useEffect(() => {
    if (!isSeller) return nav("/");
  }, [nav, isSeller]);
  const dispatch = useDispatch();
  const [roomData, setRoomData] = useState({
    dimension: "",
    price: "",
    sellType: "rent",
    category: "room",
    genderSpecificity: "male",
    contactNumber: "",
    address: "",
    description: "",
    file: {},
  });
  const inputHandler = (e) => {
    const val = e.target.value;
    setRoomData({ ...roomData, [e.target.name]: val });
  };
  const imgHandler = (e) => {
    const file = e.target.files[0];
    setRoomData({ ...roomData, file });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("dimension", roomData.dimension);
    formData.append("price", roomData.price);
    formData.append("address", roomData.address);
    formData.append("description", roomData.description);
    formData.append("contactNumber", roomData.contactNumber);
    formData.append("sellType", roomData.sellType);
    formData.append("category", roomData.category);
    formData.append("genderSpecificity", roomData.genderSpecificity);
    formData.append("file", roomData.file);
    await dispatch(createRoom(formData));
    nav("/seller/rooms");
  };
  const { msg: message, error, loading } = useSelector((state) => state.room);
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
    <div className="seller-parent">
      <div className="create-room-parent seller-working-section">
        <form method="post">
          <label htmlFor="img-input">
            <input
              className="img-input"
              type="file"
              accept="image/*"
              required
              onChange={imgHandler}
            />
          </label>

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
                name="sellType"
                id="sellType"
                value={roomData.sellType}
                onChange={inputHandler}
              >
                <option value="rent">Rent</option>
                <option value="sell">Sell</option>
              </select>
            </div>

            <div className="select-box">
              <label htmlFor="category">Category</label>
              <br />
              <select
                name="category"
                id="category"
                value={roomData.category}
                onChange={inputHandler}
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
            {loading ? <Spinner /> : "Create Room"}
          </button>
        </form>
      </div>
      <div>
        <Sidebar />
      </div>
    </div>
  );
};

export default CreateRoom;
