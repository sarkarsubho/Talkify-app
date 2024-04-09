import { Menu } from "@mui/material";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setIsFileMenu } from "../../redux/reducers/misc";

export const FileMenu = ({ anchorE1 }) => {
  const { isFileMenu } = useSelector((state) => state.misc);
  const dispatch = useDispatch();

  const closeFileMenu = () => {
    dispatch(setIsFileMenu(false));
  };
  return (
    <Menu anchorEl={anchorE1} anc open={isFileMenu} onClose={closeFileMenu}>
      
    </Menu>
  );
};
