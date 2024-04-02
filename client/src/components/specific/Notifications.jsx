import {
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  ListItem,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import React, { memo, useState } from "react";
import { sampleNotifications } from "../../constants/sampleData";
import {
  useAcceptFriendRequestMutation,
  useGetNotificationsQuery,
} from "../../redux/api/api";
import { useErrors } from "../../hooks/hook";
import { useDispatch, useSelector } from "react-redux";
import { setIsNotification } from "../../redux/reducers/misc";
import toast from "react-hot-toast";

const Notifications = () => {
  const { isNotification } = useSelector((state) => state.misc);
  const dispatch = useDispatch();
  const { isLoading, data, error, isError } = useGetNotificationsQuery();

  const [acceptRequest] = useAcceptFriendRequestMutation();

  const friendRequestHandler = async ({ _id, accept }) => {
    dispatch(setIsNotification(false));

    try {
      const res = await acceptRequest({ requestId: _id, accept });

      if (res.data.success) {
        console.log("have to use Socket here.");
        toast.success(res.data.message);
      } else {
        toast.error(res.data?.error || "Something went wrong...");
      }
    } catch (error) {
      toast.error("Something went wrong...");
      console.log(error);
    }
  };
  console.log(data);

  const notificationCloseHandler = () => {
    dispatch(setIsNotification(false));
  };
  useErrors([{ error, isError }]);
  console.log(isNotification, "notification data", data);

  return (
    <Dialog open={isNotification} onClose={notificationCloseHandler}>
      <Stack p={{ xs: "1rem", sm: "2rem" }} maxWidth={"25rem"}>
        <DialogTitle>Notifications</DialogTitle>
        {isLoading ? (
          <Skeleton />
        ) : (
          <>
            {data?.allRequests?.length > 0 ? (
              data?.allRequests?.map((e) => (
                <NotificationItem
                  sender={e.sender}
                  _id={e._id}
                  key={e._id}
                  handler={friendRequestHandler}
                ></NotificationItem>
              ))
            ) : (
              <Typography textAlign={"center"}> No notifications</Typography>
            )}
          </>
        )}
      </Stack>
    </Dialog>
  );
};

const NotificationItem = memo(({ sender, _id, handler }) => {
  const { name, avatar } = sender;

  return (
    <ListItem>
      <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={"1rem"}
        width={"100%"}
      >
        <Avatar src={avatar}></Avatar>
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
          {`${name} send you a friend request.`}
        </Typography>
        <Stack direction={"row"} sx={{}}>
          <Button
            color="success"
            onClick={() => {
              handler({ _id, accept: true });
            }}
          >
            Accept
          </Button>
          <Button
            color="error"
            onClick={() => {
              handler({ _id, accept: false });
            }}
          >
            Reject
          </Button>
        </Stack>
      </Stack>
    </ListItem>
  );
});

export default Notifications;
