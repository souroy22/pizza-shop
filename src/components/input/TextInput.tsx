import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Box from "@mui/material/Box";
import { SvgIconComponent } from "@mui/icons-material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import { IconButton } from "@mui/material";

type InputType = "text" | "number" | "password" | "email";

type PropType = {
  IconComponent: SvgIconComponent;
  name: string;
  value: string;
  handleChange: (name: string, value: string) => void;
  type?: InputType;
  label: string;
  id: string;
  required: boolean;
  errorMessage?: string;
};

const TextInput = ({
  IconComponent,
  name,
  value,
  handleChange,
  type = "text",
  label,
  id,
  required = false,
  errorMessage = "",
}: PropType) => {
  const [passwordType, setPasswordType] = useState<InputType>("password");

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(event.target.name, event.target.value);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        marginBottom: "13px",
        gap: "3px",
      }}
    >
      <TextField
        name={name}
        value={value}
        type={type === "password" ? passwordType : type}
        onChange={onChange}
        id={id}
        variant="filled"
        label={label}
        required={required}
        autoComplete="off"
        sx={{
          width: "300px",
          backgroundColor: "white",

          borderRadius: "5px",
          border: "none",
          "&:focused": {
            border: "none",
          },
        }}
        InputProps={{
          disableUnderline: true,
          startAdornment: (
            <InputAdornment position="start">
              <IconComponent />
            </InputAdornment>
          ),
          endAdornment:
            type === "password" ? (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() =>
                    setPasswordType((oldState) =>
                      oldState === "password" ? "text" : "password"
                    )
                  }
                  onMouseDown={() =>
                    setPasswordType((oldState) =>
                      oldState === "password" ? "text" : "password"
                    )
                  }
                >
                  {passwordType === "text" ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ) : (
              <></>
            ),
        }}
      />
      {errorMessage.trim() && (
        <span style={{ color: "red", fontSize: "13px" }}>{errorMessage}</span>
      )}
    </Box>
  );
};

export default TextInput;
