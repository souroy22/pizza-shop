import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Navigate, Outlet } from "react-router-dom";

type ChildrenProps = {
  children?: React.ReactNode;
};

const PrivateRoute = ({}: ChildrenProps) => {
  const isLoggedIn = useSelector(
    (state: RootState) => state.authReducer.isLoggedIn
  );

  if (isLoggedIn) {
    return <Outlet />;
  }
  return <Navigate to="/signin" />;
};

export default PrivateRoute;
