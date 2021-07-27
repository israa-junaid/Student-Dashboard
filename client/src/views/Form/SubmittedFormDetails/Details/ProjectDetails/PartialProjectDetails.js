import React from 'react';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';
import { blueGrey } from '@material-ui/core/colors';

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