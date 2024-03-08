import React from "react";
import { Helmet } from "react-helmet-async";

const Title = ({
  title = "Title",
  description = "this is a chat  applicatio",
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description}></meta>
    </Helmet>
  );
};

export default Title;
