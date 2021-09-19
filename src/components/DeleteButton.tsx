import {
  Button,
  ButtonProps,
  createStyles,
  makeStyles,
  Theme,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    deleteButton: {
      backgroundColor: theme.palette.primary.light,
      color: "#ffffff",
      "&:hover": {
        backgroundColor: theme.palette.primary.dark,
      },
    },
  })
);
const DeleteButton: React.FC<{
  id: string;
  btnProps: ButtonProps;
  handleDelete: (id: string) => void;
}> = (props) => {
  const [id, setId] = useState<string | undefined>();
  useEffect(() => {
    if (props.id) {
      setId(props.id);
    }
    return () => {};
  }, [id]);
  const styles = useStyles();
  return (
    <Button
      variant="contained"
      {...props.btnProps}
      onClick={() => props.handleDelete(id!)}
      className={styles.deleteButton}
      disabled={props.btnProps.disabled}
    >
      Delete Row
    </Button>
  );
};

export default DeleteButton;
