import axios from "axios";
import { useState } from "react";
import { Redirect } from "react-router-dom";
import { LOGIN_SUCCESS, LOGIN_FAIL } from "../ReduxStore/Actions";

export default function Userdata() {
  return async (dispatch, getState) => {
    console.log("userdata is responding");

    await axios
      .get("/student/about")
      .then((res) => {
        console.log(res.data);
        const {
          personid,
          name,
          isSUBMIT,
          isACCEPTED,
          isINVITE,
          email,
          contact,
          department,
        } = res.data;
        // ********************************DISPATCHING ACTION IN CASE OF LOGIN SUCCESS****************/
        dispatch({
          type: LOGIN_SUCCESS,
          payload: {
            auth: true,
            id: personid,
            name: name,
            isSUBMIT,
            isACCEPTED,
            isINVITE,
            email,
            department,
            contact,
          },
        });
      })
      .catch((err) => {
        console.log(err);
        // ***dispatching an action in case of LOGIN FAIL
        dispatch({
          type: LOGIN_FAIL,
          payload: {
            auth: false,
            id: "",
            name: "",
            email: "",
            contact: "",
            department: "",
            isSUBMIT: false,
            isACCEPTED: false,
            isINVITE: false,
          },
        });
      });
  };
}
