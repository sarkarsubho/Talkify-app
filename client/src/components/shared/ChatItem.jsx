import { Avatar, Box, Stack, Typography } from "@mui/material";
import React from "react";
import { Link } from "../styles/StyledComponents";

const ChatItem = ({
  avatar = [],
  name,
  _id,
  groupChat = false,
  sameSender,
  isOnline,
  newMessageAlert,
  index = 0,
  handleDeleteChatOpen,
}) => {
  return (
    <Link to={`chat/${_id}`}>
      <div
        style={{
          display: "flex",
          gap: "1rem",
          alignItems: "center",
          padding: "1rem",
          backgroundColor: sameSender ? "black" : "unset",
          color: sameSender ? "white" : "unset",
          position: "relative",
        }}
      ></div>
      <Avatar></Avatar>
      <Stack>
        <Typography>{name}</Typography>
        {newMessageAlert && (
          <Typography> {newMessageAlert.count} New Message</Typography>
        )}
      </Stack>

      {isOnline && (
        <Box
          sx={{
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            backgroundColor: "green",
            position: "absolute",
            top: "50%",
            right: "1rem",
            transform: "translateY(-50%)",
          }}
        />
      )}
    </Link>
  );
};

export default ChatItem;
