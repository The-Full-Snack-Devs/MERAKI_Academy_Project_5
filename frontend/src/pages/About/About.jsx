import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AboutUs = () => {
  const navigate = useNavigate();

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          mt: "60px",
          position: "relative",
          width: "100%",
          height: "50vh",
          backgroundImage: "url('src/assets/A_modern_car_repair_garage_with_an_orange_color_th.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          px: { xs: 2, md: 10 },
          color: "white",
          "&::before": {
            content: "''",
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
            About Mech2U
          </Typography>
          <Typography variant="h5" sx={{ mt: 2 }}>
            Bringing Car Repair to Your Doorstep – Convenient, Reliable, and Affordable.
          </Typography>
        </Box>
      </Box>

      {/* About Us Content */}
      <Container sx={{ my: 10 }}>
        <Typography variant="h3" fontWeight="bold" textAlign="center">
          Who We Are
        </Typography>
        <Typography
          variant="h5"
          textAlign="center"
          sx={{ maxWidth: "700px", mx: "auto", mt: 2, color: "gray" }}
        >
          Mech2U is a mobile car service platform designed to bring professional automotive repair and maintenance directly to you. Whether you're at home, at work, or on the road, our certified mechanics ensure high-quality service with transparency and convenience.
        </Typography>
      </Container>
      
      <Container sx={{ my: 5 }}>
        <Typography variant="h3" fontWeight="bold" textAlign="center">
          Our Mission
        </Typography>
        <Typography
          variant="h5"
          textAlign="center"
          sx={{ maxWidth: "700px", mx: "auto", mt: 2, color: "gray" }}
        >
          Our mission is to revolutionize car repair by offering mobile services that save you time, eliminate hassle, and provide expert solutions at your convenience.
        </Typography>
      </Container>

      <Container sx={{ my: 5 }}>
        <Typography variant="h3" fontWeight="bold" textAlign="center">
          Why Choose Mech2U?
        </Typography>
        <Typography
          variant="h5"
          textAlign="center"
          sx={{ maxWidth: "700px", mx: "auto", mt: 2, color: "gray" }}
        >
          - No need to visit a workshop—our mechanics come to you. <br />
          - Transparent pricing with no hidden fees. <br />
          - Professional, experienced, and trusted mechanics. <br />
          - Easy online booking and secure payment options.
        </Typography>
      </Container>
      
      <Box sx={{ textAlign: "center", my: 5 }}>
        <Button variant="contained" color="primary" onClick={() => navigate("/services")}> Explore Our Services </Button>
      </Box>
    </Box>
  );
};

export default AboutUs;