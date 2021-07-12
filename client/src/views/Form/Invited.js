import React, {useEffect, useState,useContext} from "react";
import {NavLink} from "react-router-dom";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CardFooter from "components/Card/CardFooter.js";
import axios from "axios";
import {StudentDataContext} from "Context/StudentContext";
import {useDispatch, connect, useSelector} from "react-redux";
import {LOGIN_SUCCESS, LOGIN_FAIL} from "../../ReduxStore/Actions";
const Invited= (props) =>  {
  const value = useContext(StudentDataContext);
  
const dispatch = useDispatch();
  const {isInvite,setIsInvite} = value;
  useEffect(()=> {
      authy()
  },[isInvite])
  
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
         //setIsSubmit(isSUBMIT);
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
        //history.push("/auth/login");
      });
  };
  //const [isINVITE , setIsInvite] = useState(true);
  const acceptInvitation = async () => {
    try {
      const req =  await axios.post(`/student/status?val=true`,{rollNo:props.id})
      console.log(req);

      
    } catch (error) {
      console.log("Error in acceptInviatation func");
    }
  }
  //-------------FUNCTIONS---------------------
  // const acceptInvitation = ()=>{
  //   setIsInvite(false);
  // }
  // const acceptInvitation = async () => {
  //   const dispatch = useDispatch();
  //   await axios
  //   .post(`https://student-server-app.herokuapp.com/student/status?val=true`,{
  //     rollNo:id}).then((res) => {
     
  // }
  const rejectInvitation = async()=>{
    try {
      const req =  await axios.post(`/student/status?val=false`,{rollNo:props.id})
      console.log(req);
      setIsInvite(false);

      
    } catch (error) {
      console.log("Error in acceptInviatation func");
    }

    }
  
  
  
  return (
    <>
        {/* IF THE PERSON IS INVITED THEN RUN THIS CODE */}
        <br></br>
        <Typography variant="h5" gutterBottom>
        <strong>Mr. Ahmed</strong> has requested you to create group with him
        </Typography>                      
        <Typography variant="subtitle1">
          Do you want to be in his group member?
        </Typography>
        <CardFooter>
            <NavLink to="../admin/dashboard">
                <Button color="primary" variant="contained" onClick={acceptInvitation}>
                    Accept
                </Button>
            </NavLink>
            <NavLink to="../admin/dashboard" onClick={rejectInvitation}>
                <Button color="secondary" variant="contained">
                    Reject
                </Button>
            </NavLink>
        </CardFooter>
    </>
  );
}
function mapStateToProps({DataRed: {id}}) {
  return {id: id};
}
export default connect(mapStateToProps)(Invited)