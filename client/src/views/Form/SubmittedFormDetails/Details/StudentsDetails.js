import React ,{useState} from 'react';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';
import {red} from "@material-ui/core/colors";

const body = grey[100];
const leaderStatus = red[100];

const useStyles = makeStyles({
  table: {
    minWidth: 700,
    
  },
});

function createRow(name, seatno, email, status1) {
  return { name, seatno, email, status1 };
}

const rows = [
  createRow('Muhammad Ahmed', 'CT-18008', 'ahmed@gmail.com','Pending'),
  createRow('Israa Junaid', 'CT-18013', 'israa@gmail.com','Leader'),
  createRow('Sundus Zehra', 'CT-18018', 'sundus@gmail.com','Pending'),
];

export default function SubmittedFormDetails() {
  const classes = useStyles();
  const [ statusColor , setStatusColor ] = useState(0);

  return (
        <TableBody>
              {rows.map((row) => (
                <>
                  {
                    row.status1 === "Leader" ? (
                      <>
                      <TableRow bgcolor={`${leaderStatus}`} key={row.name}>
                      <TableCell>{row.name}</TableCell>
                      <TableCell align="right" colSpan={2}>{row.seatno}</TableCell>
                      <TableCell align="center">{row.email}</TableCell>
                      <TableCell align="right">{row.status1}</TableCell>
                      </TableRow>
                      </>
                    ) : (
                      <>
                      <TableRow bgcolor={`${body}`} key={row.name}>
                      <TableCell>{row.name}</TableCell>
                      <TableCell align="right" colSpan={2}>{row.seatno}</TableCell>
                      <TableCell align="center">{row.email}</TableCell>
                      <TableCell align="right">{row.status1}</TableCell>
                      </TableRow>
                      </>
                    )
                  }
                  </>
              ))}
          
        </TableBody>
  );
}