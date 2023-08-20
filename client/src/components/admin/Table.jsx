import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllRoom, listSellers } from "../../redux/actions/sellerAction";
import { useNavigate } from "react-router-dom";
import {
  changeUserRole,
  deleteAnyRoom,
  deleteAnyUser,
  listClients,
  listUsers,
} from "../../redux/actions/adminAction";
import Spinner from "../common/Spinner";
import { toast } from "react-hot-toast";

const Table = ({ tableFor = "user", data }) => {
  const dispatch = useDispatch();
  const { error, msg: message, loading } = useSelector((state) => state.admin);
  const nav = useNavigate();

  const deleteRoomHandler = async (id) => {
    await dispatch(deleteAnyRoom(id));
    dispatch(getAllRoom());
    nav("/admin/dashboard");
  };

  const deleteUserHandler = async (id, role) => {
    if (role === "admin") {
      toast.error("Admin can't be deleted");
      return;
    }
    await dispatch(deleteAnyUser(id));
    dispatch(listUsers());
    if (role === "seller") {
      dispatch(listSellers());
      dispatch(getAllRoom());
    }
    if (role === "client") {
      dispatch(listClients());
    }
    nav("/admin/dashboard");
  };
  const makeAdmin = async (id, role) => {
    await dispatch(changeUserRole(id));
    dispatch(listUsers());
    if (role === "admin") {
      return nav("/");
    }
    if (role === "seller") {
      dispatch(listSellers());
    }
    if (role === "client") {
      dispatch(listClients());
    }
  };
  let arr = [];
  if (tableFor === "user") {
    arr = ["id", "Name", "Email", "Role", "Action"];
  } else {
    arr = [
      "Seller Id",
      "Room Id",
      "Dimension",
      "Price",
      "Address",
      "Category",
      "Sell Type",
      "Contact Number",
      "Gender Specificity",
      "Action",
    ];
  }
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
    <div className="table-container">
      <table className="my-table">
        <thead>
          <tr>
            {arr.map((data) => (
              <th key={data}>{data}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableFor === "user" &&
            data?.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  {loading ? (
                    <Spinner />
                  ) : (
                    <i
                      className="fa fa-rotate"
                      onClick={() => makeAdmin(user._id, user.role)}
                    ></i>
                  )}
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  {loading ? (
                    <Spinner />
                  ) : (
                    <i
                      className="fa fa-trash"
                      onClick={() => deleteUserHandler(user._id, user.role)}
                    ></i>
                  )}
                </td>
              </tr>
            ))}
          {tableFor !== "user" &&
            data?.map((room) => (
              <tr key={room._id}>
                <td>{room.sellerId}</td>
                <td>{room._id}</td>
                <td>{room.dimension}</td>
                <td>{room.price}</td>
                <td>{room.address}</td>
                <td>{room.category}</td>
                <td>{room.sellType}</td>
                <td>{room.contactNumber}</td>
                <td>{room.genderSpecificity}</td>
                <td>
                  {loading ? (
                    <Spinner />
                  ) : (
                    <i
                      className="fa fa-trash"
                      onClick={() => deleteRoomHandler(room._id)}
                    ></i>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
