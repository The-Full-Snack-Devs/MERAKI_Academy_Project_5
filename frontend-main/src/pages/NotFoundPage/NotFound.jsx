import React ,{ useContext } from 'react';
import { Box, Typography, Button  } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from "../../components/MUI/MUITheme";
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import { motion } from 'framer-motion';



const NotFoundPage = () => {
  const navigate = useNavigate();
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  return (
   
    <Box
   
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        backgroundImage: 'url(https://source.unsplash.com/1600x900/?car,road)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        p: 3, 
         backgroundColor: darkMode ? "#414141" : "#ffffff",
         color: darkMode ? "#ffffff" : "#000000" 

      }}
      
    >
          <motion.div
        initial={{ x: 0 }}
        animate={{ x: [0, -10, 10, -10, 10, 0], rotate: [0, -5, 5, -5, 5, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
      >
              <DirectionsCarIcon sx={{ fontSize: 80, mb: 2, color: '#ef592c', textShadow: '2px 2px 5px rgba(0,0,0,0.5)' }} />
              </motion.div>

      <Typography variant="h1" fontWeight="bold" sx={{ textShadow: '2px 2px 5px rgba(0,0,0,0.5)' }}>
        404
      </Typography>
      <Typography variant="h5" sx={{ mb: 2, textShadow: '2px 2px 5px rgba(0,0,0,0.5)' }}>
        Oops! Looks like you're lost on the road.
      </Typography>
      <Typography variant="body1" sx={{ mb: 3, textShadow: '2px 2px 5px rgba(0,0,0,0.5)' }}>
        The page you're looking for doesn't exist. Let’s get you back on track.
      </Typography>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={() => navigate('/')} 
        sx={{ fontWeight: 'bold', px: 4, py: 1.5, color: darkMode ? "#ffffff" : "#000000"  }}
      >
        Back to Home
      </Button>
    </Box>
  );
};

export default NotFoundPage;
