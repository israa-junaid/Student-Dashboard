import React, {useEffect, useContext, useState} from "react";
import {useDispatch, connect, useSelector} from "react-redux";
import axios from "axios";
import {useHistory} from "react-router-dom";
import {LOGIN_SUCCESS, LOGIN_FAIL} from "../../ReduxStore/Actions";
import {StudentDataContext} from "Context/StudentContext";
import {ToastContainer, toast} from "react-toastify";

import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import InitialForm from "./InitialForm";
import GroupDetails from "./GroupDetails";

import {makeStyles} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import "react-toastify/dist/ReactToastify.css";
import {blue} from "@material-ui/core/colors";

import Leader from "./Leader";
import IsInvited from "./IsInvited";
import IsLeader from "./IsLeader";

const blueColor = blue[500]

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 765,
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

//--------  STEPPER HEADERS   --------------
const steps = ["Student Info", "Group Details","Project Details"];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <Leader/> ;
    case 1:
      return <GroupDetails />
    case 2:
      return <InitialForm />;
    default:
      throw new Error("Unknown step");
  }
}

const Checkout = ({id, isSUBMIT,isINVITE}) => {
  const classes = useStyles();
  const history = useHistory();

  const value = useContext(StudentDataContext);
  const {setmem1, setval, val,bool,isInvite,setIsInvite} = value;
  //const [products, setproducts] = value.testing;
  const dispatch = useDispatch();
  const [isSubmit , setIsSubmit] = useState("");
  //const [response , setResponse] = useState(0);
  console.log("Logged in person is invited by someone? ",isInvite);
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
         // console.log(isINVITE);
         setIsInvite(isINVITE);
         //console.log(isSUBMIT)
         setIsSubmit(isSUBMIT);
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

  //********************************Fuction to add login student data automatically to form */
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
}, []);
  useEffect(() => {
    setIsInvite(isINVITE)
    if (isSUBMIT  == true) {
      console.log(isSUBMIT, "han bai");
      setActiveStep(3);
    }
  }, [isSUBMIT,isINVITE]);
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
    //generate alert when user enter same roll no for stu1 or stu2 or stu3 or do not enter any rollno
    const notifyAlert = () =>
    toast.info("Please enter correct Roll number", {
      position: "top-center",
      pauseOnHover: false,
    });
    //Only leader can fill the form ALERT
    // const notifyLeader = () =>
    // console.log("Notifyleader here")
    // toast.info("Only Leader can fill the form", {
    //   position: "top-center",
    //   pauseOnHover: false,
    // });

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
      // else {
      //   notifyLeader();
      // }
    } 
     if  (activeStep == 1) {
      //  if (val.group_count==1){                    /// incase one student group
      //   setActiveStep(activeStep+1);
      //   console.log("First if")
      //  }
      if (val.group_count ==2 || val.group_count==3 ) {
        if (stu1_id == stu2_id || stu2_id == stu3_id || stu1_id == stu3_id) {  //***checking roll no should not the same
          console.log("Id of stu1: ",stu1_id);
          console.log("Id of stu2: ",stu2_id);
          console.log("Error in ID's");
          notifyAlert();
      } else {
        setActiveStep(activeStep+1);
      }
      // if (stu1_id == stu2_id || stu2_id == stu3_id || stu1_id == stu3_id) {  //***checking roll no should not the same
      //   console.log("Id of stu1: ",stu1_id);
      //   console.log("Id of stu2: ",stu2_id);
      //   console.log("Error in ID's");
      //   notifyAlert();
        

      // }  
    }else{
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
    <>
      <CssBaseline />

      {/* FORM HEADER */}
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h3" variant="h4" align="center">
            Final Year Project Allocation Form
          </Typography>
              {console.log("ISinvite", isInvite)}
              {
                isInvite ? (
                  // PERSON IS INVITED
                    <IsInvited />
                  ) : (
                  <>
                  {
                    isSubmit ? (
                      // NOT INVITED + HAS SUBMITTED FORM
                      // I.E. THE GROUP LEADER
                      <IsLeader />
                    ) : (
                      // NOT INVITED + HAS NOT SUBMITTED FORM
                      // I.E. A NEW COMER
                      <>
                        {/* STEPPER INDIVIDUAL FORMS HEADER */}
                        <Stepper activeStep={activeStep} className={classes.stepper}>
                          {steps.map((label) => (
                            <Step key={label}>
                              <StepLabel>{label}</StepLabel>
                            </Step>
                          ))}
                        </Stepper>

                        {/* WHEN REACHED LAST PAGE */}
                          {
                            activeStep === steps.length ? (
                              <>
                                <IsLeader />
                              </>
                            ) : (
                              <>
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
                                    disabled={!bool}
                                    
                                  >
                                    {activeStep === steps.length - 1 ? "Submit Form" : "Next"}
                                  </Button>            
                                </div>
                              </>
                            )}
                      </>
                    )}
                  </>
                )}
        </Paper>
        {/* <Copyright /> */}
      </main>
      <ToastContainer />
    </>
  );
}



// return (
//   <React.Fragment>
//     <CssBaseline />

//     <main className={classes.layout}>
//       <Paper className={classes.paper}>
//         <Typography component="h3" variant="h4" align="center">
//           Final Year Project Allocation Form
//         </Typography>
//         {/* <Stepper activeStep={activeStep} className={classes.stepper}>
//                       {steps.map((label) => (
//                           <Step key={label}>
//                               <StepLabel>{label}</StepLabel>
//                           </Step>
//                       ))}
//                   </Stepper> */}
//         <Stepper activeStep={activeStep} className={classes.stepper}>
//           {steps.map((label) => (
//             <Step key={label}>
//               <StepLabel>{label}</StepLabel>
//             </Step>
//           ))}
//         </Stepper>
//         <React.Fragment>
//           {activeStep === steps.length ? (
//             <React.Fragment>
//               <Typography variant="h5" gutterBottom>
//                 Your Response has been Recorded Successfully.
//               </Typography>
//               <Typography variant="subtitle1">
//                 Keep checking portal for further details.
//               </Typography>
//               <CardFooter>
//                 <NavLink to="../admin/dashboard">
//                   <Button color="primary" variant="contained">
//                     Back to Home
//                   </Button>
//                 </NavLink>
//               </CardFooter>
//             </React.Fragment>
//           ) : (
//             <React.Fragment>
//               {getStepContent(activeStep)}
//               <div className={classes.buttons}>
//                 {activeStep !== 0 && (
//                   <Button onClick={handleBack} className={classes.button}>
//                     Back
//                   </Button>
//                 )}
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   onClick={handleNext}
//                   className={classes.button}
//                 >
//                   {activeStep === steps.length - 1 ? "Submit Form" : "Next"}
//                 </Button>
//               </div>
//             </React.Fragment>
//           )}
//         </React.Fragment>
//       </Paper>
//       {/* <Copyright /> */}
//     </main>
//     <ToastContainer />
//   </React.Fragment>
// );
// };
function mapStateToProps({DataRed: {id, isSUBMIT,isINVITE}}) {
  return {id: id, isSUBMIT: isSUBMIT,isINVITE:isINVITE};
}
export default connect(mapStateToProps)(Checkout);