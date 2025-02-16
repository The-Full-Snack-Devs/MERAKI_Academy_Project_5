import React, {useState, useEffect,useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { apiClient } from '../../Service/api/api';
import { setProfile , setOrders } from '../../Service/redux/reducers/Profile';
import { Container,Link,Dialog,DialogTitle,
  DialogContent, IconButton,
  DialogActions, Card, CardContent, Avatar, Typography, Box ,Button } from "@mui/material";
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

  const profile = useSelector((state) => state.profileReduser.profile);
  const orders = useSelector((state) => state.profileReduser.orders);
  const token = useSelector((state) => state.authReducer.token);
  const dispatch = useDispatch();
  const getProfileById = async () => {
    try {
      const result = await apiClient.profile.GetProfile(token);
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
  useEffect(() => {
    getProfileById();
    getOrdersById();
  }, []);
  useEffect(() => {
    getCartById();
  }, [id]);
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
    </Container>
  );
};
export default Profile;