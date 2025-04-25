import React from "react";
import { Box, Typography, Link } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#111",
        color: "#ccc",
        textAlign: "center",
        padding: "1.5rem",
        marginTop: "auto",
      }}
    >
      <Typography variant="body2" gutterBottom>
        © {new Date().getFullYear()} MyReactNetflix-demoSite. All rights
        reserved.
      </Typography>
      <Typography variant="body2">
        Built with ❤️ by{" namee-h Devs "}
        <Link
          href="mailto:contact@mymoviesite.com"
          color="inherit"
          underline="hover"
        >
          https://github.com/namee-h
        </Link>
      </Typography>
    </Box>
  );
};

export default Footer;
