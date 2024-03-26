import React, { useState } from "react";

import {
  Container,
  TextField,
  Button,
  Typography,
  Stack,
  Avatar,
  IconButton,
} from "@mui/material";

import { CameraAlt as CameraAltIcon } from "@mui/icons-material";
import { VisuallyHiddenInput } from "../components/styles/StyledComponents";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [dp, setDp] = useState("");
  // can add validations

  // file handler
  function reader(file, callback) {
    const fr = new FileReader();
    fr.onload = () => callback(null, fr.result);
    fr.onerror = (err) => callback(err);
    fr.readAsDataURL(file);
  }

  const handleFile = (evt) => {
    // No files, do nothing.
    if (!evt.target.files) {
      return;
    }
    reader(evt.target.files[0], (err, res) => {
      console.log(res); // Base64 `data:image/...` String result.
      setDp(res);
    });
  };

  // document.querySelector("#image").addEventListener("change", (evt) => {

  // });

  // file handler

  const toggleLogin = () => setIsLogin(!isLogin);
  const handleLogin = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Email:", email, "Password:", password);
  };
  const handleSignUp = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Email:", email, "Password:", password);
  };

  return (
    <div
      style={{
        background:
          "url(https://images.unsplash.com/photo-1526402978125-f1d6df91cbac?q=80&w=1986&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
        backgroundSize: "cover",
        // background: "rgb(2, 0, 36)",
        // backgroundImage:
        //    "linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 24%, rgba(0,212,255,1) 100%)"
        // ,
        // background-image: url('img_girl.jpg')
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
            background: "rgba(255, 255, 255, 0.5)",
          }}
        >
          {isLogin ? (
            <>
              <Typography component="h1" variant="h5" textAlign={"center"}>
                Sign in
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
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  // className={classes.submitButton}
                >
                  Sign In
                </Button>
                {/* <Typography>OR</Typography> */}
                <Button
                  sx={{ marginTop: "1rem" }}
                  fullWidth
                  variant="text"
                  color="primary"
                  onClick={toggleLogin}
                >
                  Don't have a account,Register...
                </Button>
              </form>
            </>
          ) : (
            <>
              <Typography component="h1" variant="h5" textAlign={"center"}>
                Sign UP
              </Typography>
              <Stack position={"relative"} width={"8rem"} margin={"auto"}>
                <Avatar
                  sx={{
                    width: "8rem",
                    height: "8rem",
                    objectFit: "contain",
                  }}
                  src={dp}
                ></Avatar>
                <IconButton
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    color: "white",
                    bgcolor: "gray",
                    ":hover": {
                      bgcolor: "rgba(0,0,0,0,0.7)",
                    },
                  }}
                  component="label"
                >
                  <>
                    <CameraAltIcon></CameraAltIcon>
                    <VisuallyHiddenInput
                      type="file"
                      onChange={handleFile}
                    ></VisuallyHiddenInput>
                  </>
                </IconButton>
              </Stack>

              <form onSubmit={handleSignUp}>
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
                  id="name"
                  label="Username"
                  name="username"
                  autoComplete="name"
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="bio"
                  label="Bio"
                  name="bio"
                  autoComplete="bio"
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
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  // className={classes.submitButton}
                >
                  Sign In
                </Button>
                {/* <Typography>OR</Typography> */}
                <Button
                  sx={{ marginTop: "1rem" }}
                  fullWidth
                  variant="text"
                  color="primary"
                  onClick={toggleLogin}
                  fontWidth="40px"
                >
                  Already have an account,Login...
                </Button>
              </form>
            </>
          )}
        </div>
      </Container>
    </div>
  );
};

export default Login;
