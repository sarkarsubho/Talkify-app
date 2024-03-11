import { Avatar, AvatarGroup, Box, Stack } from "@mui/material";
import React from "react";

const AvatarCard = ({ avatar = [], max = 4 }) => {
  return (
    <Stack direction={"row"} spacing={0.5}>
      <AvatarGroup max={max} sx={{
        position:"relative"
      }}>
        <Box width={"5rem"} height={"3rem"}>
          {avatar.map((url, index) => {
            // console.log(url);
            return (
              <Avatar
                key={index}
                src={url}
                alt={`Avatar ${index}`}
                sx={{
                  width: "3rem",
                  height: "3rem",
                  border: "2px solid white",
                  position: "absolute",
                //   left: {
                //     xs: `${0.5 + index}rem`,
                //     sm: `${index}rem`,
                //   },
                }}
              ></Avatar>
            );
          })}
        </Box>
      </AvatarGroup>
    </Stack>
  );
};

export default AvatarCard;
