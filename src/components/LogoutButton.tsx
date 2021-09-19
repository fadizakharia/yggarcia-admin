import { Button } from "@material-ui/core";
import React from "react";
import { useAuth0 } from "../util/Auth";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <Button
      color="secondary"
      variant="outlined"
      onClick={() => logout({ returnTo: window.location.origin })}
    >
      Log Out
    </Button>
  );
};

export default LogoutButton;
