import React, { useEffect, useState } from "react";

import {
  Button,
  Container,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminLogin, getAdmin } from "../../redux/thunks/admin";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const AdminLogin = () => {
  const [secretKey, setSecretKey] = useState("");
  const [showSecretKey, setShowSecretKey] = useState(false);

  const dispatch = useDispatch();
  const { isAdmin } = useSelector((state) => state.auth);

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(adminLogin(secretKey));
  };

  const handleTogglePasswordVisibility = () => {
    setShowSecretKey(!showSecretKey);
  };

  useEffect(() => {
    dispatch(getAdmin());
  }, [dispatch]);

  if (isAdmin) {
    return <Navigate to="/admin/dashboard"></Navigate>;
  }

  return (
    <div
      style={{
        background: "rgb(2, 0, 36)",
        backgroundImage:
          "linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 24%, rgba(0,212,255,1) 100%)",
      }}
    >
      <Container
        component={"main"}
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          paddingTop: "3rem",
          gap: "2rem",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          component="h1"
          variant="h5"
          textAlign={"center"}
          fontFamily={"cursive"}
        >
          Welcome to the Admin section of Talkify
        </Typography>
        <div
          style={{
            maxWidth: "400px",
            border: "2px solid gray",
            padding: "10px",
            borderRadius: "10px",
            background: "lightgray",
          }}
        >
          <Typography
            component="h1"
            variant="h5"
            textAlign={"center"}
            marginBottom={"2rem"}
          >
            Sign in as Admin
          </Typography>
          <form onSubmit={handleLogin}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Enter secret key...  "
              type={showSecretKey ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              value={secretKey}
              sx={{ marginBottom: "1rem" }}
              onChange={(e) => setSecretKey(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleTogglePasswordVisibility}
                      edge="end"
                    >
                      {showSecretKey ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button type="submit" fullWidth variant="contained" color="primary">
              Sign In
            </Button>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default AdminLogin;
