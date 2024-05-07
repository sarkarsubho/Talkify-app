import React from "react";
import AdminLayout from "../../components/Layout/AdminLayout";
import {
  Box,
  Container,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import {
  AdminPanelSettings as AdminPanelSettingsIcon,
  Group as GroupIcon,
  Message as MessageIcon,
  Notifications as NotificationsIcon,
  Person as PersonIcon,
} from "@mui/icons-material";
import moment from "moment";
import {
  CurveButton,
  SearchField,
} from "../../components/styles/StyledComponents";
import { matBlack } from "../../constants/color";
import { DoughnutChart, LineChart } from "../../components/specific/Charts";
import { useFetchData } from "6pp";
import { useErrors } from "../../hooks/hook";
import { server } from "../../constants/config";

const Dashboard = () => {
  const { loading, data, error } = useFetchData(
    `${server}/api/v1/admin/stats`,
    "dashboard-stats"
  );
  const { stats } = data || {};
  // console.log(data);
  useErrors([
    {
      isError: error,
      error: error,
    },
  ]);

  const AppBar = (
    <Paper
      elevation={3}
      sx={{ padding: "2rem", margin: "2rem 0", borderRadius: "1rem" }}
    >
      <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
        <AdminPanelSettingsIcon
          sx={{ fontSize: "3rem" }}
        ></AdminPanelSettingsIcon>

        <SearchField placeholder="Search..."></SearchField>
        <CurveButton> Search</CurveButton>

        <Box flexGrow={1}></Box>
        <Typography
          sx={{
            display: {
              xs: "none",
              lg: "block",
            },
          }}
        >
          {moment().format("MMMM Do YYYY")}{" "}
        </Typography>

        <NotificationsIcon />
      </Stack>
    </Paper>
  );

  const widgets = (
    <Stack
      direction={{
        xs: "column",
        sm: "row",
      }}
      spacing={"2rem"}
      justifyContent={"center"}
      alignItems={"center"}
      margin={"2rem 0"}
      width={"100%"}
    >
      <Widget
        title={"Users"}
        value={stats?.usersCount}
        icon={<PersonIcon></PersonIcon>}
      ></Widget>
      <Widget title={"Chats"} value={stats?.totalChatsCount} icon={<GroupIcon />}></Widget>
      <Widget title={"Messages"} value={stats?.messagesCount} icon={<MessageIcon />}></Widget>
    </Stack>
  );
  return (
    <AdminLayout>
      {loading ? (
        <Skeleton height={"100vh"} />
      ) : (
        <Container component={"main"}>
          {AppBar}
          <Stack
            direction={{
              xs: "column",
              lg: "row",
            }}
            flexWrap={"wrap"}
            justifyContent={"center"}
            alignItems={{
              xs: "center",
              lg: "stretch",
            }}
            sx={{
              gap: "2rem",
            }}
          >
            <Paper
              elevation={3}
              sx={{
                padding: "2rem 3rem",
                borderRadius: "1rem",
                width: "100%",
                maxWidth: "45rem",
              }}
            >
              <Typography>Last Messages</Typography>
              <LineChart value={stats?.messagesChart || []}></LineChart>
            </Paper>
            <Paper
              elevation={3}
              sx={{
                padding: "1rem",
                borderRadius: "1rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: {
                  xs: "100%",
                  sm: "50%",
                },
                position: "relative",
                width: "100%",
                maxWidth: "25rem",
                height: "25rem",
              }}
            >
              <DoughnutChart
                labels={["Single Chat", "Group Chat"]}
                value={[
                  stats?.totalChatsCount - stats?.groupsCount || 0,
                  stats?.groupsCount || 0,
                ]}
              />
              <Stack
                position={"absolute"}
                direction={"row"}
                justifyContent={"center"}
                alignItems={"center"}
                spacing={"0.5rem"}
                width={"100%"}
                height={"100%"}
              >
                <GroupIcon /> <Typography>VS</Typography> <PersonIcon />
              </Stack>
            </Paper>
          </Stack>
          {widgets}
        </Container>
      )}
    </AdminLayout>
  );
};

const Widget = ({ title, value, icon }) => (
  <Paper
    sx={{
      padding: "2rem",
      margin: "2rem 0",
      borderRadius: "1rem",
      width: "20rem",
    }}
  >
    <Stack alignItems={"center"} spacing={"1rem"}>
      <Typography
        sx={{
          color: matBlack,
          borderRadius: "50%",
          border: `5px solid ${matBlack}`,
          width: "5rem",
          height: "5rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {value}
      </Typography>
      <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
        {icon}
        <Typography>{title}</Typography>
      </Stack>
    </Stack>
  </Paper>
);
export default Dashboard;
