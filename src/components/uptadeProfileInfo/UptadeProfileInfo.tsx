import { Button, TextField } from "@mui/material";
import React, { useState } from "react";

import { Colors } from "../../styles";
import { useAppSelector } from "../../hooks/useAppSelector";
import { AppState } from "../../redux/store";


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

const UptadeProfileInfo = ({
  handleCloseModal,
}: {
  handleCloseModal: () => void;
}) => {
  const user = useAppSelector((state: AppState) => state.userSlice.currentUser);
  const [formValues, setFormValues] = useState<FormValues>({
    name: user?.name || "",
    email: user?.email || "",
    password: user?.password || "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
 
    handleCloseModal();
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "400px",
        margin: "0 auto",
      }}
    >
      <TextField
        label="Name"
        name="name"
        variant="outlined"
        margin="normal"
        InputLabelProps={{
          style: { color: Colors.black },
        }}
        sx={textFieldStyles}
        value={formValues.name}
        onChange={handleInputChange}
      />
      <TextField
        label="Email"
        name="email"
        variant="outlined"
        margin="normal"
        InputLabelProps={{
          style: { color: Colors.black },
        }}
        sx={textFieldStyles}
        value={formValues.email}
        onChange={handleInputChange}
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        variant="outlined"
        margin="normal"
        InputLabelProps={{
          style: { color: Colors.black },
        }}
        sx={textFieldStyles}
        value={formValues.password}
        onChange={handleInputChange}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{
          marginTop: "16px",
          background: Colors.secondaryColor,
          "&:hover": {
            background: Colors.hoverColor,
          },
        }}
      >
        Submit
      </Button>
    </form>
  );
};

export default UptadeProfileInfo;
