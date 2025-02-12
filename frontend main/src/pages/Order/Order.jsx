import React from 'react'
import { apiClient } from '../../Service/api/api';
import {useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {  Button, TextField } from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


function Order() {

    const [orders, setorders] = useState([])
    const token = useSelector((reduser)=>reduser.authReducer.token)

    const getAllOrders = async () => {
            
        try {
          const result = await apiClient.orders.getAllOrders(token)
          setorders(result.data.result);
          console.log(result.data.result);
          
          
        } catch (error) {
        console.log(error);
        
        }
      };

      useEffect(() => {
        getAllOrders();
      }, []);

    return (

      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700, mt: "70px"}} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>id</StyledTableCell>
            <StyledTableCell align="right">Created at</StyledTableCell>
            <StyledTableCell align="right">Name</StyledTableCell>
            <StyledTableCell align="right">Email</StyledTableCell>
            <StyledTableCell align="right">Phone</StyledTableCell>
            <StyledTableCell align="right">Location(lat)</StyledTableCell>
            <StyledTableCell align="right">Location(lng)</StyledTableCell>
            <StyledTableCell align="right">date+time</StyledTableCell>
            <StyledTableCell align="right">Cart</StyledTableCell>
            <StyledTableCell align="right">Status</StyledTableCell>
            <StyledTableCell align="right">Team</StyledTableCell>
            <StyledTableCell align="right">Confirmation</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders?.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.ido}
              </StyledTableCell>
              <StyledTableCell align="right"><TextField  disabled={true} type="datetime-local" defaultValue={row.created_at.substring(0, 16)} /></StyledTableCell>
              <StyledTableCell align="right">{row.firstname} {row.lastname}</StyledTableCell>
              <StyledTableCell align="right">{row.email}</StyledTableCell>
              <StyledTableCell align="right">{row.phone}</StyledTableCell>
              <StyledTableCell align="right">{row.location.lat}</StyledTableCell>
              <StyledTableCell align="right">{row.location.lng}</StyledTableCell>
              <StyledTableCell align="right"><TextField  disabled={true} type="datetime-local" defaultValue={row.date_time} /></StyledTableCell>
              <StyledTableCell align="right">{row.cart_id}</StyledTableCell>
              <StyledTableCell align="right">{row.status}</StyledTableCell>
              <StyledTableCell align="right">{row.team_id || "Assign Team"}</StyledTableCell>
              <StyledTableCell align="right"> <Button  variant="outlined" color="primary" onClick={() => navigate("/login")}> Confirm </Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default Order