import React, { memo, useState } from "react";
import AppLayout from "../components/Layout/AppLayout";
import {
  Box,
  Drawer,
  Grid,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { matBlack, orange } from "../constants/color";
import { useNavigate } from "react-router-dom";
import {
  KeyboardBackspace as KeyboardBackspaceIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";

const Groups = () => {
  const navigate = useNavigate();
  const [isMobileMenu, setISMobileMenu] = useState(false);

  const handleMobile = () => {
    setISMobileMenu((prev) => !prev);
  };
  const handleMobileClose = () => {
    setISMobileMenu(false);
  };

  const navigateBack = () => {
    navigate("/");
  };

  const IconBtns = (
    <>
      <Box
        sx={{
          display: {
            xs: "block",
            sm: "none",
            position: "fixed",
            right: "1rem",
            top: "1rem",
          },
        }}
      >
        <IconButton onClick={handleMobile}>
          <MenuIcon></MenuIcon>
        </IconButton>
      </Box>
      <Tooltip title="back">
        <IconButton
          sx={{
            position: "absolute",
            top: "2rem",
            left: "2rem",
            bgcolor: matBlack,
            color: "white",
            ":hover": {
              bgcolor: "rgba(0,0,0,0.7)",
            },
          }}
          onClick={navigateBack}
        >
          <KeyboardBackspaceIcon></KeyboardBackspaceIcon>
        </IconButton>
      </Tooltip>
    </>
  );

  return (
    <Grid container height={"100vh"}>
      <Grid
        item
        sx={{
          display: {
            xs: "none",
            sm: "block",
          },
        }}
        sm={4}
        bgcolor={orange}
      >
        <GroupList></GroupList>
      </Grid>
      <Grid
        item
        xs={12}
        sm={8}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          padding: "1rem 3rem",
        }}
      >
        {IconBtns}
      </Grid>

      <Drawer
        sx={{
          display: {
            xs: "block",
            sm: "none",
          },
        }}
        open={isMobileMenu}
        onClose={handleMobileClose}
      >
        <GroupList w={"50vw"}></GroupList>
      </Drawer>
    </Grid>
  );
};

const GroupList = ({ w = "100%", myGroups = [], chatId }) => {
  return (
    <Stack>
      {myGroups.length > 0 ? (
        myGroups.map((group) => {
          return <GroupListItem></GroupListItem>;
        })
      ) : (
        <Typography textAlign={"center"} padding={"1rem"}>
          No Groups
        </Typography>
      )}
    </Stack>
  );
};

const GroupListItem = memo( ({ group, chatId }) => {
  const { name, avatar, _id } = group;
  return <Stack></Stack>;
});

export default AppLayout()(Groups);
