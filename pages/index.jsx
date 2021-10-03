import React from "react";
import { useRouter } from "next/router";
import { Typography, Button } from "@mui/material";
import { DivWrapper } from "styles/global.styles";
import { userService } from "services";

const Home = () => {
  const router = useRouter();
  const user = userService.getCurrentUser();

  return (
    <DivWrapper>
      <Typography variant="h4" component="h4">
        Next.js 11, JWT & Mongo Example!!
      </Typography>
      {!user ? (
        <Button
          variant="outlined"
          color="primary"
          onClick={() => router.push("/signup")}
          sx={{ marginTop: "1em" }}
        >
          Sign Up
        </Button>
      ) : (
        <Button variant="outlined" color="primary" sx={{ marginTop: '1em' }}>CRUD OPS</Button>
      )}
    </DivWrapper>
  );
};

export default Home;
