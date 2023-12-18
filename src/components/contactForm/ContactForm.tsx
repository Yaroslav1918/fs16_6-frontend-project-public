import { useFormik } from "formik";
import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import * as yup from "yup";
import { TextField, Button, Typography, Box, Container } from "@mui/material";
import { toast } from "react-toastify";

import { Colors } from "../../styles";
import { useThemeContext } from "../../utils/theme/ThemeContextProvider";

const ContactForm: React.FC = () => {
  const form = useRef<HTMLFormElement>(null);
  const { theme } = useThemeContext();
  const formik = useFormik({
    initialValues: {
      user_name: "",
      user_email: "",
      message: "",
    },
    validationSchema: yup.object({
      user_name: yup.string().required("Name is required"),
      user_email: yup
        .string()
        .email("Invalid email address")
        .required("Email is required"),
      message: yup.string().required("Message is required"),
    }),
    onSubmit: async () => {
      if (form.current) {
        try {
          await emailjs.sendForm(
            "service_skarl3x",
            "template_lpv1oas",
            form.current,
            process.env.REACT_APP_EMAIL_PUBLIC_ID
          );
          formik.resetForm();
          toast.success("Your message was successfully sent.");
        } catch (e) {
          const error = e as string;
          toast.error(error);
        }
      }
    },
  });

  return (
    <Box component="section" pt={12}>
      <Container>
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            textAlign: "center",
            fontSize: { xs: "25px", sm: "30px", md: "35" },
            color: Colors.hoverContactBtn,
          }}
        >
          Leave feedback
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "center",
            gap: "32px",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
            bgcolor: "background.default",
            borderRadius: "8px",
            padding: "16px",
          }}
        >
          <Box
            component="img"
            sx={{
              width: "100%",
              maxWidth: { xs: "390px", md: "500px", lg: "625px" },
              borderRadius: "8px",
              boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
            }}
            alt={"Payment is success."}
            src={"/img/customer.jpg"}
          />

          <Box
            component={"form"}
            ref={form}
            onSubmit={formik.handleSubmit}
            sx={{
              display: "flex",
              flexDirection: "column",
              maxWidth: { xs: "350px", sm: "400px" },
              width: { xs: "100%", sm: "100%" },
              fontSize: 16,
            }}
          >
            <TextField
              {...formik.getFieldProps("user_name")}
              label="Name"
              variant="outlined"
              margin="normal"
              InputLabelProps={{
                style: {
                  color:
                    theme.palette.mode === "dark" ? Colors.white : Colors.black,
                },
              }}
              sx={{
                "& label.Mui-focused": {
                  color: Colors.hoverContactBtn,
                },
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor: Colors.hoverContactBtn,
                  },
              }}
              fullWidth
              error={
                formik.touched.user_name && Boolean(formik.errors.user_name)
              }
              helperText={formik.touched.user_name && formik.errors.user_name}
            />
            <TextField
              {...formik.getFieldProps("user_email")}
              label="Email"
              variant="outlined"
              margin="normal"
              InputLabelProps={{
                style: {
                  color:
                    theme.palette.mode === "dark" ? Colors.white : Colors.black,
                },
              }}
              sx={{
                "& label.Mui-focused": {
                  color: Colors.hoverContactBtn,
                },
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor: Colors.hoverContactBtn,
                  },
              }}
              fullWidth
              error={
                formik.touched.user_email && Boolean(formik.errors.user_email)
              }
              helperText={formik.touched.user_email && formik.errors.user_email}
            />
            <TextField
              {...formik.getFieldProps("message")}
              label="Message"
              variant="outlined"
              margin="normal"
              InputLabelProps={{
                style: {
                  color:
                    theme.palette.mode === "dark" ? Colors.white : Colors.black,
                },
              }}
              sx={{
                "& label.Mui-focused": {
                  color: Colors.hoverContactBtn,
                },
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor: Colors.hoverContactBtn,
                  },
              }}
              fullWidth
              multiline
              rows={4}
              error={formik.touched.message && Boolean(formik.errors.message)}
              helperText={formik.touched.message && formik.errors.message}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{
                marginTop: 2,
                background:
                  theme.palette.mode === "dark"
                    ? "background.footer"
                    : Colors.contactButton,
                "&:hover": {
                  background: Colors.hoverContactBtn,
                },
              }}
            >
              Send
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default ContactForm;
