import { Box, Typography } from "@mui/material";
import React, { memo } from "react";
import { lightBlue } from "../../constants/color";
import moment from "moment";
import { fileFormat } from "../../lib/features";
import RendedAttachment from "./RendedAttachment";
import { motion } from "framer-motion";

const MessageComponent = ({ message, user }) => {
  const { attachments, content, _id, sender, chat, createdAt } = message;
  const sameSender = sender?._id === user._id;

  const timeAgo = moment(createdAt).fromNow();

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: "-100%",
      }}
      whileInView={{ opacity: 1, x: 0 }}
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

          console.log("file format", file);
          return (
            <Box key={i}>
              <a
                href={url}
                target="_blank"
                download={true}
                style={{
                  color: "black",
                }}
              >
                {RendedAttachment(file, url)}
              </a>
            </Box>
          );
        })}

      {/*  timeStamp*/}
      <Typography variant="caption" color={"text.secondary"}>
        {timeAgo}
      </Typography>
    </motion.div>
  );
};

export default memo(MessageComponent);
