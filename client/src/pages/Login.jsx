import React, { useState } from "react";

import {
  Container,
  TextField,
  Button,
  Typography,
  Stack,
  Avatar,
  IconButton,
  InputAdornment,
} from "@mui/material";

import {
  CameraAlt as CameraAltIcon,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { VisuallyHiddenInput } from "../components/styles/StyledComponents";
import { backgroundGradient } from "../constants/color";
import axios from "axios";
import { server } from "../constants/config";
import { useDispatch } from "react-redux";
import { userExists } from "../redux/reducers/auth";
import toast from "react-hot-toast";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [username, setUsername] = useState("");
  const [dp, setDp] = useState("");
  const [avatar, setAvatar] = useState("");
  // can add validations

  const dispatch = useDispatch();

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
    let file = evt.target.files[0];

    reader(evt.target.files[0], (err, res) => {
      console.log(res); // Base64 `data:image/...` String result.
      setDp(res);
    });

    setAvatar(file);
  };

  // document.querySelector("#image").addEventListener("change", (evt) => {

  // });

  // file handler
  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const toggleLogin = () => setIsLogin(!isLogin);
  const handleLogin = async (e) => {
    e.preventDefault();
    // Handle login logic here
    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };

    console.log("Email:", username, "Password:", password);
    try {
      const { data } = await axios.post(
        `${server}/api/v1/user/login`,
        {
          username,
          password,
        },
        config
      );

      dispatch(userExists(true));
      toast.success(data.message);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong...");
    }
  };
  const handleSignUp = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Signing Up...");
    const formData = new FormData();

    formData.append("name", name);
    formData.append("username", username);
    formData.append("bio", bio);
    formData.append("password", password);
    formData.append("avatar", avatar);

    console.log(formData, { name, username, bio, password, dp });
    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      const { data } = await axios.post(
        `${server}/api/v1/user/new`,
        formData,
        config
      );
      dispatch(userExists(data.user));
      toast.success(data.message, {
        id: toastId,
      });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong...");
      // console.log();
    }
  };

  return (
    <div
      style={{
        background:
          "url(https://images.unsplash.com/photo-1526402978125-f1d6df91cbac?q=80&w=1986&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
        backgroundSize: "cover",
      }}
    >
      <Container
        component={"main"}
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          component="h1"
          fontSize={"2rem"}
          textAlign={"center"}
          fontWeight={"600"}
          color={"teal"}
          mb={"3rem"}
          fontFamily={"curshiv"}
          style={{
            fontFamily: "cursive",
          }}
        >
          Thanks for visiting us 🙏. 
        </Typography>
        <Typography
          component="h1"
          fontSize={"2rem"}
          textAlign={"center"}
          fontWeight={"600"}
          color={"teal"}
          mb={"3rem"}
          fontFamily={"curshiv"}
          style={{
            fontFamily: "cursive",
          }}
        >
          Coming soon: Our app is getting a makeover! We're working hard behind the scenes to bring you an even better experience. Thank you for your patience and support. Stay tuned for updates!
        </Typography>
        <Typography
          component="h1"
          fontSize={"2rem"}
          textAlign={"center"}
          fontWeight={"600"}
          color={"teal"}
          mb={"3rem"}
          fontFamily={"curshiv"}
          style={{
            fontFamily: "cursive",
          }}
        >
          Get Started with Talkify...
        </Typography>
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
                  label="User Name"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
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
              <Typography
                component="h1"
                variant="h5"
                textAlign={"center"}
                mb={"1rem"}
                fontWeight={"600"}
                borderBottom={"1px solid lightgray"}
              >
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
                  label="Name"
                  name="name"
                  autoComplete="email"
                  autoFocus
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
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
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleTogglePasswordVisibility}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
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
                  // fontWidth="40px"
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
