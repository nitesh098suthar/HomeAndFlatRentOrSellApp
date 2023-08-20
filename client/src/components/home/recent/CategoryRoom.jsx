import React, { useEffect, useState } from "react";
import Heading from "../../common/Heading";
import "./recent.css";
import RecentCard from "./RecentCard";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../common/Spinner";
import { Link, useParams } from "react-router-dom";
import { getAllRoom } from "../../../redux/actions/sellerAction";

const CategoryRoom = () => {
  const category = useParams().category;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllRoom());
  }, []);
  const { loading, rooms } = useSelector((state) => state.room);
  const [filterRoom, setFilterRoom] = useState([]);
  useEffect(() => {
    if (rooms) {
      const filter = rooms.filter((room) => {
        return room.category === category;
      });
      console.log(filter);
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
              subtitle="Here you can see properties on the basis of Category."
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
                  title="No Listing available in this Category at the Moment"
                  subtitle="You'll be able to see all listing as the Seller Updates Listings"
                />
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default CategoryRoom;
