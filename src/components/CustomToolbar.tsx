import {
  Button,
  createStyles,
  makeStyles,
  Theme,
  Toolbar,
} from "@material-ui/core";
import React from "react";

import { useHistory } from "react-router";

interface CustomToolbarProps {
  perms: userState["permissions"];
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1,
    },
  })
);
const CustomToolbar: React.FC<CustomToolbarProps> = (props) => {
  const history = useHistory();
  const addButtonHandler = (perm: string) => {
    const reqPermArr = perm.split(":");
    history.push(`${reqPermArr[1]}/${reqPermArr[0]}`);
  };
  const styles = useStyles();
  return (
    <Toolbar>
      <div className={styles.grow} />
      <Button
        variant="outlined"
        onClick={() => addButtonHandler("add:books")}
        disabled={!props.perms.includes("add:books")}
      >
        Add Row
      </Button>
    </Toolbar>
  );
};

export default CustomToolbar;
