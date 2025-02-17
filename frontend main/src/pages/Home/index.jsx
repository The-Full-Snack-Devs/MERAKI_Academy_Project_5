import React from "react";
import { Box, Typography, Button, Grid, Container, Card, CardContent } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import BuildIcon from "@mui/icons-material/Build";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import { useSelector, useDispatch } from "react-redux";

const Home = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((reducers) => reducers.authReducer.isLoggedIn);


  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
        mt: "60px",
          position: "relative",
          width: "100%",
          height: "90vh",
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
          {[
            { title: "General Repairs", icon: <BuildIcon sx={{ fontSize: 50, color: "#f04f23" }} />, description: "We offer a range of repair services, from engine diagnostics to brake replacements." },
            { title: "Oil & Fluid Changes", icon: <LocalGasStationIcon sx={{ fontSize: 50, color: "#f04f23" }} />, description: "Keep your car running smoothly with our mobile oil and fluid change services." },
            { title: "Car Inspections", icon: <DirectionsCarIcon sx={{ fontSize: 50, color: "#f04f23" }} />, description: "Pre-purchase and safety inspections to ensure your vehicle is in top condition." },
          ].map((service, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ textAlign: "center", p: 3, boxShadow: 3 }}>
                {service.icon}
                <CardContent>
                  <Typography variant="h6" fontWeight="bold">
                    {service.title}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1, color: "gray" }}>
                    {service.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;
