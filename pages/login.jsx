import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button, TextField, Typography } from "@mui/material";
import { DivWrapper } from "styles/global.styles";
import PhoneInput from "react-phone-input-2";
import { sendSMS, generatePassCode } from "lib";
import "react-phone-input-2/lib/material.css";

import { userService } from "services";

export default Login;

function Login() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [passCode, setPassCode] = useState("");
  const [showPassCode, setShowPassCode] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // redirect to home if already logged in
    if (userService.userValue) {
      router.push("/");
    }
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    const code = generatePassCode();
    sendSMS(phone, `Use pass code ${code} to verify your phone number.`);
    return userService.updatePassCode(phone, code)
      .then(() => {
        setShowPassCode(true);
      })
      .catch((error) => {
        setError("apiError", { message: error });
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await userService.login(phone, passCode);

    if (res) {
      await userService.updatePassCode(phone, 0);
      const returnUrl = router.query.returnUrl || "/";
      router.push(returnUrl);
    }

    setError("apiError", { message: error });
  };

  return (
    <DivWrapper maxWidth="sm">
      <Typography variant="h4" component="h4" gutterBottom>Login</Typography>
      {error && <Typography variant="h6" component="h6" gutterBottom>{error}</Typography>}
      <form onSubmit={onSubmit}>
        <PhoneInput
          country={"us"}
          containerStyle={{ width: "100%", marginBottom: '1em' }}
          inputStyle={{ width: "100%" }}
          name="phone"
          value={phone}
          onChange={(value) => setPhone(value)}
        />
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
      {showPassCode && (
        <form onSubmit={handleSubmit}>
          <TextField
            type="text"
            name="passCode"
            value={passCode}
            onChange={(e) => setPassCode(e.target.value)}
            fullWidth
            size="small"
            label="Pass Code"
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary">
            Sign In
          </Button>
        </form>
      )}
    </DivWrapper>
  );
}
