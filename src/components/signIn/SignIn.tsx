import { Box, Button, TextField, Typography } from "@mui/material";
import { Formik, Field, Form, FormikHelpers, ErrorMessage } from "formik";
import "react-app-polyfill/ie11";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import Container from "../container/Container";
import { Colors } from "../../styles";
import operations from "../../redux/user/userOperations";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { AppState } from "../../redux/store";

type FormValues = {
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

const initialValues = {
  email: "",
  password: "",
};

const SignIn = () => {
  const isLoggedIn = useAppSelector(
    (state: AppState) => state.userSlice.isLoggedIn
  );
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

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

  const onSubmit = async (
    values: FormValues,
    { setSubmitting, resetForm }: FormikHelpers<FormValues>
  ) => {
    await dispatch(operations.fetchlogInAsync(values));
    await dispatch(operations.fetchCurrentUser());
    resetForm();
    setSubmitting(false);
  };
  return (
    <Box
      component="section"
      sx={{
        padding: "60px 0 100px",
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
          Sign in
        </Typography>
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          {({ isSubmitting, resetForm }) => (
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
                label="Email"
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
                label="Password"
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
                sx={{
                  marginTop: "16px",
                  background: Colors.secondaryColor,
                  "&:hover": {
                    background: Colors.hoverColor,
                  },
                }}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </Form>
          )}
        </Formik>
      </Container>
    </Box>
  );
};
export default SignIn;
