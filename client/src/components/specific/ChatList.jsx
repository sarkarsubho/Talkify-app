import { Stack } from "@mui/material";
import React from "react";

const ChatList = ({
  w = "100%",
  chats = [],
  chatId,
  onlineUsers = [],
  newMessageAlert = [
    {
      chatId: "",
      count: 0,
    },
  ],
  handleDeleteChat,
}) => {
  return (
    <Stack w={w} direction={"column"}>
      {chats?.map((e, i) => {
        return <div key={i}> Data</div>;
      })}
    </Stack>
  );
};

export default ChatList;
