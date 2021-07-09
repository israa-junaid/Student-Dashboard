import React, {useState, useContext} from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
// import Table from "./Table";
import {makeStyles} from "@material-ui/core/styles";
//import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import axios from "axios";
//import FormHelperText from "@material-ui/core/FormHelperText";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import {StudentDataContext} from "../../Context/StudentContext.js";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  formControl: {
    margin: theme.spacing(3),
  },
  formControl2: {
    margin: theme.spacing(0),
    minWidth: 220,
  },
  // selectEmpty: {
  //   marginTop: theme.spacing(2),
  // },
}));

export default function GroupDetails() {
  const classes = useStyles();
  const value = useContext(StudentDataContext);
  const {
    mem1,
    setmem1,
    mem2,
    setmem2,
    mem3,
    setmem3,
    val,
    setval,
    handleChange,
    handleGroup,
    list,
  } = value;
  const {group_count}=val;
  const [bool, setbool] = useState(0);
  // console.log(val);
  const display = () => {
    if (bool === 0) {
      // console.log("group count is 3");
      const name = "group_count";
      const value = 3;
      setval((ev) => {
        return {...ev, [name]: value};
      });
      setbool(1);
    } else {
      // console.log("group count is 2");
      const name = "group_count";
      const value = 2;
      setval((ev) => {
        return {...ev, [name]: value};
      });
      setbool(0);
    }
  };
  // console.log(bool);

  const [std1, setStd1] = useState({
    name1: "",
    rollno1: "",
    contactno1: "",
    email1: "",
  });
  const [std2, setStd2] = useState({
    name2: "",
    rollno2: "",
    contactno2: "",
    email2: "",
  });
  const [std3, setStd3] = useState({
    name3: "",
    rollno3: "",
    contactno3: "",
    email3: "",
  });

  // ******************************** HANDLE CHANGE FOR SELECT BOX AND TO UPDATE VALUES
  const handleSelectChangeOf = async (e, value) => {
    // console.log(e, value);
    axios
      .get(`/studentof/${value}`)
      .then((res) => {
        if (e == 1) {
          setmem1({
            email: res.data.email,
            contact: res.data.contact,
          });
          // console.log(mem1);
          const name = "stu1_id";
          const value = res.data.id;

          setval((ev) => {
            return {...ev, [name]: value};
          });
        }
        if (e == 2) {
          setmem2({
            email: res.data.email,
            contact: res.data.contact,
          });

          const name = "stu2_id";

          const value = res.data.id;
          setval((ev) => {
            return {...ev, [name]: value};
          });
        }
        if (e == 3) {
          setmem3({
            email: res.data.email,
            contact: res.data.contact,
          });

          const name = "stu3_id";

          const value = res.data.id;

          setval((ev) => {
            // console.log(ev);
            return {...ev, [name]: value};
          });
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Leader Details
      </Typography>
      <Grid container spacing={3}>
        
        <Grid item xs={10} sm={5}>
          <TextField
            required
            id="rollno1"
            name="stu1_id"
            value={val.stu1_id}
            // onChange={handleGroup}
            label="Roll No."
            fullWidth
            readOnly
            autoComplete="given-name"
          />
        </Grid>
        <Grid item xs={10} sm={5}>
          <TextField
            required
            id="contactno1"
            name="name"
            value={mem1.name}
            readonly
            label="Name"
            fullWidth
            autoComplete="given-name"
          />
          
        </Grid>
        <Grid item xs={10} sm={5}>
          <TextField
            required
            id="contactno1"
            name="contactno1"
            value={mem1.contact}
            readonly
            label="Contact Number"
            fullWidth
            autoComplete="given-name"
          />
        </Grid>
        <Grid item xs={10} sm={5}>
          <TextField
            required
            id="email1"
            name="email1"
            label="email"
            value={mem1.email}
            readonly
            fullWidth
            autoComplete="given-name"
          />
        </Grid>
      </Grid>
      <br></br>
{group_count == 2 || group_count == 3 ?     
<>
<Typography variant="h6" gutterBottom>
        Second Member Details
      </Typography>
      <Grid container spacing={3}>
       
        <Grid item xs={10} sm={5}>
          <FormControl className={classes.formControl2}>
            <InputLabel id="demo-simple-select-label">Select Roll No</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name= "stu2_id"
              value={val.stu2_id}
              onChange={handleGroup}
            >
              
              {list.map((v, ind) => {
                return (
                  <MenuItem value={v.id} key={ind}>
                    {v.id}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          {/* <TextField
            required
            id="rollno2"
            name="stu2_id"
            value={val.stu2_id}
            onChange={handleGroup}
            label="Roll No."
            fullWidth
            autoComplete="given-name"
          /> */}
        </Grid>
        <Grid item xs={10} sm={5}>
          <TextField
            required
            id="contactno1"
            name="name"
            value={mem2.name}
            readonly
            label="Name"
            fullWidth
            autoComplete="given-name"
          />
        </Grid>
        <Grid item xs={10} sm={5}>
          <TextField
            required
            id="contactno2"
            name="contactno2"
            label="Contact Number"
            value={mem2.contact}
            readonly
            fullWidth
            autoComplete="given-name"
          />
        </Grid>
        <Grid item xs={10} sm={5}>
          <TextField
            required
            id="email2"
            name="email2"
            label="email"
            value={mem2.email}
            readonly
            fullWidth
            autoComplete="given-name"
          />
        </Grid>
      </Grid>
      </>:""}
      <br></br>
    {group_count == 3 ? <>
          <Typography variant="h6" gutterBottom>
            Third Member Details
          </Typography>
          <Grid container spacing={3}>
            
            <Grid item xs={10} sm={5}>
            <FormControl className={classes.formControl2}>
            <InputLabel id="demo-simple-select-label">Select Roll No</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name= "stu3_id"
              value={val.stu3_id}
              onChange={handleGroup}
            >
              
              {list.map((v, ind) => {
                return (
                  <MenuItem value={v.id} key={ind}>
                    {v.id}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
              {/* <TextField
                required
                id="rollno3"
                name="stu3_id"
                value={val.stu3_id}
                onChange={handleGroup}
                label="Roll No."
                fullWidth
                autoComplete="given-name"
              /> */}
            </Grid>
            <Grid item xs={10} sm={5}>
              <TextField
                required
                id="contactno1"
                name="name"
                value={mem3.name}
                readonly
                label="Name"
                fullWidth
                autoComplete="given-name"
              />
            </Grid>
            <Grid item xs={10} sm={5}>
              <TextField
                required
                id="contactno3"
                name="contactno3"
                label="Contact Number"
                value={mem3.contact}
                readonly
                fullWidth
                autoComplete="given-name"
              />
            </Grid>
            <Grid item xs={10} sm={5}>
              <TextField
                required
                id="email3"
                name="email3"
                label="email"
                value={mem3.email}
                readonly
                fullWidth
                autoComplete="given-name"
              />
            </Grid>
          </Grid>
        </>:""}
    
    </React.Fragment>
  );
}
