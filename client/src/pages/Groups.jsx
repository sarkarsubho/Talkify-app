import React, { Suspense, lazy, memo, useEffect, useState } from "react";
import AppLayout from "../components/Layout/AppLayout";
import {
  Backdrop,
  Box,
  Button,
  ButtonGroup,
  Drawer,
  Grid,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { backgroundGradient, matBlack, orange } from "../constants/color";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Done as DoneIcon,
  Edit as EditIcon,
  KeyboardBackspace as KeyboardBackspaceIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";
import { Link } from "../components/styles/StyledComponents";
import AvatarCard from "../components/shared/AvatarCard";
import { sampleChats, sampleUsers } from "../constants/sampleData";
import UserItems from "../components/shared/UserItems";

const ConformDeleteDialog = lazy(() =>
  import("../components/dialogs/ConformDeleteDialog")
);
const AddMemberDialog = lazy(() =>
  import("../components/dialogs/AddMemberDialog")
);

const Groups = () => {
  const navigate = useNavigate();
  const [isMobileMenu, setISMobileMenu] = useState(false);
  const chatId = useSearchParams()[0].get("group");
  const [isEdit, setIsEdit] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [conformDeleteDialog, setConformDeleteDialog] = useState(false);

  const isAddMember = false;

  // console.log(chatId);
  const handleMobile = () => {
    setISMobileMenu((prev) => !prev);
  };
  const handleMobileClose = () => {
    setISMobileMenu(false);
  };

  const navigateBack = () => {
    navigate("/");
  };

  const updateGroupHandler = () => {
    setIsEdit(false);
  };

  const IconBtns = (
    <>
      <Box
        sx={{
          display: {
            xs: "block",
            sm: "none",
            position: "fixed",
            right: "1rem",
            top: "1rem",
          },
        }}
      >
        <IconButton onClick={handleMobile}>
          <MenuIcon></MenuIcon>
        </IconButton>
      </Box>
      <Tooltip title="back">
        <IconButton
          sx={{
            position: "absolute",
            top: "2rem",
            left: "2rem",
            bgcolor: matBlack,
            color: "white",
            ":hover": {
              bgcolor: "rgba(0,0,0,0.7)",
            },
          }}
          onClick={navigateBack}
        >
          <KeyboardBackspaceIcon></KeyboardBackspaceIcon>
        </IconButton>
      </Tooltip>
    </>
  );

  const GroupName = (
    <>
      <Stack
        direction={"row"}
        alignItems={"center"}
        alignContent={"center"}
        spacing={"1rem"}
        padding={"3rem"}
      >
        {isEdit ? (
          <>
            <TextField
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            ></TextField>
            <IconButton onClick={updateGroupHandler}>
              <DoneIcon></DoneIcon>
            </IconButton>
          </>
        ) : (
          <>
            <Typography variant="h4">Group Name</Typography>
            <IconButton onClick={() => setIsEdit(true)}>
              <EditIcon></EditIcon>
            </IconButton>
          </>
        )}
      </Stack>
    </>
  );

  const openConformDeleteHandler = () => {
    setConformDeleteDialog(true);
  };
  const closeConformDeleteHandler = () => {
    setConformDeleteDialog(false);
  };

  const deleteHandler = () => {
    closeConformDeleteHandler();
  };

  const openAddMemberHandler = () => {};

  const removeMemberHandler = (id) => {
    console.log("member handler Id", id);
  };
  useEffect(() => {
    // fetch group name and set
    if (chatId) {
      setGroupName(`groupName${chatId}`);
    }

    return () => {
      // when chat id changes set the group name to default with cleanup
      setGroupName("");
      setIsEdit(false);
    };
  }, [chatId]);
  return (
    <Grid container height={"100vh"}>
      <Grid
        item
        sx={{
          display: {
            xs: "none",
            sm: "block",
          },
        }}
        sm={4}
        bgcolor={orange}
      >
        <GroupList myGroups={sampleChats} chatId={chatId}></GroupList>
      </Grid>
      <Grid
        item
        xs={12}
        sm={8}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          padding: "1rem 3rem",
        }}
      >
        {IconBtns}

        {groupName && (
          <>
            {GroupName}
            <Typography
              margin={"2rem"}
              variant="body1"
              alignSelf={"flex-start"}
            >
              Members
            </Typography>

            <Stack
              maxWidth={"45rem"}
              width={"100%"}
              boxSizing={"border-box"}
              padding={{
                sm: "1rem",
                xs: 0,
                md: "1rem 4rem",
              }}
              spacing={"2rem"}
              bgcolor={"bisque"}
              height={"50vh"}
              overflow={"auto"}
            >
              {/* member Card */}

              {sampleUsers.map((m, i) => {
                return (
                  <UserItems
                    key={m._id}
                    user={m}
                    styling={{
                      boxShadow: "0 0 0.5rem rgba(0,0,0,0.2)",
                      padding: "1rem 2rem",
                      borderRadius: "0.5rem",
                    }}
                    handler={removeMemberHandler}
                  ></UserItems>
                );
              })}
            </Stack>

            {/* Button Group */}
            <Stack
              padding={{
                sm: "1rem",
                xs: 0,
                md: "1rem 4rem",
              }}
              spacing={"1rem"}
              direction={{
                sm: "row",
                xs: "column-reverse",
              }}
            >
              <Button
                size="large"
                variant="contained"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={openConformDeleteHandler}
              >
                Delete Group
              </Button>
              <Button
                size="large"
                variant="contained"
                startIcon={<AddIcon />}
                onClick={openAddMemberHandler}
              >
                Add Member
              </Button>
            </Stack>
          </>
        )}
      </Grid>

      {isAddMember && (
        <Suspense fallback={<Backdrop open></Backdrop>}>
          <AddMemberDialog />
        </Suspense>
      )}

      {conformDeleteDialog && (
        <Suspense fallback={<Backdrop open />}>
          <ConformDeleteDialog
            open={conformDeleteDialog}
            handleClose={closeConformDeleteHandler}
            deleteHandler={deleteHandler}
          />
        </Suspense>
      )}

      <Drawer
        sx={{
          display: {
            xs: "block",
            sm: "none",
          },
        }}
        open={isMobileMenu}
        onClose={handleMobileClose}
      >
        <GroupList
          w={"50vw"}
          myGroups={sampleChats}
          chatId={chatId}
        ></GroupList>
      </Drawer>
    </Grid>
  );
};

const GroupList = ({ w = "100%", myGroups = [], chatId }) => {
  return (
    <Stack
      width={w}
      sx={{
        backgroundImage: backgroundGradient,
        height: "100vh",
      }}
    >
      {myGroups.length > 0 ? (
        myGroups.map((group) => {
          return (
            <GroupListItem
              key={group._id}
              group={group}
              chatId={chatId}
            ></GroupListItem>
          );
        })
      ) : (
        <Typography textAlign={"center"} padding={"1rem"}>
          No Groups
        </Typography>
      )}
    </Stack>
  );
};

const GroupListItem = memo(({ group, chatId }) => {
  const { name, avatar, _id } = group;
  return (
    <Link
      to={`?group=${_id}`}
      onClick={(e) => {
        if (chatId === _id) {
          e.preventDefault();
        }
      }}
      sx={{
        borderBottom: "2px solid gray"
      }}
    >
      <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
        <AvatarCard avatar={avatar}></AvatarCard>
        <Typography>{name}</Typography>
      </Stack>
    </Link>
  );
});

export default Groups;
// export default AppLayout()(Groups);
