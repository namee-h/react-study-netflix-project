import React from "react";
import { Box, Typography, Link as MuiLink } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#111",
        padding: "2rem 1rem",
        color: "#999",
        textAlign: "center",
      }}
    >
      <Typography variant="body2">
        © {new Date().getFullYear()} Netflix Demo Site · Built with ❤️ by Sarah
      </Typography>
      <Typography variant="body2" sx={{ mt: 1 }}>
        This project was created as part of the React Study (3rd term) by{" "}
        <MuiLink
          href="https://codingnoona.thinkific.com/courses/3"
          target="_blank"
          rel="noopener noreferrer"
          underline="none"
          color="inherit"
          sx={{ fontWeight: "bold" }}
        >
          코딩알려주는누나 ❣️
        </MuiLink>
      </Typography>
    </Box>
  );
};

export default Footer;
