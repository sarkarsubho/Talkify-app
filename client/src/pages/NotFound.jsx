import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { backgroundGradient } from "../constants/color";
import { Link as StyledLink } from "@mui/material";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div
      id="invalid"
      className="home"
      style={{
        height: "100vh",
        textAlign: "center",
        padding: "50px",
        background: backgroundGradient,
      }}
    >
      <div>
        <img
          src="https://internetdevels.com/sites/default/files/public/blog_preview/404_page_cover.jpg"
          style={{
            borderRadius: "70% 50% 40% 40%",
            width: "40%",
          }}
        />
        <h1 style={{ fontFamily: "cursive", fontSize: "1.6rem" }}>
          404 Page Not Found !
        </h1>
        <StyledLink
          sx={{
            color: "white",
            background: "rgba(120, 128,198,0.5)",
            padding: "5px",
            borderRadius: "7px",
            cursor:"pointer"
          }}
          onClick={() => navigate("/")}
        >
          Go back to Home
        </StyledLink>
      </div>
    </div>
  );
};

export default NotFound;
