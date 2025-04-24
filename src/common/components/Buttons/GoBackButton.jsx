import React from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IconButton, Tooltip } from "@mui/material";

const GoBackButton = ({ label = "Go Back" }) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Tooltip title={label}>
      <IconButton
        onClick={handleGoBack}
        sx={{
          color: "white",
          backgroundColor: "red",
          "&:hover": {
            backgroundColor: "#cc0000",
          },
          position: "absolute", // 필요시 수정
          bottom: "1rem",
          left: "1rem",
          zIndex: 1000,
          display: "fixed",
        }}
      >
        <ArrowBackIcon />
      </IconButton>
    </Tooltip>
  );
};

export default GoBackButton;
