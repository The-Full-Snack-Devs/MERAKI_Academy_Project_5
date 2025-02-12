import React, { useContext } from "react";
import { AppBar, Toolbar, Typography, Button, IconButton } from "@mui/material";
import { Menu as MenuIcon} from "@mui/icons-material";
import { ThemeContext } from "../MUI/MUITheme";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/Mech2U_logo_transparent-removebg-preview.png"
import { useSelector, useDispatch } from "react-redux";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { setLogout } from "../../Service/redux/reducers/auth"
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';


const Navbar = () => {
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const navigate = useNavigate();
  const isLoggedIn = useSelector((reducers) => reducers.authReducer.isLoggedIn);
  const role = useSelector((reducers) => reducers.authReducer.Role);
  const dispatch = useDispatch()

  return (
    <AppBar position="fixed" color="default" sx={{ backgroundColor: darkMode ? "#414141" : "#ffffff", color: darkMode ? "#ffffff" : "#000000" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        
        <Typography variant="h6" sx={{ display: "flex", alignItems: "center", cursor: "pointer" }} onClick={() => navigate("/")}>
          <img src={logo} alt="Mech2U" style={{ height: 50, marginRight: 10 }} onClick={() => navigate("/")}/>
          Join Our Team
        </Typography>

        <div className="nav-links" style={{ display: "flex", gap: "20px" }}>
        {isLoggedIn ? (
          <>
        {role === "admin" && (
          <Button  variant="outlined" color="primary" onClick={"/orders"}>Orders</Button>
        )}
          <Button  variant="outlined" color="primary" onClick={() => navigate("/HIW")}>How It Works</Button>
          <Button  variant="outlined" color="primary" onClick={() => navigate("/Services")}> Our Services </Button>
          <Button  variant="outlined" color="primary" onClick={()=>{dispatch(setLogout())}}>Log Out</Button>
          </>
          ) : (
            <>
          <Button  variant="outlined" color="primary" onClick={() => navigate("/HIW")}>How It Works</Button>
          <Button  variant="outlined" color="primary" onClick={() => navigate("/Services")}> Our Services </Button>
          <Button  variant="outlined" color="primary" onClick={() => navigate("/login")}> Log In </Button>
            
            </>
             )}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          {isLoggedIn ? (
          <>
          <IconButton color="primary" aria-label="shopping cart" onClick={() => navigate("/cart")}> <ShoppingCartOutlinedIcon /> </IconButton>
          <Button  variant="outlined" color="primary" onClick={()=>{dispatch(setLogout())}}>Log Out</Button>
          <IconButton onClick={() => setDarkMode(!darkMode)} color="inherit">
            {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
          </>
          ) : (
            <>
          <Button  variant="outlined" color="primary" onClick={() => navigate("/login")}> Log In </Button>
          <IconButton onClick={() => setDarkMode(!darkMode)} color="inherit">
            {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
            </>
             )}
          
          <IconButton sx={{ display: { xs: "block", md: "none" } }}>
            <MenuIcon />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
