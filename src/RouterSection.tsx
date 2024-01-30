import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Pizza from "./pages/pizza/Pizza";
import PrivateRoute from "./components/privateRoute/PrivateRoute";
import AuthRoute from "./components/authRoute/AuthRoute";
import Login from "./pages/signin/Login";
import Signup from "./pages/signup/Signup";
import "./App.css";
import MainSection from "./components/main-section/MainSection";
import AdminRoute from "./components/adminRoute/AdminRoute";
import OutletComponent from "./components/outlet/OutletComponent";
import CreateNewSize from "./pages/createNewSize/CreateNewSize";
import CreateNewPizza from "./pages/createNewPizza/CreateNewPizza";

const RouterSection = () => {
  return (
    <>
      <Routes>
        <Route element={<AuthRoute />}>
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
        <Route element={<MainSection />}>
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route element={<AdminRoute />}>
            <Route path="/pizza" element={<OutletComponent />}>
              <Route index element={<Pizza />} />
              <Route path="create-size" element={<CreateNewSize />} />
              <Route path="create-pizza" element={<CreateNewPizza />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default RouterSection;
