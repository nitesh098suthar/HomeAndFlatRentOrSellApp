import axios from "axios";
import { serverURI } from "../store";

export const contactAdmin = (email, name, feedback) => async (dispatch) => {
  dispatch({ type: "contactReq" });
  try {
    const { data } = await axios.post(
      `${serverURI}/user/contact`,
      { email, name, feedback },
      { headers: { "Content-Type": "application/json" } }
    );
    dispatch({ type: "contactRes", payload: data });
  } catch (error) {
    dispatch({ type: "contactRej", payload: error.response.data.message });
  }
};
