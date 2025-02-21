import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GoogleMap, LoadScript, Autocomplete, Marker } from "@react-google-maps/api";
import { apiClient } from "../../../Service/api/api";
import { useNavigate } from "react-router-dom";
import { setCartId } from "../../../Service/redux/reducers/auth";
import { Card, CardContent, Typography, Button, Box, TextField } from "@mui/material";

const libraries = ["places"];

function TL() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [map, setMap] = useState(null);
  const [time, setTime] = useState(new Date(Date.now()).toISOString().slice(0, 16));
  const [autocomplete, setAutocomplete] = useState(null);
  const [position, setPosition] = useState({ lat: 31.95, lng: 35.90 });
  const [newUser, setNewUser] = useState({});
  const [cart_id, setcart_id] = useState(useSelector((state) => state.authReducer.Cart_id) )

  const token = useSelector((state) => state.authReducer.token);

  const headers = { Authorization: `Bearer ${token}` };

  const getCartById = async () => {
    try {
      const result = await apiClient.cart.getCartById(token);
      setPosition({ lat: Number(result.data.cart[0].lat), lng: Number(result.data.cart[0].lng) });
      setcart_id(result.data.cart[0].cart_id)
    } catch (error) {
      console.log(error);
    }
  };

  const createOrder = async () => {
    console.log(newUser);
    
    try {
      console.log(newUser);
      const result = await apiClient.orders.createOrder(newUser, token);
      alert("Your order has been created successfully");
      navigate("/");
      dispatch(setCartId(result.data.result));
    } catch (error) {
      console.log(error);
    }
  };

  const onPlaceChanged = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      if (place.geometry) {
        const location = place.geometry.location;
        setPosition({ lat: location.lat(), lng: location.lng() });
        map.panTo({ lat: location.lat(), lng: location.lng() });
      }
    }
  };

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation = { lat: position.coords.latitude, lng: position.coords.longitude };
          setPosition(newLocation);
          map.panTo(newLocation);
        },
        (error) => alert("Failed to get your location. Please enable GPS.")
      );
    }
  };

  const saveLocation = () => {
    setNewUser({ ...newUser, position });
    alert(`Location saved`);
  };

  useEffect(() => {
    getCartById();   
    setNewUser({ ...newUser, cart_id });
  }, []);

  return (
    <Card sx={{ maxWidth: 600, mx: "auto", mt: 10, p: 2, boxShadow: 3, borderRadius: 3 }}>
      <CardContent>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Select Time & Location
        </Typography>

        {/* Location Section */}
        <Box sx={{ height: "250px", width: "100%", borderRadius: 2, overflow: "hidden", mb: 2 }}>
          <LoadScript googleMapsApiKey="AIzaSyAZax694b8V03dtD6PsGZ2RbIo8Zt2r8MA" libraries={libraries}>
            <GoogleMap center={position} zoom={12} onLoad={setMap} mapContainerStyle={{ height: "100%", width: "100%" }}>
              <Autocomplete onLoad={setAutocomplete} onPlaceChanged={onPlaceChanged}>
              <Box
  sx={{
    position: "absolute",
    top: 8,
    left: "63%",
    transform: "translateX(-50%)",
    width: "50%",
    zIndex: 1000,
  }}
>
  <TextField
    placeholder="Search location..."
    variant="outlined"
    fullWidth
    color="primary"
    sx={(theme) => ({
      bgcolor: "white",
      borderRadius: 2,
      boxShadow: 2,
      input: {
        padding: "10px",
        color: "black", 
      },
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: "rgba(0, 0, 0, 0.2)",
        },
        "&:hover fieldset": {
          borderColor: "#f04f23",
        },
        "&.Mui-focused fieldset": {
          borderColor: "#f04f23", 
          borderWidth: "2px",
        },
      },
    })}
  />
</Box>


              </Autocomplete>
              <Marker position={position} draggable onDragEnd={(e) => setPosition({ lat: e.latLng.lat(), lng: e.latLng.lng() })} />
            </GoogleMap>
          </LoadScript>
        </Box>

        {/* Buttons */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Button variant="contained" color="secondary" onClick={getUserLocation}>
            📍 Use Current Location
          </Button>
          <Button variant="contained" color="success" onClick={saveLocation}>
            Save Location
          </Button>
        </Box>

        {/* Time Selection */}
        <TextField
          label="Select Time"
          type="datetime-local"
          fullWidth
          value={newUser.date_time || time}
          onChange={(e) => setNewUser({ ...newUser, date_time: e.target.value })}
          sx={{ mb: 2, cursor: 'pointer' }}
        />

        {/* Confirm Order */}
        <Button fullWidth variant="contained" color="primary" onClick={createOrder}>
          Confirm Order
        </Button>
      </CardContent>
    </Card>
  );
}

export default TL;
