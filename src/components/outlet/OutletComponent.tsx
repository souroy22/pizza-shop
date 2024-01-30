import React from "react";
import { Outlet } from "react-router-dom";

type ChildrenProps = {
  children?: React.ReactNode;
};

const OutletComponent = ({}: ChildrenProps) => {
  return <Outlet />;
};

export default OutletComponent;
