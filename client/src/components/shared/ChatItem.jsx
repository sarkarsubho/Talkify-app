import { Box, Stack, Typography } from "@mui/material";
import React, { memo } from "react";
import { Link } from "../styles/StyledComponents";
import AvatarCard from "./AvatarCard";
import { lightGreen } from "../../constants/color";
import { motion } from "framer-motion";

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
  // console.log("redirectID", _id);
  return (
    <Link
      to={`../chat/${_id}`}
      sx={{
        padding: "0.5rem",
        borderBottom: "2px solid gray",
      }}
      onContextMenu={(e) => {
        console.log("context menu opened");
        handleDeleteChat(e, _id, groupChat);
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: "-100%" }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{delay:index*0.1}}
        style={{
          display: "flex",
          gap: "1rem",
          alignItems: "center",
          padding: ".5rem",
          backgroundColor: sameSender ? "teal" : "unset",
          color: sameSender ? "white" : "unset",
          position: "relative",
          borderRadius: "4px",
        }}
      >
        {/* <Avatar></Avatar> */}
        <AvatarCard avatar={avatar}></AvatarCard>
        <Stack>
          <Typography>{name}</Typography>
          {newMessageAlert && (
            <Typography> {newMessageAlert.count} New Message </Typography>
          )}
        </Stack>

        {isOnline && (
          <Box
            sx={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: lightGreen,
              position: "absolute",
              top: "50%",
              right: "1rem",
              transform: "translateY(-50%)",
            }}
          />
        )}
      </motion.div>
    </Link>
  );
};

export default memo(ChatItem);
