import {
  AttachFile as AttachFileIcon,
  Send as SendIcon,
} from "@mui/icons-material";
import { IconButton, Skeleton, Stack } from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import AppLayout from "../components/Layout/AppLayout";
import { FileMenu } from "../components/dialogs/FileMenu";
import MessageComponent from "../components/shared/MessageComponent";
import { InputBox } from "../components/styles/StyledComponents";
import { grayColor } from "../constants/color";
import { sampleMessage } from "../constants/sampleData";
import { getSocket } from "../socket";
import { NEW_Message } from "../constants/events";
import { useChatDetailsQuery } from "../redux/api/api";
import { useSocketEvents } from "../hooks/hook";

const user = {
  _id: "hfksdanfsadkl",
  name: "subhankar sarkar",
};

const Chat = ({ chatId }) => {
  const containerRef = useRef(null);
  const socket = getSocket();
  const chatDetails = useChatDetailsQuery({ chatId, skip: !chatId });

  // console.log(chatDetails.data.chat.members);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  console.log(messages);
  const members = chatDetails?.data?.chat?.members;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(message);
    if (!message.trim()) return;

    // emiting message to the server
    socket.emit(NEW_Message, { chatId, members, message });
    setMessage("");
  };

  // this function should not create every time thats why using useCallback. for event handlers

  const newMessagesHandler = useCallback((data) => {
    console.log(data);

    setMessages((prev) => [...prev, data.message]);
  });

  const eventHandlers = { [NEW_Message]: newMessagesHandler };
  useSocketEvents(socket, eventHandlers);
  // useEffect(() => {
  //   socket.on(NEW_Message, newMessagesHandler);

  //   return () => {
  //     socket.off(NEW_Message, newMessagesHandler);
  //   };
  // }, []);

  return chatDetails.isLoading ? (
    <Skeleton />
  ) : (
    <>
      <Stack
        ref={containerRef}
        boxSizing={"border-box"}
        padding={"1rem"}
        spacing={"1rem"}
        bgcolor={grayColor}
        height={"93%"}
        sx={{
          overflowX: "hidden",
          overflowY: "auto",
        }}
      >
        {messages.map((message, index) => {
          return (
            <MessageComponent
              key={index}
              message={message}
              user={user}
            ></MessageComponent>
          );
        })}
      </Stack>
      <form
        style={{
          height: "7%",
        }}
        onSubmit={handleSubmit}
      >
        <Stack
          direction={"row"}
          height={"100%"}
          padding={".5rem"}
          alignItems={"center"}
          position={"relative"}
        >
          <IconButton
            sx={{
              position: "absolute",
              left: "1rem",
              rotate: "30deg",
            }}
          >
            <AttachFileIcon></AttachFileIcon>
          </IconButton>

          <InputBox
            placeholder="Type Message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></InputBox>
          <IconButton
            type="submit"
            sx={{
              rotate: "-30deg",
              bgcolor: "teal",
              marginLeft: "1rem",
              padding: "0.5rem",
              "&:hover": {
                bgcolor: "green",
              },
            }}
          >
            <SendIcon></SendIcon>
          </IconButton>
        </Stack>
      </form>
      <FileMenu></FileMenu>
    </>
  );
};

// export default Chat;
export default AppLayout()(Chat);
