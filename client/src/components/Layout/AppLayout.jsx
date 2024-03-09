import React from "react";
import Header from "./Header";
import Title from "../shared/Title";
import { Grid } from "@mui/material";
import ChatList from "../specific/ChatList";

const AppLayout = () => (WrappedComponent) => {
  return (props) => (
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
        >
          <ChatList chats={[1,2,3]}></ChatList>
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
          bgcolor={"gray"}
        >
          third
        </Grid>
      </Grid>
    </div>
  );
};

export default AppLayout;
