import React, {useEffect, useContext, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
// import AppBar from "@material-ui/core/AppBar";
// import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import InitialForm from "./InitialForm";
import GroupDetails from "./GroupDetails";
import CardFooter from "components/Card/CardFooter.js";
import {NavLink} from "react-router-dom";
import {useDispatch, connect, useSelector} from "react-redux";
import axios from "axios";
// import Userdata from "../../ApiStore/Userdata";
import {useHistory} from "react-router-dom";
import {LOGIN_SUCCESS, LOGIN_FAIL} from "../../ReduxStore/Actions";
import {StudentDataContext} from "Context/StudentContext";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Leader from "./Leader";

// function Copyright() {
//     return (
//         <Typography variant="body2" color="textSecondary" align="center">
//             {"Copyright © "}
//             <Link color="inherit" href="https://material-ui.com/">
//                 Your Website
//             </Link>{" "}
//             {new Date().getFullYear()}
//             {"."}
//         </Typography>
//     );
// }

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 700,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(0),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 10, 5),
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(1),
  },
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

// const steps = ["Project Details", "Group Details", "Form Review"];
const steps = ["Student Info", "Group Details","Project Details"];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <Leader/> ;
    case 1:
      return <GroupDetails />
    case 2:
      return <InitialForm />;
    // case 2:
    //     return <Review />;
    default:
      throw new Error("Unknown step");
  }
}

const Checkout = ({id, isSUBMIT}) => {
  const classes = useStyles();
  const history = useHistory();

  const value = useContext(StudentDataContext);
  const {setmem1, setval, val,bool} = value;
  const [products, setproducts] = value.testing;
  const dispatch = useDispatch();
  //*******************useefffect */
  //function callled in useeffect********************/

  const authy = async () => {
    await axios
      .get("/student/about")
      .then((res) => {
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
        history.push("/auth/login");
      });
  };

  //********************************Fuctio to add login student data automatically to form */
  const handleAddData = async () => {
    // isSUBMIT ? setActiveStep(3) : "";
    // if (isSUBMIT == true) {
    //   setActiveStep(3);
    // }
    try {
      const req = await axios.get(`/student/${id}`);
      const result = await req.data;
      setmem1({
        name: result.s_name,
        contact: result.contact,
        email: result.email,
      });
      const name = "stu1_id";
      const value = id;
      setval((ev) => {
        return {...ev, [name]: value};
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    //***Function to authenticate user
    authy();

    // setActiveStep(2);
    // // console.log(activeStep);
  }, []);
  useEffect(() => {
    if (isSUBMIT  == true) {
      console.log(isSUBMIT, "han bai");
      setActiveStep(3);
    }
  }, [isSUBMIT]);
  const [activeStep, setActiveStep] = React.useState(0);

  useEffect(() => {
    if (id.length >= 8) {
      console.log(id);
      handleAddData();
    }
  }, [id]);
  useEffect(()=>{
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  },[activeStep])

  //**invoke notification if some field is missing */
  const notifyMISSINGDATA = () =>
    toast.info("Please fill all details of the form ", {
      position: "top-center",
      pauseOnHover: false,
    });
  //**invoke notification if server is not responding welll */
  const notifyServerissue = () =>
    toast.info("Please refresh the page and submit the form again ", {
      position: "top-center",
      pauseOnHover: false,
    });
    const notifyAlert = () =>
    toast.info("Please provide unique roll number", {
      position: "top-center",
      pauseOnHover: false,
    });

  //***FORM DATA SUBMISSION FUNCTION */
  const handlesubmit = async () => {
    console.log(val);
    const {
      s_organization,
      s_leader,
      s_batch,
      s_internal,
      internal_designation,

      s_external,
      external_designation,
      externalAdvisorContactNo,
      externalAdvisorAddress,
      orgAddress,
      orgContactNo,
      orgDomain,
      s_proj_title,
      s_status,
      stu1_id,
      stu2_id,
      stu3_id,
      s_name1,
      s_name2,
      s_name3,
    } = val;
    
    if (
      val.group_count == 1  &&
      (s_organization && s_leader && s_batch,
      s_internal &&
        internal_designation &&
        external_designation &&
        s_external &&
        s_proj_title &&
        s_status &&
        stu1_id &&
     
        externalAdvisorContactNo &&
        externalAdvisorAddress &&
        orgAddress &&
        orgContactNo &&
        orgDomain)
    ) {
      console.log("submitted OF MEMBERS 1");
      await axios
        .post("/student/form", val)
        .then((res) => {
          console.log(res);
          setActiveStep(activeStep + 1);
        })

        // .then((res) => {
        //   axios.post("/student/sendmail", { stu1_id, stu2_id, s_leader });
        // })
        .catch((err) => {
          console.log(err.response);
          notifyServerissue();
        });
      // setsubmit(true);
    }
   else if (
      val.group_count == 2  && 
      (s_organization && s_leader && s_batch,
      s_internal &&
        internal_designation &&
        external_designation &&
        s_external &&
        s_proj_title &&
        s_status &&
        stu1_id &&
        stu2_id &&
        externalAdvisorContactNo &&
        externalAdvisorAddress &&
        orgAddress &&
        orgContactNo &&
        orgDomain)
    ) {
      console.log("submitted OF MEMBERS 2");
      await axios
        .post("/student/form", val)
        .then((res) => {
          console.log(res);
          setActiveStep(activeStep + 1);
        })

        // .then((res) => {
        //   axios.post("/student/sendmail", { stu1_id, stu2_id, s_leader });
        // })
        .catch((err) => {
          console.log(err.response);
          console.log("Stud1_id = stud2_id");
          notifyServerissue();
        });
      // setsubmit(true);
    } 
    else if (
      val.group_count == 3 &&
      (s_organization && s_leader && s_batch,
      s_internal &&
        internal_designation &&
        external_designation &&
        s_external &&
        s_proj_title &&
        s_status &&
        stu1_id &&
        stu2_id &&
        stu3_id &&
        externalAdvisorContactNo &&
        externalAdvisorAddress &&
        orgAddress &&
        orgContactNo &&
        orgDomain)
    ) {
      console.log("submitted OF MEMEBER 3");
      await axios
        .post("/student/form", val)
        .then((res) => {
          console.log(res);

          setActiveStep(activeStep + 1);
        })
        .catch((err) => {
          console.log(err.response);
          notifyServerissue();
        });
      // setsubmit(true);
    } else {
      notifyMISSINGDATA();
      console.log("not submitted");
    }
  };
  ///***END OF FORM DATA SUBMISSION FUNCTION*/

  const handleNext = () => {
    // console.log(activeStep);
    // setActiveStep(activeStep + 1);
    const { stu1_id,stu2_id,stu3_id } = val;
    if (activeStep == 0) { 
      if(bool == 1 && val.group_count == 1 || val.group_count == 2 || val.group_count == 3 ){
        setActiveStep(activeStep + 1)
          //console.log("inside here...")
      }
      
    } 
     if  (activeStep === 1) {

      if (stu1_id == stu2_id || stu2_id == stu3_id || stu1_id == stu3_id) {
        console.log("Error in ID's");
        notifyAlert();
      } else {
        setActiveStep(activeStep+1);
      }
     
      //**CALLING FUNCTION TO SUBMIT STUDENT DATA */
      // console.log("call handle submit");
      // setActiveStep(activeStep + 1);
    
     
      
      // console.log("submitted");
      // setActiveStep(activeStep + 1);
    } else if(activeStep == 2){
      handlesubmit();
    } 
    
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };



  return (
    <React.Fragment>
      <CssBaseline />
      {/* <AppBar position="absolute" color="default" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" color="inherit" noWrap>
                        Company name
                    </Typography>
                </Toolbar>
            </AppBar> */}
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h3" variant="h4" align="center">
            Final Year Project Allocation Form
          </Typography>
          {/* <Stepper activeStep={activeStep} className={classes.stepper}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper> */}
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Your Response has been Recorded Successfully.
                </Typography>
                <Typography variant="subtitle1">
                  Keep checking portal for further details.
                </Typography>
                <CardFooter>
                  <NavLink to="../admin/dashboard">
                    <Button color="primary" variant="contained">
                      Back to Home
                    </Button>
                  </NavLink>
                </CardFooter>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? "Submit Form" : "Next"}
                  </Button>
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
        {/* <Copyright /> */}
      </main>
      <ToastContainer />
    </React.Fragment>
  );
};
function mapStateToProps({DataRed: {id, isSUBMIT}}) {
  return {id: id, isSUBMIT: isSUBMIT};
}
export default connect(mapStateToProps)(Checkout);