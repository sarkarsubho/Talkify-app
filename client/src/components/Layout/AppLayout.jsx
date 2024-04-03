import { Drawer, Grid, Skeleton } from "@mui/material";
import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { sampleChats } from "../../constants/sampleData";
import Title from "../shared/Title";
import ChatList from "../specific/ChatList";
import Profile from "../specific/Profile";
import Header from "./Header";
import { useMyChatsQuery } from "../../redux/api/api";
import { useDispatch, useSelector } from "react-redux";
import { setIsMobile } from "../../redux/reducers/misc";
import { useErrors } from "../../hooks/hook";
import { getSocket } from "../../socket";

const AppLayout = () => (WrappedComponent) => {
  return (props) => {
    const params = useParams();
    const chatId = params.id;
    const dispatch = useDispatch();
    const { isMobile } = useSelector((state) => state.misc);
    const { user } = useSelector((state) => state.auth);

    const socket = getSocket();

    console.log("socket", socket.id);

    const { isLoading, data, isError, error, refetch } = useMyChatsQuery("");

    const handleDeleteChat = (e, _id, groupChat) => {
      e.preventDefault();
      console.log(e, _id, groupChat);
    };

    const location = useLocation();
    // console.log(location);

    const handleMobileClose = () => {
      dispatch(setIsMobile(false));
    };

    useErrors([{ isError, error }]);

    return (
      <div>
        <Title></Title>
        <Header></Header>
        {isLoading ? (
          <Skeleton />
        ) : (
          <Drawer open={isMobile} onClose={handleMobileClose}>
            <ChatList
              w="70vw"
              chats={data?.chats}
              chatId={chatId}
              newMessagesAlert={[
                {
                  chatId: "1",
                  count: 4,
                },
              ]}
              handleDeleteChat={handleDeleteChat}
            />
          </Drawer>
        )}
        <Grid container height={"calc(100vh - 4rem)"}>
          <Grid
            item
            sm={4}
            md={3}
            sx={{ display: { xs: "none", sm: "block" } }}
            height={"100%"}
            // padding={"0.5rem"}
          >
            {isLoading ? (
              <Skeleton />
            ) : (
              <ChatList
                chats={data?.chats}
                chatId={chatId}
                newMessagesAlert={[
                  {
                    chatId: "1",
                    count: 4,
                  },
                ]}
                handleDeleteChat={handleDeleteChat}
              ></ChatList>
            )}
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
            <Profile user={user} />
          </Grid>
        </Grid>
      </div>
    );
  };
};

export default AppLayout;
