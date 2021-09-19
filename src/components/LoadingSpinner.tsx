import { Backdrop, Theme } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/styles";
import React from "react";
import { useSelector } from "react-redux";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    loader: {
      color: theme.palette.primary.main,
      textIndent: "-9999em",
      margin: "88px auto",
      position: "relative",
      fontSize: "11px",
      background: theme.palette.primary.main,
      animation: `$load1 1s infinite ${theme.transitions.easing.easeInOut}`,
      width: "1em",
      height: "4em",
      transform: "translateZ(0)",
      animationDelay: "-0.16s",
      "&::before": {
        left: "-1.5em",
        animationDelay: "-0.32s",
        position: "absolute",
        top: 0,
        content: '""',
        background: theme.palette.primary.main,
        animation: `$load1 1s infinite ${theme.transitions.easing.easeInOut}`,
        width: "1em",
        height: "4em",
      },
      "&::after": {
        left: "1.5em",
        position: "absolute",
        top: 0,
        content: '""',
        background: theme.palette.primary.main,
        animation: `$load1 1s infinite ${theme.transitions.easing.easeInOut}`,
        width: "1em",
        height: "4em",
      },
    },
    "@keyframes load1": {
      "0%": {
        boxShadow: "0 0",
        height: "4em",
      },
      "40%": {
        boxShadow: "0 -2em",
        height: "5em",
      },
      "80%": {
        boxShadow: "0 0",
        height: "4em",
      },
      "100%": {
        boxShadow: "0 0",
        height: "4em",
      },
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
  })
);
const LoadingSpinner: React.FC<{ force?: boolean }> = ({ force = false }) => {
  const isLoading = useSelector<applicationState>(
    (state) => state.loading.loading
  ) as boolean;

  const styles = useStyles();
  return (
    <Backdrop className={styles.backdrop} open={force ? true : isLoading}>
      <div className={styles.loader}>Loading...</div>
    </Backdrop>
  );
};

export default LoadingSpinner;
