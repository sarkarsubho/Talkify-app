import { Avatar, Stack, Typography } from "@mui/material";
import React from "react";
import {
  Face as FaceIcon,
  AlternateEmail as UsernameIcon,
  CalendarMonth as CalenderIcon,
} from "@mui/icons-material";
import moment from "moment";

const Profile = ({ bio }) => {
  return (
    <Stack alignItems={"center"} style={{

    }}>
      <Avatar
        sx={{
          width: 200,
          height: 200,
          objectFit: "contain",
          marginBottom: "1rem",
          border: "5px solid white",
        }}
      ></Avatar>
      <ProfileCard heading={"bio"} text={"have a good day"}></ProfileCard>
      <ProfileCard
        heading={"username"}
        text={"sarkarji"}
        icon={ <UsernameIcon/>}
      ></ProfileCard>
      <ProfileCard
        heading={"name"}
        text={"Subhankar sarkar"}
        icon={<FaceIcon/>}
      ></ProfileCard>
      <ProfileCard
        heading={"joined"}
        text={moment('2023-03-10T08:19:44.582Z').fromNow()}
        icon={<CalenderIcon/>}
      ></ProfileCard>
    </Stack>
  );
};

const ProfileCard = ({ text, icon, heading }) => {
  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      spacing={"1rem"}
      color={"white"}
      textAlign={"center"}
    >
      {icon && icon}

      <Stack>
        <Typography variant="body1">{text}</Typography>
        <Typography variant="caption" color={"gray"}>
          {heading}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default Profile;
