import { Box } from "@mui/material";
import { SxProps } from "@mui/system" 
import { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  sx?: SxProps;
};

const Container = ({ children, sx }: ContainerProps) => {
  return (
    <Box
      sx={{
        margin: "0 auto",
        padding: "0 15px",
        maxWidth: "1200px",
        width: "100%",
        ...sx,
      }}
    >
      {children}
    </Box>
  );
};

export default Container;
