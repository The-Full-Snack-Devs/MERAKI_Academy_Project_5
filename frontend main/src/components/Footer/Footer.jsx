import React from "react";
import { AiFillFacebook, AiFillInstagram, AiFillYoutube, AiFillLinkedin } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Box, Typography, IconButton, useTheme } from "@mui/material";

const Footer = () => {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        padding: "20px 40px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        borderTop: `2px solid ${theme.palette.primary.main}`,
      
      }}
    >
      {/* Social Media Icons */}
      <Box sx={{ display: "flex", gap: "15px", mb: 2 }}>
        <IconButton component="a" href="https://facebook.com" target="_blank" color="inherit">
          <AiFillFacebook size={30} />
        </IconButton>
        <IconButton component="a" href="https://linkedin.com" target="_blank" color="inherit">
          <AiFillLinkedin size={30} />
        </IconButton>
        <IconButton component="a" href="https://instagram.com" target="_blank" color="inherit">
          <AiFillInstagram size={30} />
        </IconButton>
        <IconButton component="a" href="https://youtube.com" target="_blank" color="inherit">
          <AiFillYoutube size={30} />
        </IconButton>
      </Box>

      {/* Footer Links */}
      <Box sx={{ display: "flex", gap: "20px", mb: 2 }}>
        <Link to="/about" style={{ textDecoration: "none", color: "inherit" }}>About</Link>
        <Link to="/privacy" style={{ textDecoration: "none", color: "inherit" }}>Privacy Policy</Link>
        <Link to="/contact" style={{ textDecoration: "none", color: "inherit" }}>Contact</Link>
      </Box>

      {/* Copyright */}
      <Typography variant="body2">
        © {new Date().getFullYear()} Mech2U. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
