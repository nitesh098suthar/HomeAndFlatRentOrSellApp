import React, { useEffect } from "react";
import AdminSidebar from "./AdminSidebar";
import Heading from "../common/Heading";
import "./dashboard.css";
import Table from "./Table";
import { useDispatch, useSelector } from "react-redux";
import { getAllRoom, listSellers } from "../../redux/actions/sellerAction";
import {
  listClients,
  listUsers,
} from "../../redux/actions/adminAction";
import { useNavigate } from "react-router-dom";
const Dashboard = ({ isAdmin }) => {
  const nav = useNavigate();
  useEffect(() => {
    if (!isAdmin) return nav("/");
  }, [nav, isAdmin]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllRoom());
    dispatch(listUsers());
    dispatch(listSellers());
    dispatch(listClients());
  }, [dispatch]);
  const { clients, sellers, users } = useSelector(
    (state) => state.admin
  );
  const { rooms } = useSelector(
    (state) => state.room
  );
  return (
    <div className="my-grid">
      <section className="recent padding seller-section">
        <div className="container vh100">
          <Heading
            title={` ${users?.length} User Listed`}
            subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."
          />
          <br />
          <br />
          <Table data={users} />
        </div>
        <div className="container vh100">
          <Heading
            title={` ${clients?.length} Client Listed`}
            subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."
          />

          <br />
          <br />
          <Table data={clients} />
        </div>
        <div className="container vh100">
          <Heading
            title={` ${sellers?.length} Seller Listed`}
            subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."
          />
          <br />
          <br />
          <Table data={sellers} />
        </div>
        <div className="container vh100">
          <Heading
            title={` ${rooms?.length} Room Listed`}
            subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."
          />
          <br />
          <br />
          <Table tableFor="room" data={rooms} />
        </div>
      </section>
      <div>
        <AdminSidebar />
      </div>
    </div>
  );
};

export default Dashboard;
