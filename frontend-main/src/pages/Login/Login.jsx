import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin, setUserId, setRole } from "../../Service/redux/reducers/auth";
import { apiClient } from "../../Service/api/api";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import {
  Card,
  Box,
  Button,
  TextField,
  Typography,
  Link,
  Stack,
  CssBaseline,
  Divider,
} from "@mui/material";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [newlogin, setNewlogin] = useState({ email: "", password: "" });
  const [res, setRes] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await apiClient.users.login(newlogin);
      setRes(result.data.message);
      dispatch(setLogin(result.data.token));
      dispatch(setUserId(result.data.userId));
      dispatch(setRole(result.data.role));
      navigate("/");
    } catch (error) {
      console.log(error);
      setRes(error.message);
    }
  };

  return (
    <>
      <CssBaseline />
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{
          minHeight: "100vh",
          backgroundImage: "url('src/assets/A_modern_car_repair_garage_with_an_orange_color_th.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark overlay
            backdropFilter: "blur(5px)",
            zIndex: 1,
          },
        }}
      >
        <Card
          sx={{
            p: 4,
            width: "100%",
            maxWidth: 500,
            boxShadow: 5,
            zIndex: 2,
            textAlign: "center",
          }}
        >  
          <img src="src/assets/Mech2U_logo_transparent-removebg-preview.png" alt="Mech2U" style={{ height: 100, mb: 10}} onClick={() => navigate("/")}/>

          <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom sx={{my:3}}>
            Welcome to Mech2U
          </Typography>
          <Box
            component="form"
            noValidate
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
              required
              value={newlogin.email}
              onChange={(e) =>
                setNewlogin({ ...newlogin, email: e.target.value })
              }
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              required
              value={newlogin.password}
              onChange={(e) =>
                setNewlogin({ ...newlogin, password: e.target.value })
              }
            />
            <Button
              onClick={handleLogin}
              type="submit"
              variant="contained"
              fullWidth
            >
              Log in
            </Button>
          </Box>

          {/* OR Divider */}
          <Divider sx={{ my: 2 }}>OR</Divider>

          <GoogleLogin
            shape="rectangular"
            onSuccess={(response) => {
              const data = jwtDecode(response.credential);
              axios
                .post("https://mech2u.onrender.com/google/", data)
                .then((result) => {
                  setRes(result.data.message);
                  dispatch(setLogin(result.data.token));
                  dispatch(setUserId(result.data.userId));
                  dispatch(setRole(result.data.role));
                  navigate("/");
                })
                .catch((err) => {
                  console.log(err);
                });
            }}
            onError={() => console.log("Google login failed")}
          />

          {res && (
            <Typography color="error" sx={{ mt: 2 }}>
              {res}
            </Typography>
          )}

          {/* Register Link with Hover Effect */}
          <Typography sx={{ mt: 2 }}>
            Don't have an account?{" "}
            <Link
              component="button"
              variant="body1"
              sx={{
                cursor: "pointer",
                textDecoration: "none",
                fontWeight: "bold",
                color: "primary.main",
                "&:hover": { textDecoration: "underline" },
              }}
              onClick={() => navigate("/Register")}
            >
              Register Now
            </Link>
          </Typography>
        </Card>
      </Stack>
    </>
  );
};

export default Login;
