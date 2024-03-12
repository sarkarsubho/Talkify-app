import {
  Close as CloseIcon,
  ManageAccounts as ManageAccountsIcon,
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Group as GroupsIcon,
  Message as MessageIcon,
  ExitToApp as ExitToAppIcon,
} from "@mui/icons-material";
import {
  Box,
  Drawer,
  Grid,
  IconButton,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import React, { useState } from "react";
import { useLocation, Link as LinkComponent, Navigate } from "react-router-dom";
import { matBlack } from "../../constants/color";
// import { Link } from "../styles/StyledComponents";

const Link = styled(LinkComponent)`
  text-decoration: none;
  border-radius: 2rem;
  padding: 1rem 2rem;
  color: black;
  &:hover {
    color: rgba(0, 0, 0, 0.54);
  }
`;
export const adminTabs = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: <DashboardIcon />,
  },
  {
    name: "Users",
    path: "/admin/users",
    icon: <ManageAccountsIcon />,
  },
  {
    name: "Groups",
    path: "/admin/groups",
    icon: <GroupsIcon />,
  },
  {
    name: "Massages",
    path: "/admin/massages",
    icon: <MessageIcon />,
  },
];

const Sidebar = ({ w = "100%" }) => {
  const location = useLocation();
const logoutHandler =()=>{
    console.log("logout");
}
  return (
    <Stack width={w} direction={"column"} p={"3rem"} spacing={"3rem"}>
      <Typography variant="h5" textTransform={"uppercase"}>
        Talkify
      </Typography>
      <Stack spacing={"1rem"}>
        {adminTabs.map((e, i) => {
          const { name, path, icon } = e;
          return (
            <Link
              key={i}
              to={path}
              sx={
                location.pathname === path && {
                  bgcolor: matBlack,
                  color: "white",
                  ":hover": {
                    color: "white",
                  },
                }
              }
            >
              <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
                {icon}
                <Typography fontSize={"1.2rem"}>{name}</Typography>
              </Stack>
            </Link>
          );
        })}

        <Link
          sx={{
            bgcolor: "red",
            color: "white",
            ":hover": {
              color: "white",
            },
          }}
          onClick={logoutHandler}
        >
          <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
            <ExitToAppIcon />
            <Typography>LogOut</Typography>
          </Stack>
        </Link>
      </Stack>
    </Stack>
  );
};

const isAdmin =true;

const AdminLayout = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);
  const handleMobile = () => {
    setIsMobile(!isMobile);
  };
  const handleClose = () => {
    setIsMobile(false);
  };

  if(!isAdmin){
    return <Navigate to={"/admin"}></Navigate>
  }

  return (
    <Grid container minHeight={"100vh"}>
      <Box
        sx={{
          display: { xs: "block", md: "none" },
          position: "fixed",
          left: "1rem",
          top: "1rem",
        }}
      >
        <IconButton onClick={handleMobile}>
          {isMobile ? <CloseIcon /> : <MenuIcon></MenuIcon>}
        </IconButton>
      </Box>
      <Grid
        item
        md={4}
        lg={3}
        sx={{
          display: { xs: "none", md: "block" },
        }}
      >
        <Sidebar></Sidebar>
      </Grid>
      <Grid
        item
        xs={12}
        md={8}
        lg={9}
        sx={{
          //   display: { xs: "none", md: "block" },
          bgcolor: "#f5f5f5",
        }}
      >
        {children}
      </Grid>
      <Drawer open={isMobile} onClose={handleClose}>
        <Sidebar w="50vw"></Sidebar>
      </Drawer>
    </Grid>
  );
};

export default AdminLayout;
