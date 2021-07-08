import React, {useState, useContext} from "react";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import {useHistory} from "react-router";
import {useDispatch} from "react-redux";
import {LOGIN_SUCCESS, LOGIN_FAIL} from "../../ReduxStore/Actions";
import "./login.css";
import axios from "axios";
import {useEffect} from "react";

const Login = () => {
  //****************************all the state values  ***************************
  const history = useHistory();
  const dispatch = useDispatch();
  const [val, setval] = useState({
    email: "",
    pass: "",
  });
  const [loading, isloading] = useState(false);
  const [invalid, isinvalid] = useState(false);
  //************************useEffect hooks use */
  //useEffect for clearing the invalid state vaue after 3 seconds
  useEffect(() => {
    // console.log("invalid cont...");
    const setinvalid = setTimeout(() => {
      isinvalid(false);
    }, 3000);
    return () => clearTimeout(setinvalid);
  }, [invalid]);

  // *************all functions***********************
  // function for grabing the input(onChange event) values

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setval((v) => {
      return {...v, [name]: value};
    });
  };

  //function for user authentiation
  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.log(val);
    //****************post request only when all credentials entered */
    if (val.email && val.pass) {
      //enable loader
      isloading(true);
      await axios
        .post("/student/login", val)
        .then((res) => {
          //authentication succces part
          isloading(false);
          console.log(res);

          // *************DESTRUCTURING THE RESPONSE****//
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
          console.log(personid);
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
          history.push("/admin/dashboard");
          // history.go();
        })
        .catch((err) => {
          //authentication failed part
          isloading(false);
          isinvalid(true);
          // ********************************DISPATCHING ACTION IN CASE OF LOGIN FAILURE****************/
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
          console.log(err);
        });
    } else {
      isinvalid(true);
    }
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-lg-10 col-xl-9 mx-auto">
            <div className="card card-signin flex-row my-5">
              <div className="card-img-left d-none d-md-flex"></div>
              <div className="card-body">
                <h4 className="card-title text-center text-dark">
                  Log into FYP System{" "}
                </h4>
                {loading ? (
                  <div className="text-dark text-center mb-3">
                    <div className="spinner-border text-warning" role="status">
                      <span className="sr-only"></span>
                    </div>
                    <br></br>
                    <span className="text-warning">Authenticating</span>
                  </div>
                ) : (
                  ""
                )}
                <form className="form-signin">
                  {invalid ? (
                    <p className="text-danger ml-2">*Invalid Credentials</p>
                  ) : (
                    ""
                  )}
                  <div className="form-label-group">
                    <input
                      type="email"
                      id="inputEmail"
                      className="form-control"
                      placeholder="Email address"
                      name="email"
                      onChange={handleChange}
                      required
                    />
                    <label htmlFor="inputEmail">Email address</label>
                  </div>

                  <div className="form-label-group">
                    <input
                      type="password"
                      id="inputPassword"
                      name="pass"
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Password"
                      required
                    />
                    <label htmlFor="inputPassword">Password</label>
                  </div>

                  <button
                    onClick={handleSubmit}
                    className="btn btn-lg btn-primary btn-block text-uppercase"
                    type="submit"
                  >
                    Log In
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
