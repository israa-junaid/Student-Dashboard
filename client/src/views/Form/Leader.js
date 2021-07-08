import React,{useContext, useState} from 'react'
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import Checkbox from "@material-ui/core/Checkbox";
import { TextField  } from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";
import { Typography } from '@material-ui/core';
import {StudentDataContext} from "../../Context/StudentContext";

import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Box from '@material-ui/core/Box';
const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const Leader = () => {
  const value = useContext(StudentDataContext);
  const {bool,setbool,val,setval}=value;
  // const [val, setval] = React.useState('');
  const [open, setOpen] = React.useState(false);
    const classes=useStyles();
      const display = () => {

        if (bool === 0) {
          setbool(1);
        } else {
          setbool(0);
        }
      };
      const name = "group_count";
    const handleChange = (e)=>{
        //const name = "group_count";
        const value= e.target.value;
        setval((ev)=>{
            return {...ev,[name]:value}
            
        })
    }
   
    // const handleChange = (event) => {
    //   setval((event.target.value) );
      
    // };
    console.log(value);
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    return (
      <div>
       <Box textAlign='center'>
      <Button onClick={handleClickOpen} align="center">Select your status as Group Member</Button> </Box>
      <Dialog  open={open} onClose={handleClose} >
        <DialogTitle>Fill the form</DialogTitle>
       
        <DialogContent>
        <DialogContentText id="alert-dialog-description">
            <Checkbox
              
              control={<Checkbox onClick={display} name="gilad" />}
            >
            </Checkbox>  
             Are you the group leader ?
           
          </DialogContentText>
          
          <form className={classes.container}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="demo-dialog-native">Total members</InputLabel>
              <Select
                native
                value={val.group_count}
                onChange={handleChange}
                input={<Input id="demo-dialog-native" />}
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
              </Select>
            </FormControl>
        
          </form>
        </DialogContent>
        <DialogActions>
          
          <Button onClick={handleClose} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Leader;
