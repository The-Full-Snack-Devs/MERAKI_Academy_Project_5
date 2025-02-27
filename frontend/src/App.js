import "./App.css";
import Home from "./components/Home"
import Services from "./components/Services";
import { useSelector, useDispatch } from "react-redux";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { AiFillFacebook,  AiFillInstagram, AiFillYoutube, AiFillLinkedin } from "react-icons/ai";
import Location from "./components/Location/Location";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import HowItWork from "./components/howItWork/howItWork";
import DetailsServices from "./components/DetailsServices/DetailsServices";
import Cart from "./components/Cart/Cart";
import { setLogout } from "../src/components/redux/reducers/auth/index"
import TL from "./components/Time/Location/TL";

const App = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((reducers) => reducers.authReducer.isLoggedIn);
  const dispatch = useDispatch();

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
                  onClick={() => navigate("/HIW")}
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
                Profile
                </button>
                <button
                  onClick={() => navigate("/Cart")}
                >
                  Cart
                </button>
                <button
                  onClick={()=>{dispatch(setLogout())}}
                >
                  Log Out
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate("/HIW")}
               
                >
                  How It Works
                </button>
                <button
                  onClick={() => navigate("/Services")}
              
                >
                Our Services
                </button>
                <button
                  onClick={() => navigate("/login")}
               
                >
                Log In
                </button>
              </>
            )}
          </div>
        </header>
      <Routes>
        <Route path="/Services" element={<Services/>}/>
        <Route path="/DServices/:id" element={<DetailsServices/>}/>
        <Route path="/Cart" element={<Cart/>}/>
        <Route path="/TL" element={<TL/>}/>
        <Route path="/" element={<Home/>}/>
        <Route path="/Register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/HIW" element={<HowItWork/>}/>
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
