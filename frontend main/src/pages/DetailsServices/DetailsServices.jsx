import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setDetailsServices } from "../../Service/redux/reducers/DetailsServices";
import { useParams } from "react-router-dom";
import { apiClient } from "../../Service/api/api";
import { setCartId } from "../../Service/redux/reducers/auth";
import {
  Container,
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  Box,
  IconButton
} from "@mui/material";

const DetailsServices = () => {
  const { id } = useParams();
  const detailsServices = useSelector(
    (state) => state.DetailsServicesReduser.detailsServices
  );
  const dispatch = useDispatch();
  const cart_id = useSelector((state) => state.authReducer.Cart_id);
  const token = useSelector((state) => state.authReducer.token);
  const isLoggedIn = useSelector((reducers) => reducers.authReducer.isLoggedIn);

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const getServicesDetails = async () => {
    try {
      const result = await apiClient.part.getPartByServiceId(id, token);
      dispatch(setDetailsServices(result.data.result));
    } catch (error) {
      console.log(error);
    }
  };

  const profile = async () => {
    try {
      const result = await apiClient.profile.GetProfile(token);
      dispatch(setCartId(result.data.User.idc));
    } catch (error) {
      console.log(error);
    }
  };

  const addPartToCart = (id) => {
    axios
      .post(`http://localhost:5000/services/addCart/${id}`, { cart_id }, { headers })
      .then((result) => {
        console.log(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getServicesDetails();
    if(isLoggedIn){
      profile();
    }
  }, []);

  return (
    <Container sx={{ mt: 15 }}>
      
      
      {detailsServices.length > 0 && ( 
      <Card sx={{ display: "flex", width: "100%", boxShadow: 3, borderRadius: 2, height: 300, mb: 2 }}>
  
      <CardMedia
        component="img"
        sx={{ width: "50%", objectFit: "cover" }}
        image={detailsServices[0]?.image}
        alt={detailsServices[0]?.name}
      />
    
      
      <Box sx={{ display: "flex", flexDirection: "column", width: "50%", p: 4 }}>
        <CardContent>
          <Typography variant="h5" component="div" fontWeight="bold" mb={1} align="center">
          {detailsServices[0]?.name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" align="center">
          {detailsServices[0]?.description}
          </Typography>
        </CardContent>
      </Box>
    </Card>
    
      )}

      {/* Parts Section */}
      <Typography variant="h4" fontWeight="bold" sx={{ mb: 3 }}>
        Available Parts
      </Typography>

      <Grid container spacing={3}>
        {detailsServices.map((part, index) => (
          <Grid item xs={12} sm={6} md={4} key={index} mb={5}>
            <Card sx={{ boxShadow: 5, transition: "0.3s", "&:hover": { transform: "scale(1.05)" } }}>
              <CardMedia component="img" height="200" image={part.image} alt={part.name} />
              <CardContent>
                <Typography variant="h6">{part.namep}</Typography>
                <Typography variant="body1" color="text.secondary">
                  ${part.price}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 2 }}
                  onClick={() => addPartToCart(part.idp)}
                >
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default DetailsServices;
