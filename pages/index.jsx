import react from "react";
import { Typography } from "@mui/material";
import { DivWrapper } from "styles/global.styles";

const Home = () => {
  return (
    <DivWrapper>
      <Typography variant="h4" component="h4">
        You're logged in with Next.js 11 & JWT!!
      </Typography>
    </DivWrapper>
  );
};

export default Home;
