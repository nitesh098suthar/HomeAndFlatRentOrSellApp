import React, { useEffect } from "react";
import Heading from "../../common/Heading";
import "./recent.css";
import RecentCard from "./RecentCard";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../common/Spinner";
import { Link } from "react-router-dom";
import { getAllRoom } from "../../../redux/actions/sellerAction";

const Recent = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllRoom());
  }, []);
  const { loading, rooms } = useSelector((state) => state.room);
  return loading ? (
    <Spinner />
  ) : (
    <>
      <section className="recent padding">
        <div className="container">
          <Heading
            title="Property Listed"
            subtitle="Here you can see all the Properties Listed by the different users."
          />
          <div className="flex recent-card-container">
            {rooms !== undefined &&
              rooms?.map((room) => (
                <Link
                  key={room._id}
                  to={`/room/${room._id}`}
                  className="recent-card-link"
                >
                  <RecentCard room={room} />
                </Link>
              ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Recent;
