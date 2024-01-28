import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Pizza from "./pages/pizza/Pizza";
import PrivateRoute from "./components/privateRoute/PrivateRoute";
import AuthRoute from "./components/AuthRoute/AuthRoute";
import Login from "./pages/signin/Login";
import Signup from "./pages/signup/Signup";
import Navbar from "./components/navbar/Navbar";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import { Box } from "@mui/material";
import "./App.css";

const RouterSection = () => {
  const isLoggedIn = useSelector(
    (state: RootState) => state.authReducer.isLoggedIn
  );
  return (
    <>
      {isLoggedIn && <Navbar />}
      <Box className="main-section">
        <Routes>
          <Route element={<AuthRoute />}>
            <Route path="/signin" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/pizza" element={<Pizza />} />
          </Route>
        </Routes>
      </Box>
    </>
  );
};

export default RouterSection;
