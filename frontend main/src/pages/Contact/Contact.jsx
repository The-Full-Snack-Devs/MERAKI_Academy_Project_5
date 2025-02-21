import React, { useRef } from "react";
import { Box, Typography, TextField, Button, Container } from "@mui/material";
import emailjs from "@emailjs/browser";
import { useNavigate } from "react-router-dom";

const ContactUs = () => {
  const navigate = useNavigate();

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_f78ae9q",
        "template_c7df5hm",
        form.current,
        "CSaSObiJO2PnRFSnf"
      )
      .then(
        () => {
          console.log("SUCCESS!", form);
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
  };

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
          justifyContent: "center",
          color: "white",
          textAlign: "center",
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
        <Typography variant="h2" fontWeight="bold" sx={{ position: "relative" }}>
          Contact Us
        </Typography>
      </Box>

      {/* Contact Form */}
      <Container sx={{ my: 10, textAlign: "center" }}>
        <Typography variant="h4" fontWeight="bold" mb={3}>
          Get in Touch
        </Typography>
        <Typography variant="body1" color="gray" mb={5}>
          Have questions or need assistance? Fill out the form below and we'll get back to you as soon as possible.
        </Typography>

        <form ref={form} onSubmit={sendEmail} style={{ maxWidth: "600px", margin: "0 auto" }}>
          <TextField
            fullWidth
            label="Your Name"
            name="name"
            variant="outlined"
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Your Email"
            name="email"
            type="email"
            variant="outlined"
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Your Message"
            name="message"
            variant="outlined"
            margin="normal"
            multiline
            rows={5}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2, px: 4, py: 1.5, fontSize: "1.2rem" }}
           onClick={()=>{
            alert(` Message sent successfully`)
            navigate("/")
           }}
          >
            Send Message
          </Button>
        </form>
      </Container>
    </Box>
  );
};

export default ContactUs;
