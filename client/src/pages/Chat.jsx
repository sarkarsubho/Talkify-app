import React, { useRef } from "react";
import AppLayout from "../components/Layout/AppLayout";
import { IconButton, Stack } from "@mui/material";
import { grayColor } from "../constants/color";
import {
  AttachFile as AttachFileIcon,
  Send as SendIcon,
} from "@mui/icons-material";
import { InputBox } from "../components/styles/StyledComponents";
import { FileMenu } from "../components/dialogs/FileMenu";
import { sampleMessage } from "../constants/sampleData";
import MessageComponent from "../components/shared/MessageComponent";

const user = {
  _id: "hfksdanfsadkl",
  name: "subhankar sarkar",
};

const Chat = () => {
  const containerRef = useRef(null);

  return (
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
        {sampleMessage.map((message, index) => {
          return (
            <MessageComponent key={index} message={message} user={user}></MessageComponent>
          );
        })}
      </Stack>
      <form
        style={{
          height: "7%",
        }}
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

          <InputBox placeholder="Type Message here..."></InputBox>
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
