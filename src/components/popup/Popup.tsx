import React from "react";
import { Box, Modal } from "@mui/material";

type PropType = {
  open: boolean;
  handleClose: () => void;
  children: React.ReactNode;
};

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
};

const Popup = ({ open, handleClose, children }: PropType) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>{children}</Box>
    </Modal>
  );
};

export default Popup;
