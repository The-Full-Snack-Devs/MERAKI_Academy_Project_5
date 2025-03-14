import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Grid,CardMedia, Container, Card, CardContent } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { setServices} from "../../Service/redux/reducers/services";

import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import BuildIcon from "@mui/icons-material/Build";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import { useSelector, useDispatch } from "react-redux";
import { apiClient } from '../../Service/api/api';



const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((reducers) => reducers.authReducer.isLoggedIn);
  const services = useSelector((state) => state.servicesReduser.services);

  const getAllServices = async () => {
    try {
      const result = await apiClient.services.getAllServices();
      dispatch(setServices(result.data.servecies));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllServices();
  }, []);

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
        mt: "60px",
          position: "relative",
          width: "100%",
          height: "100vh",
          backgroundImage: "url('src/assets/A_modern_car_repair_garage_with_an_orange_color_th.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          px: { xs: 2, md: 10 },
          color: "white",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
             minHeight:"100vh"
          },
        }}
      >
        <Box sx={{ position: "relative", maxWidth: "600px" }}>
          <Typography variant="h2" fontWeight="bold">
            Welcome to Mech2U
          </Typography>
          <Typography variant="h5" sx={{ mt: 2 }}>
            "Your Car, Our Care – Anytime, Anywhere."
          </Typography>
          {isLoggedIn ? (
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 3, px: 4, py: 1.5, fontSize: "1.2rem" }}
            onClick={() => navigate("/services")}
          >
            Go TO SERVICES PAGE
          </Button>
          ) : (
            <Button
            variant="contained"
            color="primary"
            sx={{ mt: 3, px: 4, py: 1.5, fontSize: "1.2rem" }}
            onClick={() => navigate("/register")}
          >
            SIGN UP TO BOOK A SERVICE
          </Button>
          )}
        </Box>
      </Box>

      {/* Our Services Section */}
      <Container sx={{ my: 10 }}>
        <Typography variant="h3" fontWeight="bold" textAlign="center">
          Professional Mobile Automotive Repairs
        </Typography>
        <Typography
          variant="body1"
          textAlign="center"
          sx={{ maxWidth: "700px", mx: "auto", mt: 2, color: "gray" }}
        >
          Our certified mechanics come to your location to provide high-quality, professional car repairs and maintenance services.
        </Typography>

        <Grid container spacing={4} sx={{ mt: 5 }}>
          {services?.map((service, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ textAlign: "center", p: 3, boxShadow: 3  }}>
              <CardMedia component="img" height="200" image={service.image} alt={service.name} />
                <CardContent>
                  <Typography variant="h6" fontWeight="bold">
                    {service.name}
                  </Typography>
                  <Typography  variant="body2" sx={{ mt: 1, color: "gray" }}>
                    {service.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Box sx={{ bgcolor: "#f04f23", color: "white", py: 6, textAlign: "center", mt: 5 }}>
        <Container>
          <Typography variant="h4" fontWeight="bold">🚨 Urgent Assistance</Typography>
          <Typography variant="body1" sx={{ mt: 2, maxWidth: "700px", mx: "auto" }}>
            Need immediate roadside assistance? Contact us now for fast and reliable help!
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 3, flexWrap: "wrap" }}>
            <Button variant="contained" color="primary" href="tel:+9627XXXXXXXX" sx={{ fontSize: "1rem" }}>
              📞 Call Now
            </Button>
            <Button variant="contained" color="secondary" href="mailto:support@mech2u.com" sx={{ fontSize: "1rem" }}>
              📧 Email Us
            </Button>
            <Button variant="outlined" color="inherit" onClick={() => navigate("/contact")}
              sx={{ fontSize: "1rem", borderColor: "white", color: "white", '&:hover': { bgcolor: "white", color: "black" } }}>
              📍 Contact Us Page
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
