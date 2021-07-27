import React from 'react';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';
import { blueGrey } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';

const footer = blueGrey[50];

const useStyles = makeStyles({
  table: {
    minWidth: 700,
    
  },
});

export default function SubmittedFormDetails() {
  const classes = useStyles();

  return (
        <>
  
        <TableBody>
          <TableRow bgcolor={`${footer}`}>
            <TableCell rowSpan={4} />
            <TableCell colSpan={2}>Project Title: </TableCell>
            <TableCell align="right" colSpan={2}>Fyp Management System</TableCell>
          </TableRow>
          <TableRow bgcolor={`${footer}`}>
            <TableCell colSpan={2}>Project Description</TableCell>
            <TableCell align="right" colSpan={2}>
              Our project is designed to manage different
              activites conducted during fyp evaluations
              throughout the year. People engaged during
              the process like: Students, Internal Advisor,
              Chairman, Departmental committee; can manage
               their activities easily. 
            
            </TableCell>
          </TableRow>
          <TableRow bgcolor={`${footer}`}>
            <TableCell colSpan={2}>Internal Advisor</TableCell>
            <TableCell align="right" colSpan={2}>Dr. Shariq Mehmood</TableCell>
          </TableRow>
          <TableRow bgcolor={`${footer}`}>
            <TableCell colSpan={2}>External Advisor</TableCell>
            <TableCell align="right" colSpan={2}>Mehdi Rajani</TableCell>
          </TableRow>
        </TableBody>

        </>
  );
}