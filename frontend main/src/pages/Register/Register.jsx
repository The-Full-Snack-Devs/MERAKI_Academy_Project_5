import React, { useState } from "react";
import axios from "axios";
import { GoogleMap, LoadScript, Autocomplete, Marker } from "@react-google-maps/api";
import { apiClient } from "../../Service/api/api";
import { Container, Paper, Typography, TextField, Button, Box, Modal } from "@mui/material"; // تمت إضافة Modal
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SaveIcon from "@mui/icons-material/Save";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { setLogin, setUserId, setRole } from "../../Service/redux/reducers/auth";
import { useNavigate } from "react-router-dom";

const libraries = ["places"];

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [newUser, setNewUser] = useState({});
  const [Res, setRes] = useState("");
  const [Show, setShow] = useState(false);
  const [map, setMap] = useState(null);
  const [autocomplete, setAutocomplete] = useState(null);
  const [position, setPosition] = useState({ lat: 31.95, lng: 35.9 });
  const [userLocation, setUserLocation] = useState(null);
  const [savedLocation, setSavedLocation] = useState(null);
  const [openMapModal, setOpenMapModal] = useState(false); 

  const onLoad = (autoC) => setAutocomplete(autoC);

  const CreateUser = async () => {
    try {
      const result = await apiClient.users.register(newUser);
      setRes(result.data.message);
      setShow(true);
    } catch (error) {
      setRes(error.response?.data?.message || "Registration failed");
      setShow(true);
    }
  };

  const uploadHandler = (x) => {
    const data = new FormData();
    data.append("file", x);
    data.append("upload_preset", "l2udrjei");

    axios.post("https://api.cloudinary.com/v1_1/dl7wtfv68/upload", data)
      .then((rese) => setNewUser({ ...newUser, Image: rese.data.url }))
      .catch((err) => console.log(err.response?.data));
  };

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      if (place.geometry) {
        const location = place.geometry.location;
        const newPosition = { lat: location.lat(), lng: location.lng() };
        setPosition(newPosition);
        map.panTo(newPosition);
      }
    }
  };

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(newLocation);
          setPosition(newLocation);
          map.panTo(newLocation);
        },
        (error) => alert("Failed to get your location. Please enable GPS."),
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const onMarkerDragEnd = (event) => {
    const newLat = event.latLng.lat();
    const newLng = event.latLng.lng();
    setPosition({ lat: newLat, lng: newLng });
  };

  const saveLocation = () => {
    setSavedLocation(position);
    setNewUser({ ...newUser, position });
    alert("Location saved");
    setOpenMapModal(false); 
  };

  return (
    <Container maxWidth="sm" sx={{ padding: 3, mt:2  }}>
      <Paper elevation={3} sx={{ padding: 3, mt: 5,boxShadow:5 }}>
      <Typography variant="h4" component="h1" gutterBottom>
            Welcome to Mech2U
          </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1  }}>
         <Box sx={{display: "flex" , gap: 1 }}>
          <TextField size="small" label="First Name" fullWidth onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })} />
          <TextField  size="small" label="Last Name" fullWidth onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })} />
          </Box>
          <TextField  size="small" label="Phone Number" fullWidth onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })} />
          <TextField  size="small" label="Email" type="email" fullWidth onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} />
          <TextField  size="small" label="Password" type="password" fullWidth onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} />
          
          
          <Button variant="outlined" color="primary" onClick={() => setOpenMapModal(true)}>
            Set Location
          </Button>

          <Modal open={openMapModal} onClose={() => setOpenMapModal(false)}>
            <Box sx={{ 
              position: "absolute", 
              top: "50%", 
              left: "50%", 
              transform: "translate(-50%, -50%)", 
              width: "80%", 
              maxWidth: 600, 
              bgcolor: "background.paper", 
              boxShadow: 24, 
              p: 4, 
              borderRadius: 2 
            }}>
              <Typography variant="h6" sx={{ mb: 2 }}>Set Your Location</Typography>
              <LoadScript googleMapsApiKey="AIzaSyAZax694b8V03dtD6PsGZ2RbIo8Zt2r8MA" libraries={libraries}>
                <GoogleMap 
                  center={position} 
                  zoom={12} 
                  onLoad={(map) => setMap(map)} 
                  mapContainerStyle={{ height: "40vh", width: "100%" }}
                >
                  <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                    <TextField placeholder="Search location..." sx={{ width: "80%", border: 1 }} />
                  </Autocomplete>
                  <Button variant="contained" color="secondary" startIcon={<LocationOnIcon />} onClick={getUserLocation} sx={{ mt: 2 }}>
                    Current Location
                  </Button>
                  <Button variant="contained" color="success" startIcon={<SaveIcon />} onClick={saveLocation} sx={{ mt: 2 }}>
                    Save Location
                  </Button>
                  <Marker position={position} draggable={true} onDragEnd={onMarkerDragEnd} />
                </GoogleMap>
              </LoadScript>
            </Box>
          </Modal>
          <Button component="label" variant="outlined" startIcon={<CloudUploadIcon />}>
            Upload Image
            <input type="file" hidden onChange={(e) => uploadHandler(e.target.files[0])} />
          </Button>

          <Button variant="outlined" fullWidth onClick={CreateUser}>Create Account</Button>
          < GoogleLogin  onSuccess={(response)=>{
            console.log(jwtDecode(response.credential));
            const data=jwtDecode(response.credential)
            axios.post("http://localhost:5000/google/",data)
            .then((result)=>{
              console.log(result);
              setRes(result.data.message);
              dispatch(setLogin(result.data.token));
              dispatch(setUserId(result.data.userId));
              dispatch(setRole(result.data.role));
              // console.log("role", result.data.role);
              navigate("/");
              
            })
            .catch((err)=>{console.log(err);
            })
            }} onError={()=>console.log("failed")}/>
        </Box>
        {Show && <Typography align="center" color="primary" sx={{ mt: 2 }}>{Res}</Typography>}
      </Paper>
    </Container>
  );
}

export default Register;