import React, {useEffect, useState} from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CardFooter from "components/Card/CardFooter.js";
import {NavLink} from "react-router-dom";
import SubmittedFormDetails from "./SubmittedFormDetails/Categories/IsLeader";

export default function FormSubmitted() {  
  return (
    <>
    <br></br>
        <Typography variant="h5" gutterBottom>
            Your Response has been Recorded Successfully.
        </Typography>
        <Typography variant="subtitle1">
            Keep checking portal for further details.
        </Typography>

        <SubmittedFormDetails />
        
        <CardFooter>
            <NavLink to="../admin/dashboard">
                <Button color="primary" variant="contained">
                    Back to Home
                </Button>
            </NavLink>
        </CardFooter>
    </>
  );
}
