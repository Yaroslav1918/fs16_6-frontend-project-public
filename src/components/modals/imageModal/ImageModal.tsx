import { Box, Modal } from "@mui/material";
interface ModalProps {
  open: boolean;
  handleClose: () => void;
  selectedImage: string;
}
const imgModal = ({ open, handleClose, selectedImage }: ModalProps) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          outline: "none",
          width: { xs: "80%", sm: "60%", md: "32%" },
        }}
      >
        <img
          src={selectedImage}
          alt="modal"
          loading="lazy"
          style={{
            objectFit: "contain",
            width: "100%",
            borderRadius: "2%",
          }}
        />
      </Box>
    </Modal>
  );
};

export default imgModal;
