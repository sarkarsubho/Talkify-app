import { Button, Dialog, DialogTitle, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import UserItems from "../shared/UserItems";

const sampleUser = [1, 2, 3, 5, 5];

const AddMemberDialog = ({ addMember, isLoadingAddMember, chatId }) => {
  const [members, setMembers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);

  const selectMemberHandler = (member) => {
    setSelectedMembers((pre) =>
      pre.includes(member)
        ? pre.filter((currentMember) => currentMember !== member)
        : [...pre, member]
    );
  };
 const closeHandler = () => {
    setSelectedMembers([]);
    setMembers([])
  };
  const addMemberHandler = (id) => {};
  const addMemberSubmitHandler = () => {};
 
  return (
    <Dialog open onClose={closeHandler}>
      <Stack p={"2rem"} width={"20rem"} spacing={"2rem"}>
        <DialogTitle textAlign={"center"}>Add Member</DialogTitle>

        <Stack spacing={"1rem"}>
          {sampleUser.length > 0 ? (
            sampleUser.map((e, i) => {
              return (
                <UserItems
                  key={i}
                  user={e}
                  handler={selectMemberHandler}
                  // pass the id here
                  isAdded={selectedMembers.includes(e)}
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
            disabled={isLoadingAddMember}
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
