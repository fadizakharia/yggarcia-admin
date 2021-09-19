import React from "react";
import { Chip, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";

export default function Dashboard() {
  const perms = useSelector<applicationState>(
    (state) => state.user.permissions
  ) as userState["permissions"];
  return (
    <div
      style={{
        position: "absolute",
        margin: "25% 50%",
        transform: "translate(-50%,-50%)",
        width: "100%",
      }}
    >
      <Typography variant="h4">
        Welcome To The Command Central Potato!
      </Typography>
      <Typography variant="body1">
        Here are your allowed permissions presented in sausage format:
      </Typography>
      {perms.map((perm) => {
        let permSplit = perm.split(":");
        return (
          <Chip color="primary" label={permSplit[0] + " " + permSplit[1]} />
        );
      })}
    </div>
  );
}
