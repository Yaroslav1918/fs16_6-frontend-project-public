import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import {
  Formik,
  Field,
  Form,
  FormikHelpers,
  ErrorMessage,
  FieldProps,
} from "formik";
import "react-app-polyfill/ie11";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import Container from "../container/Container";
import { Colors } from "../../styles";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import operations from "../../redux/user/userOperations";
import { registerValidation } from "../../utils/validation";
import { useAppSelector } from "../../hooks/useAppSelector";
import { getLogin } from "../../redux/user/userSelectors";
import { SignUpInput } from "../../types/SignUpInput";

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
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(getLogin);
  const navigate = useNavigate();

  const initialValues: SignUpInput = {
    name: "",
    email: "",
    password: "",
    role: "customer",
    avatar: "",
  };

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

  const onSubmit = (
    values: SignUpInput,
    { setSubmitting, resetForm }: FormikHelpers<SignUpInput>
  ) => {
    const formValues = {
      ...values,
      avatar:
        "https://i.pinimg.com/originals/ea/76/c3/ea76c343f9bbd6917e9a094b9317ab9e.jpg",
    };
    dispatch(operations.fetchRegisterAsync(formValues));
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
          Sign up
        </Typography>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={registerValidation}
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
              <FormControl
                component="fieldset"
                sx={{ margin: "16px 0 0 10px" }}
              >
                <Field name="role">
                  {({ field }: FieldProps<string>) => (
                    <RadioGroup {...field} row>
                      <FormControlLabel
                        value="admin"
                        control={<Radio />}
                        label="Admin"
                      />
                      <FormControlLabel
                        value="customer"
                        control={<Radio />}
                        label="Customer"
                      />
                    </RadioGroup>
                  )}
                </Field>
              </FormControl>
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
                {isSubmitting ? "submitting" : "submit"}
              </Button>
            </Form>
          )}
        </Formik>
      </Container>
    </Box>
  );
};
export default SignUp;
