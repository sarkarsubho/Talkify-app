import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import { orange } from "../../constants/color";
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Add as AddIcon,
  Group as GroupIcon,
  Logout as LogoutIcon,
  Notifications as NotificationsIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  function handleMobile() {
    console.log(" mobile");
  }
  const openSearchDialog = () => {
    console.log(" openNewDialog");
  };
  const openNewGroup = () => {
    console.log(" openNewGroup");
  };
  const openNotifications = () => {
    console.log(" openNotifications");
  };
  const navigateToGroup = () => {
    console.log(" navigateToGroup");
    navigate("/groups");
  };
  const handleLogout = () => {
    console.log(" handleLogout");
  };
  return (
    <>
      <Box sx={{ flexGrow: 1 }} height={"4rem"}>
        <AppBar
          position="static"
          sx={{
            bgcolor: orange,
          }}
        >
          <Toolbar>
            <Typography
              variant="h6"
              sx={{
                display: { xs: "none", sm: "block" },
              }}
            >
              {" "}
              Talkify
            </Typography>
            <Box
              sx={{
                display: { xs: "block", sm: "none" },
              }}
            >
              <IconButton color="inherit" onClick={handleMobile}>
                <MenuIcon></MenuIcon>
              </IconButton>
            </Box>

            <Box flexGrow={1}></Box>
            <Box>
              <IconBtn
                title={"Search"}
                icon={<SearchIcon />}
                onClick={openSearchDialog}
              ></IconBtn>

              <IconBtn
                title={"New Group"}
                icon={<AddIcon />}
                onClick={openNewGroup}
              ></IconBtn>

              <IconBtn
                title="Manage Group"
                icon={<GroupIcon />}
                onClick={navigateToGroup}
              ></IconBtn>
              <IconBtn
                title="Notifications"
                icon={<NotificationsIcon />}
                onClick={openNotifications}
              ></IconBtn>

              <IconBtn
                title="Logout"
                icon={<LogoutIcon />}
                onClick={handleLogout}
              ></IconBtn>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

const IconBtn = ({ title, icon, onClick }) => {
  return (
    <Tooltip title={title}>
      <IconButton color="inherit" size="large" onClick={onClick}>
        {icon}
      </IconButton>
    </Tooltip>
  );
};
export default Header;
