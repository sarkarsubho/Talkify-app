import React from "react";
import Header from "./Header";
import Title from "../shared/Title";
import { Grid } from "@mui/material";
import ChatList from "../specific/ChatList";
import { sampleChats } from "../../constants/sampleData";
import { useParams } from "react-router-dom";
import Profile from "../specific/Profile";

const AppLayout = () => (WrappedComponent) => {
  return (props) => {
    const params = useParams();
    const chatId = params.id;
    const handleDeleteChat = (e, _id, groupChat) => {
      e.preventDefault();
      console.log(e, _id, groupChat);
    };

    return (
      <div>
        <Title></Title>
        <Header></Header>
        <Grid container height={"calc(100vh - 4rem)"}>
          <Grid
            item
            sm={4}
            md={3}
            sx={{ display: { xs: "none", sm: "block" } }}
            height={"100%"}
            padding={"0.5rem"}
          >
            {
              <ChatList
                chats={sampleChats}
                chatId={chatId}
                newMessagesAlert={[
                  {
                    chatId: "1",
                    count: 4,
                  },
                ]}
                handleDeleteChat={handleDeleteChat}
              ></ChatList>
            }
          </Grid>
          <Grid item xs={12} sm={8} md={5} lg={6} height={"100%"}>
            <WrappedComponent {...props}></WrappedComponent>
          </Grid>
          <Grid
            item
            md={4}
            lg={3}
            sx={{ display: { xs: "none", md: "block" } }}
            height={"100%"}
            bgcolor={"black"}
            alignItems={"center"}
            width={"100%"}
          >
            <Profile />
          </Grid>
        </Grid>
      </div>
    );
  };
};

export default AppLayout;
