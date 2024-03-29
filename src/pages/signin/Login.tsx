import { Box } from "@mui/material";
import TextInput from "../../components/input/TextInput";
import { useState } from "react";
import EmailIcon from "@mui/icons-material/Email";
import PasswordIcon from "@mui/icons-material/Password";
import AuthContainer from "../../components/authpage/AuthContainer";
import ButtonComponent from "../../components/button/ButtonComponent";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import { validateEmail } from "../../utils/checkForValidEmail";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";

type DataType = {
  email: string;
  password: string;
};

const Login = () => {
  const [data, setData] = useState<DataType>({ email: "", password: "" });
  const [errors, setErrors] = useState<DataType>({
    email: "",
    password: "",
  });
  const [check, setCheck] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const checkForErrors = (values: DataType) => {
    const newErrors = { email: "", password: "" };
    for (const [key, value] of Object.entries(values)) {
      if (key === "email") {
        if (!value?.trim()) {
          newErrors.email = "Email field is required";
        } else if (!validateEmail(value)) {
          newErrors.email = "Enter a valid email";
        } else {
          newErrors.email = "";
        }
      }
      if (key === "password") {
        if (!value?.trim()) {
          newErrors.password = "Password field is required";
        } else {
          newErrors.password = "";
        }
      }
    }
    setCheck(isDisabled(newErrors));
    setErrors(newErrors);
  };

  const handleChange = (name: string, value: string) => {
    const newData = { ...data, [name]: value };
    checkForErrors(newData);
    setData(newData);
  };

  const handleClick = async () => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      // const user = userCredential.user;
      navigate("/");
      setData({ email: "", password: "" });
    } catch (error) {
      let errorMessage = "Failed to do something exceptional";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      console.log(errorMessage);
    }
    setLoading(false);
  };

  const isDisabled = (errors: DataType) => {
    for (const value of Object.values(errors)) {
      if (value.trim().length) {
        return true;
      }
    }
    return false;
  };

  return (
    <AuthContainer>
      <Box>
        <TextInput
          name="email"
          value={data.email}
          id="login-email"
          IconComponent={EmailIcon}
          handleChange={handleChange}
          label="Enter Email"
          type="email"
          required
          errorMessage={errors.email}
        />
        <TextInput
          name="password"
          value={data.password}
          id="login-password"
          IconComponent={PasswordIcon}
          handleChange={handleChange}
          label="Enter Password"
          type="password"
          required
          errorMessage={errors.password}
        />
      </Box>
      <Box>
        <ButtonComponent
          text="Login"
          handleClick={handleClick}
          disabled={check}
          isLoading={loading}
        />
      </Box>
      <Box className="form-bottom-link-section">
        <h5>Don't have account?</h5>
        <Link to="/signup">Signup</Link>
      </Box>
    </AuthContainer>
  );
};

export default Login;
