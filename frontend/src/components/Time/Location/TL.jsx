import React from 'react'
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Autocomplete, Marker } from "@react-google-maps/api";
const libraries = ["places"];


function TL() {

    const [map, setMap] = useState(null);
    const [time, setTime] = useState(new Date(Date.now()).toISOString().slice(0, 16));
    const [autocomplete, setAutocomplete] = useState(null);
    const [position, setPosition] = useState({ lat: 31.95, lng: 35.90 }); 
    const [userLocation, setUserLocation] = useState(null);
    const [savedLocation, setSavedLocation] = useState(null); 
    const [newUser, setnewUser] = useState({});

    const onLoad = (autoC) => setAutocomplete(autoC);
    const token=useSelector((reduser)=>reduser.authReducer.token)

    const headers = {
        Authorization: `Bearer ${token}`,
      };

    const getCartById=()=>{
        axios.get(`https://mech2u.onrender.com/users`, { headers })
        .then((result)=>{            
            setPosition({ lat: Number(result.data.User.lat), lng: Number(result.data.User.lng) })
        })
        .catch((error)=>{
        console.log(error);
        })
    }

    const cretaeOrder = () => {
        axios
          .post("https://mech2u.onrender.com/orders", newUser, {headers})
          .then((rese) => {
            
          })
          .catch((err) => {
            
          });
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
            (error) => {
              console.error("Error getting location:", error);
              alert("Failed to get your location. Please enable GPS.");
            }
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
        // setnewUser({...newUser, ...{position}})
        setnewUser({...newUser, position})
        console.log(newUser);
        alert(`Location saved`);    
      };

      useEffect(() => {
        getCartById();
      }, []);

  return (
    <div>
<div>
          <label>
            Set Location
          </label>
          <LoadScript googleMapsApiKey="AIzaSyAZax694b8V03dtD6PsGZ2RbIo8Zt2r8MA" libraries={libraries}>
      <GoogleMap
        center={position}
        zoom={12}
        onLoad={(map) => setMap(map)}
        mapContainerStyle={{ height: "25vh", width: "50%" }}
      >

        <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
          <input
            type="text"
            placeholder="Search location..."
            style={{
              position: "absolute",
              top: "10px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "250px",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              backgroundColor: "white",
              zIndex: 1000,
            }}
          />
        </Autocomplete>

        <button
          onClick={getUserLocation}
          style={{
            position: "absolute",
            bottom: "50px",
            right: "20px",
            padding: "10px 15px",
            borderRadius: "5px",
            background: "#ff6600",
            color: "white",
            border: "none",
            cursor: "pointer",
            zIndex: 1000,
          }}
        >
          📍 Current Location
        </button>

        <button
          onClick={saveLocation}
          style={{
            position: "absolute",
            bottom: "20px",
            right: "20px",
            padding: "10px 15px",
            borderRadius: "5px",
            background: "#28a745",
            color: "white",
            border: "none",
            cursor: "pointer",
            zIndex: 1000,
          }}
        >
          Save Location
        </button>

        <Marker
          position={position}
          draggable={true} 
          onDragEnd={onMarkerDragEnd} 
        />
      </GoogleMap>
    </LoadScript>
        </div>
        <input
  type="datetime-local"
  id="meeting-time"
  name="meeting-time"
  value={new Date(Date.now()).toISOString().slice(0, 16)}
  min={new Date(Date.now()).toISOString().slice(0, 16)}
  onChange={(e)=>{setnewUser({...newUser, date_time: e.target.value})}}/>
  <button onClick={() => {cretaeOrder()}}>Confirm the order</button>
    </div>
  )
}

export default TL