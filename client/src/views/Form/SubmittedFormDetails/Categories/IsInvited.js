import React from 'react';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { teal } from '@material-ui/core/colors';
import { grey } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
const mainHeader = teal[200];
const subHeader = grey[300];

import Header from "./Header"
import StudentDetails from "../Details/StudentsDetails";
import PartialProjectDetails from "../Details/ProjectDetails/PartialProjectDetails";

const useStyles = makeStyles({
  table: {
    minWidth: 700,

     
      
  },
});

export default function Main() {
  const classes = useStyles();

  return (
    <Grid item xs={12}>
     
      <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="spanning table">
        
        <Header />
        <StudentDetails />
        <PartialProjectDetails /> 

      </Table>
    </TableContainer>

  </Grid>
  );
}