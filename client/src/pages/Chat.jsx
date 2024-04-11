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
import { useChatDetailsQuery, useGetMessagesQuery } from "../redux/api/api";
import { useErrors, useSocketEvents } from "../hooks/hook";
import { useInfiniteScrollTop } from "6pp";
import { useDispatch } from "react-redux";
import { setIsFileMenu } from "../redux/reducers/misc";

// const user = {
//   _id: "hfksdanfsadkl",
//   name: "subhankar sarkar",
// };

const Chat = ({ chatId, user }) => {
  const containerRef = useRef(null); // using this ref for infinite scrolling.
  const socket = getSocket();
  const dispatch = useDispatch();

  const [message, setMessage] = useState("");
  const [page, setPage] = useState(1);
  const [messages, setMessages] = useState([]);
  const [fileMenuAnchor, setFileMenuAnchor] = useState(null);

  const chatDetails = useChatDetailsQuery({ chatId, skip: !chatId });
  const oldMessagesChunk = useGetMessagesQuery({ chatId, page: page });

  // console.log(chatDetails.data.chat.members);
  // console.log(messages);
  const members = chatDetails?.data?.chat?.members;

  const { data: oldMessages, setData: setOldMessages } = useInfiniteScrollTop(
    containerRef,
    oldMessagesChunk.data?.totalPages,
    page,
    setPage,
    oldMessagesChunk.data?.messages
  );

  // store all the errors
  const errors = [
    { isError: chatDetails.isError, error: chatDetails.error },
    { isError: oldMessagesChunk.isError, error: oldMessagesChunk.error },
  ];

  const handleFileOpen = (e) => {
    dispatch(setIsFileMenu(true));
    setFileMenuAnchor(e.currentTarget);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(message);
    if (!message.trim()) return;

    // emiting message to the server
    socket.emit(NEW_Message, { chatId, members, message });
    setMessage("");
  };

  useEffect(() => {
    return () => {
      setMessage("");
      setMessages([]);
      setOldMessages([]);
      setPage(1);
    };
  }, [chatId]);

  // this function should not create every time thats why using useCallback. for event handlers

  const newMessagesHandler = useCallback((data) => {
    console.log(data);
    if (data.chatId !== chatId) return;
    setMessages((prev) => [...prev, data.message]);
  }, []);

  const eventHandlers = { [NEW_Message]: newMessagesHandler };
  useSocketEvents(socket, eventHandlers);
  useErrors(errors);

  const allMessages = [...oldMessages, ...messages];

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
        height={"90%"}
        sx={{
          overflowX: "hidden",
          overflowY: "auto",
        }}
      >
        {allMessages.map((message, index) => {
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
          height: "10%",
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
            onClick={handleFileOpen}
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
      <FileMenu anchorE1={fileMenuAnchor} chatId={chatId}></FileMenu>
    </>
  );
};

// export default Chat;
export default AppLayout()(Chat);
