import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteRoom, getMyRoom } from "../../../redux/actions/sellerAction";
import { Link, useNavigate } from "react-router-dom";
import cover from "../../seller/p-3.png";
import { toast } from "react-hot-toast";
import Spinner from "../../common/Spinner";
const RecentCard = ({ room, seller = false }) => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  //deleting room
  const deleteHandler = async (roomId) => {
    await dispatch(deleteRoom(roomId));
    dispatch(getMyRoom());
  };
  const { error, msg, loading } = useSelector((state) => state.room);
  const { sellType, address, price, category, dimension, roomImg, _id } = room;
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }
    if (msg) {
      toast.success(msg);
      dispatch({ type: "clearMsg" });
    }
  }, [dispatch, error, msg]);
  return (
    <>
      <div className="box shadow room-container" style={{margin: '1rem'}}>
        <div className="img room-img-container">
          <img src={roomImg ? roomImg.url : cover} alt="" className="cover" />
        </div>
        <div className="text">
          <div className="category flex">
            <span
              style={{
                background: sellType === "sell" ? "#25b5791a" : "#ff98001a",
                color: sellType === "sell" ? "#25b579" : "#ff9800",
              }}
            >
              {sellType}
            </span>
            <span>{category}</span>
            {seller ? (
              <div>
                <Link to={`/room/edit/${_id}`}>
                  <i className="fa fa-edit"></i>
                </Link>
                &nbsp;&nbsp;&nbsp;
                {loading ? (
                  <Spinner />
                ) : (
                  <i
                    className="fa fa-trash"
                    onClick={() => deleteHandler(_id)}
                  ></i>
                )}
                &nbsp;&nbsp;
                <Link to={`/room/${_id}`}>
                  <i className="fa fa-eye"></i>
                </Link>
              </div>
            ) : (
              <i className="fa fa-eye"></i>
            )}
          </div>
          <div className="flex" style={{marginTop: '3rem'}}>
            <div>
              <h4>{dimension}</h4>
              <p>
                <i className="fa fa-location-dot"></i> {address}
              </p>
            </div>
        
            <h2 style={{ padding: ".2rem .5rem", backgroundColor: "#ff9800", color: '#fff' }}>
              <i className="fa-solid fa-indian-rupee-sign" style={{letterSpacing:"2.5px"}}>
                &nbsp;{price}
              </i>
            </h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecentCard;
