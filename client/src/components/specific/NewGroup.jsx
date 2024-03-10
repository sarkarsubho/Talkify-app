import {
  Button,
  Dialog,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import UserItems from "../shared/UserItems";

const users = [1, 2, 3, 4];

const NewGroup = () => {
  const [groupName, setGroupName] = useState("");
  const [members, setMembers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);

  const selectMemberHandler = (member) => {
    setSelectedMembers((pre) =>
      pre.includes(member)
        ? pre.filter((currentMember) => currentMember !== member)
        : [...pre, member]
    );
  };
  // console.log(selectedMembers);
  const submitHandler = () => {};
  const closeHandler = () => {};
  return (
    <Dialog open={false} onClose={closeHandler}>
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
          {users.map((e, i) => {
            return (
              <UserItems
                key={i}
                user={e}
                handler={selectMemberHandler}
                // pass the id here
                isAdded={selectedMembers.includes(e)}
              ></UserItems>
            );
          })}
        </Stack>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Button variant="text" color="error">
            Cancel
          </Button>
          <Button variant="contained" onClick={submitHandler}>
            Create
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default NewGroup;
