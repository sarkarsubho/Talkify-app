import {
  Dialog,
  DialogTitle,
  InputAdornment,
  List,
  ListItem,
  Stack,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { Search as SearchIcon } from "@mui/icons-material";
import UserItems from "../shared/UserItems";

const users = [1, 2, 3, 4];

const Search = () => {
  const [searchText, setSearchText] = useState("");

  const addFriendHandler = () => {
    console.log("d");
  };

  const isLoadingSendFriendRequest = false;

  return (
    <Dialog open={false}>
      <Stack
        padding={"2rem"}
        direction={"column"}
        width={"25rem"}
        borderRadius={"5px"}
      >
        <DialogTitle textAlign={"center"}>Find People</DialogTitle>
        <TextField
          label=""
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          variant="outlined"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon></SearchIcon>
              </InputAdornment>
            ),
          }}
        ></TextField>
        <List>
          {users.map((e, i) => {
            return (
              <UserItems
                key={i}
                user={e}
                handler={addFriendHandler}
                handlerIsLoading={isLoadingSendFriendRequest}
              ></UserItems>
            );
          })}
        </List>
      </Stack>
    </Dialog>
  );
};

export default Search;
