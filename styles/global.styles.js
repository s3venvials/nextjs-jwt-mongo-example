import { styled } from "@mui/material/styles";
import { Container } from "@mui/material";

export const DivWrapper = styled(Container)(({ theme }) => ({
    marginTop: theme.spacing(20),
    height: "100vh",
    [theme.breakpoints.down("sm")]: {
    marginTop: theme.spacing(5),
    },
}));