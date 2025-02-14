import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin, setUserId, setRole } from "../../Service/redux/reducers/auth";
import { apiClient } from "../../Service/api/api";
import { Google as GoogleIcon } from '@mui/icons-material'

import {
  Card,
  Box,
  Button,
  TextField,
  Typography,
  Link,
  Stack,
  CssBaseline,
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
      console.log("role", result.data.role);
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
          backgroundColor: "background.default",
          p: 2,
        }}
      >
        <Card  sx={{ p: 4, width: "100%", maxWidth: 500 ,boxShadow:5}}>
          <Typography variant="h4" component="h1" gutterBottom>
            Welcome to Mech2U
          </Typography>
          <Box
            component="form"
            // onSubmit={handleLogin}
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
            <Button onClick={handleLogin} type="submit" variant="outlined" fullWidth>
              Log in
            </Button>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => alert('Sign in with Google')}
              startIcon={<GoogleIcon />}
            >
              Sign in with Google
            </Button>
          </Box>
          {res && (
            <Typography color="error" sx={{ mt: 2 }}>
              {res}
            </Typography>
          )}
          <Typography sx={{ mt: 2 }}>
            Don't have an account?{" "}
            <Link
              component="button"
              variant="body2"
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
