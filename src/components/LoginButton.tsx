import React from "react";

import { Button } from "@material-ui/core";
import { useAuth0 } from "../util/Auth";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <Button onClick={() => loginWithRedirect()}>Log In</Button>;
};

export default LoginButton;
