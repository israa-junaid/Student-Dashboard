import React from 'react';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { teal } from '@material-ui/core/colors';
import { grey } from '@material-ui/core/colors';

const mainHeader = teal[200];
const subHeader = grey[300];

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function Header() {
  const classes = useStyles();

  return (
        <TableHead>
          <TableRow bgcolor={`${mainHeader}`}>
            <TableCell align="center" colSpan={4}>
              Details
            </TableCell>
            <TableCell align="right">Response Details</TableCell>
          </TableRow>
          <TableRow bgcolor={`${subHeader}`}>
            <TableCell>Name</TableCell>
            <TableCell align="right" colSpan={2}>Seat No.</TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell align="right">Status</TableCell>
          </TableRow>
        </TableHead>
  );
}