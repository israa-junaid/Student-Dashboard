import axios from "axios";
import { LOGIN_SUCCESS, LOGIN_FAIL } from "../ReduxStore/Actions";
export default function authy() {
  return async (dispatch, getState) => {
    console.log("authy runs");
    try {
      await axios
        .get("/about")
        .then((res) => {
          console.log(res);
          dispatch({
            type: LOGIN_SUCCESS,
            payload: { id: res.data.personid, auth: true, name: res.data.name },
          });
        })
        .catch((err) => {
          console.log("error hay");
          dispatch({
            type: LOGIN_FAIL,
            payload: { id: "", auth: false, name: "" },
          });
        });
    } catch (error) {
      console.log(error);
    }
  };
}
