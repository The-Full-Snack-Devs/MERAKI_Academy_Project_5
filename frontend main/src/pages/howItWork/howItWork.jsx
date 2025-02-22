import React from "react";
import { Grid, Card, CardContent, Typography, Button, Box,Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

const steps = [
  { 
    number: 1, 
    title: "Check Out Our Services", 
    description: "Browse our wide range of car repair and maintenance services.", 
    link: "/services",
    button: "Our Services"
  },
  { 
    number: 2, 
    title: "Login to Book a Service", 
    description: "Create an account or log in to book your desired service.", 
    link: "/login" ,
    button: "Login"
  },
  { 
    number: 3, 
    title: "Choose a Service", 
    description: "Select the service you need, whether it's an oil change or brake repair.", 
    link: "/services",
    button: "Our Services"
  },
  { 
    number: 4, 
    title: "Choose a Part or Type of Service", 
    description: "Specify the exact part or service type required for your car.", 
    link: "/services",
    button: "Our Services"
  },
  { 
    number: 5, 
    title: "Add It to Your Cart", 
    description: "Review your selected services and add them to your cart.", 
    link: "/cart",
    button: "Cart" 
  },
  { 
    number: 6, 
    title: "Place Your Order", 
    description: "Confirm your booking and choose a suitable time and you location for the service.", 
    link: "/checkout",
    button: "Cart"
  },
  { 
    number: 7, 
    title: "Check Your Order in Your Profile Page", 
    description: "Track the status of your order in your profile section.", 
    link: "/profile",
    button: "Profile" 
  },
];

const HowItWork = () => {
  const navigate = useNavigate();

  return (
    <Box>
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
        <Box sx={{ position: "relative", maxWidth: "600px",}}>
          <Typography variant="h2" fontWeight="bold">
            How It Works..
          </Typography>
          <Typography variant="h5" sx={{ mt: 2 }}>
            "Your Car, Our Care – Anytime, Anywhere."
          </Typography>
        </Box>
      </Box>
    <Grid container spacing={4} sx={{ mt: 5, px: 3 , minHeight:"100vh" }}>
      {steps.map((step, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card sx={{ textAlign: "center", p: 3, boxShadow: 3 }}>
            {/* Step Number */}
            <div
              style={{
                width: 60,
                height: 60,
                borderRadius: "50%",
                backgroundColor: "#f04f23",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "24px",
                fontWeight: "bold",
                margin: "0 auto 15px",
              }}
            >
              {step.number}
            </div>

            <CardContent>
              <Typography variant="h6" fontWeight="bold">
                {step.title}
              </Typography>
              <Typography variant="body2" sx={{ mt: 1, color: "gray" }}>
                {step.description}
              </Typography>

              <Button
                variant="contained"
                sx={{ 
                  mt: 2, 
                  backgroundColor: "#f04f23", 
                  "&:hover": { backgroundColor: "#d9441d" } 
                }}
                onClick={() => navigate(step.link)}
              >
                {step.button}
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
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

export default HowItWork;
