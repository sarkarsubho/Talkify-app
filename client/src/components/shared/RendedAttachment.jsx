import React from "react";

const RendedAttachment = (file, url) => {
  switch (file) {
    case "video":
      <video src={url} preload="none" width={"200px"} controls></video>;
      break;
    case "image":
      <img src={url} alt="attachment"></img>;
      break;

    default:
      break;
  }

  return <div>RendedAttachment</div>;
};

export default RendedAttachment;
