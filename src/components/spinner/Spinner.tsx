import { Box } from "@mui/material";
import { useState } from "react";
import { BeatLoader } from "react-spinners";

import { Colors, override } from "../../styles";

const Spinner = () => {
  const [loading] = useState(true);
  const [color] = useState(Colors.bgFooter);
  
  return (
    <Box
      component="div"
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <BeatLoader
        color={color}
        loading={loading}
        cssOverride={override}
        size={15}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </Box>
  );
};

export default Spinner;
