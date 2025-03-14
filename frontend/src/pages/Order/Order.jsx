import React from 'react'
import { apiClient } from '../../Service/api/api';
import {useState, useEffect,useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from "react-router-dom";
import {   Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Card,
  CardMedia,
  CardContent ,
  IconButton,
  Link,
  InputLabel,
  Select,
  MenuItem,
  Typography,Button, TextField } from "@mui/material";
  import CloseIcon from "@mui/icons-material/Close";
  import { ThemeContext } from "../../components/MUI/MUITheme";

  

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
    const [CartToggle, setCartToggle] = useState(false)
    const { darkMode } = useContext(ThemeContext);
    const [cart, setCart] = useState([])
    const [tPrice, settPrice] = useState(0)
    const [id, setid] = useState(null)
    const [team, setteam] = useState("")
    const [totalPrice, setTotalPrice] = useState(0);
    const navigate = useNavigate();
  

    const getAllOrders = async () => {
            
        try {
          const result = await apiClient.orders.getAllOrders(token)
          setorders(result.data.result);
          console.log(result.data.result);      
        } catch (error) {
        console.log(error);
        }
      };

      const getCartById= async ()=>{
        try {
          const result = await apiClient.cart.getCartById2(id, token)
          setCart(result.data.cart)
          console.log(result.data.cart);
        } catch (error) {
          console.log(error);
        }
      }

      const confirmOrder= async (id)=>{
        const body = {status: "Confirmed", team: team[id]}
          try {
          const result = await apiClient.orders.confirmOrder(id,body,token)
          navigate(0)    
        } catch (error) {
          console.log(error);
        }
      }
        
      useEffect(() => {
        getAllOrders();
      }, []);

      useEffect(() => {
        getCartById();
      }, [id]);

      useEffect(() => {
        const total = cart.reduce((start, e) => {      
          return start + Number(e.price)
        }, 0);
        setTotalPrice(total);
            
      }, [cart]);

    return (
      <>
      <TableContainer sx={{ minHeight:"100vh"}} component={Paper} >
      <Table sx={{ minWidth: 700, mt: "70px"}} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>id</StyledTableCell>
            <StyledTableCell align="right">Created at</StyledTableCell>
            <StyledTableCell align="right">Name</StyledTableCell>
            <StyledTableCell align="right">Email</StyledTableCell>
            <StyledTableCell align="right">Phone</StyledTableCell>
            <StyledTableCell align="right">Location</StyledTableCell>
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
              <StyledTableCell align="right"><TextField  disabled={true} type="datetime-local" defaultValue={row.created_at.substring(0, 16)} sx={{width:"213px"}} /></StyledTableCell>
              <StyledTableCell align="right">{row.firstname} {row.lastname}</StyledTableCell>
              <StyledTableCell align="right" >{row.email}</StyledTableCell >
              <StyledTableCell align="right">{row.phone}</StyledTableCell>
              <StyledTableCell align="right"><Link href= {`https://maps.google.com/?q=${row.location.lat},${row.location.lng}`} underline="hover"> {'Open Location'}</Link></StyledTableCell>
              <StyledTableCell align="right"><TextField  disabled={true} type="datetime-local" defaultValue={row.date_time} /></StyledTableCell>
              <StyledTableCell align="right" onClick={()=>{
                setid(row.cart_id)
                setCartToggle(true)
              }}>{row.cart_id}</StyledTableCell>
              <StyledTableCell align="right">{row.status}</StyledTableCell>
              <StyledTableCell align="right"><InputLabel id="demo-simple-select-label">{row.status == "Confirmed" ? (`Team ${row.team}`): ("Choose a Team")}</InputLabel>
  <Select
    value={team[row.ido]}
    label="team"
    onChange={(e)=>{setteam({ ...team, [row.ido]: e.target.value })
  console.log(team);
  }}
  >
    <MenuItem value={1}>Team 1</MenuItem>
    <MenuItem value={2}>Team 2</MenuItem>
    <MenuItem value={3}>Team 3</MenuItem>
  </Select></StyledTableCell>
              <StyledTableCell align="right">{row.status == "Done" ? (<Button  disabled variant="outlined" color="primary" onClick={() => {
                confirmOrder(row.ido)
              }}> Done </Button>) : (<Button  variant="outlined" color="primary" onClick={() => {
                confirmOrder(row.ido)
              }}> Confirm </Button>)}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    
    {CartToggle && ( 
  <Dialog 
    fullWidth 
    maxWidth="sm"
    open={CartToggle} 
    onClose={() => setCartToggle(false)} 
  >
    {/* Modal Header */}
    <DialogTitle 
     sx={{ 
      display: "flex", 
      justifyContent: "space-between", 
      alignItems: "center", 
      backgroundColor: darkMode ? "#414141" : "#ffffff", 
      color: darkMode ? "#ffffff" : "#000000" ,
     marginBottom:2
    }}
    >
      Cart Detailes..
      <IconButton onClick={() => setCartToggle(false)} sx={{ color: darkMode ? "#ffffff" : "#000000" }}>
        <CloseIcon />
      </IconButton>
    </DialogTitle>

    {/* body */}

    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, alignItems: "center" }}>
      {cart?.map((ele, ind) => (
        <Card key={ind} sx={{ maxWidth: 400, width: "100%", boxShadow: 3, borderRadius: 2 ,display: "flex", alignItems: "center"}}>
          <CardMedia component="img" height="100" image={ele.imagep} sx={{height: "100%", width:"40%", objectFit: "cover"}} />
        
          <CardContent >
            <Typography variant="h6" component="div">
              {ele.namep}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {ele.name}
            </Typography>
            <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
              ${ele.price}
            </Typography>
          </CardContent>
          
        </Card>
      ))}
    </Box>
    {/* لحساب التوتل  */}
    {cart.length > 0 && (
        <Box sx={{ mt: 4, textAlign: "center" }}>
          <Typography variant="h5" fontWeight="bold">
            Total Price: ${totalPrice}
          </Typography>
         
        </Box>
      )}


    {/* Modal Footer */}
    <DialogActions sx={{ backgroundColor: darkMode ? "#414141" : "#ffffff" }}>
      <Button
        variant="contained"
        sx={{
          backgroundColor: "#f04f23",
          color: "#ffffff",
          "&:hover": { backgroundColor: "#d9441d" },
        }}
        onClick={() => setCartToggle(false)}
      >
        Close
      </Button>
    </DialogActions>
  </Dialog>
)}

    </>
  )
}

export default Order