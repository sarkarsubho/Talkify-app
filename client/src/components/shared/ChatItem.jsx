import { Avatar, Box, Stack, Typography } from "@mui/material";
import React, { memo } from "react";
import { Link } from "../styles/StyledComponents";
// import { Link } from "react-router-dom";
import AvatarCard from "./AvatarCard";
import { useNavigate } from "react-router-dom";

const ChatItem = ({
  avatar = [],
  name,
  _id,
  groupChat = false,
  sameSender,
  isOnline,
  newMessageAlert,
  index = 0,
  handleDeleteChat,
}) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
   console.log("Chat Item handleNAvigate"); 
    navigate(`chat/${_id}`);
  };
  console.log("redirectID", _id);
  return (
    <>
      <Box
        // to={`chat/${_id}`}
        // target="_blank"
        sx={{
          padding: "0",
        }}

        // replace={true}
        onClick={handleNavigate}
        onContextMenu={(e) =>{
          console.log("context menu opened");
          handleDeleteChat(e, _id, groupChat)}}
      >
        <div
          style={{
            display: "flex",
            gap: "1rem",
            alignItems: "center",
            padding: ".5rem",
            // backgroundColor: sameSender ? "teal" : "unset",
            // color: sameSender ? "white" : "unset",
            position: "relative",
            borderRadius: "4px",
          }}
        >
          {/* <Avatar></Avatar> */}
          <AvatarCard avatar={avatar}></AvatarCard>
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
        </div>
      </Box>
    </>
  );
};

export default memo(ChatItem);
