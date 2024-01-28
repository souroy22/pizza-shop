import Box from "@mui/material/Box";
import "./style.css";

type ChildrenProps = {
  children?: React.ReactNode;
};

const AuthContainer = ({ children }: ChildrenProps) => {
  return (
    <Box className="auth-container">
      <Box className="left-section">
        <img
          className="auth-section-image"
          src="src\assets\images\pizza-slice-on-transparent-background-png.webp"
        />
      </Box>
      <Box className="right-section">
        <Box className="form-container">
          <h1 className="welcome-text">Welcome!</h1>
          <h5 className="greeting-text">Today a beautifull day.</h5>
          <Box className="child-container">{children}</Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AuthContainer;
