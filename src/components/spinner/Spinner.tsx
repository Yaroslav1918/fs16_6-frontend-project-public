import { Box } from "@mui/material";
import { useState } from "react";
import { ClipLoader } from "react-spinners";

import { override } from "../../styles";

const Spinner = () => {
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("black");
  
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
      <ClipLoader
        color={color}
        loading={loading}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </Box>
  );
};

export default Spinner;
