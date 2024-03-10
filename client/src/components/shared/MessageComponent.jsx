import { Box, Typography } from "@mui/material";
import React, { memo } from "react";
import { lightBlue } from "../../constants/color";
import moment from "moment";
import { fileFormat } from "../../lib/features";

const MessageComponent = ({ message, user }) => {
  const { attachments, content, _id, sender, chat, createdAt } = message;
  const sameSender = sender?._id === user._id;

  const timeAgo = moment(createdAt).fromNow();

  return (
    <div
      style={{
        alignSelf: sameSender ? "flex-end" : "flex-start",
        backgroundColor: "white",
        color: "black",
        borderRadius: "5px",
        padding: "0.5rem",
        width: "fit-content",
      }}
    >
      {!sameSender && (
        <Typography color={lightBlue} fontWeight={600} variant="caption">
          {sender.name}
        </Typography>
      )}

      {content && <Typography>{content}</Typography>}

      {/* Attachment */}
      {attachments?.length > 0 &&
        attachments.map((attachment, i) => {
          const url = attachment.url;
          const file = fileFormat(url);
          return (
            <Box>
              <a
                href=""
                target="_blank"
                download={true}
                style={{
                  color: "black",
                }}
              ></a>
            </Box>
          );
        })}

      {/*  timeStamp*/}
      <Typography variant="caption" color={"text.secondary"}>
        {timeAgo}
      </Typography>
    </div>
  );
};

export default memo(MessageComponent);
