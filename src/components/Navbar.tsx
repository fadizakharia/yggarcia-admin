import { useAuth0 } from "../util/Auth";
import {
  makeStyles,
  Theme,
  createStyles,
  AppBar,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getPermissionRoutes } from "../util/getPermissionRoutes";
import LogoutButton from "./LogoutButton";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: 0,
    },
    toolBar: { padding: "0 2vw" },
    logoContainer: {
      width: "32vw",
      minWidth: "150px",
      maxWidth: "300px",
      "clip-path": "polygon(0% 0, 100% 0, 75% 50%,100% 100%, 0 100%)",
      backgroundColor: "white",
      textAlign: "center",
    },
    grow: {
      flexGrow: 1,
    },
    logo: {
      maxHeight: "64px",
      maxWidth: "94px",
      padding: "5px",
      margin: "5px 0",
      transform: "translateX(-10%)",
      cursor: "pointer",
    },
    linkDesktop: {
      display: "inline",
      margin: "0 10px",
      cursor: "pointer",
      position: "relative",
      padding: "10px",
      transition: "all 300ms cubic-bezier(0.075, 0.82, 0.165, 1)",
      textTransform: "uppercase",
      "&::before": {
        content: '""',
        position: "absolute",
        display: "block",
        border: "0px solid transparent",
        width: "0%",
        height: "0%",
        transition: "all 0.3s ease",
        borderRadius: "50%",
        bottom: 0,
        right: 0,
        borderRight: "2px solid transparent",
        borderBottom: "2px solid transparent",
      },
      "&::after": {
        borderRadius: "50%",
        content: '""',
        position: "absolute",
        display: "block",
        border: "0px solid transparent",
        width: "0%",
        height: "0%",
        transition: "all 0.3s ease",
        top: 0,
        left: 0,
        borderTop: "2px solid transparent",
        borderLeft: "2px solid transparent",
      },
      "&:hover": {
        "&::after": {
          width: "10px",
          height: "10px",
          borderColor: "#fff",
        },
        "&::before": { width: "10px", height: "10px", borderColor: "#fff" },
      },
    },
    "@keyframes shake": {
      "0%": { transform: "translate(1px, 1px) rotate(0deg)" },
      "10%": { transform: "translate(-1px, -2px) rotate(-1deg)" },
      "20%": { transform: "translate(-3px, 0px) rotate(1deg) " },
      "30%": { transform: "translate(3px, 2px) rotate(0deg) " },
      "40%": { transform: "translate(1px, -1px) rotate(1deg) " },
      "50%": { transform: "translate(-1px, 2px) rotate(-1deg)" },
      "60%": { transform: "translate(-3px, 1px) rotate(0deg) " },
      "70%": { transform: "translate(3px, 1px) rotate(-1deg) " },
      "80%": { transform: "translate(-1px, -1px) rotate(1deg)" },
      "90%": { transform: "translate(1px, 2px) rotate(0deg)" },
      "100%": { transform: "translate(1px, -2px) rotate(-1deg)" },
    },
    userWelcome: {
      margin: "0 10px",
    },
  })
);
export default function Navbar() {
  const permissions = useSelector<applicationState>(
    (state) => state.user.permissions
  );
  const { user } = useAuth0();
  const [permissionRoutes, setPermissionRoutes] =
    useState<Array<"Blog" | "Books" | "Character">>();
  useEffect(() => {
    setPermissionRoutes(getPermissionRoutes(permissions as string[]));
    return () => {};
  }, [permissions]);
  const styles = useStyles();
  return (
    <AppBar position="relative" className={styles.root}>
      <Toolbar className={styles.toolBar}>
        {permissionRoutes?.map((route) => {
          return (
            <Link
              key={route + "nav"}
              className={styles.linkDesktop}
              to={"/" + route.toLowerCase()}
            >
              <Typography variant="subtitle1" color="secondary">
                {route}
              </Typography>
            </Link>
          );
        })}
        <div className={styles.grow} />
        <div className={styles.userWelcome}>
          <Typography display="block" variant="subtitle2">
            welcome,
          </Typography>
          <Typography display="block" variant="subtitle2">
            {user?.name}
          </Typography>
        </div>
        <LogoutButton />
      </Toolbar>
    </AppBar>
  );
}
