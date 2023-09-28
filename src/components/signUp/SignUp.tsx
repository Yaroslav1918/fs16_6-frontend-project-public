import { Box, Button, TextField, Typography } from "@mui/material";
import { Formik, Field, Form, FormikHelpers, ErrorMessage } from "formik";
import "react-app-polyfill/ie11";
import Container from "../container/Container";
import { Colors } from "../../styles";

import { useNavigate } from "react-router-dom";


import { useEffect } from "react";


type FormValues = {
  name: string;
  email: string;
  password: string;
};

const textFieldStyles = {
  padding: "10px",
  marginBottom: "5px",
  "& .MuiOutlinedInput-root": {
    color: Colors.black,
    "&:hover fieldset": {
      borderColor: Colors.black,
    },
    "&.Mui-focused fieldset": {
      borderColor: Colors.black,
    },
  },
};

const SignUp = () => {


  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  

  const FieldErrorMessage = ({ fieldName }: { fieldName: string }) => {
    return (
      <ErrorMessage name={fieldName}>
        {(errorMsg) => (
          <Box
            sx={{
              color: Colors.danger,
              fontSize: "14px",
              margin: "0 auto",
            }}
          >
            {errorMsg}
          </Box>
        )}
      </ErrorMessage>
    );
  };

  const onSubmit = (
    values: FormValues,
    { setSubmitting, resetForm }: FormikHelpers<FormValues>
  ) => {

    resetForm();
    setSubmitting(false);
  };
  return (
    <Box
      component="section"
      sx={{
        padding: "30px 0 100px",
      }}
    >
      <Container>
        <Typography
          component="h3"
          sx={{
            fontSize: { md: 30, xs: 15, sm: 20 },
            fontWeight: "600",
            textAlign: "center",
            color: Colors.black,
          }}
        >
          Sign up
        </Typography>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          // validate={validate}
        >
          {({ isSubmitting }) => (
            <Form
              style={{
                display: "flex",
                flexDirection: "column",
                maxWidth: "400px",
                margin: "0 auto",
              }}
            >
              <Field
                as={TextField}
                label={"name"}
                name="name"
                variant="outlined"
                margin="normal"
                InputLabelProps={{
                  style: { color: Colors.black },
                }}
                sx={textFieldStyles}
              />
              <FieldErrorMessage fieldName="name" />
              <Field
                as={TextField}
                label={"email"}
                name="email"
                variant="outlined"
                margin="normal"
                InputLabelProps={{
                  style: { color: Colors.black },
                }}
                sx={textFieldStyles}
              />
              <FieldErrorMessage fieldName="email" />
              <Field
                as={TextField}
                label={"password"}
                name="password"
                type="password"
                variant="outlined"
                margin="normal"
                InputLabelProps={{
                  style: { color: Colors.black },
                }}
                sx={textFieldStyles}
              />
              <FieldErrorMessage fieldName="password" />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                sx={{ marginTop: "16px", background: Colors.white }}
              >
                {isSubmitting ? "submitting" : "submit"}
              </Button>
            </Form>
          )}
        </Formik>
      </Container>
    </Box>
  );
}
export default SignUp;