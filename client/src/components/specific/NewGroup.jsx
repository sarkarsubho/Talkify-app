import {
  Button,
  Dialog,
  DialogTitle,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import UserItems from "../shared/UserItems";
import { useDispatch, useSelector } from "react-redux";
import {
  useAvailableFriendsQuery,
  useNewGroupMutation,
} from "../../redux/api/api";
import { useAsyncMutation, useErrors } from "../../hooks/hook";
import { setIsNewGroup } from "../../redux/reducers/misc";
import toast from "react-hot-toast";

const NewGroup = () => {
  const dispatch = useDispatch();
  const { isNewGroup } = useSelector((state) => state.misc);
  const { isError, isLoading, error, data } = useAvailableFriendsQuery("");

  const [createNewGroup, isLoadingNewGroup] = useAsyncMutation(useNewGroupMutation);

  const [groupName, setGroupName] = useState("");
  const [selectedMembers, setSelectedMembers] = useState([]);

  const errors = [
    {
      isError,
      error,
    },
  ];
  useErrors(errors);

  const selectMemberHandler = (member) => {
    setSelectedMembers((pre) =>
      pre.includes(member)
        ? pre.filter((currentMember) => currentMember !== member)
        : [...pre, member]
    );
  };
  // console.log(groupName, selectedMembers);
  const submitHandler = () => {
    if (!groupName) return toast.error("Group name is required...");
    if (selectedMembers.length < 2)
      return toast.error("Groups must contain at least 3 members...");

    // create groups
    createNewGroup("Creating New Group...", {
      name: groupName,
      members: selectedMembers,
    });

    closeHandler();
  };

  const closeHandler = () => {
    dispatch(setIsNewGroup(false));
  };
  return (
    <Dialog open={isNewGroup} onClose={closeHandler}>
      <Stack p={{ xs: "1rem", sm: "3rem" }} width={"25rem"} spacing={"2rem"}>
        <DialogTitle textAlign={"center"} variant="h4">
          New Group
        </DialogTitle>
        <TextField
          label={"Group Name"}
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        ></TextField>
        <Typography variant="body1">Members</Typography>
        <Stack>
          {isLoading ? (
            <Skeleton />
          ) : (
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
          )}
        </Stack>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Button variant="text" color="error" onClick={closeHandler}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={submitHandler}
            disabled={isLoadingNewGroup}
          >
            Create
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default NewGroup;
