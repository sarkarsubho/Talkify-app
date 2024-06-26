import { Add as AddIcon, Remove as RemoveIcon } from "@mui/icons-material";
import {
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import React, { memo } from "react";
import { transFormImage } from "../../lib/features";

const UserItems = ({
  user,
  handler,
  handlerIsLoading,
  isAdded = false,
  styling = {},
}) => {
  return (
    <ListItem>
      <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={"1rem"}
        width={"100%"}
        {...styling}
      >
        <Avatar src={transFormImage(user.avatar)}></Avatar>
        <Typography
          variant="body1"
          sx={{
            flexGrow: 1,
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {user.name}
        </Typography>
        <IconButton
          size="small"
          sx={{
            bgcolor: isAdded ? "error.main" : "primary.main",
            color: "white",
            "&:hover": {
              bgcolor: isAdded ? "error.dark" : "primary.dark",
            },
          }}
          // give here actual _id
          onClick={() => handler(user._id)}
          disabled={handlerIsLoading}
        >
          {isAdded ? <RemoveIcon></RemoveIcon> : <AddIcon></AddIcon>}
        </IconButton>
      </Stack>
    </ListItem>
  );
};

export default memo(UserItems);
