import { Box } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../navbar/Navbar";

type ChildrenProps = {
  children?: React.ReactNode;
};

const MainSection = ({}: ChildrenProps) => {
  return (
    <>
      <Navbar />
      <Box className="main-section">
        <Outlet />
      </Box>
    </>
  );
};

export default MainSection;
