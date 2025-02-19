
import React, {useState, useEffect,useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { apiClient } from '../../Service/api/api';
import { setProfile , setOrders } from '../../Service/redux/reducers/Profile';
import { Container,Link,Dialog,DialogTitle,
  DialogContent, IconButton,InputLabel,Select,
  DialogActions, Card, CardContent, Avatar, Typography, Box ,Button,CardMedia } from "@mui/material";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {  TextField } from "@mui/material";
import { ThemeContext } from "../../components/MUI/MUITheme";
import CloseIcon from "@mui/icons-material/Close";

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
const Profile = () => {
  const { darkMode } = useContext(ThemeContext);
  const [cart, setCart] = useState([])
  const [id, setid] = useState(null)
  const [CartToggle, setCartToggle] = useState(false)
  const [totalPrice, setTotalPrice] = useState(0);
  const role = useSelector((reducers) => reducers.authReducer.Role);
  const [teamId, setTeamId] = useState(null)
const [done, setDone] = useState(false)

  const profile = useSelector((state) => state.profileReduser.profile);
  const orders = useSelector((state) => state.profileReduser.orders);
  const token = useSelector((state) => state.authReducer.token);
  const dispatch = useDispatch();
  const getProfileById = async () => {
    try {
      const result = await apiClient.profile.GetProfile(token);
      console.log("aloooooooo:",result.data);
      
      dispatch(setProfile(result.data.User));
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };
  const getOrdersById = async () => {
    try {
      const result = await apiClient.profile.getOrderById(token);
      dispatch(setOrders(result.data.result));
      console.log("orders",result);
    } catch (error) {
      console.error("Error fetching profile:", error);
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
  const getProfileteam = async () => {
    try {
      const result = await apiClient.profile.getProfileTeam(token);
      console.log("teaaaam:",result.data);
      setTeamId(result.data.User.teams)

      dispatch(setProfile(result.data.User));
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };
  const getOrdersTeam = async (id) => {

    try {
      const result = await apiClient.profile.getOrderByTeam(id,token);
      dispatch(setOrders(result.data.result));

      console.log("orders",result.data.result);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };


  useEffect(() => {
    getOrdersTeam(teamId)
  }, [teamId,done]);

  useEffect(() => {
    if(role==="emp"){
      getProfileteam()

    }else{
      getProfileById();
      getOrdersById();
    }
   
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
  const confirmOrderEmp= async (id)=>{
    console.log("hon :",id);
    
    const body = {status: "Done"}
      try {
      const result = await apiClient.orders.confirmOrderEmp(id,body,token)
      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container sx={{ marginTop: 10, paddingBottom: 5 }}>
      <Card
        sx={{
          maxWidth: 500,
          margin: 'auto',
          padding: 3,
          textAlign: 'center',
          boxShadow: 8,
          borderRadius: 4,
        }}
      >
        <CardContent>
          <Avatar
            src={profile.image}
            alt={`${profile.firstname} ${profile.lastname}`}
            sx={{
              width: 200,
              height: 200,
              margin: 'auto',
              marginBottom: 2,
              border: '4px solid',
              borderColor: 'primary.main',
            }}
          />
          <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
            {profile.firstname} {profile.lastname}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ marginBottom: 2 }}>
            {profile.email}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 3 }}>
            Phone: {profile.phone}
          </Typography>
        </CardContent>
      </Card>
      {role==="emp"&& <>
        <Typography variant="h3" color="dark">
                  YOUR ORDERS :
                  </Typography>
      <TableContainer component={Paper} sx={{ marginTop: 7, boxShadow: 8, borderRadius: 4 }}>
      <Table sx={{ minWidth: 700, mt: "70px"}} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>id</StyledTableCell>
            <StyledTableCell align="right">Name</StyledTableCell>
            <StyledTableCell align="right">Email</StyledTableCell>
            <StyledTableCell align="right">Phone</StyledTableCell>
            <StyledTableCell align="right">Location</StyledTableCell>
            <StyledTableCell align="right">date+time</StyledTableCell>
            <StyledTableCell align="right">Cart</StyledTableCell>
            <StyledTableCell align="right">Status</StyledTableCell>
            <StyledTableCell align="right">Confirmation</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders?.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.ido}
              </StyledTableCell>
              <StyledTableCell align="right">{row.firstname} {row.lastname}</StyledTableCell>
              <StyledTableCell align="right">{row.email}</StyledTableCell>
              <StyledTableCell align="right">{row.phone}</StyledTableCell>
              <StyledTableCell align="right"><Link href= {`https://maps.google.com/?q=${row.location.lat},${row.location.lng}`} underline="hover"> {'Open Location'}</Link></StyledTableCell>
              <StyledTableCell align="right"><TextField  disabled={true} type="datetime-local" defaultValue={row.date_time} /></StyledTableCell>
              <StyledTableCell align="right" onClick={()=>{
                setid(row.cart_id)
                setCartToggle(true)
              }}>{row.cart_id}</StyledTableCell>
              <StyledTableCell align="right">{row.status}</StyledTableCell>
         
              <StyledTableCell align="right"> <Button  variant="outlined" color="primary" onClick={() => {
                confirmOrderEmp(row.ido)
                setDone(!done)
              }}> Done </Button>
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
        color: darkMode ? "#ffffff" : "#000000" 
      }}
    >
      Cart Detailes..
      <IconButton onClick={() => setCartToggle(false)} sx={{ color: darkMode ? "#ffffff" : "#000000" }}>
        <CloseIcon />
      </IconButton>
    </DialogTitle>

    {/* body */}

    <div>
        {cart?.map((ele,ind)=>{
            return <div>
                 <img src={ele.image} />
          <p>{ele.name}</p>
          <p>{ele.description}</p>
          <p>{ele.price}</p>
            </div>
        })}
        {/* <p>total price: {tPrice}</p> */}
        <button onClick={()=>{setCartToggle(true)}}>Place order..</button>
    </div>

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

    </>}
    {role!=="emp"&&<>
      <Typography variant="h3" color="dark">
                  YOUR ORDERS :
                  </Typography>
      <TableContainer component={Paper} sx={{ marginTop: 7, boxShadow: 8, borderRadius: 4 }}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>services</StyledTableCell>
              <StyledTableCell align="right">date+time</StyledTableCell>
              <StyledTableCell align="right">location</StyledTableCell>
              <StyledTableCell align="right">Status</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders?.length > 0 ? (
              orders.map((row) => (
                <StyledTableRow key={row.ido}>
                  <StyledTableCell component="th" scope="row" onClick={()=>{
                setid(row.cart_id)
                setCartToggle(true)
              }}>
                   <Button>show</Button> 
                  </StyledTableCell>
                  <StyledTableCell align="right"><TextField  disabled={true} type="datetime-local" defaultValue={row.date_time} /></StyledTableCell>
                  <StyledTableCell align="right"><Link href= {`https://maps.google.com/?q=${row.location.lat},${row.location.lng}`} underline="hover"> {'Open Location'}</Link></StyledTableCell>


                  
                  <StyledTableCell align="right">{row.status}</StyledTableCell>
                </StyledTableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                  <Typography variant="body1" color="text.secondary">
                   NOT ORDER YET !
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      </>}
      {CartToggle && ( 
  <Dialog 
    fullWidth 
    maxWidth="sm"
    open={CartToggle} // Ensure it's controlled by state
    onClose={() => setCartToggle(false)} // Close on outside click
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
{/* cart on show  */}
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, alignItems: "center" }}>
      {cart?.map((ele, ind) => (
        <Card key={ind} sx={{ maxWidth: 400, width: "100%", boxShadow: 3, borderRadius: 2 ,display: "flex"}}>
          <CardMedia component="img" height="100" image={ele.image} sx={{height:"100%"}} />
        
          <CardContent>
            <Typography variant="h6" component="div">
              {ele.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {ele.description}
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
    </Container>
  );
};
export default Profile;
