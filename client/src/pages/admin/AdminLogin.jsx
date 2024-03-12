import React, { useState } from "react";

import { Button, Container, TextField, Typography } from "@mui/material";
import { Navigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = (e) => {
    e.preventDefault();
  };

  const isAdmin = false;

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
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            maxWidth: "400px",
            border: "2px solid gray",
            padding: "10px",
            borderRadius: "10px",
            background: "lightgray",
          }}
        >
          <Typography component="h1" variant="h5" textAlign={"center"}>
            Sign in as Admin
          </Typography>
          <form onSubmit={handleLogin}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Enter secret key..."
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
