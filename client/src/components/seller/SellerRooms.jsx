import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import RecentCard from "../home/recent/RecentCard";
import Spinner from "../common/Spinner";
import "../home/recent/recent.css";
import Heading from "../common/Heading";
import { useDispatch, useSelector } from "react-redux";
import { getMyRoom } from "../../redux/actions/sellerAction";
import { json, useNavigate } from "react-router-dom";

const SellerRooms = ({ isSeller }) => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  useEffect(() => {
    if (!isSeller) return nav("/");
  }, [nav, isSeller]);
  const { loading, myRooms } = useSelector((state) => state.room);
  useEffect(() => {
    dispatch(getMyRoom());
  }, [dispatch]);
  return loading ? (
    <Spinner />
  ) : (
    <div className="my-grid seller-parent">
      <section className="recent padding seller-section seller-working-section">
        <div className="container">
          <Heading
            title="Property Listed"
            subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."
          />
          <div className="flex recent-card-container">
            {myRooms?.map((room) => (
              <div className="recent-card-link" key={room._id}>
                <RecentCard room={room} seller={true} />
              </div>
            ))}
          </div>
        </div>
      </section>
      <div>
        <Sidebar />
      </div>
    </div>
  );
};

export default SellerRooms;
