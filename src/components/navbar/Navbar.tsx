import Box from "@mui/material/Box";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "../../store/auth/authReducer";
import { Button } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import "./style.css";
import { RootState } from "../../store/store";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.authReducer.user);

  const handleSignout = async () => {
    await signOut(auth);
    dispatch(signout());
    navigate("/signin");
  };

  return (
    <Box className="navbar-container">
      <Link to="/">
        <Box className="site-title">Pizza Shop</Box>
      </Link>
      <Box className="navbar-right-section">
        <Box className="navbar-user-name">Welcome, {user.name}</Box>
        <Box className="navbar-navigation-section">
          {user.isAdmin && (
            <Link to="/pizza">
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "white",
                  color: "black",
                  fontWeight: 500,
                  transition: "all 0.4s ease-in-out",
                  "&:hover": {
                    backgroundColor: "#cccccc",
                  },
                }}
              >
                Pizza
              </Button>
            </Link>
          )}
          <Button onClick={handleSignout} variant="contained">
            <ExitToAppIcon sx={{ marginRight: "3px" }} />
            Sign out
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Navbar;
