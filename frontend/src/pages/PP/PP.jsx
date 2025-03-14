import React from "react";
import { Box, Typography, Container, Button } from "@mui/material";

const PrivacyPolicy = () => {
  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          mt: "60px",
          position: "relative",
          width: "100%",
          height: "60vh",
          backgroundImage: "url('src/assets/A_modern_car_repair_garage_with_an_orange_color_th.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          "&::before": {
            content: "''",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
        }}
      >
        <Typography variant="h2" fontWeight="bold" sx={{ position: "relative" }}>
          Privacy Policy
        </Typography>
      </Box>

      {/* Privacy Content Section */}
      <Container sx={{ my: 10 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Your Privacy Matters to Us
        </Typography>
        <Typography variant="body1" sx={{ color: "gray", mt: 2 }}>
          At Mech2U, we are committed to protecting your privacy and ensuring your personal information remains secure.
          This Privacy Policy explains what data we collect, how we use it, and how we keep it safe.
        </Typography>

        <Typography variant="h5" fontWeight="bold" sx={{ mt: 4 }}>
          Information We Collect
        </Typography>
        <Typography variant="body1" sx={{ color: "gray", mt: 2 }}>
          - Personal details (name, phone number, email) for service bookings.<br/>
          - Location data to provide mobile car services.<br/>
          - Payment details for transactions.<br/>
          - Technical data such as browser type and device information.
        </Typography>

        <Typography variant="h5" fontWeight="bold" sx={{ mt: 4 }}>
          How We Use Your Information
        </Typography>
        <Typography variant="body1" sx={{ color: "gray", mt: 2 }}>
          - To provide and manage our services.<br/>
          - To improve user experience and website functionality.<br/>
          - To process payments securely.<br/>
          - To send updates, promotions, and support messages.
        </Typography>

        <Typography variant="h5" fontWeight="bold" sx={{ mt: 4 }}>
          Data Security
        </Typography>
        <Typography variant="body1" sx={{ color: "gray", mt: 2 }}>
          We implement strict security measures to protect your data against unauthorized access, alteration, and misuse.
          Your information is encrypted and stored securely.
        </Typography>

        <Typography variant="h5" fontWeight="bold" sx={{ mt: 4 }}>
          Contact Us
        </Typography>
        <Typography variant="body1" sx={{ color: "gray", mt: 2 }}>
          If you have any questions about our Privacy Policy, feel free to contact us:<br/>
          📧 Email: support@mech2u.com<br/>
          📞 Phone: +9627XXXXXXXX<br/>
          <Button variant="outlined" color="primary" onClick={() => navigate("/contact")}
              sx={{ fontSize: "1rem", borderColor: "primary", color: "primary", '&:hover': { bgcolor: "primary", color: "primary" } }}>
              📍 Contact Us Page
            </Button>
        </Typography>
      </Container>
    </Box>
  );
};

export default PrivacyPolicy;
