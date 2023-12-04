import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button } from "@mui/material";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";

import { Colors } from "../../../styles";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 440,
  bgcolor: "background.default",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface ModalTextProps {
  text?: string;
  openModal: boolean;
  handleCloseModal: () => void;
  children?: React.ReactNode;
}

const ModalText: React.FC<ModalTextProps> = (props) => {
  const { text, openModal, handleCloseModal, children } = props;

  return (
    <>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ bgcolor: "background.default" }}
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ textAlign: "center", marginBottom: "10px" }}
          >
            {text}
          </Typography>
          {children}
          <Button
            startIcon={<KeyboardDoubleArrowLeftIcon />}
            onClick={handleCloseModal}
            sx={{ display: "flex", margin: "0 auto", color: Colors.logoColor }}
          >
            Go back
          </Button>
        </Box>
      </Modal>
    </>
  );
};
export default ModalText;
