import { FileOpen as FileOpenIcon } from "@mui/icons-material";
import React from "react";
import { transFormImage } from "../../lib/features";

const RendedAttachment = (file, url) => {
  switch (file) {
    case "video":
      return <video src={url} preload="none" width={"200px"} controls></video>;

    case "image":
      return (
        <img
          src={transFormImage(url,200) }
          alt="attachment"
          width={"200px"}
          height={"150px"}
          style={{
            objectFit: "contain",
          }}
        ></img>
      );

    case "audio":
      return <audio src={url} preload="none" controls></audio>;

    default:
      return <FileOpenIcon></FileOpenIcon>;
  }

};

export default RendedAttachment;
