import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";

const ConformDeleteDialog = ({ open, handleClose, deleteHandler }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Conform Delete</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this group?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>No</Button>
        <Button onClick={deleteHandler} color="error">
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConformDeleteDialog;
