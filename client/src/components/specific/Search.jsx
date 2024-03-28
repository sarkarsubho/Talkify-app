import { Search as SearchIcon } from "@mui/icons-material";
import {
  Dialog,
  DialogTitle,
  InputAdornment,
  List,
  Stack,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useLazySearchUserQuery,
  useSendFriendRequestMutation,
} from "../../redux/api/api";
import { setIsSearch } from "../../redux/reducers/misc";
import UserItems from "../shared/UserItems";
import toast from "react-hot-toast";
import { useAsyncMutation } from "../../hooks/hook";

const Search = () => {
  const [searchText, setSearchText] = useState("");
  const { isSearch } = useSelector((state) => state.misc);
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);

  const [sendFriendRequest, isLoadingSendFriendRequest] = useAsyncMutation(
    useSendFriendRequestMutation
  );
  const [searchUser] = useLazySearchUserQuery();

  const addFriendHandler = async (id) => {
    console.log(id);
    await sendFriendRequest("Sending friend request...", { userId: id });
  };

  const searchCloseHandler = () => {
    dispatch(setIsSearch(false));
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      // console.log(searchText);
      searchUser(searchText)
        .then(({ data }) => {
          console.log(data);
          setUsers(data.searchedUser);
        })
        .catch((er) => {
          console.log(er);
        });
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [searchText]);

  return (
    <Dialog open={isSearch} onClose={searchCloseHandler}>
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
