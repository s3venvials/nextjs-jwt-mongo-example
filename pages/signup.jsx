import React, { useState } from "react";
import { useRouter } from "next/router";
import { Grid, TextField, Button, Typography, Alert } from "@mui/material";
import PhoneInput from "react-phone-input-2";
import { DivWrapper } from "styles/global.styles";
import "react-phone-input-2/lib/material.css";
import { userService } from "services";

const SignUp = () => {
  const router = useRouter();
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    passCode: 0,
    token: "",
  });
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setState({
      ...state,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    
    if (!state.firstName || !state.lastName || !state.phone) {
      setError("All fields are required.");
      return;
    }

    const res = await userService.signUp(state);

    if (res.success) {
      router.push("/login");
      return;
    }

    setError("There was an issue processing your request.");
  };

  return (
    <DivWrapper maxWidth="sm">
      <Typography variant="h5" component="h5" gutterBottom>
        User Sign Up
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              type="text"
              label="First Name"
              name="firstName"
              value={state.firstName}
              onChange={handleChange}
              size="small"
              fullWidth
              required
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              type="text"
              label="Last Name"
              name="lastName"
              value={state.lastName}
              onChange={handleChange}
              size="small"
              fullWidth
              required
              margin="normal"
            />
          </Grid>
          <Grid item xs={12}>
            <PhoneInput
              country={"us"}
              containerStyle={{ width: "100%", marginBottom: "1em" }}
              inputStyle={{ width: "100%" }}
              name="phone"
              value={state.phone}
              onChange={(value) => setState({ ...state, phone: value })}
            />
          </Grid>
          <Grid item xs={6}>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </DivWrapper>
  );
};

export default SignUp;
