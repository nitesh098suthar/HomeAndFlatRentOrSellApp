import React, { useEffect, useState } from "react";
import Heading from "../../common/Heading";
import "./recent.css";
import RecentCard from "./RecentCard";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../common/Spinner";
import { Link, useParams } from "react-router-dom";
import { getAllRoom } from "../../../redux/actions/sellerAction";

const SellersRoom = () => {
  const sellerId = useParams().sellerId;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllRoom());
  }, []);
  const { loading, rooms } = useSelector((state) => state.room);
  const [filterRoom, setFilterRoom] = useState([]);
  useEffect(() => {
    if (rooms) {
      const filter = rooms.filter((room) => {
        return room.sellerId === sellerId;
      });
      setFilterRoom(filter);
    }
  }, [rooms]);
  return loading ? (
    <Spinner />
  ) : (
    <>
      <section className="recent padding">
        <div className="container">
          {filterRoom && filterRoom.length > 0 && (
            <Heading
              title="Property Listed"
              subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."
            />
          )}
          <div className="flex recent-card-container">
            {filterRoom.length > 0 ? (
              filterRoom.map((room) => (
                <Link
                  key={room._id}
                  to={`/room/${room._id}`}
                  className="recent-card-link"
                >
                  <RecentCard room={room} />
                </Link>
              ))
            ) : (
              <div className="grid-center">
                <Heading
                  title="Seller Has no Listing Yet"
                  subtitle="You'll be able to see all listing as the Seller Updates his Listings"
                />
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default SellersRoom;
