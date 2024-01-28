import { Button, CircularProgress } from "@mui/material";
import Box from "@mui/material/Box";

type PropType = {
  text: string;
  handleClick: () => void;
  disabled?: boolean;
  isLoading?: boolean;
};

const ButtonComponent = ({
  text,
  handleClick,
  disabled = true,
  isLoading = false,
}: PropType) => {
  return (
    <Box>
      <Button
        variant="contained"
        onClick={handleClick}
        disabled={disabled}
        sx={{
          backgroundColor: "orange !important",
          color: "white",
          fontWeight: 500,
          width: "300px",
          "&:hover": {
            backgroundColor: "orange",
          },
        }}
      >
        {!isLoading ? (
          text
        ) : (
          <CircularProgress
            sx={{
              color: "white",
              width: "30px !important",
              height: "30px !important",
            }}
          />
        )}
      </Button>
    </Box>
  );
};

export default ButtonComponent;
