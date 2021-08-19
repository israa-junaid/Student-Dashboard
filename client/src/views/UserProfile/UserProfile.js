import React, { useEffect, useState } from "react";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { makeStyles } from "@material-ui/core/styles";

import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import Typography from "@material-ui/core/Typography";
// import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";

import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";

import avatar from "assets/img/faces/marc.jpg";
import PersonIcon from "@material-ui/icons/Person";
import StarIcon from "@material-ui/icons/Star";
import PhoneIcon from "@material-ui/icons/Phone";
import MailRoundedIcon from "@material-ui/icons/MailRounded";
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import { useDispatch, connect, useSelector } from "react-redux";
import axios from "axios";
// import Userdata from "../../ApiStore/Userdata";
import { useHistory } from "react-router-dom";
import { LOGIN_SUCCESS, LOGIN_FAIL } from "../../ReduxStore/Actions";
import Userdata from "../../ApiStore/Userdata";
import { createHashHistory } from "history";
const styles = {
  cardCategoryWhite: {
    // color: "rgba(255,255,255,.62)",
    color: "black",
    margin: "0",
    fontSize: "16px",
    width: "auto",
    marginTop: "0",
    marginBottom: "0",
    // border: "2px solid red",
  },
  // cardTitleWhite: {
  //   color: "#FFFFFF",
  //   marginTop: "0px",
  //   minHeight: "auto",
  //   fontWeight: "300",
  //   fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
  //   marginBottom: "3px",
  //   textDecoration: "none",
  // },
};

const useStyles = makeStyles(styles);

function UserProfile({ name, contact, email, department, personid }) {
  //getting the id to check authentication of user if no id means user is not loged in
  const id = useSelector(({ DataRed }) => DataRed.id);
  const auth = useSelector(({ DataRed }) => DataRed.auth);
  ///************ */
  const [val, setval] = useState(true);
  const history = useHistory();
  const classes = useStyles();
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
  useEffect(() => {
    authy();
  }, []);

  return (
    <div>
      
      <GridContainer>
      <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Edit Profile</h4>
              {/* <p className={classes.cardCategoryWhite}>Complete your profile</p> */}
            </CardHeader>
            <CardBody>
              <GridContainer>
                {/* <GridItem xs={12} sm={12} md={5}>
                  <CustomInput
                    labelText="Company (disabled)"
                    id="company-disabled"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      disabled: true,
                    }}
                  />
                </GridItem> */}
               
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  
                  <CustomInput
                    labelText="First Name"
                    id="first-name"
                    
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Last Name"
                    id="last-name"
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Department"
                    id="department"
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Email address"
                    id="email-address"
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Batch"
                    id="batch"
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Roll No"
                    id="rollno"
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Contact"
                    id="year"
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                {/* <GridItem xs={12} sm={12} md={12}>
                  <InputLabel style={{ color: "#AAAAAA" }}>About me</InputLabel>
                  <CustomInput
                    labelText="Lamborghini Mercy, Your chick she so thirsty, I'm in that two seat Lambo."
                    id="about-me"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      multiline: true,
                      rows: 5,
                    }}
                  />
                </GridItem> */}
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button color="primary">Update Profile</Button>
            </CardFooter>
          </Card>
          </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card profile>
            <CardAvatar profile>
              <a href="#pablo" onClick={(e) => e.preventDefault()}>
                <img src={avatar} alt="..." />
              </a>
            </CardAvatar>
            <CardBody profile>
              <h5 className={`${classes.cardCategoryWhite} mt-2`}>
                <span className={`mr-2`}>
                  
                </span>
                <Typography style={{ fontWeight: 600 }}>
                    Name: {name}
                </Typography>
                
              </h5>
              <div
                className={`d-flex justify-content-center align-items-center`}
              >
                <h5 className={`${classes.cardCategoryWhite} mt-2`}>
               
                   Department: {department}
                
                  
                </h5>
              </div>
              <h5 className={`${classes.cardCategoryWhite} mt-2`}>
                <span className={`mr-2`}>
                  
                </span>
               
                 Roll No: {id}
                
                
              </h5>
              <h5 className={`${classes.cardCategoryWhite} mt-2`}>
                <span className={`mr-2`}>
                  
                </span>
                
                Designation: Student
                
                
              </h5>
              <h5 className={`${classes.cardCategoryWhite} mt-2`}>
                <span className={`mr-2`}>
                  
                </span>
               
                Contact: {contact}
                
                
              </h5>
              <h5 className={`${classes.cardCategoryWhite} mt-2`}>
                <span className={`mr-2`}>
                  
                </span>
                
                Email: {email}            
              </h5>

            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}

function mapStateToProps({ DataRed: { name, contact, email, department, personid } }) {
  return {
    name,
    contact,
    email,
    department,
    personid
  };
}
export default connect(mapStateToProps)(UserProfile);

