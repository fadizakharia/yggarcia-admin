import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  createStyles,
  Grid,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";

import DeleteButton from "./DeleteButton";
interface CharacterGridCharacterProps {
  character: characterState;
  deleteHandler: (id: string) => void;
  perms: applicationState["user"]["permissions"];
  editHandler: (values: any) => void;
  handleOpenImages: (values: any) => void;
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    media: {
      height: 0,
      paddingTop: "56.25%",
    },
  })
);
const CharacterGridCharacter: React.FC<CharacterGridCharacterProps> = (
  props
) => {
  const styles = useStyles();
  const perms = useSelector<applicationState>(
    (state) => state.user.permissions
  ) as applicationState["user"]["permissions"];

  return props.character ? (
    <Grid item xs={6} sm={4} md={3}>
      <Card>
        <CardMedia
          className={styles.media}
          image={
            props.character.images && props.character.images.length > 0
              ? props.character.images[0].imageUrl
              : "https://plchldr.co/i/500x250?text=No%20Image%20Found"
          }
        />
        <CardHeader title={props.character.name}></CardHeader>
        <CardContent>
          <Typography>
            {props.character.bio
              ? props.character.bio.substring(0, 50) + "..."
              : "character has no biography"}
          </Typography>
        </CardContent>
        <CardActions>
          <DeleteButton
            id={props.character.id!}
            handleDelete={() => props.deleteHandler(props.character.id!)}
            btnProps={{ disabled: !perms.includes("delete:character") }}
          />
          <Button
            disabled={!props.perms.includes("update:character")}
            id={props.character.id!}
            onClick={() => props.handleOpenImages(props.character)}
          >
            Edit Images
          </Button>
          <Button
            disabled={!props.perms.includes("update:character")}
            onClick={() => props.editHandler(props.character)}
          >
            Edit
          </Button>
        </CardActions>
      </Card>
    </Grid>
  ) : (
    <div></div>
  );
};

export default CharacterGridCharacter;
