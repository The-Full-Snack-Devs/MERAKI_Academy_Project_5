import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { apiClient } from "../../Service/api/api";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Paper, Typography, Button, Box, IconButton
} from "@mui/material";


const Cart = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const token = useSelector((state) => state.authReducer.token);
  const [totalPrice, setTotalPrice] = useState(0);

  const getCartById = async () => {
    try {
      const result = await apiClient.cart.getCartById(token);
      setCart(result.data.cart);
    } catch (error) {
      console.log(error);
    }
  };

  const removeFromCart = async (id) => {
    try {
      const result = await apiClient.cart.removeFromCart(id, token);
      alert("Item Removed Successfully!!");
      navigate(0)
      }
      catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    getCartById();
  }, []);

  useEffect(() => {
    const total = cart.reduce((start, e) => {      
      return start + Number(e.price)
    }, 0);
    setTotalPrice(total);
    console.log(cart);
    
        
  }, [cart]);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" fontWeight="bold" textAlign="center" mb={3}>
        Your Cart
      </Typography>

      <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
        <Table>
          
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f04f23" }}>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Image</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Name</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Service</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Price</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Delete</TableCell>
            </TableRow>
          </TableHead>

          
          <TableBody>
            {cart?.map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                  <img src={item.imagep} alt={item.namep} style={{ width: 80, height: 50, borderRadius: 5 }} />
                </TableCell>
                <TableCell>
                  <Typography fontWeight="bold">{item.namep}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="text.secondary">{item.name}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6" color="primary">${item.price}</Typography>
                </TableCell>
                <TableCell>
                <IconButton color="primary" aria-label="delete" onClick={()=>{removeFromCart(item.idpc)}}>                 <HighlightOffIcon />
                </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      
      {cart.length > 0 && (
        <Box sx={{ mt: 4, textAlign: "center" }}>
          <Typography variant="h5" fontWeight="bold">
            Total Price: ${totalPrice}
          </Typography>
          <Button
            variant="contained"
            sx={{
              mt: 3,
              backgroundColor: "#f04f23",
              "&:hover": { backgroundColor: "#d9441d" },
              fontSize: "16px",
              px: 4,
              py: 1.5,
              borderRadius: 2,
            }}
            onClick={() => navigate("/TL")}
          >
            Place Order
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Cart;
