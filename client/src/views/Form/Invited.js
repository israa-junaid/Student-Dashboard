import React, {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CardFooter from "components/Card/CardFooter.js";

export default function Invited() {

  const [isInvite , setIsInvite] = useState("");
  
  //-------------FUNCTIONS---------------------
  const acceptInvitation = ()=>{
    setIsInvite(false);
  }

  const rejectInvitation = ()=>{
    setIsInvite(false);
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
