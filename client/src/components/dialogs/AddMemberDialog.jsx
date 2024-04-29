import {
  Button,
  Dialog,
  DialogTitle,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import UserItems from "../shared/UserItems";
import { useDispatch, useSelector } from "react-redux";
import { setIsAddMember } from "../../redux/reducers/misc";
import { useAsyncMutation, useErrors } from "../../hooks/hook";
import {
  useAddGroupMembersMutation,
  useAvailableFriendsQuery,
} from "../../redux/api/api";

const sampleUser = [1, 2];

const AddMemberDialog = ({ chatId }) => {
  const dispatch = useDispatch();

  const [selectedMembers, setSelectedMembers] = useState([]);
  const { isLoading, data, isError, error } = useAvailableFriendsQuery(chatId);

  const { isAddMember } = useSelector((state) => state.misc);
  const [addMembers, isLoadingAddMembers] = useAsyncMutation(
    useAddGroupMembersMutation
  );

  const selectMemberHandler = (member) => {
    setSelectedMembers((pre) =>
      pre.includes(member)
        ? pre.filter((currentMember) => currentMember !== member)
        : [...pre, member]
    );
  };
  const closeHandler = () => {
    dispatch(setIsAddMember(false));
  };
  const addMemberSubmitHandler = (id) => {
    addMembers("Adding Members...", { members: selectedMembers, chatId });
    closeHandler();
  };

  useErrors([
    {
      isError,
      error,
    },
  ]);
  console.log("the avil user data", data, selectedMembers);
  return (
    <Dialog open={isAddMember} onClose={closeHandler}>
      <Stack p={"2rem"} width={"20rem"} spacing={"2rem"}>
        <DialogTitle textAlign={"center"}>Add Member</DialogTitle>

        <Stack spacing={"1rem"}>
          {isLoading ? (
            <Skeleton></Skeleton>
          ) : data?.friends?.length > 0 ? (
            data?.friends?.map((e, i) => {
              return (
                <UserItems
                  key={i}
                  user={e}
                  handler={selectMemberHandler}
                  // pass the id here
                  isAdded={selectedMembers.includes(e._id)}
                ></UserItems>
              );
            })
          ) : (
            <Typography textAlign={"center"}>No Friends.</Typography>
          )}
        </Stack>
        <Stack
          direction={"row"}
          alignItems={"space-evenly"}
          justifyContent={"center"}
        >
          <Button color="error" onClick={closeHandler}>
            Cancel
          </Button>
          <Button
            variant="contained"
            disabled={isLoadingAddMembers}
            onClick={addMemberSubmitHandler}
          >
            Submit Changes
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default AddMemberDialog;
