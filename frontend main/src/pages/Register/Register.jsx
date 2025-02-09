import React, { useState } from "react";
import axios from "axios";
import { useDispatch,useSelector } from "react-redux";
import { GoogleMap, LoadScript, Autocomplete, Marker } from "@react-google-maps/api";
const libraries = ["places"];
import { apiClient } from '../../Service/api/api';

function Register() {
  const [newUser, setnewUser] = useState({});
  const [Res, setRes] = useState("");
  const [Show, setShow] = useState(false);
  const [map, setMap] = useState(null);
  const [autocomplete, setAutocomplete] = useState(null);
  const [position, setPosition] = useState({ lat: 31.95, lng: 35.90 }); 
  const [userLocation, setUserLocation] = useState(null);
  const [savedLocation, setSavedLocation] = useState(null); 
  const onLoad = (autoC) => setAutocomplete(autoC);
  



  const CreateUser = async () => {
    // axios
    //   .post("http://localhost:5000/users/register", newUser)
    //   .then((rese) => {
    //     setRes(rese.data.message);
    //     setShow(true);
    //   })
    //   .catch((err) => {
    //     setRes(err.response.data.message);
    //     setShow(true);
    //   });

    try {
      const result = await apiClient.users.register(newUser)

      setRes(result.data.message);
      setShow(true);
    } catch (error) {
      setRes(error.response.data.message);
      setShow(true);
     
    }
  };

  const uploadHandler = (x) => {
    const data = new FormData();
    data.append("file", x);
    data.append("upload_preset", "l2udrjei");

    axios
      .post("https://api.cloudinary.com/v1_1/dl7wtfv68/upload", data)
      .then(function (rese) {
        setnewUser({ ...newUser, Image: rese.data.url });
      })
      .catch(function (err) {
        console.log(err.response.data);
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
    setnewUser({...newUser, ...{position}})
    alert(`Location saved`);    
  };

  return (
    <div>
      <div>
        <h2>
          Create Your Account
        </h2>
        <div>
          <label>
            Image
          </label>
          <div>
          <input
            type="file"
            onChange={(e) => {
              uploadHandler(e.target.files[0])
            }}
          />
        </div>
        </div>
        <div>
          <label>
            First Name
          </label>
          <input
            type="text"
            placeholder="Enter your first name"
            onChange={(e) =>
              setnewUser({ ...newUser, firstName: e.target.value })
            }
          />
        </div>
        <div>
          <label>
            Last Name
          </label>
          <input
            type="text"
            placeholder="Enter your last name"
            onChange={(e) =>
              setnewUser({ ...newUser, lastName: e.target.value })
            }
          />
        </div>

        <div>
          <label>
            Phone Number
          </label>
          <input
            type="tel"
            placeholder="0771234567"
            pattern="[0-9]{10}"
            onChange={(e) => setnewUser({ ...newUser, phone: e.target.value })}
          />
        </div>

        <div className="mb-4">
          <label>
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            onChange={(e) => setnewUser({ ...newUser, email: e.target.value })}
          />
        </div>

        <div>
          <label>
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            onChange={(e) =>
              setnewUser({ ...newUser, password: e.target.value })
            }
          />
        </div>

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
        

        <button
          onClick={CreateUser}
        >
          Create..
        </button>

        {Show && (
          <p
            className={`text-center mt-4 ${
              Res == "Account Created Successfully" ? "text-teal-600" : "text-red-500"
            }`}
          >
            {Res}
          </p>
        )}
      </div>
    </div>
  );
}

export default Register;
