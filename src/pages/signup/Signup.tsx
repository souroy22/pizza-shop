import Box from "@mui/material/Box";
import TextInput from "../../components/input/TextInput";
import { useState } from "react";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import EmailIcon from "@mui/icons-material/Email";
import PasswordIcon from "@mui/icons-material/Password";
import AuthContainer from "../../components/authpage/AuthContainer";
import ButtonComponent from "../../components/button/ButtonComponent";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils/checkForValidEmail";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";

type DataType = {
  name: string;
  email: string;
  password: string;
};

const Signup = () => {
  const [data, setData] = useState<DataType>({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<DataType>({
    name: "",
    email: "",
    password: "",
  });
  const [check, setCheck] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const checkForErrors = (values: DataType) => {
    const newErrors = { name: "", email: "", password: "" };
    for (const [key, value] of Object.entries(values)) {
      if (key === "name") {
        if (!value?.trim()) {
          newErrors.name = "Name field is required";
        } else {
          newErrors.name = "";
        }
      }
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
        } else if (value.length < 6) {
          newErrors.password = "Password length is min 6";
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
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = userCredential.user;
      await updateProfile(user, { displayName: data.name });
      navigate("/");
      setData({ name: "", email: "", password: "" });
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
          name="name"
          value={data.name}
          id="signup-name"
          IconComponent={SupervisedUserCircleIcon}
          handleChange={handleChange}
          label="Enter Full Name"
          type="text"
          required
          errorMessage={errors.name}
        />
        <TextInput
          name="email"
          value={data.email}
          id="signup-email"
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
          id="signup-password"
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
          text="Signup"
          handleClick={handleClick}
          disabled={check}
          isLoading={loading}
        />
      </Box>
      <Box className="form-bottom-link-section">
        <h5>Already have account?</h5>
        <Link to="/signin">Login</Link>
      </Box>
    </AuthContainer>
  );
};

export default Signup;
