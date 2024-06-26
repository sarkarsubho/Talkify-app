import {
  AppBar,
  Backdrop,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
  Badge,
} from "@mui/material";
import React, { Suspense, useState } from "react";
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
import axios from "axios";
import { server } from "../../constants/config";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { userNotExists } from "../../redux/reducers/auth";
import {
  setIsMobile,
  setIsNewGroup,
  setIsNotification,
  setIsSearch,
} from "../../redux/reducers/misc";

const SearchDialog = React.lazy(() => import("../specific/Search"));
const NotificationsDialog = React.lazy(() =>
  import("../specific/Notifications")
);
const NewGroupDialog = React.lazy(() => import("../specific/NewGroup"));

// import SearchDialog from;

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isSearch, isNotification, isNewGroup } = useSelector(
    (state) => state.misc
  );
  const { notificationCount } = useSelector((state) => state.chat);

  function handleMobile() {
    console.log(" mobile");
    dispatch(setIsMobile(true));
  }
  const openSearchDialog = () => {
    console.log(" openNewDialog");
    dispatch(setIsSearch(true));
  };
  const openNewGroup = () => {
    console.log(" openNewGroup");
    dispatch(setIsNewGroup(true));
  };
  const openNotifications = () => {
    console.log(" openNotifications");
    dispatch(setIsNotification(true));
  };
  const navigateToGroup = () => {
    console.log(" navigateToGroup");
    navigate("/groups");
  };
  const handleLogout = () => {
    // console.log(" handleLogout");
    axios
      .get(`${server}/api/v1/user/logout`, { withCredentials: true })
      .then(({ data }) => {
        toast.success(data.message);
        dispatch(userNotExists());
      })
      .catch((er) => {
        toast.error(
          error?.response?.data?.message || "Something went wrong..."
        );
      });
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
                value={notificationCount}
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

      {isSearch && (
        <Suspense fallback={<Backdrop open></Backdrop>}>
          <SearchDialog></SearchDialog>
        </Suspense>
      )}
      {/* notification */}
      {isNotification && (
        <Suspense fallback={<Backdrop open></Backdrop>}>
          <NotificationsDialog></NotificationsDialog>
        </Suspense>
      )}
      {/* newGroup */}
      {isNewGroup && (
        <Suspense fallback={<Backdrop open></Backdrop>}>
          <NewGroupDialog></NewGroupDialog>
        </Suspense>
      )}
    </>
  );
};

const IconBtn = ({ title, icon, onClick, value }) => {
  return (
    <Tooltip title={title}>
      <IconButton color="inherit" size="large" onClick={onClick}>
        {value ? (
          <Badge badgeContent={value} color="error">
            {icon}
          </Badge>
        ) : (
          icon
        )}
      </IconButton>
    </Tooltip>
  );
};
export default Header;
