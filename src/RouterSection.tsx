import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Pizza from "./pages/pizza/Pizza";
import PrivateRoute from "./components/privateRoute/PrivateRoute";
import AuthRoute from "./components/AuthRoute/AuthRoute";
import Login from "./pages/signin/Login";
import Signup from "./pages/signup/Signup";

const RouterSection = () => {
  return (
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
  );
};

export default RouterSection;
