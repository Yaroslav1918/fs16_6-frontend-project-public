import { Box, Button, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

import { Colors } from "../../styles";

const SubscribeToUs = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      // Handle form submission logic here
      console.log("Submitted:", values.email);
    },
  });
  return (
    <Box
      component="section"
      sx={{
        backgroundImage:
          "url(https://jevelin.shufflehound.com/shop1/wp-content/uploads/sites/9/2016/11/img_4.jpg)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "end",
          padding: "100px",
          flexWrap: "wrap",
        }}
      >
        <Typography component="h3" sx={{ color: Colors.white }}>
          Subscribe to get discount coupons & new offers!
        </Typography>
        <Typography sx={{ color: Colors.white }}>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
          nonummy nibh euismod tincidunt erat volutpat.
        </Typography>
        (
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          style={{ display: "flex", alignItems: "center" }}
        >
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Enter your email"
            variant="outlined"
            onChange={formik.handleChange}
            value={formik.values.email}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ marginLeft: "10px" }}
          >
            Submit
          </Button>
        </Box>
        );
      </Box>
    </Box>
  );
};
export default SubscribeToUs;
