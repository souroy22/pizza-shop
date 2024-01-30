import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Navigate, Outlet } from "react-router-dom";

type ChildrenProps = {
  children?: React.ReactNode;
};

const AdminRoute = ({}: ChildrenProps) => {
  const { isLoggedIn, user } = useSelector(
    (state: RootState) => state.authReducer
  );

  if (isLoggedIn && user.isAdmin) {
    return <Outlet />;
  }
  return <Navigate to="/" />;
};

export default AdminRoute;
