import React from "react";
import { AppBar, Toolbar } from "@mui/material";

const Footer = () => {
  const d = new Date();

  return (
    <AppBar position="fixed" color="primary" sx={{ top: "auto", bottom: 0 }}>
      <Toolbar>All Rights Reserved {d.getFullYear()}</Toolbar>
    </AppBar>
  );
};

export default Footer;
