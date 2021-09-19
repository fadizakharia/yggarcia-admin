import { Button, ButtonProps } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router";

const EditButton: React.FC<{
  uri: string;
  perms: userState["permissions"];
  btnProps?: ButtonProps;
}> = ({ uri, perms, btnProps }) => {
  const history = useHistory();
  const handleReroute = () => {
    history.push(uri);
  };
  return (
    <Button
      {...btnProps}
      onClick={handleReroute}
      disabled={!perms.includes("delete:books")}
    >
      Edit
    </Button>
  );
};

export default EditButton;
