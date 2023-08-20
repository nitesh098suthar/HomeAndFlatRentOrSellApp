import React, { useEffect } from "react";
import Header from "../common/header/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../home/Home";
import Footer from "../common/footer/Footer";
import About from "../about/About";
// import Pricing from "../pricing/Pricing"
// import Blog from "../blog/Blog"
// import Services from "../services/Services"
// import Spinner from "../common/Spinner"
import Contact from "../contact/Contact";
import Signup from "../auth/Signup";
import ForgetPassword from "../auth/ForgetPassword";
import ResetPassword from "../auth/ResetPassword";
import ChangePassword from "../auth/ChangePassword";
import Signin from "../auth/Signin";
import NotFound from "../notFound/NotFound";
import CreateRoom from "../seller/CreateRoom";
import SellerRooms from "../seller/SellerRooms";
import EditRoom from "../seller/EditRoom";
import SingleRoom from "../seller/SingleRoom";
import Recent from "../home/recent/Recent";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../../redux/actions/authAction";
import { getAllRoom } from "../../redux/actions/sellerAction";
import Spinner from "../common/Spinner";
import Dashboard from "../admin/Dashboard";
import toast, { Toaster } from "react-hot-toast";
import SellersRoom from "../home/recent/SellersRoom";
import CategoryRoom from "../home/recent/CategoryRoom.jsx";

const Pages = () => {
  const dispatch = useDispatch();
  const { loading, user, isAuthenticated } = useSelector((state) => state.auth);
  // const {sellers} = useSelector(state=> admin)
  useEffect(() => {
    dispatch(loadUser());
    dispatch(getAllRoom());
  }, [dispatch]);
  return loading ? (
    <Spinner />
  ) : (
    <>
      <Router>
        <Toaster />
        <Header userData={user} />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/room" element={<Recent />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route path="/room/:roomId" element={<SingleRoom />} />
          <Route path="/rooms/:sellerId" element={<SellersRoom />} />
          <Route path="/category/:category" element={<CategoryRoom />} />
          <Route
            exact
            path="/admin/dashboard"
            element={<Dashboard isAdmin={user && user.role === "admin"} />}
          />
          <Route
            exact
            path="/signup"
            element={<Signup isAuthenticated={isAuthenticated} />}
          />
          <Route
            exact
            path="/signin"
            element={<Signin isAuthenticated={isAuthenticated} />}
          />
          <Route
            exact
            path="/seller/create"
            element={<CreateRoom isSeller={user && user.role === "seller"} />}
          />
          <Route
            exact
            path="/seller/rooms"
            element={<SellerRooms isSeller={user && user.role === "seller"} />}
          />
          <Route
            path="/room/edit/:roomId"
            element={<EditRoom isSeller={user && user.role === "seller"} />}
          />
          <Route
            exact
            path="/password/forget"
            element={<ForgetPassword isAuthenticated={isAuthenticated} />}
          />
          <Route
            exact
            path="/password/reset/:token"
            element={<ResetPassword isAuthenticated={isAuthenticated} />}
          />
          <Route
            exact
            path="/password/change"
            element={<ChangePassword isAuthenticated={isAuthenticated} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
};

export default Pages;
