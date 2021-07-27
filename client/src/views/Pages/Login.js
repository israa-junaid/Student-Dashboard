import React, {useState, useContext} from "react";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import {useHistory} from "react-router";
import {useDispatch} from "react-redux";
import {LOGIN_SUCCESS, LOGIN_FAIL} from "../../ReduxStore/Actions";
import "./login.css";
import axios from "axios";
import {useEffect} from "react";
import {makeStyles} from "@material-ui/core/styles";
import CardHeader from "components/Card/CardHeader.js";
import Card from "components/Card/Card.js";
const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
};

const useStyles = makeStyles(styles);
const Login = () => {
  const classes = useStyles();
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
        
        <div className="row justify-content-center">
          
           <div className="col-4">
           
            <div className="card card-signin p-2 bd-highlight">
            
              <div className="card-body ">
              
                <h4 className="card-title text-center text-dark ">
                 <dt> Log Into FYP System{" "} </dt>
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
                <form className="form-signin ">
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
                    <div className="col text-center">
                  <button
                    onClick={handleSubmit}
                    className="btn btn-primary "
                    type="submit"
                  >
                    LOGIN
                  </button>
                  </div>
                  
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
// import React, {useState, useContext} from "react";
// import PropTypes from "prop-types";


// // @material-ui/core components
// import withStyles from "@material-ui/core/styles/withStyles";
// import InputAdornment from "@material-ui/core/InputAdornment";
// import Icon from "@material-ui/core/Icon";
// import Checkbox from "@material-ui/core/Checkbox";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import {makeStyles} from "@material-ui/core/styles";

// // @material-ui/icons
// import Email from "@material-ui/icons/Email";
// import Check from "@material-ui/icons/Check";
// import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
// // core components
// import GridContainer from "components/Grid/GridContainer.js";
// import GridItem from "components/Grid/GridItem.js";
// import CustomInput from "components/CustomInput/CustomInput.js";
// import Button from "components/CustomButtons/Button.js";
// import Card from "components/Card/Card.js";
// import CardBody from "components/Card/CardBody.js";
// import CardHeader from "components/Card/CardHeader.js";
// import CardFooter from "components/Card/CardFooter.js";
// import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

// import loginPageStyle from "assets/jss/material-dashboard-react/views/loginPageStyle.jsx";
// import {useHistory} from "react-router";
// import {useDispatch} from "react-redux";
// import {LOGIN_SUCCESS, LOGIN_FAIL} from "../../ReduxStore/Actions";
// import "./login.css";
// import axios from "axios";
// import {useEffect} from "react";


// const { REACT_APP_SERVER_URL } = process.env;
// const useStyles = makeStyles(styles);
// const Login =() =>  {
//    //****************************all the state values  ***************************
//    const history = useHistory();
//    const dispatch = useDispatch();
//    const [val, setval] = useState({
//      email: "",
//      pass: "",
//    });
//    const [checked, ischecked] = useState("");
//    const [loading, isloading] = useState(false);
//    const [invalid, isinvalid] = useState(false);
//    const classes = useStyles();
//    //************************useEffect hooks use */
//    //useEffect for clearing the invalid state vaue after 3 seconds
//    useEffect(() => {
//      // console.log("invalid cont...");
//      const setinvalid = setTimeout(() => {
//        isinvalid(false);
//      }, 3000);
//      return () => clearTimeout(setinvalid);
//    }, [invalid]);
 
//    // *************all functions***********************
//    // function for grabing the input(onChange event) values
 
//    const handleChange = (e) => {
//      const name = e.target.name;
//      const value = e.target.value;
//      setval((v) => {
//        return {...v, [name]: value};
//      });
//    };
 
//    //function for user authentiation
//    const handleSubmit = async (e) => {
//      e.preventDefault();
 
//      // console.log(val);
//      //****************post request only when all credentials entered */
//      if (val.email && val.pass) {
//        //enable loader
//        isloading(true);
//        await axios
//          .post("/student/login", val)
//          .then((res) => {
//            //authentication succces part
//            isloading(false);
//            console.log(res);
 
//            // *************DESTRUCTURING THE RESPONSE****//
//            const {
//              personid,
//              name,
//              isSUBMIT,
//              isACCEPTED,
//              isINVITE,
//              email,
//              contact,
//              department,
//            } = res.data;
//            console.log(personid);
//            // ********************************DISPATCHING ACTION IN CASE OF LOGIN SUCCESS****************/
//            dispatch({
//              type: LOGIN_SUCCESS,
//              payload: {
//                auth: true,
//                id: personid,
//                name: name,
//                isSUBMIT,
//                isACCEPTED,
//                isINVITE,
//                email,
//                department,
//                contact,
//              },
//            });
//            history.push("/admin/dashboard");
//            // history.go();
//          })
//          .catch((err) => {
//            //authentication failed part
//            isloading(false);
//            isinvalid(true);
//            // ********************************DISPATCHING ACTION IN CASE OF LOGIN FAILURE****************/
//            dispatch({
//              type: LOGIN_FAIL,
//              payload: {
//                auth: false,
//                id: "",
//                name: "",
//                email: "",
//                contact: "",
//                department: "",
//                isSUBMIT: false,
//                isACCEPTED: false,
//                isINVITE: false,
//              },
//            });
//            console.log(err);
//          });
//      } else {
//        isinvalid(true);
//      }
//    };
 


//     return (
//       <div className={classes.container}>
//         <GridContainer justify="center">
//           <GridItem xs={12} sm={8}>
            
//           </GridItem>
//         </GridContainer>
//         <GridContainer justify="center">
//           <GridItem xs={12} sm={6} md={4}>
//             <form>
//             <Card >
//                 <CardHeader
//                   className={`${classes.cardHeader} ${classes.textCenter}`}
//                   color="primary"
//                 >
//                   <h4 className={classes.cardTitle}>Log in</h4>
//                   <div className={classes.socialLine}>
//                     {[
//                       "fa fa-facebook-square",
//                       "fa fa-twitter",
//                       "fa fa-google-plus"
//                     ].map((prop, key) => {
//                       return (
//                         <Button
//                           color="transparent"
//                           justIcon
//                           key={key}
//                           className={classes.customButtonClass}
//                         >
//                           <i className={prop} />
//                         </Button>
//                       );
//                     })}
//                   </div>
//                 </CardHeader>
//                 <CardBody>
//                   {/* <p
//                     className={`${classes.textCenter} ${classes.checkboxLabel}`}
//                   >
//                     Or Sign in with <strong>admin@material.com</strong> and the
//                     password <strong>secret</strong>{" "}
//                   </p> */}
//                   <CustomInput
//                     labelText="Email..."
//                     //id="email"
//                     name="email"
//                     type="email"
//                     id="inputEmail"
//                     onChange={handleChange}

//                     formControlProps={{
//                       fullWidth: true,
//                       className: classes.formControlClassName
//                     }}
//                     inputProps={{
//                       required: true,
//                       name: "email",
//                       endAdornment: (
//                         <InputAdornment position="end">
//                           <Email className={classes.inputAdornmentIcon} />
//                         </InputAdornment>
//                       )
//                     }}
//                   />
//                   {/* <input
//                       type="email"
//                       id="inputEmail"
//                       className="form-control"
//                       placeholder="Email address"
//                       name="email"
//                       onChange={handleChange}
//                       required
//                     /> */}
//                   <CustomInput
//                     labelText="Password"
//                     id="password"
//                     type="password"
//                     name="pass"
//                     onChange={handleChange}
//                     formControlProps={{
//                       fullWidth: true,
//                       className: classes.formControlClassName
//                     }}
                    
//                     inputProps={{
//                       type: "password",
//                       required: true,
//                       name: "pass",
//                       endAdornment: (
//                         <InputAdornment position="end">
//                           <Icon className={classes.inputAdornmentIcon}>
//                             lock_outline
//                           </Icon>
//                         </InputAdornment>
//                       )
//                     }}
                   
//                   />
//                     {/* <input
//                       type="password"
//                       id="inputPassword"
//                       name="pass"
//                       onChange={handleChange}
//                       className="form-control"
//                       placeholder="Password"
//                       required
//                     /> */}
                 
//                 </CardBody>
//                 <CardFooter className={classes.justifyContentCenter}>
//                   {/* <Button type="submit" color="primary" simple size="lg" block>
//                     LogIn
//                   </Button> */}
                  
//                   <Button
//                     onClick={handleSubmit}
//                     color="primary" simple size="lg" block
//                     type="submit"
//                   >
//                     Log In
//                   </Button>
//                 </CardFooter>
//               </Card>
//             </form>
//           </GridItem>
//         </GridContainer>
//       </div>
//     );
  
// }


// export default withStyles(loginPageStyle)(Login);

