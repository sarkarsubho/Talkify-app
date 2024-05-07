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
import React, { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAsyncMutation, useErrors } from "../../hooks/hook";
import {
  useAcceptFriendRequestMutation,
  useGetNotificationsQuery,
} from "../../redux/api/api";
import { setIsNotification } from "../../redux/reducers/misc";

const Notifications = () => {
  const { isNotification } = useSelector((state) => state.misc);
  const dispatch = useDispatch();
  const { isLoading, data, error, isError } = useGetNotificationsQuery();

  const [acceptRequest] = useAsyncMutation(useAcceptFriendRequestMutation);

  const friendRequestHandler = async ({ _id, accept }) => {
    dispatch(setIsNotification(false));
    await acceptRequest("Accepting friend request...", {
      requestId: _id,
      accept,
    });
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
