import { useEffect, useState } from "react";
import "./App.css";
import Pages from "./components/pages/Pages";
import { loadUser } from "./redux/actions/authAction";
import { useDispatch } from "react-redux";
import { getAllRoom, listSellers } from "./redux/actions/sellerAction";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
    dispatch(getAllRoom());
    dispatch(listSellers());
  }, [dispatch]);
  return <Pages />;
}

export default App;
