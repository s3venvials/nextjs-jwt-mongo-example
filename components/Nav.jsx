import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { AppBar, Toolbar, Button, Typography } from "@mui/material";
import { NavLink } from ".";
import { userService } from "services";

const Nav = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const subscription = userService.user.subscribe((x) => setUser(x));
    return () => subscription.unsubscribe();
  }, []);

  function logout() {
    userService.logout();
  }

  return (
    <AppBar>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          My App
        </Typography>
        {user && (
          <>
            <Typography>{`Welcome, ${user.user[0].firstName} ${user.user[0].lastName}`}</Typography>
            <Button onClick={logout} color="inherit">
              Logout
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Nav;
