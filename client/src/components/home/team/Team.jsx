import React, { useEffect } from "react";
import Heading from "../../common/Heading";
import { team } from "../../data/Data";
import "./team.css";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../common/Spinner";
import { listSellers } from "../../../redux/actions/sellerAction";
import { Link } from "react-router-dom";

const Team = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listSellers());
  }, []);
  const { sellers, loading } = useSelector((state) => state.room);

  return loading ? (
    <Spinner />
  ) : (
    <>
      <section className="team background">
        <div className="container">
          <Heading
            title="Our Featured Agents"
            subtitle="Here you'll see all the properties listed by separate sellers."
          />

          <div className="content mtop grid3">
            {sellers &&
              sellers.map((seller) => (
                <div className="box" key={seller._id}>
                  <div className="details">
                    <div className="img">
                      <img src={seller.avatar.url} alt="loading..." />
                      <i className="fa-solid fa-circle-check"></i>
                    </div>
                    <i className="fa fa-location-dot"></i>
                    <label>{seller.address}</label>
                    <h4>{seller.name}</h4>
                    <ul>
                      <Link to={`/rooms/${seller._id}`}>
                        <button className="btn1">
                          View all Listings from {seller.name}
                        </button>
                      </Link>
                    </ul>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Team;
