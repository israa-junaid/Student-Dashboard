import React, {useState, useContext, useEffect} from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import {makeStyles} from "@material-ui/core/styles";
//import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import axios from "axios";
import PropTypes from "prop-types";
import {connect, useDispatch, useSelector} from "react-redux";
import MuiPhoneNumber from "material-ui-phone-number";
//import FormHelperText from "@material-ui/core/FormHelperText";
// import Check from "./Check";
// import InitialDetails from "./InitialDetails";
import {StudentDataContext} from "../../Context/StudentContext";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  formControl: {
    margin: theme.spacing(3),
  },
  formControl2: {
    margin: theme.spacing(0),
    marginTop:"15px",
    width:"100%"
  },
}));

const InitialForm = ({idMain}) => {
  const value = useContext(StudentDataContext);
  const {phone,setPhone}=value;
  const classes = useStyles();
  const [bool, setbool] = useState(0);
  //const [phone,setPhone] = useState(0);
  const [exAdvDetails, setDetails] = useState(0);
  const display = () => {
    setDetails(0);
    if (bool === 0) {
      setbool(1);
    } else {
      setbool(0);
    }
  };
  // console.log(bool);

  const displayExternalAdvisorDetails = () => {
    if (exAdvDetails === 0) {
      setDetails(1);
    } else {
      setDetails(0);
    }
  };

  
 //handle change for Phone number 
  const handleOnChange = (e)=>{
    console.log("changed")
    console.log(e)
    const name = "externalAdvisorContactNo";
    // console.log(e.target.value);
    const value= e;
    setval((ev)=>{
        return {...ev,[name]:value}
        
    })
}

//   function handleOnChange(value) {
//     this.setState({
//        phone: value
//     });
//  }
  //***Context */
 // const value = useContext(StudentDataContext);
  const {handleChange, val, setlist, setval} = value;
 
  // console.log(value.val);
 
  useEffect(() => {
    const name = "s_leader";
    const value = idMain;
    setval((ev) => {
      return {...ev, [name]: value};
    });
  }, [idMain]);
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Project plan and Advisor details
      </Typography>

      {/* INPUT DETAILS OF ADVISOR AND PROJECT PLAN */}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="batch"
            name="s_batch"
            label="Batch"
            value={val.s_batch}
            fullWidth
            onChange={value.handleChange}
            autoComplete="given-name"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="date"
            name="date"
            label="Date"
            fullWidth
            readOnly
            onChange={handleChange}
            value={`${new Date().getDate()}/${
              new Date().getMonth() + 1
            }/${new Date().getFullYear()}`}
            autoComplete="family-name"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="title"
            name="s_proj_title"
            label="Project Title"
            fullWidth
            value={val.s_proj_title}
            onChange={handleChange}
            autoComplete="shipping address-line1"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="internalAdvisorName"
            name="s_internal"
            label="Name(Internal Advisor)"
            fullWidth
            value={val.s_internal}
            onChange={handleChange}
            autoComplete="given-name"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="internalAdvisorDesignation"
            name="internal_designation"
            value={val.internal_designation}
            label="Designation(Internal Advisor)"
            fullWidth
            onChange={handleChange}
            autoComplete="family-name"
          />
        </Grid>

        <div className={classes.root}>
          <FormControl component="fieldset" className={classes.formControl}>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox onClick={display} name="gilad" />}
                label="Do you have external advisor?"
              />
            </FormGroup>
          </FormControl>
        </div>

        {/* DETAILS OF EXTERNAL ADVISOR */}
        {bool ? (
          <>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="externalAdvisorName"
                  name="s_external"
                  value={val.s_external}
                  label="Name(External Advisor)"
                  fullWidth
                  onChange={handleChange}
                  autoComplete="given-name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="externalAdvisorDesignation"
                  name="external_designation"
                  label="Designation(External Advisor)"
                  fullWidth
                  value={val.external_designation}
                  onChange={handleChange}
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="externalAdvisorAddress"
                  name="externalAdvisorAddress"
                  label="Address"
                  value={val.externalAdvisorAddress}
                  fullWidth
                  onChange={handleChange}
                  autoComplete="given-name"
                />
              </Grid>
              <Grid item xs={12} sm={6} className={classes.formControl2} >
                {/* <TextField
                  required
                  id="externalAdvisorContactNo"
                  name="externalAdvisorContactNo"
                  label="Contact Number"
                  fullWidth
                  value={val.externalAdvisorContactNo}
                  onChange={handleChange}
                  autoComplete="family-name"
                /> */}
                <MuiPhoneNumber 
                defaultCountry={'pk'} 
                countryCodeEditable={false}
                onlyCountries={["pk"]} 
                onChange={handleOnChange}/>
               
              </Grid>
            </Grid>

            {/* CHECKBOX FOR TAKING ORGANIZATIONAL DETAILS */}
            <div className={classes.root}>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        onClick={displayExternalAdvisorDetails}
                        name="gilad"
                      />
                    }
                    label="Do you have any Sponsoring Organization?"
                  />
                </FormGroup>
              </FormControl>
            </div>
            {exAdvDetails ? (
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="orgName"
                    name="s_organization"
                    label="Organization's Name"
                    fullWidth
                    value={val.s_organization}
                    onChange={handleChange}
                    autoComplete="given-name"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="orgDomain"
                    name="orgDomain"
                    label="Domain"
                    fullWidth
                    value={val.orgDomain}
                    onChange={handleChange}
                    autoComplete="family-name"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="orgAddress"
                    name="orgAddress"
                    value={val.orgAddress}
                    label="Address"
                    fullWidth
                    onChange={handleChange}
                    autoComplete="given-name"
                  />
                </Grid>
                <Grid item xs={12} sm={6}  className={classes.formControl2}>
                <MuiPhoneNumber 
                defaultCountry={'pk'} 
                countryCodeEditable={false}
                onlyCountries={["pk"]} 
                onChange={handleOnChange}/>
                  {/* <TextField
                    required
                    id="orgContactNo"
                    name="orgContactNo"
                    label="Contact Number"
                    value={val.orgContactNo}
                    fullWidth
                    onChange={handleChange}
                    autoComplete="family-name"
                  /> */}
                </Grid>
              </Grid>
            ) : (
              ""
            )}
          </>
        ) : (
          ""
        )}
      </Grid>
    </React.Fragment>
  );
};
function mapStateToProps({DataRed}) {
  return {idMain: DataRed.id};
}
// InitialForm.PropTypes = {
//   idMain: PropTypes.any,
// };
export default connect(mapStateToProps)(InitialForm);
