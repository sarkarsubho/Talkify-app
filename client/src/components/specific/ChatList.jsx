import { Stack } from "@mui/material";
import React from "react";
import ChatItem from "../shared/ChatItem";
import { backgroundGradient } from "../../constants/color";
import { Link } from "react-router-dom";

const ChatList = ({
  w = "100%",
  chats = [],
  chatId,
  onlineUsers = [],
  newMessagesAlert = [
    {
      chatId: "1",
      count: 0,
    },
  ],
  handleDeleteChat,
}) => {
  return (
    <Stack w={w} direction={"column"} overflow={"auto"} height={"100%"} sx={{
      // backgroundImage:backgroundGradient
    }}>
      {
       chats?.map((e, i) => {
        const { avatar, name, _id, groupChat, members } = e;
        const newMessageAlert = newMessagesAlert.find(
          ({ chatId }) => chatId === _id
        );
        
        console.log(e);
        const isOnline = true;
        return (
          <ChatItem
            key={i}
            newMessageAlert={newMessageAlert}
            isOnline={isOnline}
            avatar={avatar}
            name={name}
            groupChat={groupChat}
            sameSender={chatId === _id}
            handleDeleteChat={handleDeleteChat}
            _id={_id}
          ></ChatItem>
        );
      })}
    </Stack>
  );
};

export default ChatList;
