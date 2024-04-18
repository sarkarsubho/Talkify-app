import { Grid, Skeleton, Stack } from "@mui/material";
import React from "react";
import { BouncingSkeleton } from "../styles/StyledComponents";

const LayoutLoader = () => {
  return (
    <Grid container height={"calc(100vh - 4rem)"} spacing={"1rem"}>
      <Grid
        item
        sm={4}
        md={3}
        sx={{ display: { xs: "none", sm: "block" } }}
        height={"100%"}
      >
        <Skeleton variant="rectangular" height={"100vh"}></Skeleton>
      </Grid>
      <Grid item xs={12} sm={8} md={5} lg={6} height={"100%"}>
        <Stack spacing={"1rem"} overflow={"hidden"}>
          {Array.from({ length: 10 }).map((e, i) => {
            return (
              <Skeleton
                key={i}
                variant="rounded"
                height={"calc((100vh/10))"}
              ></Skeleton>
            );
          })}
        </Stack>
      </Grid>
      <Grid
        item
        md={4}
        lg={3}
        sx={{ display: { xs: "none", md: "block" } }}
        height={"100%"}
        // bgcolor={"gray"}
      >
        <Skeleton variant="rectangular" height={"100vh"}></Skeleton>
      </Grid>
    </Grid>
  );
};

const TypingLoader = () => {
  return (
    <Stack
      spacing={"0.5rem"}
      direction={"row"}
      padding={"0.5rem"}
      justifyContent={"center"}
    >
      <BouncingSkeleton
        variant="circular"
        width={15}
        height={15}
        style={{
          animationDelay: "0.1s",
        }}
      ></BouncingSkeleton>
      
      <BouncingSkeleton
        variant="circular"
        width={15}
        height={15}
        style={{
          animationDelay: "0.2s",
        }}
      ></BouncingSkeleton>

      <BouncingSkeleton
        variant="circular"
        width={15}
        height={15}
        style={{
          animationDelay: "0.4s",
        }}
      ></BouncingSkeleton>

      <BouncingSkeleton
        variant="circular"
        width={15}
        height={15}
        style={{
          animationDelay: "0.6s",
        }}
      ></BouncingSkeleton>
      
    </Stack>
  );
};

export { LayoutLoader, TypingLoader };
