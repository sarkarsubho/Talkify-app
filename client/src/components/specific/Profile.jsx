import { Avatar, Stack, Typography } from "@mui/material";
import React from "react";
import {
  Face as FaceIcon,
  AlternateEmail as UsernameIcon,
  CalendarMonth as CalenderIcon,
} from "@mui/icons-material";
import moment from "moment";
import { transFormImage } from "../../lib/features";

const Profile = ({ user }) => {
  return (
    <Stack alignItems={"center"} p={"2rem"} spacing={"2rem"} style={{}}>
      <Avatar
        sx={{
          width: 200,
          height: 200,
          objectFit: "contain",
          marginBottom: "1rem",
          border: "5px solid white",
        }}
        src={transFormImage(user?.avatar?.url)}
      ></Avatar>
      <ProfileCard  heading={"bio"} text={user?.bio} ></ProfileCard>
      <ProfileCard
        heading={"username"}
        text={user?.username}
        icon={<UsernameIcon />}
      ></ProfileCard>
      <ProfileCard
        heading={"name"}
        text={user?.name}
        icon={<FaceIcon />}
      ></ProfileCard>
      <ProfileCard
        heading={"joined"}
        text={moment(user.createdAt).fromNow()}
        icon={<CalenderIcon />}
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
