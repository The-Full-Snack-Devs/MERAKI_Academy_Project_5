import "./App.css";
import Home from "./components/Home"
import Services from "./components/Services";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { AiFillFacebook,  AiFillInstagram, AiFillYoutube, AiFillLinkedin } from "react-icons/ai";
import Location from "./components/Location/Location";
import Register from "./components/Register/Register";
import DetailsServices from "./components/DetailsServices";


const App = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((reducers) => reducers.authReducer.isLoggedIn);
  
  return (
    <div className="App">

      

       <header>
          <div className="logo flex items-center ">
            <img
              src='../src/assest/Mech2U_logo_transparent-removebg-preview.png'
              alt="Logo"
              onClick={() => navigate("/")}
            />

            <p
              onClick={() => navigate("/")}
            >
              Join Our Team
            </p>
          </div>
      
          <div>
            {isLoggedIn ? (
              <>
                <button
                  onClick={() => navigate("/")}
                >
                  How It Works
                </button>
                <button
                  onClick={() => navigate("/")}

                >
                Our Services
                </button>
                <button
                  onClick={() => navigate("/")}
 
                >
                Profile
                </button>
                <button
                  onClick={() => navigate("/")}
                >
                  Cart
                </button>
                <button
                  onClick={() => navigate("/")}
                >
                  Log Out
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate("/")}
               
                >
                  How It Works
                </button>
                <button
                  onClick={() => navigate("/Services")}
              
                >
                Our Services
                </button>
                <button
                  onClick={() => navigate("/")}
               
                >
                Log In
                </button>
              </>
            )}
          </div>
        </header>
        <DetailsServices/>
      <Routes>
        <Route path="/Services" element={<Location/>}/>
        <Route path="/" element={<Services/>}/>
      </Routes>
      <footer>
            <div>
            <AiFillLinkedin /><AiFillInstagram /><AiFillYoutube /><AiFillLinkedin />
            </div>
          <div>
            <Link to="/">
              About
            </Link>
            <br/>
            <Link
              to="/"
            >
              Privacy Policy
            </Link>
            <br/>
            <Link
              to="/"
            >
              Contact
            </Link>
          </div>
          <p>© 2025 Mech2U. All rights reserved.</p>
        </footer>
    </div>
  );
};

export default App;
